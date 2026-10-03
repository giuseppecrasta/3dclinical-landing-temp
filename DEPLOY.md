# Deploy Guide - 3D Clinical Landing

## Architettura

Il sistema utilizza un **singolo container Docker** che:
- Esegue la build completa dell'applicazione (frontend + backend)
- Serve i file statici del frontend tramite Express
- Gestisce le API REST tramite Node.js/Express (path `/backend`)
- Non richiede server web esterni (Nginx/Apache)

## Prerequisiti sul Server

### 1. Installazione Docker

```bash
# Installa Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Avvia Docker
systemctl start docker
systemctl enable docker

# Verifica l'installazione
docker --version
```

### 2. Configurazione File di Ambiente

Crea il file `/root/.env.3dclinical-landing` sul server con le seguenti variabili:

```bash
# Configurazione Node
NODE_ENV=production
PORT=3000

# Configurazione SMTP (per invio email)
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@example.com
SMTP_PASS=your-password

# Indirizzi email
EMAIL_FROM=3D Clinical <no-reply@3dclinical.com>
EMAIL_TO=info@3dclinical.com
```

**Nota:** Se non configuri SMTP, le email saranno solo loggate nella console del container.

### 3. GitHub Secrets

Configura i seguenti secrets nel repository GitHub (Settings → Secrets → Actions):

- `SSH_HOST`: Indirizzo IP o hostname del server
- `USERNAME`: Username SSH (es. `root`)
- `SSH_PRIVATE_KEY`: Chiave privata SSH per l'autenticazione

## Deploy Automatico

### GitHub Action

Il deploy automatico avviene tramite GitHub Actions quando viene fatto push sul branch `main`.

Workflow: [`.github/workflows/deploy-backend.yml`](.github/workflows/deploy-backend.yml)

**Processo:**
1. Build dell'immagine Docker (multi-stage build)
2. Salvataggio dell'immagine in formato `.tar`
3. Trasferimento sul server via SCP
4. Caricamento dell'immagine sul server
5. Stop del container precedente
6. Avvio del nuovo container con variabili d'ambiente
7. Verifica dello stato e cleanup

### Deploy Manuale

Se necessario, puoi effettuare il deploy manualmente:

```bash
# Sul tuo computer locale
docker build -t 3dclinical-landing:latest .
docker save 3dclinical-landing:latest -o 3dclinical-landing.tar
scp 3dclinical-landing.tar root@your-server:/root/

# Sul server
ssh root@your-server
docker load -i /root/3dclinical-landing.tar
docker stop 3dclinical-landing || true
docker rm 3dclinical-landing || true
docker run -d \
  --name 3dclinical-landing \
  -p 3000:3000 \
  --restart unless-stopped \
  --env-file /root/.env.3dclinical-landing \
  3dclinical-landing:latest
```

## API Endpoints

Il backend espone i seguenti endpoint sotto il path `/backend`:

- `GET /backend/health` - Health check
- `POST /backend/contact` - Form di contatto (rate limited: 3 richieste/15 minuti)

## Gestione Container

### Comandi Utili

```bash
# Visualizza log in tempo reale
docker logs -f 3dclinical-landing

# Visualizza ultimi 100 log
docker logs --tail 100 3dclinical-landing

# Verifica stato container
docker ps | grep 3dclinical-landing

# Riavvia container
docker restart 3dclinical-landing

# Stop container
docker stop 3dclinical-landing

# Rimuovi container
docker rm -f 3dclinical-landing

# Accedi alla shell del container (per debug)
docker exec -it 3dclinical-landing sh
```

### Health Check

Il container include un health check automatico che verifica lo stato ogni 30 secondi:

```bash
# Verifica manualmente lo stato di salute
curl http://localhost:3000/backend/health

# Risposta attesa:
# {"status":"ok","timestamp":"2025-03-10T10:30:00.000Z"}
```

## Porte e Networking

- **Porta interna:** 3000 (container)
- **Porta esposta:** 3000 (host)

Per esporre l'applicazione sulla porta 80/443, configura un reverse proxy (consigliato):

### Opzione 1: Nginx Reverse Proxy

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### Opzione 2: Cambia porta esposta

```bash
docker run -d \
  --name 3dclinical-landing \
  -p 80:3000 \  # Mappa porta 80 host → 3000 container
  --restart unless-stopped \
  --env-file /root/.env.3dclinical-landing \
  3dclinical-landing:latest
```

E aggiorna la GitHub Action modificando la riga `-p 3000:3000` in `-p 80:3000`.

## Sicurezza

### Best Practices Implementate

1. **Multi-stage build:** Riduce dimensione immagine finale
2. **Non-root user:** Container esegue come utente `nodejs` (UID 1001)
3. **Rate limiting:** 3 richieste ogni 15 minuti per endpoint `/backend/contact`
4. **Input sanitization:** Validazione e sanitizzazione input utente
5. **Minimal dependencies:** Solo dipendenze necessarie in produzione
6. **Health check:** Monitoraggio automatico dello stato
7. **dumb-init:** Gestione corretta dei segnali di sistema

### Firewall

Configura il firewall per permettere solo le porte necessarie:

```bash
# UFW (Ubuntu/Debian)
ufw allow 22/tcp    # SSH
ufw allow 80/tcp    # HTTP
ufw allow 443/tcp   # HTTPS (se usi HTTPS)
ufw enable

# Oppure solo 3000 se non usi reverse proxy
ufw allow 3000/tcp
```

## SSL/TLS (HTTPS)

Per produzione, è **fortemente consigliato** utilizzare HTTPS. Opzioni:

### 1. Let's Encrypt con Certbot + Nginx

```bash
apt install certbot python3-certbot-nginx
certbot --nginx -d your-domain.com
```

### 2. Cloudflare (più semplice)

- Aggiungi il dominio a Cloudflare
- Attiva SSL/TLS (modalità "Full")
- Punta il record A al tuo server
- Cloudflare gestirà automaticamente SSL

## Monitoraggio

### Log Centralized

Per un monitoraggio avanzato, integra con un sistema di log:

```bash
# Docker logs con driver
docker run -d \
  --name 3dclinical-landing \
  --log-driver json-file \
  --log-opt max-size=10m \
  --log-opt max-file=3 \
  -p 3000:3000 \
  --restart unless-stopped \
  --env-file /root/.env.3dclinical-landing \
  3dclinical-landing:latest
```

### Metriche

Monitora l'utilizzo delle risorse:

```bash
# CPU, Memoria, Network, I/O
docker stats 3dclinical-landing
```

## Troubleshooting

### Container non si avvia

```bash
# Visualizza i log
docker logs 3dclinical-landing

# Verifica configurazione
docker inspect 3dclinical-landing

# Verifica file .env
cat /root/.env.3dclinical-landing
```

### Errore EADDRINUSE (porta già in uso)

```bash
# Trova processo che usa la porta 3000
lsof -i :3000
netstat -tulpn | grep 3000

# Termina il processo
kill -9 <PID>
```

### Spazio disco insufficiente

```bash
# Rimuovi immagini non utilizzate
docker image prune -a

# Rimuovi container fermi
docker container prune

# Rimuovi volumi non utilizzati
docker volume prune
```

### Email non vengono inviate

1. Verifica configurazione SMTP nel file `.env.3dclinical-landing`
2. Controlla i log: `docker logs 3dclinical-landing | grep -i email`
3. Testa SMTP manualmente con telnet o swaks
4. Verifica firewall per porta SMTP (587/465)

## Performance

### Ottimizzazioni Applicate

- **Caching:** Express serve file statici con caching headers
- **Compression:** Gzip automatico per risposte API
- **Bundle size:** Frontend ottimizzato con Vite
- **Image size:** Multi-stage build riduce dimensione finale a ~150MB

### Scaling (futuro)

Per gestire alto traffico, considera:

1. **Load balancer** (Nginx, HAProxy, Cloudflare)
2. **Multiple containers** con docker-compose o Kubernetes
3. **Database esterno** (se aggiungi persistenza)
4. **CDN** per file statici (Cloudflare, AWS CloudFront)

## Backup

### Backup Container

```bash
# Backup immagine
docker save 3dclinical-landing:latest | gzip > 3dclinical-landing-backup.tar.gz

# Restore
gunzip -c 3dclinical-landing-backup.tar.gz | docker load
```

### Backup File Ambiente

```bash
# Backup configurazione
cp /root/.env.3dclinical-landing /root/.env.3dclinical-landing.backup
```

## Test Locale

Per testare il container in locale prima del deploy:

```bash
# Build
docker build -t 3dclinical-landing:latest .

# Run (senza --env-file per usare le ENV del Dockerfile)
docker run -p 3000:3000 3dclinical-landing:latest

# Oppure con variabili custom
docker run -p 3000:3000 \
  -e NODE_ENV=production \
  -e PORT=3000 \
  3dclinical-landing:latest

# Test health check
curl http://localhost:3000/backend/health

# Apri browser
open http://localhost:3000
```

## Contatti

Per problemi o domande sul deploy, contatta il team DevOps.

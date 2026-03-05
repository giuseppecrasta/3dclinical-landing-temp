# 3D Clinical Landing

## Sviluppo

```bash
npm run dev:all
```

Frontend: `http://localhost:3000` | Backend: `http://localhost:3002`

## Produzione

```bash
npm run build
docker-compose up -d
```

App disponibile su `http://localhost:3000`

## Configurazione Email

Le email vengono loggare in console di default. Per invio reale, configura variabili d'ambiente:

```yaml
# docker-compose.yml - decommenta e configura:
environment:
  - SMTP_HOST=smtp.gmail.com
  - SMTP_PORT=587
  - SMTP_SECURE=false
  - SMTP_USER=${SMTP_USER}
  - SMTP_PASS=${SMTP_PASS}
  - EMAIL_FROM=3D Clinical <no-reply@3dclinical.com>
  - EMAIL_TO=info@3dclinical.com
```

Oppure usa secrets manager in produzione.

### Gmail Setup

1. Genera [App Password](https://myaccount.google.com/apppasswords)
2. Configura `SMTP_USER` e `SMTP_PASS`

## Features

- Rate limiting: 3 richieste/15min per IP
- Validazione input e sanitizzazione
- Email HTML responsive
- Nodemailer con fallback a console log

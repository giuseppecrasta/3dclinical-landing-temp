import { useEffect } from "react";
import { Link } from "wouter";

export default function PrivacyPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Privacy Policy - 3D Clinical";
  }, []);

  const lastUpdated = "18 luglio 2026";

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-slate-100 py-4 px-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/">
            <span className="text-xl font-bold text-teal-600 cursor-pointer">3D Clinical</span>
          </Link>
          <Link href="/">
            <span className="text-sm text-slate-500 hover:text-teal-600 cursor-pointer transition-colors">
              ← Torna alla home
            </span>
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold text-slate-900 mb-3">Privacy Policy</h1>
        <p className="text-slate-500 mb-12">Ultimo aggiornamento: {lastUpdated}</p>

        <div className="prose prose-slate max-w-none space-y-10">

          <section>
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">1. Titolare del trattamento</h2>
            <p className="text-slate-600 leading-relaxed">
              Il Titolare del trattamento dei dati personali raccolti tramite il sito web <strong>www.3dclinical.it</strong>,
              la web application <strong>app.3dclinical.it</strong> e l'estensione Chrome <strong>3D Clinical – AlfaDocs Integration</strong>
              è <strong>3D Clinical</strong> (di seguito "3D Clinical", "noi", "ci" o "nostro").
            </p>
            <p className="text-slate-600 leading-relaxed mt-3">
              Per qualsiasi richiesta relativa al trattamento dei tuoi dati personali puoi contattarci all'indirizzo email:{" "}
              <a href="mailto:info@3dclinical.it" className="text-teal-600 hover:underline">info@3dclinical.it</a>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">2. Dati raccolti e finalità</h2>

            <h3 className="text-lg font-semibold text-slate-700 mb-2">2.1 Sito web e landing page</h3>
            <p className="text-slate-600 leading-relaxed mb-4">
              Il sito <strong>www.3dclinical.it</strong> non installa cookie di profilazione né di tracciamento di terze parti.
              I dati tecnici di navigazione (indirizzo IP, browser, pagine visitate) vengono elaborati esclusivamente per
              garantire il corretto funzionamento del sito e non vengono ceduti a terzi.
            </p>
            <p className="text-slate-600 leading-relaxed mb-4">
              Il modulo di contatto raccoglie <strong>nome, cognome e indirizzo email</strong> al solo scopo di rispondere
              alla richiesta inviata. Questi dati non vengono utilizzati per attività di marketing né condivisi con soggetti
              terzi.
            </p>

            <h3 className="text-lg font-semibold text-slate-700 mb-2">2.2 Web application (app.3dclinical.it)</h3>
            <p className="text-slate-600 leading-relaxed mb-4">
              La web application raccoglie i dati necessari alla fruizione del servizio: nome, cognome, indirizzo email,
              nome dello studio/azienda e dati dei pazienti inseriti dall'utente. Questi dati sono trattati in conformità al
              GDPR (Regolamento UE 2016/679) e sono memorizzati su server sicuri situati nell'Unione Europea.
            </p>
            <p className="text-slate-600 leading-relaxed">
              I dati dei pazienti inseriti dagli utenti professionisti (es. dentisti) sono trattati nell'ambito del rapporto
              contrattuale tra 3D Clinical e il professionista. 3D Clinical agisce in qualità di <em>responsabile del
              trattamento</em> per tali dati, mentre il professionista rimane il <em>titolare del trattamento</em> nei
              confronti dei propri pazienti.
            </p>

            <h3 className="text-lg font-semibold text-slate-700 mb-2 mt-6">2.3 Estensione Chrome – 3D Clinical AlfaDocs Integration</h3>
            <p className="text-slate-600 leading-relaxed mb-4">
              L'estensione Chrome <strong>3D Clinical – AlfaDocs Integration</strong> è progettata con un principio di
              privacy by design. In particolare:
            </p>
            <ul className="list-disc list-inside text-slate-600 space-y-2 mb-4">
              <li>
                <strong>Non raccoglie dati di comportamento:</strong> l'estensione non traccia le azioni dell'utente,
                non registra le pagine visitate né invia dati analitici a server di terze parti.
              </li>
              <li>
                <strong>Non usa cookie:</strong> non installa cookie di nessun tipo.
              </li>
              <li>
                <strong>Autenticazione locale:</strong> i dati di autenticazione (token JWT) vengono letti dal
                localStorage di <em>app.3dclinical.it</em> e memorizzati localmente nel browser tramite l'API
                <code className="bg-slate-100 px-1 rounded text-sm">chrome.storage.local</code>, senza mai essere
                trasmessi a server diversi da quelli di 3D Clinical già autorizzati dall'utente.
              </li>
              <li>
                <strong>Dati dei pazienti:</strong> le informazioni relative ai pazienti vengono recuperate tramite
                le API di 3D Clinical autenticate con il token dell'utente loggato e visualizzate esclusivamente
                all'interno della pagina AlfaDocs attiva. Non vengono memorizzate localmente né trasmesse a terzi.
              </li>
              <li>
                <strong>Permessi minimi:</strong> l'estensione richiede solo i permessi strettamente necessari al
                funzionamento (<code className="bg-slate-100 px-1 rounded text-sm">storage</code>,
                <code className="bg-slate-100 px-1 rounded text-sm mx-1">activeTab</code>,
                <code className="bg-slate-100 px-1 rounded text-sm">scripting</code>,
                <code className="bg-slate-100 px-1 rounded text-sm mx-1">tabs</code>) e opera esclusivamente sui
                domini <em>app.alfadocs.com</em> e <em>*.3dclinical.it</em>.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">3. Base giuridica del trattamento</h2>
            <p className="text-slate-600 leading-relaxed">
              Il trattamento dei dati personali si fonda sulle seguenti basi giuridiche ai sensi dell'art. 6 del GDPR:
            </p>
            <ul className="list-disc list-inside text-slate-600 space-y-2 mt-3">
              <li><strong>Esecuzione di un contratto</strong> (art. 6, par. 1, lett. b): per i dati necessari all'erogazione del servizio.</li>
              <li><strong>Consenso dell'interessato</strong> (art. 6, par. 1, lett. a): per i dati forniti volontariamente tramite il modulo di contatto.</li>
              <li><strong>Legittimo interesse</strong> (art. 6, par. 1, lett. f): per i dati tecnici di navigazione necessari alla sicurezza e al funzionamento dei sistemi.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">4. Conservazione dei dati</h2>
            <p className="text-slate-600 leading-relaxed">
              I dati personali vengono conservati per il tempo strettamente necessario alle finalità per cui sono stati
              raccolti e comunque non oltre i termini previsti dalla normativa applicabile:
            </p>
            <ul className="list-disc list-inside text-slate-600 space-y-2 mt-3">
              <li>Dati del modulo di contatto: fino a 12 mesi dalla ricezione della richiesta.</li>
              <li>Dati dell'account e del servizio: per tutta la durata del contratto e fino a 5 anni dalla sua cessazione, salvo obblighi di legge.</li>
              <li>Dati locali dell'estensione Chrome: conservati nel browser dell'utente e rimossi automaticamente al logout o alla disinstallazione dell'estensione.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">5. Condivisione dei dati</h2>
            <p className="text-slate-600 leading-relaxed">
              3D Clinical non vende, non affitta né cede i dati personali degli utenti a terzi per finalità commerciali o
              di marketing. I dati possono essere condivisi esclusivamente con:
            </p>
            <ul className="list-disc list-inside text-slate-600 space-y-2 mt-3">
              <li>Fornitori tecnici che supportano l'erogazione del servizio (hosting, infrastruttura cloud), vincolati da accordi di riservatezza e da contratti di responsabili del trattamento.</li>
              <li>Autorità competenti, laddove richiesto dalla legge o da un'autorità giudiziaria.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">6. Diritti dell'interessato</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              Ai sensi degli artt. 15–22 del GDPR, hai il diritto di:
            </p>
            <ul className="list-disc list-inside text-slate-600 space-y-2">
              <li><strong>Accesso</strong>: ottenere conferma del trattamento e copia dei dati che ti riguardano.</li>
              <li><strong>Rettifica</strong>: richiedere la correzione di dati inesatti o incompleti.</li>
              <li><strong>Cancellazione</strong> ("diritto all'oblio"): ottenere la cancellazione dei dati, nei casi previsti dalla legge.</li>
              <li><strong>Limitazione</strong>: richiedere la limitazione del trattamento in determinate circostanze.</li>
              <li><strong>Portabilità</strong>: ricevere i tuoi dati in formato strutturato e leggibile da macchina.</li>
              <li><strong>Opposizione</strong>: opporti al trattamento basato su legittimo interesse.</li>
              <li><strong>Revoca del consenso</strong>: revocare il consenso in qualsiasi momento, senza pregiudicare la liceità del trattamento precedente.</li>
            </ul>
            <p className="text-slate-600 leading-relaxed mt-4">
              Per esercitare i tuoi diritti, scrivi a{" "}
              <a href="mailto:info@3dclinical.it" className="text-teal-600 hover:underline">info@3dclinical.it</a>.
              Hai inoltre il diritto di proporre reclamo al Garante per la Protezione dei Dati Personali
              (<a href="https://www.garanteprivacy.it" target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:underline">www.garanteprivacy.it</a>).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">7. Sicurezza</h2>
            <p className="text-slate-600 leading-relaxed">
              Adottiamo misure tecniche e organizzative adeguate per proteggere i dati personali da accessi non autorizzati,
              divulgazione, alterazione o distruzione. Le comunicazioni tra l'utente e i nostri server avvengono sempre
              attraverso connessioni cifrate (HTTPS/TLS). I token di autenticazione hanno scadenza limitata e vengono
              verificati ad ogni accesso.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">8. Modifiche alla Privacy Policy</h2>
            <p className="text-slate-600 leading-relaxed">
              Ci riserviamo il diritto di aggiornare questa Privacy Policy in qualsiasi momento. Le modifiche sostanziali
              saranno comunicate tramite avviso sulla piattaforma o via email agli utenti registrati. La data dell'ultimo
              aggiornamento è indicata in cima a questo documento.
            </p>
          </section>

        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-100 py-8 px-6 mt-16">
        <div className="max-w-4xl mx-auto text-center text-sm text-slate-400">
          © {new Date().getFullYear()} 3D Clinical. Tutti i diritti riservati.
        </div>
      </footer>
    </div>
  );
}

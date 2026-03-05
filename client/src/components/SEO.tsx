import { useEffect } from 'react';

export default function SEO() {
  useEffect(() => {
    // Structured data for SEO
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "3D Clinical",
      "applicationCategory": "MedicalApplication",
      "operatingSystem": "Web",
      "offers": {
        "@type": "AggregateOffer",
        "priceCurrency": "EUR",
        "lowPrice": "0",
        "highPrice": "999",
        "offerCount": "3"
      },
      "description": "Piattaforma professionale di comunicazione clinica per studi odontoiatrici che integra video 3D, gestione pazienti e strumenti avanzati.",
      "featureList": [
        "Libreria Video 3D",
        "Gestione Pazienti",
        "Brand Personalizzato",
        "Strumenti AI",
        "Comunicazione Tracciabile",
        "Integrazione Gestionale",
        "Realtà Aumentata"
      ],
      "audience": {
        "@type": "Audience",
        "audienceType": "Dentisti e Odontoiatri"
      }
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return null;
}

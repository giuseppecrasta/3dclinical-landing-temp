/* Medical Futurism Design: Teal clinico + Navy profondo
 * Layout: Asymmetric depth layers con glass effects
 * Typography: Space Grotesk (headings) + Inter (body)
 */

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, Video, Users, Palette, Brain, BarChart3, Link2, ArrowRight, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import SEO from "@/components/SEO";
import { ContactDialog } from "@/components/ContactDialog";

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [contactDialog, setContactDialog] = useState<{
    open: boolean;
    type: "inizia-ora" | "richiedi-demo" | "contattaci";
    title: string;
    description: string;
  }>({
    open: false,
    type: "richiedi-demo",
    title: "",
    description: ""
  });

  const openContactDialog = (
    type: "inizia-ora" | "richiedi-demo" | "contattaci",
    title: string,
    description: string
  ) => {
    setContactDialog({ open: true, type, title, description });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up");
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".animate-on-scroll").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen">
      <SEO />
      <ContactDialog
        open={contactDialog.open}
        onOpenChange={(open) => setContactDialog({ ...contactDialog, open })}
        type={contactDialog.type}
        title={contactDialog.title}
        description={contactDialog.description}
      />
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50 backdrop-blur-xl">
        <div className="container flex items-center justify-between h-20">
          <div className="flex items-center gap-2">
            <img
              src="/logo.png"
              alt="3D Clinical"
              className="h-20 w-auto"
            />
          </div>
          <div className="flex items-center gap-8">
            <a href="#funzionalita" className="hidden lg:block text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Funzionalità
            </a>
            <a href="#piani" className="hidden lg:block text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Piani
            </a>
            <a href="#innovazione" className="hidden lg:block text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Innovazione
            </a>
            <a href="#smaileup" className="hidden lg:block text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              SmAile UP
            </a>
            <Button size="sm" className="bg-primary hover:bg-primary/90" asChild>
              <a href="https://app.3dclinical.it" target="_blank" rel="noopener noreferrer">
                Accedi
              </a>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden noise"
      >
        <div 
          className="absolute inset-0 gradient-mesh opacity-40"
          style={{
            background: `
              radial-gradient(at 20% 30%, oklch(0.58 0.14 200 / 0.3) 0px, transparent 50%),
              radial-gradient(at 80% 70%, oklch(0.35 0.12 215 / 0.25) 0px, transparent 50%)
            `
          }}
        />
        
        <div className="container relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-on-scroll">
              <div className="inline-block">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20">
                  <Sparkles className="w-4 h-4" />
                  Piattaforma Professionale
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-display">
                Trasforma la comunicazione clinica nel tuo{" "}
                <span className="text-primary">studio odontoiatrico</span>
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl">
                3D Clinical integra video 3D, gestione pazienti e strumenti avanzati per comunicare con chiarezza, coerenza e autorevolezza.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground group" asChild>
                  <a href="#piani">
                    Scopri i Piani
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-2"
                  onClick={() => openContactDialog(
                    "richiedi-demo",
                    "Richiedi una Demo",
                    "Compila il form per ricevere accesso ad una demo personalizzata di 3D Clinical"
                  )}
                >
                  Richiedi una Demo
                </Button>
              </div>
            </div>
            
            <div className="relative animate-on-scroll">
              <div className="relative rounded-2xl overflow-hidden glass border-2 border-primary/20 shadow-2xl hover-lift">
                <img 
                  src="https://private-us-east-1.manuscdn.com/sessionFile/6hbUvjo2Vldk0czDWoG1VA/sandbox/KaXusTeGAJtR9MCZg9USJ6-img-2_1770930926000_na1fn_M2QtdmlzdWFsaXphdGlvbi1oZXJv.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvNmhiVXZqbzJWbGRrMGN6RFdvRzFWQS9zYW5kYm94L0thWHVzVGVHQUp0UjlNQ1pnOVVTSjYtaW1nLTJfMTc3MDkzMDkyNjAwMF9uYTFmbl9NMlF0ZG1semRXRnNhWHBoZEdsdmJpMW9aWEp2LnBuZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=AZuuPbjOS7miiPxXTt0hmwhyJjg1unzmAcIvXs0nh8qoI24wBbY3~fuPtMzz9Ryv3entJuPMTRJVn5IzWgBYRkde~gz2Tf32FS1VKDbtAic1pTnzJYU8G8h2ldpHZYDDQ7Eb4FsXn~16xcj-UPLbHiPTZkyXUInLs6V3i4XWb9W8LgOSB-dIUwbKuXW~DFrSXUv69YSxiYzqrUi1QovtNpyec2vqzv78tANuYosqXm~zYoMD7g9p5CJdLkKrly7--TXH26MTsW3Vbj9DNIOZidWTOj3LkfntValBLAx0JJSMSIRI6YnyzGSmlmEfD196etxleockfzxbf20CqimEog__"
                  alt="3D Clinical Visualization"
                  className="w-full h-auto"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/20 rounded-full blur-3xl" />
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-accent/20 rounded-full blur-3xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 md:py-32 bg-muted/30">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16 animate-on-scroll">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-display">
              Negli studi odontoiatrici moderni, la comunicazione clinica è ancora{" "}
              <span className="text-primary">frammentata</span>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Video,
                title: "Video slegati dal paziente",
                description: "Contenuti generici che non si collegano alla cartella clinica"
              },
              {
                icon: BarChart3,
                title: "Tempo prezioso sprecato",
                description: "Ripetere le stesse spiegazioni più volte alla poltrona"
              },
              {
                icon: Link2,
                title: "Digitale non integrato",
                description: "Strumenti che non dialogano tra loro nel workflow quotidiano"
              },
              {
                icon: Users,
                title: "Comunicazione non standardizzata",
                description: "Ogni operatore spiega in modo diverso"
              }
            ].map((item, index) => (
              <Card 
                key={index}
                className="p-6 glass hover-lift animate-on-scroll border-border/50"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-display">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </Card>
            ))}
          </div>
          
          <div className="mt-12 text-center animate-on-scroll">
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              <strong className="text-foreground">Il risultato?</strong> Incomprensioni, perdita di tempo e un'esperienza paziente frammentata che non riflette la professionalità dello studio.
            </p>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 md:py-32 relative overflow-hidden">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative animate-on-scroll order-2 lg:order-1">
              <img 
                src="https://private-us-east-1.manuscdn.com/sessionFile/6hbUvjo2Vldk0czDWoG1VA/sandbox/KaXusTeGAJtR9MCZg9USJ6-img-4_1770930915000_na1fn_Y29tbXVuaWNhdGlvbi1wbGF0Zm9ybQ.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvNmhiVXZqbzJWbGRrMGN6RFdvRzFWQS9zYW5kYm94L0thWHVzVGVHQUp0UjlNQ1pnOVVTSjYtaW1nLTRfMTc3MDkzMDkxNTAwMF9uYTFmbl9ZMjl0YlhWdWFXTmhkR2x2Ymkxd2JHRjBabTl5YlEucG5nP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=jJcDWlq77C~7-gtn8-2NDXbeZ~GZ5zEZvlCZoGE90dIHoKGwM8wH7lJhHRu7z60REimXpPYFwz~k4xZGPjD2tKFat85HKditpZccgy5uZ~ob-UHBsYEO12YVZ-PhShBZrgNCLe6RgfLYsU3WmzDMKCKaOXoQClYdqohzNtTwKFZaYOrLN7p2J0soVdMTn-A2kx2A7psxpV46g-fMoO5S5z7Hu9jM3ZjsbtMB44N0nofRoPJ9QgU9HPgdpH8A~rW3LqbRVvVWkR2G1wTenJ~ltMsArtPY7cXyqw7AyEEoAJRPTUvHl9Je~ik8GxTXgzmH95Bx3xvnAa1NGsKclK~KWg__"
                alt="Communication Platform"
                className="rounded-2xl shadow-2xl"
              />
            </div>
            
            <div className="space-y-8 animate-on-scroll order-1 lg:order-2">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-display">
                3D Clinical non è una libreria video.{" "}
                <span className="text-primary">È il tuo sistema di comunicazione clinica.</span>
              </h2>
              
              <p className="text-lg text-muted-foreground leading-relaxed">
                Una piattaforma progettata da odontoiatri per odontoiatri, che trasforma i contenuti clinici in strumenti operativi integrati nel tuo workflow quotidiano.
              </p>
              
              <div className="grid gap-6">
                {[
                  {
                    title: "Spiega meglio",
                    description: "Piani di trattamento chiari e visivi che il paziente comprende al primo colpo"
                  },
                  {
                    title: "Comunica in modo coerente",
                    description: "Standardizza la comunicazione medico-paziente in tutto il team"
                  },
                  {
                    title: "Valorizza il tuo brand",
                    description: "Rafforza l'autorevolezza e la professionalità dello studio"
                  }
                ].map((item, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center mt-1">
                      <Check className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1 text-display">{item.title}</h3>
                      <p className="text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="funzionalita" className="py-20 md:py-32 bg-muted/30">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16 animate-on-scroll">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-display">
              Tutto ciò che serve per una{" "}
              <span className="text-primary">comunicazione clinica professionale</span>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Video,
                title: "Libreria Video 3D",
                description: "Contenuti clinici professionali sempre aggiornati"
              },
              {
                icon: Users,
                title: "Gestione Pazienti",
                description: "Associa contenuti a singoli pazienti per comunicazione personalizzata"
              },
              {
                icon: Palette,
                title: "Brand Personalizzato",
                description: "Profilo dello studio con logo, colori e identità visiva"
              },
              {
                icon: Brain,
                title: "Strumenti AI",
                description: "Supporto intelligente alla spiegazione dei piani di trattamento"
              },
              {
                icon: BarChart3,
                title: "Comunicazione Tracciabile",
                description: "Storico completo delle interazioni con ogni paziente"
              },
              {
                icon: Link2,
                title: "Integrazione Gestionale",
                description: "Connessione con AlfaDocs e altri sistemi esistenti"
              }
            ].map((feature, index) => (
              <Card 
                key={index}
                className="p-8 glass hover-lift animate-on-scroll border-border/50 group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-display">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="piani" className="py-20 md:py-32">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16 animate-on-scroll">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-display">
              Scegli il piano giusto per il tuo studio
            </h2>
            <p className="text-lg text-muted-foreground">
              Logica semplice e scalabile: parti da dove sei, cresci quando vuoi
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Piano Base */}
            <Card className="p-8 glass border-border/50 hover-lift animate-on-scroll flex flex-col">
              <div className="mb-4">
                <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Piano Base</span>
                <h3 className="text-2xl font-bold mt-1 mb-1 text-display">Software</h3>
                <p className="text-sm text-muted-foreground">Per lo studio che vuole iniziare a digitalizzare la comunicazione clinica</p>
              </div>
              
              <div className="flex items-end gap-1 mb-6 mt-2">
                <span className="text-4xl font-bold text-display">€ 497</span>
                <span className="text-muted-foreground mb-1">/anno</span>
              </div>
              
              <div className="space-y-3 mb-8 flex-1">
                {[
                  "Archivio digitale 3D integrato",
                  "Visualizzazione avanzata file STL / OBJ / GLB",
                  "Elaborazione base dei modelli 3D",
                  "Creazione scene semplici",
                  "1 GB di spazio cloud dedicato",
                  "Aggiornamenti software inclusi"
                ].map((feature, index) => (
                  <div key={index} className="flex gap-3 items-start">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
              
              <p className="text-xs text-muted-foreground mb-6 border-t border-border/50 pt-4">
                <strong className="text-foreground">Ideale per:</strong> Studi che vogliono archiviare e mostrare modelli 3D ai pazienti in modo professionale.
              </p>
              
              <Button className="w-full" variant="outline" onClick={() => openContactDialog(
                "inizia-ora",
                "Inizia Ora con 3D Clinical",
                "Compila il form per attivare uno spazio per il tuo studio"
              )}>
                Inizia ora
              </Button>
            </Card>

            {/* Piano Clinical + Video */}
            <Card className="p-8 glass border-2 border-primary shadow-xl hover-lift animate-on-scroll relative flex flex-col">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <span className="inline-flex items-center gap-1 px-4 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold">
                  <Sparkles className="w-3 h-3" />
                  PIÙ SCELTO
                </span>
              </div>
              
              <div className="mb-4">
                <span className="text-xs font-semibold uppercase tracking-widest text-primary">Piano Clinical</span>
                <h3 className="text-2xl font-bold mt-1 mb-1 text-display">Clinical + Video RenderMed</h3>
                <p className="text-sm text-muted-foreground">Per lo studio che vuole elevare la comunicazione con contenuti professionali</p>
              </div>
              
              <div className="flex items-end gap-1 mb-6 mt-2">
                <span className="text-4xl font-bold text-display text-primary">€ 1.490</span>
                <span className="text-muted-foreground mb-1">/anno</span>
              </div>
              
              <div className="space-y-3 mb-8 flex-1">
                {[
                  "Tutto del Piano Base",
                  "20 Video RENDERMED in licenza annuale (30–60 sec per spiegazione trattamenti)",
                  "Integrazione video nelle scene cliniche",
                  "10 GB di spazio cloud",
                  "Supporto prioritario"
                ].map((feature, index) => (
                  <div key={index} className="flex gap-3 items-start">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
              
              <p className="text-xs text-muted-foreground mb-6 border-t border-border/50 pt-4">
                <strong className="text-foreground">Ideale per:</strong> Studi orientati alla conversione dei piani di cura e alla comunicazione evoluta.
              </p>
              
              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" onClick={() => openContactDialog(
                "richiedi-demo",
                "Richiedi una Demo",
                "Compila il form per ricevere accesso ad una demo personalizzata di 3D Clinical"
              )}>
                Richiedi demo
              </Button>
            </Card>

            {/* Piano Premium */}
            <Card className="p-8 border-2 border-foreground/10 hover-lift animate-on-scroll relative flex flex-col" style={{background: 'linear-gradient(135deg, oklch(0.18 0.04 220) 0%, oklch(0.22 0.06 210) 100%)'}}>
              <div className="mb-4">
                <span className="text-xs font-semibold uppercase tracking-widest" style={{color: 'oklch(0.75 0.12 195)'}}>Piano Premium</span>
                <h3 className="text-2xl font-bold mt-1 mb-1 text-display text-white">Aziendale</h3>
                <p className="text-sm" style={{color: 'oklch(0.75 0.04 220)'}}>Pensato per aziende dentali, gruppi clinici e partner industriali</p>
              </div>
              
              <div className="flex items-end gap-1 mb-6 mt-2">
                <span className="text-3xl font-bold text-display text-white">Soluzione</span>
                <span className="mb-1" style={{color: 'oklch(0.75 0.12 195)'}}>Custom</span>
              </div>
              
              <div className="space-y-3 mb-8 flex-1">
                {[
                  "Profilo aziendale dedicato",
                  "Libreria Video 3D personalizzata",
                  "Archivio 3D con spazio scalabile",
                  "Branding personalizzato (logo e identità visiva)",
                  "Area riservata custom per clienti",
                  "Integrazione catalogo prodotti 3D",
                  "Sviluppi dedicati su richiesta"
                ].map((feature, index) => (
                  <div key={index} className="flex gap-3 items-start">
                    <Check className="w-5 h-5 flex-shrink-0 mt-0.5" style={{color: 'oklch(0.75 0.12 195)'}} />
                    <span className="text-sm" style={{color: 'oklch(0.85 0.03 220)'}}>{feature}</span>
                  </div>
                ))}
              </div>
              
              <p className="text-xs mb-6 border-t pt-4" style={{color: 'oklch(0.65 0.04 220)', borderColor: 'oklch(1 0 0 / 15%)'}}>
                <strong style={{color: 'oklch(0.85 0.03 220)'}}>Ideale per:</strong> Aziende implantari, produttori, network clinici e realtà formative.
              </p>
              
              <Button className="w-full border-2 text-white hover:bg-white/10" variant="outline" style={{borderColor: 'oklch(0.75 0.12 195)', color: 'white'}} onClick={() => openContactDialog(
                "contattaci",
                "Contattaci",
                "Compila il form per ricevere maggiori informazioni sulla soluzione Aziendale"
              )}>
                Contattaci
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* SmAile UP Integration Section */}
      <section id="smaileup" className="py-20 md:py-32 bg-muted/30">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 animate-on-scroll">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20 mb-6">
                <Link2 className="w-4 h-4" />
                Integrazione Esclusiva
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-display">
                3D Clinical incontra{" "}
                <span className="text-primary">SmAile UP</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                La simulazione del sorriso più avanzata al mondo è ora integrata direttamente in 3D Clinical. Un ecosistema completo per convertire, convincere e fidelizzare.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8 animate-on-scroll">
                <div className="flex items-center gap-6 mb-8">
                  <img
                    src="/logo.png"
                    alt="3D Clinical"
                    className="h-12 w-auto"
                  />
                  <div className="text-2xl font-light text-muted-foreground">+</div>
                  <img
                    src="https://files.manuscdn.com/user_upload_by_module/session_file/310419663031355817/fDBUFJfzwaLRveAb.png"
                    alt="SmAile UP"
                    className="h-16 w-auto"
                  />
                </div>

                <p className="text-lg text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">SmAile UP</strong> crea in pochi secondi una simulazione fotorealistica del nuovo sorriso del paziente. Integrata in 3D Clinical, questa tecnologia diventa parte del tuo workflow clinico quotidiano.
                </p>

                <div className="grid gap-4">
                  {[
                    {
                      title: "Snap → Simula → Converti",
                      description: "Scatta una foto, scegli il trattamento, mostra il risultato prima ancora di parlare di prezzo"
                    },
                    {
                      title: "Elimina il 'ci penso'",
                      description: "Il paziente vede il proprio sorriso trasformato in 30 secondi: smette di decidere se, inizia a decidere quando"
                    },
                    {
                      title: "+40% di accettazione dei piani di cura",
                      description: "Simulazioni fotorealistiche con video da 8 secondi che lasciano il paziente senza parole"
                    }
                  ].map((item, index) => (
                    <div key={index} className="flex gap-4 p-4 rounded-xl bg-background border border-border/50">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1 text-display">{item.title}</h4>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-4">
                  <Button 
                    className="bg-primary hover:bg-primary/90 text-primary-foreground" 
                    size="lg"
                    onClick={() => openContactDialog(
                      "richiedi-demo",
                      "Scopri l'Integrazione con SmAile UP",
                      "Compila il form per ricevere maggiori informazioni sull'integrazione con SmAile UP"
                    )}
                  >
                    Scopri l'integrazione
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <a href="https://smaileup.com" target="_blank" rel="noopener noreferrer">
                      Visita SmAile UP
                    </a>
                  </Button>
                </div>
              </div>

              <div className="relative animate-on-scroll">
                <Card className="p-8 glass border-2 border-primary/20 shadow-2xl">
                  <div className="text-center mb-6">
                    <img 
                      src="https://files.manuscdn.com/user_upload_by_module/session_file/310419663031355817/fDBUFJfzwaLRveAb.png"
                      alt="SmAile UP Studio"
                      className="h-20 w-auto mx-auto mb-4"
                    />
                    <p className="text-sm text-muted-foreground">Incluso nei piani 3D Clinical</p>
                  </div>

                  <div className="space-y-4">
                    {[
                      { label: "Simulazioni AI fotorealistiche", value: "✓ Incluso" },
                      { label: "Video sorriso 5 secondi", value: "✓ Incluso" },
                      { label: "Invio automatico al paziente", value: "✓ Incluso" },
                      { label: "Archivio pazienti integrato", value: "✓ Incluso" },
                      { label: "Brand dello studio su ogni simulazione", value: "✓ Incluso" },
                      { label: "Tasso di accettazione", value: "+40%" },
                    ].map((item, index) => (
                      <div key={index} className="flex justify-between items-center py-2 border-b border-border/30 last:border-0">
                        <span className="text-sm text-muted-foreground">{item.label}</span>
                        <span className="text-sm font-semibold text-primary">{item.value}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 p-4 rounded-xl bg-primary/5 border border-primary/20">
                    <p className="text-sm text-center text-muted-foreground">
                      <strong className="text-foreground">"Fai dire WOW</strong> prima ancora di parlare del prezzo."
                    </p>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AR Innovation Section */}
      <section id="innovazione" className="py-20 md:py-32 bg-gradient-to-br from-primary/5 via-accent/5 to-primary/10 relative overflow-hidden">
        <div className="absolute inset-0 noise opacity-50" />
        
        <div className="container relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 animate-on-scroll">
              <div className="inline-block">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-semibold">
                  <Sparkles className="w-4 h-4" />
                  Il Futuro è Qui
                </span>
              </div>
              
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-display">
                Visita Immersiva in{" "}
                <span className="text-primary">Realtà Aumentata</span>
              </h2>
              
              <p className="text-lg text-muted-foreground leading-relaxed">
                Non un semplice effetto tecnologico, ma uno strumento clinico avanzato che permette al paziente di comprendere il proprio caso in modo intuitivo e coinvolgente.
              </p>
              
              <div className="space-y-4">
                {[
                  "Visualizzare anatomia e patologie in 3D nello spazio reale",
                  "Comprendere il proprio caso in modo intuitivo",
                  "Interagire con modelli clinici durante la spiegazione",
                  "Aumentare consapevolezza e adesione al trattamento"
                ].map((benefit, index) => (
                  <div key={index} className="flex gap-3 items-start">
                    <div className="w-6 h-6 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative animate-on-scroll">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://private-us-east-1.manuscdn.com/sessionFile/6hbUvjo2Vldk0czDWoG1VA/sandbox/KaXusTeGAJtR9MCZg9USJ6-img-3_1770930920000_na1fn_YXItZXhwZXJpZW5jZQ.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvNmhiVXZqbzJWbGRrMGN6RFdvRzFWQS9zYW5kYm94L0thWHVzVGVHQUp0UjlNQ1pnOVVTSjYtaW1nLTNfMTc3MDkzMDkyMDAwMF9uYTFmbl9ZWEl0Wlhod1pYSnBaVzVqWlEucG5nP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=RCH6CQKA5OVw-oR38ti5l4UWDoGB1MtXLVABzNe1eqIKzI7HK9jG~NRCuBNHn7SImGIYOIpX7Mc7JaeqaxwxC8EDE5U9JOrH7XXu2OjCzL5-aVmjaPHuxx3aJyJVNcSheiSP2sQrIc1EBYs~4zOKUnQBYFs9LC4GtV2vM1waA3vUne0Wm3u7vuf49Hyu0yX~DQTIf15yG2bPEt0Td9XVNEKg9792a0xfCcV-eRi-k6qyf4ikestiMK4krodLbcygslfzsHLQ7RgeJ5SXztRK1FVxS5ChRghw2Mn9vrmLSq0s7STPxZmyn-oznNihlFhW28JAJcean2DlkSMU9IWPeQ__"
                  alt="AR Experience"
                  className="w-full h-auto"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-primary/30 rounded-full blur-3xl" />
              <div className="absolute -top-8 -left-8 w-40 h-40 bg-accent/30 rounded-full blur-3xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Why Section */}
      <section className="py-20 md:py-32">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16 animate-on-scroll">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-display">
              Perché scegliere{" "}
              <span className="text-primary">3D Clinical</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Progettato da odontoiatri per odontoiatri
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              "Non è un software gestionale - È uno strumento clinico specializzato",
              "Si integra nei flussi reali - Non stravolge il tuo modo di lavorare",
              "Cresce con lo studio - Scalabile senza complicazioni",
              "Completa l'ecosistema digitale - Non compete con gestionali, scanner o CAD",
              "Valorizza tempo e professionalità - Ogni minuto risparmiato è tempo per i pazienti"
            ].map((reason, index) => (
              <div 
                key={index}
                className="flex gap-4 items-start p-6 rounded-xl glass hover-lift animate-on-scroll"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-6 h-6 rounded-lg bg-primary flex items-center justify-center flex-shrink-0 mt-1">
                  <Check className="w-4 h-4 text-primary-foreground" />
                </div>
                <p className="text-foreground font-medium">{reason}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-primary via-primary/90 to-accent relative overflow-hidden">
        <div className="absolute inset-0 noise opacity-20" />
        
        <div className="container relative text-center">
          <div className="max-w-3xl mx-auto space-y-8 animate-on-scroll">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-display">
              Trasforma la comunicazione clinica da momento dispersivo a processo strutturato
            </h2>
            
            <p className="text-lg text-white/90 leading-relaxed">
              Unisciti alla beta e costruisci con noi il nuovo standard della comunicazione odontoiatrica
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button 
                size="lg" 
                variant="secondary" 
                className="bg-white text-primary hover:bg-white/90 font-semibold"
                onClick={() => openContactDialog(
                  "richiedi-demo",
                  "Richiedi Accesso alla Beta",
                  "Compila il form per ricevere accesso alla beta di 3D Clinical"
                )}
              >
                Richiedi accesso alla beta
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-white text-white hover:bg-white/10"
                onClick={() => openContactDialog(
                  "richiedi-demo",
                  "Prenota una Demo Personalizzata",
                  "Compila il form per prenotare una demo personalizzata con il nostro team"
                )}
              >
                Prenota una demo personalizzata
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-muted/30 border-t border-border/50">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div className="lg:col-span-1">
              <img
                src="/logo.png"
                alt="3D Clinical"
                className="h-10 w-auto mb-4"
              />
              <p className="text-sm text-muted-foreground">
                La piattaforma di comunicazione clinica per lo studio odontoiatrico digitale
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-display">Funzionalità</h4>
              <p className="text-sm text-muted-foreground">
                <a href="#funzionalita" className="hover:text-foreground transition-colors">Scopri tutte le funzionalità</a>
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-display">Piani e Prezzi</h4>
              <p className="text-sm text-muted-foreground">
                <a href="#piani" className="hover:text-foreground transition-colors">Trova il piano adatto a te</a>
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-display">Innovazione AR</h4>
              <p className="text-sm text-muted-foreground">
                <a href="#innovazione" className="hover:text-foreground transition-colors">Esplora la realtà aumentata</a>
              </p>
            </div>

            {/* Temporaneamente commentato - In attesa di contenuti */}
            {/* <div>
              <h4 className="font-semibold mb-4 text-display">Azienda</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Chi siamo</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Contatti</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Blog</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-display">Legale</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Termini di servizio</a></li>
              </ul>
            </div> */}
          </div>

          <div className="pt-8 border-t border-border/50 text-center text-sm text-muted-foreground">
            <p>© 2026 3D Clinical. Tutti i diritti riservati.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

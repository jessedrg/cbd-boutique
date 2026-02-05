"use client";

import { useState, useEffect, useCallback } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { type Locale } from "@/lib/seo-data";
import { cn } from "@/lib/utils";

interface TestimonialsProps {
  locale: Locale;
}

const SECTION_HEADER: Record<string, { eyebrow: string; title: string; subtitle: string }> = {
  en: { 
    eyebrow: "Customer Reviews", 
    title: "What our community says",
    subtitle: "Join over 50,000 customers who have made CBD Boutique their trusted source for premium wellness products. Every review is from a verified purchase."
  },
  es: { 
    eyebrow: "Opiniones de Clientes", 
    title: "Lo que dice nuestra comunidad",
    subtitle: "Unete a mas de 50.000 clientes que han hecho de CBD Boutique su fuente de confianza para productos de bienestar premium. Cada resena es de una compra verificada."
  },
  de: { 
    eyebrow: "Kundenbewertungen", 
    title: "Was unsere Community sagt",
    subtitle: "Schliessen Sie sich uber 50.000 Kunden an, die CBD Boutique als ihre vertrauenswurdige Quelle fur Premium-Wellness-Produkte gewahlt haben."
  },
  fr: { 
    eyebrow: "Avis Clients", 
    title: "Ce que dit notre communaute",
    subtitle: "Rejoignez plus de 50 000 clients qui ont fait de CBD Boutique leur source de confiance pour les produits de bien-etre premium."
  },
};

const TESTIMONIALS: Record<string, { name: string; location: string; rating: number; text: string; product: string; date: string }[]> = {
  en: [
    {
      name: "Sarah M.",
      location: "Berlin, Germany",
      rating: 5,
      text: "I've been using CBD Boutique's full-spectrum oil for three months now and the difference in my daily routine is remarkable. The quality is consistently excellent, and I appreciate that I can verify every lab result. The 15% oil is my go-to for evening relaxation. Their customer service team also helped me find the perfect dosage.",
      product: "Full Spectrum CBD Oil 15%",
      date: "January 2026"
    },
    {
      name: "Marco R.",
      location: "Milan, Italy",
      rating: 5,
      text: "As someone who has tried many CBD brands, CBD Boutique stands out for their transparency and product quality. The CBD flowers are fresh, aromatic, and clearly grown with care. The terpene profiles are rich and complex. I've recommended them to all my friends and family members who are interested in natural wellness.",
      product: "Premium CBD Flowers - Swiss Alpine",
      date: "December 2025"
    },
    {
      name: "Anne-Sophie L.",
      location: "Lyon, France",
      rating: 5,
      text: "The CBD skincare line has become an essential part of my beauty routine. The face serum absorbs beautifully and my skin has never looked better. I love that they use organic ingredients and that everything is lab-tested. The packaging is also beautiful and eco-friendly, which matters a lot to me.",
      product: "CBD Rejuvenating Face Serum",
      date: "November 2025"
    },
    {
      name: "Thomas K.",
      location: "Zurich, Switzerland",
      rating: 5,
      text: "Excellent products and lightning-fast shipping. I ordered on Monday evening and received my package on Wednesday morning. The CBD gummies taste amazing, much better than other brands I've tried, and the dosing is precise at 25mg per piece. This is now my only CBD supplier.",
      product: "CBD Gummies 25mg - Mixed Berry",
      date: "January 2026"
    },
    {
      name: "Elena V.",
      location: "Amsterdam, Netherlands",
      rating: 5,
      text: "I started using their pet CBD drops for my anxious rescue dog, and the results have been wonderful. He's calmer during thunderstorms and car rides. The vet-approved formula gives me confidence. I've since also started using the human CBD oil for myself. The whole family benefits from CBD Boutique.",
      product: "CBD Pet Drops - Calming Formula",
      date: "October 2025"
    },
  ],
  es: [
    {
      name: "Sarah M.",
      location: "Berlin, Alemania",
      rating: 5,
      text: "He estado usando el aceite de espectro completo de CBD Boutique durante tres meses y la diferencia en mi rutina diaria es notable. La calidad es consistentemente excelente y aprecio poder verificar cada resultado de laboratorio. El aceite al 15% es mi favorito para la relajacion nocturna.",
      product: "Aceite CBD Espectro Completo 15%",
      date: "Enero 2026"
    },
    {
      name: "Marco R.",
      location: "Milan, Italia",
      rating: 5,
      text: "Como alguien que ha probado muchas marcas de CBD, CBD Boutique destaca por su transparencia y calidad. Las flores son frescas, aromaticas y claramente cultivadas con cuidado. Los perfiles terpenicos son ricos y complejos. Los he recomendado a toda mi familia.",
      product: "Flores CBD Premium - Alpinas Suizas",
      date: "Diciembre 2025"
    },
    {
      name: "Anne-Sophie L.",
      location: "Lyon, Francia",
      rating: 5,
      text: "La linea de cosmetica CBD se ha convertido en parte esencial de mi rutina de belleza. El serum facial se absorbe maravillosamente y mi piel nunca ha estado mejor. Me encanta que usen ingredientes organicos y que todo este testado en laboratorio.",
      product: "Serum Facial Rejuvenecedor CBD",
      date: "Noviembre 2025"
    },
    {
      name: "Thomas K.",
      location: "Zurich, Suiza",
      rating: 5,
      text: "Productos excelentes y envio rapidisimo. Pedi el lunes por la noche y recibi mi paquete el miercoles por la manana. Las gominolas de CBD saben increible y la dosificacion es precisa a 25mg por pieza. Este es ahora mi unico proveedor de CBD.",
      product: "Gominolas CBD 25mg - Frutos del Bosque",
      date: "Enero 2026"
    },
    {
      name: "Elena V.",
      location: "Amsterdam, Paises Bajos",
      rating: 5,
      text: "Empece a usar sus gotas CBD para mascotas con mi perro rescatado ansioso, y los resultados han sido maravillosos. Esta mas tranquilo durante tormentas y viajes en coche. La formula aprobada por veterinarios me da confianza.",
      product: "Gotas CBD para Mascotas - Formula Calmante",
      date: "Octubre 2025"
    },
  ],
  de: [
    {
      name: "Sarah M.",
      location: "Berlin, Deutschland",
      rating: 5,
      text: "Ich verwende das Vollspektrum-Ol von CBD Boutique seit drei Monaten und der Unterschied in meiner taglichen Routine ist bemerkenswert. Die Qualitat ist durchgehend ausgezeichnet und ich schatze es, jeden Laborbericht einsehen zu konnen.",
      product: "Vollspektrum CBD-Ol 15%",
      date: "Januar 2026"
    },
    {
      name: "Marco R.",
      location: "Mailand, Italien",
      rating: 5,
      text: "Als jemand, der viele CBD-Marken ausprobiert hat, sticht CBD Boutique durch Transparenz und Produktqualitat hervor. Die CBD-Bluten sind frisch, aromatisch und mit Sorgfalt angebaut.",
      product: "Premium CBD-Bluten - Schweizer Alpen",
      date: "Dezember 2025"
    },
    {
      name: "Anne-Sophie L.",
      location: "Lyon, Frankreich",
      rating: 5,
      text: "Die CBD-Hautpflegelinie ist ein wesentlicher Teil meiner Beauty-Routine geworden. Das Gesichtsserum zieht wunderbar ein und meine Haut sah nie besser aus.",
      product: "CBD Verjungendes Gesichtsserum",
      date: "November 2025"
    },
    {
      name: "Thomas K.",
      location: "Zurich, Schweiz",
      rating: 5,
      text: "Ausgezeichnete Produkte und blitzschneller Versand. Montag abends bestellt, Mittwoch morgens erhalten. Die CBD-Gummis schmecken fantastisch und die Dosierung ist prazise bei 25mg pro Stuck.",
      product: "CBD Gummis 25mg - Beerenmix",
      date: "Januar 2026"
    },
    {
      name: "Elena V.",
      location: "Amsterdam, Niederlande",
      rating: 5,
      text: "Ich habe die CBD-Tropfen fur Haustiere fur meinen angstlichen Rettungshund angefangen und die Ergebnisse sind wunderbar. Er ist ruhiger bei Gewittern und Autofahrten.",
      product: "CBD Tropfen fur Haustiere - Beruhigend",
      date: "Oktober 2025"
    },
  ],
  fr: [
    {
      name: "Sarah M.",
      location: "Berlin, Allemagne",
      rating: 5,
      text: "J'utilise l'huile a spectre complet de CBD Boutique depuis trois mois et la difference dans ma routine quotidienne est remarquable. La qualite est constamment excellente et j'apprecie pouvoir verifier chaque resultat de laboratoire.",
      product: "Huile CBD Spectre Complet 15%",
      date: "Janvier 2026"
    },
    {
      name: "Marco R.",
      location: "Milan, Italie",
      rating: 5,
      text: "En tant que personne ayant essaye de nombreuses marques de CBD, CBD Boutique se demarque par sa transparence et la qualite de ses produits. Les fleurs sont fraiches, aromatiques et clairement cultivees avec soin.",
      product: "Fleurs CBD Premium - Alpes Suisses",
      date: "Decembre 2025"
    },
    {
      name: "Anne-Sophie L.",
      location: "Lyon, France",
      rating: 5,
      text: "La ligne de soins CBD est devenue essentielle dans ma routine beaute. Le serum visage s'absorbe merveilleusement et ma peau n'a jamais ete aussi belle.",
      product: "Serum Visage Rajeunissant CBD",
      date: "Novembre 2025"
    },
    {
      name: "Thomas K.",
      location: "Zurich, Suisse",
      rating: 5,
      text: "Excellents produits et livraison ultra-rapide. Commande lundi soir, colis recu mercredi matin. Les gummies CBD ont un gout incroyable et le dosage est precis a 25mg par piece.",
      product: "Gummies CBD 25mg - Fruits Rouges",
      date: "Janvier 2026"
    },
    {
      name: "Elena V.",
      location: "Amsterdam, Pays-Bas",
      rating: 5,
      text: "J'ai commence a utiliser les gouttes CBD pour animaux pour mon chien de sauvetage anxieux et les resultats sont merveilleux. Il est plus calme pendant les orages et les trajets en voiture.",
      product: "Gouttes CBD Animaux - Formule Apaisante",
      date: "Octobre 2025"
    },
  ],
};

export function Testimonials({ locale }: TestimonialsProps) {
  const header = SECTION_HEADER[locale] || SECTION_HEADER.en;
  const reviews = TESTIMONIALS[locale] || TESTIMONIALS.en;
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goTo = useCallback((index: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveIndex(index);
      setIsTransitioning(false);
    }, 300);
  }, [isTransitioning]);

  const next = () => goTo((activeIndex + 1) % reviews.length);
  const prev = () => goTo((activeIndex - 1 + reviews.length) % reviews.length);

  // Auto-advance
  useEffect(() => {
    const interval = setInterval(next, 7000);
    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex]);

  const review = reviews[activeIndex];

  return (
    <section className="py-24 lg:py-32 bg-secondary/30">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16 lg:mb-20">
          <span className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground mb-4 block">
            {header.eyebrow}
          </span>
          <h2 className="text-3xl lg:text-5xl font-serif font-light tracking-tight mb-6 text-balance">
            {header.title}
          </h2>
          <p className="text-muted-foreground font-light max-w-2xl mx-auto leading-relaxed">
            {header.subtitle}
          </p>
        </div>

        {/* Featured Review */}
        <div className="max-w-4xl mx-auto">
          <div className={cn(
            "transition-all duration-300",
            isTransitioning ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
          )}>
            <div className="text-center mb-10">
              <Quote className="h-8 w-8 text-primary/30 mx-auto mb-8" strokeWidth={1} />
              <blockquote className="text-lg md:text-xl lg:text-2xl font-serif font-light leading-relaxed text-foreground/80 mb-8">
                &ldquo;{review.text}&rdquo;
              </blockquote>
              <div className="flex items-center justify-center gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={cn("h-4 w-4", i < review.rating ? "fill-foreground/70 text-foreground/70" : "text-border")} />
                ))}
              </div>
              <p className="text-sm font-medium">{review.name}</p>
              <p className="text-xs text-muted-foreground mt-1">{review.location}</p>
              <p className="text-[10px] uppercase tracking-[0.15em] text-primary/60 mt-2">{review.product}</p>
              <p className="text-[10px] text-muted-foreground/60 mt-1">{review.date}</p>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-8 mt-10">
            <button onClick={prev} className="h-10 w-10 border border-border flex items-center justify-center hover:bg-secondary transition-colors" aria-label="Previous review">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <div className="flex items-center gap-2">
              {reviews.map((_, i) => (
                <button 
                  key={i} 
                  onClick={() => goTo(i)}
                  className={cn(
                    "transition-all duration-300",
                    i === activeIndex ? "w-8 h-1.5 bg-foreground" : "w-2 h-1.5 bg-border hover:bg-foreground/30"
                  )}
                  aria-label={`Go to review ${i + 1}`}
                />
              ))}
            </div>
            <button onClick={next} className="h-10 w-10 border border-border flex items-center justify-center hover:bg-secondary transition-colors" aria-label="Next review">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

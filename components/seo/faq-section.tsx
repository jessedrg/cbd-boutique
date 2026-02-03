import Script from 'next/script';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  locale: string;
  product: string;
  city?: string;
  priceMin?: number;
  priceMax?: number;
}

const FAQ_TEMPLATES: Record<string, FAQItem[]> = {
  es: [
    { question: '¿Es legal comprar {product}?', answer: 'Sí, {product} con menos de 0.2% THC es completamente legal en España y la UE. Todos nuestros productos cumplen con la normativa vigente.' },
    { question: '¿Cuánto tarda el envío{city}?', answer: 'El envío{city} tarda 24-48 horas laborables. Todos los pedidos se envían de forma discreta y segura.' },
    { question: '¿Qué garantía tienen los productos?', answer: 'Todos nuestros productos tienen garantía de satisfacción. Si no estás contento, te devolvemos el dinero.' },
    { question: '¿Los productos están testados?', answer: 'Sí, todos nuestros productos son testados en laboratorios independientes. Puedes ver los certificados en cada producto.' },
    { question: '¿Cuál es el precio de {product}?', answer: 'Los precios de {product} varían entre {priceMin}€ y {priceMax}€ dependiendo del producto y concentración.' },
  ],
  en: [
    { question: 'Is it legal to buy {product}?', answer: 'Yes, {product} with less than 0.2% THC is completely legal in Spain and the EU. All our products comply with current regulations.' },
    { question: 'How long does shipping take{city}?', answer: 'Shipping{city} takes 24-48 business hours. All orders are shipped discreetly and securely.' },
    { question: 'What guarantee do the products have?', answer: 'All our products have a satisfaction guarantee. If you are not happy, we will refund your money.' },
    { question: 'Are the products tested?', answer: 'Yes, all our products are tested in independent laboratories. You can see the certificates on each product.' },
    { question: 'What is the price of {product}?', answer: '{product} prices range from €{priceMin} to €{priceMax} depending on the product and concentration.' },
  ],
  de: [
    { question: 'Ist es legal, {product} zu kaufen?', answer: 'Ja, {product} mit weniger als 0,2% THC ist in Spanien und der EU völlig legal. Alle unsere Produkte entsprechen den geltenden Vorschriften.' },
    { question: 'Wie lange dauert der Versand{city}?', answer: 'Der Versand{city} dauert 24-48 Werktage. Alle Bestellungen werden diskret und sicher versendet.' },
    { question: 'Welche Garantie haben die Produkte?', answer: 'Alle unsere Produkte haben eine Zufriedenheitsgarantie. Wenn Sie nicht zufrieden sind, erstatten wir Ihr Geld.' },
    { question: 'Sind die Produkte getestet?', answer: 'Ja, alle unsere Produkte werden in unabhängigen Labors getestet. Sie können die Zertifikate bei jedem Produkt einsehen.' },
    { question: 'Was kostet {product}?', answer: 'Die Preise für {product} liegen zwischen {priceMin}€ und {priceMax}€ je nach Produkt und Konzentration.' },
  ],
  fr: [
    { question: 'Est-il légal d\'acheter {product}?', answer: 'Oui, {product} avec moins de 0,2% de THC est totalement légal en Espagne et dans l\'UE. Tous nos produits sont conformes à la réglementation en vigueur.' },
    { question: 'Combien de temps prend la livraison{city}?', answer: 'La livraison{city} prend 24-48 heures ouvrables. Toutes les commandes sont expédiées de manière discrète et sécurisée.' },
    { question: 'Quelle garantie ont les produits?', answer: 'Tous nos produits ont une garantie de satisfaction. Si vous n\'êtes pas satisfait, nous vous remboursons.' },
    { question: 'Les produits sont-ils testés?', answer: 'Oui, tous nos produits sont testés dans des laboratoires indépendants. Vous pouvez voir les certificats sur chaque produit.' },
    { question: 'Quel est le prix de {product}?', answer: 'Les prix de {product} varient entre {priceMin}€ et {priceMax}€ selon le produit et la concentration.' },
  ],
  it: [
    { question: 'È legale acquistare {product}?', answer: 'Sì, {product} con meno dello 0,2% di THC è completamente legale in Spagna e nell\'UE. Tutti i nostri prodotti sono conformi alle normative vigenti.' },
    { question: 'Quanto tempo impiega la spedizione{city}?', answer: 'La spedizione{city} richiede 24-48 ore lavorative. Tutti gli ordini vengono spediti in modo discreto e sicuro.' },
    { question: 'Che garanzia hanno i prodotti?', answer: 'Tutti i nostri prodotti hanno una garanzia di soddisfazione. Se non sei soddisfatto, ti rimborsiamo.' },
    { question: 'I prodotti sono testati?', answer: 'Sì, tutti i nostri prodotti sono testati in laboratori indipendenti. Puoi vedere i certificati su ogni prodotto.' },
    { question: 'Qual è il prezzo di {product}?', answer: 'I prezzi di {product} variano tra {priceMin}€ e {priceMax}€ a seconda del prodotto e della concentrazione.' },
  ],
  pt: [
    { question: 'É legal comprar {product}?', answer: 'Sim, {product} com menos de 0,2% de THC é completamente legal em Espanha e na UE. Todos os nossos produtos cumprem a regulamentação vigente.' },
    { question: 'Quanto tempo demora o envio{city}?', answer: 'O envio{city} demora 24-48 horas úteis. Todas as encomendas são enviadas de forma discreta e segura.' },
    { question: 'Que garantia têm os produtos?', answer: 'Todos os nossos produtos têm garantia de satisfação. Se não estiver satisfeito, devolvemos o seu dinheiro.' },
    { question: 'Os produtos são testados?', answer: 'Sim, todos os nossos produtos são testados em laboratórios independentes. Pode ver os certificados em cada produto.' },
    { question: 'Qual é o preço de {product}?', answer: 'Os preços de {product} variam entre {priceMin}€ e {priceMax}€ dependendo do produto e concentração.' },
  ],
  nl: [
    { question: 'Is het legaal om {product} te kopen?', answer: 'Ja, {product} met minder dan 0,2% THC is volledig legaal in Spanje en de EU. Al onze producten voldoen aan de geldende regelgeving.' },
    { question: 'Hoe lang duurt de verzending{city}?', answer: 'De verzending{city} duurt 24-48 werkuren. Alle bestellingen worden discreet en veilig verzonden.' },
    { question: 'Welke garantie hebben de producten?', answer: 'Al onze producten hebben een tevredenheidsgarantie. Als u niet tevreden bent, krijgt u uw geld terug.' },
    { question: 'Zijn de producten getest?', answer: 'Ja, al onze producten worden getest in onafhankelijke laboratoria. U kunt de certificaten bij elk product bekijken.' },
    { question: 'Wat is de prijs van {product}?', answer: 'De prijzen van {product} variëren van €{priceMin} tot €{priceMax} afhankelijk van het product en de concentratie.' },
  ],
  pl: [
    { question: 'Czy kupowanie {product} jest legalne?', answer: 'Tak, {product} z mniej niż 0,2% THC jest całkowicie legalny w Hiszpanii i UE. Wszystkie nasze produkty są zgodne z obowiązującymi przepisami.' },
    { question: 'Jak długo trwa wysyłka{city}?', answer: 'Wysyłka{city} trwa 24-48 godzin roboczych. Wszystkie zamówienia są wysyłane dyskretnie i bezpiecznie.' },
    { question: 'Jaką gwarancję mają produkty?', answer: 'Wszystkie nasze produkty mają gwarancję satysfakcji. Jeśli nie jesteś zadowolony, zwrócimy Ci pieniądze.' },
    { question: 'Czy produkty są testowane?', answer: 'Tak, wszystkie nasze produkty są testowane w niezależnych laboratoriach. Certyfikaty możesz zobaczyć przy każdym produkcie.' },
    { question: 'Jaka jest cena {product}?', answer: 'Ceny {product} wahają się od {priceMin}€ do {priceMax}€ w zależności od produktu i stężenia.' },
  ],
};

function generateFAQs(locale: string, product: string, city?: string, priceMin = 15, priceMax = 150): FAQItem[] {
  const templates = FAQ_TEMPLATES[locale] || FAQ_TEMPLATES.en;
  const cityText = city ? ` to ${city}` : '';
  const cityTextEs = city ? ` a ${city}` : '';
  
  return templates.map(faq => ({
    question: faq.question
      .replace('{product}', product)
      .replace('{city}', locale === 'es' ? cityTextEs : cityText),
    answer: faq.answer
      .replace(/{product}/g, product)
      .replace('{city}', locale === 'es' ? cityTextEs : cityText)
      .replace('{priceMin}', priceMin.toString())
      .replace('{priceMax}', priceMax.toString()),
  }));
}

function generateFAQSchema(faqs: FAQItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}

export function FAQSection({ locale, product, city, priceMin = 15, priceMax = 150 }: FAQSectionProps) {
  const faqs = generateFAQs(locale, product, city, priceMin, priceMax);
  const faqSchema = generateFAQSchema(faqs);
  
  const titles: Record<string, string> = {
    es: 'Preguntas Frecuentes',
    en: 'Frequently Asked Questions',
    de: 'Häufig gestellte Fragen',
    fr: 'Questions Fréquentes',
    it: 'Domande Frequenti',
    pt: 'Perguntas Frequentes',
    nl: 'Veelgestelde Vragen',
    pl: 'Często Zadawane Pytania',
  };

  return (
    <>
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      
      <section className="py-24 bg-muted/30">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-serif font-light tracking-tight">
              {titles[locale] || titles.en}
            </h2>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details 
                key={index}
                className="group bg-background border border-border/50 overflow-hidden"
              >
                <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-muted/50 transition-colors">
                  <span className="font-medium pr-4">{faq.question}</span>
                  <span className="text-muted-foreground group-open:rotate-180 transition-transform">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </summary>
                <div className="px-6 pb-6 text-muted-foreground">
                  <p>{faq.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export function ProductSchema({ 
  name, 
  description, 
  priceMin, 
  priceMax, 
  brand = 'CBD Boutique',
  image 
}: { 
  name: string; 
  description: string; 
  priceMin: number; 
  priceMax: number; 
  brand?: string;
  image?: string;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": name,
    "description": description,
    "brand": {
      "@type": "Brand",
      "name": brand
    },
    "image": image,
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "EUR",
      "lowPrice": priceMin,
      "highPrice": priceMax,
      "availability": "https://schema.org/InStock"
    }
  };

  return (
    <Script
      id="product-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Header } from "@/components/store/header";
import { Footer } from "@/components/store/footer";
import { Button } from "@/components/ui/button";
import { SUPPORTED_LOCALES, type Locale } from "@/lib/seo-data";
import { Mail, Phone, MapPin, Send, CheckCircle, Clock, ShieldCheck, Truck, MessageCircle, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const CONTACT_CONTENT: Record<string, {
  hero: { eyebrow: string; title: string; subtitle: string; intro: string };
  form: { 
    title: string; subtitle: string;
    name: string; email: string; subject: string; phone: string; message: string; 
    submit: string; sending: string; success: string; successMsg: string;
    subjects: string[];
  };
  info: { 
    title: string; subtitle: string;
    email: { label: string; value: string; desc: string };
    phone: { label: string; value: string; desc: string };
    address: { label: string; value: string; desc: string };
    hours: { label: string; lines: string[] };
  };
  faq: { 
    title: string; subtitle: string;
    items: { q: string; a: string }[] 
  };
  trust: { title: string; items: { icon: string; title: string; desc: string }[] };
}> = {
  en: {
    hero: {
      eyebrow: "Get in Touch",
      title: "We're here to help",
      subtitle: "Have questions about our products, need dosage guidance, or want to learn more about CBD? Our team of certified specialists is ready to assist you personally.",
      intro: "Whether you're a first-time CBD user looking for guidance or a long-time customer with a specific question, we're committed to providing you with the expert support you deserve. Our multilingual team speaks English, German, French, Spanish, and Italian."
    },
    form: {
      title: "Send us a message",
      subtitle: "Fill out the form below and our team will respond within 24 hours on business days. For urgent inquiries, please call us directly.",
      name: "Full name",
      email: "Email address",
      phone: "Phone number (optional)",
      subject: "Subject",
      message: "How can we help you?",
      submit: "Send Message",
      sending: "Sending...",
      success: "Message Sent Successfully",
      successMsg: "Thank you for reaching out. Our team will review your message and respond within 24 business hours. If your inquiry is urgent, please don't hesitate to call us directly.",
      subjects: ["Product question", "Order inquiry", "Dosage guidance", "Wholesale inquiry", "Return / Refund", "Partnership", "Press / Media", "Other"],
    },
    info: {
      title: "Contact Information",
      subtitle: "Reach us through any of the following channels. We're always happy to help.",
      email: { label: "Email", value: "hello@cbd-boutique.com", desc: "Best for detailed questions. We respond within 24 hours." },
      phone: { label: "Phone", value: "+41 800 123 456", desc: "Available during business hours. Toll-free from Switzerland." },
      address: { label: "Headquarters", value: "Bahnhofstrasse 42, 8001 Zurich, Switzerland", desc: "Visit by appointment only. Located in central Zurich." },
      hours: { label: "Business Hours", lines: ["Monday - Friday: 9:00 - 18:00 CET", "Saturday: 10:00 - 14:00 CET", "Sunday & Public Holidays: Closed"] },
    },
    faq: {
      title: "Frequently Asked Questions",
      subtitle: "Find answers to the most common questions about our products, shipping, and policies. Can't find what you're looking for? Contact us directly.",
      items: [
        { q: "What is your shipping policy?", a: "We offer free discreet shipping on all orders over 50 EUR across 27 European countries. Standard delivery takes 2-4 business days. Express next-day delivery is available in Switzerland, Germany, France, and Benelux for an additional 9.90 EUR. All packages are shipped in plain, unmarked packaging with no CBD branding visible on the outside." },
        { q: "Are your CBD products legal?", a: "Yes. All our products contain less than 0.2% THC and are fully compliant with EU regulations on industrial hemp products. Our products are classified as food supplements in the European Union. We hold all necessary certifications and our lab reports are publicly available for every batch. However, CBD regulations vary by country, so we recommend checking your local laws." },
        { q: "Do you offer returns and refunds?", a: "We offer a 30-day satisfaction guarantee on all unopened products. If you're not satisfied with your purchase, contact us within 30 days of delivery for a full refund. For opened products, we handle returns on a case-by-case basis and will work with you to find a solution, whether that's a replacement, store credit, or a partial refund." },
        { q: "How do I choose the right CBD product?", a: "Choosing the right CBD product depends on your wellness goals, experience level, and preferred method of consumption. Our CBD specialists offer free consultations via chat, phone, or video call to help you find the perfect product and dosage. As a general guideline, we recommend starting with a low-concentration oil (5-10%) and gradually increasing until you find your optimal dose." },
        { q: "What payment methods do you accept?", a: "We accept Visa, Mastercard, American Express, PayPal, Klarna (buy now, pay later), SOFORT Banking, iDEAL (Netherlands), Bancontact (Belgium), and bank transfer (SEPA). All transactions are processed securely with 256-bit SSL encryption. We do not store your payment details." },
        { q: "Do you ship internationally outside Europe?", a: "Currently, we ship to all 27 EU member states plus Switzerland, Norway, and the United Kingdom. We are actively working on expanding to additional markets. International shipping outside these regions is not available at this time due to varying CBD regulations. Sign up for our newsletter to be notified when we expand to new markets." },
        { q: "Can I use CBD with other medications?", a: "CBD may interact with certain medications, particularly those metabolized by the liver's cytochrome P450 enzyme system. We strongly recommend consulting your healthcare provider before using CBD products, especially if you are taking prescription medications, are pregnant or nursing, or have a pre-existing health condition. Our specialists can provide general wellness guidance but cannot offer medical advice." },
        { q: "How should I store my CBD products?", a: "Store CBD products in a cool, dark place away from direct sunlight and heat. CBD oils should be kept at room temperature (15-25 degrees Celsius) and will last 12-18 months from the production date when stored properly. CBD flowers should be kept in their original sealed packaging in a cool, dry location. Always check the expiration date on the product label." },
      ]
    },
    trust: {
      title: "Why Contact CBD Boutique",
      items: [
        { icon: "message", title: "Expert CBD Guidance", desc: "Our certified specialists complete 120+ hours of training in cannabinoid science and wellness coaching." },
        { icon: "clock", title: "24-Hour Response Time", desc: "We respond to all inquiries within one business day, with most messages answered within 4 hours." },
        { icon: "shield", title: "Privacy Protected", desc: "All communications are encrypted and your personal information is never shared with third parties." },
        { icon: "truck", title: "Order Support", desc: "Real-time order tracking, delivery updates, and dedicated support for any shipping questions." },
      ]
    }
  },
  es: {
    hero: {
      eyebrow: "Contactanos",
      title: "Estamos aqui para ayudarte",
      subtitle: "Tienes preguntas sobre nuestros productos, necesitas orientacion sobre dosificacion o quieres saber mas sobre el CBD? Nuestro equipo de especialistas certificados esta listo para asistirte personalmente.",
      intro: "Ya seas un usuario de CBD por primera vez buscando orientacion o un cliente habitual con una pregunta especifica, nos comprometemos a brindarte el apoyo experto que mereces. Nuestro equipo multilingue habla espanol, ingles, aleman, frances e italiano."
    },
    form: {
      title: "Envianos un mensaje",
      subtitle: "Completa el formulario y nuestro equipo respondera en 24 horas laborables.",
      name: "Nombre completo",
      email: "Correo electronico",
      phone: "Telefono (opcional)",
      subject: "Asunto",
      message: "Como podemos ayudarte?",
      submit: "Enviar Mensaje",
      sending: "Enviando...",
      success: "Mensaje Enviado",
      successMsg: "Gracias por contactarnos. Nuestro equipo revisara tu mensaje y respondera en 24 horas laborables.",
      subjects: ["Pregunta sobre producto", "Consulta de pedido", "Guia de dosificacion", "Consulta mayorista", "Devolucion / Reembolso", "Colaboracion", "Prensa / Medios", "Otro"],
    },
    info: {
      title: "Informacion de Contacto",
      subtitle: "Contactanos a traves de cualquiera de estos canales.",
      email: { label: "Email", value: "hola@cbd-boutique.com", desc: "Ideal para preguntas detalladas. Respondemos en 24h." },
      phone: { label: "Telefono", value: "+41 800 123 456", desc: "Disponible en horario de oficina." },
      address: { label: "Sede Central", value: "Bahnhofstrasse 42, 8001 Zurich, Suiza", desc: "Solo con cita previa. En el centro de Zurich." },
      hours: { label: "Horario", lines: ["Lunes - Viernes: 9:00 - 18:00 CET", "Sabado: 10:00 - 14:00 CET", "Domingo y Festivos: Cerrado"] },
    },
    faq: {
      title: "Preguntas Frecuentes",
      subtitle: "Encuentra respuestas a las preguntas mas comunes.",
      items: [
        { q: "Cual es su politica de envio?", a: "Ofrecemos envio discreto gratuito en pedidos superiores a 50 EUR en 27 paises europeos. La entrega estandar tarda 2-4 dias laborables. Entrega express al dia siguiente disponible en Suiza, Alemania, Francia y Benelux por 9.90 EUR adicionales. Todos los paquetes se envian en embalaje discreto sin marcas de CBD visibles." },
        { q: "Son legales sus productos?", a: "Si. Todos nuestros productos contienen menos del 0.2% de THC y cumplen con las regulaciones de la UE sobre productos de canamo industrial. Nuestros informes de laboratorio estan disponibles publicamente para cada lote." },
        { q: "Ofrecen devoluciones?", a: "Ofrecemos garantia de satisfaccion de 30 dias en productos sin abrir. Para productos abiertos, gestionamos devoluciones caso por caso." },
        { q: "Como elijo el producto CBD adecuado?", a: "Depende de tus objetivos, nivel de experiencia y metodo preferido. Nuestros especialistas ofrecen consultas gratuitas. Recomendamos comenzar con un aceite de baja concentracion (5-10%)." },
        { q: "Que metodos de pago aceptan?", a: "Aceptamos Visa, Mastercard, American Express, PayPal, Klarna, SOFORT Banking, iDEAL, Bancontact y transferencia bancaria SEPA. Todas las transacciones son seguras con encriptacion SSL de 256 bits." },
        { q: "Envian fuera de Europa?", a: "Actualmente enviamos a los 27 estados miembros de la UE mas Suiza, Noruega y el Reino Unido. Estamos trabajando en expandirnos." },
        { q: "Puedo usar CBD con otros medicamentos?", a: "El CBD puede interactuar con ciertos medicamentos. Recomendamos consultar con su medico antes de usar productos CBD, especialmente si toma medicacion." },
        { q: "Como debo almacenar los productos CBD?", a: "Guarda los productos en un lugar fresco y oscuro. Los aceites duran 12-18 meses almacenados correctamente a 15-25 grados. Las flores deben mantenerse en su envase sellado original." },
      ]
    },
    trust: {
      title: "Por que Contactar a CBD Boutique",
      items: [
        { icon: "message", title: "Guia Experta CBD", desc: "Nuestros especialistas certificados completan mas de 120 horas de formacion en ciencia de cannabinoides." },
        { icon: "clock", title: "Respuesta en 24h", desc: "Respondemos a todas las consultas en un dia laborable, con la mayoria respondida en 4 horas." },
        { icon: "shield", title: "Privacidad Protegida", desc: "Todas las comunicaciones estan cifradas y tu informacion personal nunca se comparte." },
        { icon: "truck", title: "Soporte de Pedidos", desc: "Seguimiento en tiempo real, actualizaciones de entrega y soporte dedicado." },
      ]
    }
  },
  de: {
    hero: {
      eyebrow: "Kontakt",
      title: "Wir sind fur Sie da",
      subtitle: "Haben Sie Fragen zu unseren Produkten oder brauchen Sie Beratung? Unser Team zertifizierter Spezialisten hilft Ihnen gerne.",
      intro: "Ob Erstnutzer oder langjahrige Kunden - wir bieten Ihnen die Expertenberatung, die Sie verdienen."
    },
    form: {
      title: "Nachricht senden",
      subtitle: "Fullen Sie das Formular aus und unser Team antwortet innerhalb von 24 Stunden.",
      name: "Vollstandiger Name", email: "E-Mail", phone: "Telefon (optional)", subject: "Betreff", message: "Wie konnen wir helfen?",
      submit: "Nachricht Senden", sending: "Wird gesendet...", success: "Nachricht Gesendet", successMsg: "Vielen Dank. Wir antworten innerhalb von 24 Stunden.",
      subjects: ["Produktfrage", "Bestellanfrage", "Dosierungsberatung", "Grosshandel", "Ruckgabe", "Partnerschaft", "Presse", "Sonstiges"],
    },
    info: {
      title: "Kontaktinformationen", subtitle: "Erreichen Sie uns uber folgende Kanale.",
      email: { label: "E-Mail", value: "hallo@cbd-boutique.com", desc: "Ideal fur detaillierte Fragen. Antwort innerhalb 24h." },
      phone: { label: "Telefon", value: "+41 800 123 456", desc: "Wahrend der Geschaftszeiten erreichbar." },
      address: { label: "Hauptsitz", value: "Bahnhofstrasse 42, 8001 Zurich, Schweiz", desc: "Nur nach Vereinbarung." },
      hours: { label: "Offnungszeiten", lines: ["Montag - Freitag: 9:00 - 18:00 MEZ", "Samstag: 10:00 - 14:00 MEZ", "Sonntag & Feiertage: Geschlossen"] },
    },
    faq: { title: "Haufige Fragen", subtitle: "Antworten auf die haufigsten Fragen.",
      items: [
        { q: "Wie ist Ihre Versandpolitik?", a: "Kostenloser diskreter Versand ab 50 EUR in 27 europaische Lander. Lieferung in 2-4 Werktagen. Expresslieferung am nachsten Tag in der Schweiz, Deutschland, Frankreich und Benelux fur 9.90 EUR." },
        { q: "Sind Ihre Produkte legal?", a: "Ja. Alle Produkte enthalten weniger als 0.2% THC und entsprechen den EU-Vorschriften. Laborberichte sind offentlich verfugbar." },
        { q: "Bieten Sie Ruckgaben an?", a: "30 Tage Zufriedenheitsgarantie auf alle ungeoffneten Produkte." },
        { q: "Wie wahle ich das richtige Produkt?", a: "Unsere Spezialisten bieten kostenlose Beratung. Wir empfehlen, mit einem niedrig dosierten Ol zu beginnen." },
        { q: "Welche Zahlungsmethoden?", a: "Visa, Mastercard, PayPal, Klarna, SOFORT, iDEAL, Bancontact und SEPA-Uberweisung." },
        { q: "Versand ausserhalb Europas?", a: "Derzeit 27 EU-Staaten plus Schweiz, Norwegen und UK." },
        { q: "CBD mit Medikamenten?", a: "Bitte konsultieren Sie Ihren Arzt vor der Verwendung von CBD mit verschreibungspflichtigen Medikamenten." },
        { q: "Wie lagere ich CBD?", a: "Kuhl und dunkel lagern. Ole halten 12-18 Monate bei 15-25 Grad." },
      ]
    },
    trust: { title: "Warum CBD Boutique kontaktieren",
      items: [
        { icon: "message", title: "CBD-Expertenberatung", desc: "Uber 120 Stunden Ausbildung in Cannabinoidwissenschaft." },
        { icon: "clock", title: "24h Antwortzeit", desc: "Antwort auf alle Anfragen innerhalb eines Werktags." },
        { icon: "shield", title: "Datenschutz", desc: "Alle Kommunikation ist verschlusselt." },
        { icon: "truck", title: "Bestellungsunterstutzung", desc: "Echtzeit-Sendungsverfolgung und dedizierter Support." },
      ]
    }
  },
  fr: {
    hero: {
      eyebrow: "Contactez-nous",
      title: "Nous sommes la pour vous aider",
      subtitle: "Des questions sur nos produits ou besoin de conseils? Notre equipe de specialistes certifies est prete a vous assister.",
      intro: "Que vous soyez un nouvel utilisateur de CBD ou un client fidele, nous vous offrons l'accompagnement expert que vous meritez."
    },
    form: {
      title: "Envoyez-nous un message",
      subtitle: "Remplissez le formulaire et notre equipe repondra sous 24 heures.",
      name: "Nom complet", email: "E-mail", phone: "Telephone (optionnel)", subject: "Sujet", message: "Comment pouvons-nous vous aider?",
      submit: "Envoyer", sending: "Envoi...", success: "Message Envoye", successMsg: "Merci. Notre equipe repondra sous 24 heures ouvrables.",
      subjects: ["Question produit", "Suivi commande", "Conseils dosage", "Vente en gros", "Retour / Remboursement", "Partenariat", "Presse", "Autre"],
    },
    info: {
      title: "Informations de Contact", subtitle: "Contactez-nous par l'un de ces canaux.",
      email: { label: "Email", value: "bonjour@cbd-boutique.com", desc: "Ideal pour les questions detaillees. Reponse sous 24h." },
      phone: { label: "Telephone", value: "+41 800 123 456", desc: "Disponible aux heures d'ouverture." },
      address: { label: "Siege Social", value: "Bahnhofstrasse 42, 8001 Zurich, Suisse", desc: "Sur rendez-vous uniquement." },
      hours: { label: "Horaires", lines: ["Lundi - Vendredi: 9h00 - 18h00 CET", "Samedi: 10h00 - 14h00 CET", "Dimanche & Jours feries: Ferme"] },
    },
    faq: { title: "Questions Frequentes", subtitle: "Trouvez les reponses aux questions les plus courantes.",
      items: [
        { q: "Quelle est votre politique de livraison?", a: "Livraison discrete gratuite des 50 EUR dans 27 pays europeens. Delai de 2-4 jours ouvrables. Livraison express disponible." },
        { q: "Vos produits sont-ils legaux?", a: "Oui. Moins de 0.2% THC, conformes aux reglementations UE. Rapports de laboratoire publics." },
        { q: "Proposez-vous des retours?", a: "Garantie satisfaction 30 jours sur les produits non ouverts." },
        { q: "Comment choisir le bon produit?", a: "Nos specialistes offrent des consultations gratuites. Commencez par une huile a faible concentration." },
        { q: "Modes de paiement?", a: "Visa, Mastercard, PayPal, Klarna, SOFORT, iDEAL, Bancontact et virement SEPA." },
        { q: "Livraison hors Europe?", a: "Actuellement 27 etats UE plus Suisse, Norvege et Royaume-Uni." },
        { q: "CBD avec des medicaments?", a: "Consultez votre medecin avant d'utiliser le CBD avec des medicaments." },
        { q: "Comment stocker le CBD?", a: "Conserver au frais et a l'abri de la lumiere. Les huiles se conservent 12-18 mois a 15-25 degres." },
      ]
    },
    trust: { title: "Pourquoi contacter CBD Boutique",
      items: [
        { icon: "message", title: "Conseils Experts CBD", desc: "Plus de 120 heures de formation en science des cannabinoides." },
        { icon: "clock", title: "Reponse sous 24h", desc: "Reponse a toutes les demandes en un jour ouvrable." },
        { icon: "shield", title: "Vie Privee Protegee", desc: "Communications chiffrees, informations jamais partagees." },
        { icon: "truck", title: "Support Commandes", desc: "Suivi en temps reel et support dedie." },
      ]
    }
  }
};

function getTrustIcon(name: string) {
  switch (name) {
    case 'message': return MessageCircle;
    case 'clock': return Clock;
    case 'shield': return ShieldCheck;
    case 'truck': return Truck;
    default: return MessageCircle;
  }
}

export default function ContactPage() {
  const params = useParams();
  const locale = (params.locale as Locale) || 'en';
  const content = CONTACT_CONTENT[locale] || CONTACT_CONTENT.en;
  
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  if (!SUPPORTED_LOCALES.includes(locale)) return null;

  return (
    <main className="min-h-screen bg-background">
      <Header locale={locale} />
      
      {/* Hero */}
      <section className="pt-36 pb-16 lg:pt-44 lg:pb-24">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <span className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground mb-6 block">{content.hero.eyebrow}</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light tracking-tight mb-6">{content.hero.title}</h1>
          <p className="text-lg text-muted-foreground font-light max-w-2xl mx-auto mb-4 leading-relaxed">{content.hero.subtitle}</p>
          <p className="text-sm text-muted-foreground/60 font-light max-w-xl mx-auto leading-relaxed">{content.hero.intro}</p>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="pb-16 lg:pb-20">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {content.trust.items.map((item, i) => {
              const Icon = getTrustIcon(item.icon);
              return (
                <div key={i} className="text-center p-6 bg-secondary/40">
                  <Icon className="h-6 w-6 mx-auto mb-3 text-primary" strokeWidth={1.5} />
                  <h3 className="text-xs uppercase tracking-wider font-medium mb-1.5">{item.title}</h3>
                  <p className="text-[11px] text-muted-foreground font-light leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Grid */}
      <section className="pb-24 lg:pb-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Form */}
            <div>
              <h2 className="text-2xl font-serif font-light mb-2">{content.form.title}</h2>
              <p className="text-sm text-muted-foreground font-light mb-8">{content.form.subtitle}</p>
              
              {isSuccess ? (
                <div className="bg-secondary/30 p-12 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 border border-primary/20 mb-6">
                    <CheckCircle className="h-8 w-8 text-primary" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-serif font-light mb-3">{content.form.success}</h3>
                  <p className="text-sm text-muted-foreground font-light leading-relaxed max-w-md mx-auto">{content.form.successMsg}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-2">{content.form.name}</label>
                      <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full h-13 px-4 bg-transparent border border-border focus:border-primary focus:outline-none transition-colors text-sm" />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-2">{content.form.email}</label>
                      <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full h-13 px-4 bg-transparent border border-border focus:border-primary focus:outline-none transition-colors text-sm" />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-2">{content.form.phone}</label>
                      <input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full h-13 px-4 bg-transparent border border-border focus:border-primary focus:outline-none transition-colors text-sm" />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-2">{content.form.subject}</label>
                      <select required value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full h-13 px-4 bg-transparent border border-border focus:border-primary focus:outline-none transition-colors text-sm appearance-none">
                        <option value="">--</option>
                        {content.form.subjects.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-2">{content.form.message}</label>
                    <textarea required rows={6} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full p-4 bg-transparent border border-border focus:border-primary focus:outline-none transition-colors text-sm resize-none" />
                  </div>
                  <Button type="submit" disabled={isSubmitting} className="w-full h-14 rounded-none text-xs uppercase tracking-[0.2em] font-medium">
                    {isSubmitting ? content.form.sending : (<>{content.form.submit}<Send className="ml-3 h-4 w-4" /></>)}
                  </Button>
                </form>
              )}
            </div>

            {/* Info */}
            <div>
              <h2 className="text-2xl font-serif font-light mb-2">{content.info.title}</h2>
              <p className="text-sm text-muted-foreground font-light mb-8">{content.info.subtitle}</p>
              
              <div className="space-y-8 mb-12">
                {[
                  { icon: Mail, ...content.info.email, href: `mailto:${content.info.email.value}` },
                  { icon: Phone, ...content.info.phone, href: `tel:${content.info.phone.value}` },
                  { icon: MapPin, label: content.info.address.label, value: content.info.address.value, desc: content.info.address.desc, href: undefined },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-5">
                    <div className="w-12 h-12 border border-border/50 flex items-center justify-center flex-shrink-0">
                      <item.icon className="h-5 w-5 text-primary" strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-1">{item.label}</p>
                      {item.href ? (
                        <a href={item.href} className="text-sm hover:text-primary transition-colors">{item.value}</a>
                      ) : (
                        <p className="text-sm">{item.value}</p>
                      )}
                      <p className="text-[11px] text-muted-foreground/60 mt-1 font-light">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Business Hours */}
              <div className="bg-secondary/40 p-6 mb-12">
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="h-4 w-4 text-primary" strokeWidth={1.5} />
                  <h3 className="text-xs uppercase tracking-wider font-medium">{content.info.hours.label}</h3>
                </div>
                <div className="space-y-2">
                  {content.info.hours.lines.map((line, i) => (
                    <p key={i} className="text-sm text-muted-foreground font-light">{line}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 lg:py-32 bg-secondary/30">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-serif font-light tracking-tight mb-4">{content.faq.title}</h2>
            <p className="text-muted-foreground font-light max-w-2xl mx-auto">{content.faq.subtitle}</p>
          </div>
          <div className="space-y-0">
            {content.faq.items.map((item, index) => (
              <div key={index} className="border-b border-border/50">
                <button onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full py-6 flex items-center justify-between text-left group cursor-pointer">
                  <h3 className="text-sm font-medium pr-8">{item.q}</h3>
                  <ChevronDown className={cn("h-4 w-4 text-muted-foreground flex-shrink-0 transition-transform duration-300", openFaq === index && "rotate-180")} />
                </button>
                <div className={cn("overflow-hidden transition-all duration-500", openFaq === index ? "max-h-96 pb-6" : "max-h-0")}>
                  <p className="text-sm text-muted-foreground font-light leading-relaxed pr-8">{item.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Image */}
      <section className="relative h-[400px] lg:h-[500px]">
        <Image src="/images/contact-office.jpg" alt="CBD Boutique storefront in Zurich" fill className="object-cover" />
        <div className="absolute inset-0 bg-foreground/30" />
      </section>

      <Footer locale={locale} />
    </main>
  );
}

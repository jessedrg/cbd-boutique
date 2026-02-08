import Script from "next/script";
import Image from "next/image";
import Link from "next/link";
import { Star, Check, Leaf, FlaskConical, Truck, Shield, Droplets, Scale, BookOpen, Gavel } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollToProductsButton } from "@/components/store/scroll-to-products";
import type { Locale } from "@/lib/seo-data";

// =============================================================================
// TYPES
// =============================================================================

type ProductType = "cbd-oil" | "cbd-vape" | "cbd-flowers" | "cbd-capsules" | "cbd-isolate" | "cbd-edibles";

interface ProductLandingProps {
  locale: Locale;
  productType: ProductType;
  country: string;
  countryCode: string;
  cityName?: string;
}

// =============================================================================
// PRODUCT CONTENT DATABASE
// =============================================================================

interface ProductContent {
  name: string;
  heroSubtitle: string;
  description: string;
  idealFor: string;
  howToUse: string;
  vsDifference: string;
  dosageIntro: string;
  dosageTable: { level: string; dose: string; frequency: string }[];
  dosageNote: string;
}

interface CountryLegal {
  countryName: string;
  legalStatus: string;
  thcLimit: string;
  onlineSales: string;
  summary: string;
}

interface ReviewData {
  name: string;
  product: string;
  text: string;
  rating: number;
}

interface FAQData {
  question: string;
  answer: string;
}

// =============================================================================
// SPANISH PRODUCT CONTENT
// =============================================================================

const PRODUCT_CONTENT_ES: Record<ProductType, ProductContent> = {
  "cbd-oil": {
    name: "Aceite CBD",
    heroSubtitle: "Aceite CBD de espectro completo, elaborado con cañamo organico europeo y testado en laboratorios independientes. Absorcion sublingual rapida para resultados en minutos.",
    description: `El aceite CBD es un extracto concentrado de cannabidiol obtenido mediante extraccion supercritica con CO2, el metodo mas limpio y eficiente disponible. Este proceso preserva todos los cannabinoides, terpenos y flavonoides naturales del cañamo, creando lo que se conoce como "efecto sequito" para una mayor eficacia.

Nuestros aceites estan disponibles en concentraciones de 5%, 10%, 15%, 20% y 30%, con base de aceite MCT de coco organico que mejora la biodisponibilidad. Cada lote es analizado por laboratorios independientes certificados, garantizando pureza, potencia y ausencia de metales pesados, pesticidas y solventes residuales.

La extraccion se realiza a partir de cañamo industrial cultivado en granjas certificadas de Suiza, Italia y Paises Bajos, bajo estrictos estandares de agricultura organica de la UE. El resultado es un aceite dorado, de sabor suave y terroso, con un perfil completo de cannabinoides.`,
    idealFor: "Personas que buscan apoyo para el bienestar general, manejo del estres diario, mejora de la calidad del sueño, y quienes prefieren una administracion precisa con dosificacion gota a gota. Ideal tanto para principiantes como usuarios experimentados.",
    howToUse: "Coloca las gotas bajo la lengua y mantenlas 60-90 segundos antes de tragar. La mucosa sublingual permite una absorcion rapida al torrente sanguineo, con efectos perceptibles en 15-30 minutos. Puedes tomarlo 1-3 veces al dia, preferiblemente con el estomago vacio para mejor absorcion.",
    vsDifference: "A diferencia de las capsulas (que tardan 1-2 horas en hacer efecto) o los vapes (efecto inmediato pero breve), el aceite CBD ofrece el equilibrio perfecto: absorcion rapida sublingual con efectos sostenidos de 4-6 horas. Ademas, permite ajustar la dosis gota a gota.",
    dosageIntro: "La dosis ideal de aceite CBD varia segun el peso corporal, la tolerancia individual y el objetivo buscado. Recomendamos empezar con una dosis baja e ir aumentando gradualmente cada semana hasta encontrar tu punto optimo.",
    dosageTable: [
      { level: "Principiante (< 70 kg)", dose: "10-15 mg / dia", frequency: "2-3 gotas, 2 veces/dia" },
      { level: "Intermedio (70-90 kg)", dose: "15-30 mg / dia", frequency: "4-6 gotas, 2 veces/dia" },
      { level: "Avanzado (> 90 kg)", dose: "30-50 mg / dia", frequency: "6-10 gotas, 2 veces/dia" },
    ],
    dosageNote: "Cada gota de aceite CBD al 10% contiene aproximadamente 5 mg de CBD. Espera al menos una semana antes de aumentar la dosis. Consulta con un profesional de salud si tomas medicacion."
  },
  "cbd-vape": {
    name: "CBD Vape",
    heroSubtitle: "E-liquidos CBD de maxima pureza para vaporizacion. Absorcion pulmonar instantanea con biodisponibilidad superior al 50%.",
    description: `Los e-liquidos CBD para vaporizar son formulaciones especialmente disenadas para su uso en dispositivos de vapeo. Utilizamos CBD aislado de grado farmaceutico disuelto en una base de propilenglicol (PG) y glicerina vegetal (VG), sin nicotina, sin THC detectable y sin aditivos artificiales.

Disponibles en concentraciones de 100mg, 300mg, 500mg y 1000mg por frasco de 10ml. Ofrecemos perfiles de terpenos naturales que replican variedades clasicas como OG Kush, Mango Haze y Strawberry, proporcionando una experiencia aromatica autentica.

Cada lote es analizado mediante cromatografia de alta resolucion (HPLC) para garantizar la concentracion exacta de CBD y la ausencia total de THC, metales pesados y contaminantes.`,
    idealFor: "Usuarios que buscan alivio rapido y efecto inmediato. Perfecto para momentos de estres agudo, ansiedad puntual o cuando necesitas un efecto calmante en segundos. Tambien para exfumadores que buscan una alternativa sin nicotina.",
    howToUse: "Llena el tanque de tu vaporizador con el e-liquido CBD. Realiza inhalaciones suaves y cortas de 2-3 segundos. Espera 5-10 minutos entre sesiones para evaluar el efecto. Empieza con 2-3 caladas y ajusta segun necesidad.",
    vsDifference: "El vape CBD ofrece la mayor biodisponibilidad (50-60%) y el efecto mas rapido (segundos) de todos los metodos. Sin embargo, su duracion es la mas corta (1-2 horas). Comparado con el aceite (15-30 min, 4-6h) o capsulas (1-2h, 6-8h), es ideal para necesidades puntuales.",
    dosageIntro: "La dosificacion de CBD vape se mide por caladas (puffs). Cada calada de un e-liquido de 500mg/10ml proporciona aproximadamente 1-2mg de CBD.",
    dosageTable: [
      { level: "Principiante", dose: "5-10 mg / sesion", frequency: "3-5 caladas, 1-2 veces/dia" },
      { level: "Intermedio", dose: "10-20 mg / sesion", frequency: "5-10 caladas, 2-3 veces/dia" },
      { level: "Avanzado", dose: "20-40 mg / sesion", frequency: "10-20 caladas, 2-3 veces/dia" },
    ],
    dosageNote: "No excedas las 20 caladas por sesion. Si sientes mareo o sequedad bucal, reduce la frecuencia. Bebe abundante agua al vapear."
  },
  "cbd-flowers": {
    name: "Flores CBD",
    heroSubtitle: "Flores de cañamo premium cultivadas en interior, con perfiles terpenicos complejos y menos de 0.2% THC. Secado lento artesanal.",
    description: `Las flores CBD son los cogollos del cañamo industrial (Cannabis sativa L.) cultivados para maximizar el contenido de cannabidiol mientras mantienen el THC por debajo del limite legal del 0.2%. Nuestras flores son cultivadas en interior (indoor) bajo condiciones controladas de luz, temperatura y humedad.

Ofrecemos variedades clasicas como Amnesia Haze CBD, OG Kush CBD, Lemon Haze CBD y Gorilla Glue CBD, cada una con su perfil unico de terpenos que determina su aroma, sabor y efectos. El contenido de CBD varia entre 8% y 25% segun la variedad.

El proceso de secado artesanal durante 14-21 dias a temperatura controlada preserva los terpenos volatiles y garantiza una experiencia aromatica excepcional. Cada lote incluye certificado de analisis completo.`,
    idealFor: "Conocedores que valoran la experiencia sensorial completa del cañamo. Ideal para quienes disfrutan de los aromas y sabores naturales, buscan el efecto sequito completo, o desean usar infusiones, vaporizacion en seco o fines aromaticos.",
    howToUse: "Las flores CBD se pueden utilizar como aromatizante ambiental, en infusiones (decarboxilacion previa recomendada con grasa para mejor absorcion), o en vaporizadores de hierba seca a 180-210 grados C. Para infusiones, hierve agua, anade la flor con un poco de mantequilla o aceite de coco, y deja reposar 15 minutos.",
    vsDifference: "Las flores CBD ofrecen el perfil de cannabinoides mas completo y natural, con todos los terpenos y flavonoides intactos. A diferencia del aceite (procesado) o el aislado (puro), las flores proporcionan el maximo efecto sequito.",
    dosageIntro: "La dosificacion de flores CBD depende del metodo de consumo y la concentracion de la variedad elegida.",
    dosageTable: [
      { level: "Infusion ligera", dose: "0.3-0.5 g / taza", frequency: "1-2 tazas/dia" },
      { level: "Vaporizacion", dose: "0.1-0.2 g / sesion", frequency: "1-3 sesiones/dia" },
      { level: "Aromaterapia", dose: "0.5-1 g", frequency: "Segun necesidad" },
    ],
    dosageNote: "Las flores de alta concentracion (>15% CBD) requieren menos cantidad. Conservar en lugar fresco, oscuro y seco para mantener la frescura."
  },
  "cbd-capsules": {
    name: "Capsulas CBD",
    heroSubtitle: "Capsulas blandas de CBD con dosificacion exacta. Sin sabor, discretas y perfectas para tu rutina diaria de bienestar.",
    description: `Las capsulas CBD son softgels de gelatina vegetal que contienen una dosis precisa y medida de aceite CBD de espectro completo. Cada capsula esta formulada con aceite MCT como vehiculo para maximizar la absorcion y biodisponibilidad del cannabidiol.

Disponibles en dosificaciones de 10mg, 25mg y 50mg por capsula, en frascos de 30 y 60 unidades. La cubierta de gelatina vegetal es apta para veganos y se disuelve facilmente en el estomago para una liberacion controlada.

Cada lote es fabricado bajo estrictos estandares GMP (Buenas Practicas de Manufactura) y analizado por laboratorios independientes para garantizar consistencia en la dosificacion, pureza y ausencia de contaminantes.`,
    idealFor: "Personas que prefieren una dosificacion exacta y consistente sin necesidad de medir gotas. Perfecto para quienes viajan frecuentemente, no les gusta el sabor del aceite CBD, o buscan la maxima discrecion en su rutina de bienestar.",
    howToUse: "Toma 1-2 capsulas con un vaso de agua, preferiblemente con una comida que contenga grasa para mejorar la absorcion. Los efectos se perciben en 45-90 minutos y duran 6-8 horas. Ideal para tomar por la manana y/o antes de dormir.",
    vsDifference: "Las capsulas ofrecen la dosificacion mas precisa y la mayor duracion de efecto (6-8 horas), pero con un inicio mas lento (45-90 min) comparado con el aceite sublingual (15-30 min) o el vape (segundos). Perfectas para efectos sostenidos durante todo el dia.",
    dosageIntro: "La dosificacion de capsulas CBD es la mas sencilla de todas, ya que cada capsula contiene una cantidad exacta de CBD.",
    dosageTable: [
      { level: "Principiante", dose: "10-25 mg / dia", frequency: "1 capsula de 10mg, 1-2 veces/dia" },
      { level: "Intermedio", dose: "25-50 mg / dia", frequency: "1 capsula de 25mg, 1-2 veces/dia" },
      { level: "Avanzado", dose: "50-100 mg / dia", frequency: "1 capsula de 50mg, 1-2 veces/dia" },
    ],
    dosageNote: "No abras ni mastiques las capsulas. Tomar con comida aumenta la absorcion hasta un 300%. Mantener fuera del alcance de los ninos."
  },
  "cbd-isolate": {
    name: "Aislado CBD",
    heroSubtitle: "Cristales de CBD puro al 99.9%. Sin THC, sin terpenos, sin sabor. Maxima versatilidad para crear tus propias formulaciones.",
    description: `El aislado de CBD (CBD isolate) es la forma mas pura de cannabidiol disponible, con una pureza superior al 99.9%. Se presenta en forma de polvo cristalino blanco, completamente inodoro e insipido, libre de THC y cualquier otro cannabinoide.

Se obtiene mediante un proceso de extraccion avanzado que incluye extraccion con CO2 supercritico, winterizacion, descarboxilacion y cristalizacion final. Este proceso elimina todos los compuestos excepto el CBD puro, incluyendo cualquier traza de THC.

Disponible en presentaciones de 0.5g, 1g, 5g y 10g. Cada lote viene acompanado de un certificado de analisis detallado que verifica la pureza, ausencia de THC y contaminantes.`,
    idealFor: "Usuarios que necesitan CBD puro sin ningun rastro de THC (deportistas sometidos a controles antidoping, personas sensibles a otros cannabinoides) o quienes desean crear sus propias formulaciones personalizadas (cosmetica, alimentacion, topicos).",
    howToUse: "Disuelve la cantidad deseada bajo la lengua, mezcla con un aceite portador (MCT, oliva), anade a alimentos o bebidas, o incorpora en recetas de cosmetica casera. Para uso sublingual, coloca el polvo bajo la lengua y espera 60-90 segundos.",
    vsDifference: "El aislado es CBD en su forma mas pura, sin efecto sequito (a diferencia del aceite de espectro completo o las flores). Esto lo hace ideal para quienes necesitan control total sobre lo que consumen y dosificaciones extremadamente precisas.",
    dosageIntro: "El aislado CBD se dosifica con una bascula de precision. 1 mg de aislado = 1 mg de CBD (pureza 99.9%).",
    dosageTable: [
      { level: "Sublingual", dose: "10-25 mg", frequency: "1-2 veces/dia" },
      { level: "En alimentos", dose: "25-50 mg", frequency: "1 vez/dia" },
      { level: "Cosmetica DIY", dose: "50-100 mg / 30ml", frequency: "Aplicacion topica" },
    ],
    dosageNote: "Utiliza una bascula de precision (0.01g) para medir correctamente. Almacenar en lugar fresco y seco, protegido de la luz directa."
  },
  "cbd-edibles": {
    name: "Comestibles CBD",
    heroSubtitle: "Gummies, chocolates y miel con CBD. Una forma deliciosa y discreta de incorporar el cannabidiol a tu rutina diaria.",
    description: `Los comestibles CBD son productos alimentarios infusionados con cannabidiol de alta calidad. Nuestra gama incluye gummies de frutas naturales, chocolate negro artesanal con CBD, miel cruda infusionada y caramelos blandos, todos elaborados con ingredientes naturales y CBD de espectro completo.

Las gummies estan disponibles en sabores de fresa, mango, limon y frutos del bosque, con 10mg o 25mg de CBD por unidad. El chocolate se elabora con cacao al 70% de origen unico y esta disponible en tabletas de 100mg (10 porciones de 10mg). La miel se presenta en tarros de 250g con 500mg de CBD total.

Todos los comestibles son fabricados en instalaciones certificadas de produccion alimentaria, bajo estrictos controles de calidad y con trazabilidad completa de ingredientes.`,
    idealFor: "Quienes buscan una forma agradable y discreta de tomar CBD. Perfecto para personas que no les gusta el sabor del aceite, principiantes que prefieren una experiencia familiar, o quienes quieren incorporar el CBD como parte de su snack o merienda.",
    howToUse: "Simplemente come el producto como lo harias con cualquier alimento. Las gummies y chocolates se mastican normalmente. La miel se puede anadir al te, yogur o tostadas. Los efectos tardan 30-90 minutos en aparecer y duran 4-6 horas.",
    vsDifference: "Los comestibles son la forma mas agradable de tomar CBD, con efectos prolongados (4-6h). El inicio es mas lento que el aceite sublingual o el vape, pero la experiencia de consumo es mucho mas placentera. Ideal como complemento a otros metodos.",
    dosageIntro: "La dosificacion de comestibles CBD es sencilla ya que cada unidad tiene una cantidad predeterminada.",
    dosageTable: [
      { level: "Principiante", dose: "10 mg / dia", frequency: "1 gummy de 10mg" },
      { level: "Intermedio", dose: "25 mg / dia", frequency: "1 gummy de 25mg o 2.5 porciones de chocolate" },
      { level: "Avanzado", dose: "50 mg / dia", frequency: "2 gummies de 25mg" },
    ],
    dosageNote: "No tomes mas de 70mg de CBD al dia sin supervision profesional. Los comestibles tardan mas en hacer efecto, no tomes una segunda dosis antes de 2 horas."
  },
};

// =============================================================================
// COUNTRY LEGALITY DATABASE
// =============================================================================

const COUNTRY_LEGAL_ES: Record<string, CountryLegal> = {
  spain: {
    countryName: "Espana",
    legalStatus: "El CBD es legal en Espana siempre que provenga de variedades de cañamo industrial autorizadas por la UE y contenga menos del 0.2% de THC. La venta de productos CBD esta regulada como complemento alimentario o producto cosmetico, segun su presentacion.",
    thcLimit: "El limite legal de THC es del 0.2% en el producto final. Todos nuestros productos cumplen con este limite y estan respaldados por certificados de analisis de laboratorios acreditados.",
    onlineSales: "La venta online de productos CBD es completamente legal en Espana. Los envios se realizan dentro del marco legal de la UE, con embalaje discreto y sin restricciones aduaneras para envios nacionales.",
    summary: "Espana tiene una de las regulaciones mas favorables de Europa para el CBD. La AEMPS (Agencia Espanola de Medicamentos) supervisa los productos con claims de salud, mientras que los cosmeticos y aromaterapia tienen libre comercializacion."
  },
  germany: {
    countryName: "Alemania",
    legalStatus: "Desde la Ley de Cannabis de abril 2024, Alemania ha flexibilizado significativamente las regulaciones sobre cannabinoides. El CBD con menos de 0.2% THC es legal como complemento alimentario bajo la regulacion Novel Food de la UE.",
    thcLimit: "El limite legal de THC es 0.2% siguiendo la normativa de la UE. Las flores de cañamo deben provenir de variedades certificadas del catalogo comun europeo.",
    onlineSales: "La venta online es legal y esta extendida en Alemania. Los productos deben cumplir con el BVL (Oficina Federal de Proteccion del Consumidor) y llevar etiquetado en aleman.",
    summary: "Alemania es el mayor mercado de CBD en Europa. La reciente legalizacion parcial del cannabis ha creado un entorno aun mas favorable para los productos CBD legales."
  },
  france: {
    countryName: "Francia",
    legalStatus: "El CBD es legal en Francia tras la sentencia del TJUE de noviembre 2020 (caso Kanavape). Los productos CBD pueden venderse siempre que no contengan THC detectable y provengan de variedades autorizadas.",
    thcLimit: "Francia aplica un limite de THC del 0.3% en la planta y 0.0% en el producto final. Este es uno de los marcos mas estrictos de la UE para productos procesados.",
    onlineSales: "La venta online es legal pero esta regulada por la DGCCRF (Direccion General de Competencia y Fraudes). Los productos no pueden hacer claims terapeuticos y deben cumplir con la normativa Novel Food.",
    summary: "El mercado frances del CBD ha crecido significativamente tras la clarificacion legal de 2020. Actualmente existen mas de 2.000 tiendas CBD en Francia."
  },
  uk: {
    countryName: "Reino Unido",
    legalStatus: "El CBD es legal en el Reino Unido como complemento alimentario bajo la FSA (Food Standards Agency). Los productos requieren una autorizacion Novel Food para su venta legal, proceso en el que CBD Boutique cumple plenamente.",
    thcLimit: "El limite de THC es de 1mg por envase cerrado (no por porcentaje). Esta es una de las regulaciones mas restrictivas de Europa en cuanto a contenido de THC.",
    onlineSales: "La venta online es legal y el mayor canal de distribucion de CBD en el UK. Los productos deben estar registrados en la lista publica de Novel Foods de la FSA.",
    summary: "El Reino Unido es el segundo mayor mercado de CBD del mundo. La FSA ha establecido un marco regulatorio claro que da confianza tanto a vendedores como consumidores."
  },
  italy: {
    countryName: "Italia",
    legalStatus: "El CBD es legal en Italia bajo la Ley 242/2016 sobre cultivo de cañamo. Los productos de cannabis light con THC inferior al 0.2% (con tolerancia hasta 0.6%) son legales para su venta.",
    thcLimit: "El limite legal es 0.2% de THC, con una tolerancia de hasta 0.6% para flores de cañamo sin que el agricultor sea penalizado. Los productos procesados deben mantener el 0.2%.",
    onlineSales: "La venta online de CBD es legal en Italia. El mercado de cannabis light italiano es uno de los mas desarrollados de Europa, con una red establecida de tiendas online y fisicas.",
    summary: "Italia fue pionera en Europa con su mercado de cannabis light. Desde 2016, la industria ha crecido hasta superar los 150 millones de euros anuales."
  },
};

// =============================================================================
// REVIEWS DATABASE
// =============================================================================

const REVIEWS_ES: Record<string, ReviewData[]> = {
  spain: [
    { name: "Laura Martinez", product: "Aceite CBD 10%", text: "Llevo 3 meses usando el aceite CBD y la diferencia en mi descanso es notable. Me duermo mas rapido y me despierto sin esa sensacion de cansancio. El sabor es suave y el envio llego en 24 horas a Madrid.", rating: 5 },
    { name: "Javier Fernandez", product: "Flores CBD Amnesia Haze", text: "La calidad de las flores es impresionante, se nota que son indoor. El aroma es intenso y fresco. Las uso para infusiones por la noche y el efecto relajante es perfecto. Relacion calidad-precio inmejorable.", rating: 5 },
    { name: "Carmen Ruiz", product: "Capsulas CBD 25mg", text: "Probe varios aceites CBD pero el sabor no me convencia. Las capsulas son la solucion perfecta: sin sabor, dosis exacta y efecto duradero. Las tomo con el desayuno y me duran todo el dia. Muy recomendable.", rating: 4 },
  ],
  germany: [
    { name: "Thomas Muller", product: "CBD Ol 15%", text: "Seit zwei Monaten benutze ich das CBD-Ol und mein Schlaf hat sich deutlich verbessert. Der Geschmack ist mild und angenehm. Die Lieferung nach Berlin war schnell und diskret.", rating: 5 },
    { name: "Sabine Weber", product: "CBD Bluten Premium", text: "Ausgezeichnete Qualitat der Indoor-Bluten. Das Aroma ist intensiv und die Entspannung spUrbar. Sehr gutes Preis-Leistungs-Verhaltnis fur die gebotene Qualitat.", rating: 5 },
    { name: "Markus Schmidt", product: "CBD Kapseln 25mg", text: "Perfekt fur unterwegs. Keine Tropfen zahlen, einfach eine Kapsel nehmen. Die Wirkung halt den ganzen Tag an und ich fuhle mich ausgeglichener.", rating: 4 },
  ],
  france: [
    { name: "Marie Dupont", product: "Huile CBD 10%", text: "Excellente qualite d'huile CBD. Je l'utilise depuis 2 mois pour le stress et les resultats sont remarquables. Livraison rapide a Paris, emballage discret. Tres satisfaite.", rating: 5 },
    { name: "Pierre Laurent", product: "Fleurs CBD Premium", text: "Les fleurs sont d'une qualite exceptionnelle. L'arome est riche et naturel. Je les utilise en infusion le soir pour la relaxation. Rapport qualite-prix imbattable.", rating: 5 },
    { name: "Sophie Martin", product: "Gummies CBD", text: "Delicieuses et efficaces. Le gout de fraise est naturel et la dose de 25mg est parfaite pour moi. Je les prends apres le diner et je dors comme un bebe.", rating: 4 },
  ],
  uk: [
    { name: "James Wilson", product: "CBD Oil 10%", text: "Been using this CBD oil for 3 months now and my sleep quality has improved dramatically. The taste is mild and earthy. Delivery to London was fast and the packaging was very discreet.", rating: 5 },
    { name: "Sarah Thompson", product: "CBD Flowers Lemon Haze", text: "Outstanding quality flowers with a beautiful citrus aroma. I use them for herbal tea in the evening and the relaxation is wonderful. Best CBD flowers I've tried in the UK.", rating: 5 },
    { name: "David Brown", product: "CBD Capsules 25mg", text: "Perfect for my daily routine. No mess, no measuring, just take with breakfast. The effects last all day and I feel much more balanced. Great value for money.", rating: 4 },
  ],
  italy: [
    { name: "Marco Rossi", product: "Olio CBD 15%", text: "Uso l'olio CBD da due mesi per lo stress lavorativo. La qualita e eccellente, il sapore e delicato. Spedizione veloce a Roma, pacco discreto. Molto soddisfatto.", rating: 5 },
    { name: "Giulia Bianchi", product: "Fiori CBD OG Kush", text: "Fiori di qualita eccezionale, si vede che sono coltivati indoor. L'aroma e intenso e rilassante. Li uso per le tisane serali. Rapporto qualita-prezzo ottimo.", rating: 5 },
    { name: "Alessandro Conti", product: "Capsule CBD 25mg", text: "Comodissime e pratiche. Dose precisa senza dover contare le gocce. Le prendo la mattina e l'effetto dura tutto il giorno. Consiglio vivamente.", rating: 4 },
  ],
};

// =============================================================================
// FAQ DATABASE
// =============================================================================

function generateProductFAQs(productType: ProductType, country: string): FAQData[] {
  const product = PRODUCT_CONTENT_ES[productType];
  const legal = COUNTRY_LEGAL_ES[country] || COUNTRY_LEGAL_ES.spain;
  const productName = product.name;
  const countryName = legal.countryName;

  const faqsByProduct: Record<ProductType, FAQData[]> = {
    "cbd-oil": [
      { question: `¿Que concentracion de ${productName} debo elegir?`, answer: `Para principiantes, recomendamos empezar con aceite CBD al 5% o 10%. Si ya tienes experiencia con CBD o buscas efectos mas pronunciados, las concentraciones del 15-30% son mas adecuadas. La eleccion tambien depende de tu peso: personas de menos de 70 kg suelen funcionar bien con 10%, mientras que personas de mas de 90 kg pueden preferir 15-20%.` },
      { question: `¿Cuanto tarda en hacer efecto el ${productName}?`, answer: `Cuando se toma por via sublingual (bajo la lengua), el aceite CBD comienza a hacer efecto en 15-30 minutos. Si se ingiere directamente (tragado), el efecto puede tardar 45-90 minutos. La duracion del efecto es de 4-6 horas aproximadamente.` },
    ],
    "cbd-vape": [
      { question: "¿Es seguro vapear CBD?", answer: "Nuestros e-liquidos CBD estan formulados con ingredientes de grado farmaceutico (PG/VG) sin aditivos daninos como vitamina E acetato. Son testados en laboratorio para garantizar la ausencia de metales pesados y contaminantes. Sin embargo, si tienes problemas respiratorios, consulta con tu medico." },
      { question: "¿Que dispositivo necesito para vapear CBD?", answer: "Cualquier vaporizador para e-liquidos es compatible. Recomendamos dispositivos de baja potencia (10-15W) con resistencia superior a 1 ohm para una experiencia optima. Los pod systems son ideales para principiantes por su simplicidad." },
    ],
    "cbd-flowers": [
      { question: `¿Las ${productName} son legales?`, answer: `Si, las flores CBD con menos de 0.2% THC son legales en ${countryName} y la UE. Provienen de variedades de cañamo industrial registradas en el catalogo europeo. Se comercializan como producto aromatico y de coleccion.` },
      { question: "¿Cual es la diferencia entre flores indoor y outdoor?", answer: "Las flores indoor se cultivan en ambientes controlados, lo que resulta en mayor concentracion de CBD, cogollos mas densos y perfiles aromaticos mas intensos. Las outdoor, aunque mas economicas, suelen tener menor potencia y densidad." },
    ],
    "cbd-capsules": [
      { question: `¿Las ${productName} son veganas?`, answer: `Si, nuestras capsulas CBD utilizan cubiertas de gelatina vegetal (HPMC) aptas para veganos. El aceite interior es CBD de espectro completo en base de MCT de coco organico, sin ningun ingrediente de origen animal.` },
      { question: `¿Puedo abrir las capsulas y mezclar el contenido?`, answer: "Aunque es posible, no lo recomendamos. La cubierta esta disenada para proteger el CBD de la oxidacion y garantizar una liberacion controlada en el estomago. Si prefieres usar el aceite suelto, te recomendamos optar directamente por nuestro aceite CBD en frasco." },
    ],
    "cbd-isolate": [
      { question: "¿El aislado CBD contiene THC?", answer: "No, el aislado CBD tiene una pureza superior al 99.9% y no contiene THC ni ningun otro cannabinoide. Es la opcion mas segura para personas sometidas a controles antidoping o que necesitan evitar completamente el THC." },
      { question: "¿Como disuelvo el aislado CBD?", answer: "El aislado CBD se disuelve facilmente en aceites (MCT, oliva, coco) y grasas. Tambien se puede disolver en alcohol de alta graduacion. No se disuelve bien en agua, por lo que para bebidas acuosas se recomienda mezclarlo primero con un aceite portador." },
    ],
    "cbd-edibles": [
      { question: "¿Los comestibles CBD tienen buen sabor?", answer: "Si, nuestras gummies, chocolates y miel estan formulados para que el sabor del CBD sea practicamente imperceptible. Las gummies tienen sabores naturales de frutas, el chocolate utiliza cacao premium al 70%, y la miel conserva su dulzura natural con un ligero toque herbal." },
      { question: "¿Cuanto tardan en hacer efecto los comestibles CBD?", answer: "Los comestibles CBD tardan entre 30-90 minutos en hacer efecto, ya que deben pasar por el sistema digestivo. Sin embargo, sus efectos son mas duraderos (4-6 horas) comparados con otros metodos como el vape o el aceite sublingual." },
    ],
  };

  const shippingFAQs: FAQData[] = [
    { question: `¿Es legal comprar CBD online en ${countryName}?`, answer: `Si, la compra online de CBD es completamente legal en ${countryName} siempre que los productos cumplan con los limites de THC establecidos (${country === "france" ? "0.3% en planta, 0% en producto" : "0.2%"}). Todos nuestros productos incluyen certificados de laboratorio que acreditan su conformidad legal.` },
    { question: `¿Cuanto tarda el envio a ${countryName}?`, answer: `Los envios a ${countryName} se realizan en 24-48 horas laborables para pedidos nacionales y 3-5 dias para envios internacionales dentro de la UE. Todos los pedidos superiores a 50 EUR incluyen envio gratuito con seguimiento. El embalaje es completamente discreto.` },
  ];

  const comparisonFAQ: FAQData = {
    question: `¿Que tipo de CBD es mejor: ${productName}, aceite o capsulas?`,
    answer: `Cada formato tiene sus ventajas. El aceite CBD ofrece absorcion rapida y dosificacion flexible. Las capsulas son las mas comodas y discretas. Las flores proporcionan el efecto sequito mas completo. Los comestibles son los mas agradables al paladar. La eleccion depende de tus preferencias y necesidades. Muchos usuarios combinan 2-3 formatos.`,
  };

  return [...faqsByProduct[productType], ...shippingFAQs, comparisonFAQ];
}

// =============================================================================
// SCHEMA GENERATORS
// =============================================================================

function generateProductSchemaLD(product: ProductContent, country: CountryLegal) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${product.name} Premium - CBD Boutique`,
    description: product.heroSubtitle,
    brand: { "@type": "Brand", name: "CBD Boutique" },
    image: "https://images.unsplash.com/photo-1556928045-16f7f50be0f3?w=1200&h=630&fit=crop",
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "EUR",
      lowPrice: "15.00",
      highPrice: "150.00",
      availability: "https://schema.org/InStock",
      seller: { "@type": "Organization", name: "CBD Boutique" },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "347",
      bestRating: "5",
      worstRating: "1",
    },
  };
}

function generateReviewSchemaLD(reviews: ReviewData[]) {
  return reviews.map((review) => ({
    "@context": "https://schema.org",
    "@type": "Review",
    itemReviewed: { "@type": "Product", name: review.product },
    author: { "@type": "Person", name: review.name },
    reviewRating: {
      "@type": "Rating",
      ratingValue: review.rating.toString(),
      bestRating: "5",
    },
    reviewBody: review.text,
  }));
}

function generateFAQSchemaLD(faqs: FAQData[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

// =============================================================================
// PRODUCT IMAGES
// =============================================================================

const PRODUCT_IMAGES: Record<ProductType, string> = {
  "cbd-oil": "https://images.unsplash.com/photo-1556928045-16f7f50be0f3?w=800&h=600&fit=crop",
  "cbd-vape": "https://images.unsplash.com/photo-1605117913123-1f455435b384?w=800&h=600&fit=crop",
  "cbd-flowers": "https://images.unsplash.com/photo-1603909223429-69bb7101f420?w=800&h=600&fit=crop",
  "cbd-capsules": "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&h=600&fit=crop",
  "cbd-isolate": "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=800&h=600&fit=crop",
  "cbd-edibles": "https://images.unsplash.com/photo-1629398778375-39113a6d6d1a?w=800&h=600&fit=crop",
};

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export function ProductLanding({
  locale,
  productType,
  country,
  countryCode,
  cityName,
}: ProductLandingProps) {
  const product = PRODUCT_CONTENT_ES[productType] || PRODUCT_CONTENT_ES["cbd-oil"];
  const legal = COUNTRY_LEGAL_ES[country] || COUNTRY_LEGAL_ES.spain;
  const reviews = REVIEWS_ES[country] || REVIEWS_ES.spain;
  const faqs = generateProductFAQs(productType, country);
  const heroImage = PRODUCT_IMAGES[productType] || PRODUCT_IMAGES["cbd-oil"];

  const pageTitle = cityName
    ? `${product.name} en ${cityName}, ${legal.countryName}`
    : `${product.name} en ${legal.countryName}`;

  // Schema markup
  const productSchema = generateProductSchemaLD(product, legal);
  const reviewSchemas = generateReviewSchemaLD(reviews);
  const faqSchema = generateFAQSchemaLD(faqs);

  return (
    <>
      {/* Schema Markup */}
      <Script
        id="product-landing-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <Script
        id="review-landing-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchemas) }}
      />
      <Script
        id="faq-landing-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* ================================================================= */}
      {/* 1. HERO SECTION */}
      {/* ================================================================= */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Content */}
            <div className="order-2 lg:order-1">
              <nav className="flex items-center gap-2 text-muted-foreground text-sm mb-6">
                <Link href={`/${locale}`} className="hover:text-foreground transition-colors">
                  Inicio
                </Link>
                <span>/</span>
                <Link
                  href={`/${locale}/${productType}`}
                  className="hover:text-foreground transition-colors capitalize"
                >
                  {product.name}
                </Link>
                <span>/</span>
                <span className="text-foreground">{legal.countryName}</span>
              </nav>

              <span className="inline-block text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-4">
                CBD Boutique
              </span>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light tracking-tight mb-6 text-balance">
                {pageTitle}
              </h1>

              <p className="text-lg text-muted-foreground font-light mb-8 max-w-lg leading-relaxed">
                {product.heroSubtitle}
              </p>

              <div className="mb-8">
                <span className="text-sm text-muted-foreground">Desde</span>
                <p className="text-3xl font-light">15&#8364;</p>
              </div>

              <div className="flex flex-wrap gap-4 mb-8">
                {[
                  { icon: Leaf, text: "Organico" },
                  { icon: FlaskConical, text: "Testado" },
                  { icon: Truck, text: "Envio 24h" },
                  { icon: Shield, text: "100% Legal" },
                ].map((badge, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 text-muted-foreground text-sm px-3 py-1.5 bg-muted/50 rounded-full"
                  >
                    <badge.icon className="h-4 w-4" strokeWidth={1.5} />
                    <span>{badge.text}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <ScrollToProductsButton
                  text="Ver Productos"
                  className="inline-flex items-center justify-center gap-2 h-14 px-10 bg-foreground text-background text-xs uppercase tracking-[0.2em] font-medium hover:bg-foreground/90 transition-colors cursor-pointer"
                />
                <Button
                  variant="outline"
                  size="lg"
                  className="h-14 px-10 text-xs uppercase tracking-[0.2em] font-medium"
                  asChild
                >
                  <Link href={`/${locale}/contact`}>Contacto</Link>
                </Button>
              </div>
            </div>

            {/* Image */}
            <div className="order-1 lg:order-2">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-muted">
                <Image
                  src={heroImage}
                  alt={pageTitle}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* 2. PRODUCT DESCRIPTION */}
      {/* ================================================================= */}
      <section className="py-20 border-t border-border/50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
            {/* Main description */}
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3 mb-8">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Droplets className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                    Guia Completa
                  </span>
                  <h2 className="text-2xl lg:text-3xl font-serif font-light tracking-tight">
                    ¿Que es el {product.name}?
                  </h2>
                </div>
              </div>

              <div className="prose prose-sm max-w-none">
                {product.description.split("\n\n").map((paragraph, i) => (
                  <p key={i} className="text-muted-foreground font-light leading-relaxed mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Sidebar info */}
            <div className="lg:col-span-5">
              <div className="sticky top-32 space-y-8">
                {/* Ideal for */}
                <div className="bg-muted/30 p-6 lg:p-8">
                  <h3 className="text-sm font-medium uppercase tracking-wider mb-4">
                    ¿Para quien es ideal?
                  </h3>
                  <p className="text-sm text-muted-foreground font-light leading-relaxed">
                    {product.idealFor}
                  </p>
                </div>

                {/* How to use */}
                <div className="bg-muted/30 p-6 lg:p-8">
                  <h3 className="text-sm font-medium uppercase tracking-wider mb-4">
                    Como se usa
                  </h3>
                  <p className="text-sm text-muted-foreground font-light leading-relaxed">
                    {product.howToUse}
                  </p>
                </div>

                {/* vs Difference */}
                <div className="bg-muted/30 p-6 lg:p-8">
                  <h3 className="text-sm font-medium uppercase tracking-wider mb-4">
                    Diferencias vs otros CBD
                  </h3>
                  <p className="text-sm text-muted-foreground font-light leading-relaxed">
                    {product.vsDifference}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* 3. LEGALITY SECTION */}
      {/* ================================================================= */}
      <section className="py-20 bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-10 justify-center">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Gavel className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-2xl lg:text-3xl font-serif font-light tracking-tight text-center">
                Legalidad del CBD en {legal.countryName}
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-background p-6 lg:p-8 border border-border/50">
                <h3 className="text-sm font-medium uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  Estado Legal
                </h3>
                <p className="text-sm text-muted-foreground font-light leading-relaxed">
                  {legal.legalStatus}
                </p>
              </div>

              <div className="bg-background p-6 lg:p-8 border border-border/50">
                <h3 className="text-sm font-medium uppercase tracking-wider mb-4 flex items-center gap-2">
                  <FlaskConical className="h-4 w-4 text-primary" />
                  Limite de THC
                </h3>
                <p className="text-sm text-muted-foreground font-light leading-relaxed">
                  {legal.thcLimit}
                </p>
              </div>

              <div className="bg-background p-6 lg:p-8 border border-border/50">
                <h3 className="text-sm font-medium uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Truck className="h-4 w-4 text-primary" />
                  Venta Online
                </h3>
                <p className="text-sm text-muted-foreground font-light leading-relaxed">
                  {legal.onlineSales}
                </p>
              </div>

              <div className="bg-background p-6 lg:p-8 border border-border/50">
                <h3 className="text-sm font-medium uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Shield className="h-4 w-4 text-primary" />
                  Resumen
                </h3>
                <p className="text-sm text-muted-foreground font-light leading-relaxed">
                  {legal.summary}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* 4. DOSAGE GUIDE */}
      {/* ================================================================= */}
      <section className="py-20 border-t border-border/50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-4 justify-center">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Scale className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-2xl lg:text-3xl font-serif font-light tracking-tight text-center">
                Guia de Dosificacion: {product.name}
              </h2>
            </div>

            <p className="text-center text-muted-foreground font-light leading-relaxed max-w-2xl mx-auto mb-12">
              {product.dosageIntro}
            </p>

            {/* Dosage table */}
            <div className="overflow-x-auto mb-8">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-border">
                    <th className="text-left py-4 px-4 text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-medium">
                      Nivel
                    </th>
                    <th className="text-left py-4 px-4 text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-medium">
                      Dosis Recomendada
                    </th>
                    <th className="text-left py-4 px-4 text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-medium">
                      Frecuencia
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {product.dosageTable.map((row, i) => (
                    <tr
                      key={i}
                      className="border-b border-border/50 hover:bg-muted/30 transition-colors"
                    >
                      <td className="py-4 px-4 text-sm font-medium">{row.level}</td>
                      <td className="py-4 px-4 text-sm text-muted-foreground">{row.dose}</td>
                      <td className="py-4 px-4 text-sm text-muted-foreground">{row.frequency}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-primary/5 border border-primary/10 p-6 flex items-start gap-4">
              <BookOpen className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <p className="text-sm text-muted-foreground font-light leading-relaxed">
                {product.dosageNote}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* 5. FAQ SECTION */}
      {/* ================================================================= */}
      <section className="py-20 bg-muted/30">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl lg:text-3xl font-serif font-light tracking-tight">
              Preguntas Frecuentes sobre {product.name}
            </h2>
            <p className="text-muted-foreground font-light mt-3">
              Todo lo que necesitas saber antes de comprar
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details
                key={index}
                className="group bg-background border border-border/50 overflow-hidden"
              >
                <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-muted/50 transition-colors">
                  <span className="font-medium pr-4 text-sm lg:text-base">{faq.question}</span>
                  <span className="text-muted-foreground group-open:rotate-180 transition-transform flex-shrink-0">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </span>
                </summary>
                <div className="px-6 pb-6 text-muted-foreground">
                  <p className="text-sm font-light leading-relaxed">{faq.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* 6. REVIEWS SECTION */}
      {/* ================================================================= */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl lg:text-3xl font-serif font-light tracking-tight">
              Lo que dicen nuestros clientes en {legal.countryName}
            </h2>
            <div className="flex items-center justify-center gap-2 mt-4">
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                4.8/5 basado en 347 resenas
              </span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {reviews.map((review, i) => (
              <div key={i} className="bg-muted/30 p-8">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star
                      key={s}
                      className={`w-4 h-4 ${
                        s < review.rating
                          ? "fill-amber-400 text-amber-400"
                          : "text-muted-foreground/30"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-muted-foreground text-sm font-light mb-6 leading-relaxed">
                  &ldquo;{review.text}&rdquo;
                </p>
                <div className="border-t border-border/50 pt-4">
                  <p className="text-sm font-medium">{review.name}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] uppercase tracking-wider text-primary font-medium px-2 py-0.5 bg-primary/10 rounded-full">
                      Compra verificada
                    </span>
                    <span className="text-xs text-muted-foreground">{review.product}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

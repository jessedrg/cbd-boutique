import { cn } from "@/lib/utils"
import { Leaf, FlaskConical, Truck, Award } from "lucide-react";
import { TRANSLATIONS, type Locale } from "@/lib/seo-data";

interface FeaturesProps {
  locale: Locale;
}

export function Features({ locale }: FeaturesProps) {
  const t = TRANSLATIONS[locale] || TRANSLATIONS.en;

  const features = [
    { icon: Leaf, title: t.features.quality, desc: t.features.qualityDesc },
    { icon: FlaskConical, title: t.features.lab, desc: t.features.labDesc },
    { icon: Truck, title: t.features.shipping, desc: t.features.shippingDesc },
    { icon: Award, title: t.features.support, desc: t.features.supportDesc },
  ];

  return (
    <section className="py-24 bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 mb-6 border border-border/50">
                <feature.icon className="h-5 w-5 text-foreground/70" strokeWidth={1.5} />
              </div>
              <h3 className="text-xs uppercase tracking-[0.2em] font-medium mb-3">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed font-light">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

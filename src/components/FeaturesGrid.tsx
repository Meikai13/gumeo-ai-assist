import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LucideIcon } from "lucide-react";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
  gradient: string;
}

interface FeaturesGridProps {
  features: Feature[];
}

export const FeaturesGrid = ({ features }: FeaturesGridProps) => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <Badge className="medical-badge mb-4">
            Recursos Principais
          </Badge>
          <h2 className="text-4xl font-bold mb-4">
            Tudo que Você Precisa em Uma Plataforma
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Ferramentas integradas para modernizar e otimizar sua prática médica
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="medical-card-glow group hover:scale-105 transition-all duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader className="text-center">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br ${feature.gradient} p-4 shadow-medical group-hover:shadow-glow transition-all duration-300`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl mb-2">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-sm leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Integration Logos */}
        <div className="mt-16 text-center">
          <p className="text-sm text-muted-foreground mb-8">
            Integra nativamente com suas ferramentas favoritas
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            <div className="px-6 py-3 bg-white rounded-lg shadow-sm border">
              <span className="font-semibold text-gray-700">Google Calendar</span>
            </div>
            <div className="px-6 py-3 bg-white rounded-lg shadow-sm border">
              <span className="font-semibold text-gray-700">ChatGPT</span>
            </div>
            <div className="px-6 py-3 bg-white rounded-lg shadow-sm border">
              <span className="font-semibold text-gray-700">WhatsApp</span>
            </div>
            <div className="px-6 py-3 bg-white rounded-lg shadow-sm border">
              <span className="font-semibold text-gray-700">PIX</span>
            </div>
            <div className="px-6 py-3 bg-white rounded-lg shadow-sm border">
              <span className="font-semibold text-gray-700">Google Sheets</span>
            </div>
            <div className="px-6 py-3 bg-white rounded-lg shadow-sm border">
              <span className="font-semibold text-gray-700">Zapier</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LucideIcon } from "lucide-react";
import { ScrollAnimation } from "@/components/ScrollAnimation";

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
    <section id="features" className="py-24 bg-background relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      
      <div className="container mx-auto px-6 relative">
        <ScrollAnimation animation="fade-in">
          <div className="text-center mb-16">
            <Badge className="medical-badge mb-4">
              Recursos Principais
            </Badge>
            <h2 className="text-5xl font-bold mb-6 text-gradient">
              Tudo que Você Precisa
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Ferramentas integradas para modernizar e otimizar sua prática médica
            </p>
          </div>
        </ScrollAnimation>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <ScrollAnimation 
              key={index}
              animation="slide-up"
              delay={index * 100}
            >
              <Card className="card-interactive group h-full">
                <CardHeader className="text-center pb-4">
                  <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${feature.gradient} p-5 shadow-float group-hover:shadow-glow transition-all duration-300`}>
                    <feature.icon className="w-10 h-10 text-white" />
                  </div>
                  <CardTitle className="text-2xl mb-2 text-gradient">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center pt-0">
                  <CardDescription className="text-base leading-relaxed text-muted-foreground">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </ScrollAnimation>
          ))}
        </div>

        {/* Integration Logos */}
        <ScrollAnimation animation="slide-up" delay={600}>
          <div className="mt-20 text-center">
            <p className="text-lg text-muted-foreground mb-8 font-medium">
              Integra nativamente com suas ferramentas favoritas
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-70">
              {[
                "Google Calendar",
                "ChatGPT",
                "WhatsApp",
                "PIX",
                "Google Sheets",
                "Zapier"
              ].map((integration, index) => (
                <div 
                  key={index}
                  className="glass-card px-6 py-4 hover-lift"
                >
                  <span className="font-semibold text-foreground">{integration}</span>
                </div>
              ))}
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
};
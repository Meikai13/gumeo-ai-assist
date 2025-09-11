import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Star, Zap, Crown } from "lucide-react";
import { ScrollAnimation } from "@/components/ScrollAnimation";

export const PricingSection = () => {
  const plans = [
    {
      name: "Free",
      price: "Grátis",
      description: "Perfect para começar sua transformação digital",
      icon: Zap,
      color: "from-blue-500 to-cyan-500",
      popular: false,
      features: [
        "Agenda básica com Google Calendar",
        "Até 100 pacientes",
        "Notificações automáticas por e-mail",
        "Dashboard simples",
        "Backup em Google Drive",
        "Suporte por e-mail"
      ]
    },
    {
      name: "Plus",
      price: "R$ 49",
      description: "Para profissionais que querem mais eficiência",
      icon: Star,
      color: "from-purple-500 to-pink-500",
      popular: true,
      features: [
        "Tudo do plano Free",
        "Até 500 pacientes",
        "Agenda otimizada com IA",
        "Automações avançadas",
        "Alertas preventivos",
        "Dashboards detalhados",
        "WhatsApp integrado",
        "Suporte prioritário"
      ]
    },
    {
      name: "Pro",
      price: "R$ 99",
      description: "Solução completa para clínicas e equipes",
      icon: Crown,
      color: "from-orange-500 to-red-500",
      popular: false,
      features: [
        "Tudo do plano Plus",
        "Pacientes ilimitados",
        "Triagem digital com ChatGPT",
        "Insights estratégicos avançados",
        "Relatórios automáticos",
        "API para integrações customizadas",
        "Multi-usuários",
        "Suporte 24/7 + consultoria"
      ]
    }
  ];

  return (
    <section id="pricing" className="py-24 bg-gradient-to-b from-background to-secondary/20 relative overflow-hidden">
      <div className="container mx-auto px-6 relative">
        <ScrollAnimation animation="fade-in">
          <div className="text-center mb-16">
            <Badge className="medical-badge mb-4">
              Planos Flexíveis
            </Badge>
            <h2 className="text-5xl font-bold mb-6 text-gradient">
              Escolha o Plano Ideal
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comece gratuitamente e evolua conforme suas necessidades crescem
            </p>
          </div>
        </ScrollAnimation>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <ScrollAnimation 
              key={index}
              animation="slide-up"
              delay={index * 150}
            >
              <Card className={`card-interactive group relative h-full ${plan.popular ? 'ring-2 ring-primary shadow-glow scale-105' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground px-4 py-2 shadow-glow">
                      Mais Popular
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center pb-6">
                  <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${plan.color} p-5 shadow-float group-hover:shadow-glow transition-all duration-300`}>
                    <plan.icon className="w-10 h-10 text-white" />
                  </div>
                  <CardTitle className="text-3xl text-gradient">{plan.name}</CardTitle>
                  <div className="space-y-2">
                    <div className="text-4xl font-bold text-gradient">
                      {plan.price}
                      {plan.price !== "Grátis" && <span className="text-lg text-muted-foreground">/mês</span>}
                    </div>
                    <CardDescription className="text-base">
                      {plan.description}
                    </CardDescription>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <ul className="space-y-4">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    className={`w-full transition-all duration-300 ${
                      plan.popular 
                        ? 'btn-futuristic' 
                        : 'hover-lift'
                    }`}
                    variant={plan.popular ? 'default' : 'outline'}
                  >
                    {plan.price === "Grátis" ? "Começar Grátis" : "Assinar Agora"}
                  </Button>
                </CardContent>
              </Card>
            </ScrollAnimation>
          ))}
        </div>

        <ScrollAnimation animation="fade-in" delay={500}>
          <div className="text-center mt-16">
            <p className="text-muted-foreground mb-6">
              Todos os planos incluem teste gratuito de 14 dias • Cancele quando quiser
            </p>
            <div className="flex flex-wrap justify-center gap-8 text-sm">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-primary" />
                <span>Sem compromisso de longo prazo</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-primary" />
                <span>Migração de dados gratuita</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-primary" />
                <span>Suporte especializado</span>
              </div>
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
};
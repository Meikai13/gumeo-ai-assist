import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  Users, 
  Brain, 
  CreditCard, 
  BarChart3, 
  Shield,
  CheckCircle,
  Star,
  ArrowRight,
  Stethoscope,
  Activity,
  Clock,
  FileText,
  Zap
} from "lucide-react";
import { useState } from "react";
import heroImage from "@/assets/gumeo-hero.jpg";
import { DashboardDemo } from "@/components/DashboardDemo";
import { PricingSection } from "@/components/PricingSection";
import { FeaturesGrid } from "@/components/FeaturesGrid";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const features = [
    {
      icon: Calendar,
      title: "Agenda Inteligente",
      description: "Sincronização com Google Calendar e notificações automáticas",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: Users,
      title: "Perfis de Pacientes",
      description: "Histórico completo com alertas preventivos integrados",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: Brain,
      title: "Automação IA",
      description: "ChatGPT para triagem, relatórios e insights estratégicos",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: CreditCard,
      title: "Pagamentos PIX",
      description: "Recebimento automatizado com links e QR Codes",
      gradient: "from-orange-500 to-red-500"
    },
    {
      icon: BarChart3,
      title: "Dashboards Avançados",
      description: "Métricas de performance e análises preditivas",
      gradient: "from-indigo-500 to-blue-500"
    },
    {
      icon: Shield,
      title: "Backup Automático",
      description: "Sincronização segura com Google Drive e OneDrive",
      gradient: "from-teal-500 to-cyan-500"
    }
  ];

  const stats = [
    { label: "Profissionais Ativos", value: "10,000+", icon: Stethoscope },
    { label: "Consultas Gerenciadas", value: "500K+", icon: Calendar },
    { label: "Taxa de Satisfação", value: "98%", icon: Star },
    { label: "Tempo Economizado", value: "4hrs/dia", icon: Clock }
  ];

  return (
    <div className="min-h-screen bg-gradient-dashboard">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-90" />
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        
        <div className="relative z-10 container mx-auto px-6 text-center">
          <Badge className="mb-6 medical-badge animate-fade-in">
            <Zap className="w-3 h-3 mr-1" />
            Revolucionando a Gestão de Saúde
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-slide-up">
            <span className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
              Gumeo
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto animate-slide-up">
            Gestão Inteligente Gratuita para Profissionais de Saúde com IA, 
            automação e integrações nativas
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-slide-up">
            <Button 
              size="lg" 
              className="bg-white text-primary hover:bg-white/90 transition-smooth shadow-glow"
              onClick={() => setActiveTab("dashboard")}
            >
              <Activity className="w-5 h-5 mr-2" />
              Começar Gratuitamente
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-primary transition-smooth"
            >
              <FileText className="w-5 h-5 mr-2" />
              Ver Demonstração
            </Button>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <stat.icon className="w-6 h-6 text-white/80 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-white/70">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full animate-pulse-glow" />
        <div className="absolute bottom-32 right-16 w-16 h-16 bg-white/5 rounded-full animate-pulse-glow" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 right-8 w-12 h-12 bg-white/10 rounded-full animate-pulse-glow" style={{ animationDelay: '2s' }} />
      </section>

      {/* Features Section */}
      <FeaturesGrid features={features} />

      {/* Dashboard Demo */}
      {activeTab === "dashboard" && <DashboardDemo />}

      {/* Pricing */}
      <PricingSection />

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Pronto para Revolucionar sua Prática?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Junte-se a milhares de profissionais que já transformaram sua gestão
          </p>
          <Button 
            size="lg" 
            className="bg-white text-primary hover:bg-white/90 transition-smooth shadow-glow"
          >
            Começar Agora - Grátis
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
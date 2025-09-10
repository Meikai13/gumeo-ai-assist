import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { 
  Calendar, 
  Users, 
  CreditCard, 
  TrendingUp, 
  Shield, 
  Zap,
  Heart,
  Brain,
  Clock,
  CheckCircle,
  Star,
  ArrowRight,
  Play,
  LogIn,
  Bot,
  Smartphone
} from "lucide-react";
import { DashboardDemo } from "@/components/DashboardDemo";
import { FeaturesGrid } from "@/components/FeaturesGrid";
import { PricingSection } from "@/components/PricingSection";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useAuth } from "@/hooks/useAuth";
import heroImage from "@/assets/gumeo-hero.jpg";

export default function Index() {
  const { user } = useAuth();

  const features = [
    {
      icon: Calendar,
      title: "Gestão de Consultas",
      description: "Agende, reagende e gerencie suas consultas com facilidade. Sincronização automática com seu calendário.",
      gradient: "from-blue-500 to-blue-600"
    },
    {
      icon: Users,
      title: "Prontuários Digitais",
      description: "Mantenha históricos completos dos pacientes, com segurança e facilidade de acesso.",
      gradient: "from-green-500 to-green-600"
    },
    {
      icon: CreditCard,
      title: "Gestão Financeira",
      description: "Controle de pagamentos, recibos automáticos e relatórios financeiros detalhados.",
      gradient: "from-purple-500 to-purple-600"
    },
    {
      icon: Bot,
      title: "Assistente IA",
      description: "IA integrada para auxiliar em diagnósticos, prescrições e análise de prontuários.",
      gradient: "from-orange-500 to-orange-600"
    },
    {
      icon: Smartphone,
      title: "App Mobile",
      description: "Acesse tudo pelo smartphone. Notificações em tempo real e sincronização completa.",
      gradient: "from-pink-500 to-pink-600"
    },
    {
      icon: Shield,
      title: "Segurança Total",
      description: "Conformidade com LGPD, criptografia avançada e backups automáticos em nuvem.",
      gradient: "from-red-500 to-red-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary">
      {/* Header */}
      <header className="bg-card/95 backdrop-blur-sm border-b border-border shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Heart className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Gumeo
              </span>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-muted-foreground hover:text-primary transition-colors">
                Recursos
              </a>
              <a href="#pricing" className="text-muted-foreground hover:text-primary transition-colors">
                Preços
              </a>
              <a href="#demo" className="text-muted-foreground hover:text-primary transition-colors">
                Demo
              </a>
              <div className="flex items-center space-x-4">
                <ThemeToggle />
                {user ? (
                  <Link to="/dashboard">
                    <Button className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity">
                      Dashboard
                    </Button>
                  </Link>
                ) : (
                  <Link to="/auth">
                    <Button className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity">
                      <LogIn className="h-4 w-4 mr-2" />
                      Entrar
                    </Button>
                  </Link>
                )}
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/10 to-secondary/20" />
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10 dark:opacity-5"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        
        <div className="relative z-10 container mx-auto px-6 text-center">
          <Badge className="mb-6 medical-badge animate-fade-in">
            <Zap className="w-3 h-3 mr-1" />
            Revolucionando a Gestão de Saúde
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-slide-up">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Gumeo
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto animate-slide-up">
            Gestão Inteligente Gratuita para Profissionais de Saúde com IA, 
            automação e integrações nativas
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-slide-up">
            {user ? (
              <Link to="/dashboard">
                <Button size="lg" className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity shadow-glow">
                  Ir ao Dashboard
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            ) : (
              <Link to="/auth">
                <Button size="lg" className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity shadow-glow">
                  Começar Grátis
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            )}
            <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">
              <Play className="mr-2 h-5 w-5" />
              Ver Demo
            </Button>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="text-center animate-fade-in">
              <Heart className="w-6 h-6 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">10,000+</div>
              <div className="text-sm text-muted-foreground">Profissionais Ativos</div>
            </div>
            <div className="text-center animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <Calendar className="w-6 h-6 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">500K+</div>
              <div className="text-sm text-muted-foreground">Consultas Gerenciadas</div>
            </div>
            <div className="text-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <Star className="w-6 h-6 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">98%</div>
              <div className="text-sm text-muted-foreground">Taxa de Satisfação</div>
            </div>
            <div className="text-center animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <Clock className="w-6 h-6 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">4hrs/dia</div>
              <div className="text-sm text-muted-foreground">Tempo Economizado</div>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full animate-pulse-glow" />
        <div className="absolute bottom-32 right-16 w-16 h-16 bg-accent/10 rounded-full animate-pulse-glow" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 right-8 w-12 h-12 bg-primary/10 rounded-full animate-pulse-glow" style={{ animationDelay: '2s' }} />
      </section>

      {/* Features Section */}
      <FeaturesGrid features={features} />

      {/* Dashboard Demo */}
      <DashboardDemo />

      {/* Pricing */}
      <PricingSection />

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-accent text-primary-foreground">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Pronto para Revolucionar sua Prática?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Junte-se a milhares de profissionais que já transformaram sua gestão
          </p>
          {user ? (
            <Link to="/dashboard">
              <Button 
                size="lg" 
                className="bg-background text-foreground hover:bg-background/90 transition-smooth shadow-glow"
              >
                Ir ao Dashboard
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          ) : (
            <Link to="/auth">
              <Button 
                size="lg" 
                className="bg-background text-foreground hover:bg-background/90 transition-smooth shadow-glow"
              >
                Começar Agora - Grátis
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          )}
        </div>
      </section>
    </div>
  );
}


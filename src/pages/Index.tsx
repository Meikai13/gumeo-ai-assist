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
  Smartphone,
  ChevronDown
} from "lucide-react";
import { DashboardDemo } from "@/components/DashboardDemo";
import { FeaturesGrid } from "@/components/FeaturesGrid";
import { PricingSection } from "@/components/PricingSection";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ScrollAnimation } from "@/components/ScrollAnimation";
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
    <div className="min-h-screen bg-gradient-mesh">
      {/* Header */}
      <header className="glass-nav sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Heart className="h-5 w-5 text-white" />
              </div>
              <span className="text-2xl font-bold text-gradient">
                Gumeo
              </span>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="nav-link">
                Recursos
              </a>
              <a href="#pricing" className="nav-link">
                Preços
              </a>
              <a href="#demo" className="nav-link">
                Demo
              </a>
              <div className="flex items-center space-x-4">
                <ThemeToggle />
                {user ? (
                  <Link to="/dashboard">
                    <Button className="btn-futuristic">
                      Dashboard
                    </Button>
                  </Link>
                ) : (
                  <Link to="/auth">
                    <Button className="btn-futuristic">
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
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-20 h-20 bg-primary/20 rounded-full animate-float blur-xl" />
          <div className="absolute bottom-32 right-16 w-32 h-32 bg-accent/20 rounded-full animate-float blur-xl" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 right-8 w-16 h-16 bg-primary/30 rounded-full animate-float blur-xl" style={{ animationDelay: '2s' }} />
        </div>
        
        <div className="relative z-10 container mx-auto px-6 text-center">
          <ScrollAnimation animation="fade-in">
            <Badge className="medical-badge mb-6">
              <Zap className="w-3 h-3 mr-1" />
              Revolucionando a Gestão de Saúde
            </Badge>
          </ScrollAnimation>
          
          <ScrollAnimation animation="slide-up" delay={200}>
            <h1 className="text-6xl md:text-8xl font-bold mb-6">
              <span className="text-gradient">
                Gumeo
              </span>
            </h1>
          </ScrollAnimation>
          
          <ScrollAnimation animation="slide-up" delay={400}>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Gestão Inteligente Gratuita para Profissionais de Saúde com IA, 
              automação e integrações nativas
            </p>
          </ScrollAnimation>
          
          <ScrollAnimation animation="slide-up" delay={600}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              {user ? (
                <Link to="/dashboard">
                  <Button size="lg" className="btn-futuristic">
                    Ir ao Dashboard
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              ) : (
                <Link to="/auth">
                  <Button size="lg" className="btn-futuristic">
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
          </ScrollAnimation>

          {/* Stats Row */}
          <ScrollAnimation animation="slide-up" delay={800}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="glass-card p-4 text-center hover-lift">
                <Heart className="w-6 h-6 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold text-gradient">10K+</div>
                <div className="text-sm text-muted-foreground">Profissionais</div>
              </div>
              <div className="glass-card p-4 text-center hover-lift">
                <Calendar className="w-6 h-6 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold text-gradient">500K+</div>
                <div className="text-sm text-muted-foreground">Consultas</div>
              </div>
              <div className="glass-card p-4 text-center hover-lift">
                <Star className="w-6 h-6 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold text-gradient">98%</div>
                <div className="text-sm text-muted-foreground">Satisfação</div>
              </div>
              <div className="glass-card p-4 text-center hover-lift">
                <Clock className="w-6 h-6 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold text-gradient">4hrs</div>
                <div className="text-sm text-muted-foreground">Economizadas</div>
              </div>
            </div>
          </ScrollAnimation>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 text-muted-foreground" />
        </div>
      </section>

      {/* Features Section */}
      <ScrollAnimation animation="fade-in">
        <FeaturesGrid features={features} />
      </ScrollAnimation>

      {/* Dashboard Demo */}
      <ScrollAnimation animation="slide-up">
        <DashboardDemo />
      </ScrollAnimation>

      {/* Pricing */}
      <ScrollAnimation animation="fade-in">
        <PricingSection />
      </ScrollAnimation>

      {/* CTA Section */}
      <ScrollAnimation animation="slide-up">
        <section className="py-20 bg-gradient-primary text-primary-foreground relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20" />
          <div className="container mx-auto px-6 text-center relative z-10">
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
                  className="bg-background text-foreground hover:bg-background/90 shadow-elevated hover-lift"
                >
                  Ir ao Dashboard
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            ) : (
              <Link to="/auth">
                <Button 
                  size="lg" 
                  className="bg-background text-foreground hover:bg-background/90 shadow-elevated hover-lift"
                >
                  Começar Agora - Grátis
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            )}
          </div>
        </section>
      </ScrollAnimation>
    </div>
  );
}


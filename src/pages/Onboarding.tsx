import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Circle, ArrowRight, ArrowLeft, Sparkles, Target, Rocket } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  action?: string;
  actionUrl?: string;
}

const Onboarding: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [steps, setSteps] = useState<OnboardingStep[]>([
    {
      id: 'profile',
      title: 'Complete seu Perfil',
      description: 'Adicione suas informações pessoais e profissionais para personalizar sua experiência.',
      completed: false,
      action: 'Completar Perfil',
      actionUrl: '/settings'
    },
    {
      id: 'first-patient',
      title: 'Cadastre seu Primeiro Paciente',
      description: 'Adicione um paciente ao sistema para começar a organizar sua prática.',
      completed: false,
      action: 'Adicionar Paciente',
      actionUrl: '/dashboard'
    },
    {
      id: 'schedule-appointment',
      title: 'Agende uma Consulta',
      description: 'Crie sua primeira consulta e experimente o sistema de agendamento.',
      completed: false,
      action: 'Agendar Consulta',
      actionUrl: '/dashboard'
    },
    {
      id: 'explore-features',
      title: 'Explore os Recursos',
      description: 'Descubra todas as funcionalidades disponíveis no seu plano.',
      completed: false,
      action: 'Explorar Dashboard',
      actionUrl: '/dashboard'
    }
  ]);

  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
    checkProgress();
  }, [user, navigate]);

  const checkProgress = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      // Check profile completeness
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      // Check if user has patients
      const { data: patients } = await supabase
        .from('patients')
        .select('id')
        .eq('user_id', user.id)
        .limit(1);

      // Check if user has appointments
      const { data: appointments } = await supabase
        .from('appointments')
        .select('id')
        .eq('user_id', user.id)
        .limit(1);

      const updatedSteps = steps.map(step => {
        switch (step.id) {
          case 'profile':
            return {
              ...step,
              completed: Boolean(profile && (profile.full_name || profile.specialty || profile.crm))
            };
          case 'first-patient':
            return {
              ...step,
              completed: Boolean(patients && patients.length > 0)
            };
          case 'schedule-appointment':
            return {
              ...step,
              completed: Boolean(appointments && appointments.length > 0)
            };
          case 'explore-features':
            return {
              ...step,
              completed: false // This can be marked complete manually
            };
          default:
            return step;
        }
      });

      setSteps(updatedSteps);
      
      // Find first incomplete step
      const firstIncomplete = updatedSteps.findIndex(step => !step.completed);
      if (firstIncomplete !== -1) {
        setCurrentStep(firstIncomplete);
      }
      
    } catch (error) {
      console.error('Error checking onboarding progress:', error);
    } finally {
      setLoading(false);
    }
  };

  const completedSteps = steps.filter(step => step.completed).length;
  const progressPercentage = (completedSteps / steps.length) * 100;

  const handleStepAction = (step: OnboardingStep) => {
    if (step.actionUrl) {
      navigate(step.actionUrl);
    }
  };

  const markStepComplete = async (stepId: string) => {
    setSteps(prev => prev.map(step => 
      step.id === stepId ? { ...step, completed: true } : step
    ));
    
    toast({
      title: "Parabéns! 🎉",
      description: "Mais um passo concluído com sucesso!",
    });
  };

  const skipOnboarding = () => {
    navigate('/dashboard');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-dashboard flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Carregando...</p>
        </div>
      </div>
    );
  }

  if (completedSteps === steps.length) {
    return (
      <div className="min-h-screen bg-gradient-dashboard flex items-center justify-center">
        <Card className="medical-card-glow max-w-lg">
          <CardHeader className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-primary p-4 shadow-glow">
              <Rocket className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl">Parabéns! 🎉</CardTitle>
            <CardDescription>
              Você concluiu todo o processo de configuração inicial. 
              Agora está pronto para usar o Gumeo em sua prática médica!
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <div className="bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900/20 dark:to-blue-900/20 p-4 rounded-lg">
              <p className="text-sm font-medium">
                ✨ Sistema configurado com sucesso<br/>
                📊 Dashboard personalizado pronto<br/>
                🚀 Pronto para revolucionar sua prática
              </p>
            </div>
            <Button 
              onClick={() => navigate('/dashboard')}
              className="gradient-primary text-white w-full hover-lift"
            >
              <Target className="w-4 h-4 mr-2" />
              Ir para o Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-dashboard">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 rounded-full bg-gradient-primary p-3 shadow-glow">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-2">
            Bem-vindo ao Gumeo! 👋
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Vamos configurar sua conta em poucos passos simples. 
            Isso levará apenas alguns minutos e você estará pronto para revolucionar sua prática médica.
          </p>
        </div>

        {/* Progress */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Progresso da Configuração</span>
            <span className="text-sm text-muted-foreground">
              {completedSteps} de {steps.length} concluídos
            </span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
          <div className="flex justify-between mt-2">
            <Badge variant="outline" className="text-xs">
              {Math.round(progressPercentage)}% completo
            </Badge>
            {completedSteps > 0 && (
              <Badge variant="default" className="text-xs">
                Ótimo progresso! 🚀
              </Badge>
            )}
          </div>
        </div>

        {/* Steps */}
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {steps.map((step, index) => (
              <Card 
                key={step.id}
                className={`medical-card transition-smooth ${
                  step.completed 
                    ? 'border-green-200 bg-green-50/50 dark:bg-green-950/20' 
                    : index === currentStep 
                      ? 'ring-2 ring-primary shadow-glow' 
                      : ''
                }`}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      {step.completed ? (
                        <CheckCircle className="w-6 h-6 text-green-500" />
                      ) : (
                        <Circle className="w-6 h-6 text-muted-foreground" />
                      )}
                      <div>
                        <CardTitle className="text-lg">
                          {step.title}
                        </CardTitle>
                        <Badge 
                          variant={step.completed ? "default" : "secondary"} 
                          className="text-xs mt-1"
                        >
                          {step.completed ? "Concluído" : `Passo ${index + 1}`}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4">
                    {step.description}
                  </CardDescription>
                  
                  {!step.completed && step.action && (
                    <Button
                      onClick={() => handleStepAction(step)}
                      className="w-full"
                      variant={index === currentStep ? "default" : "outline"}
                    >
                      {step.action}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  )}
                  
                  {step.completed && (
                    <div className="bg-green-100 dark:bg-green-900/20 p-3 rounded-lg">
                      <p className="text-sm text-green-700 dark:text-green-400 font-medium">
                        ✅ Etapa concluída com sucesso!
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center space-x-4 mt-8">
            <Button
              variant="outline"
              onClick={skipOnboarding}
            >
              Pular Configuração
            </Button>
            
            {completedSteps > 0 && (
              <Button
                onClick={() => navigate('/dashboard')}
                className="gradient-primary text-white hover-lift"
              >
                <Target className="w-4 h-4 mr-2" />
                Ir para Dashboard
              </Button>
            )}
          </div>

          {/* Tips */}
          <Card className="medical-card mt-8 border-blue-200 bg-blue-50/50 dark:bg-blue-950/20">
            <CardContent className="pt-6">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-full bg-blue-500 p-2 flex-shrink-0">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="font-medium text-blue-700 dark:text-blue-400 mb-2">
                    💡 Dica Útil
                  </h4>
                  <p className="text-sm text-blue-600 dark:text-blue-300">
                    Completar todos os passos te dará uma experiência muito melhor com o sistema. 
                    Cada etapa foi pensada para otimizar seu uso diário da plataforma.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
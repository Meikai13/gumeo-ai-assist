import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ThemeToggle } from '@/components/ThemeToggle';
import { PremiumButton } from '@/components/PremiumButton';
import { 
  User, 
  Mail, 
  Phone, 
  Shield, 
  Bell, 
  Palette, 
  CreditCard,
  Settings as SettingsIcon,
  Save,
  ArrowLeft,
  Crown,
  Star
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Profile {
  full_name: string;
  phone: string;
  specialty: string;
  crm: string;
  plan: 'free' | 'plus' | 'pro';
}

const Settings: React.FC = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [profile, setProfile] = useState<Profile>({
    full_name: '',
    phone: '',
    specialty: '',
    crm: '',
    plan: 'free'
  });
  
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    appointments: true,
    payments: true,
    marketing: false
  });
  
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
    fetchProfile();
  }, [user, navigate]);

  const fetchProfile = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      if (data) {
        setProfile({
          full_name: data.full_name || '',
          phone: data.phone || '',
          specialty: data.specialty || '',
          crm: data.crm || '',
          plan: (data.plan as 'free' | 'plus' | 'pro') || 'free'
        });
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar o perfil",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const saveProfile = async () => {
    if (!user) return;
    
    setSaving(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          user_id: user.id,
          full_name: profile.full_name,
          phone: profile.phone,
          specialty: profile.specialty,
          crm: profile.crm,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'user_id'
        });

      if (error) throw error;

      toast({
        title: "Sucesso",
        description: "Perfil atualizado com sucesso!",
      });
    } catch (error) {
      console.error('Error saving profile:', error);
      toast({
        title: "Erro",
        description: "Não foi possível salvar o perfil",
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const getPlanBadge = (plan: string) => {
    const configs = {
      free: { label: 'Gratuito', variant: 'secondary' as const, icon: null },
      plus: { label: 'Plus', variant: 'default' as const, icon: Star },
      pro: { label: 'Pro', variant: 'default' as const, icon: Crown }
    };
    
    const config = configs[plan as keyof typeof configs] || configs.free;
    const Icon = config.icon;
    
    return (
      <Badge variant={config.variant} className="ml-2">
        {Icon && <Icon className="w-3 h-3 mr-1" />}
        {config.label}
      </Badge>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-dashboard flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Carregando configurações...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-dashboard">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/dashboard')}
              className="hover-lift"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
            <div>
              <h1 className="text-3xl font-bold flex items-center">
                <SettingsIcon className="w-8 h-8 mr-3 text-primary" />
                Configurações
                {getPlanBadge(profile.plan)}
              </h1>
              <p className="text-muted-foreground mt-1">
                Gerencie sua conta, preferências e configurações do sistema
              </p>
            </div>
          </div>
          <ThemeToggle />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar Navigation */}
          <div className="space-y-6">
            {/* Plan Status */}
            <Card className="medical-card-glow">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <CreditCard className="w-5 h-5 mr-2" />
                  Plano Atual
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-2">
                    {profile.plan === 'free' ? 'Gratuito' : 
                     profile.plan === 'plus' ? 'Plus' : 'Pro'}
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    {profile.plan === 'free' ? 'Funcionalidades básicas' :
                     profile.plan === 'plus' ? 'R$ 49/mês - Recursos avançados' :
                     'R$ 99/mês - Solução completa'}
                  </p>
                </div>
                
                {profile.plan === 'free' && (
                  <div className="space-y-3">
                    <PremiumButton plan="plus" className="w-full">
                      <Star className="w-4 h-4 mr-2" />
                      Upgrade para Plus
                    </PremiumButton>
                    <PremiumButton plan="pro" className="w-full">
                      <Crown className="w-4 h-4 mr-2" />
                      Upgrade para Pro
                    </PremiumButton>
                  </div>
                )}
                
                {profile.plan === 'plus' && (
                  <PremiumButton plan="pro" className="w-full">
                    <Crown className="w-4 h-4 mr-2" />
                    Upgrade para Pro
                  </PremiumButton>
                )}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="medical-card">
              <CardHeader>
                <CardTitle className="text-lg">Ações Rápidas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Shield className="w-4 h-4 mr-2" />
                  Alterar Senha
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Bell className="w-4 h-4 mr-2" />
                  Configurar Notificações
                </Button>
                <Separator />
                <Button 
                  variant="outline" 
                  className="w-full justify-start text-destructive hover:text-destructive"
                  onClick={handleSignOut}
                >
                  Sair da Conta
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Information */}
            <Card className="medical-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  Informações Pessoais
                </CardTitle>
                <CardDescription>
                  Mantenha seus dados sempre atualizados para uma melhor experiência
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Nome Completo</Label>
                    <Input
                      id="fullName"
                      value={profile.full_name}
                      onChange={(e) => setProfile(prev => ({ ...prev, full_name: e.target.value }))}
                      placeholder="Seu nome completo"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">E-mail</Label>
                    <Input
                      id="email"
                      value={user?.email || ''}
                      disabled
                      className="bg-muted"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefone</Label>
                    <Input
                      id="phone"
                      value={profile.phone}
                      onChange={(e) => setProfile(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="(11) 99999-9999"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="crm">CRM</Label>
                    <Input
                      id="crm"
                      value={profile.crm}
                      onChange={(e) => setProfile(prev => ({ ...prev, crm: e.target.value }))}
                      placeholder="123456/SP"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="specialty">Especialidade</Label>
                  <Input
                    id="specialty"
                    value={profile.specialty}
                    onChange={(e) => setProfile(prev => ({ ...prev, specialty: e.target.value }))}
                    placeholder="Ex: Cardiologia, Pediatria, Clínica Geral..."
                  />
                </div>

                <Button 
                  onClick={saveProfile} 
                  disabled={saving}
                  className="gradient-primary text-white hover-lift"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {saving ? 'Salvando...' : 'Salvar Alterações'}
                </Button>
              </CardContent>
            </Card>

            {/* Notification Preferences */}
            <Card className="medical-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bell className="w-5 h-5 mr-2" />
                  Preferências de Notificação
                </CardTitle>
                <CardDescription>
                  Configure como e quando você deseja receber notificações
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="email-notifications" className="text-base">
                        Notificações por E-mail
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Receba updates importantes por e-mail
                      </p>
                    </div>
                    <Switch
                      id="email-notifications"
                      checked={notifications.email}
                      onCheckedChange={(checked) => 
                        setNotifications(prev => ({ ...prev, email: checked }))
                      }
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="appointment-notifications" className="text-base">
                        Lembretes de Consultas
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Alertas sobre consultas agendadas
                      </p>
                    </div>
                    <Switch
                      id="appointment-notifications"
                      checked={notifications.appointments}
                      onCheckedChange={(checked) => 
                        setNotifications(prev => ({ ...prev, appointments: checked }))
                      }
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="payment-notifications" className="text-base">
                        Notificações de Pagamento
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Alertas sobre pagamentos e cobranças
                      </p>
                    </div>
                    <Switch
                      id="payment-notifications"
                      checked={notifications.payments}
                      onCheckedChange={(checked) => 
                        setNotifications(prev => ({ ...prev, payments: checked }))
                      }
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="marketing-notifications" className="text-base">
                        Comunicações de Marketing
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Novidades, dicas e ofertas especiais
                      </p>
                    </div>
                    <Switch
                      id="marketing-notifications"
                      checked={notifications.marketing}
                      onCheckedChange={(checked) => 
                        setNotifications(prev => ({ ...prev, marketing: checked }))
                      }
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Theme Preferences */}
            <Card className="medical-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Palette className="w-5 h-5 mr-2" />
                  Aparência
                </CardTitle>
                <CardDescription>
                  Personalize a aparência da interface
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Tema</Label>
                    <p className="text-sm text-muted-foreground">
                      Escolha entre claro, escuro ou automático
                    </p>
                  </div>
                  <ThemeToggle />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
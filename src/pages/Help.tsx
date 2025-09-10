import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Separator } from '@/components/ui/separator';
import { 
  HelpCircle, 
  Search, 
  Book, 
  Video, 
  MessageCircle, 
  ArrowLeft,
  ExternalLink,
  CheckCircle,
  Calendar,
  Users,
  CreditCard,
  Settings,
  Shield,
  Smartphone,
  Bell,
  BarChart3
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  helpful?: boolean;
}

interface GuideItem {
  id: string;
  title: string;
  description: string;
  icon: any;
  readTime: string;
  category: string;
}

const Help: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const faqs: FAQItem[] = [
    {
      id: 'login-issues',
      question: 'Como resolver problemas de login?',
      answer: 'Se você está tendo problemas para fazer login, primeiro verifique se seu email e senha estão corretos. Certifique-se de que não há espaços em branco no início ou fim. Se ainda não conseguir, use a opção "Esqueci minha senha" na tela de login para redefinir sua senha.',
      category: 'account'
    },
    {
      id: 'create-patient',
      question: 'Como cadastrar um novo paciente?',
      answer: 'Para cadastrar um novo paciente, vá ao Dashboard e clique em "Novo Paciente" na seção de ações rápidas. Preencha as informações básicas como nome, email, telefone e CPF. Você também pode adicionar informações médicas como histórico, alergias e medicações.',
      category: 'patients'
    },
    {
      id: 'schedule-appointment',
      question: 'Como agendar uma consulta?',
      answer: 'No Dashboard, clique em "Agendar Consulta" ou acesse a agenda. Selecione o paciente, defina data e horário, tipo de consulta e adicione observações se necessário. O sistema enviará notificações automáticas para você e o paciente.',
      category: 'appointments'
    },
    {
      id: 'payment-tracking',
      question: 'Como controlar pagamentos?',
      answer: 'Na seção de Pagamentos do Dashboard, você pode criar cobranças, acompanhar status de pagamentos, gerar recibos e relatórios financeiros. É possível configurar diferentes métodos de pagamento como PIX, cartão e dinheiro.',
      category: 'payments'
    },
    {
      id: 'notifications',
      question: 'Como gerenciar notificações?',
      answer: 'Acesse Configurações > Notificações para personalizar quais alertas você deseja receber. Você pode configurar lembretes de consultas, alertas de pagamento, notificações de novos pacientes e muito mais.',
      category: 'settings'
    },
    {
      id: 'data-backup',
      question: 'Meus dados estão seguros?',
      answer: 'Sim! Todos os dados são criptografados e armazenados em servidores seguros na nuvem. Fazemos backups automáticos diários e seguimos as melhores práticas de segurança conforme a LGPD.',
      category: 'security'
    },
    {
      id: 'mobile-access',
      question: 'Posso usar pelo celular?',
      answer: 'O Gumeo é totalmente responsivo e funciona perfeitamente em smartphones e tablets. Basta acessar pelo navegador do seu dispositivo móvel. Em breve teremos também um app nativo.',
      category: 'mobile'
    },
    {
      id: 'plan-upgrade',
      question: 'Como fazer upgrade do meu plano?',
      answer: 'Acesse Configurações > Plano Atual e escolha entre os planos Plus ou Pro. O upgrade é imediato e você pode cancelar a qualquer momento. Oferecemos 14 dias de teste gratuito para novos planos.',
      category: 'billing'
    }
  ];

  const guides: GuideItem[] = [
    {
      id: 'getting-started',
      title: 'Primeiros Passos no Gumeo',
      description: 'Um guia completo para configurar sua conta e começar a usar o sistema',
      icon: CheckCircle,
      readTime: '5 min',
      category: 'basics'
    },
    {
      id: 'patient-management',
      title: 'Gestão de Pacientes',
      description: 'Como cadastrar, organizar e manter prontuários digitais seguros',
      icon: Users,
      readTime: '8 min',
      category: 'patients'
    },
    {
      id: 'appointment-system',
      title: 'Sistema de Agendamento',
      description: 'Domine todas as funcionalidades da agenda inteligente',
      icon: Calendar,
      readTime: '6 min',
      category: 'appointments'
    },
    {
      id: 'financial-control',
      title: 'Controle Financeiro',
      description: 'Gerencie pagamentos, cobranças e relatórios financeiros',
      icon: CreditCard,
      readTime: '7 min',
      category: 'payments'
    },
    {
      id: 'reports-analytics',
      title: 'Relatórios e Métricas',
      description: 'Extraia insights valiosos dos dados da sua prática',
      icon: BarChart3,
      readTime: '5 min',
      category: 'reports'
    },
    {
      id: 'mobile-usage',
      title: 'Uso Mobile',
      description: 'Dicas para usar o Gumeo no smartphone e tablet',
      icon: Smartphone,
      readTime: '4 min',
      category: 'mobile'
    }
  ];

  const categories = [
    { id: 'all', label: 'Todos', count: faqs.length },
    { id: 'account', label: 'Conta', count: faqs.filter(f => f.category === 'account').length },
    { id: 'patients', label: 'Pacientes', count: faqs.filter(f => f.category === 'patients').length },
    { id: 'appointments', label: 'Agendamento', count: faqs.filter(f => f.category === 'appointments').length },
    { id: 'payments', label: 'Pagamentos', count: faqs.filter(f => f.category === 'payments').length },
    { id: 'settings', label: 'Configurações', count: faqs.filter(f => f.category === 'settings').length }
  ];

  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = searchQuery === '' || 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

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
                <HelpCircle className="w-8 h-8 mr-3 text-primary" />
                Central de Ajuda
              </h1>
              <p className="text-muted-foreground mt-1">
                Encontre respostas, tutoriais e suporte especializado
              </p>
            </div>
          </div>
        </div>

        {/* Search */}
        <Card className="medical-card mb-8">
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Pesquisar por dúvidas, tutoriais ou funcionalidades..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Links */}
            <Card className="medical-card">
              <CardHeader>
                <CardTitle className="text-lg">Contato Rápido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Chat ao Vivo
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Video className="w-4 h-4 mr-2" />
                  Agendar Demo
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Suporte por Email
                </Button>
              </CardContent>
            </Card>

            {/* Categories */}
            <Card className="medical-card">
              <CardHeader>
                <CardTitle className="text-lg">Categorias</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {categories.map(category => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "ghost"}
                    className="w-full justify-between"
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    <span>{category.label}</span>
                    <Badge variant="secondary" className="text-xs">
                      {category.count}
                    </Badge>
                  </Button>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Guides */}
            <section>
              <div className="flex items-center mb-6">
                <Book className="w-5 h-5 mr-2 text-primary" />
                <h2 className="text-2xl font-bold">Guias Rápidos</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {guides.map(guide => {
                  const Icon = guide.icon;
                  return (
                    <Card key={guide.id} className="medical-card hover-glow cursor-pointer">
                      <CardHeader>
                        <div className="flex items-start space-x-3">
                          <div className="w-10 h-10 rounded-lg bg-gradient-primary p-2">
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <CardTitle className="text-lg">{guide.title}</CardTitle>
                            <div className="flex items-center space-x-2 mt-1">
                              <Badge variant="secondary" className="text-xs">
                                {guide.readTime}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <CardDescription>{guide.description}</CardDescription>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </section>

            <Separator />

            {/* FAQ */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <HelpCircle className="w-5 h-5 mr-2 text-primary" />
                  <h2 className="text-2xl font-bold">Perguntas Frequentes</h2>
                </div>
                <Badge variant="outline">
                  {filteredFAQs.length} resultado{filteredFAQs.length !== 1 ? 's' : ''}
                </Badge>
              </div>

              {filteredFAQs.length === 0 ? (
                <Card className="medical-card">
                  <CardContent className="pt-6">
                    <div className="text-center py-8">
                      <Search className="w-8 h-8 mx-auto mb-4 text-muted-foreground" />
                      <h3 className="font-medium mb-2">Nenhum resultado encontrado</h3>
                      <p className="text-sm text-muted-foreground">
                        Tente usar termos diferentes ou navegue pelas categorias
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card className="medical-card">
                  <CardContent className="pt-6">
                    <Accordion type="single" collapsible className="space-y-2">
                      {filteredFAQs.map(faq => (
                        <AccordionItem key={faq.id} value={faq.id} className="border rounded-lg px-4">
                          <AccordionTrigger className="text-left hover:no-underline">
                            <span className="font-medium">{faq.question}</span>
                          </AccordionTrigger>
                          <AccordionContent className="pt-2 pb-4">
                            <p className="text-muted-foreground leading-relaxed">
                              {faq.answer}
                            </p>
                            <div className="flex items-center justify-between mt-4 pt-3 border-t">
                              <p className="text-xs text-muted-foreground">
                                Esta resposta foi útil?
                              </p>
                              <div className="flex space-x-2">
                                <Button variant="ghost" size="sm" className="text-green-600 hover:text-green-700">
                                  👍 Sim
                                </Button>
                                <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                                  👎 Não
                                </Button>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>
              )}
            </section>

            {/* Contact Support */}
            <Card className="medical-card border-primary/20 bg-primary/5">
              <CardContent className="pt-6">
                <div className="text-center">
                  <MessageCircle className="w-8 h-8 mx-auto mb-4 text-primary" />
                  <h3 className="font-semibold mb-2">Não encontrou o que procurava?</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Nossa equipe de suporte está pronta para te ajudar com qualquer dúvida
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button className="gradient-primary text-white hover-lift">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Falar com Suporte
                    </Button>
                    <Button variant="outline">
                      <Video className="w-4 h-4 mr-2" />
                      Agendar Demo
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Calendar, 
  Users, 
  TrendingUp, 
  Activity, 
  Clock,
  CheckCircle,
  AlertTriangle,
  DollarSign,
  FileText,
  Settings
} from "lucide-react";

export const DashboardDemo = () => {
  const upcomingAppointments = [
    { patient: "Maria Silva", time: "09:00", type: "Consulta", status: "confirmed" },
    { patient: "João Santos", time: "10:30", type: "Retorno", status: "pending" },
    { patient: "Ana Costa", time: "14:00", type: "Avaliação", status: "confirmed" },
    { patient: "Pedro Lima", time: "15:30", type: "Consulta", status: "pending" }
  ];

  const recentPayments = [
    { patient: "Maria Silva", amount: "R$ 150,00", status: "paid", method: "PIX" },
    { patient: "Carlos Oliveira", amount: "R$ 200,00", status: "pending", method: "Cartão" },
    { patient: "Ana Costa", amount: "R$ 120,00", status: "paid", method: "PIX" }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <Badge className="medical-badge mb-4">
            Dashboard Interativo
          </Badge>
          <h2 className="text-4xl font-bold mb-4">
            Sua Clínica na Palma da Mão
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Interface intuitiva com tudo que você precisa para gerenciar sua prática médica
          </p>
        </div>

        {/* Main Dashboard */}
        <div className="max-w-7xl mx-auto">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="medical-card-glow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Consultas Hoje</CardTitle>
                <Calendar className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="medical-stat">12</div>
                <p className="text-xs text-muted-foreground">
                  +2 desde ontem
                </p>
              </CardContent>
            </Card>

            <Card className="medical-card-glow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pacientes Ativos</CardTitle>
                <Users className="h-4 w-4 text-secondary" />
              </CardHeader>
              <CardContent>
                <div className="medical-stat">847</div>
                <p className="text-xs text-muted-foreground">
                  +15 este mês
                </p>
              </CardContent>
            </Card>

            <Card className="medical-card-glow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Receita Mensal</CardTitle>
                <DollarSign className="h-4 w-4 text-accent" />
              </CardHeader>
              <CardContent>
                <div className="medical-stat">R$ 28,5K</div>
                <p className="text-xs text-muted-foreground">
                  +12% vs mês anterior
                </p>
              </CardContent>
            </Card>

            <Card className="medical-card-glow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Taxa de Presença</CardTitle>
                <TrendingUp className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="medical-stat">94%</div>
                <p className="text-xs text-muted-foreground">
                  +3% esta semana
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Agenda do Dia */}
            <div className="lg:col-span-2">
              <Card className="medical-card">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-primary" />
                        Agenda de Hoje
                      </CardTitle>
                      <CardDescription>
                        4 consultas agendadas para hoje
                      </CardDescription>
                    </div>
                    <Button variant="outline" size="sm">
                      <Settings className="h-4 w-4 mr-2" />
                      Gerenciar
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {upcomingAppointments.map((appointment, index) => (
                    <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-muted/30 transition-smooth hover:bg-muted/50">
                      <div className="flex items-center space-x-4">
                        <div className="w-2 h-8 bg-gradient-primary rounded-full" />
                        <div>
                          <p className="font-medium">{appointment.patient}</p>
                          <p className="text-sm text-muted-foreground">{appointment.type}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="font-medium">{appointment.time}</p>
                          <Badge variant={appointment.status === 'confirmed' ? 'default' : 'secondary'} className="text-xs">
                            {appointment.status === 'confirmed' ? (
                              <>
                                <CheckCircle className="w-3 h-3 mr-1" />
                                Confirmado
                              </>
                            ) : (
                              <>
                                <Clock className="w-3 h-3 mr-1" />
                                Pendente
                              </>
                            )}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar Widgets */}
            <div className="space-y-6">
              {/* Pagamentos Recentes */}
              <Card className="medical-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-accent" />
                    Pagamentos
                  </CardTitle>
                  <CardDescription>
                    Últimas transações
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {recentPayments.map((payment, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-sm">{payment.patient}</p>
                        <p className="text-xs text-muted-foreground">{payment.method}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-sm">{payment.amount}</p>
                        <Badge variant={payment.status === 'paid' ? 'default' : 'secondary'} className="text-xs">
                          {payment.status === 'paid' ? 'Pago' : 'Pendente'}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Alertas */}
              <Card className="medical-card border-orange-200 bg-orange-50/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-orange-700">
                    <AlertTriangle className="h-5 w-5" />
                    Alertas
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2" />
                    <div>
                      <p className="text-sm font-medium text-orange-700">
                        3 consultas precisam de confirmação
                      </p>
                      <p className="text-xs text-orange-600">
                        Para amanhã, 15/03
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2" />
                    <div>
                      <p className="text-sm font-medium text-orange-700">
                        2 pagamentos em atraso
                      </p>
                      <p className="text-xs text-orange-600">
                        Total: R$ 380,00
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="medical-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-primary" />
                    Ações Rápidas
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start" variant="ghost">
                    <Users className="h-4 w-4 mr-2" />
                    Novo Paciente
                  </Button>
                  <Button className="w-full justify-start" variant="ghost">
                    <Calendar className="h-4 w-4 mr-2" />
                    Agendar Consulta
                  </Button>
                  <Button className="w-full justify-start" variant="ghost">
                    <FileText className="h-4 w-4 mr-2" />
                    Gerar Relatório
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
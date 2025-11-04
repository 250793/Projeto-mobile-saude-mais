import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { 
  Users, 
  Pill, 
  Activity, 
  BarChart3, 
  Shield, 
  Syringe,
  LogOut,
  TrendingUp,
  AlertTriangle,
  Package,
  UserPlus,
  FileText,
  Calendar,
  Heart
} from "lucide-react";

interface ManagerDashboardProps {
  managerName: string;
  onLogout: () => void;
  onRegisterDoctor: () => void;
  onManageInventory: () => void;
  onManageBatches: () => void;
  onManageAccessLevels: () => void;
  onViewReports: () => void;
  onManageCampaigns: () => void;
}

export function ManagerDashboard({
  managerName,
  onLogout,
  onRegisterDoctor,
  onManageInventory,
  onManageBatches,
  onManageAccessLevels,
  onViewReports,
  onManageCampaigns
}: ManagerDashboardProps) {
  const [selectedPeriod, setSelectedPeriod] = useState("month");

  // Mock data para estatísticas
  const stats = {
    totalDoctors: 15,
    activeDoctors: 12,
    totalMedications: 248,
    lowStockMedications: 18,
    expiringSoon: 7,
    activeCampaigns: 3,
    monthlyConsultations: 1247,
    monthlyPrescriptions: 892
  };

  const recentActivities = [
    {
      id: 1,
      type: "medication",
      message: "Lote de Dipirona cadastrado - Vencimento: 15/03/2025",
      time: "há 2 horas",
      status: "success"
    },
    {
      id: 2,
      type: "doctor",
      message: "Dr. Carlos Silva cadastrado no sistema",
      time: "há 4 horas",
      status: "success"
    },
    {
      id: 3,
      type: "alert",
      message: "Estoque baixo: Amoxicilina 500mg (12 unidades)",
      time: "há 6 horas",
      status: "warning"
    },
    {
      id: 4,
      type: "campaign",
      message: "Campanha de Gripe H1N1 iniciada - UBS Centro",
      time: "há 1 dia",
      status: "info"
    },
    {
      id: 5,
      type: "alert",
      message: "5 medicamentos vencendo em 30 dias",
      time: "há 1 dia",
      status: "warning"
    }
  ];

  const criticalAlerts = [
    {
      id: 1,
      type: "stock",
      title: "Estoque Crítico",
      description: "18 medicamentos com estoque baixo",
      severity: "high"
    },
    {
      id: 2,
      type: "expiry",
      title: "Medicamentos Vencendo",
      description: "7 lotes vencem nos próximos 30 dias",
      severity: "medium"
    },
    {
      id: 3,
      type: "access",
      title: "Revisão de Acessos",
      description: "3 perfis pendentes de revisão",
      severity: "low"
    }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "medication":
        return <Pill className="w-4 h-4" />;
      case "doctor":
        return <Users className="w-4 h-4" />;
      case "campaign":
        return <Syringe className="w-4 h-4" />;
      case "alert":
        return <AlertTriangle className="w-4 h-4" />;
      default:
        return <Activity className="w-4 h-4" />;
    }
  };

  const getActivityColor = (status: string) => {
    switch (status) {
      case "success":
        return "text-emerald-600";
      case "warning":
        return "text-amber-600";
      case "info":
        return "text-sky-600";
      default:
        return "text-slate-600";
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200";
      case "medium":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "low":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-slate-100 text-slate-800 border-slate-200";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border p-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg">Saúde Mais - Gestor</h1>
              <p className="text-sm text-muted-foreground">{managerName}</p>
            </div>
          </div>
          <Button variant="ghost" onClick={onLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Sair
          </Button>
        </div>
      </div>

      <div className="p-4 max-w-7xl mx-auto">
        {/* Alert Cards */}
        {criticalAlerts.length > 0 && (
          <div className="mb-6 space-y-3">
            {criticalAlerts.map((alert) => (
              <Card key={alert.id} className={`border-l-4 ${getSeverityColor(alert.severity)}`}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <AlertTriangle className="w-5 h-5" />
                      <div>
                        <h4 className="font-medium">{alert.title}</h4>
                        <p className="text-sm text-muted-foreground">{alert.description}</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Visualizar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-sky-100 rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5 text-sky-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Médicos Ativos</p>
                  <p className="text-2xl font-semibold">{stats.activeDoctors}/{stats.totalDoctors}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                  <Package className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Medicamentos</p>
                  <p className="text-2xl font-semibold">{stats.totalMedications}</p>
                  <p className="text-xs text-red-600">{stats.lowStockMedications} em falta</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                  <Syringe className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Campanhas Ativas</p>
                  <p className="text-2xl font-semibold">{stats.activeCampaigns}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-rose-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Consultas/Mês</p>
                  <p className="text-2xl font-semibold">{stats.monthlyConsultations}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-primary" />
                Ações Rápidas
              </CardTitle>
              <CardDescription>
                Principais funcionalidades de gestão
              </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Button
                variant="outline"
                className="h-auto p-4 flex flex-col items-center gap-2"
                onClick={onRegisterDoctor}
              >
                <UserPlus className="w-6 h-6" />
                <span>Cadastrar Médico</span>
              </Button>
              <Button
                variant="outline"
                className="h-auto p-4 flex flex-col items-center gap-2"
                onClick={onManageInventory}
              >
                <Package className="w-6 h-6" />
                <span>Estoque</span>
              </Button>
              <Button
                variant="outline"
                className="h-auto p-4 flex flex-col items-center gap-2"
                onClick={onManageBatches}
              >
                <Pill className="w-6 h-6" />
                <span>Lotes</span>
              </Button>
              <Button
                variant="outline"
                className="h-auto p-4 flex flex-col items-center gap-2"
                onClick={onManageAccessLevels}
              >
                <Shield className="w-6 h-6" />
                <span>Perfis de Acesso</span>
              </Button>
              <Button
                variant="outline"
                className="h-auto p-4 flex flex-col items-center gap-2"
                onClick={onViewReports}
              >
                <BarChart3 className="w-6 h-6" />
                <span>Relatórios</span>
              </Button>
              <Button
                variant="outline"
                className="h-auto p-4 flex flex-col items-center gap-2"
                onClick={onManageCampaigns}
              >
                <Syringe className="w-6 h-6" />
                <span>Campanhas</span>
              </Button>
            </CardContent>
          </Card>

          {/* Recent Activities */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-emerald-400" />
                Atividades Recentes
              </CardTitle>
              <CardDescription>
                Últimas ações no sistema
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center bg-accent ${getActivityColor(activity.status)}`}>
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm">{activity.message}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Additional Information Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-rose-400" />
                Resumo Mensal
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Consultas:</span>
                <span className="font-medium">{stats.monthlyConsultations}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Receitas:</span>
                <span className="font-medium">{stats.monthlyPrescriptions}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Taxa de ocupação:</span>
                <span className="font-medium">78%</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="w-5 h-5 text-amber-400" />
                Status do Estoque
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Total de itens:</span>
                <span className="font-medium">{stats.totalMedications}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Estoque baixo:</span>
                <span className="font-medium text-red-600">{stats.lowStockMedications}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Vencendo:</span>
                <span className="font-medium text-amber-600">{stats.expiringSoon}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Syringe className="w-5 h-5 text-sky-400" />
                Campanhas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Ativas:</span>
                <span className="font-medium">{stats.activeCampaigns}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Este mês:</span>
                <span className="font-medium">127 doses</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Meta mensal:</span>
                <span className="font-medium">200 doses</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
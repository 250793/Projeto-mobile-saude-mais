import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { 
  Package, 
  Plus,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Calendar,
  BarChart3,
  FileText,
  LogOut,
  Activity,
  Pill,
  Archive,
  Eye
} from "lucide-react";

interface InventoryDashboardProps {
  inventoryUserName: string;
  onLogout: () => void;
  onAddMedication: () => void;
  onManageStock: () => void;
  onAddBatch: () => void;
  onViewReports: () => void;
  onManageNotes: () => void;
}

export function InventoryDashboard({
  inventoryUserName,
  onLogout,
  onAddMedication,
  onManageStock,
  onAddBatch,
  onViewReports,
  onManageNotes
}: InventoryDashboardProps) {
  // Mock data
  const stockStats = {
    totalMedications: 248,
    lowStock: 18,
    critical: 5,
    expiringSoon: 12,
    totalValue: 125890.50,
    monthlyMovement: 3420
  };

  const recentMedications = [
    {
      id: "MED101",
      name: "Paracetamol 750mg",
      manufacturer: "Neo Química",
      registrationDate: "2024-09-20",
      status: "active",
      category: "Analgésicos"
    },
    {
      id: "MED102",
      name: "Omeprazol 20mg",
      manufacturer: "EMS",
      registrationDate: "2024-09-19",
      status: "active",
      category: "Gastroenterológicos"
    },
    {
      id: "MED103", 
      name: "Sinvastatina 20mg",
      manufacturer: "Medley",
      registrationDate: "2024-09-18",
      status: "active",
      category: "Cardiovasculares"
    }
  ];

  const recentBatches = [
    {
      id: "BATCH101",
      medicationName: "Dipirona Sódica 500mg",
      batchNumber: "DP240920001",
      quantity: 500,
      expiryDate: "2026-09-20",
      supplier: "EMS Pharma",
      registrationDate: "2024-09-20",
      status: "active"
    },
    {
      id: "BATCH102",
      medicationName: "Amoxicilina 500mg", 
      batchNumber: "AM240919002",
      quantity: 200,
      expiryDate: "2025-09-19",
      supplier: "Medley",
      registrationDate: "2024-09-19",
      status: "expiring_soon"
    },
    {
      id: "BATCH103",
      medicationName: "Losartana 50mg",
      batchNumber: "LO240918003",
      quantity: 300,
      expiryDate: "2027-09-18",
      supplier: "Eurofarma",
      registrationDate: "2024-09-18",
      status: "active"
    }
  ];

  const criticalAlerts = [
    {
      id: 1,
      type: "low_stock",
      message: "Metformina 850mg - Estoque crítico: 15 unidades",
      priority: "high",
      time: "há 1 hora"
    },
    {
      id: 2,
      type: "expiring",
      message: "Lote AM240815001 de Amoxicilina vence em 5 dias",
      priority: "medium",
      time: "há 2 horas"
    },
    {
      id: 3,
      type: "missing_batch",
      message: "Cadastrar lote para Ibuprofeno 600mg recebido hoje",
      priority: "medium",
      time: "há 3 horas"
    }
  ];

  const pendingNotes = [
    {
      id: 1,
      medication: "Dipirona Sódica 500mg",
      type: "observacao",
      content: "Produto apresentou mudança na embalagem - verificar com fornecedor",
      author: "João Silva",
      date: "2024-09-20"
    },
    {
      id: 2,
      medication: "Omeprazol 20mg",
      type: "alerta",
      content: "Temperatura de armazenamento deve ser mantida entre 15-25°C",
      author: "Maria Santos",
      date: "2024-09-19"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-emerald-100 text-emerald-800";
      case "expiring_soon":
        return "bg-amber-100 text-amber-800";
      case "expired":
        return "bg-red-100 text-red-800";
      case "inactive":
        return "bg-slate-100 text-slate-800";
      default:
        return "bg-slate-100 text-slate-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "Ativo";
      case "expiring_soon":
        return "Vencendo";
      case "expired":
        return "Vencido";
      case "inactive":
        return "Inativo";
      default:
        return status;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-amber-100 text-amber-800";
      case "low":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-slate-100 text-slate-800";
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "low_stock":
        return <TrendingDown className="w-4 h-4" />;
      case "expiring":
        return <Calendar className="w-4 h-4" />;
      case "missing_batch":
        return <Package className="w-4 h-4" />;
      default:
        return <AlertTriangle className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border p-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <Package className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg">Saúde Mais - Estoque</h1>
              <p className="text-sm text-muted-foreground">{inventoryUserName}</p>
            </div>
          </div>
          <Button variant="ghost" onClick={onLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Sair
          </Button>
        </div>
      </div>

      <div className="p-4 max-w-7xl mx-auto space-y-6">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-sky-100 rounded-full flex items-center justify-center">
                  <Pill className="w-5 h-5 text-sky-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Medicamentos</p>
                  <p className="text-2xl font-semibold">{stockStats.totalMedications}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                  <TrendingDown className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Estoque Baixo</p>
                  <p className="text-2xl font-semibold">{stockStats.lowStock}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Crítico</p>
                  <p className="text-2xl font-semibold">{stockStats.critical}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-violet-100 rounded-full flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-violet-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Vencendo</p>
                  <p className="text-2xl font-semibold">{stockStats.expiringSoon}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Valor Total</p>
                  <p className="text-xl font-semibold">R$ {stockStats.totalValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                  <Activity className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Movimento Mensal</p>
                  <p className="text-2xl font-semibold">{stockStats.monthlyMovement}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Critical Alerts */}
        {criticalAlerts.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-400" />
                Alertas Críticos
              </CardTitle>
              <CardDescription>
                Situações que requerem atenção imediata
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {criticalAlerts.map((alert) => (
                <div key={alert.id} className="flex items-center justify-between p-3 border border-red-200 bg-red-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="text-red-600">
                      {getAlertIcon(alert.type)}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{alert.message}</p>
                      <p className="text-xs text-muted-foreground">{alert.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getPriorityColor(alert.priority)} variant="secondary">
                      {alert.priority === "high" ? "Alta" : alert.priority === "medium" ? "Média" : "Baixa"}
                    </Badge>
                    <Button size="sm" variant="outline">
                      Resolver
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-primary" />
              Ações Rápidas
            </CardTitle>
            <CardDescription>
              Principais funcionalidades de gestão de estoque
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <Button
              variant="outline"
              className="h-auto p-4 flex flex-col items-center gap-2"
              onClick={onAddMedication}
            >
              <Plus className="w-6 h-6" />
              <span>Cadastrar Medicamento</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto p-4 flex flex-col items-center gap-2"
              onClick={onAddBatch}
            >
              <Archive className="w-6 h-6" />
              <span>Adicionar Lote</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto p-4 flex flex-col items-center gap-2"
              onClick={onManageStock}
            >
              <Package className="w-6 h-6" />
              <span>Gerenciar Estoque</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto p-4 flex flex-col items-center gap-2"
              onClick={onManageNotes}
            >
              <FileText className="w-6 h-6" />
              <span>Gerenciar Notas</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto p-4 flex flex-col items-center gap-2"
              onClick={onViewReports}
            >
              <BarChart3 className="w-6 h-6" />
              <span>Relatórios</span>
            </Button>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Medications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Pill className="w-5 h-5 text-sky-400" />
                Medicamentos Recentes
              </CardTitle>
              <CardDescription>
                Últimos medicamentos cadastrados
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentMedications.map((medication) => (
                <div key={medication.id} className="flex items-center justify-between p-3 bg-accent/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                      <Pill className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div>
                      <div className="font-medium">{medication.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {medication.manufacturer} • {medication.category}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        ID: {medication.id} • {medication.registrationDate}
                      </div>
                    </div>
                  </div>
                  <Badge className={getStatusColor(medication.status)} variant="secondary">
                    {getStatusText(medication.status)}
                  </Badge>
                </div>
              ))}
              <Button variant="outline" className="w-full">
                Ver Todos os Medicamentos
              </Button>
            </CardContent>
          </Card>

          {/* Recent Batches */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Archive className="w-5 h-5 text-emerald-400" />
                Lotes Recentes
              </CardTitle>
              <CardDescription>
                Últimos lotes cadastrados
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentBatches.map((batch) => (
                <div key={batch.id} className="flex items-center justify-between p-3 bg-accent/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                      <Archive className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <div className="font-medium">{batch.medicationName}</div>
                      <div className="text-sm text-muted-foreground">
                        Lote: {batch.batchNumber} • {batch.quantity} unidades
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Vence: {batch.expiryDate} • {batch.supplier}
                      </div>
                    </div>
                  </div>
                  <Badge className={getStatusColor(batch.status)} variant="secondary">
                    {getStatusText(batch.status)}
                  </Badge>
                </div>
              ))}
              <Button variant="outline" className="w-full">
                Ver Todos os Lotes
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Pending Notes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-violet-400" />
              Notas Pendentes
            </CardTitle>
            <CardDescription>
              Observações e alertas que precisam ser revisados
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {pendingNotes.map((note) => (
              <div key={note.id} className="flex items-start justify-between p-4 border border-border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant={note.type === "alerta" ? "destructive" : "secondary"}>
                      {note.type}
                    </Badge>
                    <span className="font-medium">{note.medication}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{note.content}</p>
                  <div className="text-xs text-muted-foreground">
                    Por {note.author} • {note.date}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Eye className="w-3 h-3 mr-1" />
                    Ver
                  </Button>
                  <Button size="sm" variant="outline">
                    Resolver
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
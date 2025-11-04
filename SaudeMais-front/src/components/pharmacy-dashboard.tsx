import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { 
  Pill, 
  Search,
  Package,
  FileText,
  User,
  Calendar,
  CheckCircle,
  AlertTriangle,
  LogOut,
  Activity,
  TrendingDown,
  Clock,
  Receipt,
  Users,
  BarChart3
} from "lucide-react";

interface PharmacyDashboardProps {
  pharmacistName: string;
  onLogout: () => void;
  onDispenseMedication: () => void;
  onTrackPrescription: () => void;
  onViewInventory: () => void;
  onViewReports: () => void;
}

export function PharmacyDashboard({
  pharmacistName,
  onLogout,
  onDispenseMedication,
  onTrackPrescription,
  onViewInventory,
  onViewReports
}: PharmacyDashboardProps) {
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data
  const todayStats = {
    dispensedPrescriptions: 42,
    pendingPrescriptions: 8,
    lowStockItems: 12,
    patientsServed: 38,
    totalValue: 2840.50
  };

  const pendingPrescriptions = [
    {
      id: "REC001",
      prescriptionNumber: "24092001",
      patientName: "Maria Silva Santos",
      doctorName: "Dr. Ana Silva",
      issueDate: "2024-09-20",
      medications: [
        { name: "Losartana 50mg", quantity: 30, available: true },
        { name: "Metformina 850mg", quantity: 60, available: false }
      ],
      status: "partial",
      priority: "normal"
    },
    {
      id: "REC002",
      prescriptionNumber: "24092002", 
      patientName: "João Carlos Oliveira",
      doctorName: "Dr. João Santos",
      issueDate: "2024-09-20",
      medications: [
        { name: "Dipirona 500mg", quantity: 20, available: true },
        { name: "Omeprazol 20mg", quantity: 30, available: true }
      ],
      status: "ready",
      priority: "normal"
    },
    {
      id: "REC003",
      prescriptionNumber: "24092003",
      patientName: "Ana Paula Costa",
      doctorName: "Dr. Carlos Santos", 
      issueDate: "2024-09-19",
      medications: [
        { name: "Amoxicilina 500mg", quantity: 21, available: false }
      ],
      status: "unavailable",
      priority: "urgent"
    }
  ];

  const recentDispensing = [
    {
      id: "DISP001",
      prescriptionNumber: "24091901",
      patientName: "Pedro Lima",
      medicationName: "Paracetamol 750mg",
      quantity: 20,
      dispensedAt: "2024-09-20 14:30",
      pharmacist: pharmacistName,
      status: "completed"
    },
    {
      id: "DISP002",
      prescriptionNumber: "24091902",
      patientName: "Fernanda Costa",
      medicationName: "Dipirona 500mg",
      quantity: 10,
      dispensedAt: "2024-09-20 14:15",
      pharmacist: pharmacistName,
      status: "completed"
    },
    {
      id: "DISP003",
      prescriptionNumber: "24091903",
      patientName: "Roberto Silva",
      medicationName: "Losartana 50mg",
      quantity: 30,
      dispensedAt: "2024-09-20 13:45",
      pharmacist: pharmacistName,
      status: "completed"
    }
  ];

  const lowStockMedications = [
    {
      id: "MED001",
      name: "Metformina 850mg", 
      currentStock: 15,
      minimumStock: 50,
      lastDispensed: "2024-09-20",
      status: "critical"
    },
    {
      id: "MED002",
      name: "Amoxicilina 500mg",
      currentStock: 8,
      minimumStock: 30,
      lastDispensed: "2024-09-20",
      status: "critical"
    },
    {
      id: "MED003", 
      name: "Omeprazol 20mg",
      currentStock: 22,
      minimumStock: 40,
      lastDispensed: "2024-09-19",
      status: "low"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ready":
        return "bg-emerald-100 text-emerald-800";
      case "partial":
        return "bg-amber-100 text-amber-800";
      case "unavailable":
        return "bg-red-100 text-red-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      case "critical":
        return "bg-red-100 text-red-800";
      case "low":
        return "bg-amber-100 text-amber-800";
      default:
        return "bg-slate-100 text-slate-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "ready":
        return "Pronto";
      case "partial":
        return "Parcial";
      case "unavailable":
        return "Indisponível";
      case "completed":
        return "Dispensado";
      case "critical":
        return "Crítico";
      case "low":
        return "Baixo";
      default:
        return status;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "ready":
        return <CheckCircle className="w-4 h-4" />;
      case "partial":
        return <Clock className="w-4 h-4" />;
      case "unavailable":
        return <AlertTriangle className="w-4 h-4" />;
      case "completed":
        return <CheckCircle className="w-4 h-4" />;
      case "critical":
        return <AlertTriangle className="w-4 h-4" />;
      case "low":
        return <TrendingDown className="w-4 h-4" />;
      default:
        return <Package className="w-4 h-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "bg-red-100 text-red-800";
      case "high":
        return "bg-orange-100 text-orange-800";
      case "normal":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-slate-100 text-slate-800";
    }
  };

  const filteredPrescriptions = pendingPrescriptions.filter(prescription =>
    prescription.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    prescription.prescriptionNumber.includes(searchTerm) ||
    prescription.doctorName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary rounded-full flex items-center justify-center">
              <Pill className="w-5 h-5 sm:w-6 sm:h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl md:text-2xl">Saúde Mais - Farmácia</h1>
              <p className="text-sm sm:text-base text-muted-foreground">{pharmacistName}</p>
            </div>
          </div>
          <Button variant="ghost" onClick={onLogout} className="self-end sm:self-auto">
            <LogOut className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Sair</span>
          </Button>
        </div>
      </div>

      <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6">
          <Card>
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm text-muted-foreground">Dispensadas Hoje</p>
                  <p className="text-xl sm:text-2xl font-semibold">{todayStats.dispensedPrescriptions}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-amber-100 rounded-full flex items-center justify-center">
                  <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm text-muted-foreground">Pendentes</p>
                  <p className="text-xl sm:text-2xl font-semibold">{todayStats.pendingPrescriptions}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <TrendingDown className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm text-muted-foreground">Estoque Baixo</p>
                  <p className="text-xl sm:text-2xl font-semibold">{todayStats.lowStockItems}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-sky-100 rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5 sm:w-6 sm:h-6 text-sky-600" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm text-muted-foreground">Pacientes Atendidos</p>
                  <p className="text-xl sm:text-2xl font-semibold">{todayStats.patientsServed}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-violet-100 rounded-full flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6 text-violet-600" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm text-muted-foreground">Valor Total</p>
                  <p className="text-lg sm:text-xl font-semibold">R$ {todayStats.totalValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
              <Activity className="w-5 h-5 text-primary" />
              Ações Rápidas
            </CardTitle>
            <CardDescription className="text-sm sm:text-base">
              Principais funcionalidades da farmácia
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 p-4 sm:p-6 pt-0">
            <Button
              variant="outline"
              className="h-auto p-4 sm:p-6 flex flex-col items-center gap-2 text-sm sm:text-base min-h-[80px] sm:min-h-[100px]"
              onClick={onDispenseMedication}
            >
              <Pill className="w-6 h-6 sm:w-8 sm:h-8" />
              <span className="text-center">Dispensar Medicamento</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto p-4 sm:p-6 flex flex-col items-center gap-2 text-sm sm:text-base min-h-[80px] sm:min-h-[100px]"
              onClick={onTrackPrescription}
            >
              <Receipt className="w-6 h-6 sm:w-8 sm:h-8" />
              <span className="text-center">Rastrear Receita</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto p-4 sm:p-6 flex flex-col items-center gap-2 text-sm sm:text-base min-h-[80px] sm:min-h-[100px]"
              onClick={onViewInventory}
            >
              <Package className="w-6 h-6 sm:w-8 sm:h-8" />
              <span className="text-center">Consultar Estoque</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto p-4 sm:p-6 flex flex-col items-center gap-2 text-sm sm:text-base min-h-[80px] sm:min-h-[100px]"
              onClick={onViewReports}
            >
              <FileText className="w-6 h-6 sm:w-8 sm:h-8" />
              <span className="text-center">Relatórios</span>
            </Button>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pending Prescriptions */}
          <Card>
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                <Receipt className="w-5 h-5 text-amber-400" />
                Receitas Pendentes
              </CardTitle>
              <CardDescription className="text-sm sm:text-base">
                Receitas aguardando dispensação
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 p-4 sm:p-6 pt-0">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por paciente, receita ou médico..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-11 sm:h-12 text-sm sm:text-base"
                />
              </div>

              {filteredPrescriptions.map((prescription) => (
                <div key={prescription.id} className="border border-border rounded-lg p-4 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-1">
                        <span className="font-medium text-sm sm:text-base">{prescription.patientName}</span>
                        {prescription.priority === "urgent" && (
                          <Badge className={getPriorityColor(prescription.priority)} variant="secondary">
                            Urgente
                          </Badge>
                        )}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Receita: {prescription.prescriptionNumber} • {prescription.doctorName}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Emitida em: {prescription.issueDate}
                      </div>
                    </div>
                    <Badge className={getStatusColor(prescription.status)} variant="secondary">
                      {getStatusIcon(prescription.status)}
                      <span className="ml-1">{getStatusText(prescription.status)}</span>
                    </Badge>
                  </div>

                  <div className="space-y-2">
                    {prescription.medications.map((medication, index) => (
                      <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-sm">
                        <span className="min-w-0">{medication.name} - {medication.quantity} unidades</span>
                        <Badge variant={medication.available ? "secondary" : "destructive"} className="self-start sm:self-auto">
                          {medication.available ? "Disponível" : "Indisponível"}
                        </Badge>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2 pt-2">
                    <Button size="sm" disabled={prescription.status === "unavailable"} className="w-full sm:w-auto">
                      Dispensar
                    </Button>
                    <Button size="sm" variant="outline" className="w-full sm:w-auto">
                      Detalhes
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Dispensing */}
          <Card>
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                <CheckCircle className="w-5 h-5 text-emerald-400" />
                Dispensações Recentes
              </CardTitle>
              <CardDescription className="text-sm sm:text-base">
                Últimos medicamentos dispensados
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 p-4 sm:p-6 pt-0">
              {recentDispensing.map((dispensing) => (
                <div key={dispensing.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3 bg-accent/50 rounded-lg">
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Pill className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-medium text-sm sm:text-base">{dispensing.patientName}</div>
                      <div className="text-sm text-muted-foreground">
                        {dispensing.medicationName} • {dispensing.quantity} unidades
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Receita: {dispensing.prescriptionNumber} • {dispensing.dispensedAt}
                      </div>
                    </div>
                  </div>
                  <Badge className={getStatusColor(dispensing.status)} variant="secondary" className="self-start sm:self-auto">
                    {getStatusIcon(dispensing.status)}
                    <span className="ml-1">{getStatusText(dispensing.status)}</span>
                  </Badge>
                </div>
              ))}
              <Button variant="outline" className="w-full">
                Ver Todo o Histórico
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Low Stock Alert */}
        <Card>
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
              <AlertTriangle className="w-5 h-5 text-red-400" />
              Medicamentos com Estoque Baixo
            </CardTitle>
            <CardDescription className="text-sm sm:text-base">
              Medicamentos que precisam de reposição urgente
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {lowStockMedications.map((medication) => (
                <div key={medication.id} className="border border-border rounded-lg p-4">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-3">
                    <div className="min-w-0">
                      <div className="font-medium text-sm sm:text-base">{medication.name}</div>
                      <div className="text-sm text-muted-foreground">
                        ID: {medication.id}
                      </div>
                    </div>
                    <Badge className={getStatusColor(medication.status)} variant="secondary" className="self-start">
                      {getStatusIcon(medication.status)}
                      <span className="ml-1">{getStatusText(medication.status)}</span>
                    </Badge>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Estoque atual:</span>
                      <span className="font-medium">{medication.currentStock}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Estoque mínimo:</span>
                      <span>{medication.minimumStock}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Última dispensação:</span>
                      <span>{medication.lastDispensed}</span>
                    </div>
                  </div>

                  <Button size="sm" variant="outline" className="w-full mt-3">
                    Solicitar Reposição
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
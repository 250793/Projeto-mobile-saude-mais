import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";
import { Input } from "./ui/input";
import { 
  Calendar, 
  Clock, 
  FileText, 
  Search, 
  Heart, 
  Stethoscope,
  Users,
  UserCheck,
  ClipboardList,
  Activity,
  User,
  LogOut,
  ChevronRight,
  Plus
} from "lucide-react";

interface DoctorDashboardProps {
  doctorName: string;
  onLogout: () => void;
  onViewPatientRecords: (patientId: string, patientName: string) => void;
  onStartConsultation?: (patientId: string, patientName: string, time: string, type: string) => void;
  onNewPrescription?: () => void;
  onNewExamRequest?: () => void;
  onViewPatientsList?: () => void;
  onViewSchedule?: () => void;
  onAddNewPatient?: () => void;
}

export function DoctorDashboard({ doctorName, onLogout, onViewPatientRecords, onStartConsultation, onNewPrescription, onNewExamRequest, onViewPatientsList, onViewSchedule, onAddNewPatient }: DoctorDashboardProps) {
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data para demonstração
  const todayAppointments = [
    {
      id: 1,
      patientName: "Maria Silva",
      patientId: "P001",
      time: "08:30",
      type: "Consulta de Rotina",
      status: "confirmada",
      notes: "Retorno cardiologia"
    },
    {
      id: 2,
      patientName: "João Santos",
      patientId: "P002", 
      time: "09:15",
      type: "Primeira Consulta",
      status: "confirmada",
      notes: "Avaliação inicial"
    },
    {
      id: 3,
      patientName: "Ana Costa",
      patientId: "P003",
      time: "10:00",
      type: "Retorno",
      status: "em_andamento",
      notes: "Resultado de exames"
    },
    {
      id: 4,
      patientName: "Pedro Oliveira",
      patientId: "P004",
      time: "10:45",
      type: "Consulta de Rotina", 
      status: "aguardando",
      notes: "Hipertensão - controle"
    },
    {
      id: 5,
      patientName: "Lucia Ferreira",
      patientId: "P005",
      time: "14:30",
      type: "Retorno",
      status: "aguardando",
      notes: "Diabetes - acompanhamento"
    }
  ];

  const recentPatients = [
    {
      id: "P001",
      name: "Maria Silva",
      age: 65,
      lastVisit: "18 Set 2024",
      condition: "Hipertensão",
      status: "Estável"
    },
    {
      id: "P002", 
      name: "João Santos",
      age: 42,
      lastVisit: "15 Set 2024",
      condition: "Diabetes Tipo 2",
      status: "Controlado"
    },
    {
      id: "P003",
      name: "Ana Costa", 
      age: 38,
      lastVisit: "12 Set 2024",
      condition: "Enxaqueca",
      status: "Em tratamento"
    },
    {
      id: "P004",
      name: "Pedro Oliveira",
      age: 55,
      lastVisit: "10 Set 2024", 
      condition: "Hipertensão",
      status: "Estável"
    },
    {
      id: "P005",
      name: "Lucia Ferreira",
      age: 48,
      lastVisit: "08 Set 2024",
      condition: "Diabetes Tipo 2", 
      status: "Controlado"
    }
  ];

  const stats = {
    totalPatients: 127,
    todayAppointments: 8,
    completedToday: 3,
    pendingResults: 12
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmada":
        return "bg-emerald-100 text-emerald-800";
      case "em_andamento":
        return "bg-sky-100 text-sky-800";
      case "aguardando":
        return "bg-amber-100 text-amber-800";
      case "concluida":
        return "bg-slate-100 text-slate-800";
      default:
        return "bg-slate-100 text-slate-800";
    }
  };

  const getConditionColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "estável":
        return "bg-emerald-100 text-emerald-800";
      case "controlado":
        return "bg-emerald-100 text-emerald-800";
      case "em tratamento":
        return "bg-amber-100 text-amber-800";
      case "atenção":
        return "bg-red-100 text-red-800";
      default:
        return "bg-slate-100 text-slate-800";
    }
  };

  const filteredPatients = recentPatients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.condition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border p-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <Heart className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg">Saúde Mais - Médico</h1>
              <p className="text-sm text-muted-foreground">Dr. {doctorName}</p>
            </div>
          </div>
          <Button variant="ghost" onClick={onLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Sair
          </Button>
        </div>
      </div>

      <div className="p-4 max-w-7xl mx-auto">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-sky-100 rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5 text-sky-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total de Pacientes</p>
                  <p className="text-2xl font-semibold">{stats.totalPatients}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Consultas Hoje</p>
                  <p className="text-2xl font-semibold">{stats.todayAppointments}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                  <UserCheck className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Atendidas</p>
                  <p className="text-2xl font-semibold">{stats.completedToday}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center">
                  <ClipboardList className="w-5 h-5 text-rose-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Exames Pendentes</p>
                  <p className="text-2xl font-semibold">{stats.pendingResults}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Consultas de Hoje */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-emerald-400" />
                Consultas de Hoje
              </CardTitle>
              <CardDescription>
                {new Date().toLocaleDateString('pt-BR', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {todayAppointments.map((appointment, index) => (
                <div key={appointment.id}>
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center">
                      <Clock className="w-5 h-5 text-accent-foreground" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{appointment.patientName}</p>
                          <p className="text-sm text-muted-foreground">{appointment.type}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{appointment.time}</p>
                          <Badge className={getStatusColor(appointment.status)}>
                            {appointment.status.replace('_', ' ')}
                          </Badge>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{appointment.notes}</p>
                      <div className="flex gap-2 pt-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => onViewPatientRecords(appointment.patientId, appointment.patientName)}
                        >
                          <FileText className="w-3 h-3 mr-1" />
                          Ver Prontuário
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => onStartConsultation?.(appointment.patientId, appointment.patientName, appointment.time, appointment.type)}
                        >
                          <Stethoscope className="w-3 h-3 mr-1" />
                          Iniciar Consulta
                        </Button>
                      </div>
                    </div>
                  </div>
                  {index < todayAppointments.length - 1 && <Separator className="mt-4" />}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Pacientes Recentes */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-sky-400" />
                    Pacientes Recentes
                  </CardTitle>
                  <CardDescription>
                    Pacientes atendidos recentemente
                  </CardDescription>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => onAddNewPatient?.()}
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Novo Paciente
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar pacientes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <div className="space-y-3">
                {filteredPatients.map((patient, index) => (
                  <div key={patient.id}>
                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback className="bg-muted">
                          <User className="w-4 h-4" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">{patient.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {patient.age} anos • {patient.lastVisit}
                            </p>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => onViewPatientRecords(patient.id, patient.name)}
                          >
                            <ChevronRight className="w-4 h-4" />
                          </Button>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-muted-foreground">{patient.condition}</p>
                          <Badge className={getConditionColor(patient.status)} variant="secondary">
                            {patient.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    {index < filteredPatients.length - 1 && <Separator className="mt-3" />}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Ações Rápidas */}
        <div className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-amber-400" />
                Ações Rápidas
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <Button 
                variant="outline" 
                className="h-auto p-4 flex flex-col items-center gap-2"
                onClick={() => onNewPrescription?.()}
              >
                <FileText className="w-6 h-6" />
                <span>Nova Receita</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-auto p-4 flex flex-col items-center gap-2"
                onClick={() => onNewExamRequest?.()}
              >
                <ClipboardList className="w-6 h-6" />
                <span>Solicitar Exame</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-auto p-4 flex flex-col items-center gap-2"
                onClick={() => onViewPatientsList?.()}
              >
                <Users className="w-6 h-6" />
                <span>Lista de Pacientes</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-auto p-4 flex flex-col items-center gap-2"
                onClick={() => onViewSchedule?.()}
              >
                <Calendar className="w-6 h-6" />
                <span>Agenda</span>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
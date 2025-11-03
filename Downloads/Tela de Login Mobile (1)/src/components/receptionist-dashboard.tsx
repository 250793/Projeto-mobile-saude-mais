import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { 
  UserCheck, 
  Users,
  Calendar,
  CalendarPlus,
  MapPin,
  UserPlus,
  Clock,
  CheckCircle,
  AlertCircle,
  LogOut,
  Activity,
  TrendingUp,
  Phone,
  Mail
} from "lucide-react";

interface ReceptionistDashboardProps {
  receptionistName: string;
  onLogout: () => void;
  onRegisterPatient: () => void;
  onScheduleAppointment: () => void;
  onRegisterHealthUnit: () => void;
  onViewPatients: () => void;
  onViewAppointments: () => void;
}

export function ReceptionistDashboard({
  receptionistName,
  onLogout,
  onRegisterPatient,
  onScheduleAppointment,
  onRegisterHealthUnit,
  onViewPatients,
  onViewAppointments
}: ReceptionistDashboardProps) {
  // Mock data
  const todayStats = {
    scheduledAppointments: 24,
    completedAppointments: 18,
    canceledAppointments: 2,
    newPatients: 5,
    waitingPatients: 3
  };

  const recentPatients = [
    {
      id: "PAT001",
      name: "Maria Silva Santos",
      phone: "(11) 99999-1234",
      email: "maria.silva@email.com",
      registrationDate: "2024-09-20",
      status: "active"
    },
    {
      id: "PAT002", 
      name: "João Carlos Oliveira",
      phone: "(11) 99999-5678",
      email: "joao.carlos@email.com",
      registrationDate: "2024-09-20",
      status: "active"
    },
    {
      id: "PAT003",
      name: "Ana Paula Costa",
      phone: "(11) 99999-9012",
      email: "ana.paula@email.com",
      registrationDate: "2024-09-19",
      status: "active"
    }
  ];

  const todayAppointments = [
    {
      id: "APP001",
      patientName: "Carlos Mendes",
      doctor: "Dr. Ana Silva",
      time: "09:00",
      type: "Consulta",
      status: "completed"
    },
    {
      id: "APP002",
      patientName: "Lúcia Santos",
      doctor: "Dr. João Santos", 
      time: "09:30",
      type: "Retorno",
      status: "completed"
    },
    {
      id: "APP003",
      patientName: "Pedro Lima",
      doctor: "Dr. Ana Silva",
      time: "10:00", 
      type: "Consulta",
      status: "in_progress"
    },
    {
      id: "APP004",
      patientName: "Fernanda Costa",
      doctor: "Dr. Carlos Santos",
      time: "10:30",
      type: "Consulta", 
      status: "scheduled"
    },
    {
      id: "APP005",
      patientName: "Roberto Silva",
      doctor: "Dr. João Santos",
      time: "11:00",
      type: "Retorno",
      status: "scheduled"
    }
  ];

  const pendingTasks = [
    {
      id: 1,
      task: "Confirmar consulta de Maria Silva para amanhã",
      priority: "high",
      time: "há 30 min"
    },
    {
      id: 2, 
      task: "Reagendar consulta cancelada de João Costa",
      priority: "medium",
      time: "há 1 hora"
    },
    {
      id: 3,
      task: "Atualizar dados de contato de Ana Santos",
      priority: "low", 
      time: "há 2 horas"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-emerald-100 text-emerald-800";
      case "in_progress":
        return "bg-sky-100 text-sky-800";
      case "scheduled":
        return "bg-amber-100 text-amber-800";
      case "canceled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-slate-100 text-slate-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return "Realizada";
      case "in_progress":
        return "Em Andamento";
      case "scheduled":
        return "Agendada";
      case "canceled":
        return "Cancelada";
      default:
        return status;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4" />;
      case "in_progress":
        return <Activity className="w-4 h-4" />;
      case "scheduled":
        return <Clock className="w-4 h-4" />;
      case "canceled":
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <Calendar className="w-4 h-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-amber-100 text-amber-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-slate-100 text-slate-800";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border p-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <UserCheck className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg">Saúde Mais - Recepção</h1>
              <p className="text-sm text-muted-foreground">{receptionistName}</p>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-sky-100 rounded-full flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-sky-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Agendadas Hoje</p>
                  <p className="text-2xl font-semibold">{todayStats.scheduledAppointments}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Realizadas</p>
                  <p className="text-2xl font-semibold">{todayStats.completedAppointments}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                  <Clock className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Aguardando</p>
                  <p className="text-2xl font-semibold">{todayStats.waitingPatients}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-violet-100 rounded-full flex items-center justify-center">
                  <UserPlus className="w-5 h-5 text-violet-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Novos Pacientes</p>
                  <p className="text-2xl font-semibold">{todayStats.newPatients}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-rose-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Canceladas</p>
                  <p className="text-2xl font-semibold">{todayStats.canceledAppointments}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-primary" />
              Ações Rápidas
            </CardTitle>
            <CardDescription>
              Principais funcionalidades de recepção
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button
              variant="outline"
              className="h-auto p-4 flex flex-col items-center gap-2"
              onClick={onRegisterPatient}
            >
              <UserPlus className="w-6 h-6" />
              <span>Cadastrar Paciente</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto p-4 flex flex-col items-center gap-2"
              onClick={onScheduleAppointment}
            >
              <CalendarPlus className="w-6 h-6" />
              <span>Agendar Consulta</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto p-4 flex flex-col items-center gap-2"
              onClick={onRegisterHealthUnit}
            >
              <MapPin className="w-6 h-6" />
              <span>Cadastrar Unidade</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto p-4 flex flex-col items-center gap-2"
              onClick={onViewPatients}
            >
              <Users className="w-6 h-6" />
              <span>Ver Pacientes</span>
            </Button>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Today's Appointments */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-sky-400" />
                Consultas de Hoje
              </CardTitle>
              <CardDescription>
                Agenda do dia atual
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {todayAppointments.slice(0, 5).map((appointment) => (
                <div key={appointment.id} className="flex items-center justify-between p-3 bg-accent/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="text-center">
                      <div className="font-medium">{appointment.time}</div>
                    </div>
                    <div>
                      <div className="font-medium">{appointment.patientName}</div>
                      <div className="text-sm text-muted-foreground">
                        {appointment.doctor} • {appointment.type}
                      </div>
                    </div>
                  </div>
                  <Badge className={getStatusColor(appointment.status)} variant="secondary">
                    {getStatusIcon(appointment.status)}
                    <span className="ml-1">{getStatusText(appointment.status)}</span>
                  </Badge>
                </div>
              ))}
              <Button variant="outline" className="w-full" onClick={onViewAppointments}>
                Ver Todas as Consultas
              </Button>
            </CardContent>
          </Card>

          {/* Recent Patients */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-emerald-400" />
                Pacientes Recentes
              </CardTitle>
              <CardDescription>
                Últimos pacientes cadastrados
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentPatients.map((patient) => (
                <div key={patient.id} className="flex items-center justify-between p-3 bg-accent/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                      <Users className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div>
                      <div className="font-medium">{patient.name}</div>
                      <div className="text-sm text-muted-foreground flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <Phone className="w-3 h-3" />
                          {patient.phone}
                        </span>
                        <span>ID: {patient.id}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {patient.registrationDate}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Pending Tasks */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-amber-400" />
              Tarefas Pendentes
            </CardTitle>
            <CardDescription>
              Ações que precisam ser realizadas
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {pendingTasks.map((task) => (
              <div key={task.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                <div className="flex items-center gap-3">
                  <Badge className={getPriorityColor(task.priority)} variant="secondary">
                    {task.priority === "high" ? "Alta" : task.priority === "medium" ? "Média" : "Baixa"}
                  </Badge>
                  <span className="text-sm">{task.task}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">{task.time}</span>
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
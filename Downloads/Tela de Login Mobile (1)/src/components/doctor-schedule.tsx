import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { 
  ArrowLeft, 
  Calendar as CalendarIcon, 
  Clock,
  User,
  Plus,
  ChevronLeft,
  ChevronRight,
  Filter,
  Stethoscope,
  AlertCircle
} from "lucide-react";

interface DoctorScheduleProps {
  onBack: () => void;
  onStartConsultation: (patientId: string, patientName: string, appointmentTime: string, appointmentType: string) => void;
}

export function DoctorSchedule({ onBack, onStartConsultation }: DoctorScheduleProps) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState("day"); // day, week, month
  const [statusFilter, setStatusFilter] = useState("all");

  // Mock data - em uma aplicação real, viria da API
  const appointments = [
    {
      id: 1,
      patientId: "P001",
      patientName: "Maria Silva",
      patientAge: 65,
      date: "2024-09-18",
      time: "08:30",
      duration: 30,
      type: "Consulta de Rotina",
      specialty: "Cardiologia",
      status: "confirmada",
      notes: "Retorno cardiologia - hipertensão",
      priority: "normal"
    },
    {
      id: 2,
      patientId: "P002",
      patientName: "João Santos",
      patientAge: 42,
      date: "2024-09-18",
      time: "09:15",
      duration: 45,
      type: "Primeira Consulta",
      specialty: "Cardiologia",
      status: "confirmada",
      notes: "Avaliação inicial - diabetes",
      priority: "normal"
    },
    {
      id: 3,
      patientId: "P003", 
      patientName: "Ana Costa",
      patientAge: 38,
      date: "2024-09-18",
      time: "10:00",
      duration: 30,
      type: "Retorno",
      specialty: "Cardiologia", 
      status: "em_andamento",
      notes: "Resultado de exames - enxaqueca",
      priority: "alta"
    },
    {
      id: 4,
      patientId: "P004",
      patientName: "Pedro Oliveira", 
      patientAge: 55,
      date: "2024-09-18",
      time: "10:45",
      duration: 30,
      type: "Consulta de Rotina",
      specialty: "Cardiologia",
      status: "aguardando",
      notes: "Hipertensão - controle mensal",
      priority: "normal"
    },
    {
      id: 5,
      patientId: "P005",
      patientName: "Lucia Ferreira",
      patientAge: 48,
      date: "2024-09-18",
      time: "14:30",
      duration: 30,
      type: "Retorno",
      specialty: "Cardiologia",
      status: "aguardando", 
      notes: "Diabetes - acompanhamento",
      priority: "normal"
    },
    {
      id: 6,
      patientId: "P006",
      patientName: "Roberto Lima",
      patientAge: 70,
      date: "2024-09-18",
      time: "15:15",
      duration: 45,
      type: "Consulta Especializada",
      specialty: "Cardiologia",
      status: "reagendada",
      notes: "Paciente solicitou reagendamento",
      priority: "alta"
    },
    {
      id: 7,
      patientId: "P007",
      patientName: "Carla Mendes",
      patientAge: 35,
      date: "2024-09-18", 
      time: "16:00",
      duration: 30,
      type: "Consulta de Rotina",
      specialty: "Cardiologia",
      status: "concluida",
      notes: "Consulta finalizada - ansiedade controlada",
      priority: "normal"
    }
  ];

  const todayAppointments = appointments.filter(apt => 
    apt.date === selectedDate.toISOString().split('T')[0]
  );

  const filteredAppointments = todayAppointments.filter(apt => 
    statusFilter === "all" || apt.status === statusFilter
  );

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
      case "reagendada":
        return "bg-violet-100 text-violet-800";
      case "cancelada":
        return "bg-red-100 text-red-800";
      default:
        return "bg-slate-100 text-slate-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "confirmada":
        return "Confirmada";
      case "em_andamento":
        return "Em Andamento";
      case "aguardando":
        return "Aguardando";
      case "concluida":
        return "Concluída";
      case "reagendada":
        return "Reagendada";
      case "cancelada":
        return "Cancelada";
      default:
        return status;
    }
  };

  const getPriorityIcon = (priority: string) => {
    if (priority === "alta") {
      return <AlertCircle className="w-4 h-4 text-red-500" />;
    }
    return null;
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('pt-BR', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const changeDate = (days: number) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + days);
    setSelectedDate(newDate);
  };

  const statsForToday = {
    total: todayAppointments.length,
    confirmed: todayAppointments.filter(apt => apt.status === "confirmada").length,
    inProgress: todayAppointments.filter(apt => apt.status === "em_andamento").length,
    completed: todayAppointments.filter(apt => apt.status === "concluida").length,
    waiting: todayAppointments.filter(apt => apt.status === "aguardando").length
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border p-4">
        <div className="flex items-center gap-3 max-w-6xl mx-auto">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <CalendarIcon className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg">Agenda Médica</h1>
              <p className="text-sm text-muted-foreground">{formatDate(selectedDate)}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 max-w-6xl mx-auto space-y-6">
        {/* Controles de Data e Filtros */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-3">
                <Button variant="outline" size="sm" onClick={() => changeDate(-1)}>
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <div className="text-center min-w-[200px]">
                  <p className="font-medium">{formatDate(selectedDate)}</p>
                </div>
                <Button variant="outline" size="sm" onClick={() => changeDate(1)}>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="flex items-center gap-3">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[140px]">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos Status</SelectItem>
                    <SelectItem value="confirmada">Confirmada</SelectItem>
                    <SelectItem value="em_andamento">Em Andamento</SelectItem>
                    <SelectItem value="aguardando">Aguardando</SelectItem>
                    <SelectItem value="concluida">Concluída</SelectItem>
                  </SelectContent>
                </Select>
                
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Nova Consulta
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Estatísticas do Dia */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{statsForToday.total}</div>
              <div className="text-sm text-muted-foreground">Total</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-emerald-600">{statsForToday.confirmed}</div>
              <div className="text-sm text-muted-foreground">Confirmadas</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-sky-600">{statsForToday.inProgress}</div>
              <div className="text-sm text-muted-foreground">Em Andamento</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-amber-600">{statsForToday.waiting}</div>
              <div className="text-sm text-muted-foreground">Aguardando</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-slate-600">{statsForToday.completed}</div>
              <div className="text-sm text-muted-foreground">Concluídas</div>
            </CardContent>
          </Card>
        </div>

        {/* Lista de Consultas */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-emerald-400" />
              Consultas do Dia
            </CardTitle>
            <CardDescription>
              {filteredAppointments.length} consulta(s) {statusFilter !== "all" && `com status: ${getStatusText(statusFilter)}`}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {filteredAppointments.length === 0 ? (
              <div className="text-center py-8">
                <CalendarIcon className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-medium mb-2">Nenhuma consulta encontrada</h3>
                <p className="text-muted-foreground">
                  Não há consultas para os filtros selecionados.
                </p>
              </div>
            ) : (
              filteredAppointments
                .sort((a, b) => a.time.localeCompare(b.time))
                .map((appointment, index) => (
                  <div key={appointment.id}>
                    <div className="flex items-start gap-4">
                      <div className="text-center min-w-[60px]">
                        <div className="font-medium">{appointment.time}</div>
                        <div className="text-xs text-muted-foreground">{appointment.duration}min</div>
                      </div>
                      
                      <Avatar className="w-12 h-12">
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {getInitials(appointment.patientName)}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1 space-y-2">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-medium">{appointment.patientName}</h4>
                              {getPriorityIcon(appointment.priority)}
                            </div>
                            <p className="text-sm text-muted-foreground">
                              ID: {appointment.patientId} • {appointment.patientAge} anos • {appointment.type}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className={getStatusColor(appointment.status)} variant="secondary">
                              {getStatusText(appointment.status)}
                            </Badge>
                          </div>
                        </div>
                        
                        <p className="text-sm text-muted-foreground">{appointment.notes}</p>
                        
                        <div className="flex gap-2">
                          {appointment.status === "confirmada" && (
                            <Button 
                              size="sm" 
                              onClick={() => onStartConsultation(
                                appointment.patientId, 
                                appointment.patientName,
                                appointment.time,
                                appointment.type
                              )}
                            >
                              <Stethoscope className="w-3 h-3 mr-1" />
                              Iniciar Consulta
                            </Button>
                          )}
                          {appointment.status === "aguardando" && (
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => onStartConsultation(
                                appointment.patientId, 
                                appointment.patientName,
                                appointment.time,
                                appointment.type
                              )}
                            >
                              <Stethoscope className="w-3 h-3 mr-1" />
                              Atender
                            </Button>
                          )}
                          <Button variant="outline" size="sm">
                            <User className="w-3 h-3 mr-1" />
                            Prontuário
                          </Button>
                          <Button variant="outline" size="sm">
                            <CalendarIcon className="w-3 h-3 mr-1" />
                            Reagendar
                          </Button>
                        </div>
                      </div>
                    </div>
                    {index < filteredAppointments.length - 1 && (
                      <div className="border-l-2 border-muted ml-[88px] h-4 my-2" />
                    )}
                  </div>
                ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
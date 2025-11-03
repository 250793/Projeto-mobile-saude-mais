import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Separator } from "./ui/separator";
import { ConfirmationDialog } from "./confirmation-dialog";
import { NotificationFab } from "./notification-fab";
import { ResponsiveContainer, ResponsiveGrid } from "./ui/responsive-grid";
import { ResponsiveText, ResponsiveTitle } from "./ui/responsive-text";
import { ResponsiveButton } from "./ui/responsive-button";
import { useBreakpoint } from "./ui/use-breakpoint";
import { 
  Calendar, 
  Clock, 
  FileText, 
  Bell, 
  Plus, 
  Heart, 
  Stethoscope,
  MapPin,
  User,
  LogOut
} from "lucide-react";

interface PatientDashboardProps {
  patientName: string;
  onLogout: () => void;
  onNavigateToBooking: () => void;
  onNavigateToRecords: () => void;
  onNavigateToNotifications: () => void;
  appointments: any[];
  onCancelAppointment: (appointmentId: number) => void;
}

export function PatientDashboard({ patientName, onLogout, onNavigateToBooking, onNavigateToRecords, onNavigateToNotifications, appointments, onCancelAppointment }: PatientDashboardProps) {
  const [showCancelConfirmation, setShowCancelConfirmation] = useState(false);
  const [appointmentToCancel, setAppointmentToCancel] = useState<any>(null);
  const { isMobile, isTablet } = useBreakpoint();
  
  const upcomingAppointments = appointments;

  const prescriptions = [
    {
      id: 1,
      medication: "Losartana 50mg",
      dosage: "1 comprimido pela manhã",
      doctor: "Dr. Ana Silva",
      date: "20 Set",
      expires: "20 Out"
    },
    {
      id: 2,
      medication: "Metformina 850mg",
      dosage: "1 comprimido após almoço",
      doctor: "Dr. João Santos", 
      date: "15 Set",
      expires: "15 Out"
    }
  ];

  const notifications = [
    {
      id: 1,
      title: "Consulta confirmada",
      message: "Sua consulta com Dr. Ana Silva foi confirmada para amanhã às 14:30",
      time: "2h atrás",
      type: "appointment"
    },
    {
      id: 2,
      title: "Nova receita disponível",
      message: "Dr. João Santos enviou uma nova receita médica",
      time: "1 dia atrás",
      type: "prescription"
    },
    {
      id: 3,
      title: "Lembrete de medicação",
      message: "Não esqueça de tomar Losartana às 08:00",
      time: "3 dias atrás",
      type: "reminder"
    }
  ];

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "appointment":
        return <Calendar className="w-4 h-4 text-sky-400" />;
      case "prescription":
        return <FileText className="w-4 h-4 text-emerald-400" />;
      case "reminder":
        return <Bell className="w-4 h-4 text-amber-400" />;
      default:
        return <Bell className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 max-w-6xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary rounded-full flex items-center justify-center">
              <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-primary-foreground" />
            </div>
            <div>
              <ResponsiveTitle level={2} className="text-lg sm:text-xl md:text-2xl">
                Saude Mais
              </ResponsiveTitle>
              <ResponsiveText 
                size={{ mobile: 'sm', tablet: 'base' }}
                color="muted"
              >
                Olá, {patientName}
              </ResponsiveText>
            </div>
          </div>
          <ResponsiveButton 
            variant="ghost" 
            size={{ mobile: 'sm', tablet: 'default' }}
            onClick={onLogout} 
            className="self-end sm:self-auto"
          >
            <LogOut className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Sair</span>
          </ResponsiveButton>
        </div>
      </div>

      <ResponsiveContainer 
        maxWidth="xl" 
        padding={{ mobile: 4, tablet: 6, desktop: 8 }}
      >
        {/* Quick Actions */}
        <Card className="mb-6">
          <CardHeader className="pb-3 p-4 sm:p-6">
            <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
              <Plus className="w-5 h-5 text-primary" />
              Ações Rápidas
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0">
            <ResponsiveGrid 
              cols={{ mobile: 1, tablet: 2, desktop: 2 }}
              gap={{ mobile: 3, tablet: 4 }}
            >
              <ResponsiveButton 
                className="h-auto p-4 sm:p-6 flex flex-col items-center gap-2 text-sm sm:text-base min-h-[80px] sm:min-h-[100px]"
                onClick={onNavigateToBooking}
              >
                <Calendar className="w-6 h-6 sm:w-8 sm:h-8" />
                <span>Agendar Consulta</span>
              </ResponsiveButton>
              <ResponsiveButton 
                variant="outline" 
                className="h-auto p-4 sm:p-6 flex flex-col items-center gap-2 text-sm sm:text-base min-h-[80px] sm:min-h-[100px]" 
                onClick={onNavigateToRecords}
              >
                <FileText className="w-6 h-6 sm:w-8 sm:h-8" />
                <span>Ver Prontuário</span>
              </ResponsiveButton>
            </ResponsiveGrid>
          </CardContent>
        </Card>

        {/* Grid responsivo para próximas seções */}
        <ResponsiveGrid 
          cols={{ mobile: 1, tablet: 1, desktop: 2 }}
          gap={{ mobile: 6, tablet: 6, desktop: 6 }}
        >
          {/* Próximas Consultas */}
          <Card className={isMobile ? "mb-6" : isTablet ? "col-span-1 mb-6" : "col-span-2"}>
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                <Calendar className="w-5 h-5 text-sky-400" />
                Próximas Consultas
              </CardTitle>
              <ResponsiveText 
                size={{ mobile: 'sm', tablet: 'base' }}
                color="muted"
              >
                Suas consultas agendadas
              </ResponsiveText>
            </CardHeader>
            <CardContent className="space-y-4 p-4 sm:p-6 pt-0">
              {upcomingAppointments.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Calendar className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 opacity-50" />
                  <ResponsiveText 
                    size={{ mobile: 'sm', tablet: 'base' }}
                    color="muted"
                    align={{ mobile: 'center' }}
                  >
                    Nenhuma consulta agendada
                  </ResponsiveText>
                  <ResponsiveButton 
                    variant="outline" 
                    className="mt-3"
                    width={{ mobile: 'full', tablet: 'auto' }}
                    onClick={onNavigateToBooking}
                  >
                    Agendar primeira consulta
                  </ResponsiveButton>
                </div>
              ) : (
                upcomingAppointments.map((appointment, index) => (
                  <div key={appointment.id}>
                    <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
                      <Avatar className="w-12 h-12 sm:w-14 sm:h-14 flex-shrink-0">
                        <AvatarFallback className="bg-sky-100 text-sky-600">
                          <Stethoscope className="w-5 h-5 sm:w-6 sm:h-6" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-2 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <ResponsiveText 
                            size={{ mobile: 'sm', tablet: 'base' }}
                            weight="medium"
                          >
                            {appointment.doctor}
                          </ResponsiveText>
                          <Badge variant="outline" className="text-xs self-start sm:self-auto">
                            {appointment.date}
                          </Badge>
                        </div>
                        <ResponsiveText 
                          size={{ mobile: 'sm', tablet: 'sm' }}
                          color="muted"
                        >
                          {appointment.specialty}
                        </ResponsiveText>
                        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3 flex-shrink-0" />
                            <span>{appointment.time}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-3 h-3 flex-shrink-0" />
                            <span className="truncate">{appointment.location}</span>
                          </div>
                        </div>
                        <div className="pt-2">
                          <ResponsiveButton 
                            variant="outline" 
                            size={{ mobile: 'sm', tablet: 'sm' }}
                            width={{ mobile: 'full', tablet: 'auto' }}
                            onClick={() => {
                              setAppointmentToCancel(appointment);
                              setShowCancelConfirmation(true);
                            }}
                            className="text-destructive hover:text-destructive"
                          >
                            Cancelar consulta
                          </ResponsiveButton>
                        </div>
                      </div>
                    </div>
                    {index < upcomingAppointments.length - 1 && <Separator className="mt-4" />}
                  </div>
                ))
              )}
            </CardContent>
          </Card>

          {/* Receitas Médicas */}
          <Card>
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                <FileText className="w-5 h-5 text-emerald-400" />
                Receitas Médicas
              </CardTitle>
              <ResponsiveText 
                size={{ mobile: 'sm', tablet: 'base' }}
                color="muted"
              >
                Seus medicamentos prescritos
              </ResponsiveText>
            </CardHeader>
            <CardContent className="space-y-4 p-4 sm:p-6 pt-0">
              {prescriptions.map((prescription, index) => (
                <div key={prescription.id}>
                  <div className="space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <ResponsiveText 
                        size={{ mobile: 'sm', tablet: 'base' }}
                        weight="medium"
                      >
                        {prescription.medication}
                      </ResponsiveText>
                      <Badge variant="secondary" className="text-xs self-start sm:self-auto">
                        Válida até {prescription.expires}
                      </Badge>
                    </div>
                    <ResponsiveText 
                      size={{ mobile: 'sm', tablet: 'sm' }}
                      color="muted"
                    >
                      {prescription.dosage}
                    </ResponsiveText>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs text-muted-foreground">
                      <span>Prescrito por {prescription.doctor}</span>
                      <span>{prescription.date}</span>
                    </div>
                  </div>
                  {index < prescriptions.length - 1 && <Separator className="mt-4" />}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Notificações */}
          <Card>
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                <Bell className="w-5 h-5 text-amber-400" />
                Notificações
              </CardTitle>
              <ResponsiveText 
                size={{ mobile: 'sm', tablet: 'base' }}
                color="muted"
              >
                Atualizações e lembretes
              </ResponsiveText>
            </CardHeader>
            <CardContent className="space-y-4 p-4 sm:p-6 pt-0">
              {notifications.map((notification, index) => (
                <div key={notification.id}>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-0.5">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1 space-y-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <ResponsiveText 
                          size={{ mobile: 'sm', tablet: 'sm' }}
                          weight="medium"
                        >
                          {notification.title}
                        </ResponsiveText>
                        <span className="text-xs text-muted-foreground self-start sm:self-auto">{notification.time}</span>
                      </div>
                      <ResponsiveText 
                        size={{ mobile: 'sm', tablet: 'sm' }}
                        color="muted"
                      >
                        {notification.message}
                      </ResponsiveText>
                    </div>
                  </div>
                  {index < notifications.length - 1 && <Separator className="mt-4" />}
                </div>
              ))}
            </CardContent>
          </Card>
        </ResponsiveGrid>
      </ResponsiveContainer>

      <ConfirmationDialog
        isOpen={showCancelConfirmation}
        onClose={() => {
          setShowCancelConfirmation(false);
          setAppointmentToCancel(null);
        }}
        onConfirm={() => {
          if (appointmentToCancel) {
            onCancelAppointment(appointmentToCancel.id);
            setShowCancelConfirmation(false);
            setAppointmentToCancel(null);
          }
        }}
        type="cancel"
        appointment={appointmentToCancel}
      />

      {/* Notification FAB */}
      <NotificationFab 
        onClick={onNavigateToNotifications}
        hasUnreadNotifications={true}
      />
    </div>
  );
}
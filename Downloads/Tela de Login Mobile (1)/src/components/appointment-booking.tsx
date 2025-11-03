import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Calendar } from "./ui/calendar";
import { Separator } from "./ui/separator";
import { ConfirmationDialog } from "./confirmation-dialog";
import { 
  ArrowLeft, 
  MapPin, 
  Calendar as CalendarIcon, 
  Clock, 
  Stethoscope,
  Heart,
  CheckCircle,
  X
} from "lucide-react";

interface AppointmentBookingProps {
  patientName: string;
  onBack: () => void;
  onBookingComplete: (appointment: any) => void;
}

export function AppointmentBooking({ patientName, onBack, onBookingComplete }: AppointmentBookingProps) {
  const [step, setStep] = useState(1); // 1: posto, 2: especialidade, 3: data, 4: horário, 5: confirmação
  const [selectedUnit, setSelectedUnit] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [appointmentToConfirm, setAppointmentToConfirm] = useState<any>(null);

  // Mock data
  const healthUnits = [
    {
      id: "1",
      name: "UBS Central",
      address: "Rua das Flores, 123 - Centro",
      distance: "0.5 km"
    },
    {
      id: "2", 
      name: "UBS Jardim Esperança",
      address: "Av. da Paz, 456 - Jardim Esperança",
      distance: "1.2 km"
    },
    {
      id: "3",
      name: "UBS Vila Nova",
      address: "Rua do Progresso, 789 - Vila Nova", 
      distance: "2.1 km"
    }
  ];

  const specialties = [
    { id: "clinico", name: "Clínico Geral", icon: "🩺" },
    { id: "cardiologia", name: "Cardiologia", icon: "❤️" },
    { id: "pediatria", name: "Pediatria", icon: "👶" },
    { id: "ginecologia", name: "Ginecologia", icon: "👩‍⚕️" },
    { id: "oftalmologia", name: "Oftalmologia", icon: "👁️" }
  ];

  const timeSlots = [
    { time: "08:00", doctor: "Dr. Ana Silva", available: true },
    { time: "08:30", doctor: "Dr. João Santos", available: true },
    { time: "09:00", doctor: "Dr. Ana Silva", available: false },
    { time: "09:30", doctor: "Dr. Maria Costa", available: true },
    { time: "10:00", doctor: "Dr. João Santos", available: true },
    { time: "10:30", doctor: "Dr. Ana Silva", available: true },
    { time: "14:00", doctor: "Dr. Maria Costa", available: true },
    { time: "14:30", doctor: "Dr. João Santos", available: false },
    { time: "15:00", doctor: "Dr. Ana Silva", available: true },
    { time: "15:30", doctor: "Dr. Maria Costa", available: true }
  ];

  const handleUnitSelect = (unitId: string) => {
    setSelectedUnit(unitId);
    setStep(2);
  };

  const handleSpecialtySelect = (specialtyId: string) => {
    setSelectedSpecialty(specialtyId);
    setStep(3);
  };

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    if (date) {
      setStep(4);
    }
  };

  const handleTimeSelect = (time: string, doctor: string) => {
    setSelectedTime(time);
    setSelectedDoctor(doctor);
    setStep(5);
  };

  const handleConfirmBooking = () => {
    const selectedUnitData = healthUnits.find(u => u.id === selectedUnit);
    const selectedSpecialtyData = specialties.find(s => s.id === selectedSpecialty);
    
    const appointment = {
      id: Date.now(),
      unit: selectedUnitData?.name,
      specialty: selectedSpecialtyData?.name,
      doctor: selectedDoctor,
      date: selectedDate?.toLocaleDateString('pt-BR'),
      time: selectedTime,
      location: selectedUnitData?.address
    };

    setAppointmentToConfirm(appointment);
    setShowConfirmation(true);
  };

  const handleFinalConfirmation = () => {
    if (appointmentToConfirm) {
      onBookingComplete(appointmentToConfirm);
      setShowConfirmation(false);
    }
  };

  const availableSlots = timeSlots.filter(slot => slot.available);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border p-4">
        <div className="flex items-center gap-3 max-w-4xl mx-auto">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <Heart className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg">Agendar Consulta</h1>
              <p className="text-sm text-muted-foreground">Passo {step} de 5</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 max-w-4xl mx-auto">
        {/* Step 1: Escolher Posto */}
        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-emerald-400" />
                Escolha o Posto de Saúde
              </CardTitle>
              <CardDescription>
                Selecione o posto mais próximo de você
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {healthUnits.map((unit) => (
                <Button
                  key={unit.id}
                  variant="outline"
                  className="w-full h-auto p-4 flex items-start gap-3 text-left"
                  onClick={() => handleUnitSelect(unit.id)}
                >
                  <MapPin className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium">{unit.name}</h4>
                      <Badge variant="secondary" className="text-xs">
                        {unit.distance}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{unit.address}</p>
                  </div>
                </Button>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Step 2: Escolher Especialidade */}
        {step === 2 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Stethoscope className="w-5 h-5 text-sky-400" />
                Escolha a Especialidade
              </CardTitle>
              <CardDescription>
                Que tipo de consulta você precisa?
              </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {specialties.map((specialty) => (
                <Button
                  key={specialty.id}
                  variant="outline"
                  className="h-auto p-4 flex items-center gap-3"
                  onClick={() => handleSpecialtySelect(specialty.id)}
                >
                  <span className="text-xl">{specialty.icon}</span>
                  <span>{specialty.name}</span>
                </Button>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Step 3: Escolher Data */}
        {step === 3 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="w-5 h-5 text-amber-400" />
                Escolha a Data
              </CardTitle>
              <CardDescription>
                Selecione o dia da sua consulta
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={handleDateSelect}
                disabled={(date) => 
                  date < new Date() || 
                  date.getDay() === 0 || 
                  date.getDay() === 6
                }
                className="rounded-md border"
              />
            </CardContent>
          </Card>
        )}

        {/* Step 4: Escolher Horário */}
        {step === 4 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-rose-400" />
                Escolha o Horário
              </CardTitle>
              <CardDescription>
                Horários disponíveis para {selectedDate?.toLocaleDateString('pt-BR')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-3">Manhã</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {availableSlots
                      .filter(slot => parseInt(slot.time.split(':')[0]) < 12)
                      .map((slot) => (
                        <Button
                          key={slot.time}
                          variant="outline"
                          className="h-auto p-3 flex flex-col items-center"
                          onClick={() => handleTimeSelect(slot.time, slot.doctor)}
                        >
                          <span className="font-medium">{slot.time}</span>
                          <span className="text-xs text-muted-foreground">{slot.doctor}</span>
                        </Button>
                      ))}
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h4 className="font-medium mb-3">Tarde</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {availableSlots
                      .filter(slot => parseInt(slot.time.split(':')[0]) >= 12)
                      .map((slot) => (
                        <Button
                          key={slot.time}
                          variant="outline"
                          className="h-auto p-3 flex flex-col items-center"
                          onClick={() => handleTimeSelect(slot.time, slot.doctor)}
                        >
                          <span className="font-medium">{slot.time}</span>
                          <span className="text-xs text-muted-foreground">{slot.doctor}</span>
                        </Button>
                      ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 5: Confirmação */}
        {step === 5 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-400" />
                Confirmar Agendamento
              </CardTitle>
              <CardDescription>
                Verifique os dados da sua consulta
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-accent/50 p-4 rounded-lg space-y-3">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-emerald-400" />
                  <span className="font-medium">
                    {healthUnits.find(u => u.id === selectedUnit)?.name}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Stethoscope className="w-4 h-4 text-sky-400" />
                  <span>
                    {specialties.find(s => s.id === selectedSpecialty)?.name}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <CalendarIcon className="w-4 h-4 text-amber-400" />
                  <span>{selectedDate?.toLocaleDateString('pt-BR')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-rose-400" />
                  <span>{selectedTime} - {selectedDoctor}</span>
                </div>
              </div>
              
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                  Voltar ao Início
                </Button>
                <Button onClick={handleConfirmBooking} className="flex-1">
                  Confirmar Agendamento
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {showConfirmation && appointmentToConfirm && (
        <ConfirmationDialog
          isOpen={showConfirmation}
          onClose={() => setShowConfirmation(false)}
          onConfirm={handleFinalConfirmation}
          type="booking"
          appointment={appointmentToConfirm}
        />
      )}
    </div>
  );
}
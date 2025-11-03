import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { Calendar, Clock, MapPin, Stethoscope, X } from "lucide-react";

interface ConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  type: "booking" | "cancel";
  appointment?: any;
}

export function ConfirmationDialog({ 
  isOpen, 
  onClose, 
  onConfirm, 
  type, 
  appointment 
}: ConfirmationDialogProps) {
  
  if (type === "booking" && appointment) {
    return (
      <AlertDialog open={isOpen} onOpenChange={onClose}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-emerald-400" />
              Confirmar Agendamento
            </AlertDialogTitle>
            <AlertDialogDescription>
              Verifique se todas as informações estão corretas antes de confirmar:
            </AlertDialogDescription>
          </AlertDialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="bg-accent/50 p-4 rounded-lg space-y-3">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-400" />
                <span className="font-medium">{appointment.unit}</span>
              </div>
              <div className="flex items-center gap-2">
                <Stethoscope className="w-4 h-4 text-sky-400" />
                <span>{appointment.specialty}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-amber-400" />
                <span>{appointment.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-rose-400" />
                <span>{appointment.time} - {appointment.doctor}</span>
              </div>
            </div>
          </div>

          <AlertDialogFooter>
            <AlertDialogCancel onClick={onClose}>
              Revisar
            </AlertDialogCancel>
            <AlertDialogAction onClick={onConfirm}>
              Confirmar Agendamento
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }

  if (type === "cancel" && appointment) {
    return (
      <AlertDialog open={isOpen} onOpenChange={onClose}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <X className="w-5 h-5 text-destructive" />
              Cancelar Consulta
            </AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja cancelar esta consulta?
            </AlertDialogDescription>
          </AlertDialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="bg-destructive/10 p-4 rounded-lg space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-medium">{appointment.doctor}</span>
                <span className="text-sm text-muted-foreground">{appointment.date}</span>
              </div>
              <p className="text-sm text-muted-foreground">{appointment.specialty}</p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {appointment.time}
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {appointment.location}
                </div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Esta ação não pode ser desfeita. Você poderá reagendar uma nova consulta quando desejar.
            </p>
          </div>

          <AlertDialogFooter>
            <AlertDialogCancel onClick={onClose}>
              Manter Consulta
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={onConfirm}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Cancelar Consulta
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }

  return null;
}
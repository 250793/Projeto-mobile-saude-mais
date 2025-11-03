import React, { useState } from 'react';
import { DevicePreview } from './ui/device-preview';
import { LoginScreen } from './login-screen';
import { PatientDashboard } from './patient-dashboard';
import { AppointmentBooking } from './appointment-booking';
import { NotificationSettings } from './notification-settings';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { ResponsiveGrid } from './ui/responsive-grid';
import { ArrowLeft, ArrowRight } from 'lucide-react';

type Screen = 
  | 'login' 
  | 'patient-dashboard' 
  | 'appointment-booking' 
  | 'notification-settings';

const screens: Array<{ id: Screen; name: string; description: string }> = [
  { 
    id: 'login', 
    name: 'Tela de Login', 
    description: 'Login com CPF/Email e seleção de tipo de usuário' 
  },
  { 
    id: 'patient-dashboard', 
    name: 'Dashboard do Paciente', 
    description: 'Visão geral com consultas e ações rápidas' 
  },
  { 
    id: 'appointment-booking', 
    name: 'Agendamento de Consulta', 
    description: 'Formulário para agendar novas consultas' 
  },
  { 
    id: 'notification-settings', 
    name: 'Configurações de Notificação', 
    description: 'Gerenciamento de notificações via email, SMS e WhatsApp' 
  }
];

export function ResponsiveShowcase() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');
  const [isDemo, setIsDemo] = useState(false);

  // Mock data para demonstração
  const mockAppointments = [
    {
      id: 1,
      doctor: "Dr. Ana Silva",
      specialty: "Cardiologia",
      date: "25 Set",
      time: "14:30",
      location: "Sala 201"
    },
    {
      id: 2,
      doctor: "Dr. João Santos",
      specialty: "Clínico Geral",
      date: "28 Set",
      time: "09:00",
      location: "Sala 105"
    }
  ];

  const mockHandlers = {
    onLogin: (type: string, name: string) => {
      console.log('Login demo:', type, name);
      setCurrentScreen('patient-dashboard');
    },
    onLogout: () => setCurrentScreen('login'),
    onNavigateToBooking: () => setCurrentScreen('appointment-booking'),
    onNavigateToRecords: () => console.log('Navigate to records'),
    onNavigateToNotifications: () => setCurrentScreen('notification-settings'),
    onBack: () => setCurrentScreen('patient-dashboard'),
    onBookingComplete: () => setCurrentScreen('patient-dashboard'),
    onCancelAppointment: () => console.log('Cancel appointment'),
    onSave: () => setCurrentScreen('patient-dashboard')
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'login':
        return <LoginScreen onLogin={mockHandlers.onLogin} />;
      
      case 'patient-dashboard':
        return (
          <PatientDashboard
            patientName="Maria Silva"
            onLogout={mockHandlers.onLogout}
            onNavigateToBooking={mockHandlers.onNavigateToBooking}
            onNavigateToRecords={mockHandlers.onNavigateToRecords}
            onNavigateToNotifications={mockHandlers.onNavigateToNotifications}
            appointments={mockAppointments}
            onCancelAppointment={mockHandlers.onCancelAppointment}
          />
        );
      
      case 'appointment-booking':
        return (
          <AppointmentBooking
            patientName="Maria Silva"
            onBack={mockHandlers.onBack}
            onBookingComplete={mockHandlers.onBookingComplete}
          />
        );
      
      case 'notification-settings':
        return (
          <NotificationSettings
            onBack={mockHandlers.onBack}
            onSave={mockHandlers.onSave}
          />
        );
      
      default:
        return <div>Tela não encontrada</div>;
    }
  };

  const currentScreenIndex = screens.findIndex(s => s.id === currentScreen);
  const currentScreenInfo = screens[currentScreenIndex];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b p-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Saúde Mais - Preview Responsivo
              </h1>
              <p className="text-gray-600">
                Visualize como as telas se adaptam a diferentes dispositivos
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsDemo(!isDemo)}
              >
                {isDemo ? 'Sair do Demo' : 'Modo Demo'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {!isDemo ? (
        /* Screen Selection Grid */
        <div className="p-6 max-w-7xl mx-auto">
          <ResponsiveGrid 
            cols={{ mobile: 1, tablet: 2, desktop: 2, wide: 4 }}
            gap={{ mobile: 4, tablet: 6, desktop: 6 }}
          >
            {screens.map((screen) => (
              <Card 
                key={screen.id}
                className={`cursor-pointer transition-all hover:shadow-lg ${
                  currentScreen === screen.id ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => setCurrentScreen(screen.id)}
              >
                <CardHeader>
                  <CardTitle className="text-lg">{screen.name}</CardTitle>
                  <CardDescription>{screen.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    className="w-full"
                    variant={currentScreen === screen.id ? 'default' : 'outline'}
                  >
                    {currentScreen === screen.id ? 'Visualizando' : 'Visualizar'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </ResponsiveGrid>

          {/* Current Screen Info */}
          <Card className="mt-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{currentScreenInfo.name}</CardTitle>
                  <CardDescription>{currentScreenInfo.description}</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const prevIndex = currentScreenIndex > 0 ? currentScreenIndex - 1 : screens.length - 1;
                      setCurrentScreen(screens[prevIndex].id);
                    }}
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </Button>
                  <span className="text-sm text-gray-500">
                    {currentScreenIndex + 1} de {screens.length}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const nextIndex = currentScreenIndex < screens.length - 1 ? currentScreenIndex + 1 : 0;
                      setCurrentScreen(screens[nextIndex].id);
                    }}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
          </Card>
        </div>
      ) : (
        /* Full Demo Mode */
        <div className="p-6 max-w-7xl mx-auto">
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{currentScreenInfo.name}</CardTitle>
                  <CardDescription>{currentScreenInfo.description}</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const prevIndex = currentScreenIndex > 0 ? currentScreenIndex - 1 : screens.length - 1;
                      setCurrentScreen(screens[prevIndex].id);
                    }}
                  >
                    <ArrowLeft className="w-4 h-4 mr-1" />
                    Anterior
                  </Button>
                  <span className="text-sm text-gray-500">
                    {currentScreenIndex + 1} de {screens.length}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const nextIndex = currentScreenIndex < screens.length - 1 ? currentScreenIndex + 1 : 0;
                      setCurrentScreen(screens[nextIndex].id);
                    }}
                  >
                    Próximo
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </div>
            </CardHeader>
          </Card>
        </div>
      )}

      {/* Device Preview */}
      <DevicePreview>
        {renderScreen()}
      </DevicePreview>
    </div>
  );
}
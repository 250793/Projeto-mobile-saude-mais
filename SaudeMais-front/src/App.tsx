import { useState, useEffect } from "react";
import { LoginScreen } from "./components/login-screen";
import { PatientDashboard } from "./components/patient-dashboard";
import { AppointmentBooking } from "./components/appointment-booking";
import { MedicalRecords } from "./components/medical-records";
import { DoctorDashboard } from "./components/doctor-dashboard";
import { MedicalRecordEditor } from "./components/medical-record-editor";
import { ConsultationInterface } from "./components/consultation-interface";
import { NewPrescription } from "./components/new-prescription";
import { NewExamRequest } from "./components/new-exam-request";
import { PatientsList } from "./components/patients-list";
import { DoctorSchedule } from "./components/doctor-schedule";
import { NewPatientForm } from "./components/new-patient-form";
import { ManagerDashboard } from "./components/manager-dashboard";
import { DoctorRegistration } from "./components/doctor-registration";
import { MedicationInventory } from "./components/medication-inventory";
import { BatchManagement } from "./components/batch-management";
import { AccessLevelManagement } from "./components/access-level-management";
import { ReportsCenter } from "./components/reports-center";
import { VaccinationCampaigns } from "./components/vaccination-campaigns";
import { ReceptionistDashboard } from "./components/receptionist-dashboard";
import { HealthUnitRegistration } from "./components/health-unit-registration";
import { InventoryDashboard } from "./components/inventory-dashboard";
import { MedicationRegistration } from "./components/medication-registration";
import { PharmacyDashboard } from "./components/pharmacy-dashboard";
import { MedicationDispensing } from "./components/medication-dispensing";
import { NotificationSettings } from "./components/notification-settings";
import { ResponsiveDemo } from "./components/responsive-demo";
import { getCurrentUser, logout as authLogout, onAuthStateChange, AuthUser } from "./lib/auth";
import { Loader2 } from "lucide-react";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState("");
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [currentView, setCurrentView] = useState("dashboard"); // dashboard, booking, records, patient-records, consultation, new-prescription, new-exam, patients-list, schedule, new-patient, register-doctor, manage-inventory, manage-batches, manage-access, view-reports, manage-campaigns, register-health-unit, add-medication, medication-registration, dispense-medication, track-prescription, notification-settings
  const [selectedPatient, setSelectedPatient] = useState({ id: "", name: "" });
  const [consultationData, setConsultationData] = useState({
    patientId: "",
    patientName: "",
    time: "",
    type: "",
  });
  const [showResponsiveDemo, setShowResponsiveDemo] = useState(false);
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      doctor: "Dr. Ana Silva",
      specialty: "Cardiologia",
      date: "25 Set",
      time: "14:30",
      location: "Sala 201",
    },
    {
      id: 2,
      doctor: "Dr. João Santos",
      specialty: "Clínico Geral",
      date: "28 Set",
      time: "09:00",
      location: "Sala 105",
    },
  ]);

  // Verifica se há uma sessão ativa ao carregar a aplicação
  useEffect(() => {
    const checkUser = async () => {
      try {
        const { user, error } = await getCurrentUser();
        if (user && !error) {
          setUserType(user.userType);
          setUserName(user.name || user.email || "");
          setUserId(user.id);
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error("Erro ao verificar usuário:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkUser();

    // Escuta mudanças no estado de autenticação
    const { data: { subscription } } = onAuthStateChange((user: AuthUser | null) => {
      if (user) {
        setUserType(user.userType);
        setUserName(user.name || user.email || "");
        setUserId(user.id);
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
        setUserType("");
        setUserName("");
        setUserId("");
      }
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleLogin = (type: string, name: string, id: string) => {
    setUserType(type);
    setUserName(name);
    setUserId(id);
    setIsLoggedIn(true);
    setCurrentView("dashboard");
  };

  const handleLogout = async () => {
    await authLogout();
    setIsLoggedIn(false);
    setUserType("");
    setUserName("");
    setUserId("");
    setCurrentView("dashboard");
  };

  const handleNavigateToBooking = () => {
    setCurrentView("booking");
  };

  const handleNavigateToRecords = () => {
    setCurrentView("records");
  };

  const handleViewPatientRecords = (patientId: string, patientName: string) => {
    setSelectedPatient({ id: patientId, name: patientName });
    setCurrentView("patient-records");
  };

  const handleStartConsultation = (
    patientId: string,
    patientName: string,
    time: string,
    type: string
  ) => {
    setConsultationData({ patientId, patientName, time, type });
    setCurrentView("consultation");
  };

  const handleNewPrescription = (patientId?: string, patientName?: string) => {
    if (patientId && patientName) {
      setSelectedPatient({ id: patientId, name: patientName });
    } else {
      setSelectedPatient({ id: "", name: "" });
    }
    setCurrentView("new-prescription");
  };

  const handleNewExamRequest = (patientId?: string, patientName?: string) => {
    if (patientId && patientName) {
      setSelectedPatient({ id: patientId, name: patientName });
    } else {
      setSelectedPatient({ id: "", name: "" });
    }
    setCurrentView("new-exam");
  };

  const handleViewPatientsList = () => {
    setCurrentView("patients-list");
  };

  const handleViewSchedule = () => {
    setCurrentView("schedule");
  };

  const handleAddNewPatient = () => {
    setCurrentView("new-patient");
  };

  const handlePrescriptionSaved = (prescription: any) => {
    // Aqui você salvaria a receita no backend
    console.log("Receita salva:", prescription);
    setCurrentView("dashboard");
  };

  const handleExamRequestSaved = (examRequest: any) => {
    // Aqui você salvaria a solicitação de exame no backend
    console.log("Solicitação de exame salva:", examRequest);
    setCurrentView("dashboard");
  };

  const handlePatientSaved = (patient: any) => {
    // Aqui você salvaria o paciente no backend
    console.log("Paciente cadastrado:", patient);
    setCurrentView("dashboard");
  };

  const handleConsultationComplete = () => {
    setCurrentView("dashboard");
  };

  // Manager navigation functions
  const handleRegisterDoctor = () => {
    setCurrentView("register-doctor");
  };

  const handleManageInventory = () => {
    setCurrentView("manage-inventory");
  };

  const handleManageBatches = () => {
    setCurrentView("manage-batches");
  };

  const handleManageAccessLevels = () => {
    setCurrentView("manage-access");
  };

  const handleViewReports = () => {
    setCurrentView("view-reports");
  };

  const handleManageCampaigns = () => {
    setCurrentView("manage-campaigns");
  };

  const handleDoctorSaved = (doctor: any) => {
    console.log("Médico cadastrado:", doctor);
    setCurrentView("dashboard");
  };

  const handleAddMedication = () => {
    // Placeholder for adding medication functionality
    console.log("Add medication functionality");
  };

  // Receptionist navigation functions
  const handleRegisterPatient = () => {
    setCurrentView("new-patient");
  };

  const handleScheduleAppointment = () => {
    setCurrentView("booking");
  };

  const handleRegisterHealthUnit = () => {
    setCurrentView("register-health-unit");
  };

  const handleViewPatients = () => {
    setCurrentView("patients-list");
  };

  const handleViewAppointments = () => {
    setCurrentView("schedule");
  };

  // Inventory navigation functions
  const handleAddMedicationInventory = () => {
    setCurrentView("add-medication");
  };

  const handleManageStock = () => {
    setCurrentView("manage-inventory");
  };

  const handleAddBatch = () => {
    setCurrentView("manage-batches");
  };

  const handleViewReportsInventory = () => {
    setCurrentView("view-reports");
  };

  const handleManageNotes = () => {
    console.log("Manage notes functionality");
  };

  // Pharmacy navigation functions
  const handleDispenseMedication = () => {
    setCurrentView("dispense-medication");
  };

  const handleTrackPrescription = () => {
    setCurrentView("track-prescription");
  };

  const handleViewInventoryPharmacy = () => {
    setCurrentView("manage-inventory");
  };

  const handleViewReportsPharmacy = () => {
    setCurrentView("view-reports");
  };

  // Save handlers
  const handleHealthUnitSaved = (unit: any) => {
    console.log("Unidade de saúde cadastrada:", unit);
    setCurrentView("dashboard");
  };

  const handleMedicationSaved = (medication: any) => {
    console.log("Medicamento cadastrado:", medication);
    setCurrentView("dashboard");
  };

  const handleDispensingSaved = (dispensing: any) => {
    console.log("Dispensação realizada:", dispensing);
    setCurrentView("dashboard");
  };

  const handleBackToDashboard = () => {
    setCurrentView("dashboard");
  };

  const handleBookingComplete = (newAppointment: any) => {
    setAppointments((prev) => [...prev, newAppointment]);
    setCurrentView("dashboard");
  };

  const handleCancelAppointment = (appointmentId: number) => {
    setAppointments((prev) => prev.filter((apt) => apt.id !== appointmentId));
  };

  // Notification settings
  const handleNotificationSettings = () => {
    setCurrentView("notification-settings");
  };

  const handleNotificationSettingsSaved = (settings: any) => {
    console.log("Configurações de notificação salvas:", settings);
    setCurrentView("dashboard");
  };

  // Mostra loading enquanto verifica a autenticação
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  // Show responsive demo if enabled (for development/showcase)
  if (showResponsiveDemo) {
    return <ResponsiveDemo />;
  }

  // Dashboard e funcionalidades do paciente
  if (userType === "paciente") {
    if (currentView === "booking") {
      return (
        <AppointmentBooking
          patientName={userName}
          onBack={handleBackToDashboard}
          onBookingComplete={handleBookingComplete}
        />
      );
    }

    if (currentView === "records") {
      return (
        <MedicalRecords
          patientName={userName}
          onBack={handleBackToDashboard}
          userType={userType as "paciente" | "medico"}
        />
      );
    }

    return (
      <PatientDashboard
        patientName={userName}
        onLogout={handleLogout}
        onNavigateToBooking={handleNavigateToBooking}
        onNavigateToRecords={handleNavigateToRecords}
        onNavigateToNotifications={handleNotificationSettings}
        appointments={appointments}
        onCancelAppointment={handleCancelAppointment}
      />
    );
  }

  // Dashboard e funcionalidades do médico
  if (userType === "medico") {
    if (currentView === "patient-records") {
      return (
        <MedicalRecordEditor
          patientName={selectedPatient.name}
          patientId={selectedPatient.id}
          onBack={handleBackToDashboard}
        />
      );
    }

    if (currentView === "consultation") {
      return (
        <ConsultationInterface
          patientId={consultationData.patientId}
          patientName={consultationData.patientName}
          appointmentTime={consultationData.time}
          appointmentType={consultationData.type}
          onBack={handleBackToDashboard}
          onComplete={handleConsultationComplete}
        />
      );
    }

    if (currentView === "new-prescription") {
      return (
        <NewPrescription
          selectedPatient={selectedPatient.id ? selectedPatient : undefined}
          onBack={handleBackToDashboard}
          onSave={handlePrescriptionSaved}
        />
      );
    }

    if (currentView === "new-exam") {
      return (
        <NewExamRequest
          selectedPatient={selectedPatient.id ? selectedPatient : undefined}
          onBack={handleBackToDashboard}
          onSave={handleExamRequestSaved}
        />
      );
    }

    if (currentView === "patients-list") {
      return (
        <PatientsList
          onBack={handleBackToDashboard}
          onViewPatientRecords={handleViewPatientRecords}
          onAddNewPatient={handleAddNewPatient}
        />
      );
    }

    if (currentView === "schedule") {
      return (
        <DoctorSchedule
          onBack={handleBackToDashboard}
          onStartConsultation={handleStartConsultation}
        />
      );
    }

    if (currentView === "new-patient") {
      return (
        <NewPatientForm
          onBack={handleBackToDashboard}
          onSave={handlePatientSaved}
        />
      );
    }

    return (
      <DoctorDashboard
        doctorName={userName}
        onLogout={handleLogout}
        onViewPatientRecords={handleViewPatientRecords}
        onStartConsultation={handleStartConsultation}
        onNewPrescription={handleNewPrescription}
        onNewExamRequest={handleNewExamRequest}
        onViewPatientsList={handleViewPatientsList}
        onViewSchedule={handleViewSchedule}
        onAddNewPatient={handleAddNewPatient}
      />
    );
  }

  // Dashboard e funcionalidades do gestor
  if (userType === "gestor") {
    if (currentView === "register-doctor") {
      return (
        <DoctorRegistration
          onBack={handleBackToDashboard}
          onSave={handleDoctorSaved}
        />
      );
    }

    if (currentView === "manage-inventory") {
      return (
        <MedicationInventory
          onBack={handleBackToDashboard}
          onAddMedication={handleAddMedication}
          onManageBatches={handleManageBatches}
        />
      );
    }

    if (currentView === "manage-batches") {
      return <BatchManagement onBack={handleBackToDashboard} />;
    }

    if (currentView === "manage-access") {
      return <AccessLevelManagement onBack={handleBackToDashboard} />;
    }

    if (currentView === "view-reports") {
      return <ReportsCenter onBack={handleBackToDashboard} />;
    }

    if (currentView === "manage-campaigns") {
      return <VaccinationCampaigns onBack={handleBackToDashboard} />;
    }

    return (
      <ManagerDashboard
        managerName={userName}
        onLogout={handleLogout}
        onRegisterDoctor={handleRegisterDoctor}
        onManageInventory={handleManageInventory}
        onManageBatches={handleManageBatches}
        onManageAccessLevels={handleManageAccessLevels}
        onViewReports={handleViewReports}
        onManageCampaigns={handleManageCampaigns}
      />
    );
  }

  // Dashboard e funcionalidades do recepcionista
  if (userType === "recepcionista") {
    if (currentView === "new-patient") {
      return (
        <NewPatientForm
          onBack={handleBackToDashboard}
          onSave={handlePatientSaved}
        />
      );
    }

    if (currentView === "booking") {
      return (
        <AppointmentBooking
          patientName=""
          onBack={handleBackToDashboard}
          onBookingComplete={handleBookingComplete}
        />
      );
    }

    if (currentView === "register-health-unit") {
      return (
        <HealthUnitRegistration
          onBack={handleBackToDashboard}
          onSave={handleHealthUnitSaved}
        />
      );
    }

    if (currentView === "patients-list") {
      return (
        <PatientsList
          onBack={handleBackToDashboard}
          onViewPatientRecords={handleViewPatientRecords}
          onAddNewPatient={handleAddNewPatient}
        />
      );
    }

    if (currentView === "schedule") {
      return (
        <DoctorSchedule
          onBack={handleBackToDashboard}
          onStartConsultation={handleStartConsultation}
        />
      );
    }

    return (
      <ReceptionistDashboard
        receptionistName={userName}
        onLogout={handleLogout}
        onRegisterPatient={handleRegisterPatient}
        onScheduleAppointment={handleScheduleAppointment}
        onRegisterHealthUnit={handleRegisterHealthUnit}
        onViewPatients={handleViewPatients}
        onViewAppointments={handleViewAppointments}
      />
    );
  }

  // Dashboard e funcionalidades do usuário de estoque
  if (userType === "estoque") {
    if (currentView === "add-medication") {
      return (
        <MedicationRegistration
          onBack={handleBackToDashboard}
          onSave={handleMedicationSaved}
        />
      );
    }

    if (currentView === "manage-inventory") {
      return (
        <MedicationInventory
          onBack={handleBackToDashboard}
          onAddMedication={handleAddMedicationInventory}
          onManageBatches={handleManageBatches}
        />
      );
    }

    if (currentView === "manage-batches") {
      return <BatchManagement onBack={handleBackToDashboard} />;
    }

    if (currentView === "view-reports") {
      return <ReportsCenter onBack={handleBackToDashboard} />;
    }

    return (
      <InventoryDashboard
        inventoryUserName={userName}
        onLogout={handleLogout}
        onAddMedication={handleAddMedicationInventory}
        onManageStock={handleManageStock}
        onAddBatch={handleAddBatch}
        onViewReports={handleViewReportsInventory}
        onManageNotes={handleManageNotes}
      />
    );
  }

  // Dashboard e funcionalidades da farmácia
  if (userType === "farmacia") {
    if (currentView === "dispense-medication") {
      return (
        <MedicationDispensing
          onBack={handleBackToDashboard}
          onSave={handleDispensingSaved}
        />
      );
    }

    if (currentView === "manage-inventory") {
      return (
        <MedicationInventory
          onBack={handleBackToDashboard}
          onAddMedication={handleAddMedication}
          onManageBatches={handleManageBatches}
        />
      );
    }

    if (currentView === "view-reports") {
      return <ReportsCenter onBack={handleBackToDashboard} />;
    }

    return (
      <PharmacyDashboard
        pharmacistName={userName}
        onLogout={handleLogout}
        onDispenseMedication={handleDispenseMedication}
        onTrackPrescription={handleTrackPrescription}
        onViewInventory={handleViewInventoryPharmacy}
        onViewReports={handleViewReportsPharmacy}
      />
    );
  }

  // Notification Settings (disponível para todos os tipos de usuário)
  if (currentView === "notification-settings") {
    return (
      <NotificationSettings
        onBack={handleBackToDashboard}
        onSave={handleNotificationSettingsSaved}
      />
    );
  }

  // Placeholder para outros tipos de usuário
  return (
    <div className="min-h-screen bg-background p-4 flex items-center justify-center">
      <div className="text-center">
        <h1>Dashboard para {userType}</h1>
        <p>Em desenvolvimento...</p>
        <button
          onClick={handleLogout}
          className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

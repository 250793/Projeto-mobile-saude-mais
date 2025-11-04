import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Separator } from "./ui/separator";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { 
  ArrowLeft, 
  Clock, 
  User, 
  Heart, 
  FileText, 
  Save,
  Plus,
  Stethoscope,
  Activity,
  AlertCircle,
  CheckCircle
} from "lucide-react";

interface ConsultationInterfaceProps {
  patientName: string;
  patientId: string;
  appointmentTime: string;
  appointmentType: string;
  onBack: () => void;
  onComplete: () => void;
}

export function ConsultationInterface({ 
  patientName, 
  patientId, 
  appointmentTime, 
  appointmentType, 
  onBack, 
  onComplete 
}: ConsultationInterfaceProps) {
  const [consultationStep, setConsultationStep] = useState("start"); // start, vitals, anamnesis, physical, diagnosis, complete
  const [vitals, setVitals] = useState({
    bloodPressure: "",
    heartRate: "",
    temperature: "",
    weight: "",
    height: "",
    oxygenSaturation: ""
  });
  
  const [anamnesis, setAnamnesis] = useState({
    chiefComplaint: "",
    historyOfPresentIllness: "",
    reviewOfSystems: "",
    notes: ""
  });

  const [physicalExam, setPhysicalExam] = useState({
    generalAppearance: "",
    cardiovascular: "",
    respiratory: "",
    abdomen: "",
    neurological: "",
    other: ""
  });

  const [diagnosis, setDiagnosis] = useState({
    primaryDiagnosis: "",
    secondaryDiagnosis: "",
    plan: "",
    prescriptions: "",
    followUp: "",
    observations: ""
  });

  const patientInfo = {
    age: 65,
    gender: "Feminino",
    bloodType: "O+",
    allergies: "Penicilina",
    lastVisit: "20 Ago 2024"
  };

  const handleSaveAndNext = () => {
    switch (consultationStep) {
      case "start":
        setConsultationStep("vitals");
        break;
      case "vitals":
        setConsultationStep("anamnesis");
        break;
      case "anamnesis":
        setConsultationStep("physical");
        break;
      case "physical":
        setConsultationStep("diagnosis");
        break;
      case "diagnosis":
        setConsultationStep("complete");
        break;
      default:
        break;
    }
  };

  const handleComplete = () => {
    // Aqui salvaria todos os dados da consulta
    onComplete();
  };

  const getStepColor = (step: string) => {
    const steps = ["start", "vitals", "anamnesis", "physical", "diagnosis", "complete"];
    const currentIndex = steps.indexOf(consultationStep);
    const stepIndex = steps.indexOf(step);
    
    if (stepIndex < currentIndex) return "bg-emerald-100 text-emerald-800";
    if (stepIndex === currentIndex) return "bg-sky-100 text-sky-800";
    return "bg-slate-100 text-slate-600";
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
              <Stethoscope className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg">Consulta em Andamento</h1>
              <p className="text-sm text-muted-foreground">{appointmentTime} • {appointmentType}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 max-w-6xl mx-auto">
        {/* Progress Steps */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 overflow-x-auto">
              {[
                { id: "start", label: "Início", icon: User },
                { id: "vitals", label: "Sinais Vitais", icon: Activity },
                { id: "anamnesis", label: "Anamnese", icon: FileText },
                { id: "physical", label: "Exame Físico", icon: Stethoscope },
                { id: "diagnosis", label: "Diagnóstico", icon: Heart },
                { id: "complete", label: "Finalizar", icon: CheckCircle }
              ].map((step, index) => {
                const Icon = step.icon;
                return (
                  <div key={step.id} className="flex items-center gap-2">
                    <Badge className={getStepColor(step.id)} variant="secondary">
                      <Icon className="w-3 h-3 mr-1" />
                      {step.label}
                    </Badge>
                    {index < 5 && <div className="w-2 h-px bg-border" />}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Patient Info Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5 text-sky-400" />
                  Informações do Paciente
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="bg-muted">
                      <User className="w-5 h-5" />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{patientName}</p>
                    <p className="text-sm text-muted-foreground">ID: {patientId}</p>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Idade:</span>
                    <span className="text-sm">{patientInfo.age} anos</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Sexo:</span>
                    <span className="text-sm">{patientInfo.gender}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Tipo Sanguíneo:</span>
                    <span className="text-sm">{patientInfo.bloodType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Última Consulta:</span>
                    <span className="text-sm">{patientInfo.lastVisit}</span>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <div className="flex items-center gap-1 mb-2">
                    <AlertCircle className="w-4 h-4 text-amber-500" />
                    <span className="text-sm font-medium">Alergias</span>
                  </div>
                  <Badge variant="outline" className="text-amber-700 border-amber-200">
                    {patientInfo.allergies}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            {consultationStep === "start" && (
              <Card>
                <CardHeader>
                  <CardTitle>Iniciar Consulta</CardTitle>
                  <CardDescription>Confirme as informações e inicie o atendimento</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-accent/50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span className="font-medium">Horário Agendado: {appointmentTime}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Tipo: {appointmentType}</p>
                  </div>
                  
                  <div className="flex gap-3">
                    <Button onClick={handleSaveAndNext} className="flex-1">
                      <Stethoscope className="w-4 h-4 mr-2" />
                      Iniciar Consulta
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {consultationStep === "vitals" && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="w-5 h-5 text-emerald-400" />
                    Sinais Vitais
                  </CardTitle>
                  <CardDescription>Registre os sinais vitais do paciente</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="bloodPressure">Pressão Arterial (mmHg)</Label>
                      <Input
                        id="bloodPressure"
                        value={vitals.bloodPressure}
                        onChange={(e) => setVitals({ ...vitals, bloodPressure: e.target.value })}
                        placeholder="120/80"
                      />
                    </div>
                    <div>
                      <Label htmlFor="heartRate">Frequência Cardíaca (bpm)</Label>
                      <Input
                        id="heartRate"
                        value={vitals.heartRate}
                        onChange={(e) => setVitals({ ...vitals, heartRate: e.target.value })}
                        placeholder="72"
                      />
                    </div>
                    <div>
                      <Label htmlFor="temperature">Temperatura (°C)</Label>
                      <Input
                        id="temperature"
                        value={vitals.temperature}
                        onChange={(e) => setVitals({ ...vitals, temperature: e.target.value })}
                        placeholder="36.5"
                      />
                    </div>
                    <div>
                      <Label htmlFor="weight">Peso (kg)</Label>
                      <Input
                        id="weight"
                        value={vitals.weight}
                        onChange={(e) => setVitals({ ...vitals, weight: e.target.value })}
                        placeholder="70"
                      />
                    </div>
                    <div>
                      <Label htmlFor="height">Altura (cm)</Label>
                      <Input
                        id="height"
                        value={vitals.height}
                        onChange={(e) => setVitals({ ...vitals, height: e.target.value })}
                        placeholder="170"
                      />
                    </div>
                    <div>
                      <Label htmlFor="oxygenSaturation">Saturação O2 (%)</Label>
                      <Input
                        id="oxygenSaturation"
                        value={vitals.oxygenSaturation}
                        onChange={(e) => setVitals({ ...vitals, oxygenSaturation: e.target.value })}
                        placeholder="98"
                      />
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <Button variant="outline" onClick={() => setConsultationStep("start")}>
                      Voltar
                    </Button>
                    <Button onClick={handleSaveAndNext}>
                      Próximo: Anamnese
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {consultationStep === "anamnesis" && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-sky-400" />
                    Anamnese
                  </CardTitle>
                  <CardDescription>História clínica e queixa principal</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="chiefComplaint">Queixa Principal</Label>
                    <Textarea
                      id="chiefComplaint"
                      value={anamnesis.chiefComplaint}
                      onChange={(e) => setAnamnesis({ ...anamnesis, chiefComplaint: e.target.value })}
                      placeholder="Descreva a queixa principal do paciente..."
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="historyOfPresentIllness">História da Doença Atual</Label>
                    <Textarea
                      id="historyOfPresentIllness"
                      value={anamnesis.historyOfPresentIllness}
                      onChange={(e) => setAnamnesis({ ...anamnesis, historyOfPresentIllness: e.target.value })}
                      placeholder="Quando começou, características, fatores que melhoram/pioram..."
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="reviewOfSystems">Revisão de Sistemas</Label>
                    <Textarea
                      id="reviewOfSystems"
                      value={anamnesis.reviewOfSystems}
                      onChange={(e) => setAnamnesis({ ...anamnesis, reviewOfSystems: e.target.value })}
                      placeholder="Sintomas por sistemas (cardiovascular, respiratório, digestivo...)"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="anamnesisNotes">Observações Adicionais</Label>
                    <Textarea
                      id="anamnesisNotes"
                      value={anamnesis.notes}
                      onChange={(e) => setAnamnesis({ ...anamnesis, notes: e.target.value })}
                      placeholder="Outras informações relevantes..."
                    />
                  </div>
                  
                  <div className="flex gap-3">
                    <Button variant="outline" onClick={() => setConsultationStep("vitals")}>
                      Voltar
                    </Button>
                    <Button onClick={handleSaveAndNext}>
                      Próximo: Exame Físico
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {consultationStep === "physical" && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Stethoscope className="w-5 h-5 text-amber-400" />
                    Exame Físico
                  </CardTitle>
                  <CardDescription>Achados do exame físico</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="generalAppearance">Aspecto Geral</Label>
                    <Textarea
                      id="generalAppearance"
                      value={physicalExam.generalAppearance}
                      onChange={(e) => setPhysicalExam({ ...physicalExam, generalAppearance: e.target.value })}
                      placeholder="Estado geral, consciência, coloração..."
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="cardiovascular">Sistema Cardiovascular</Label>
                      <Textarea
                        id="cardiovascular"
                        value={physicalExam.cardiovascular}
                        onChange={(e) => setPhysicalExam({ ...physicalExam, cardiovascular: e.target.value })}
                        placeholder="Ausculta cardíaca, pulsos..."
                        rows={3}
                      />
                    </div>
                    <div>
                      <Label htmlFor="respiratory">Sistema Respiratório</Label>
                      <Textarea
                        id="respiratory"
                        value={physicalExam.respiratory}
                        onChange={(e) => setPhysicalExam({ ...physicalExam, respiratory: e.target.value })}
                        placeholder="Ausculta pulmonar, expansibilidade..."
                        rows={3}
                      />
                    </div>
                    <div>
                      <Label htmlFor="abdomen">Abdome</Label>
                      <Textarea
                        id="abdomen"
                        value={physicalExam.abdomen}
                        onChange={(e) => setPhysicalExam({ ...physicalExam, abdomen: e.target.value })}
                        placeholder="Inspeção, palpação, ausculta..."
                        rows={3}
                      />
                    </div>
                    <div>
                      <Label htmlFor="neurological">Sistema Neurológico</Label>
                      <Textarea
                        id="neurological"
                        value={physicalExam.neurological}
                        onChange={(e) => setPhysicalExam({ ...physicalExam, neurological: e.target.value })}
                        placeholder="Reflexos, força, sensibilidade..."
                        rows={3}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="otherFindings">Outros Achados</Label>
                    <Textarea
                      id="otherFindings"
                      value={physicalExam.other}
                      onChange={(e) => setPhysicalExam({ ...physicalExam, other: e.target.value })}
                      placeholder="Outros sistemas e achados relevantes..."
                    />
                  </div>
                  
                  <div className="flex gap-3">
                    <Button variant="outline" onClick={() => setConsultationStep("anamnesis")}>
                      Voltar
                    </Button>
                    <Button onClick={handleSaveAndNext}>
                      Próximo: Diagnóstico
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {consultationStep === "diagnosis" && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="w-5 h-5 text-rose-400" />
                    Diagnóstico e Conduta
                  </CardTitle>
                  <CardDescription>Diagnóstico e plano de tratamento</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="primaryDiagnosis">Diagnóstico Principal</Label>
                    <Input
                      id="primaryDiagnosis"
                      value={diagnosis.primaryDiagnosis}
                      onChange={(e) => setDiagnosis({ ...diagnosis, primaryDiagnosis: e.target.value })}
                      placeholder="Ex: Hipertensão arterial sistêmica"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="secondaryDiagnosis">Diagnósticos Secundários</Label>
                    <Input
                      id="secondaryDiagnosis"
                      value={diagnosis.secondaryDiagnosis}
                      onChange={(e) => setDiagnosis({ ...diagnosis, secondaryDiagnosis: e.target.value })}
                      placeholder="Diagnósticos adicionais, se houver"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="plan">Plano de Tratamento</Label>
                    <Textarea
                      id="plan"
                      value={diagnosis.plan}
                      onChange={(e) => setDiagnosis({ ...diagnosis, plan: e.target.value })}
                      placeholder="Medicações, orientações, mudanças no estilo de vida..."
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="prescriptions">Prescrições</Label>
                    <Textarea
                      id="prescriptions"
                      value={diagnosis.prescriptions}
                      onChange={(e) => setDiagnosis({ ...diagnosis, prescriptions: e.target.value })}
                      placeholder="Lista de medicamentos prescritos..."
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="followUp">Seguimento</Label>
                    <Textarea
                      id="followUp"
                      value={diagnosis.followUp}
                      onChange={(e) => setDiagnosis({ ...diagnosis, followUp: e.target.value })}
                      placeholder="Quando retornar, exames de acompanhamento..."
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="observations">Observações</Label>
                    <Textarea
                      id="observations"
                      value={diagnosis.observations}
                      onChange={(e) => setDiagnosis({ ...diagnosis, observations: e.target.value })}
                      placeholder="Informações adicionais relevantes..."
                    />
                  </div>
                  
                  <div className="flex gap-3">
                    <Button variant="outline" onClick={() => setConsultationStep("physical")}>
                      Voltar
                    </Button>
                    <Button onClick={handleSaveAndNext}>
                      Finalizar Consulta
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {consultationStep === "complete" && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-emerald-400" />
                    Consulta Finalizada
                  </CardTitle>
                  <CardDescription>Resumo da consulta e próximos passos</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="w-5 h-5 text-emerald-600" />
                      <span className="font-medium text-emerald-800">Consulta concluída com sucesso</span>
                    </div>
                    <p className="text-sm text-emerald-700">
                      Todos os dados foram salvos no prontuário do paciente.
                    </p>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-medium">Ações Disponíveis:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                        <FileText className="w-5 h-5" />
                        <span>Gerar Receita</span>
                      </Button>
                      <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                        <Heart className="w-5 h-5" />
                        <span>Solicitar Exames</span>
                      </Button>
                      <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                        <Clock className="w-5 h-5" />
                        <span>Agendar Retorno</span>
                      </Button>
                      <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                        <User className="w-5 h-5" />
                        <span>Ver Prontuário</span>
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <Button onClick={handleComplete} className="flex-1">
                      <Save className="w-4 h-4 mr-2" />
                      Voltar ao Dashboard
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
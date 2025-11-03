import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { Badge } from "./ui/badge";
import { 
  ArrowLeft, 
  UserPlus, 
  Save,
  User,
  Mail,
  Phone,
  MapPin,
  Shield,
  Calendar,
  GraduationCap,
  FileText,
  Plus,
  X
} from "lucide-react";

interface DoctorRegistrationProps {
  onBack: () => void;
  onSave: (doctor: any) => void;
}

export function DoctorRegistration({ onBack, onSave }: DoctorRegistrationProps) {
  const [currentStep, setCurrentStep] = useState(1); // 1: Personal, 2: Professional, 3: Access, 4: Review

  const [personalInfo, setPersonalInfo] = useState({
    fullName: "",
    cpf: "",
    crm: "",
    crmState: "",
    rg: "",
    birthDate: "",
    gender: "",
    maritalStatus: "",
    nationality: "Brasileira"
  });

  const [contactInfo, setContactInfo] = useState({
    phone: "",
    cellPhone: "",
    email: "",
    address: "",
    addressNumber: "",
    complement: "",
    neighborhood: "",
    city: "",
    state: "",
    zipCode: ""
  });

  const [professionalInfo, setProfessionalInfo] = useState({
    specialties: [],
    medicalSchool: "",
    graduationYear: "",
    residencies: [],
    certifications: [],
    workSchedule: [],
    consultationDuration: "30",
    maxPatientsPerDay: "20"
  });

  const [accessInfo, setAccessInfo] = useState({
    accessLevel: "",
    permissions: [],
    units: [],
    startDate: "",
    contractType: "",
    status: "active"
  });

  const [specialtyInput, setSpecialtyInput] = useState("");
  const [residencyInput, setResidencyInput] = useState("");
  const [certificationInput, setCertificationInput] = useState("");

  // Mock data
  const availableSpecialties = [
    "Cardiologia",
    "Dermatologia", 
    "Endocrinologia",
    "Gastroenterologia",
    "Ginecologia",
    "Neurologia",
    "Oftalmologia",
    "Ortopedia",
    "Pediatria",
    "Psiquiatria",
    "Radiologia",
    "Urologia",
    "Clínico Geral"
  ];

  const accessLevels = [
    { value: "basic", label: "Básico - Consultas e prontuários" },
    { value: "advanced", label: "Avançado - Inclui prescrições e exames" },
    { value: "admin", label: "Administrador - Acesso total" }
  ];

  const availablePermissions = [
    "view_patient_records",
    "edit_patient_records", 
    "create_prescriptions",
    "request_exams",
    "manage_appointments",
    "access_reports",
    "manage_inventory"
  ];

  const healthUnits = [
    { id: "ubs_centro", name: "UBS Centro" },
    { id: "ubs_norte", name: "UBS Norte" },
    { id: "ubs_sul", name: "UBS Sul" },
    { id: "ubs_leste", name: "UBS Leste" },
    { id: "ubs_oeste", name: "UBS Oeste" }
  ];

  const steps = [
    { id: 1, title: "Dados Pessoais", icon: User },
    { id: 2, title: "Dados Profissionais", icon: GraduationCap },
    { id: 3, title: "Acesso e Permissões", icon: Shield },
    { id: 4, title: "Revisão", icon: FileText }
  ];

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const addSpecialty = () => {
    if (specialtyInput && !professionalInfo.specialties.includes(specialtyInput)) {
      setProfessionalInfo({
        ...professionalInfo,
        specialties: [...professionalInfo.specialties, specialtyInput]
      });
      setSpecialtyInput("");
    }
  };

  const removeSpecialty = (specialty: string) => {
    setProfessionalInfo({
      ...professionalInfo,
      specialties: professionalInfo.specialties.filter(s => s !== specialty)
    });
  };

  const addResidency = () => {
    if (residencyInput && !professionalInfo.residencies.includes(residencyInput)) {
      setProfessionalInfo({
        ...professionalInfo,
        residencies: [...professionalInfo.residencies, residencyInput]
      });
      setResidencyInput("");
    }
  };

  const removeResidency = (residency: string) => {
    setProfessionalInfo({
      ...professionalInfo,
      residencies: professionalInfo.residencies.filter(r => r !== residency)
    });
  };

  const addCertification = () => {
    if (certificationInput && !professionalInfo.certifications.includes(certificationInput)) {
      setProfessionalInfo({
        ...professionalInfo,
        certifications: [...professionalInfo.certifications, certificationInput]
      });
      setCertificationInput("");
    }
  };

  const removeCertification = (certification: string) => {
    setProfessionalInfo({
      ...professionalInfo,
      certifications: professionalInfo.certifications.filter(c => c !== certification)
    });
  };

  const validateCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return personalInfo.fullName && personalInfo.cpf && personalInfo.crm && personalInfo.crmState;
      case 2:
        return professionalInfo.specialties.length > 0 && professionalInfo.medicalSchool;
      case 3:
        return accessInfo.accessLevel && accessInfo.units.length > 0;
      case 4:
        return true;
      default:
        return false;
    }
  };

  const handleSave = () => {
    const doctorData = {
      id: `D${String(Date.now()).slice(-3)}`,
      ...personalInfo,
      ...contactInfo,
      ...professionalInfo,
      ...accessInfo,
      registrationDate: new Date().toLocaleDateString('pt-BR'),
      status: "active"
    };

    onSave(doctorData);
  };

  const getStepStatus = (stepId: number) => {
    if (stepId < currentStep) return "completed";
    if (stepId === currentStep) return "current";
    return "pending";
  };

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
              <UserPlus className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg">Cadastrar Novo Médico</h1>
              <p className="text-sm text-muted-foreground">Passo {currentStep} de 4</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 max-w-4xl mx-auto space-y-6">
        {/* Progress Steps */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const status = getStepStatus(step.id);
                
                return (
                  <div key={step.id} className="flex items-center">
                    <div className="flex flex-col items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                        status === "completed" ? "bg-emerald-100 border-emerald-500 text-emerald-700" :
                        status === "current" ? "bg-primary border-primary text-primary-foreground" :
                        "bg-slate-100 border-slate-300 text-slate-500"
                      }`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className={`text-xs mt-1 ${
                        status === "current" ? "text-primary font-medium" : "text-muted-foreground"
                      }`}>
                        {step.title}
                      </span>
                    </div>
                    {index < steps.length - 1 && (
                      <div className={`flex-1 h-px mx-4 ${
                        status === "completed" ? "bg-emerald-500" : "bg-slate-300"
                      }`} />
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Step Content */}
        {currentStep === 1 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5 text-sky-400" />
                Dados Pessoais
              </CardTitle>
              <CardDescription>
                Informações pessoais e documentos do médico
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fullName">Nome Completo *</Label>
                  <Input
                    id="fullName"
                    value={personalInfo.fullName}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, fullName: e.target.value })}
                    placeholder="Nome completo do médico"
                  />
                </div>
                <div>
                  <Label htmlFor="cpf">CPF *</Label>
                  <Input
                    id="cpf"
                    value={personalInfo.cpf}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, cpf: e.target.value })}
                    placeholder="000.000.000-00"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="crm">CRM *</Label>
                  <Input
                    id="crm"
                    value={personalInfo.crm}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, crm: e.target.value })}
                    placeholder="123456"
                  />
                </div>
                <div>
                  <Label htmlFor="crmState">Estado do CRM *</Label>
                  <Select value={personalInfo.crmState} onValueChange={(value) => setPersonalInfo({ ...personalInfo, crmState: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o estado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="SP">São Paulo</SelectItem>
                      <SelectItem value="RJ">Rio de Janeiro</SelectItem>
                      <SelectItem value="MG">Minas Gerais</SelectItem>
                      <SelectItem value="RS">Rio Grande do Sul</SelectItem>
                      <SelectItem value="PR">Paraná</SelectItem>
                      <SelectItem value="SC">Santa Catarina</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="rg">RG</Label>
                  <Input
                    id="rg"
                    value={personalInfo.rg}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, rg: e.target.value })}
                    placeholder="00.000.000-0"
                  />
                </div>
                <div>
                  <Label htmlFor="birthDate">Data de Nascimento</Label>
                  <Input
                    id="birthDate"
                    type="date"
                    value={personalInfo.birthDate}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, birthDate: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="gender">Sexo</Label>
                  <Select value={personalInfo.gender} onValueChange={(value) => setPersonalInfo({ ...personalInfo, gender: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o sexo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="masculino">Masculino</SelectItem>
                      <SelectItem value="feminino">Feminino</SelectItem>
                      <SelectItem value="outro">Outro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="maritalStatus">Estado Civil</Label>
                  <Select value={personalInfo.maritalStatus} onValueChange={(value) => setPersonalInfo({ ...personalInfo, maritalStatus: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o estado civil" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="solteiro">Solteiro(a)</SelectItem>
                      <SelectItem value="casado">Casado(a)</SelectItem>
                      <SelectItem value="divorciado">Divorciado(a)</SelectItem>
                      <SelectItem value="viuvo">Viúvo(a)</SelectItem>
                      <SelectItem value="uniao_estavel">União Estável</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Contact Information */}
              <div className="mt-6 pt-6 border-t">
                <h3 className="text-lg font-medium mb-4">Informações de Contato</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">Telefone</Label>
                    <Input
                      id="phone"
                      value={contactInfo.phone}
                      onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                      placeholder="(11) 1234-5678"
                    />
                  </div>
                  <div>
                    <Label htmlFor="cellPhone">Celular *</Label>
                    <Input
                      id="cellPhone"
                      value={contactInfo.cellPhone}
                      onChange={(e) => setContactInfo({ ...contactInfo, cellPhone: e.target.value })}
                      placeholder="(11) 99999-9999"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <Label htmlFor="email">E-mail *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={contactInfo.email}
                    onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                    placeholder="email@exemplo.com"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <div className="md:col-span-2">
                    <Label htmlFor="address">Endereço</Label>
                    <Input
                      id="address"
                      value={contactInfo.address}
                      onChange={(e) => setContactInfo({ ...contactInfo, address: e.target.value })}
                      placeholder="Rua, Avenida, etc."
                    />
                  </div>
                  <div>
                    <Label htmlFor="addressNumber">Número</Label>
                    <Input
                      id="addressNumber"
                      value={contactInfo.addressNumber}
                      onChange={(e) => setContactInfo({ ...contactInfo, addressNumber: e.target.value })}
                      placeholder="123"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <div>
                    <Label htmlFor="neighborhood">Bairro</Label>
                    <Input
                      id="neighborhood"
                      value={contactInfo.neighborhood}
                      onChange={(e) => setContactInfo({ ...contactInfo, neighborhood: e.target.value })}
                      placeholder="Nome do bairro"
                    />
                  </div>
                  <div>
                    <Label htmlFor="city">Cidade</Label>
                    <Input
                      id="city"
                      value={contactInfo.city}
                      onChange={(e) => setContactInfo({ ...contactInfo, city: e.target.value })}
                      placeholder="Nome da cidade"
                    />
                  </div>
                  <div>
                    <Label htmlFor="zipCode">CEP</Label>
                    <Input
                      id="zipCode"
                      value={contactInfo.zipCode}
                      onChange={(e) => setContactInfo({ ...contactInfo, zipCode: e.target.value })}
                      placeholder="00000-000"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {currentStep === 2 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-emerald-400" />
                Dados Profissionais
              </CardTitle>
              <CardDescription>
                Formação, especialidades e informações profissionais
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Specialties */}
              <div>
                <Label>Especialidades *</Label>
                <div className="flex gap-2 mt-2">
                  <Select value={specialtyInput} onValueChange={setSpecialtyInput}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma especialidade" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableSpecialties.map((specialty) => (
                        <SelectItem key={specialty} value={specialty}>
                          {specialty}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button onClick={addSpecialty} variant="outline">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {professionalInfo.specialties.map((specialty) => (
                    <Badge key={specialty} variant="secondary" className="flex items-center gap-1">
                      {specialty}
                      <button onClick={() => removeSpecialty(specialty)}>
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Medical School */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="medicalSchool">Faculdade de Medicina *</Label>
                  <Input
                    id="medicalSchool"
                    value={professionalInfo.medicalSchool}
                    onChange={(e) => setProfessionalInfo({ ...professionalInfo, medicalSchool: e.target.value })}
                    placeholder="Nome da instituição"
                  />
                </div>
                <div>
                  <Label htmlFor="graduationYear">Ano de Formatura</Label>
                  <Input
                    id="graduationYear"
                    value={professionalInfo.graduationYear}
                    onChange={(e) => setProfessionalInfo({ ...professionalInfo, graduationYear: e.target.value })}
                    placeholder="2020"
                  />
                </div>
              </div>

              {/* Residencies */}
              <div>
                <Label>Residências Médicas</Label>
                <div className="flex gap-2 mt-2">
                  <Input
                    value={residencyInput}
                    onChange={(e) => setResidencyInput(e.target.value)}
                    placeholder="Ex: Residência em Cardiologia - Hospital XYZ (2020-2022)"
                  />
                  <Button onClick={addResidency} variant="outline">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="space-y-2 mt-2">
                  {professionalInfo.residencies.map((residency, index) => (
                    <div key={index} className="flex items-center justify-between bg-accent p-2 rounded">
                      <span className="text-sm">{residency}</span>
                      <button onClick={() => removeResidency(residency)}>
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Certifications */}
              <div>
                <Label>Certificações e Títulos</Label>
                <div className="flex gap-2 mt-2">
                  <Input
                    value={certificationInput}
                    onChange={(e) => setCertificationInput(e.target.value)}
                    placeholder="Ex: Título de Especialista em Cardiologia - SBC (2023)"
                  />
                  <Button onClick={addCertification} variant="outline">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="space-y-2 mt-2">
                  {professionalInfo.certifications.map((certification, index) => (
                    <div key={index} className="flex items-center justify-between bg-accent p-2 rounded">
                      <span className="text-sm">{certification}</span>
                      <button onClick={() => removeCertification(certification)}>
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Work Configuration */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="consultationDuration">Duração da Consulta (minutos)</Label>
                  <Select 
                    value={professionalInfo.consultationDuration} 
                    onValueChange={(value) => setProfessionalInfo({ ...professionalInfo, consultationDuration: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 minutos</SelectItem>
                      <SelectItem value="20">20 minutos</SelectItem>
                      <SelectItem value="30">30 minutos</SelectItem>
                      <SelectItem value="45">45 minutos</SelectItem>
                      <SelectItem value="60">60 minutos</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="maxPatientsPerDay">Máximo de Pacientes/Dia</Label>
                  <Input
                    id="maxPatientsPerDay"
                    value={professionalInfo.maxPatientsPerDay}
                    onChange={(e) => setProfessionalInfo({ ...professionalInfo, maxPatientsPerDay: e.target.value })}
                    placeholder="20"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {currentStep === 3 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-amber-400" />
                Acesso e Permissões
              </CardTitle>
              <CardDescription>
                Configure o nível de acesso e permissões do médico
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Access Level */}
              <div>
                <Label htmlFor="accessLevel">Nível de Acesso *</Label>
                <Select value={accessInfo.accessLevel} onValueChange={(value) => setAccessInfo({ ...accessInfo, accessLevel: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o nível de acesso" />
                  </SelectTrigger>
                  <SelectContent>
                    {accessLevels.map((level) => (
                      <SelectItem key={level.value} value={level.value}>
                        {level.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Health Units */}
              <div>
                <Label>Unidades de Saúde *</Label>
                <div className="space-y-2 mt-2">
                  {healthUnits.map((unit) => (
                    <div key={unit.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={unit.id}
                        checked={accessInfo.units.includes(unit.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setAccessInfo({
                              ...accessInfo,
                              units: [...accessInfo.units, unit.id]
                            });
                          } else {
                            setAccessInfo({
                              ...accessInfo,
                              units: accessInfo.units.filter(u => u !== unit.id)
                            });
                          }
                        }}
                      />
                      <Label htmlFor={unit.id} className="text-sm font-normal cursor-pointer">
                        {unit.name}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contract Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="startDate">Data de Início</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={accessInfo.startDate}
                    onChange={(e) => setAccessInfo({ ...accessInfo, startDate: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="contractType">Tipo de Contrato</Label>
                  <Select value={accessInfo.contractType} onValueChange={(value) => setAccessInfo({ ...accessInfo, contractType: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="clt">CLT</SelectItem>
                      <SelectItem value="pj">Pessoa Jurídica</SelectItem>
                      <SelectItem value="temporario">Temporário</SelectItem>
                      <SelectItem value="cooperado">Cooperado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {currentStep === 4 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-violet-400" />
                Revisão dos Dados
              </CardTitle>
              <CardDescription>
                Revise todas as informações antes de finalizar o cadastro
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Personal Information Summary */}
              <div>
                <h4 className="font-medium mb-3">Dados Pessoais</h4>
                <div className="bg-accent/50 p-4 rounded-lg space-y-2">
                  <p><strong>Nome:</strong> {personalInfo.fullName}</p>
                  <p><strong>CPF:</strong> {personalInfo.cpf}</p>
                  <p><strong>CRM:</strong> {personalInfo.crm} - {personalInfo.crmState}</p>
                  <p><strong>E-mail:</strong> {contactInfo.email}</p>
                  <p><strong>Celular:</strong> {contactInfo.cellPhone}</p>
                </div>
              </div>

              {/* Professional Information Summary */}
              <div>
                <h4 className="font-medium mb-3">Dados Profissionais</h4>
                <div className="bg-accent/50 p-4 rounded-lg space-y-2">
                  <p><strong>Especialidades:</strong> {professionalInfo.specialties.join(", ")}</p>
                  <p><strong>Formação:</strong> {professionalInfo.medicalSchool} ({professionalInfo.graduationYear})</p>
                  <p><strong>Duração da consulta:</strong> {professionalInfo.consultationDuration} minutos</p>
                  <p><strong>Máximo de pacientes/dia:</strong> {professionalInfo.maxPatientsPerDay}</p>
                </div>
              </div>

              {/* Access Information Summary */}
              <div>
                <h4 className="font-medium mb-3">Acesso e Permissões</h4>
                <div className="bg-accent/50 p-4 rounded-lg space-y-2">
                  <p><strong>Nível de acesso:</strong> {accessLevels.find(l => l.value === accessInfo.accessLevel)?.label}</p>
                  <p><strong>Unidades:</strong> {accessInfo.units.map(unitId => 
                    healthUnits.find(u => u.id === unitId)?.name
                  ).join(", ")}</p>
                  <p><strong>Data de início:</strong> {accessInfo.startDate || "Não informado"}</p>
                  <p><strong>Tipo de contrato:</strong> {accessInfo.contractType || "Não informado"}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={currentStep === 1 ? onBack : handlePrevious}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {currentStep === 1 ? "Cancelar" : "Anterior"}
          </Button>
          
          {currentStep < 4 ? (
            <Button 
              onClick={handleNext} 
              disabled={!validateCurrentStep()}
            >
              Próximo
              <Calendar className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button 
              onClick={handleSave} 
              disabled={!validateCurrentStep()}
            >
              <Save className="w-4 h-4 mr-2" />
              Cadastrar Médico
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
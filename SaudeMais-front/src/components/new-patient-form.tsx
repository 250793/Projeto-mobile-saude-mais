import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { 
  ArrowLeft, 
  UserPlus, 
  Save,
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Heart,
  AlertTriangle
} from "lucide-react";

interface NewPatientFormProps {
  onBack: () => void;
  onSave: (patient: any) => void;
}

export function NewPatientForm({ onBack, onSave }: NewPatientFormProps) {
  const [personalInfo, setPersonalInfo] = useState({
    fullName: "",
    cpf: "",
    rg: "",
    birthDate: "",
    gender: "",
    maritalStatus: "",
    profession: "",
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

  const [medicalInfo, setMedicalInfo] = useState({
    bloodType: "",
    allergies: "",
    chronicDiseases: "",
    previousSurgeries: "",
    currentMedications: "",
    familyHistory: "",
    observations: ""
  });

  const [emergencyContact, setEmergencyContact] = useState({
    name: "",
    relationship: "",
    phone: "",
    cellPhone: ""
  });

  const [consent, setConsent] = useState({
    dataProcessing: false,
    medicalTreatment: false,
    communicationConsent: false
  });

  const [currentStep, setCurrentStep] = useState(1); // 1: Personal, 2: Contact, 3: Medical, 4: Emergency, 5: Consent

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const validateCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return personalInfo.fullName && personalInfo.cpf && personalInfo.birthDate && personalInfo.gender;
      case 2:
        return contactInfo.phone && contactInfo.address && contactInfo.city;
      case 3:
        return true; // Medical info is optional
      case 4:
        return emergencyContact.name && emergencyContact.phone;
      case 5:
        return consent.dataProcessing && consent.medicalTreatment;
      default:
        return false;
    }
  };

  const handleSave = () => {
    if (!validateCurrentStep()) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    const newPatient = {
      id: `P${String(Date.now()).slice(-3)}`,
      ...personalInfo,
      ...contactInfo,
      ...medicalInfo,
      emergencyContact,
      consent,
      registrationDate: new Date().toLocaleDateString('pt-BR'),
      status: "ativo",
      lastVisit: null,
      nextAppointment: null
    };

    onSave(newPatient);
  };

  const steps = [
    { id: 1, title: "Dados Pessoais", icon: User },
    { id: 2, title: "Contato e Endereço", icon: MapPin },
    { id: 3, title: "Informações Médicas", icon: Heart },
    { id: 4, title: "Contato de Emergência", icon: Phone },
    { id: 5, title: "Termos e Consentimento", icon: AlertTriangle }
  ];

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
              <h1 className="text-lg">Cadastrar Novo Paciente</h1>
              <p className="text-sm text-muted-foreground">Passo {currentStep} de 5</p>
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
                Informações básicas do paciente
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
                    placeholder="Nome completo do paciente"
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
                  <Label htmlFor="rg">RG</Label>
                  <Input
                    id="rg"
                    value={personalInfo.rg}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, rg: e.target.value })}
                    placeholder="00.000.000-0"
                  />
                </div>
                <div>
                  <Label htmlFor="birthDate">Data de Nascimento *</Label>
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
                  <Label htmlFor="gender">Sexo *</Label>
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="profession">Profissão</Label>
                  <Input
                    id="profession"
                    value={personalInfo.profession}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, profession: e.target.value })}
                    placeholder="Profissão do paciente"
                  />
                </div>
                <div>
                  <Label htmlFor="nationality">Nacionalidade</Label>
                  <Input
                    id="nationality"
                    value={personalInfo.nationality}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, nationality: e.target.value })}
                    placeholder="Nacionalidade"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {currentStep === 2 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-emerald-400" />
                Contato e Endereço
              </CardTitle>
              <CardDescription>
                Informações de contato e endereço
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">Telefone *</Label>
                  <Input
                    id="phone"
                    value={contactInfo.phone}
                    onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                    placeholder="(11) 1234-5678"
                  />
                </div>
                <div>
                  <Label htmlFor="cellPhone">Celular</Label>
                  <Input
                    id="cellPhone"
                    value={contactInfo.cellPhone}
                    onChange={(e) => setContactInfo({ ...contactInfo, cellPhone: e.target.value })}
                    placeholder="(11) 99999-9999"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  value={contactInfo.email}
                  onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                  placeholder="email@exemplo.com"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <Label htmlFor="address">Endereço *</Label>
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="complement">Complemento</Label>
                  <Input
                    id="complement"
                    value={contactInfo.complement}
                    onChange={(e) => setContactInfo({ ...contactInfo, complement: e.target.value })}
                    placeholder="Apto, Bloco, etc."
                  />
                </div>
                <div>
                  <Label htmlFor="neighborhood">Bairro</Label>
                  <Input
                    id="neighborhood"
                    value={contactInfo.neighborhood}
                    onChange={(e) => setContactInfo({ ...contactInfo, neighborhood: e.target.value })}
                    placeholder="Nome do bairro"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="city">Cidade *</Label>
                  <Input
                    id="city"
                    value={contactInfo.city}
                    onChange={(e) => setContactInfo({ ...contactInfo, city: e.target.value })}
                    placeholder="Nome da cidade"
                  />
                </div>
                <div>
                  <Label htmlFor="state">Estado</Label>
                  <Select value={contactInfo.state} onValueChange={(value) => setContactInfo({ ...contactInfo, state: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="UF" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="SP">SP</SelectItem>
                      <SelectItem value="RJ">RJ</SelectItem>
                      <SelectItem value="MG">MG</SelectItem>
                      <SelectItem value="RS">RS</SelectItem>
                      <SelectItem value="PR">PR</SelectItem>
                      <SelectItem value="SC">SC</SelectItem>
                      {/* Adicionar outros estados conforme necessário */}
                    </SelectContent>
                  </Select>
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
            </CardContent>
          </Card>
        )}

        {currentStep === 3 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-rose-400" />
                Informações Médicas
              </CardTitle>
              <CardDescription>
                Histórico de saúde e informações médicas relevantes
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="bloodType">Tipo Sanguíneo</Label>
                <Select value={medicalInfo.bloodType} onValueChange={(value) => setMedicalInfo({ ...medicalInfo, bloodType: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo sanguíneo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A+">A+</SelectItem>
                    <SelectItem value="A-">A-</SelectItem>
                    <SelectItem value="B+">B+</SelectItem>
                    <SelectItem value="B-">B-</SelectItem>
                    <SelectItem value="AB+">AB+</SelectItem>
                    <SelectItem value="AB-">AB-</SelectItem>
                    <SelectItem value="O+">O+</SelectItem>
                    <SelectItem value="O-">O-</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="allergies">Alergias</Label>
                <Textarea
                  id="allergies"
                  value={medicalInfo.allergies}
                  onChange={(e) => setMedicalInfo({ ...medicalInfo, allergies: e.target.value })}
                  placeholder="Liste todas as alergias conhecidas (medicamentos, alimentos, etc.)"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="chronicDiseases">Doenças Crônicas</Label>
                <Textarea
                  id="chronicDiseases"
                  value={medicalInfo.chronicDiseases}
                  onChange={(e) => setMedicalInfo({ ...medicalInfo, chronicDiseases: e.target.value })}
                  placeholder="Hipertensão, diabetes, cardiopatias, etc."
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="previousSurgeries">Cirurgias Anteriores</Label>
                <Textarea
                  id="previousSurgeries"
                  value={medicalInfo.previousSurgeries}
                  onChange={(e) => setMedicalInfo({ ...medicalInfo, previousSurgeries: e.target.value })}
                  placeholder="Descrição de cirurgias realizadas e datas"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="currentMedications">Medicamentos Atuais</Label>
                <Textarea
                  id="currentMedications"
                  value={medicalInfo.currentMedications}
                  onChange={(e) => setMedicalInfo({ ...medicalInfo, currentMedications: e.target.value })}
                  placeholder="Liste todos os medicamentos em uso atual"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="familyHistory">Histórico Familiar</Label>
                <Textarea
                  id="familyHistory"
                  value={medicalInfo.familyHistory}
                  onChange={(e) => setMedicalInfo({ ...medicalInfo, familyHistory: e.target.value })}
                  placeholder="Doenças na família (pais, avós, irmãos)"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="observations">Observações Gerais</Label>
                <Textarea
                  id="observations"
                  value={medicalInfo.observations}
                  onChange={(e) => setMedicalInfo({ ...medicalInfo, observations: e.target.value })}
                  placeholder="Outras informações relevantes"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        )}

        {currentStep === 4 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-amber-400" />
                Contato de Emergência
              </CardTitle>
              <CardDescription>
                Pessoa para contatar em caso de emergência
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="emergencyName">Nome Completo *</Label>
                <Input
                  id="emergencyName"
                  value={emergencyContact.name}
                  onChange={(e) => setEmergencyContact({ ...emergencyContact, name: e.target.value })}
                  placeholder="Nome da pessoa de contato"
                />
              </div>

              <div>
                <Label htmlFor="relationship">Parentesco/Relação *</Label>
                <Select value={emergencyContact.relationship} onValueChange={(value) => setEmergencyContact({ ...emergencyContact, relationship: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o parentesco" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pai">Pai</SelectItem>
                    <SelectItem value="mae">Mãe</SelectItem>
                    <SelectItem value="irmao">Irmão(ã)</SelectItem>
                    <SelectItem value="conjuge">Cônjuge</SelectItem>
                    <SelectItem value="filho">Filho(a)</SelectItem>
                    <SelectItem value="amigo">Amigo(a)</SelectItem>
                    <SelectItem value="outro">Outro</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="emergencyPhone">Telefone *</Label>
                  <Input
                    id="emergencyPhone"
                    value={emergencyContact.phone}
                    onChange={(e) => setEmergencyContact({ ...emergencyContact, phone: e.target.value })}
                    placeholder="(11) 1234-5678"
                  />
                </div>
                <div>
                  <Label htmlFor="emergencyCellPhone">Celular</Label>
                  <Input
                    id="emergencyCellPhone"
                    value={emergencyContact.cellPhone}
                    onChange={(e) => setEmergencyContact({ ...emergencyContact, cellPhone: e.target.value })}
                    placeholder="(11) 99999-9999"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {currentStep === 5 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-violet-400" />
                Termos e Consentimento
              </CardTitle>
              <CardDescription>
                Consentimentos necessários para o atendimento
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="dataProcessing"
                    checked={consent.dataProcessing}
                    onCheckedChange={(checked) => setConsent({ ...consent, dataProcessing: checked as boolean })}
                  />
                  <div className="grid gap-1.5 leading-none">
                    <Label htmlFor="dataProcessing" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Consentimento para Tratamento de Dados *
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      Autorizo o uso dos meus dados pessoais para fins de atendimento médico, conforme a LGPD.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="medicalTreatment"
                    checked={consent.medicalTreatment}
                    onCheckedChange={(checked) => setConsent({ ...consent, medicalTreatment: checked as boolean })}
                  />
                  <div className="grid gap-1.5 leading-none">
                    <Label htmlFor="medicalTreatment" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Consentimento para Tratamento Médico *
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      Autorizo a realização de procedimentos médicos necessários para meu tratamento.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="communicationConsent"
                    checked={consent.communicationConsent}
                    onCheckedChange={(checked) => setConsent({ ...consent, communicationConsent: checked as boolean })}
                  />
                  <div className="grid gap-1.5 leading-none">
                    <Label htmlFor="communicationConsent" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Consentimento para Comunicação
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      Autorizo o recebimento de comunicações sobre consultas, exames e resultados.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-accent/50 rounded-lg">
                <h4 className="font-medium mb-2">Resumo do Cadastro</h4>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <p><strong>Nome:</strong> {personalInfo.fullName || "Não informado"}</p>
                  <p><strong>CPF:</strong> {personalInfo.cpf || "Não informado"}</p>
                  <p><strong>Data de Nascimento:</strong> {personalInfo.birthDate || "Não informado"}</p>
                  <p><strong>Telefone:</strong> {contactInfo.phone || "Não informado"}</p>
                  <p><strong>Contato de Emergência:</strong> {emergencyContact.name || "Não informado"}</p>
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
          
          {currentStep < 5 ? (
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
              Cadastrar Paciente
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
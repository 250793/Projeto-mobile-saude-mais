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
  MapPin, 
  Save,
  Building,
  Phone,
  Mail,
  Clock,
  Users,
  Stethoscope,
  Plus,
  Trash2
} from "lucide-react";

interface HealthUnitRegistrationProps {
  onBack: () => void;
  onSave: (unit: any) => void;
}

export function HealthUnitRegistration({ onBack, onSave }: HealthUnitRegistrationProps) {
  const [unitData, setUnitData] = useState({
    name: "",
    code: "",
    type: "",
    cnpj: "",
    phone: "",
    email: "",
    address: "",
    addressNumber: "",
    complement: "",
    neighborhood: "",
    city: "",
    state: "",
    zipCode: "",
    operatingHours: {
      monday: { start: "", end: "", closed: false },
      tuesday: { start: "", end: "", closed: false },
      wednesday: { start: "", end: "", closed: false },
      thursday: { start: "", end: "", closed: false },
      friday: { start: "", end: "", closed: false },
      saturday: { start: "", end: "", closed: true },
      sunday: { start: "", end: "", closed: true }
    },
    services: [],
    specialties: [],
    capacity: "",
    manager: "",
    managerPhone: "",
    observations: ""
  });

  const [newService, setNewService] = useState("");
  const [newSpecialty, setNewSpecialty] = useState("");

  const unitTypes = [
    "UBS - Unidade Básica de Saúde",
    "ESF - Estratégia Saúde da Família",
    "UPA - Unidade de Pronto Atendimento",
    "Centro de Especialidades",
    "Hospital",
    "Clínica",
    "Laboratório",
    "Centro de Imagem"
  ];

  const availableServices = [
    "Consultas Médicas",
    "Enfermagem",
    "Vacinação",
    "Farmácia",
    "Odontologia",
    "Psicologia",
    "Fisioterapia",
    "Nutrição",
    "Assistência Social",
    "Coleta de Exames",
    "Pequenas Cirurgias",
    "Curativos",
    "Nebulização",
    "Aplicação de Medicamentos"
  ];

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

  const brazilianStates = [
    "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", 
    "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", 
    "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"
  ];

  const daysOfWeek = [
    { key: "monday", label: "Segunda-feira" },
    { key: "tuesday", label: "Terça-feira" },
    { key: "wednesday", label: "Quarta-feira" },
    { key: "thursday", label: "Quinta-feira" },
    { key: "friday", label: "Sexta-feira" },
    { key: "saturday", label: "Sábado" },
    { key: "sunday", label: "Domingo" }
  ];

  const handleOperatingHoursChange = (day: string, field: string, value: string | boolean) => {
    setUnitData({
      ...unitData,
      operatingHours: {
        ...unitData.operatingHours,
        [day]: {
          ...unitData.operatingHours[day],
          [field]: value
        }
      }
    });
  };

  const addService = () => {
    if (newService && !unitData.services.includes(newService)) {
      setUnitData({
        ...unitData,
        services: [...unitData.services, newService]
      });
      setNewService("");
    }
  };

  const removeService = (service: string) => {
    setUnitData({
      ...unitData,
      services: unitData.services.filter(s => s !== service)
    });
  };

  const addSpecialty = () => {
    if (newSpecialty && !unitData.specialties.includes(newSpecialty)) {
      setUnitData({
        ...unitData,
        specialties: [...unitData.specialties, newSpecialty]
      });
      setNewSpecialty("");
    }
  };

  const removeSpecialty = (specialty: string) => {
    setUnitData({
      ...unitData,
      specialties: unitData.specialties.filter(s => s !== specialty)
    });
  };

  const handleSave = () => {
    const unitWithId = {
      ...unitData,
      id: `UNIT${String(Date.now()).slice(-4)}`,
      registrationDate: new Date().toLocaleDateString('pt-BR'),
      status: "active"
    };
    
    onSave(unitWithId);
  };

  const validateForm = () => {
    return unitData.name && unitData.type && unitData.address && unitData.city && unitData.manager;
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
              <MapPin className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg">Cadastrar Unidade de Saúde</h1>
              <p className="text-sm text-muted-foreground">Registre uma nova unidade no sistema</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 max-w-4xl mx-auto space-y-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="w-5 h-5 text-sky-400" />
              Informações Básicas
            </CardTitle>
            <CardDescription>
              Dados principais da unidade de saúde
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Nome da Unidade *</Label>
                <Input
                  id="name"
                  value={unitData.name}
                  onChange={(e) => setUnitData({ ...unitData, name: e.target.value })}
                  placeholder="Ex: UBS Centro"
                />
              </div>
              <div>
                <Label htmlFor="code">Código da Unidade</Label>
                <Input
                  id="code"
                  value={unitData.code}
                  onChange={(e) => setUnitData({ ...unitData, code: e.target.value })}
                  placeholder="Ex: UBS001"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="type">Tipo de Unidade *</Label>
                <Select value={unitData.type} onValueChange={(value) => setUnitData({ ...unitData, type: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    {unitTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="cnpj">CNPJ</Label>
                <Input
                  id="cnpj"
                  value={unitData.cnpj}
                  onChange={(e) => setUnitData({ ...unitData, cnpj: e.target.value })}
                  placeholder="00.000.000/0000-00"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone">Telefone</Label>
                <Input
                  id="phone"
                  value={unitData.phone}
                  onChange={(e) => setUnitData({ ...unitData, phone: e.target.value })}
                  placeholder="(11) 1234-5678"
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={unitData.email}
                  onChange={(e) => setUnitData({ ...unitData, email: e.target.value })}
                  placeholder="contato@unidade.gov.br"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Address Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-emerald-400" />
              Endereço
            </CardTitle>
            <CardDescription>
              Localização da unidade de saúde
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <Label htmlFor="address">Logradouro *</Label>
                <Input
                  id="address"
                  value={unitData.address}
                  onChange={(e) => setUnitData({ ...unitData, address: e.target.value })}
                  placeholder="Rua, Avenida, etc."
                />
              </div>
              <div>
                <Label htmlFor="addressNumber">Número</Label>
                <Input
                  id="addressNumber"
                  value={unitData.addressNumber}
                  onChange={(e) => setUnitData({ ...unitData, addressNumber: e.target.value })}
                  placeholder="123"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="complement">Complemento</Label>
                <Input
                  id="complement"
                  value={unitData.complement}
                  onChange={(e) => setUnitData({ ...unitData, complement: e.target.value })}
                  placeholder="Bloco, Andar, Sala..."
                />
              </div>
              <div>
                <Label htmlFor="neighborhood">Bairro</Label>
                <Input
                  id="neighborhood"
                  value={unitData.neighborhood}
                  onChange={(e) => setUnitData({ ...unitData, neighborhood: e.target.value })}
                  placeholder="Nome do bairro"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="city">Cidade *</Label>
                <Input
                  id="city"
                  value={unitData.city}
                  onChange={(e) => setUnitData({ ...unitData, city: e.target.value })}
                  placeholder="Nome da cidade"
                />
              </div>
              <div>
                <Label htmlFor="state">Estado</Label>
                <Select value={unitData.state} onValueChange={(value) => setUnitData({ ...unitData, state: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="UF" />
                  </SelectTrigger>
                  <SelectContent>
                    {brazilianStates.map((state) => (
                      <SelectItem key={state} value={state}>
                        {state}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="zipCode">CEP</Label>
                <Input
                  id="zipCode"
                  value={unitData.zipCode}
                  onChange={(e) => setUnitData({ ...unitData, zipCode: e.target.value })}
                  placeholder="00000-000"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Operating Hours */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-amber-400" />
              Horário de Funcionamento
            </CardTitle>
            <CardDescription>
              Configure os horários de atendimento
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {daysOfWeek.map((day) => (
              <div key={day.key} className="flex items-center gap-4 p-3 border border-border rounded-lg">
                <div className="w-24">
                  <Label>{day.label}</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={unitData.operatingHours[day.key].closed}
                    onCheckedChange={(checked) => handleOperatingHoursChange(day.key, "closed", checked)}
                  />
                  <Label className="text-sm">Fechado</Label>
                </div>
                {!unitData.operatingHours[day.key].closed && (
                  <div className="flex items-center gap-2">
                    <Input
                      type="time"
                      value={unitData.operatingHours[day.key].start}
                      onChange={(e) => handleOperatingHoursChange(day.key, "start", e.target.value)}
                      className="w-32"
                    />
                    <span>às</span>
                    <Input
                      type="time"
                      value={unitData.operatingHours[day.key].end}
                      onChange={(e) => handleOperatingHoursChange(day.key, "end", e.target.value)}
                      className="w-32"
                    />
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Services and Specialties */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-violet-400" />
                Serviços Oferecidos
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Select value={newService} onValueChange={setNewService}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um serviço" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableServices.filter(service => !unitData.services.includes(service)).map((service) => (
                      <SelectItem key={service} value={service}>
                        {service}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button onClick={addService} variant="outline">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {unitData.services.map((service) => (
                  <Badge key={service} variant="secondary" className="flex items-center gap-1">
                    {service}
                    <button onClick={() => removeService(service)}>
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Stethoscope className="w-5 h-5 text-rose-400" />
                Especialidades Médicas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Select value={newSpecialty} onValueChange={setNewSpecialty}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma especialidade" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableSpecialties.filter(specialty => !unitData.specialties.includes(specialty)).map((specialty) => (
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
              <div className="flex flex-wrap gap-2">
                {unitData.specialties.map((specialty) => (
                  <Badge key={specialty} variant="secondary" className="flex items-center gap-1">
                    {specialty}
                    <button onClick={() => removeSpecialty(specialty)}>
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Management Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-indigo-400" />
              Informações de Gestão
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="capacity">Capacidade de Atendimento/Dia</Label>
                <Input
                  id="capacity"
                  type="number"
                  value={unitData.capacity}
                  onChange={(e) => setUnitData({ ...unitData, capacity: e.target.value })}
                  placeholder="100"
                />
              </div>
              <div>
                <Label htmlFor="manager">Gestor Responsável *</Label>
                <Input
                  id="manager"
                  value={unitData.manager}
                  onChange={(e) => setUnitData({ ...unitData, manager: e.target.value })}
                  placeholder="Nome do gestor"
                />
              </div>
              <div>
                <Label htmlFor="managerPhone">Telefone do Gestor</Label>
                <Input
                  id="managerPhone"
                  value={unitData.managerPhone}
                  onChange={(e) => setUnitData({ ...unitData, managerPhone: e.target.value })}
                  placeholder="(11) 99999-9999"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="observations">Observações</Label>
              <Textarea
                id="observations"
                value={unitData.observations}
                onChange={(e) => setUnitData({ ...unitData, observations: e.target.value })}
                placeholder="Informações adicionais sobre a unidade..."
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          <Button variant="outline" onClick={onBack}>
            Cancelar
          </Button>
          <Button onClick={handleSave} disabled={!validateForm()}>
            <Save className="w-4 h-4 mr-2" />
            Cadastrar Unidade
          </Button>
        </div>
      </div>
    </div>
  );
}
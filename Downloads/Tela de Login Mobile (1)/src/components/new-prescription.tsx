import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { 
  ArrowLeft, 
  Pill, 
  Plus, 
  X, 
  Save,
  Search,
  FileText
} from "lucide-react";

interface NewPrescriptionProps {
  onBack: () => void;
  onSave: (prescription: any) => void;
  selectedPatient?: { id: string; name: string; };
}

export function NewPrescription({ onBack, onSave, selectedPatient }: NewPrescriptionProps) {
  const [patientSearch, setPatientSearch] = useState(selectedPatient?.name || "");
  const [selectedPatientData, setSelectedPatientData] = useState(selectedPatient || null);
  const [medications, setMedications] = useState([
    { name: "", dosage: "", frequency: "", duration: "", instructions: "" }
  ]);
  const [prescriptionNotes, setPrescriptionNotes] = useState("");

  // Mock data para busca de pacientes
  const patients = [
    { id: "P001", name: "Maria Silva", age: 65 },
    { id: "P002", name: "João Santos", age: 42 },
    { id: "P003", name: "Ana Costa", age: 38 },
    { id: "P004", name: "Pedro Oliveira", age: 55 },
    { id: "P005", name: "Lucia Ferreira", age: 48 }
  ];

  // Medicamentos comuns para sugestão
  const commonMedications = [
    "Losartana Potássica 50mg",
    "Metformina 850mg",
    "Sinvastatina 20mg",
    "Omeprazol 20mg",
    "Dipirona 500mg",
    "Paracetamol 750mg",
    "Ibuprofeno 400mg",
    "Amoxicilina 500mg",
    "Captopril 25mg",
    "Hidroclorotiazida 25mg"
  ];

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(patientSearch.toLowerCase())
  );

  const addMedication = () => {
    setMedications([...medications, { name: "", dosage: "", frequency: "", duration: "", instructions: "" }]);
  };

  const removeMedication = (index: number) => {
    if (medications.length > 1) {
      setMedications(medications.filter((_, i) => i !== index));
    }
  };

  const updateMedication = (index: number, field: string, value: string) => {
    const updatedMedications = medications.map((med, i) => 
      i === index ? { ...med, [field]: value } : med
    );
    setMedications(updatedMedications);
  };

  const handleSave = () => {
    if (!selectedPatientData) {
      alert("Selecione um paciente");
      return;
    }

    const validMedications = medications.filter(med => med.name && med.dosage);
    if (validMedications.length === 0) {
      alert("Adicione pelo menos um medicamento");
      return;
    }

    const prescription = {
      id: Date.now(),
      patientId: selectedPatientData.id,
      patientName: selectedPatientData.name,
      date: new Date().toLocaleDateString('pt-BR'),
      medications: validMedications,
      notes: prescriptionNotes,
      doctor: "Dr. Ana Silva", // Em uma aplicação real, seria o médico logado
      validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('pt-BR'),
      status: "ativa"
    };

    onSave(prescription);
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
              <Pill className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg">Nova Receita Digital</h1>
              <p className="text-sm text-muted-foreground">Prescrever medicamentos</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 max-w-4xl mx-auto space-y-6">
        {/* Seleção de Paciente */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="w-5 h-5 text-sky-400" />
              Selecionar Paciente
            </CardTitle>
            <CardDescription>
              Busque e selecione o paciente para prescrever medicamentos
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="patientSearch">Buscar Paciente</Label>
              <Input
                id="patientSearch"
                value={patientSearch}
                onChange={(e) => setPatientSearch(e.target.value)}
                placeholder="Digite o nome do paciente..."
                disabled={!!selectedPatient}
              />
            </div>
            
            {!selectedPatientData && patientSearch && (
              <div className="space-y-2">
                <Label>Pacientes Encontrados:</Label>
                <div className="border rounded-lg max-h-48 overflow-y-auto">
                  {filteredPatients.map((patient) => (
                    <button
                      key={patient.id}
                      onClick={() => {
                        setSelectedPatientData(patient);
                        setPatientSearch(patient.name);
                      }}
                      className="w-full p-3 text-left hover:bg-accent transition-colors border-b last:border-b-0"
                    >
                      <div>
                        <p className="font-medium">{patient.name}</p>
                        <p className="text-sm text-muted-foreground">ID: {patient.id} • {patient.age} anos</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {selectedPatientData && (
              <div className="bg-accent/50 p-3 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{selectedPatientData.name}</p>
                    <p className="text-sm text-muted-foreground">ID: {selectedPatientData.id}</p>
                  </div>
                  {!selectedPatient && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSelectedPatientData(null);
                        setPatientSearch("");
                      }}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Medicamentos */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Pill className="w-5 h-5 text-rose-400" />
                  Medicamentos
                </CardTitle>
                <CardDescription>
                  Adicione os medicamentos a serem prescritos
                </CardDescription>
              </div>
              <Button onClick={addMedication} variant="outline" size="sm">
                <Plus className="w-4 h-4 mr-1" />
                Adicionar
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {medications.map((medication, index) => (
              <div key={index} className="p-4 border rounded-lg space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Medicamento {index + 1}</h4>
                  {medications.length > 1 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeMedication(index)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor={`medication-name-${index}`}>Nome do Medicamento</Label>
                    <Select
                      value={medication.name}
                      onValueChange={(value) => updateMedication(index, 'name', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o medicamento" />
                      </SelectTrigger>
                      <SelectContent>
                        {commonMedications.map((med) => (
                          <SelectItem key={med} value={med}>
                            {med}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor={`medication-dosage-${index}`}>Dosagem</Label>
                    <Input
                      id={`medication-dosage-${index}`}
                      value={medication.dosage}
                      onChange={(e) => updateMedication(index, 'dosage', e.target.value)}
                      placeholder="Ex: 1 comprimido"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor={`medication-frequency-${index}`}>Frequência</Label>
                    <Select
                      value={medication.frequency}
                      onValueChange={(value) => updateMedication(index, 'frequency', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a frequência" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1x ao dia">1x ao dia</SelectItem>
                        <SelectItem value="2x ao dia">2x ao dia</SelectItem>
                        <SelectItem value="3x ao dia">3x ao dia</SelectItem>
                        <SelectItem value="4x ao dia">4x ao dia</SelectItem>
                        <SelectItem value="de 8/8 horas">De 8/8 horas</SelectItem>
                        <SelectItem value="de 12/12 horas">De 12/12 horas</SelectItem>
                        <SelectItem value="quando necessário">Quando necessário</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor={`medication-duration-${index}`}>Duração</Label>
                    <Select
                      value={medication.duration}
                      onValueChange={(value) => updateMedication(index, 'duration', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a duração" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="7 dias">7 dias</SelectItem>
                        <SelectItem value="10 dias">10 dias</SelectItem>
                        <SelectItem value="14 dias">14 dias</SelectItem>
                        <SelectItem value="21 dias">21 dias</SelectItem>
                        <SelectItem value="30 dias">30 dias</SelectItem>
                        <SelectItem value="uso contínuo">Uso contínuo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor={`medication-instructions-${index}`}>Instruções de Uso</Label>
                  <Textarea
                    id={`medication-instructions-${index}`}
                    value={medication.instructions}
                    onChange={(e) => updateMedication(index, 'instructions', e.target.value)}
                    placeholder="Ex: Tomar em jejum com água, 30 minutos antes das refeições..."
                    rows={2}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Observações */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-amber-400" />
              Observações da Receita
            </CardTitle>
            <CardDescription>
              Informações adicionais ou orientações especiais
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={prescriptionNotes}
              onChange={(e) => setPrescriptionNotes(e.target.value)}
              placeholder="Orientações gerais, cuidados especiais, contraindicações..."
              rows={4}
            />
          </CardContent>
        </Card>

        {/* Ações */}
        <div className="flex gap-3">
          <Button variant="outline" onClick={onBack}>
            Cancelar
          </Button>
          <Button onClick={handleSave} className="flex-1" disabled={!selectedPatientData}>
            <Save className="w-4 h-4 mr-2" />
            Salvar Receita
          </Button>
        </div>
      </div>
    </div>
  );
}
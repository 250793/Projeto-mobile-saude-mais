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
  TestTube, 
  Save,
  Search,
  FileText,
  X
} from "lucide-react";

interface NewExamRequestProps {
  onBack: () => void;
  onSave: (examRequest: any) => void;
  selectedPatient?: { id: string; name: string; };
}

export function NewExamRequest({ onBack, onSave, selectedPatient }: NewExamRequestProps) {
  const [patientSearch, setPatientSearch] = useState(selectedPatient?.name || "");
  const [selectedPatientData, setSelectedPatientData] = useState(selectedPatient || null);
  const [selectedExams, setSelectedExams] = useState<string[]>([]);
  const [clinicalIndication, setClinicalIndication] = useState("");
  const [urgency, setUrgency] = useState("normal");
  const [observations, setObservations] = useState("");

  // Mock data para busca de pacientes
  const patients = [
    { id: "P001", name: "Maria Silva", age: 65 },
    { id: "P002", name: "João Santos", age: 42 },
    { id: "P003", name: "Ana Costa", age: 38 },
    { id: "P004", name: "Pedro Oliveira", age: 55 },
    { id: "P005", name: "Lucia Ferreira", age: 48 }
  ];

  // Exames organizados por categoria
  const examCategories = {
    "Exames de Sangue": [
      "Hemograma Completo",
      "Glicemia de Jejum",
      "Colesterol Total e Frações",
      "Triglicerídeos",
      "Ureia e Creatinina",
      "TGO/TGP (Transaminases)",
      "TSH e T4 Livre",
      "Proteína C Reativa (PCR)",
      "VHS (Velocidade de Hemossedimentação)",
      "Ácido Úrico"
    ],
    "Exames de Urina": [
      "Urina Tipo I (EAS)",
      "Urocultura",
      "Urina 24 horas",
      "Microalbuminúria"
    ],
    "Exames de Imagem": [
      "Raio-X de Tórax",
      "Raio-X de Abdome",
      "Ultrassonografia Abdominal",
      "Ultrassonografia Pélvica",
      "Tomografia Computadorizada",
      "Ressonância Magnética",
      "Ecocardiograma",
      "Ultrassom Doppler"
    ],
    "Exames Cardiológicos": [
      "Eletrocardiograma (ECG)",
      "Teste Ergométrico",
      "MAPA (24 horas)",
      "Holter 24 horas",
      "Ecocardiograma com Doppler"
    ],
    "Outros Exames": [
      "Espirometria",
      "Endoscopia Digestiva Alta",
      "Colonoscopia",
      "Mamografia",
      "Papanicolaou",
      "Densitometria Óssea"
    ]
  };

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(patientSearch.toLowerCase())
  );

  const handleExamToggle = (exam: string, checked: boolean) => {
    if (checked) {
      setSelectedExams([...selectedExams, exam]);
    } else {
      setSelectedExams(selectedExams.filter(e => e !== exam));
    }
  };

  const handleSave = () => {
    if (!selectedPatientData) {
      alert("Selecione um paciente");
      return;
    }

    if (selectedExams.length === 0) {
      alert("Selecione pelo menos um exame");
      return;
    }

    if (!clinicalIndication.trim()) {
      alert("Informe a indicação clínica");
      return;
    }

    const examRequest = {
      id: Date.now(),
      patientId: selectedPatientData.id,
      patientName: selectedPatientData.name,
      date: new Date().toLocaleDateString('pt-BR'),
      exams: selectedExams,
      clinicalIndication,
      urgency,
      observations,
      doctor: "Dr. Ana Silva", // Em uma aplicação real, seria o médico logado
      status: "solicitado"
    };

    onSave(examRequest);
  };

  const getUrgencyColor = (level: string) => {
    switch (level) {
      case "urgente":
        return "text-red-700 bg-red-100";
      case "prioritario":
        return "text-amber-700 bg-amber-100";
      default:
        return "text-slate-700 bg-slate-100";
    }
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
              <TestTube className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg">Solicitar Exames</h1>
              <p className="text-sm text-muted-foreground">Solicitação de exames complementares</p>
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
              Busque e selecione o paciente para solicitar exames
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

        {/* Seleção de Exames */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TestTube className="w-5 h-5 text-emerald-400" />
              Selecionar Exames
            </CardTitle>
            <CardDescription>
              Escolha os exames a serem solicitados
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {Object.entries(examCategories).map(([category, exams]) => (
              <div key={category} className="space-y-3">
                <h4 className="font-medium text-primary">{category}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {exams.map((exam) => (
                    <div key={exam} className="flex items-center space-x-2">
                      <Checkbox
                        id={exam}
                        checked={selectedExams.includes(exam)}
                        onCheckedChange={(checked) => handleExamToggle(exam, checked as boolean)}
                      />
                      <Label htmlFor={exam} className="text-sm font-normal cursor-pointer">
                        {exam}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            
            {selectedExams.length > 0 && (
              <div className="bg-accent/50 p-3 rounded-lg">
                <h4 className="font-medium mb-2">Exames Selecionados ({selectedExams.length}):</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedExams.map((exam) => (
                    <span key={exam} className="bg-primary/10 text-primary px-2 py-1 rounded text-sm">
                      {exam}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Indicação Clínica */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-amber-400" />
              Indicação Clínica
            </CardTitle>
            <CardDescription>
              Justificativa médica para os exames solicitados
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="clinicalIndication">Indicação Clínica *</Label>
              <Textarea
                id="clinicalIndication"
                value={clinicalIndication}
                onChange={(e) => setClinicalIndication(e.target.value)}
                placeholder="Descreva a indicação clínica para os exames solicitados..."
                rows={4}
              />
            </div>
            
            <div>
              <Label htmlFor="urgency">Prioridade</Label>
              <Select value={urgency} onValueChange={setUrgency}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="prioritario">Prioritário</SelectItem>
                  <SelectItem value="urgente">Urgente</SelectItem>
                </SelectContent>
              </Select>
              <div className="mt-2">
                <span className={`text-xs px-2 py-1 rounded-full ${getUrgencyColor(urgency)}`}>
                  {urgency === "normal" && "Agendamento normal"}
                  {urgency === "prioritario" && "Prioridade no agendamento"}
                  {urgency === "urgente" && "Realizar com urgência"}
                </span>
              </div>
            </div>
            
            <div>
              <Label htmlFor="observations">Observações</Label>
              <Textarea
                id="observations"
                value={observations}
                onChange={(e) => setObservations(e.target.value)}
                placeholder="Informações adicionais, preparos específicos, contraindicações..."
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Resumo da Solicitação */}
        {selectedPatientData && selectedExams.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Resumo da Solicitação</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Paciente:</span>
                <span className="font-medium">{selectedPatientData.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Quantidade de exames:</span>
                <span className="font-medium">{selectedExams.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Prioridade:</span>
                <span className={`font-medium capitalize ${urgency === 'urgente' ? 'text-red-600' : urgency === 'prioritario' ? 'text-amber-600' : ''}`}>
                  {urgency}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Data:</span>
                <span className="font-medium">{new Date().toLocaleDateString('pt-BR')}</span>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Ações */}
        <div className="flex gap-3">
          <Button variant="outline" onClick={onBack}>
            Cancelar
          </Button>
          <Button 
            onClick={handleSave} 
            className="flex-1" 
            disabled={!selectedPatientData || selectedExams.length === 0}
          >
            <Save className="w-4 h-4 mr-2" />
            Solicitar Exames
          </Button>
        </div>
      </div>
    </div>
  );
}
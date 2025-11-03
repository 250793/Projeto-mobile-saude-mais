import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Separator } from "./ui/separator";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { 
  ArrowLeft, 
  FileText, 
  Plus, 
  Edit, 
  Save,
  X,
  Stethoscope,
  TestTube,
  Pill,
  Calendar
} from "lucide-react";

interface MedicalRecordEditorProps {
  patientName: string;
  patientId: string;
  onBack: () => void;
}

export function MedicalRecordEditor({ patientName, patientId, onBack }: MedicalRecordEditorProps) {
  const [isAddingRecord, setIsAddingRecord] = useState(false);
  const [isAddingExam, setIsAddingExam] = useState(false);
  const [isAddingPrescription, setIsAddingPrescription] = useState(false);
  
  const [newRecord, setNewRecord] = useState({
    diagnosis: "",
    treatment: "",
    notes: "",
    status: "em_tratamento"
  });

  const [newExam, setNewExam] = useState({
    name: "",
    type: "sangue",
    results: "",
    status: "normal"
  });

  const [newPrescription, setNewPrescription] = useState({
    medications: [{ name: "", dosage: "", duration: "", instructions: "" }]
  });

  // Mock data - em uma aplicação real, estes dados viriam de uma API
  const [medicalHistory, setMedicalHistory] = useState([
    {
      id: 1,
      date: "15 Set 2024",
      doctor: "Dr. Ana Silva",
      specialty: "Cardiologia",
      diagnosis: "Hipertensão arterial leve",
      treatment: "Medicação anti-hipertensiva, dieta com baixo teor de sódio",
      notes: "Paciente apresenta pressão arterial levemente elevada. Recomendado acompanhamento mensal.",
      status: "em_tratamento"
    }
  ]);

  const [examResults, setExamResults] = useState([
    {
      id: 1,
      name: "Hemograma Completo",
      date: "20 Set 2024",
      doctor: "Dr. Ana Silva",
      status: "normal",
      type: "sangue",
      results: "Hemoglobina: 14.2 g/dL, Hematócritos: 42%, Leucócitos: 7.500/mm³"
    }
  ]);

  const [prescriptions, setPrescriptions] = useState([
    {
      id: 1,
      date: "20 Set 2024",
      doctor: "Dr. Ana Silva",
      specialty: "Cardiologia",
      medications: [
        {
          name: "Losartana Potássica 50mg",
          dosage: "1 comprimido pela manhã",
          duration: "Uso contínuo",
          instructions: "Tomar em jejum com água"
        }
      ],
      valid_until: "20 Out 2024",
      status: "ativa"
    }
  ]);

  const handleAddRecord = () => {
    if (newRecord.diagnosis && newRecord.treatment) {
      const record = {
        id: Date.now(),
        date: new Date().toLocaleDateString('pt-BR'),
        doctor: "Dr. Ana Silva", // Em uma aplicação real, seria o médico logado
        specialty: "Cardiologia",
        ...newRecord
      };
      
      setMedicalHistory([record, ...medicalHistory]);
      setNewRecord({ diagnosis: "", treatment: "", notes: "", status: "em_tratamento" });
      setIsAddingRecord(false);
    }
  };

  const handleAddExam = () => {
    if (newExam.name && newExam.results) {
      const exam = {
        id: Date.now(),
        date: new Date().toLocaleDateString('pt-BR'),
        doctor: "Dr. Ana Silva",
        ...newExam
      };
      
      setExamResults([exam, ...examResults]);
      setNewExam({ name: "", type: "sangue", results: "", status: "normal" });
      setIsAddingExam(false);
    }
  };

  const handleAddPrescription = () => {
    if (newPrescription.medications.some(med => med.name && med.dosage)) {
      const prescription = {
        id: Date.now(),
        date: new Date().toLocaleDateString('pt-BR'),
        doctor: "Dr. Ana Silva",
        specialty: "Cardiologia",
        medications: newPrescription.medications.filter(med => med.name && med.dosage),
        valid_until: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('pt-BR'),
        status: "ativa"
      };
      
      setPrescriptions([prescription, ...prescriptions]);
      setNewPrescription({ medications: [{ name: "", dosage: "", duration: "", instructions: "" }] });
      setIsAddingPrescription(false);
    }
  };

  const addMedicationField = () => {
    setNewPrescription({
      medications: [...newPrescription.medications, { name: "", dosage: "", duration: "", instructions: "" }]
    });
  };

  const removeMedicationField = (index: number) => {
    setNewPrescription({
      medications: newPrescription.medications.filter((_, i) => i !== index)
    });
  };

  const updateMedication = (index: number, field: string, value: string) => {
    const updatedMedications = newPrescription.medications.map((med, i) => 
      i === index ? { ...med, [field]: value } : med
    );
    setNewPrescription({ medications: updatedMedications });
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "normal":
        return "bg-emerald-100 text-emerald-800";
      case "alterado":
        return "bg-amber-100 text-amber-800";
      case "em_tratamento":
        return "bg-sky-100 text-sky-800";
      case "controlado":
        return "bg-emerald-100 text-emerald-800";
      case "ativa":
        return "bg-emerald-100 text-emerald-800";
      default:
        return "bg-slate-100 text-slate-800";
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
              <FileText className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg">Prontuário - {patientName}</h1>
              <p className="text-sm text-muted-foreground">ID: {patientId}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 max-w-4xl mx-auto space-y-6">
        {/* Histórico Médico */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Stethoscope className="w-5 h-5 text-sky-400" />
                  Histórico de Consultas
                </CardTitle>
                <CardDescription>
                  Registro de consultas e diagnósticos
                </CardDescription>
              </div>
              <Dialog open={isAddingRecord} onOpenChange={setIsAddingRecord}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Nova Entrada
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Adicionar Nova Entrada ao Histórico</DialogTitle>
                    <DialogDescription>
                      Registre um novo diagnóstico ou observação médica
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="diagnosis">Diagnóstico</Label>
                      <Input
                        id="diagnosis"
                        value={newRecord.diagnosis}
                        onChange={(e) => setNewRecord({ ...newRecord, diagnosis: e.target.value })}
                        placeholder="Ex: Hipertensão arterial..."
                      />
                    </div>
                    <div>
                      <Label htmlFor="treatment">Tratamento</Label>
                      <Textarea
                        id="treatment"
                        value={newRecord.treatment}
                        onChange={(e) => setNewRecord({ ...newRecord, treatment: e.target.value })}
                        placeholder="Descreva o tratamento prescrito..."
                      />
                    </div>
                    <div>
                      <Label htmlFor="notes">Observações</Label>
                      <Textarea
                        id="notes"
                        value={newRecord.notes}
                        onChange={(e) => setNewRecord({ ...newRecord, notes: e.target.value })}
                        placeholder="Observações adicionais..."
                      />
                    </div>
                    <div>
                      <Label htmlFor="status">Status</Label>
                      <Select value={newRecord.status} onValueChange={(value) => setNewRecord({ ...newRecord, status: value })}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="em_tratamento">Em Tratamento</SelectItem>
                          <SelectItem value="controlado">Controlado</SelectItem>
                          <SelectItem value="resolvido">Resolvido</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsAddingRecord(false)}>
                      Cancelar
                    </Button>
                    <Button onClick={handleAddRecord}>
                      <Save className="w-4 h-4 mr-2" />
                      Salvar
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {medicalHistory.map((record, index) => (
              <div key={record.id}>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span className="font-medium">{record.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getStatusColor(record.status)}>
                        {record.status.replace('_', ' ')}
                      </Badge>
                      <Button variant="ghost" size="sm">
                        <Edit className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium mb-1">Diagnóstico</h4>
                      <p className="text-sm text-muted-foreground">{record.diagnosis}</p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Médico</h4>
                      <p className="text-sm text-muted-foreground">{record.doctor}</p>
                      <p className="text-xs text-muted-foreground">{record.specialty}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-1">Tratamento</h4>
                    <p className="text-sm text-muted-foreground">{record.treatment}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-1">Observações</h4>
                    <p className="text-sm text-muted-foreground">{record.notes}</p>
                  </div>
                </div>
                {index < medicalHistory.length - 1 && <Separator className="mt-4" />}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Exames */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <TestTube className="w-5 h-5 text-emerald-400" />
                  Resultados de Exames
                </CardTitle>
                <CardDescription>
                  Exames realizados e seus resultados
                </CardDescription>
              </div>
              <Dialog open={isAddingExam} onOpenChange={setIsAddingExam}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Adicionar Exame
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Adicionar Resultado de Exame</DialogTitle>
                    <DialogDescription>
                      Registre um novo resultado de exame
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="examName">Nome do Exame</Label>
                      <Input
                        id="examName"
                        value={newExam.name}
                        onChange={(e) => setNewExam({ ...newExam, name: e.target.value })}
                        placeholder="Ex: Hemograma Completo"
                      />
                    </div>
                    <div>
                      <Label htmlFor="examType">Tipo</Label>
                      <Select value={newExam.type} onValueChange={(value) => setNewExam({ ...newExam, type: value })}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sangue">Sangue</SelectItem>
                          <SelectItem value="urina">Urina</SelectItem>
                          <SelectItem value="imagem">Imagem</SelectItem>
                          <SelectItem value="cardíaco">Cardíaco</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="examResults">Resultados</Label>
                      <Textarea
                        id="examResults"
                        value={newExam.results}
                        onChange={(e) => setNewExam({ ...newExam, results: e.target.value })}
                        placeholder="Descreva os resultados do exame..."
                      />
                    </div>
                    <div>
                      <Label htmlFor="examStatus">Status</Label>
                      <Select value={newExam.status} onValueChange={(value) => setNewExam({ ...newExam, status: value })}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="normal">Normal</SelectItem>
                          <SelectItem value="alterado">Alterado</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsAddingExam(false)}>
                      Cancelar
                    </Button>
                    <Button onClick={handleAddExam}>
                      <Save className="w-4 h-4 mr-2" />
                      Salvar
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {examResults.map((exam, index) => (
              <div key={exam.id}>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <TestTube className="w-4 h-4 text-emerald-400" />
                      <span className="font-medium">{exam.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getStatusColor(exam.status)}>
                        {exam.status}
                      </Badge>
                      <Button variant="ghost" size="sm">
                        <Edit className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {exam.date}
                    </div>
                    <span>Tipo: {exam.type}</span>
                  </div>
                  
                  <div className="bg-accent/50 p-3 rounded-lg">
                    <h4 className="font-medium mb-2">Resultados</h4>
                    <p className="text-sm text-muted-foreground">{exam.results}</p>
                  </div>
                </div>
                {index < examResults.length - 1 && <Separator className="mt-4" />}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Receitas */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Pill className="w-5 h-5 text-rose-400" />
                  Receitas Digitais
                </CardTitle>
                <CardDescription>
                  Prescrições médicas digitais
                </CardDescription>
              </div>
              <Dialog open={isAddingPrescription} onOpenChange={setIsAddingPrescription}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Nova Receita
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Criar Nova Receita</DialogTitle>
                    <DialogDescription>
                      Prescreva medicamentos para o paciente
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">Medicamentos</h4>
                        <Button type="button" variant="outline" size="sm" onClick={addMedicationField}>
                          <Plus className="w-3 h-3 mr-1" />
                          Adicionar
                        </Button>
                      </div>
                      
                      {newPrescription.medications.map((medication, index) => (
                        <div key={index} className="p-3 border rounded-lg space-y-3">
                          <div className="flex items-center justify-between">
                            <h5 className="font-medium">Medicamento {index + 1}</h5>
                            {newPrescription.medications.length > 1 && (
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => removeMedicationField(index)}
                              >
                                <X className="w-3 h-3" />
                              </Button>
                            )}
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div>
                              <Label htmlFor={`medication-name-${index}`}>Nome do Medicamento</Label>
                              <Input
                                id={`medication-name-${index}`}
                                value={medication.name}
                                onChange={(e) => updateMedication(index, 'name', e.target.value)}
                                placeholder="Ex: Losartana 50mg"
                              />
                            </div>
                            <div>
                              <Label htmlFor={`medication-dosage-${index}`}>Dosagem</Label>
                              <Input
                                id={`medication-dosage-${index}`}
                                value={medication.dosage}
                                onChange={(e) => updateMedication(index, 'dosage', e.target.value)}
                                placeholder="Ex: 1 comprimido pela manhã"
                              />
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div>
                              <Label htmlFor={`medication-duration-${index}`}>Duração</Label>
                              <Input
                                id={`medication-duration-${index}`}
                                value={medication.duration}
                                onChange={(e) => updateMedication(index, 'duration', e.target.value)}
                                placeholder="Ex: 30 dias"
                              />
                            </div>
                            <div>
                              <Label htmlFor={`medication-instructions-${index}`}>Instruções</Label>
                              <Input
                                id={`medication-instructions-${index}`}
                                value={medication.instructions}
                                onChange={(e) => updateMedication(index, 'instructions', e.target.value)}
                                placeholder="Ex: Tomar com água"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsAddingPrescription(false)}>
                      Cancelar
                    </Button>
                    <Button onClick={handleAddPrescription}>
                      <Save className="w-4 h-4 mr-2" />
                      Criar Receita
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {prescriptions.map((prescription, index) => (
              <div key={prescription.id}>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Pill className="w-4 h-4 text-rose-400" />
                      <span className="font-medium">
                        Receita #{prescription.id.toString().padStart(3, '0')}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getStatusColor(prescription.status)}>
                        {prescription.status}
                      </Badge>
                      <Button variant="ghost" size="sm">
                        <Edit className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {prescription.date}
                    </div>
                    <span>Válida até: {prescription.valid_until}</span>
                  </div>
                  
                  <div className="bg-accent/50 p-3 rounded-lg">
                    <h4 className="font-medium mb-2">Medicamentos</h4>
                    <div className="space-y-3">
                      {prescription.medications.map((med, medIndex) => (
                        <div key={medIndex} className="space-y-1">
                          <div className="flex justify-between items-start">
                            <span className="font-medium text-sm">{med.name}</span>
                            <span className="text-xs text-muted-foreground">{med.duration}</span>
                          </div>
                          <p className="text-sm text-muted-foreground">{med.dosage}</p>
                          <p className="text-xs text-muted-foreground italic">{med.instructions}</p>
                          {medIndex < prescription.medications.length - 1 && (
                            <Separator className="mt-2" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                {index < prescriptions.length - 1 && <Separator className="mt-4" />}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Badge } from "./ui/badge";
import { Checkbox } from "./ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { 
  ArrowLeft, 
  Pill, 
  Save,
  Search,
  User,
  FileText,
  AlertTriangle,
  CheckCircle,
  Package,
  Calendar,
  Plus,
  Minus,
  Receipt,
  Printer
} from "lucide-react";

interface MedicationDispensingProps {
  onBack: () => void;
  onSave: (dispensing: any) => void;
}

export function MedicationDispensing({ onBack, onSave }: MedicationDispensingProps) {
  const [currentStep, setCurrentStep] = useState(1); // 1: Search, 2: Prescription, 3: Dispensing, 4: Confirmation
  const [searchType, setSearchType] = useState("prescription");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  const [dispensingData, setDispensingData] = useState({
    patientId: "",
    patientName: "",
    prescriptionNumber: "",
    doctorName: "",
    medications: [],
    pharmacistNotes: "",
    dispensedBy: "Farmacêutico Atual",
    dispensingDate: new Date().toISOString().split('T')[0],
    dispensingTime: new Date().toTimeString().slice(0, 5)
  });

  // Mock data
  const prescriptions = [
    {
      id: "REC001",
      prescriptionNumber: "24092001",
      patientId: "PAT001",
      patientName: "Maria Silva Santos",
      patientCPF: "123.456.789-00",
      doctorName: "Dr. Ana Silva",
      doctorCRM: "CRM-SP 123456",
      issueDate: "2024-09-20",
      expiryDate: "2024-10-20",
      medications: [
        {
          id: "MED001",
          name: "Losartana Potássica 50mg",
          quantity: 30,
          dosage: "1 comprimido pela manhã",
          currentStock: 150,
          available: true,
          dispensed: false,
          partialQuantity: 30
        },
        {
          id: "MED002", 
          name: "Metformina 850mg",
          quantity: 60,
          dosage: "1 comprimido antes do almoço e jantar",
          currentStock: 15,
          available: false,
          dispensed: false,
          partialQuantity: 15
        }
      ],
      status: "valid",
      controlledMedication: false
    },
    {
      id: "REC002",
      prescriptionNumber: "24092002",
      patientId: "PAT002", 
      patientName: "João Carlos Oliveira",
      patientCPF: "987.654.321-00",
      doctorName: "Dr. João Santos",
      doctorCRM: "CRM-SP 654321",
      issueDate: "2024-09-20",
      expiryDate: "2024-10-20",
      medications: [
        {
          id: "MED003",
          name: "Dipirona Sódica 500mg",
          quantity: 20,
          dosage: "1 comprimido a cada 6 horas se necessário",
          currentStock: 200,
          available: true,
          dispensed: false,
          partialQuantity: 20
        }
      ],
      status: "valid", 
      controlledMedication: false
    }
  ];

  const patients = [
    {
      id: "PAT001",
      name: "Maria Silva Santos",
      cpf: "123.456.789-00",
      phone: "(11) 99999-1234",
      activePrescriptions: 2
    },
    {
      id: "PAT002",
      name: "João Carlos Oliveira", 
      cpf: "987.654.321-00",
      phone: "(11) 99999-5678",
      activePrescriptions: 1
    }
  ];

  const handleSearch = () => {
    if (searchType === "prescription") {
      const found = prescriptions.find(p => 
        p.prescriptionNumber.includes(searchTerm) ||
        p.patientName.toLowerCase().includes(searchTerm.toLowerCase())
      );
      if (found) {
        setSelectedPrescription(found);
        setDispensingData({
          ...dispensingData,
          patientId: found.patientId,
          patientName: found.patientName,
          prescriptionNumber: found.prescriptionNumber,
          doctorName: found.doctorName,
          medications: found.medications.map(med => ({
            ...med,
            dispensed: false,
            partialQuantity: med.available ? med.quantity : med.currentStock
          }))
        });
        setCurrentStep(2);
      }
    }
  };

  const handleMedicationToggle = (medicationId: string, dispensed: boolean) => {
    setDispensingData({
      ...dispensingData,
      medications: dispensingData.medications.map(med =>
        med.id === medicationId ? { ...med, dispensed } : med
      )
    });
  };

  const handleQuantityChange = (medicationId: string, quantity: number) => {
    setDispensingData({
      ...dispensingData,
      medications: dispensingData.medications.map(med =>
        med.id === medicationId ? { ...med, partialQuantity: Math.max(0, Math.min(quantity, med.currentStock)) } : med
      )
    });
  };

  const handleDispense = () => {
    const dispensedMedications = dispensingData.medications.filter(med => med.dispensed);
    
    if (dispensedMedications.length === 0) {
      alert("Selecione pelo menos um medicamento para dispensar.");
      return;
    }

    const dispensingRecord = {
      id: `DISP${String(Date.now()).slice(-4)}`,
      ...dispensingData,
      medications: dispensedMedications,
      dispensingDateTime: new Date().toISOString(),
      status: "completed"
    };

    onSave(dispensingRecord);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "valid":
        return "bg-emerald-100 text-emerald-800";
      case "expired":
        return "bg-red-100 text-red-800";
      case "used":
        return "bg-slate-100 text-slate-800";
      default:
        return "bg-slate-100 text-slate-800";
    }
  };

  const isFormValid = () => {
    return dispensingData.medications.some(med => med.dispensed);
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
              <Pill className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg">Dispensar Medicamentos</h1>
              <p className="text-sm text-muted-foreground">Passo {currentStep} de 3</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 max-w-6xl mx-auto space-y-6">
        {/* Step 1: Search */}
        {currentStep === 1 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="w-5 h-5 text-sky-400" />
                Buscar Receita ou Paciente
              </CardTitle>
              <CardDescription>
                Localize a receita médica ou paciente para dispensação
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Tipo de Busca</Label>
                <Select value={searchType} onValueChange={setSearchType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="prescription">Número da Receita</SelectItem>
                    <SelectItem value="patient">Nome do Paciente</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="search">
                  {searchType === "prescription" ? "Número da Receita ou Nome do Paciente" : "Nome ou CPF do Paciente"}
                </Label>
                <div className="flex gap-2">
                  <Input
                    id="search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder={searchType === "prescription" ? "Ex: 24092001 ou Maria Silva" : "Ex: João Silva ou 123.456.789-00"}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  />
                  <Button onClick={handleSearch}>
                    <Search className="w-4 h-4 mr-2" />
                    Buscar
                  </Button>
                </div>
              </div>

              {/* Recent Prescriptions */}
              <div>
                <Label>Receitas Recentes</Label>
                <div className="space-y-2 mt-2">
                  {prescriptions.slice(0, 3).map((prescription) => (
                    <div 
                      key={prescription.id} 
                      className="flex items-center justify-between p-3 border border-border rounded-lg cursor-pointer hover:bg-accent/50"
                      onClick={() => {
                        setSelectedPrescription(prescription);
                        setDispensingData({
                          ...dispensingData,
                          patientId: prescription.patientId,
                          patientName: prescription.patientName,
                          prescriptionNumber: prescription.prescriptionNumber,
                          doctorName: prescription.doctorName,
                          medications: prescription.medications.map(med => ({
                            ...med,
                            dispensed: false,
                            partialQuantity: med.available ? med.quantity : med.currentStock
                          }))
                        });
                        setCurrentStep(2);
                      }}
                    >
                      <div>
                        <div className="font-medium">{prescription.patientName}</div>
                        <div className="text-sm text-muted-foreground">
                          Receita: {prescription.prescriptionNumber} • {prescription.doctorName}
                        </div>
                      </div>
                      <Badge className={getStatusColor(prescription.status)} variant="secondary">
                        {prescription.status === "valid" ? "Válida" : "Expirada"}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Prescription Details */}
        {currentStep === 2 && selectedPrescription && (
          <div className="space-y-6">
            {/* Patient and Prescription Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5 text-emerald-400" />
                  Informações da Receita
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Paciente</Label>
                    <div className="text-lg font-medium">{selectedPrescription.patientName}</div>
                    <div className="text-sm text-muted-foreground">CPF: {selectedPrescription.patientCPF}</div>
                  </div>
                  <div>
                    <Label>Médico Prescritor</Label>
                    <div className="text-lg font-medium">{selectedPrescription.doctorName}</div>
                    <div className="text-sm text-muted-foreground">{selectedPrescription.doctorCRM}</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label>Número da Receita</Label>
                    <div className="font-medium">{selectedPrescription.prescriptionNumber}</div>
                  </div>
                  <div>
                    <Label>Data de Emissão</Label>
                    <div className="font-medium">{selectedPrescription.issueDate}</div>
                  </div>
                  <div>
                    <Label>Validade</Label>
                    <div className="font-medium">{selectedPrescription.expiryDate}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Medications */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="w-5 h-5 text-violet-400" />
                  Medicamentos Prescritos
                </CardTitle>
                <CardDescription>
                  Selecione os medicamentos a serem dispensados
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {dispensingData.medications.map((medication) => (
                  <div key={medication.id} className="border border-border rounded-lg p-4">
                    <div className="flex items-start gap-4">
                      <Checkbox
                        checked={medication.dispensed}
                        onCheckedChange={(checked) => handleMedicationToggle(medication.id, checked as boolean)}
                        disabled={!medication.available}
                      />
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">{medication.name}</h4>
                          <Badge variant={medication.available ? "secondary" : "destructive"}>
                            {medication.available ? "Disponível" : "Indisponível"}
                          </Badge>
                        </div>
                        
                        <div className="text-sm text-muted-foreground mb-3">
                          <p>Posologia: {medication.dosage}</p>
                          <p>Quantidade prescrita: {medication.quantity} unidades</p>
                          <p>Estoque atual: {medication.currentStock} unidades</p>
                        </div>

                        {medication.available && medication.dispensed && (
                          <div className="flex items-center gap-2">
                            <Label>Quantidade a dispensar:</Label>
                            <div className="flex items-center gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleQuantityChange(medication.id, medication.partialQuantity - 1)}
                                disabled={medication.partialQuantity <= 1}
                              >
                                <Minus className="w-3 h-3" />
                              </Button>
                              <Input
                                type="number"
                                value={medication.partialQuantity}
                                onChange={(e) => handleQuantityChange(medication.id, parseInt(e.target.value) || 0)}
                                className="w-20 text-center"
                                min="1"
                                max={Math.min(medication.quantity, medication.currentStock)}
                              />
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleQuantityChange(medication.id, medication.partialQuantity + 1)}
                                disabled={medication.partialQuantity >= Math.min(medication.quantity, medication.currentStock)}
                              >
                                <Plus className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        )}

                        {!medication.available && (
                          <div className="bg-red-50 border border-red-200 rounded p-3">
                            <div className="flex items-center gap-2 text-red-800">
                              <AlertTriangle className="w-4 h-4" />
                              <span className="text-sm font-medium">
                                Estoque insuficiente. Disponível: {medication.currentStock} de {medication.quantity} unidades.
                              </span>
                            </div>
                            {medication.currentStock > 0 && (
                              <div className="mt-2">
                                <Checkbox
                                  checked={medication.dispensed}
                                  onCheckedChange={(checked) => handleMedicationToggle(medication.id, checked as boolean)}
                                />
                                <Label className="ml-2 text-sm">
                                  Dispensar parcialmente ({medication.currentStock} unidades)
                                </Label>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Pharmacist Notes */}
            <Card>
              <CardHeader>
                <CardTitle>Observações do Farmacêutico</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={dispensingData.pharmacistNotes}
                  onChange={(e) => setDispensingData({ ...dispensingData, pharmacistNotes: e.target.value })}
                  placeholder="Orientações fornecidas ao paciente, observações sobre a dispensação..."
                  rows={3}
                />
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setCurrentStep(1)}>
                Voltar
              </Button>
              <Button onClick={() => setCurrentStep(3)} disabled={!isFormValid()}>
                Revisar Dispensação
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Confirmation */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-emerald-400" />
                  Confirmar Dispensação
                </CardTitle>
                <CardDescription>
                  Revise as informações antes de finalizar
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Paciente</Label>
                    <div className="font-medium">{dispensingData.patientName}</div>
                  </div>
                  <div>
                    <Label>Receita</Label>
                    <div className="font-medium">{dispensingData.prescriptionNumber}</div>
                  </div>
                </div>

                <div>
                  <Label>Medicamentos a serem dispensados</Label>
                  <div className="space-y-2 mt-2">
                    {dispensingData.medications.filter(med => med.dispensed).map((medication) => (
                      <div key={medication.id} className="flex items-center justify-between p-3 bg-accent/50 rounded-lg">
                        <div>
                          <div className="font-medium">{medication.name}</div>
                          <div className="text-sm text-muted-foreground">{medication.dosage}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">{medication.partialQuantity} unidades</div>
                          {medication.partialQuantity < medication.quantity && (
                            <div className="text-xs text-amber-600">
                              Dispensação parcial
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {dispensingData.pharmacistNotes && (
                  <div>
                    <Label>Observações</Label>
                    <div className="bg-accent/50 p-3 rounded-lg text-sm">
                      {dispensingData.pharmacistNotes}
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Data e Hora da Dispensação</Label>
                    <div className="font-medium">
                      {dispensingData.dispensingDate} às {dispensingData.dispensingTime}
                    </div>
                  </div>
                  <div>
                    <Label>Farmacêutico Responsável</Label>
                    <div className="font-medium">{dispensingData.dispensedBy}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setCurrentStep(2)}>
                Voltar
              </Button>
              <Button onClick={handleDispense}>
                <Save className="w-4 h-4 mr-2" />
                Confirmar Dispensação
              </Button>
              <Button variant="outline">
                <Printer className="w-4 h-4 mr-2" />
                Imprimir Comprovante
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
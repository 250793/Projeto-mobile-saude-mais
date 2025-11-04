import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Separator } from "./ui/separator";
import { 
  ArrowLeft, 
  FileText, 
  Activity, 
  Heart, 
  Calendar,
  User,
  Download,
  Eye,
  TestTube,
  Pill
} from "lucide-react";

interface MedicalRecordsProps {
  patientName: string;
  onBack: () => void;
  userType: "paciente" | "medico";
}

export function MedicalRecords({ patientName, onBack, userType }: MedicalRecordsProps) {
  // Mock data para demonstração
  const medicalHistory = [
    {
      id: 1,
      date: "15 Set 2024",
      doctor: "Dr. Ana Silva",
      specialty: "Cardiologia",
      diagnosis: "Hipertensão arterial leve",
      treatment: "Medicação anti-hipertensiva, dieta com baixo teor de sódio",
      notes: "Paciente apresenta pressão arterial levemente elevada. Recomendado acompanhamento mensal.",
      status: "Em tratamento"
    },
    {
      id: 2,
      date: "28 Ago 2024",
      doctor: "Dr. João Santos",
      specialty: "Clínico Geral",
      diagnosis: "Diabetes tipo 2",
      treatment: "Metformina 850mg, exercícios regulares",
      notes: "Glicemia de jejum alterada. Paciente orientado sobre mudanças no estilo de vida.",
      status: "Controlado"
    },
    {
      id: 3,
      date: "10 Jul 2024",
      doctor: "Dr. Maria Costa",
      specialty: "Oftalmologia",
      diagnosis: "Miopia leve",
      treatment: "Óculos de grau",
      notes: "Primeira consulta oftalmológica. Prescrição de lentes corretivas.",
      status: "Resolvido"
    }
  ];

  const examResults = [
    {
      id: 1,
      name: "Hemograma Completo",
      date: "20 Set 2024",
      doctor: "Dr. Ana Silva",
      status: "Normal",
      type: "Sangue",
      results: {
        hemoglobina: "14.2 g/dL",
        hematocritos: "42%",
        leucocitos: "7.500/mm³",
        plaquetas: "280.000/mm³"
      }
    },
    {
      id: 2,
      name: "Glicemia de Jejum",
      date: "20 Set 2024", 
      doctor: "Dr. João Santos",
      status: "Alterado",
      type: "Sangue",
      results: {
        glicose: "135 mg/dL",
        referencia: "70-99 mg/dL"
      }
    },
    {
      id: 3,
      name: "Eletrocardiograma",
      date: "15 Set 2024",
      doctor: "Dr. Ana Silva", 
      status: "Normal",
      type: "Cardíaco",
      results: {
        frequencia: "72 bpm",
        ritmo: "Sinusal",
        conclusao: "ECG normal"
      }
    },
    {
      id: 4,
      name: "Raio-X Tórax",
      date: "10 Set 2024",
      doctor: "Dr. João Santos",
      status: "Normal", 
      type: "Imagem",
      results: {
        pulmoes: "Campos pulmonares livres",
        coracao: "Área cardíaca normal",
        conclusao: "Radiografia de tórax sem alterações"
      }
    }
  ];

  const digitalPrescriptions = [
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
      status: "Ativa"
    },
    {
      id: 2,
      date: "15 Set 2024",
      doctor: "Dr. João Santos",
      specialty: "Clínico Geral",
      medications: [
        {
          name: "Metformina 850mg",
          dosage: "1 comprimido após o almoço",
          duration: "Uso contínuo",
          instructions: "Tomar após as refeições"
        },
        {
          name: "Complexo B",
          dosage: "1 cápsula pela manhã",
          duration: "30 dias",
          instructions: "Tomar com alimentos"
        }
      ],
      valid_until: "15 Out 2024",
      status: "Ativa"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "normal":
        return "bg-emerald-100 text-emerald-800";
      case "alterado":
        return "bg-amber-100 text-amber-800";
      case "em tratamento":
        return "bg-sky-100 text-sky-800";
      case "controlado":
        return "bg-emerald-100 text-emerald-800";
      case "resolvido":
        return "bg-slate-100 text-slate-800";
      case "ativa":
        return "bg-emerald-100 text-emerald-800";
      default:
        return "bg-slate-100 text-slate-800";
    }
  };

  const getExamIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "sangue":
        return <TestTube className="w-4 h-4 text-red-400" />;
      case "cardíaco":
        return <Heart className="w-4 h-4 text-rose-400" />;
      case "imagem":
        return <Activity className="w-4 h-4 text-sky-400" />;
      default:
        return <FileText className="w-4 h-4" />;
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
              <Heart className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg">Prontuário Médico</h1>
              <p className="text-sm text-muted-foreground">
                {userType === "paciente" ? "Seu histórico médico" : `Paciente: ${patientName}`}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 max-w-4xl mx-auto">
        <Tabs defaultValue="history" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="history">Histórico</TabsTrigger>
            <TabsTrigger value="exams">Exames</TabsTrigger>
            <TabsTrigger value="prescriptions">Receitas</TabsTrigger>
          </TabsList>

          {/* Histórico Médico */}
          <TabsContent value="history" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-sky-400" />
                  Histórico de Consultas
                </CardTitle>
                <CardDescription>
                  Registro de consultas e diagnósticos anteriores
                </CardDescription>
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
                        <Badge className={getStatusColor(record.status)}>
                          {record.status}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium mb-1">Médico</h4>
                          <p className="text-sm text-muted-foreground">{record.doctor}</p>
                          <p className="text-xs text-muted-foreground">{record.specialty}</p>
                        </div>
                        <div>
                          <h4 className="font-medium mb-1">Diagnóstico</h4>
                          <p className="text-sm text-muted-foreground">{record.diagnosis}</p>
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
          </TabsContent>

          {/* Exames */}
          <TabsContent value="exams" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-emerald-400" />
                  Resultados de Exames
                </CardTitle>
                <CardDescription>
                  Exames realizados e seus resultados
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {examResults.map((exam, index) => (
                  <div key={exam.id}>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {getExamIcon(exam.type)}
                          <span className="font-medium">{exam.name}</span>
                        </div>
                        <Badge className={getStatusColor(exam.status)}>
                          {exam.status}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {exam.date}
                            </div>
                            <div className="flex items-center gap-1">
                              <User className="w-3 h-3" />
                              {exam.doctor}
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="w-3 h-3 mr-1" />
                            Visualizar
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="w-3 h-3 mr-1" />
                            Download
                          </Button>
                        </div>
                      </div>
                      
                      <div className="bg-accent/50 p-3 rounded-lg">
                        <h4 className="font-medium mb-2">Resultados</h4>
                        <div className="space-y-1">
                          {Object.entries(exam.results).map(([key, value]) => (
                            <div key={key} className="flex justify-between text-sm">
                              <span className="capitalize">{key.replace('_', ' ')}:</span>
                              <span className="font-medium">{value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    {index < examResults.length - 1 && <Separator className="mt-4" />}
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Receitas */}
          <TabsContent value="prescriptions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Pill className="w-5 h-5 text-rose-400" />
                  Receitas Digitais
                </CardTitle>
                <CardDescription>
                  Prescrições médicas digitais
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {digitalPrescriptions.map((prescription, index) => (
                  <div key={prescription.id}>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Pill className="w-4 h-4 text-rose-400" />
                          <span className="font-medium">
                            Receita #{prescription.id.toString().padStart(3, '0')}
                          </span>
                        </div>
                        <Badge className={getStatusColor(prescription.status)}>
                          {prescription.status}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {prescription.date}
                            </div>
                            <div className="flex items-center gap-1">
                              <User className="w-3 h-3" />
                              {prescription.doctor}
                            </div>
                          </div>
                          <p className="text-xs text-muted-foreground">{prescription.specialty}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Válida até: {prescription.valid_until}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="w-3 h-3 mr-1" />
                            Visualizar
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="w-3 h-3 mr-1" />
                            Download
                          </Button>
                        </div>
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
                    {index < digitalPrescriptions.length - 1 && <Separator className="mt-4" />}
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
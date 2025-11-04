import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { 
  ArrowLeft, 
  Users, 
  Search, 
  Filter,
  User,
  Calendar,
  FileText,
  Plus,
  ChevronRight,
  MoreVertical
} from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";

interface PatientsListProps {
  onBack: () => void;
  onViewPatientRecords: (patientId: string, patientName: string) => void;
  onAddNewPatient: () => void;
}

export function PatientsList({ onBack, onViewPatientRecords, onAddNewPatient }: PatientsListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [ageFilter, setAgeFilter] = useState("all");

  // Mock data - em uma aplicação real, viria da API
  const patients = [
    {
      id: "P001",
      name: "Maria Silva",
      age: 65,
      gender: "Feminino",
      phone: "(11) 99999-1111",
      email: "maria.silva@email.com",
      lastVisit: "20 Set 2024",
      nextAppointment: "25 Set 2024",
      condition: "Hipertensão",
      status: "ativo",
      priority: "normal"
    },
    {
      id: "P002",
      name: "João Santos",
      age: 42,
      gender: "Masculino", 
      phone: "(11) 99999-2222",
      email: "joao.santos@email.com",
      lastVisit: "18 Set 2024",
      nextAppointment: null,
      condition: "Diabetes Tipo 2",
      status: "ativo",
      priority: "alta"
    },
    {
      id: "P003",
      name: "Ana Costa",
      age: 38,
      gender: "Feminino",
      phone: "(11) 99999-3333", 
      email: "ana.costa@email.com",
      lastVisit: "15 Set 2024",
      nextAppointment: "22 Set 2024",
      condition: "Enxaqueca",
      status: "ativo",
      priority: "normal"
    },
    {
      id: "P004",
      name: "Pedro Oliveira",
      age: 55,
      gender: "Masculino",
      phone: "(11) 99999-4444",
      email: "pedro.oliveira@email.com", 
      lastVisit: "10 Set 2024",
      nextAppointment: null,
      condition: "Hipertensão",
      status: "inativo",
      priority: "normal"
    },
    {
      id: "P005", 
      name: "Lucia Ferreira",
      age: 48,
      gender: "Feminino",
      phone: "(11) 99999-5555",
      email: "lucia.ferreira@email.com",
      lastVisit: "12 Set 2024",
      nextAppointment: "28 Set 2024",
      condition: "Diabetes Tipo 2",
      status: "ativo",
      priority: "normal"
    },
    {
      id: "P006",
      name: "Roberto Lima",
      age: 70,
      gender: "Masculino",
      phone: "(11) 99999-6666",
      email: "roberto.lima@email.com",
      lastVisit: "05 Set 2024", 
      nextAppointment: null,
      condition: "Artrite",
      status: "ativo",
      priority: "alta"
    },
    {
      id: "P007",
      name: "Carla Mendes",
      age: 35,
      gender: "Feminino",
      phone: "(11) 99999-7777",
      email: "carla.mendes@email.com",
      lastVisit: "08 Set 2024",
      nextAppointment: "30 Set 2024", 
      condition: "Ansiedade",
      status: "ativo",
      priority: "normal"
    },
    {
      id: "P008",
      name: "Fernando Rosa",
      age: 28,
      gender: "Masculino",  
      phone: "(11) 99999-8888",
      email: "fernando.rosa@email.com",
      lastVisit: "01 Set 2024",
      nextAppointment: null,
      condition: "Check-up",
      status: "inativo",
      priority: "baixa"
    }
  ];

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.condition.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || patient.status === statusFilter;
    
    const matchesAge = ageFilter === "all" ||
                      (ageFilter === "young" && patient.age < 30) ||
                      (ageFilter === "adult" && patient.age >= 30 && patient.age < 60) ||
                      (ageFilter === "senior" && patient.age >= 60);
    
    return matchesSearch && matchesStatus && matchesAge;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ativo":
        return "bg-emerald-100 text-emerald-800";
      case "inativo":
        return "bg-slate-100 text-slate-800";
      default:
        return "bg-slate-100 text-slate-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "alta":
        return "bg-red-100 text-red-800";
      case "normal":
        return "bg-blue-100 text-blue-800";
      case "baixa":
        return "bg-slate-100 text-slate-800";
      default:
        return "bg-slate-100 text-slate-800";
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
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
              <Users className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg">Lista de Pacientes</h1>
              <p className="text-sm text-muted-foreground">{filteredPatients.length} pacientes encontrados</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 max-w-6xl mx-auto space-y-6">
        {/* Filtros e Busca */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar por nome, ID ou condição..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="flex gap-3">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[140px]">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos Status</SelectItem>
                    <SelectItem value="ativo">Ativo</SelectItem>
                    <SelectItem value="inativo">Inativo</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={ageFilter} onValueChange={setAgeFilter}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas Idades</SelectItem>
                    <SelectItem value="young">Até 29 anos</SelectItem>
                    <SelectItem value="adult">30-59 anos</SelectItem>
                    <SelectItem value="senior">60+ anos</SelectItem>
                  </SelectContent>
                </Select>
                
                <Button onClick={onAddNewPatient}>
                  <Plus className="w-4 h-4 mr-2" />
                  Novo Paciente
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Lista de Pacientes */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filteredPatients.map((patient) => (
            <Card key={patient.id} className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    <Avatar className="w-12 h-12">
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {getInitials(patient.name)}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">{patient.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            ID: {patient.id} • {patient.age} anos • {patient.gender}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={getStatusColor(patient.status)} variant="secondary">
                            {patient.status}
                          </Badge>
                          <Badge className={getPriorityColor(patient.priority)} variant="secondary">
                            {patient.priority}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">
                          <strong>Condição:</strong> {patient.condition}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          <strong>Última consulta:</strong> {patient.lastVisit}
                        </p>
                        {patient.nextAppointment && (
                          <p className="text-sm text-muted-foreground">
                            <strong>Próxima consulta:</strong> {patient.nextAppointment}
                          </p>
                        )}
                      </div>
                      
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">{patient.phone}</p>
                        <p className="text-sm text-muted-foreground">{patient.email}</p>
                      </div>
                      
                      <div className="flex items-center gap-2 pt-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => onViewPatientRecords(patient.id, patient.name)}
                        >
                          <FileText className="w-3 h-3 mr-1" />
                          Prontuário
                        </Button>
                        <Button variant="outline" size="sm">
                          <Calendar className="w-3 h-3 mr-1" />
                          Agendar
                        </Button>
                        
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <User className="w-4 h-4 mr-2" />
                              Editar Paciente
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <FileText className="w-4 h-4 mr-2" />
                              Nova Receita
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Calendar className="w-4 h-4 mr-2" />
                              Histórico
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredPatients.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-medium mb-2">Nenhum paciente encontrado</h3>
              <p className="text-muted-foreground mb-4">
                Tente ajustar os filtros de busca ou adicione um novo paciente.
              </p>
              <Button onClick={onAddNewPatient}>
                <Plus className="w-4 h-4 mr-2" />
                Adicionar Novo Paciente
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
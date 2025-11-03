import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { 
  ArrowLeft, 
  Shield, 
  Users,
  Plus,
  Edit,
  Trash2,
  Settings,
  Lock,
  Unlock,
  Eye,
  EyeOff,
  UserCheck,
  AlertTriangle
} from "lucide-react";

interface AccessLevelManagementProps {
  onBack: () => void;
}

export function AccessLevelManagement({ onBack }: AccessLevelManagementProps) {
  const [activeTab, setActiveTab] = useState("profiles");
  const [isNewProfileDialogOpen, setIsNewProfileDialogOpen] = useState(false);
  const [editingProfile, setEditingProfile] = useState(null);

  const [newProfile, setNewProfile] = useState({
    name: "",
    description: "",
    permissions: [],
    modules: [],
    restrictions: ""
  });

  // Available permissions
  const availablePermissions = [
    { id: "view_patients", name: "Visualizar Pacientes", module: "patients" },
    { id: "edit_patients", name: "Editar Pacientes", module: "patients" },
    { id: "create_patients", name: "Cadastrar Pacientes", module: "patients" },
    { id: "delete_patients", name: "Excluir Pacientes", module: "patients" },
    { id: "view_medical_records", name: "Visualizar Prontuários", module: "medical" },
    { id: "edit_medical_records", name: "Editar Prontuários", module: "medical" },
    { id: "create_prescriptions", name: "Criar Receitas", module: "medical" },
    { id: "request_exams", name: "Solicitar Exames", module: "medical" },
    { id: "view_inventory", name: "Visualizar Estoque", module: "inventory" },
    { id: "manage_inventory", name: "Gerenciar Estoque", module: "inventory" },
    { id: "manage_batches", name: "Gerenciar Lotes", module: "inventory" },
    { id: "view_reports", name: "Visualizar Relatórios", module: "reports" },
    { id: "create_reports", name: "Criar Relatórios", module: "reports" },
    { id: "manage_users", name: "Gerenciar Usuários", module: "admin" },
    { id: "manage_units", name: "Gerenciar Unidades", module: "admin" },
    { id: "system_settings", name: "Configurações do Sistema", module: "admin" },
    { id: "manage_campaigns", name: "Gerenciar Campanhas", module: "campaigns" },
    { id: "view_schedules", name: "Visualizar Agendas", module: "schedules" },
    { id: "manage_schedules", name: "Gerenciar Agendas", module: "schedules" }
  ];

  const modules = [
    { id: "patients", name: "Gestão de Pacientes", icon: Users },
    { id: "medical", name: "Atendimento Médico", icon: UserCheck },
    { id: "inventory", name: "Estoque", icon: Shield },
    { id: "reports", name: "Relatórios", icon: Eye },
    { id: "admin", name: "Administração", icon: Settings },
    { id: "campaigns", name: "Campanhas", icon: Shield },
    { id: "schedules", name: "Agendamentos", icon: Users }
  ];

  // Mock data
  const accessProfiles = [
    {
      id: "PROF001",
      name: "Médico Básico",
      description: "Acesso básico para médicos - consultas e prontuários",
      permissions: ["view_patients", "view_medical_records", "edit_medical_records", "create_prescriptions", "request_exams"],
      modules: ["patients", "medical"],
      userCount: 8,
      status: "active",
      createdDate: "2024-01-15",
      lastModified: "2024-08-20",
      restrictions: "Acesso limitado ao horário de trabalho"
    },
    {
      id: "PROF002", 
      name: "Médico Avançado",
      description: "Acesso completo para médicos seniores",
      permissions: ["view_patients", "edit_patients", "create_patients", "view_medical_records", "edit_medical_records", "create_prescriptions", "request_exams", "view_schedules", "manage_schedules"],
      modules: ["patients", "medical", "schedules"],
      userCount: 4,
      status: "active",
      createdDate: "2024-02-10",
      lastModified: "2024-09-15",
      restrictions: "Sem restrições"
    },
    {
      id: "PROF003",
      name: "Enfermeiro",
      description: "Acesso para equipe de enfermagem",
      permissions: ["view_patients", "view_medical_records", "view_inventory", "manage_campaigns"],
      modules: ["patients", "medical", "inventory", "campaigns"],
      userCount: 12,
      status: "active", 
      createdDate: "2024-01-20",
      lastModified: "2024-07-30",
      restrictions: "Não pode prescrever medicamentos"
    },
    {
      id: "PROF004",
      name: "Farmacêutico",
      description: "Gestão de estoque e medicamentos",
      permissions: ["view_patients", "view_inventory", "manage_inventory", "manage_batches", "view_reports"],
      modules: ["inventory", "reports"],
      userCount: 3,
      status: "active",
      createdDate: "2024-03-05",
      lastModified: "2024-09-10",
      restrictions: "Acesso restrito ao estoque"
    },
    {
      id: "PROF005",
      name: "Gestor de Unidade",
      description: "Gestão completa da unidade de saúde",
      permissions: ["view_patients", "edit_patients", "view_medical_records", "view_inventory", "manage_inventory", "view_reports", "create_reports", "manage_campaigns", "view_schedules", "manage_schedules"],
      modules: ["patients", "medical", "inventory", "reports", "campaigns", "schedules"],
      userCount: 2,
      status: "active",
      createdDate: "2024-01-10",
      lastModified: "2024-09-18",
      restrictions: "Acesso limitado à sua unidade"
    },
    {
      id: "PROF006",
      name: "Administrador Sistema",
      description: "Acesso total ao sistema",
      permissions: availablePermissions.map(p => p.id),
      modules: modules.map(m => m.id),
      userCount: 1,
      status: "active",
      createdDate: "2024-01-01",
      lastModified: "2024-09-20",
      restrictions: "Sem restrições"
    }
  ];

  const users = [
    { id: "U001", name: "Dr. Ana Silva", email: "ana.silva@ubs.gov.br", profile: "PROF002", unit: "UBS Centro", status: "active", lastLogin: "2024-09-20 14:30" },
    { id: "U002", name: "Dr. Carlos Santos", email: "carlos.santos@ubs.gov.br", profile: "PROF001", unit: "UBS Norte", status: "active", lastLogin: "2024-09-20 09:15" },
    { id: "U003", name: "Enf. Maria Costa", email: "maria.costa@ubs.gov.br", profile: "PROF003", unit: "UBS Centro", status: "active", lastLogin: "2024-09-20 16:45" },
    { id: "U004", name: "Farm. João Oliveira", email: "joao.oliveira@ubs.gov.br", profile: "PROF004", unit: "UBS Sul", status: "active", lastLogin: "2024-09-19 18:20" },
    { id: "U005", name: "Gest. Lucia Ferreira", email: "lucia.ferreira@ubs.gov.br", profile: "PROF005", unit: "UBS Leste", status: "active", lastLogin: "2024-09-20 12:10" },
    { id: "U006", name: "Admin Sistema", email: "admin@ubs.gov.br", profile: "PROF006", unit: "Todas", status: "active", lastLogin: "2024-09-20 17:00" }
  ];

  const handleCreateProfile = () => {
    console.log("Novo perfil:", newProfile);
    setIsNewProfileDialogOpen(false);
    setNewProfile({
      name: "",
      description: "",
      permissions: [],
      modules: [],
      restrictions: ""
    });
  };

  const handlePermissionChange = (permissionId: string, checked: boolean) => {
    if (checked) {
      setNewProfile({
        ...newProfile,
        permissions: [...newProfile.permissions, permissionId]
      });
    } else {
      setNewProfile({
        ...newProfile,
        permissions: newProfile.permissions.filter(p => p !== permissionId)
      });
    }
  };

  const handleModuleChange = (moduleId: string, checked: boolean) => {
    if (checked) {
      setNewProfile({
        ...newProfile,
        modules: [...newProfile.modules, moduleId]
      });
    } else {
      setNewProfile({
        ...newProfile,
        modules: newProfile.modules.filter(m => m !== moduleId)
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-emerald-100 text-emerald-800";
      case "inactive":
        return "bg-slate-100 text-slate-800";
      case "suspended":
        return "bg-red-100 text-red-800";
      default:
        return "bg-slate-100 text-slate-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "Ativo";
      case "inactive":
        return "Inativo";
      case "suspended":
        return "Suspenso";
      default:
        return status;
    }
  };

  const getPermissionsByModule = (moduleId: string) => {
    return availablePermissions.filter(p => p.module === moduleId);
  };

  const getProfilePermissionsCount = (profile: any) => {
    return profile.permissions.length;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border p-4">
        <div className="flex items-center gap-3 max-w-7xl mx-auto">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg">Gestão de Perfis de Acesso</h1>
              <p className="text-sm text-muted-foreground">Controle de permissões e níveis de acesso</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 max-w-7xl mx-auto space-y-6">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-sky-100 rounded-full flex items-center justify-center">
                  <Shield className="w-5 h-5 text-sky-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Perfis Ativos</p>
                  <p className="text-2xl font-semibold">{accessProfiles.filter(p => p.status === "active").length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Usuários</p>
                  <p className="text-2xl font-semibold">{users.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                  <Lock className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Permissões</p>
                  <p className="text-2xl font-semibold">{availablePermissions.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-violet-100 rounded-full flex items-center justify-center">
                  <Settings className="w-5 h-5 text-violet-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Módulos</p>
                  <p className="text-2xl font-semibold">{modules.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="profiles">Perfis de Acesso</TabsTrigger>
            <TabsTrigger value="users">Usuários</TabsTrigger>
            <TabsTrigger value="permissions">Permissões</TabsTrigger>
          </TabsList>

          {/* Profiles Tab */}
          <TabsContent value="profiles" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Perfis de Acesso</CardTitle>
                    <CardDescription>Gerencie os níveis de acesso do sistema</CardDescription>
                  </div>
                  <Dialog open={isNewProfileDialogOpen} onOpenChange={setIsNewProfileDialogOpen}>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="w-4 h-4 mr-2" />
                        Novo Perfil
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Criar Novo Perfil de Acesso</DialogTitle>
                        <DialogDescription>
                          Configure as permissões e módulos para o novo perfil
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-6">
                        {/* Basic Information */}
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="profileName">Nome do Perfil *</Label>
                            <Input
                              id="profileName"
                              value={newProfile.name}
                              onChange={(e) => setNewProfile({ ...newProfile, name: e.target.value })}
                              placeholder="Ex: Médico Especialista"
                            />
                          </div>
                          <div>
                            <Label htmlFor="profileDescription">Descrição</Label>
                            <Textarea
                              id="profileDescription"
                              value={newProfile.description}
                              onChange={(e) => setNewProfile({ ...newProfile, description: e.target.value })}
                              placeholder="Descreva o perfil e suas responsabilidades..."
                              rows={3}
                            />
                          </div>
                        </div>

                        {/* Modules */}
                        <div>
                          <Label>Módulos de Acesso</Label>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                            {modules.map((module) => {
                              const Icon = module.icon;
                              return (
                                <div key={module.id} className="flex items-center space-x-2">
                                  <Checkbox
                                    id={`module-${module.id}`}
                                    checked={newProfile.modules.includes(module.id)}
                                    onCheckedChange={(checked) => handleModuleChange(module.id, checked as boolean)}
                                  />
                                  <Label htmlFor={`module-${module.id}`} className="text-sm font-normal cursor-pointer flex items-center gap-2">
                                    <Icon className="w-4 h-4" />
                                    {module.name}
                                  </Label>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* Permissions by Module */}
                        <div>
                          <Label>Permissões Específicas</Label>
                          <div className="space-y-4 mt-2">
                            {modules.map((module) => {
                              const modulePermissions = getPermissionsByModule(module.id);
                              if (modulePermissions.length === 0) return null;
                              
                              return (
                                <div key={module.id} className="border rounded-lg p-4">
                                  <h4 className="font-medium mb-3 flex items-center gap-2">
                                    <module.icon className="w-4 h-4" />
                                    {module.name}
                                  </h4>
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                    {modulePermissions.map((permission) => (
                                      <div key={permission.id} className="flex items-center space-x-2">
                                        <Checkbox
                                          id={`perm-${permission.id}`}
                                          checked={newProfile.permissions.includes(permission.id)}
                                          onCheckedChange={(checked) => handlePermissionChange(permission.id, checked as boolean)}
                                        />
                                        <Label htmlFor={`perm-${permission.id}`} className="text-sm font-normal cursor-pointer">
                                          {permission.name}
                                        </Label>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* Restrictions */}
                        <div>
                          <Label htmlFor="restrictions">Restrições</Label>
                          <Textarea
                            id="restrictions"
                            value={newProfile.restrictions}
                            onChange={(e) => setNewProfile({ ...newProfile, restrictions: e.target.value })}
                            placeholder="Defina quaisquer restrições específicas para este perfil..."
                            rows={2}
                          />
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3 pt-4">
                          <Button variant="outline" onClick={() => setIsNewProfileDialogOpen(false)}>
                            Cancelar
                          </Button>
                          <Button onClick={handleCreateProfile}>
                            Criar Perfil
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {accessProfiles.map((profile) => (
                    <Card key={profile.id}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center">
                              <Shield className="w-6 h-6" />
                            </div>
                            <div>
                              <div className="flex items-center gap-3 mb-2">
                                <h3 className="font-medium">{profile.name}</h3>
                                <Badge className={getStatusColor(profile.status)} variant="secondary">
                                  {getStatusText(profile.status)}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground mb-2">{profile.description}</p>
                              <div className="space-y-1 text-sm text-muted-foreground">
                                <p>ID: {profile.id} • {getProfilePermissionsCount(profile)} permissões</p>
                                <p>Usuários: {profile.userCount} • Criado: {profile.createdDate}</p>
                                {profile.restrictions && (
                                  <p className="text-amber-600">⚠️ {profile.restrictions}</p>
                                )}
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Eye className="w-3 h-3 mr-1" />
                              Visualizar
                            </Button>
                            <Button variant="outline" size="sm">
                              <Edit className="w-3 h-3 mr-1" />
                              Editar
                            </Button>
                            <Button variant="outline" size="sm" disabled={profile.userCount > 0}>
                              <Trash2 className="w-3 h-3 mr-1" />
                              Excluir
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Usuários do Sistema</CardTitle>
                <CardDescription>Visualize e gerencie os usuários e seus perfis de acesso</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {users.map((user) => {
                    const userProfile = accessProfiles.find(p => p.id === user.profile);
                    return (
                      <Card key={user.id}>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center">
                                <Users className="w-6 h-6" />
                              </div>
                              <div>
                                <div className="flex items-center gap-3 mb-1">
                                  <h3 className="font-medium">{user.name}</h3>
                                  <Badge className={getStatusColor(user.status)} variant="secondary">
                                    {getStatusText(user.status)}
                                  </Badge>
                                </div>
                                <div className="space-y-1 text-sm text-muted-foreground">
                                  <p>{user.email} • {user.unit}</p>
                                  <p>Perfil: {userProfile?.name} • Último acesso: {user.lastLogin}</p>
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                <Eye className="w-3 h-3 mr-1" />
                                Perfil
                              </Button>
                              <Button variant="outline" size="sm">
                                <Lock className="w-3 h-3 mr-1" />
                                Permissões
                              </Button>
                              <Button variant="outline" size="sm">
                                <Settings className="w-3 h-3 mr-1" />
                                Editar
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Permissions Tab */}
          <TabsContent value="permissions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Permissões do Sistema</CardTitle>
                <CardDescription>Visualize todas as permissões disponíveis organizadas por módulo</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {modules.map((module) => {
                    const modulePermissions = getPermissionsByModule(module.id);
                    if (modulePermissions.length === 0) return null;
                    
                    return (
                      <Card key={module.id}>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <module.icon className="w-5 h-5" />
                            {module.name}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                            {modulePermissions.map((permission) => (
                              <div key={permission.id} className="bg-accent/50 p-3 rounded-lg">
                                <div className="font-medium text-sm">{permission.name}</div>
                                <div className="text-xs text-muted-foreground">ID: {permission.id}</div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
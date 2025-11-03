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
import { Progress } from "./ui/progress";
import { 
  ArrowLeft, 
  Syringe, 
  Plus,
  Calendar,
  MapPin,
  Users,
  Target,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  Edit,
  Trash2,
  Play,
  Pause,
  BarChart3,
  Download,
  Filter
} from "lucide-react";

interface VaccinationCampaignsProps {
  onBack: () => void;
}

export function VaccinationCampaigns({ onBack }: VaccinationCampaignsProps) {
  const [activeTab, setActiveTab] = useState("campaigns");
  const [isNewCampaignDialogOpen, setIsNewCampaignDialogOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const [unitFilter, setUnitFilter] = useState("all");

  const [newCampaign, setNewCampaign] = useState({
    name: "",
    description: "",
    vaccineType: "",
    targetAudience: "",
    startDate: "",
    endDate: "",
    targetDoses: "",
    units: [],
    publicTarget: "",
    ageRange: "",
    notes: ""
  });

  // Mock data
  const healthUnits = [
    { id: "ubs_centro", name: "UBS Centro" },
    { id: "ubs_norte", name: "UBS Norte" },
    { id: "ubs_sul", name: "UBS Sul" },
    { id: "ubs_leste", name: "UBS Leste" },
    { id: "ubs_oeste", name: "UBS Oeste" }
  ];

  const vaccineTypes = [
    "COVID-19",
    "Influenza (Gripe)",
    "HPV",
    "Hepatite B",
    "Febre Amarela",
    "Sarampo/Caxumba/Rubéola (Tríplice Viral)",
    "Pneumocócica",
    "Meningocócica",
    "Pentavalente",
    "Poliomielite"
  ];

  const targetAudiences = [
    "Crianças (0-5 anos)",
    "Crianças (6-11 anos)",
    "Adolescentes (12-17 anos)",
    "Adultos (18-59 anos)",
    "Idosos (60+ anos)",
    "Gestantes",
    "Profissionais de Saúde",
    "Grupos de Risco",
    "População Geral"
  ];

  const campaigns = [
    {
      id: "CAMP001",
      name: "Campanha COVID-19 Outono 2024",
      description: "Vacinação contra COVID-19 para grupos prioritários",
      vaccineType: "COVID-19",
      targetAudience: "Idosos (60+ anos)",
      startDate: "2024-09-01",
      endDate: "2024-12-31",
      targetDoses: 2500,
      appliedDoses: 1847,
      coverage: 73.9,
      status: "active",
      units: ["UBS Centro", "UBS Norte", "UBS Sul"],
      ageRange: "60+ anos",
      publicTarget: "Idosos e grupos de risco",
      createdDate: "2024-08-15",
      lastUpdate: "2024-09-20"
    },
    {
      id: "CAMP002",
      name: "Influenza 2024",
      description: "Campanha nacional de vacinação contra gripe",
      vaccineType: "Influenza (Gripe)",
      targetAudience: "População Geral",
      startDate: "2024-04-01",
      endDate: "2024-07-31",
      targetDoses: 5000,
      appliedDoses: 4823,
      coverage: 96.5,
      status: "completed",
      units: ["UBS Centro", "UBS Norte", "UBS Sul", "UBS Leste", "UBS Oeste"],
      ageRange: "Todos os grupos",
      publicTarget: "População em geral",
      createdDate: "2024-03-01",
      lastUpdate: "2024-07-31"
    },
    {
      id: "CAMP003",
      name: "HPV Adolescentes 2024",
      description: "Vacinação HPV para adolescentes",
      vaccineType: "HPV",
      targetAudience: "Adolescentes (12-17 anos)",
      startDate: "2024-08-01",
      endDate: "2024-11-30",
      targetDoses: 800,
      appliedDoses: 432,
      coverage: 54.0,
      status: "active",
      units: ["UBS Centro", "UBS Norte"],
      ageRange: "12-17 anos",
      publicTarget: "Adolescentes meninas e meninos",
      createdDate: "2024-07-15",
      lastUpdate: "2024-09-18"
    },
    {
      id: "CAMP004",
      name: "Hepatite B - Profissionais Saúde",
      description: "Vacinação para profissionais de saúde",
      vaccineType: "Hepatite B",
      targetAudience: "Profissionais de Saúde",
      startDate: "2024-10-01",
      endDate: "2024-12-31",
      targetDoses: 300,
      appliedDoses: 0,
      coverage: 0,
      status: "scheduled",
      units: ["UBS Centro", "UBS Sul", "UBS Leste"],
      ageRange: "Adultos",
      publicTarget: "Profissionais de saúde",
      createdDate: "2024-09-10",
      lastUpdate: "2024-09-15"
    },
    {
      id: "CAMP005",
      name: "Febre Amarela - Zona Rural",
      description: "Vacinação para moradores da zona rural",
      vaccineType: "Febre Amarela",
      targetAudience: "População Geral",
      startDate: "2024-06-01",
      endDate: "2024-08-31",
      targetDoses: 1200,
      appliedDoses: 1156,
      coverage: 96.3,
      status: "completed",
      units: ["UBS Oeste"],
      ageRange: "9 meses a 59 anos",
      publicTarget: "Moradores zona rural",
      createdDate: "2024-05-15",
      lastUpdate: "2024-08-31"
    }
  ];

  const dailyApplications = [
    { date: "2024-09-16", doses: 45, campaign: "COVID-19" },
    { date: "2024-09-17", doses: 52, campaign: "COVID-19" },
    { date: "2024-09-18", doses: 38, campaign: "HPV" },
    { date: "2024-09-19", doses: 67, campaign: "COVID-19" },
    { date: "2024-09-20", doses: 41, campaign: "COVID-19" }
  ];

  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesStatus = statusFilter === "all" || campaign.status === statusFilter;
    const matchesUnit = unitFilter === "all" || campaign.units.some(unit => 
      healthUnits.find(hu => hu.name === unit)?.id === unitFilter
    );
    return matchesStatus && matchesUnit;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-emerald-100 text-emerald-800";
      case "completed":
        return "bg-slate-100 text-slate-800";
      case "scheduled":
        return "bg-sky-100 text-sky-800";
      case "paused":
        return "bg-amber-100 text-amber-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-slate-100 text-slate-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "Ativa";
      case "completed":
        return "Concluída";
      case "scheduled":
        return "Agendada";
      case "paused":
        return "Pausada";
      case "cancelled":
        return "Cancelada";
      default:
        return status;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <Play className="w-4 h-4" />;
      case "completed":
        return <CheckCircle className="w-4 h-4" />;
      case "scheduled":
        return <Clock className="w-4 h-4" />;
      case "paused":
        return <Pause className="w-4 h-4" />;
      case "cancelled":
        return <AlertTriangle className="w-4 h-4" />;
      default:
        return <Syringe className="w-4 h-4" />;
    }
  };

  const getCoverageColor = (coverage: number) => {
    if (coverage >= 90) return "text-emerald-600";
    if (coverage >= 70) return "text-amber-600";
    return "text-red-600";
  };

  const handleUnitChange = (unitName: string, checked: boolean) => {
    if (checked) {
      setNewCampaign({
        ...newCampaign,
        units: [...newCampaign.units, unitName]
      });
    } else {
      setNewCampaign({
        ...newCampaign,
        units: newCampaign.units.filter(u => u !== unitName)
      });
    }
  };

  const handleCreateCampaign = () => {
    console.log("Nova campanha:", newCampaign);
    setIsNewCampaignDialogOpen(false);
    setNewCampaign({
      name: "",
      description: "",
      vaccineType: "",
      targetAudience: "",
      startDate: "",
      endDate: "",
      targetDoses: "",
      units: [],
      publicTarget: "",
      ageRange: "",
      notes: ""
    });
  };

  const getTotalsByStatus = () => {
    return {
      active: campaigns.filter(c => c.status === "active").length,
      completed: campaigns.filter(c => c.status === "completed").length,
      scheduled: campaigns.filter(c => c.status === "scheduled").length,
      totalDoses: campaigns.reduce((sum, c) => sum + c.appliedDoses, 0)
    };
  };

  const stats = getTotalsByStatus();

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
              <Syringe className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg">Campanhas de Vacinação</h1>
              <p className="text-sm text-muted-foreground">Gestão e monitoramento de campanhas</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 max-w-7xl mx-auto space-y-6">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                  <Play className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Campanhas Ativas</p>
                  <p className="text-2xl font-semibold">{stats.active}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-slate-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Concluídas</p>
                  <p className="text-2xl font-semibold">{stats.completed}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-sky-100 rounded-full flex items-center justify-center">
                  <Clock className="w-5 h-5 text-sky-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Agendadas</p>
                  <p className="text-2xl font-semibold">{stats.scheduled}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-violet-100 rounded-full flex items-center justify-center">
                  <Target className="w-5 h-5 text-violet-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total de Doses</p>
                  <p className="text-2xl font-semibold">{stats.totalDoses.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="campaigns">Campanhas</TabsTrigger>
            <TabsTrigger value="monitoring">Monitoramento</TabsTrigger>
            <TabsTrigger value="reports">Relatórios</TabsTrigger>
          </TabsList>

          {/* Campaigns Tab */}
          <TabsContent value="campaigns" className="space-y-4">
            {/* Filters and Actions */}
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col lg:flex-row gap-4">
                  <div className="flex gap-3">
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-[140px]">
                        <Filter className="w-4 h-4 mr-2" />
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos Status</SelectItem>
                        <SelectItem value="active">Ativa</SelectItem>
                        <SelectItem value="completed">Concluída</SelectItem>
                        <SelectItem value="scheduled">Agendada</SelectItem>
                        <SelectItem value="paused">Pausada</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select value={unitFilter} onValueChange={setUnitFilter}>
                      <SelectTrigger className="w-[140px]">
                        <MapPin className="w-4 h-4 mr-2" />
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todas Unidades</SelectItem>
                        {healthUnits.map((unit) => (
                          <SelectItem key={unit.id} value={unit.id}>
                            {unit.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex gap-3 ml-auto">
                    <Dialog open={isNewCampaignDialogOpen} onOpenChange={setIsNewCampaignDialogOpen}>
                      <DialogTrigger asChild>
                        <Button>
                          <Plus className="w-4 h-4 mr-2" />
                          Nova Campanha
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>Criar Nova Campanha de Vacinação</DialogTitle>
                          <DialogDescription>
                            Configure uma nova campanha de vacinação
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="campaignName">Nome da Campanha *</Label>
                              <Input
                                id="campaignName"
                                value={newCampaign.name}
                                onChange={(e) => setNewCampaign({ ...newCampaign, name: e.target.value })}
                                placeholder="Ex: COVID-19 Outono 2024"
                              />
                            </div>
                            <div>
                              <Label htmlFor="vaccineType">Tipo de Vacina *</Label>
                              <Select value={newCampaign.vaccineType} onValueChange={(value) => setNewCampaign({ ...newCampaign, vaccineType: value })}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Selecione a vacina" />
                                </SelectTrigger>
                                <SelectContent>
                                  {vaccineTypes.map((vaccine) => (
                                    <SelectItem key={vaccine} value={vaccine}>
                                      {vaccine}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          <div>
                            <Label htmlFor="description">Descrição</Label>
                            <Textarea
                              id="description"
                              value={newCampaign.description}
                              onChange={(e) => setNewCampaign({ ...newCampaign, description: e.target.value })}
                              placeholder="Descreva os objetivos da campanha..."
                              rows={3}
                            />
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="targetAudience">Público-Alvo *</Label>
                              <Select value={newCampaign.targetAudience} onValueChange={(value) => setNewCampaign({ ...newCampaign, targetAudience: value })}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Selecione o público" />
                                </SelectTrigger>
                                <SelectContent>
                                  {targetAudiences.map((audience) => (
                                    <SelectItem key={audience} value={audience}>
                                      {audience}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <Label htmlFor="targetDoses">Meta de Doses *</Label>
                              <Input
                                id="targetDoses"
                                type="number"
                                value={newCampaign.targetDoses}
                                onChange={(e) => setNewCampaign({ ...newCampaign, targetDoses: e.target.value })}
                                placeholder="1000"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="startDate">Data de Início *</Label>
                              <Input
                                id="startDate"
                                type="date"
                                value={newCampaign.startDate}
                                onChange={(e) => setNewCampaign({ ...newCampaign, startDate: e.target.value })}
                              />
                            </div>
                            <div>
                              <Label htmlFor="endDate">Data de Término *</Label>
                              <Input
                                id="endDate"
                                type="date"
                                value={newCampaign.endDate}
                                onChange={(e) => setNewCampaign({ ...newCampaign, endDate: e.target.value })}
                              />
                            </div>
                          </div>

                          <div>
                            <Label>Unidades Participantes *</Label>
                            <div className="grid grid-cols-2 gap-3 mt-2">
                              {healthUnits.map((unit) => (
                                <div key={unit.id} className="flex items-center space-x-2">
                                  <Checkbox
                                    id={`unit-${unit.id}`}
                                    checked={newCampaign.units.includes(unit.name)}
                                    onCheckedChange={(checked) => handleUnitChange(unit.name, checked as boolean)}
                                  />
                                  <Label htmlFor={`unit-${unit.id}`} className="text-sm font-normal cursor-pointer">
                                    {unit.name}
                                  </Label>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="ageRange">Faixa Etária</Label>
                              <Input
                                id="ageRange"
                                value={newCampaign.ageRange}
                                onChange={(e) => setNewCampaign({ ...newCampaign, ageRange: e.target.value })}
                                placeholder="Ex: 60+ anos"
                              />
                            </div>
                            <div>
                              <Label htmlFor="publicTarget">Descrição do Público</Label>
                              <Input
                                id="publicTarget"
                                value={newCampaign.publicTarget}
                                onChange={(e) => setNewCampaign({ ...newCampaign, publicTarget: e.target.value })}
                                placeholder="Ex: Idosos e grupos de risco"
                              />
                            </div>
                          </div>

                          <div>
                            <Label htmlFor="notes">Observações</Label>
                            <Textarea
                              id="notes"
                              value={newCampaign.notes}
                              onChange={(e) => setNewCampaign({ ...newCampaign, notes: e.target.value })}
                              placeholder="Informações adicionais sobre a campanha..."
                              rows={2}
                            />
                          </div>

                          <div className="flex gap-3 pt-4">
                            <Button variant="outline" onClick={() => setIsNewCampaignDialogOpen(false)}>
                              Cancelar
                            </Button>
                            <Button onClick={handleCreateCampaign}>
                              Criar Campanha
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Campaigns List */}
            <div className="space-y-4">
              {filteredCampaigns.map((campaign) => (
                <Card key={campaign.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center">
                          <Syringe className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-medium">{campaign.name}</h3>
                            <Badge className={getStatusColor(campaign.status)} variant="secondary">
                              {getStatusIcon(campaign.status)}
                              <span className="ml-1">{getStatusText(campaign.status)}</span>
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{campaign.description}</p>
                          <div className="space-y-1 text-sm text-muted-foreground">
                            <p>Vacina: {campaign.vaccineType} • Público: {campaign.targetAudience}</p>
                            <p>Período: {campaign.startDate} até {campaign.endDate}</p>
                            <p>Unidades: {campaign.units.join(", ")}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-2xl font-semibold">
                          {campaign.appliedDoses}
                          <span className="text-sm text-muted-foreground">/{campaign.targetDoses}</span>
                        </div>
                        <div className={`text-sm font-medium ${getCoverageColor(campaign.coverage)}`}>
                          {campaign.coverage}% de cobertura
                        </div>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Progresso</span>
                        <span>{campaign.appliedDoses} de {campaign.targetDoses} doses</span>
                      </div>
                      <Progress value={campaign.coverage} className="h-2" />
                    </div>

                    {/* Campaign Details */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="bg-accent/50 p-3 rounded-lg">
                        <div className="text-sm text-muted-foreground">Criada em</div>
                        <div className="font-medium">{campaign.createdDate}</div>
                      </div>
                      <div className="bg-accent/50 p-3 rounded-lg">
                        <div className="text-sm text-muted-foreground">Última Atualização</div>
                        <div className="font-medium">{campaign.lastUpdate}</div>
                      </div>
                      <div className="bg-accent/50 p-3 rounded-lg">
                        <div className="text-sm text-muted-foreground">Público-Alvo</div>
                        <div className="font-medium">{campaign.publicTarget}</div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 pt-4 border-t">
                      <Button variant="outline" size="sm">
                        <Edit className="w-3 h-3 mr-1" />
                        Editar
                      </Button>
                      <Button variant="outline" size="sm">
                        <BarChart3 className="w-3 h-3 mr-1" />
                        Relatório
                      </Button>
                      <Button variant="outline" size="sm">
                        <Users className="w-3 h-3 mr-1" />
                        Vacinados
                      </Button>
                      {campaign.status === "active" && (
                        <Button variant="outline" size="sm">
                          <Pause className="w-3 h-3 mr-1" />
                          Pausar
                        </Button>
                      )}
                      {campaign.status === "scheduled" && (
                        <Button variant="outline" size="sm">
                          <Play className="w-3 h-3 mr-1" />
                          Iniciar
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Monitoring Tab */}
          <TabsContent value="monitoring" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Daily Applications */}
              <Card>
                <CardHeader>
                  <CardTitle>Aplicações Diárias</CardTitle>
                  <CardDescription>Doses aplicadas nos últimos dias</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {dailyApplications.map((day) => (
                      <div key={day.date} className="flex items-center justify-between">
                        <div>
                          <span className="text-sm font-medium">{day.date}</span>
                          <span className="text-xs text-muted-foreground ml-2">({day.campaign})</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-2 bg-accent rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-primary rounded-full"
                              style={{ width: `${(day.doses / 70) * 100}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium w-8 text-right">{day.doses}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Coverage by Campaign */}
              <Card>
                <CardHeader>
                  <CardTitle>Cobertura por Campanha</CardTitle>
                  <CardDescription>Progresso das campanhas ativas</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {campaigns.filter(c => c.status === "active").map((campaign) => (
                      <div key={campaign.id} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">{campaign.name}</span>
                          <span className="text-sm text-muted-foreground">
                            {campaign.appliedDoses}/{campaign.targetDoses}
                          </span>
                        </div>
                        <Progress value={campaign.coverage} className="h-2" />
                        <div className="text-xs text-muted-foreground">
                          {campaign.coverage}% de cobertura
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Relatórios de Vacinação</CardTitle>
                <CardDescription>Gere relatórios detalhados das campanhas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <BarChart3 className="w-5 h-5 text-primary" />
                        <h4 className="font-medium">Relatório Geral</h4>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        Visão geral de todas as campanhas
                      </p>
                      <Button size="sm" className="w-full">
                        <Download className="w-3 h-3 mr-1" />
                        Gerar Relatório
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <Target className="w-5 h-5 text-primary" />
                        <h4 className="font-medium">Cobertura Vacinal</h4>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        Relatório de cobertura por público-alvo
                      </p>
                      <Button size="sm" className="w-full">
                        <Download className="w-3 h-3 mr-1" />
                        Gerar Relatório
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <TrendingUp className="w-5 h-5 text-primary" />
                        <h4 className="font-medium">Análise Temporal</h4>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        Evolução das aplicações ao longo do tempo
                      </p>
                      <Button size="sm" className="w-full">
                        <Download className="w-3 h-3 mr-1" />
                        Gerar Relatório
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
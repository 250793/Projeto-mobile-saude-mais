import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { 
  ArrowLeft, 
  BarChart3, 
  Download,
  FileText,
  Calendar as CalendarIcon,
  TrendingUp,
  Users,
  Activity,
  Package,
  Syringe,
  Heart,
  Clock,
  MapPin,
  Filter,
  Eye,
  Settings
} from "lucide-react";

interface ReportsCenterProps {
  onBack: () => void;
}

export function ReportsCenter({ onBack }: ReportsCenterProps) {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [dateRange, setDateRange] = useState({
    from: new Date(2024, 8, 1), // September 1, 2024
    to: new Date(2024, 8, 20)   // September 20, 2024
  });
  const [selectedUnit, setSelectedUnit] = useState("all");
  const [selectedPeriod, setSelectedPeriod] = useState("month");

  // Mock data for reports
  const healthUnits = [
    { id: "ubs_centro", name: "UBS Centro" },
    { id: "ubs_norte", name: "UBS Norte" },
    { id: "ubs_sul", name: "UBS Sul" },
    { id: "ubs_leste", name: "UBS Leste" },
    { id: "ubs_oeste", name: "UBS Oeste" }
  ];

  const reportTemplates = [
    {
      id: "RPT001",
      name: "Relatório de Consultas",
      description: "Total de consultas realizadas por período",
      category: "medical",
      parameters: ["period", "unit", "doctor"],
      lastGenerated: "2024-09-20",
      frequency: "daily"
    },
    {
      id: "RPT002",
      name: "Estoque de Medicamentos",
      description: "Status atual do estoque por unidade",
      category: "inventory",
      parameters: ["unit", "medication", "status"],
      lastGenerated: "2024-09-20",
      frequency: "weekly"
    },
    {
      id: "RPT003",
      name: "Campanhas de Vacinação",
      description: "Relatório de doses aplicadas e metas",
      category: "campaigns",
      parameters: ["period", "unit", "vaccine"],
      lastGenerated: "2024-09-19",
      frequency: "monthly"
    },
    {
      id: "RPT004",
      name: "Produtividade Médica",
      description: "Número de atendimentos por médico",
      category: "medical",
      parameters: ["period", "doctor", "unit"],
      lastGenerated: "2024-09-18",
      frequency: "monthly"
    },
    {
      id: "RPT005",
      name: "Indicadores de Qualidade",
      description: "Métricas de qualidade do atendimento",
      category: "quality",
      parameters: ["period", "unit", "indicator"],
      lastGenerated: "2024-09-15",
      frequency: "monthly"
    },
    {
      id: "RPT006",
      name: "Financeiro - Custos",
      description: "Relatório de custos por categoria",
      category: "financial",
      parameters: ["period", "unit", "category"],
      lastGenerated: "2024-09-10",
      frequency: "monthly"
    }
  ];

  const dashboardMetrics = {
    consultations: {
      total: 1247,
      change: 12.5,
      trend: "up",
      data: [
        { unit: "UBS Centro", value: 320 },
        { unit: "UBS Norte", value: 285 },
        { unit: "UBS Sul", value: 298 },
        { unit: "UBS Leste", value: 192 },
        { unit: "UBS Oeste", value: 152 }
      ]
    },
    medications: {
      total: 15620,
      critical: 18,
      expiring: 7,
      data: [
        { category: "Analgésicos", value: 3200 },
        { category: "Antibióticos", value: 2800 },
        { category: "Anti-hipertensivos", value: 4100 },
        { category: "Antidiabéticos", value: 2400 },
        { category: "Outros", value: 3120 }
      ]
    },
    vaccines: {
      total: 892,
      target: 1200,
      coverage: 74.3,
      data: [
        { vaccine: "COVID-19", applied: 245, target: 300 },
        { vaccine: "Influenza", applied: 312, target: 400 },
        { vaccine: "HPV", applied: 156, target: 200 },
        { vaccine: "Hepatite B", applied: 179, target: 300 }
      ]
    },
    quality: {
      satisfaction: 87.2,
      waitTime: 32,
      resolvedFirstVisit: 76.8,
      data: [
        { metric: "Satisfação", value: 87.2, target: 85 },
        { metric: "Tempo de Espera", value: 32, target: 30 },
        { metric: "Resolução 1ª Consulta", value: 76.8, target: 75 }
      ]
    }
  };

  const recentReports = [
    {
      id: "GEN001",
      name: "Consultas - Setembro 2024",
      type: "Relatório de Consultas",
      generatedBy: "Sistema Automático",
      generatedDate: "2024-09-20 08:00",
      status: "completed",
      size: "2.3 MB",
      format: "PDF"
    },
    {
      id: "GEN002",
      name: "Estoque Mensal - UBS Centro",
      type: "Estoque de Medicamentos",
      generatedBy: "Lucia Ferreira",
      generatedDate: "2024-09-19 14:30",
      status: "completed",
      size: "1.8 MB",
      format: "Excel"
    },
    {
      id: "GEN003",
      name: "Vacinação - Relatório Trimestral",
      type: "Campanhas de Vacinação",
      generatedBy: "Ana Silva",
      generatedDate: "2024-09-18 16:45",
      status: "completed",
      size: "4.2 MB",
      format: "PDF"
    },
    {
      id: "GEN004",
      name: "Produtividade Agosto 2024",
      type: "Produtividade Médica",
      generatedBy: "Carlos Santos",
      generatedDate: "2024-09-15 10:20",
      status: "processing",
      size: "-",
      format: "PDF"
    }
  ];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "medical":
        return <Heart className="w-4 h-4" />;
      case "inventory":
        return <Package className="w-4 h-4" />;
      case "campaigns":
        return <Syringe className="w-4 h-4" />;
      case "quality":
        return <Activity className="w-4 h-4" />;
      case "financial":
        return <BarChart3 className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "medical":
        return "bg-rose-100 text-rose-800";
      case "inventory":
        return "bg-amber-100 text-amber-800";
      case "campaigns":
        return "bg-sky-100 text-sky-800";
      case "quality":
        return "bg-emerald-100 text-emerald-800";
      case "financial":
        return "bg-violet-100 text-violet-800";
      default:
        return "bg-slate-100 text-slate-800";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-emerald-100 text-emerald-800";
      case "processing":
        return "bg-amber-100 text-amber-800";
      case "failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-slate-100 text-slate-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return "Concluído";
      case "processing":
        return "Processando";
      case "failed":
        return "Falhou";
      default:
        return status;
    }
  };

  const getTrendIcon = (trend: string) => {
    return trend === "up" ? (
      <TrendingUp className="w-4 h-4 text-emerald-600" />
    ) : (
      <TrendingUp className="w-4 h-4 text-red-600 rotate-180" />
    );
  };

  const formatChange = (change: number) => {
    const sign = change >= 0 ? "+" : "";
    return `${sign}${change}%`;
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
              <BarChart3 className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg">Central de Relatórios</h1>
              <p className="text-sm text-muted-foreground">Análises e relatórios gerenciais</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 max-w-7xl mx-auto space-y-6">
        {/* Global Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex gap-3">
                <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                  <SelectTrigger className="w-[140px]">
                    <CalendarIcon className="w-4 h-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="week">Esta Semana</SelectItem>
                    <SelectItem value="month">Este Mês</SelectItem>
                    <SelectItem value="quarter">Este Trimestre</SelectItem>
                    <SelectItem value="year">Este Ano</SelectItem>
                    <SelectItem value="custom">Personalizado</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={selectedUnit} onValueChange={setSelectedUnit}>
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
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  Filtros Avançados
                </Button>
                <Button>
                  <Download className="w-4 h-4 mr-2" />
                  Exportar Dados
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="templates">Modelos de Relatório</TabsTrigger>
            <TabsTrigger value="history">Histórico</TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Consultas</p>
                      <p className="text-2xl font-semibold">{dashboardMetrics.consultations.total}</p>
                      <div className="flex items-center gap-1 mt-1">
                        {getTrendIcon(dashboardMetrics.consultations.trend)}
                        <span className="text-sm text-emerald-600">
                          {formatChange(dashboardMetrics.consultations.change)}
                        </span>
                      </div>
                    </div>
                    <div className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center">
                      <Heart className="w-5 h-5 text-rose-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Medicamentos</p>
                      <p className="text-2xl font-semibold">{dashboardMetrics.medications.total}</p>
                      <p className="text-sm text-red-600">
                        {dashboardMetrics.medications.critical} críticos
                      </p>
                    </div>
                    <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                      <Package className="w-5 h-5 text-amber-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Vacinação</p>
                      <p className="text-2xl font-semibold">{dashboardMetrics.vaccines.coverage}%</p>
                      <p className="text-sm text-muted-foreground">
                        {dashboardMetrics.vaccines.total}/{dashboardMetrics.vaccines.target}
                      </p>
                    </div>
                    <div className="w-10 h-10 bg-sky-100 rounded-full flex items-center justify-center">
                      <Syringe className="w-5 h-5 text-sky-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Satisfação</p>
                      <p className="text-2xl font-semibold">{dashboardMetrics.quality.satisfaction}%</p>
                      <p className="text-sm text-muted-foreground">
                        {dashboardMetrics.quality.waitTime}min espera
                      </p>
                    </div>
                    <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                      <Activity className="w-5 h-5 text-emerald-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Consultations by Unit */}
              <Card>
                <CardHeader>
                  <CardTitle>Consultas por Unidade</CardTitle>
                  <CardDescription>Distribuição de atendimentos no período</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {dashboardMetrics.consultations.data.map((item) => (
                      <div key={item.unit} className="flex items-center justify-between">
                        <span className="text-sm">{item.unit}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-24 h-2 bg-accent rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-primary rounded-full"
                              style={{ width: `${(item.value / 320) * 100}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium w-12 text-right">{item.value}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Vaccine Coverage */}
              <Card>
                <CardHeader>
                  <CardTitle>Cobertura Vacinal</CardTitle>
                  <CardDescription>Progresso por tipo de vacina</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {dashboardMetrics.vaccines.data.map((item) => (
                      <div key={item.vaccine} className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">{item.vaccine}</span>
                          <span className="text-sm font-medium">
                            {item.applied}/{item.target} ({Math.round((item.applied / item.target) * 100)}%)
                          </span>
                        </div>
                        <div className="w-full h-2 bg-accent rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-sky-500 rounded-full"
                            style={{ width: `${(item.applied / item.target) * 100}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Templates Tab */}
          <TabsContent value="templates" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Modelos de Relatório</CardTitle>
                <CardDescription>Gere relatórios personalizados com base nos modelos disponíveis</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {reportTemplates.map((template) => (
                    <Card key={template.id}>
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                            {getCategoryIcon(template.category)}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <h3 className="font-medium text-sm">{template.name}</h3>
                              <Badge className={getCategoryColor(template.category)} variant="secondary">
                                {template.category}
                              </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground mb-3">{template.description}</p>
                            <div className="space-y-2 text-xs text-muted-foreground">
                              <p>Último: {template.lastGenerated}</p>
                              <p>Frequência: {template.frequency}</p>
                            </div>
                            <div className="flex gap-2 mt-3">
                              <Button size="sm" className="flex-1">
                                <Download className="w-3 h-3 mr-1" />
                                Gerar
                              </Button>
                              <Button variant="outline" size="sm">
                                <Settings className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* History Tab */}
          <TabsContent value="history" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Histórico de Relatórios</CardTitle>
                <CardDescription>Relatórios gerados recentemente</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentReports.map((report) => (
                    <Card key={report.id}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                              <FileText className="w-5 h-5" />
                            </div>
                            <div>
                              <div className="flex items-center gap-3 mb-1">
                                <h3 className="font-medium">{report.name}</h3>
                                <Badge className={getStatusColor(report.status)} variant="secondary">
                                  {getStatusText(report.status)}
                                </Badge>
                              </div>
                              <div className="space-y-1 text-sm text-muted-foreground">
                                <p>Tipo: {report.type}</p>
                                <p>Gerado por: {report.generatedBy} • {report.generatedDate}</p>
                                <p>Formato: {report.format} • Tamanho: {report.size}</p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" disabled={report.status !== "completed"}>
                              <Eye className="w-3 h-3 mr-1" />
                              Visualizar
                            </Button>
                            <Button variant="outline" size="sm" disabled={report.status !== "completed"}>
                              <Download className="w-3 h-3 mr-1" />
                              Download
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
        </Tabs>
      </div>
    </div>
  );
}
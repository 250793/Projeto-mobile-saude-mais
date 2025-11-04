import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { 
  ArrowLeft, 
  Package, 
  Search, 
  Filter,
  Plus,
  AlertTriangle,
  TrendingDown,
  TrendingUp,
  Calendar,
  MapPin,
  BarChart3,
  Download,
  RefreshCcw
} from "lucide-react";

interface MedicationInventoryProps {
  onBack: () => void;
  onAddMedication: () => void;
  onManageBatches: () => void;
}

export function MedicationInventory({ onBack, onAddMedication, onManageBatches }: MedicationInventoryProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [unitFilter, setUnitFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Mock data
  const healthUnits = [
    { id: "ubs_centro", name: "UBS Centro" },
    { id: "ubs_norte", name: "UBS Norte" },
    { id: "ubs_sul", name: "UBS Sul" },
    { id: "ubs_leste", name: "UBS Leste" },
    { id: "ubs_oeste", name: "UBS Oeste" }
  ];

  const medicationCategories = [
    "Analgésicos",
    "Antibióticos", 
    "Anti-hipertensivos",
    "Antidiabéticos",
    "Anti-inflamatórios",
    "Antidepressivos",
    "Vitaminas",
    "Outros"
  ];

  const medications = [
    {
      id: "MED001",
      name: "Dipirona Sódica 500mg",
      category: "Analgésicos",
      manufacturer: "EMS",
      totalStock: 1250,
      minimumStock: 200,
      status: "adequate",
      unitStock: [
        { unit: "UBS Centro", quantity: 300, reserved: 20 },
        { unit: "UBS Norte", quantity: 250, reserved: 15 },
        { unit: "UBS Sul", quantity: 400, reserved: 30 },
        { unit: "UBS Leste", quantity: 200, reserved: 10 },
        { unit: "UBS Oeste", quantity: 100, reserved: 5 }
      ],
      lastUpdate: "2024-09-20",
      avgConsumption: 150,
      expiringBatches: 2
    },
    {
      id: "MED002", 
      name: "Amoxicilina 500mg",
      category: "Antibióticos",
      manufacturer: "Medley",
      totalStock: 50,
      minimumStock: 100,
      status: "low",
      unitStock: [
        { unit: "UBS Centro", quantity: 20, reserved: 5 },
        { unit: "UBS Norte", quantity: 10, reserved: 2 },
        { unit: "UBS Sul", quantity: 15, reserved: 3 },
        { unit: "UBS Leste", quantity: 5, reserved: 1 },
        { unit: "UBS Oeste", quantity: 0, reserved: 0 }
      ],
      lastUpdate: "2024-09-20",
      avgConsumption: 80,
      expiringBatches: 1
    },
    {
      id: "MED003",
      name: "Losartana Potássica 50mg", 
      category: "Anti-hipertensivos",
      manufacturer: "Eurofarma",
      totalStock: 800,
      minimumStock: 150,
      status: "adequate",
      unitStock: [
        { unit: "UBS Centro", quantity: 200, reserved: 15 },
        { unit: "UBS Norte", quantity: 180, reserved: 10 },
        { unit: "UBS Sul", quantity: 220, reserved: 20 },
        { unit: "UBS Leste", quantity: 150, reserved: 12 },
        { unit: "UBS Oeste", quantity: 50, reserved: 3 }
      ],
      lastUpdate: "2024-09-19",
      avgConsumption: 120,
      expiringBatches: 0
    },
    {
      id: "MED004",
      name: "Metformina 850mg",
      category: "Antidiabéticos", 
      manufacturer: "Sanofi",
      totalStock: 45,
      minimumStock: 80,
      status: "critical",
      unitStock: [
        { unit: "UBS Centro", quantity: 15, reserved: 5 },
        { unit: "UBS Norte", quantity: 10, reserved: 3 },
        { unit: "UBS Sul", quantity: 20, reserved: 8 },
        { unit: "UBS Leste", quantity: 0, reserved: 0 },
        { unit: "UBS Oeste", quantity: 0, reserved: 0 }
      ],
      lastUpdate: "2024-09-20",
      avgConsumption: 65,
      expiringBatches: 3
    },
    {
      id: "MED005",
      name: "Paracetamol 750mg",
      category: "Analgésicos",
      manufacturer: "Neo Química",
      totalStock: 950,
      minimumStock: 200,
      status: "adequate",
      unitStock: [
        { unit: "UBS Centro", quantity: 200, reserved: 10 },
        { unit: "UBS Norte", quantity: 190, reserved: 15 },
        { unit: "UBS Sul", quantity: 230, reserved: 20 },
        { unit: "UBS Leste", quantity: 180, reserved: 12 },
        { unit: "UBS Oeste", quantity: 150, reserved: 8 }
      ],
      lastUpdate: "2024-09-19",
      avgConsumption: 110,
      expiringBatches: 1
    }
  ];

  const filteredMedications = medications.filter(med => {
    const matchesSearch = med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         med.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         med.manufacturer.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || med.status === statusFilter;
    const matchesCategory = categoryFilter === "all" || med.category === categoryFilter;
    
    if (unitFilter === "all") {
      return matchesSearch && matchesStatus && matchesCategory;
    } else {
      const unitStock = med.unitStock.find(us => us.unit === unitFilter);
      return matchesSearch && matchesStatus && matchesCategory && unitStock;
    }
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "adequate":
        return "bg-emerald-100 text-emerald-800";
      case "low":
        return "bg-amber-100 text-amber-800";
      case "critical":
        return "bg-red-100 text-red-800";
      case "out_of_stock":
        return "bg-slate-100 text-slate-800";
      default:
        return "bg-slate-100 text-slate-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "adequate":
        return "Adequado";
      case "low":
        return "Estoque Baixo";
      case "critical":
        return "Crítico";
      case "out_of_stock":
        return "Sem Estoque";
      default:
        return status;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "adequate":
        return <TrendingUp className="w-4 h-4" />;
      case "low":
        return <TrendingDown className="w-4 h-4" />;
      case "critical":
        return <AlertTriangle className="w-4 h-4" />;
      default:
        return <Package className="w-4 h-4" />;
    }
  };

  const getTotalByStatus = (status: string) => {
    return medications.filter(med => med.status === status).length;
  };

  const getTotalStock = () => {
    return medications.reduce((total, med) => total + med.totalStock, 0);
  };

  const getExpiringCount = () => {
    return medications.reduce((total, med) => total + med.expiringBatches, 0);
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
              <Package className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg">Estoque de Medicamentos</h1>
              <p className="text-sm text-muted-foreground">Gestão e monitoramento do inventário</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 max-w-7xl mx-auto space-y-6">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-sky-100 rounded-full flex items-center justify-center">
                  <Package className="w-5 h-5 text-sky-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total de Itens</p>
                  <p className="text-2xl font-semibold">{getTotalStock()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Adequado</p>
                  <p className="text-2xl font-semibold">{getTotalByStatus("adequate")}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                  <TrendingDown className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Estoque Baixo</p>
                  <p className="text-2xl font-semibold">{getTotalByStatus("low")}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Crítico</p>
                  <p className="text-2xl font-semibold">{getTotalByStatus("critical")}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-violet-100 rounded-full flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-violet-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Vencendo</p>
                  <p className="text-2xl font-semibold">{getExpiringCount()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Actions */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar medicamentos..."
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
                    <SelectItem value="adequate">Adequado</SelectItem>
                    <SelectItem value="low">Estoque Baixo</SelectItem>
                    <SelectItem value="critical">Crítico</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas Categorias</SelectItem>
                    {medicationCategories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
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
                      <SelectItem key={unit.id} value={unit.name}>
                        {unit.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Button onClick={onAddMedication}>
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar
                </Button>
                
                <Button variant="outline" onClick={onManageBatches}>
                  <Package className="w-4 h-4 mr-2" />
                  Lotes
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Medications List */}
        <div className="space-y-4">
          {filteredMedications.map((medication) => (
            <Card key={medication.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center">
                      <Package className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-medium">{medication.name}</h3>
                        <Badge className={getStatusColor(medication.status)} variant="secondary">
                          {getStatusIcon(medication.status)}
                          <span className="ml-1">{getStatusText(medication.status)}</span>
                        </Badge>
                      </div>
                      <div className="space-y-1 text-sm text-muted-foreground">
                        <p>ID: {medication.id} • Categoria: {medication.category}</p>
                        <p>Fabricante: {medication.manufacturer}</p>
                        <p>Consumo médio: {medication.avgConsumption} unidades/mês</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-2xl font-semibold">{medication.totalStock}</div>
                    <div className="text-sm text-muted-foreground">
                      Mín: {medication.minimumStock}
                    </div>
                    {medication.expiringBatches > 0 && (
                      <div className="text-xs text-amber-600 mt-1">
                        {medication.expiringBatches} lote(s) vencendo
                      </div>
                    )}
                  </div>
                </div>

                {/* Stock by Unit */}
                <Tabs defaultValue="units" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="units">Estoque por Unidade</TabsTrigger>
                    <TabsTrigger value="details">Detalhes</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="units" className="mt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
                      {medication.unitStock.map((stock) => (
                        <div key={stock.unit} className="bg-accent/50 p-3 rounded-lg">
                          <div className="font-medium text-sm">{stock.unit}</div>
                          <div className="text-lg font-semibold">
                            {stock.quantity}
                            {stock.reserved > 0 && (
                              <span className="text-sm text-amber-600 ml-1">
                                ({stock.reserved} reservado)
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Disponível: {stock.quantity - stock.reserved}
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="details" className="mt-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-accent/50 p-3 rounded-lg">
                        <div className="text-sm text-muted-foreground">Última Atualização</div>
                        <div className="font-medium">{medication.lastUpdate}</div>
                      </div>
                      <div className="bg-accent/50 p-3 rounded-lg">
                        <div className="text-sm text-muted-foreground">Consumo Médio Mensal</div>
                        <div className="font-medium">{medication.avgConsumption} unidades</div>
                      </div>
                      <div className="bg-accent/50 p-3 rounded-lg">
                        <div className="text-sm text-muted-foreground">Estoque Mínimo</div>
                        <div className="font-medium">{medication.minimumStock} unidades</div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>

                {/* Actions */}
                <div className="flex gap-2 mt-4 pt-4 border-t">
                  <Button variant="outline" size="sm">
                    <RefreshCcw className="w-3 h-3 mr-1" />
                    Atualizar Estoque
                  </Button>
                  <Button variant="outline" size="sm">
                    <BarChart3 className="w-3 h-3 mr-1" />
                    Histórico
                  </Button>
                  <Button variant="outline" size="sm">
                    <Calendar className="w-3 h-3 mr-1" />
                    Lotes
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="w-3 h-3 mr-1" />
                    Relatório
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredMedications.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-medium mb-2">Nenhum medicamento encontrado</h3>
              <p className="text-muted-foreground mb-4">
                Tente ajustar os filtros de busca ou adicione um novo medicamento.
              </p>
              <Button onClick={onAddMedication}>
                <Plus className="w-4 h-4 mr-2" />
                Adicionar Medicamento
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { 
  ArrowLeft, 
  Package, 
  Search, 
  Filter,
  Plus,
  AlertTriangle,
  Calendar,
  MapPin,
  QrCode,
  Truck,
  CheckCircle,
  XCircle,
  Clock
} from "lucide-react";

interface BatchManagementProps {
  onBack: () => void;
}

export function BatchManagement({ onBack }: BatchManagementProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [unitFilter, setUnitFilter] = useState("all");
  const [expiryFilter, setExpiryFilter] = useState("all");
  const [isNewBatchDialogOpen, setIsNewBatchDialogOpen] = useState(false);

  const [newBatch, setNewBatch] = useState({
    medicationId: "",
    batchNumber: "",
    quantity: "",
    manufacturingDate: "",
    expiryDate: "", 
    supplier: "",
    unitPrice: "",
    totalCost: "",
    destinationUnit: "",
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

  const medications = [
    { id: "MED001", name: "Dipirona Sódica 500mg" },
    { id: "MED002", name: "Amoxicilina 500mg" },
    { id: "MED003", name: "Losartana Potássica 50mg" },
    { id: "MED004", name: "Metformina 850mg" },
    { id: "MED005", name: "Paracetamol 750mg" }
  ];

  const suppliers = [
    "EMS Pharma",
    "Medley",
    "Eurofarma",
    "Sanofi",
    "Neo Química",
    "Germed",
    "Biosintética"
  ];

  const batches = [
    {
      id: "BATCH001",
      medicationId: "MED001",
      medicationName: "Dipirona Sódica 500mg",
      batchNumber: "DP240915001",
      quantity: 500,
      originalQuantity: 500,
      manufacturingDate: "2024-09-15",
      expiryDate: "2026-09-15",
      supplier: "EMS Pharma",
      unitPrice: 2.50,
      totalCost: 1250.00,
      unit: "UBS Centro",
      status: "active",
      daysToExpiry: 730,
      receivedDate: "2024-09-20",
      notes: "Lote regular - sem observações"
    },
    {
      id: "BATCH002",
      medicationId: "MED002", 
      medicationName: "Amoxicilina 500mg",
      batchNumber: "AM240910002",
      quantity: 80,
      originalQuantity: 200,
      manufacturingDate: "2024-09-10",
      expiryDate: "2025-03-10",
      supplier: "Medley",
      unitPrice: 1.80,
      totalCost: 360.00,
      unit: "UBS Norte",
      status: "expiring_soon",
      daysToExpiry: 180,
      receivedDate: "2024-09-18",
      notes: "Atenção: Vencimento próximo"
    },
    {
      id: "BATCH003",
      medicationId: "MED003",
      medicationName: "Losartana Potássica 50mg", 
      batchNumber: "LO240905003",
      quantity: 300,
      originalQuantity: 300,
      manufacturingDate: "2024-09-05",
      expiryDate: "2027-09-05",
      supplier: "Eurofarma",
      unitPrice: 0.95,
      totalCost: 285.00,
      unit: "UBS Sul",
      status: "active",
      daysToExpiry: 1095,
      receivedDate: "2024-09-15",
      notes: ""
    },
    {
      id: "BATCH004",
      medicationId: "MED004",
      medicationName: "Metformina 850mg",
      batchNumber: "MT240820004",
      quantity: 0,
      originalQuantity: 150,
      manufacturingDate: "2024-08-20",
      expiryDate: "2024-12-20",
      supplier: "Sanofi",
      unitPrice: 3.20,
      totalCost: 480.00,
      unit: "UBS Leste",
      status: "depleted",
      daysToExpiry: 90,
      receivedDate: "2024-09-01",
      notes: "Lote esgotado - solicitar reposição"
    },
    {
      id: "BATCH005",
      medicationId: "MED001",
      medicationName: "Dipirona Sódica 500mg",
      batchNumber: "DP240801005",
      quantity: 45,
      originalQuantity: 100,
      manufacturingDate: "2024-08-01",
      expiryDate: "2024-10-01",
      supplier: "EMS Pharma",
      unitPrice: 2.50,
      totalCost: 250.00,
      unit: "UBS Oeste",
      status: "expired",
      daysToExpiry: -20,
      receivedDate: "2024-08-15",
      notes: "Lote vencido - remover do estoque"
    },
    {
      id: "BATCH006",
      medicationId: "MED005",
      medicationName: "Paracetamol 750mg",
      batchNumber: "PC240912006",
      quantity: 400,
      originalQuantity: 400,
      manufacturingDate: "2024-09-12",
      expiryDate: "2026-09-12",
      supplier: "Neo Química",
      unitPrice: 1.20,
      totalCost: 480.00,
      unit: "UBS Centro",
      status: "active",
      daysToExpiry: 728,
      receivedDate: "2024-09-20",
      notes: "Novo lote recebido"
    }
  ];

  const filteredBatches = batches.filter(batch => {
    const matchesSearch = batch.medicationName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         batch.batchNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         batch.supplier.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || batch.status === statusFilter;
    const matchesUnit = unitFilter === "all" || batch.unit === unitFilter;
    
    let matchesExpiry = true;
    if (expiryFilter === "expiring_30") {
      matchesExpiry = batch.daysToExpiry <= 30 && batch.daysToExpiry > 0;
    } else if (expiryFilter === "expiring_90") {
      matchesExpiry = batch.daysToExpiry <= 90 && batch.daysToExpiry > 0;
    } else if (expiryFilter === "expired") {
      matchesExpiry = batch.daysToExpiry <= 0;
    }
    
    return matchesSearch && matchesStatus && matchesUnit && matchesExpiry;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-emerald-100 text-emerald-800";
      case "expiring_soon":
        return "bg-amber-100 text-amber-800";
      case "expired":
        return "bg-red-100 text-red-800";
      case "depleted":
        return "bg-slate-100 text-slate-800";
      default:
        return "bg-slate-100 text-slate-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "Ativo";
      case "expiring_soon":
        return "Vencendo";
      case "expired":
        return "Vencido";
      case "depleted":
        return "Esgotado";
      default:
        return status;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="w-4 h-4" />;
      case "expiring_soon":
        return <Clock className="w-4 h-4" />;
      case "expired":
        return <XCircle className="w-4 h-4" />;
      case "depleted":
        return <Package className="w-4 h-4" />;
      default:
        return <Package className="w-4 h-4" />;
    }
  };

  const getExpiryColor = (daysToExpiry: number) => {
    if (daysToExpiry <= 0) return "text-red-600";
    if (daysToExpiry <= 30) return "text-red-600";
    if (daysToExpiry <= 90) return "text-amber-600";
    return "text-slate-600";
  };

  const formatExpiryText = (daysToExpiry: number) => {
    if (daysToExpiry <= 0) return `Vencido há ${Math.abs(daysToExpiry)} dias`;
    if (daysToExpiry === 1) return "Vence em 1 dia";
    if (daysToExpiry <= 30) return `Vence em ${daysToExpiry} dias`;
    if (daysToExpiry <= 365) return `Vence em ${Math.round(daysToExpiry / 30)} meses`;
    return `Vence em ${Math.round(daysToExpiry / 365)} anos`;
  };

  const handleNewBatchSubmit = () => {
    // Aqui você salvaria o novo lote
    console.log("Novo lote:", newBatch);
    setIsNewBatchDialogOpen(false);
    setNewBatch({
      medicationId: "",
      batchNumber: "",
      quantity: "",
      manufacturingDate: "",
      expiryDate: "",
      supplier: "",
      unitPrice: "",
      totalCost: "",
      destinationUnit: "",
      notes: ""
    });
  };

  const getTotalsByStatus = () => {
    return {
      active: batches.filter(b => b.status === "active").length,
      expiring: batches.filter(b => b.status === "expiring_soon" || (b.daysToExpiry <= 90 && b.daysToExpiry > 0)).length,
      expired: batches.filter(b => b.status === "expired" || b.daysToExpiry <= 0).length,
      depleted: batches.filter(b => b.status === "depleted").length
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
              <QrCode className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg">Gestão de Lotes</h1>
              <p className="text-sm text-muted-foreground">Controle de lotes e validades</p>
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
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Lotes Ativos</p>
                  <p className="text-2xl font-semibold">{stats.active}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                  <Clock className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Vencendo</p>
                  <p className="text-2xl font-semibold">{stats.expiring}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <XCircle className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Vencidos</p>
                  <p className="text-2xl font-semibold">{stats.expired}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center">
                  <Package className="w-5 h-5 text-slate-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Esgotados</p>
                  <p className="text-2xl font-semibold">{stats.depleted}</p>
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
                    placeholder="Buscar por medicamento, lote ou fornecedor..."
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
                    <SelectItem value="active">Ativo</SelectItem>
                    <SelectItem value="expiring_soon">Vencendo</SelectItem>
                    <SelectItem value="expired">Vencido</SelectItem>
                    <SelectItem value="depleted">Esgotado</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={expiryFilter} onValueChange={setExpiryFilter}>
                  <SelectTrigger className="w-[140px]">
                    <Calendar className="w-4 h-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas Validades</SelectItem>
                    <SelectItem value="expiring_30">Vence em 30 dias</SelectItem>
                    <SelectItem value="expiring_90">Vence em 90 dias</SelectItem>
                    <SelectItem value="expired">Vencidos</SelectItem>
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
                
                <Dialog open={isNewBatchDialogOpen} onOpenChange={setIsNewBatchDialogOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      Novo Lote
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Cadastrar Novo Lote</DialogTitle>
                      <DialogDescription>
                        Registre um novo lote de medicamento no sistema
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="medicationId">Medicamento *</Label>
                          <Select value={newBatch.medicationId} onValueChange={(value) => setNewBatch({ ...newBatch, medicationId: value })}>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione o medicamento" />
                            </SelectTrigger>
                            <SelectContent>
                              {medications.map((med) => (
                                <SelectItem key={med.id} value={med.id}>
                                  {med.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="batchNumber">Número do Lote *</Label>
                          <Input
                            id="batchNumber"
                            value={newBatch.batchNumber}
                            onChange={(e) => setNewBatch({ ...newBatch, batchNumber: e.target.value })}
                            placeholder="Ex: DP240920001"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="quantity">Quantidade *</Label>
                          <Input
                            id="quantity"
                            type="number"
                            value={newBatch.quantity}
                            onChange={(e) => setNewBatch({ ...newBatch, quantity: e.target.value })}
                            placeholder="500"
                          />
                        </div>
                        <div>
                          <Label htmlFor="supplier">Fornecedor *</Label>
                          <Select value={newBatch.supplier} onValueChange={(value) => setNewBatch({ ...newBatch, supplier: value })}>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione o fornecedor" />
                            </SelectTrigger>
                            <SelectContent>
                              {suppliers.map((supplier) => (
                                <SelectItem key={supplier} value={supplier}>
                                  {supplier}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="manufacturingDate">Data de Fabricação *</Label>
                          <Input
                            id="manufacturingDate"
                            type="date"
                            value={newBatch.manufacturingDate}
                            onChange={(e) => setNewBatch({ ...newBatch, manufacturingDate: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label htmlFor="expiryDate">Data de Validade *</Label>
                          <Input
                            id="expiryDate"
                            type="date"
                            value={newBatch.expiryDate}
                            onChange={(e) => setNewBatch({ ...newBatch, expiryDate: e.target.value })}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="unitPrice">Preço Unitário (R$)</Label>
                          <Input
                            id="unitPrice"
                            type="number"
                            step="0.01"
                            value={newBatch.unitPrice}
                            onChange={(e) => setNewBatch({ ...newBatch, unitPrice: e.target.value })}
                            placeholder="2.50"
                          />
                        </div>
                        <div>
                          <Label htmlFor="destinationUnit">Unidade de Destino *</Label>
                          <Select value={newBatch.destinationUnit} onValueChange={(value) => setNewBatch({ ...newBatch, destinationUnit: value })}>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione a unidade" />
                            </SelectTrigger>
                            <SelectContent>
                              {healthUnits.map((unit) => (
                                <SelectItem key={unit.id} value={unit.name}>
                                  {unit.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="notes">Observações</Label>
                        <Textarea
                          id="notes"
                          value={newBatch.notes}
                          onChange={(e) => setNewBatch({ ...newBatch, notes: e.target.value })}
                          placeholder="Informações adicionais sobre o lote..."
                          rows={3}
                        />
                      </div>

                      <div className="flex gap-3 pt-4">
                        <Button variant="outline" onClick={() => setIsNewBatchDialogOpen(false)}>
                          Cancelar
                        </Button>
                        <Button onClick={handleNewBatchSubmit}>
                          Cadastrar Lote
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Batches List */}
        <div className="space-y-4">
          {filteredBatches.map((batch) => (
            <Card key={batch.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center">
                      <QrCode className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-medium">{batch.medicationName}</h3>
                        <Badge className={getStatusColor(batch.status)} variant="secondary">
                          {getStatusIcon(batch.status)}
                          <span className="ml-1">{getStatusText(batch.status)}</span>
                        </Badge>
                      </div>
                      <div className="space-y-1 text-sm text-muted-foreground">
                        <p>Lote: {batch.batchNumber} • {batch.supplier}</p>
                        <p>Fabricação: {batch.manufacturingDate} • Validade: {batch.expiryDate}</p>
                        <p className={getExpiryColor(batch.daysToExpiry)}>
                          {formatExpiryText(batch.daysToExpiry)}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-2xl font-semibold">
                      {batch.quantity}
                      <span className="text-sm text-muted-foreground">/{batch.originalQuantity}</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {batch.unit}
                    </div>
                    <div className="text-sm font-medium">
                      R$ {batch.unitPrice.toFixed(2)}/un
                    </div>
                  </div>
                </div>

                {/* Additional Information */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                  <div className="bg-accent/50 p-3 rounded-lg">
                    <div className="text-sm text-muted-foreground">Recebido em</div>
                    <div className="font-medium">{batch.receivedDate}</div>
                  </div>
                  <div className="bg-accent/50 p-3 rounded-lg">
                    <div className="text-sm text-muted-foreground">Custo Total</div>
                    <div className="font-medium">R$ {batch.totalCost.toFixed(2)}</div>
                  </div>
                  <div className="bg-accent/50 p-3 rounded-lg">
                    <div className="text-sm text-muted-foreground">Utilização</div>
                    <div className="font-medium">
                      {Math.round(((batch.originalQuantity - batch.quantity) / batch.originalQuantity) * 100)}%
                    </div>
                  </div>
                  <div className="bg-accent/50 p-3 rounded-lg">
                    <div className="text-sm text-muted-foreground">ID do Lote</div>
                    <div className="font-medium">{batch.id}</div>
                  </div>
                </div>

                {batch.notes && (
                  <div className="bg-accent/30 p-3 rounded-lg mb-4">
                    <div className="text-sm text-muted-foreground mb-1">Observações:</div>
                    <div className="text-sm">{batch.notes}</div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-2 pt-4 border-t">
                  <Button variant="outline" size="sm">
                    <Package className="w-3 h-3 mr-1" />
                    Movimentar
                  </Button>
                  <Button variant="outline" size="sm">
                    <Truck className="w-3 h-3 mr-1" />
                    Transferir
                  </Button>
                  <Button variant="outline" size="sm">
                    <Calendar className="w-3 h-3 mr-1" />
                    Histórico
                  </Button>
                  {batch.status === "expired" && (
                    <Button variant="destructive" size="sm">
                      <XCircle className="w-3 h-3 mr-1" />
                      Remover Estoque
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredBatches.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <QrCode className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-medium mb-2">Nenhum lote encontrado</h3>
              <p className="text-muted-foreground mb-4">
                Tente ajustar os filtros de busca ou cadastre um novo lote.
              </p>
              <Button onClick={() => setIsNewBatchDialogOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Cadastrar Novo Lote
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { Badge } from "./ui/badge";
import { Alert, AlertDescription } from "./ui/alert";
import {
  ArrowLeft,
  Pill,
  Save,
  AlertTriangle,
  Info,
  Plus,
  Trash2,
  Upload,
  FileText,
  CheckCircle,
  Package,
} from "lucide-react";

interface MedicationRegistrationProps {
  onBack: () => void;
  onSave: (medication: any) => void;
}

export function MedicationRegistration({
  onBack,
  onSave,
}: MedicationRegistrationProps) {
  const [medicationData, setMedicationData] = useState({
    name: "",
    activeIngredient: "",
    concentration: "",
    pharmaceuticalForm: "",
    category: "",
    therapeuticClass: "",
    manufacturer: "",
    registrationNumber: "",
    barcode: "",
    minimumStock: "",
    maximumStock: "",
    unitOfMeasure: "",
    storageConditions: "",
    controlledMedication: false,
    requiresPrescription: true,
    contraindications: [],
    sideEffects: [],
    interactions: [],
    administration: "",
    dosage: "",
    observations: "",
    // Campos para nota fiscal
    invoiceNumber: "",
    batchNumber: "",
    quantity: "",
    unitValue: "",
    totalValue: "",
    expiryDate: "",
    manufacturingDate: "",
    supplierCnpj: "",
  });

  const [newContraindication, setNewContraindication] =
    useState("");
  const [newSideEffect, setNewSideEffect] = useState("");
  const [newInteraction, setNewInteraction] = useState("");
  const [xmlFile, setXmlFile] = useState<File | null>(null);
  const [xmlParsed, setXmlParsed] = useState(false);
  const [showInvoiceFields, setShowInvoiceFields] =
    useState(false);

  const categories = [
    "Analgésicos",
    "Anti-inflamatórios",
    "Antibióticos",
    "Antifúngicos",
    "Antivirais",
    "Anti-hipertensivos",
    "Antidiabéticos",
    "Cardiovasculares",
    "Gastroenterológicos",
    "Neurológicos",
    "Psiquiátricos",
    "Dermatológicos",
    "Oftalmológicos",
    "Otorrinolaringológicos",
    "Respiratórios",
    "Vitaminas e Minerais",
    "Hormônios",
    "Outros",
  ];

  const pharmaceuticalForms = [
    "Comprimido",
    "Cápsula",
    "Comprimido Revestido",
    "Comprimido Efervescente",
    "Drágea",
    "Solução Oral",
    "Suspensão Oral",
    "Xarope",
    "Solução Injetável",
    "Pomada",
    "Creme",
    "Gel",
    "Loção",
    "Colírio",
    "Spray Nasal",
    "Inalador",
    "Supositório",
    "Óvulo",
    "Adesivo Transdérmico",
  ];

  const unitsOfMeasure = [
    "mg",
    "g",
    "ml",
    "mg/ml",
    "UI",
    "mcg",
    "%",
    "comprimidos",
    "cápsulas",
    "frascos",
    "ampolas",
    "bisnagas",
    "unidades",
  ];

  const storageConditions = [
    "Temperatura ambiente (15-30°C)",
    "Temperatura controlada (15-25°C)",
    "Refrigerado (2-8°C)",
    "Congelado (-20°C)",
    "Proteger da luz",
    "Proteger da umidade",
    "Manter em recipiente fechado",
  ];

  const therapeuticClasses = [
    "ATC - A - Aparelho digestivo e metabolismo",
    "ATC - B - Sangue e órgãos hematopoiéticos",
    "ATC - C - Aparelho cardiovascular",
    "ATC - D - Medicamentos dermatológicos",
    "ATC - G - Aparelho geniturinário e hormônios sexuais",
    "ATC - H - Preparações hormonais sistêmicas",
    "ATC - J - Anti-infecciosos gerais para uso sistêmico",
    "ATC - L - Medicamentos antineoplásicos e imunomoduladores",
    "ATC - M - Sistema musculoesquelético",
    "ATC - N - Sistema nervoso",
    "ATC - P - Medicamentos antiparasitários",
    "ATC - R - Sistema respiratório",
    "ATC - S - Órgãos dos sentidos",
    "ATC - V - Vários",
  ];

  const addContraindication = () => {
    if (
      newContraindication &&
      !medicationData.contraindications.includes(
        newContraindication,
      )
    ) {
      setMedicationData({
        ...medicationData,
        contraindications: [
          ...medicationData.contraindications,
          newContraindication,
        ],
      });
      setNewContraindication("");
    }
  };

  const removeContraindication = (contraindication: string) => {
    setMedicationData({
      ...medicationData,
      contraindications:
        medicationData.contraindications.filter(
          (c) => c !== contraindication,
        ),
    });
  };

  const addSideEffect = () => {
    if (
      newSideEffect &&
      !medicationData.sideEffects.includes(newSideEffect)
    ) {
      setMedicationData({
        ...medicationData,
        sideEffects: [
          ...medicationData.sideEffects,
          newSideEffect,
        ],
      });
      setNewSideEffect("");
    }
  };

  const removeSideEffect = (sideEffect: string) => {
    setMedicationData({
      ...medicationData,
      sideEffects: medicationData.sideEffects.filter(
        (e) => e !== sideEffect,
      ),
    });
  };

  const addInteraction = () => {
    if (
      newInteraction &&
      !medicationData.interactions.includes(newInteraction)
    ) {
      setMedicationData({
        ...medicationData,
        interactions: [
          ...medicationData.interactions,
          newInteraction,
        ],
      });
      setNewInteraction("");
    }
  };

  const removeInteraction = (interaction: string) => {
    setMedicationData({
      ...medicationData,
      interactions: medicationData.interactions.filter(
        (i) => i !== interaction,
      ),
    });
  };

  const handleXmlUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (
      file &&
      (file.type === "application/xml" ||
        file.name.endsWith(".xml"))
    ) {
      setXmlFile(file);
      parseXmlFile(file);
    } else {
      alert("Por favor, selecione um arquivo XML válido.");
    }
  };

  const parseXmlFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const xmlContent = e.target?.result as string;
      try {
        // Simulação de parsing de XML NFe (Nota Fiscal Eletrônica)
        // Em um ambiente real, você usaria uma biblioteca como xml2js
        const mockNfeData = {
          medicationName: "Dipirona Sódica 500mg",
          manufacturer: "EMS S/A",
          batchNumber: "LOT123456",
          quantity: "1000",
          unitValue: "2.50",
          totalValue: "2500.00",
          expiryDate: "2025-12-31",
          manufacturingDate: "2024-01-15",
          invoiceNumber: "NFE001234567",
          supplierCnpj: "12.345.678/0001-90",
          barcode: "7891234567890",
          activeIngredient: "Dipirona Sódica",
          concentration: "500mg",
        };

        // Atualizar os campos com os dados do XML
        setMedicationData((prev) => ({
          ...prev,
          name: mockNfeData.medicationName,
          manufacturer: mockNfeData.manufacturer,
          batchNumber: mockNfeData.batchNumber,
          quantity: mockNfeData.quantity,
          unitValue: mockNfeData.unitValue,
          totalValue: mockNfeData.totalValue,
          expiryDate: mockNfeData.expiryDate,
          manufacturingDate: mockNfeData.manufacturingDate,
          invoiceNumber: mockNfeData.invoiceNumber,
          supplierCnpj: mockNfeData.supplierCnpj,
          barcode: mockNfeData.barcode,
          activeIngredient: mockNfeData.activeIngredient,
          concentration: mockNfeData.concentration,
        }));

        setXmlParsed(true);
        setShowInvoiceFields(true);
      } catch (error) {
        alert(
          "Erro ao processar o arquivo XML. Verifique se o formato está correto.",
        );
        console.error("Erro no parsing do XML:", error);
      }
    };
    reader.readAsText(file);
  };

  const clearXmlData = () => {
    setXmlFile(null);
    setXmlParsed(false);
    setShowInvoiceFields(false);
    // Limpar campos preenchidos pelo XML
    setMedicationData((prev) => ({
      ...prev,
      invoiceNumber: "",
      batchNumber: "",
      quantity: "",
      unitValue: "",
      totalValue: "",
      expiryDate: "",
      manufacturingDate: "",
      supplierCnpj: "",
    }));
  };

  const handleSave = () => {
    const medicationWithId = {
      ...medicationData,
      id: `MED${String(Date.now()).slice(-4)}`,
      registrationDate: new Date().toLocaleDateString("pt-BR"),
      status: "active",
      currentStock: 0,
    };

    onSave(medicationWithId);
  };

  const validateForm = () => {
    return (
      medicationData.name &&
      medicationData.activeIngredient &&
      medicationData.pharmaceuticalForm &&
      medicationData.category &&
      medicationData.manufacturer
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border p-4 sm:p-6">
        <div className="flex items-center gap-3 max-w-6xl mx-auto">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary rounded-full flex items-center justify-center">
              <Pill className="w-5 h-5 sm:w-6 sm:h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl md:text-2xl">
                Cadastrar Medicamento
              </h1>
              <p className="text-sm sm:text-base text-muted-foreground">
                Registre um novo medicamento no sistema
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto space-y-6">
        {/* Basic Information */}
        <Card>
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
              <Info className="w-5 h-5 text-sky-400" />
              Informações Básicas
            </CardTitle>
            <CardDescription className="text-sm sm:text-base">
              Dados principais do medicamento
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 sm:space-y-6 p-4 sm:p-6 pt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <Label
                  htmlFor="name"
                  className="text-sm sm:text-base"
                >
                  Nome Comercial *
                </Label>
                <Input
                  id="name"
                  value={medicationData.name}
                  onChange={(e) =>
                    setMedicationData({
                      ...medicationData,
                      name: e.target.value,
                    })
                  }
                  placeholder="Ex: Dipirona Sódica"
                  className="h-11 sm:h-12 text-sm sm:text-base"
                />
              </div>
              <div>
                <Label
                  htmlFor="activeIngredient"
                  className="text-sm sm:text-base"
                >
                  Princípio Ativo *
                </Label>
                <Input
                  id="activeIngredient"
                  value={medicationData.activeIngredient}
                  onChange={(e) =>
                    setMedicationData({
                      ...medicationData,
                      activeIngredient: e.target.value,
                    })
                  }
                  placeholder="Ex: Dipirona Sódica"
                  className="h-11 sm:h-12 text-sm sm:text-base"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <div>
                <Label
                  htmlFor="concentration"
                  className="text-sm sm:text-base"
                >
                  Concentração
                </Label>
                <Input
                  id="concentration"
                  value={medicationData.concentration}
                  onChange={(e) =>
                    setMedicationData({
                      ...medicationData,
                      concentration: e.target.value,
                    })
                  }
                  placeholder="Ex: 500mg"
                  className="h-11 sm:h-12 text-sm sm:text-base"
                />
              </div>
              <div>
                <Label
                  htmlFor="pharmaceuticalForm"
                  className="text-sm sm:text-base"
                >
                  Forma Farmacêutica *
                </Label>
                <Select
                  value={medicationData.pharmaceuticalForm}
                  onValueChange={(value) =>
                    setMedicationData({
                      ...medicationData,
                      pharmaceuticalForm: value,
                    })
                  }
                >
                  <SelectTrigger className="h-11 sm:h-12 text-sm sm:text-base">
                    <SelectValue placeholder="Selecione a forma" />
                  </SelectTrigger>
                  <SelectContent>
                    {pharmaceuticalForms.map((form) => (
                      <SelectItem key={form} value={form}>
                        {form}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label
                  htmlFor="unitOfMeasure"
                  className="text-sm sm:text-base"
                >
                  Unidade de Medida
                </Label>
                <Select
                  value={medicationData.unitOfMeasure}
                  onValueChange={(value) =>
                    setMedicationData({
                      ...medicationData,
                      unitOfMeasure: value,
                    })
                  }
                >
                  <SelectTrigger className="h-11 sm:h-12 text-sm sm:text-base">
                    <SelectValue placeholder="Selecione a unidade" />
                  </SelectTrigger>
                  <SelectContent>
                    {unitsOfMeasure.map((unit) => (
                      <SelectItem key={unit} value={unit}>
                        {unit}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <Label
                  htmlFor="category"
                  className="text-sm sm:text-base"
                >
                  Categoria *
                </Label>
                <Select
                  value={medicationData.category}
                  onValueChange={(value) =>
                    setMedicationData({
                      ...medicationData,
                      category: value,
                    })
                  }
                >
                  <SelectTrigger className="h-11 sm:h-12 text-sm sm:text-base">
                    <SelectValue placeholder="Selecione a categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem
                        key={category}
                        value={category}
                      >
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label
                  htmlFor="therapeuticClass"
                  className="text-sm sm:text-base"
                >
                  Classe Terapêutica
                </Label>
                <Select
                  value={medicationData.therapeuticClass}
                  onValueChange={(value) =>
                    setMedicationData({
                      ...medicationData,
                      therapeuticClass: value,
                    })
                  }
                >
                  <SelectTrigger className="h-11 sm:h-12 text-sm sm:text-base">
                    <SelectValue placeholder="Selecione a classe terapêutica" />
                  </SelectTrigger>
                  <SelectContent>
                    {therapeuticClasses.map(
                      (therapeuticClass) => (
                        <SelectItem
                          key={therapeuticClass}
                          value={therapeuticClass}
                        >
                          {therapeuticClass}
                        </SelectItem>
                      ),
                    )}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* XML Invoice Upload */}
        <Card>
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
              <FileText className="w-5 h-5 text-violet-400" />
              Importar Nota Fiscal (XML)
            </CardTitle>
            <CardDescription className="text-sm sm:text-base">
              Carregue o arquivo XML da nota fiscal para
              preencher automaticamente os dados do medicamento
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 sm:space-y-6 p-4 sm:p-6 pt-0">
            {!xmlParsed ? (
              <div>
                <Label
                  htmlFor="xmlUpload"
                  className="text-sm sm:text-base"
                >
                  Arquivo XML da Nota Fiscal
                </Label>
                <div className="mt-2">
                  <div className="flex items-center justify-center w-full">
                    <label
                      htmlFor="xmlUpload"
                      className="flex flex-col items-center justify-center w-full h-32 border-2 border-border border-dashed rounded-lg cursor-pointer bg-muted/30 hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-8 h-8 mb-4 text-muted-foreground" />
                        <p className="mb-2 text-sm text-muted-foreground">
                          <span className="font-medium">
                            Clique para fazer upload
                          </span>{" "}
                          ou arraste e solte
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Apenas arquivos XML (MAX. 10MB)
                        </p>
                      </div>
                      <input
                        id="xmlUpload"
                        type="file"
                        className="hidden"
                        accept=".xml,application/xml"
                        onChange={handleXmlUpload}
                      />
                    </label>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <Alert>
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>
                    Arquivo XML processado com sucesso! Os dados
                    foram importados automaticamente.
                  </AlertDescription>
                </Alert>

                <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-violet-400" />
                    <div>
                      <p className="font-medium">
                        {xmlFile?.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {xmlFile &&
                          (xmlFile.size / 1024).toFixed(1)}{" "}
                        KB
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={clearXmlData}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Remover
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Invoice Information - Only shown after XML upload */}
        {showInvoiceFields && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="w-5 h-5 text-emerald-400" />
                Dados da Nota Fiscal
              </CardTitle>
              <CardDescription>
                Informações importadas do XML da nota fiscal
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="invoiceNumber">
                    Número da Nota Fiscal
                  </Label>
                  <Input
                    id="invoiceNumber"
                    value={medicationData.invoiceNumber}
                    onChange={(e) =>
                      setMedicationData({
                        ...medicationData,
                        invoiceNumber: e.target.value,
                      })
                    }
                    placeholder="Ex: NFE001234567"
                  />
                </div>
                <div>
                  <Label htmlFor="batchNumber">Lote</Label>
                  <Input
                    id="batchNumber"
                    value={medicationData.batchNumber}
                    onChange={(e) =>
                      setMedicationData({
                        ...medicationData,
                        batchNumber: e.target.value,
                      })
                    }
                    placeholder="Ex: LOT123456"
                  />
                </div>
                <div>
                  <Label htmlFor="supplierCnpj">
                    CNPJ do Fornecedor
                  </Label>
                  <Input
                    id="supplierCnpj"
                    value={medicationData.supplierCnpj}
                    onChange={(e) =>
                      setMedicationData({
                        ...medicationData,
                        supplierCnpj: e.target.value,
                      })
                    }
                    placeholder="Ex: 12.345.678/0001-90"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="manufacturingDate">
                    Data de Fabricação
                  </Label>
                  <Input
                    id="manufacturingDate"
                    type="date"
                    value={medicationData.manufacturingDate}
                    onChange={(e) =>
                      setMedicationData({
                        ...medicationData,
                        manufacturingDate: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="expiryDate">
                    Data de Validade
                  </Label>
                  <Input
                    id="expiryDate"
                    type="date"
                    value={medicationData.expiryDate}
                    onChange={(e) =>
                      setMedicationData({
                        ...medicationData,
                        expiryDate: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="quantity">Quantidade</Label>
                  <Input
                    id="quantity"
                    type="number"
                    value={medicationData.quantity}
                    onChange={(e) =>
                      setMedicationData({
                        ...medicationData,
                        quantity: e.target.value,
                      })
                    }
                    placeholder="Ex: 1000"
                  />
                </div>
                <div>
                  <Label htmlFor="unitValue">
                    Valor Unitário (R$)
                  </Label>
                  <Input
                    id="unitValue"
                    type="number"
                    step="0.01"
                    value={medicationData.unitValue}
                    onChange={(e) =>
                      setMedicationData({
                        ...medicationData,
                        unitValue: e.target.value,
                      })
                    }
                    placeholder="Ex: 2.50"
                  />
                </div>
                <div>
                  <Label htmlFor="totalValue">
                    Valor Total (R$)
                  </Label>
                  <Input
                    id="totalValue"
                    type="number"
                    step="0.01"
                    value={medicationData.totalValue}
                    onChange={(e) =>
                      setMedicationData({
                        ...medicationData,
                        totalValue: e.target.value,
                      })
                    }
                    placeholder="Ex: 2500.00"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Manufacturer and Registration */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Pill className="w-5 h-5 text-emerald-400" />
              Fabricante e Registro
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="manufacturer">
                  Fabricante *
                </Label>
                <Input
                  id="manufacturer"
                  value={medicationData.manufacturer}
                  onChange={(e) =>
                    setMedicationData({
                      ...medicationData,
                      manufacturer: e.target.value,
                    })
                  }
                  placeholder="Ex: EMS Pharma"
                />
              </div>
              <div>
                <Label htmlFor="registrationNumber">
                  Número de Registro ANVISA
                </Label>
                <Input
                  id="registrationNumber"
                  value={medicationData.registrationNumber}
                  onChange={(e) =>
                    setMedicationData({
                      ...medicationData,
                      registrationNumber: e.target.value,
                    })
                  }
                  placeholder="Ex: 1.0000.0000.000-0"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="barcode">
                  Código de Barras
                </Label>
                <Input
                  id="barcode"
                  value={medicationData.barcode}
                  onChange={(e) =>
                    setMedicationData({
                      ...medicationData,
                      barcode: e.target.value,
                    })
                  }
                  placeholder="Ex: 7891234567890"
                />
              </div>
              <div>
                <Label htmlFor="storageConditions">
                  Condições de Armazenamento
                </Label>
                <Select
                  value={medicationData.storageConditions}
                  onValueChange={(value) =>
                    setMedicationData({
                      ...medicationData,
                      storageConditions: value,
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione as condições" />
                  </SelectTrigger>
                  <SelectContent>
                    {storageConditions.map((condition) => (
                      <SelectItem
                        key={condition}
                        value={condition}
                      >
                        {condition}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stock Control */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="w-5 h-5 text-amber-400" />
              Controle de Estoque
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="minimumStock">
                  Estoque Mínimo
                </Label>
                <Input
                  id="minimumStock"
                  type="number"
                  value={medicationData.minimumStock}
                  onChange={(e) =>
                    setMedicationData({
                      ...medicationData,
                      minimumStock: e.target.value,
                    })
                  }
                  placeholder="Ex: 50"
                />
              </div>
              <div>
                <Label htmlFor="maximumStock">
                  Estoque Máximo
                </Label>
                <Input
                  id="maximumStock"
                  type="number"
                  value={medicationData.maximumStock}
                  onChange={(e) =>
                    setMedicationData({
                      ...medicationData,
                      maximumStock: e.target.value,
                    })
                  }
                  placeholder="Ex: 500"
                />
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="controlledMedication"
                  checked={medicationData.controlledMedication}
                  onCheckedChange={(checked) =>
                    setMedicationData({
                      ...medicationData,
                      controlledMedication: checked as boolean,
                    })
                  }
                />
                <Label
                  htmlFor="controlledMedication"
                  className="text-sm font-normal cursor-pointer"
                >
                  Medicamento Controlado
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="requiresPrescription"
                  checked={medicationData.requiresPrescription}
                  onCheckedChange={(checked) =>
                    setMedicationData({
                      ...medicationData,
                      requiresPrescription: checked as boolean,
                    })
                  }
                />
                <Label
                  htmlFor="requiresPrescription"
                  className="text-sm font-normal cursor-pointer"
                >
                  Requer Receita Médica
                </Label>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Clinical Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-rose-400" />
              Informações Clínicas
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Contraindications */}
            <div>
              <Label>Contraindicações</Label>
              <div className="flex gap-2 mt-2">
                <Input
                  value={newContraindication}
                  onChange={(e) =>
                    setNewContraindication(e.target.value)
                  }
                  placeholder="Ex: Hipersensibilidade ao princípio ativo"
                />
                <Button
                  onClick={addContraindication}
                  variant="outline"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {medicationData.contraindications.map(
                  (contraindication, index) => (
                    <Badge
                      key={index}
                      variant="destructive"
                      className="flex items-center gap-1"
                    >
                      {contraindication}
                      <button
                        onClick={() =>
                          removeContraindication(
                            contraindication,
                          )
                        }
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </Badge>
                  ),
                )}
              </div>
            </div>

            {/* Side Effects */}
            <div>
              <Label>Efeitos Colaterais</Label>
              <div className="flex gap-2 mt-2">
                <Input
                  value={newSideEffect}
                  onChange={(e) =>
                    setNewSideEffect(e.target.value)
                  }
                  placeholder="Ex: Náusea, tontura"
                />
                <Button
                  onClick={addSideEffect}
                  variant="outline"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {medicationData.sideEffects.map(
                  (sideEffect, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="flex items-center gap-1"
                    >
                      {sideEffect}
                      <button
                        onClick={() =>
                          removeSideEffect(sideEffect)
                        }
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </Badge>
                  ),
                )}
              </div>
            </div>

            {/* Drug Interactions */}
            <div>
              <Label>Interações Medicamentosas</Label>
              <div className="flex gap-2 mt-2">
                <Input
                  value={newInteraction}
                  onChange={(e) =>
                    setNewInteraction(e.target.value)
                  }
                  placeholder="Ex: Não usar com Warfarina"
                />
                <Button
                  onClick={addInteraction}
                  variant="outline"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {medicationData.interactions.map(
                  (interaction, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="flex items-center gap-1"
                    >
                      {interaction}
                      <button
                        onClick={() =>
                          removeInteraction(interaction)
                        }
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </Badge>
                  ),
                )}
              </div>
            </div>

            {/* Administration and Dosage */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="administration">
                  Via de Administração
                </Label>
                <Input
                  id="administration"
                  value={medicationData.administration}
                  onChange={(e) =>
                    setMedicationData({
                      ...medicationData,
                      administration: e.target.value,
                    })
                  }
                  placeholder="Ex: Oral, intramuscular, intravenosa"
                />
              </div>
              <div>
                <Label htmlFor="dosage">Posologia Padrão</Label>
                <Input
                  id="dosage"
                  value={medicationData.dosage}
                  onChange={(e) =>
                    setMedicationData({
                      ...medicationData,
                      dosage: e.target.value,
                    })
                  }
                  placeholder="Ex: 1 comprimido a cada 6 horas"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Observations */}
        <Card>
          <CardHeader>
            <CardTitle>Observações Gerais</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={medicationData.observations}
              onChange={(e) =>
                setMedicationData({
                  ...medicationData,
                  observations: e.target.value,
                })
              }
              placeholder="Informações adicionais sobre o medicamento..."
              rows={4}
            />
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <Button
            variant="outline"
            onClick={onBack}
            className="w-full sm:w-auto order-2 sm:order-1"
          >
            Cancelar
          </Button>
          <Button
            onClick={handleSave}
            disabled={!validateForm()}
            className="w-full sm:w-auto order-1 sm:order-2"
          >
            <Save className="w-4 h-4 mr-2" />
            Cadastrar Medicamento
          </Button>
        </div>
      </div>
    </div>
  );
}
import { useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { User, Lock, Stethoscope, UserCog, Heart, UserCheck, Package, Pill, Mail, ArrowLeft, Loader2, AlertCircle, Eye, EyeOff } from "lucide-react";
import { formatCPF, validateCPF, validateEmail, cleanNumbers } from "./ui/format-utils";
import { ResponsiveContainer, ResponsiveGrid } from "./ui/responsive-grid";
import { ResponsiveText, ResponsiveTitle } from "./ui/responsive-text";
import { ResponsiveButton } from "./ui/responsive-button";
import { signUp } from "../lib/auth";
import { Alert, AlertDescription } from "./ui/alert";

interface SignUpScreenProps {
  onBack: () => void;
  onSuccess: (userType: string, userName: string, userId: string) => void;
}

export function SignUpScreen({ onBack, onSuccess }: SignUpScreenProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    cpf: "",
    password: "",
    confirmPassword: "",
    userType: "paciente"
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const userTypes = [
    {
      id: "paciente",
      label: "Paciente",
      icon: Heart,
      color: "bg-rose-100 border-rose-300 text-rose-700",
      activeColor: "bg-rose-500 border-rose-600 text-white"
    },
    {
      id: "medico",
      label: "Médico",
      icon: Stethoscope,
      color: "bg-sky-100 border-sky-300 text-sky-700",
      activeColor: "bg-sky-500 border-sky-600 text-white"
    },
    {
      id: "gestor",
      label: "Gestor",
      icon: UserCog,
      color: "bg-emerald-100 border-emerald-300 text-emerald-700",
      activeColor: "bg-emerald-500 border-emerald-600 text-white"
    },
    {
      id: "recepcionista",
      label: "Recepcionista",
      icon: UserCheck,
      color: "bg-violet-100 border-violet-300 text-violet-700",
      activeColor: "bg-violet-500 border-violet-600 text-white"
    },
    {
      id: "estoque",
      label: "Estoque",
      icon: Package,
      color: "bg-amber-100 border-amber-300 text-amber-700",
      activeColor: "bg-amber-500 border-amber-600 text-white"
    },
    {
      id: "farmacia",
      label: "Farmácia",
      icon: Pill,
      color: "bg-indigo-100 border-indigo-300 text-indigo-700",
      activeColor: "bg-indigo-500 border-indigo-600 text-white"
    }
  ];

  const handleCPFChange = (value: string) => {
    const formatted = formatCPF(value);
    if (cleanNumbers(formatted).length <= 11) {
      setFormData({ ...formData, cpf: formatted });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validações
    if (!formData.name.trim()) {
      setError("Nome é obrigatório");
      return;
    }

    if (!validateEmail(formData.email)) {
      setError("Email inválido");
      return;
    }

    const cleanCPF = cleanNumbers(formData.cpf);
    if (!validateCPF(cleanCPF)) {
      setError("CPF inválido");
      return;
    }

    if (formData.password.length < 6) {
      setError("A senha deve ter no mínimo 6 caracteres");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("As senhas não coincidem");
      return;
    }

    setIsLoading(true);

    try {
      const result = await signUp({
        email: formData.email,
        password: formData.password,
        cpf: formData.cpf,
        name: formData.name,
        userType: formData.userType,
      });

      if (result.error) {
        setError(result.error);
        setIsLoading(false);
        return;
      }

      if (result.user) {
        onSuccess(result.user.userType, result.user.name || result.user.email || "", result.user.id);
      }
    } catch (err: any) {
      setError(err.message || "Erro ao criar conta");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <ResponsiveContainer 
        maxWidth="md" 
        padding={{ mobile: 4, tablet: 6, desktop: 8 }}
        className="w-full max-w-md"
      >
        <Card className="border-border shadow-lg">
          <CardHeader className="space-y-1 text-center p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <ResponsiveButton
                variant="ghost"
                size={{ mobile: 'sm', tablet: 'sm' }}
                onClick={onBack}
                className="absolute left-4"
              >
                <ArrowLeft className="w-4 h-4" />
              </ResponsiveButton>
              <div className="flex-1 flex justify-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary rounded-full flex items-center justify-center">
                  <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-primary-foreground" />
                </div>
              </div>
              <div className="w-12"></div>
            </div>
            <ResponsiveTitle level={1} className="text-xl sm:text-2xl md:text-3xl">
              Criar Conta
            </ResponsiveTitle>
            <ResponsiveText 
              size={{ mobile: 'sm', tablet: 'base' }}
              color="muted"
              align={{ mobile: 'center' }}
            >
              Preencha os dados para criar sua conta
            </ResponsiveText>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              {/* Nome */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm sm:text-base">
                  Nome Completo
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Seu nome completo"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="pl-10 h-11 sm:h-12 text-sm sm:text-base"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm sm:text-base">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value.toLowerCase().trim() })}
                    className="pl-10 h-11 sm:h-12 text-sm sm:text-base"
                    required
                  />
                </div>
              </div>

              {/* CPF */}
              <div className="space-y-2">
                <Label htmlFor="cpf" className="text-sm sm:text-base">
                  CPF
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    id="cpf"
                    type="text"
                    placeholder="000.000.000-00"
                    value={formData.cpf}
                    onChange={(e) => handleCPFChange(e.target.value)}
                    className="pl-10 h-11 sm:h-12 text-sm sm:text-base"
                    required
                  />
                </div>
              </div>

              {/* Senha */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm sm:text-base">
                  Senha
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Mínimo 6 caracteres"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="pl-10 pr-10 h-11 sm:h-12 text-sm sm:text-base"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Confirmar Senha */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sm sm:text-base">
                  Confirmar Senha
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Digite a senha novamente"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className="pl-10 pr-10 h-11 sm:h-12 text-sm sm:text-base"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Tipo de Usuário */}
              <div className="space-y-3">
                <Label className="text-sm sm:text-base">Tipo de Usuário</Label>
                <ResponsiveGrid 
                  cols={{ mobile: 2, tablet: 3, desktop: 2 }}
                  gap={{ mobile: 2, tablet: 3 }}
                >
                  {userTypes.map((type) => {
                    const Icon = type.icon;
                    const isSelected = formData.userType === type.id;
                    
                    return (
                      <button
                        key={type.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, userType: type.id })}
                        className={`
                          relative p-2 sm:p-3 border-2 rounded-lg transition-all duration-200 
                          hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary
                          min-h-[60px] sm:min-h-[70px]
                          ${isSelected ? type.activeColor : type.color}
                        `}
                      >
                        <div className="flex flex-col items-center gap-1 sm:gap-2">
                          <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                          <span className="text-xs sm:text-sm font-medium truncate">
                            {type.label}
                          </span>
                        </div>
                        {isSelected && (
                          <div className="absolute -top-1 -right-1 w-4 h-4 bg-white border-2 border-current rounded-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-current rounded-full"></div>
                          </div>
                        )}
                      </button>
                    );
                  })}
                </ResponsiveGrid>
              </div>

              {/* Submit Button */}
              <ResponsiveButton 
                type="submit" 
                responsive={true}
                size={{ mobile: 'default', tablet: 'lg' }}
                width={{ mobile: 'full', tablet: 'full' }}
                className="text-sm sm:text-base justify-center"
                disabled={isLoading}
              >
                <div className="flex items-center justify-center gap-2">
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Criando conta...</span>
                    </>
                  ) : (
                    <>
                      <User className="w-4 h-4" />
                      <span>Criar Conta</span>
                    </>
                  )}
                </div>
              </ResponsiveButton>
            </form>
          </CardContent>
        </Card>
      </ResponsiveContainer>
    </div>
  );
}


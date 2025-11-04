import { useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { User, Lock, Stethoscope, UserCog, Heart, UserCheck, Package, Pill, Phone, Mail, Loader2, AlertCircle } from "lucide-react";
import { PasswordRecovery } from "./password-recovery";
import { SignUpScreen } from "./signup-screen";
import { formatCPF, validateCPF, validateEmail, cleanNumbers } from "./ui/format-utils";
import { ResponsiveContainer, ResponsiveGrid } from "./ui/responsive-grid";
import { ResponsiveText, ResponsiveTitle } from "./ui/responsive-text";
import { ResponsiveButton, ResponsiveButtonGroup } from "./ui/responsive-button";
import { login } from "../lib/auth";
import { Alert, AlertDescription } from "./ui/alert";

interface LoginScreenProps {
  onLogin: (userType: string, userName: string, userId: string) => void;
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const [loginData, setLoginData] = useState({
    identifier: "", // CPF ou email
    password: "",
    userType: "paciente"
  });
  const [loginType, setLoginType] = useState<"cpf" | "email">("cpf");
  const [showPasswordRecovery, setShowPasswordRecovery] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      // Validações básicas
      if (loginType === "cpf") {
        const cleanCPF = cleanNumbers(loginData.identifier);
        if (!validateCPF(cleanCPF)) {
          setError("CPF inválido");
          setIsLoading(false);
          return;
        }
      } else {
        if (!validateEmail(loginData.identifier)) {
          setError("Email inválido");
          setIsLoading(false);
          return;
        }
      }

      const result = await login({
        identifier: loginData.identifier,
        password: loginData.password,
        userType: loginData.userType,
      });

      if (result.error) {
        setError(result.error);
        setIsLoading(false);
        return;
      }

      if (result.user) {
        onLogin(result.user.userType, result.user.name || result.user.email || "", result.user.id);
      }
    } catch (err: any) {
      setError(err.message || "Erro ao fazer login");
      setIsLoading(false);
    }
  };

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

  const handleIdentifierChange = (value: string) => {
    if (loginType === "cpf") {
      const formatted = formatCPF(value);
      if (cleanNumbers(formatted).length <= 11) {
        setLoginData({ ...loginData, identifier: formatted });
      }
    } else {
      setLoginData({ ...loginData, identifier: value.toLowerCase() });
    }
  };

  if (showSignUp) {
    return (
      <SignUpScreen 
        onBack={() => setShowSignUp(false)} 
        onSuccess={(userType, userName, userId) => {
          setShowSignUp(false);
          onLogin(userType, userName, userId);
        }}
      />
    );
  }

  if (showPasswordRecovery) {
    return (
      <PasswordRecovery 
        onBack={() => setShowPasswordRecovery(false)} 
        onSuccess={() => setShowPasswordRecovery(false)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <ResponsiveContainer 
        maxWidth="md" 
        padding={{ mobile: 4, tablet: 6, desktop: 8 }}
        className="w-full max-w-md"
      >
        <Card className="border-border shadow-lg">
          <CardHeader className="space-y-1 text-center p-4 sm:p-6">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary rounded-full flex items-center justify-center">
                <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-primary-foreground" />
              </div>
            </div>
            <ResponsiveTitle level={1} className="text-xl sm:text-2xl md:text-3xl">
              Saude Mais
            </ResponsiveTitle>
            <ResponsiveText 
              size={{ mobile: 'sm', tablet: 'base' }}
              color="muted"
              align={{ mobile: 'center' }}
            >
              Faça login para acessar o sistema
            </ResponsiveText>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <form onSubmit={handleLogin} className="space-y-4 sm:space-y-6">
              {/* Login Type Tabs */}
              <div>
                <Label className="text-sm sm:text-base">Como deseja fazer login?</Label>
                <Tabs value={loginType} onValueChange={(value) => {
                  setLoginType(value as "cpf" | "email");
                  setLoginData({ ...loginData, identifier: "" });
                }} className="w-full mt-2">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="cpf" className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      CPF
                    </TabsTrigger>
                    <TabsTrigger value="email" className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Email
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              {/* Identifier Input */}
              <div className="space-y-2">
                <Label htmlFor="identifier" className="text-sm sm:text-base">
                  {loginType === "cpf" ? "CPF" : "Email"}
                </Label>
                <div className="relative">
                  {loginType === "cpf" ? (
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  ) : (
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  )}
                  <Input
                    id="identifier"
                    type={loginType === "email" ? "email" : "text"}
                    placeholder={loginType === "cpf" ? "000.000.000-00" : "seu@email.com"}
                    value={loginData.identifier}
                    onChange={(e) => handleIdentifierChange(e.target.value)}
                    className="pl-10 h-11 sm:h-12 text-sm sm:text-base"
                    required
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm sm:text-base">Senha</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Digite sua senha"
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                    className="pl-10 h-11 sm:h-12 text-sm sm:text-base"
                    required
                  />
                </div>
              </div>

              {/* User Type Selection */}
              <div className="space-y-3">
                <Label className="text-sm sm:text-base">Tipo de Usuário</Label>
                <ResponsiveGrid 
                  cols={{ mobile: 2, tablet: 3, desktop: 2 }}
                  gap={{ mobile: 2, tablet: 3 }}
                >
                  {userTypes.map((type) => {
                    const Icon = type.icon;
                    const isSelected = loginData.userType === type.id;
                    
                    return (
                      <button
                        key={type.id}
                        type="button"
                        onClick={() => setLoginData({ ...loginData, userType: type.id })}
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

              {/* Login Button */}
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
                      <span>Entrando...</span>
                    </>
                  ) : (
                    <>
                      {(() => {
                        const selectedType = userTypes.find(t => t.id === loginData.userType);
                        const Icon = selectedType?.icon || User;
                        return <Icon className="w-4 h-4" />;
                      })()}
                      <span>Entrar no Sistema</span>
                    </>
                  )}
                </div>
              </ResponsiveButton>
            </form>

            {/* Recovery Options */}
            <div className="mt-6 space-y-3">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">Ou</span>
                </div>
              </div>
              
              <ResponsiveButton 
                variant="outline" 
                size={{ mobile: 'default', tablet: 'default' }}
                width={{ mobile: 'full', tablet: 'full' }}
                onClick={() => setShowSignUp(true)}
                className="justify-center"
              >
                <User className="w-4 h-4 mr-2" />
                Criar nova conta
              </ResponsiveButton>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">Precisa de ajuda?</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <ResponsiveButton 
                  variant="outline" 
                  size={{ mobile: 'default', tablet: 'default' }}
                  width={{ mobile: 'full', tablet: 'full' }}
                  onClick={() => setShowPasswordRecovery(true)}
                  className="justify-center"
                >
                  <Lock className="w-4 h-4 mr-2" />
                  Esqueci minha senha
                </ResponsiveButton>
                
                <ResponsiveButtonGroup 
                  orientation={{ mobile: 'horizontal', tablet: 'horizontal' }}
                  gap={{ mobile: 2, tablet: 2 }}
                >
                  <ResponsiveButton variant="ghost" size={{ mobile: 'sm', tablet: 'sm' }} className="text-xs flex-1">
                    <Phone className="w-3 h-3 mr-1" />
                    Suporte SMS
                  </ResponsiveButton>
                  <ResponsiveButton variant="ghost" size={{ mobile: 'sm', tablet: 'sm' }} className="text-xs flex-1">
                    <Phone className="w-3 h-3 mr-1" />
                    WhatsApp
                  </ResponsiveButton>
                </ResponsiveButtonGroup>
              </div>
            </div>
          </CardContent>
        </Card>
      </ResponsiveContainer>
    </div>
  );
}
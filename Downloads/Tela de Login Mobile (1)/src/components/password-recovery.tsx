import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Alert, AlertDescription } from "./ui/alert";
import { 
  ArrowLeft, 
  Mail, 
  Phone, 
  User, 
  Shield, 
  CheckCircle, 
  AlertCircle,
  Clock
} from "lucide-react";
import { formatCPF, formatPhone, cleanNumbers } from "./ui/format-utils";
import { ResponsiveContainer } from "./ui/responsive-grid";
import { ResponsiveButton, ResponsiveButtonGroup } from "./ui/responsive-button";

interface PasswordRecoveryProps {
  onBack: () => void;
  onSuccess: () => void;
}

export function PasswordRecovery({ onBack, onSuccess }: PasswordRecoveryProps) {
  const [recoveryMethod, setRecoveryMethod] = useState<"email" | "sms">("email");
  const [step, setStep] = useState<"identifier" | "code" | "newPassword" | "success">("identifier");
  const [formData, setFormData] = useState({
    identifier: "", // Email ou telefone
    cpf: "",
    code: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const handleIdentifierChange = (value: string) => {
    if (recoveryMethod === "sms") {
      const formatted = formatPhone(value);
      if (cleanNumbers(formatted).length <= 11) {
        setFormData({ ...formData, identifier: formatted });
      }
    } else {
      setFormData({ ...formData, identifier: value.toLowerCase() });
    }
  };

  const handleCPFChange = (value: string) => {
    const formatted = formatCPF(value);
    if (cleanNumbers(formatted).length <= 11) {
      setFormData({ ...formData, cpf: formatted });
    }
  };

  const handleSendCode = async () => {
    setLoading(true);
    
    // Simulação de envio de código
    setTimeout(() => {
      setLoading(false);
      setStep("code");
      startCountdown();
    }, 2000);
  };

  const startCountdown = () => {
    setCountdown(60);
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleVerifyCode = async () => {
    setLoading(true);
    
    // Simulação de verificação
    setTimeout(() => {
      setLoading(false);
      if (formData.code === "123456") { // Código de teste
        setStep("newPassword");
      } else {
        alert("Código inválido. Use 123456 para teste.");
      }
    }, 1500);
  };

  const handleResetPassword = async () => {
    if (formData.newPassword !== formData.confirmPassword) {
      alert("As senhas não coincidem!");
      return;
    }

    if (formData.newPassword.length < 6) {
      alert("A senha deve ter pelo menos 6 caracteres!");
      return;
    }

    setLoading(true);
    
    // Simulação de redefinição
    setTimeout(() => {
      setLoading(false);
      setStep("success");
    }, 2000);
  };

  const renderIdentifierStep = () => (
    <div className="space-y-4">
      <div>
        <Label className="text-sm sm:text-base">Como deseja recuperar sua senha?</Label>
        <Tabs 
          value={recoveryMethod} 
          onValueChange={(value) => {
            setRecoveryMethod(value as "email" | "sms");
            setFormData({ ...formData, identifier: "" });
          }} 
          className="w-full mt-2"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="email" className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Email
            </TabsTrigger>
            <TabsTrigger value="sms" className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              SMS
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="space-y-2">
        <Label htmlFor="identifier" className="text-sm sm:text-base">
          {recoveryMethod === "email" ? "Email cadastrado" : "Telefone cadastrado"}
        </Label>
        <div className="relative">
          {recoveryMethod === "email" ? (
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          ) : (
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          )}
          <Input
            id="identifier"
            type={recoveryMethod === "email" ? "email" : "tel"}
            placeholder={recoveryMethod === "email" ? "seu@email.com" : "(11) 99999-9999"}
            value={formData.identifier}
            onChange={(e) => handleIdentifierChange(e.target.value)}
            className="pl-10 h-11 sm:h-12 text-sm sm:text-base"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="cpf" className="text-sm sm:text-base">CPF (para confirmação)</Label>
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

      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Enviaremos um código de verificação para o {recoveryMethod === "email" ? "email" : "telefone"} cadastrado em sua conta.
        </AlertDescription>
      </Alert>

      <ResponsiveButtonGroup 
        orientation={{ mobile: 'vertical', tablet: 'horizontal' }}
        gap={{ mobile: 3, tablet: 3 }}
        className="pt-2"
      >
        <ResponsiveButton 
          variant="outline" 
          onClick={onBack} 
          size={{ mobile: 'default', tablet: 'default' }}
          width={{ mobile: 'full', tablet: 'auto' }}
          className="flex-1 justify-center"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar
        </ResponsiveButton>
        <ResponsiveButton 
          onClick={handleSendCode} 
          disabled={!formData.identifier || !formData.cpf || loading}
          size={{ mobile: 'default', tablet: 'default' }}
          width={{ mobile: 'full', tablet: 'auto' }}
          className="flex-1 justify-center"
        >
          {loading ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
              Enviando...
            </div>
          ) : (
            <div className="flex items-center gap-2">
              {recoveryMethod === "email" ? <Mail className="w-4 h-4" /> : <Phone className="w-4 h-4" />}
              Enviar código
            </div>
          )}
        </ResponsiveButton>
      </ResponsiveButtonGroup>
    </div>
  );

  const renderCodeStep = () => (
    <div className="space-y-4">
      <Alert>
        <CheckCircle className="h-4 w-4" />
        <AlertDescription>
          Código enviado para {formData.identifier}. Verifique sua {recoveryMethod === "email" ? "caixa de entrada" : "caixa de mensagens"}.
        </AlertDescription>
      </Alert>

      <div className="space-y-2">
        <Label htmlFor="code" className="text-sm sm:text-base">Código de verificação</Label>
        <div className="relative">
          <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            id="code"
            type="text"
            placeholder="Digite o código de 6 dígitos"
            value={formData.code}
            onChange={(e) => setFormData({ ...formData, code: e.target.value.replace(/\D/g, '').slice(0, 6) })}
            className="pl-10 h-11 sm:h-12 text-sm sm:text-base tracking-widest text-center"
            maxLength={6}
            required
          />
        </div>
      </div>

      {countdown > 0 && (
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <Clock className="w-4 h-4" />
          Reenviar código em {countdown}s
        </div>
      )}

      {countdown === 0 && (
        <ResponsiveButton 
          variant="ghost" 
          size={{ mobile: 'sm', tablet: 'sm' }}
          onClick={handleSendCode}
          width={{ mobile: 'full', tablet: 'full' }}
          className="justify-center"
        >
          Reenviar código
        </ResponsiveButton>
      )}

      <ResponsiveButtonGroup 
        orientation={{ mobile: 'vertical', tablet: 'horizontal' }}
        gap={{ mobile: 3, tablet: 3 }}
        className="pt-2"
      >
        <ResponsiveButton 
          variant="outline" 
          onClick={() => setStep("identifier")} 
          size={{ mobile: 'default', tablet: 'default' }}
          width={{ mobile: 'full', tablet: 'auto' }}
          className="flex-1 justify-center"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar
        </ResponsiveButton>
        <ResponsiveButton 
          onClick={handleVerifyCode} 
          disabled={formData.code.length !== 6 || loading}
          size={{ mobile: 'default', tablet: 'default' }}
          width={{ mobile: 'full', tablet: 'auto' }}
          className="flex-1 justify-center"
        >
          {loading ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
              Verificando...
            </div>
          ) : (
            "Verificar código"
          )}
        </ResponsiveButton>
      </ResponsiveButtonGroup>
    </div>
  );

  const renderNewPasswordStep = () => (
    <div className="space-y-4">
      <Alert>
        <CheckCircle className="h-4 w-4" />
        <AlertDescription>
          Código verificado com sucesso! Agora defina sua nova senha.
        </AlertDescription>
      </Alert>

      <div className="space-y-2">
        <Label htmlFor="newPassword" className="text-sm sm:text-base">Nova senha</Label>
        <Input
          id="newPassword"
          type="password"
          placeholder="Digite sua nova senha"
          value={formData.newPassword}
          onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
          className="h-11 sm:h-12 text-sm sm:text-base"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword" className="text-sm sm:text-base">Confirmar nova senha</Label>
        <Input
          id="confirmPassword"
          type="password"
          placeholder="Confirme sua nova senha"
          value={formData.confirmPassword}
          onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
          className="h-11 sm:h-12 text-sm sm:text-base"
          required
        />
      </div>

      <div className="text-xs text-muted-foreground space-y-1">
        <p>• A senha deve ter pelo menos 6 caracteres</p>
        <p>• Use uma combinação de letras, números e símbolos</p>
      </div>

      <ResponsiveButtonGroup 
        orientation={{ mobile: 'vertical', tablet: 'horizontal' }}
        gap={{ mobile: 3, tablet: 3 }}
        className="pt-2"
      >
        <ResponsiveButton 
          variant="outline" 
          onClick={() => setStep("code")} 
          size={{ mobile: 'default', tablet: 'default' }}
          width={{ mobile: 'full', tablet: 'auto' }}
          className="flex-1 justify-center"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar
        </ResponsiveButton>
        <ResponsiveButton 
          onClick={handleResetPassword} 
          disabled={!formData.newPassword || !formData.confirmPassword || loading}
          size={{ mobile: 'default', tablet: 'default' }}
          width={{ mobile: 'full', tablet: 'auto' }}
          className="flex-1 justify-center"
        >
          {loading ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
              Redefinindo...
            </div>
          ) : (
            "Redefinir senha"
          )}
        </ResponsiveButton>
      </ResponsiveButtonGroup>
    </div>
  );

  const renderSuccessStep = () => (
    <div className="space-y-4 text-center">
      <div className="flex justify-center">
        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
          <CheckCircle className="w-8 h-8 text-emerald-600" />
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-medium">Senha redefinida com sucesso!</h3>
        <p className="text-sm text-muted-foreground">
          Sua senha foi alterada. Agora você pode fazer login com sua nova senha.
        </p>
      </div>

      <ResponsiveButton 
        onClick={onSuccess} 
        size={{ mobile: 'default', tablet: 'default' }}
        width={{ mobile: 'full', tablet: 'full' }}
        className="justify-center"
      >
        Voltar ao login
      </ResponsiveButton>
    </div>
  );

  const getStepTitle = () => {
    switch (step) {
      case "identifier":
        return "Recuperar senha";
      case "code":
        return "Verificar código";
      case "newPassword":
        return "Nova senha";
      case "success":
        return "Sucesso!";
      default:
        return "Recuperar senha";
    }
  };

  const getStepDescription = () => {
    switch (step) {
      case "identifier":
        return "Informe seus dados para receber o código de recuperação";
      case "code":
        return "Digite o código que enviamos para você";
      case "newPassword":
        return "Defina uma nova senha para sua conta";
      case "success":
        return "Sua senha foi redefinida com sucesso";
      default:
        return "";
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
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary rounded-full flex items-center justify-center">
                <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-primary-foreground" />
              </div>
            </div>
            <CardTitle className="text-xl sm:text-2xl">{getStepTitle()}</CardTitle>
            <CardDescription className="text-sm sm:text-base">
              {getStepDescription()}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            {step === "identifier" && renderIdentifierStep()}
            {step === "code" && renderCodeStep()}
            {step === "newPassword" && renderNewPasswordStep()}
            {step === "success" && renderSuccessStep()}
          </CardContent>
        </Card>
      </ResponsiveContainer>
    </div>
  );
}
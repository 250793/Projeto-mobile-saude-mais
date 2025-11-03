import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Alert, AlertDescription } from "./ui/alert";
import { ResponsiveContainer, ResponsiveGrid } from "./ui/responsive-grid";
import { ResponsiveText, ResponsiveTitle } from "./ui/responsive-text";
import { ResponsiveButton, ResponsiveButtonGroup } from "./ui/responsive-button";
import { useBreakpoint } from "./ui/use-breakpoint";
import { 
  Bell, 
  Phone, 
  Mail, 
  MessageSquare, 
  Shield, 
  CheckCircle,
  ArrowLeft,
  Settings
} from "lucide-react";
import { formatPhone, cleanNumbers } from "./ui/format-utils";

interface NotificationSettingsProps {
  onBack: () => void;
  onSave: (settings: any) => void;
}

export function NotificationSettings({ onBack, onSave }: NotificationSettingsProps) {
  const [settings, setSettings] = useState({
    email: {
      enabled: true,
      address: "usuario@email.com",
      appointments: true,
      prescriptions: true,
      results: true,
      reminders: true
    },
    sms: {
      enabled: false,
      phone: "",
      appointments: true,
      prescriptions: false,
      results: true,
      reminders: true
    },
    whatsapp: {
      enabled: false,
      phone: "",
      appointments: true,
      prescriptions: true,
      results: true,
      reminders: true
    },
    push: {
      enabled: true,
      appointments: true,
      prescriptions: true,
      results: true,
      reminders: true
    }
  });

  const [testNotification, setTestNotification] = useState<string | null>(null);
  const { isMobile, isTablet } = useBreakpoint();

  const handlePhoneChange = (type: 'sms' | 'whatsapp', value: string) => {
    const formatted = formatPhone(value);
    if (cleanNumbers(formatted).length <= 11) {
      setSettings({
        ...settings,
        [type]: {
          ...settings[type],
          phone: formatted
        }
      });
    }
  };

  const handleTestNotification = async (type: 'email' | 'sms' | 'whatsapp') => {
    setTestNotification(type);
    
    // Simulação de envio de teste
    setTimeout(() => {
      setTestNotification(null);
      alert(`Notificação de teste enviada via ${type.toUpperCase()}!`);
    }, 2000);
  };

  const handleSave = () => {
    onSave(settings);
    alert("Configurações salvas com sucesso!");
  };

  const notificationTypes = [
    {
      key: "appointments",
      label: "Consultas e agendamentos",
      description: "Confirmações, lembretes e alterações"
    },
    {
      key: "prescriptions",
      label: "Receitas médicas",
      description: "Novas prescrições e renovações"
    },
    {
      key: "results",
      label: "Resultados de exames",
      description: "Quando os resultados estiverem prontos"
    },
    {
      key: "reminders",
      label: "Lembretes de medicação",
      description: "Horários de tomar medicamentos"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border p-4 sm:p-6">
        <ResponsiveContainer maxWidth="xl">
          <div className="flex items-center gap-3">
            <ResponsiveButton variant="ghost" size={{ mobile: 'sm', tablet: 'default' }} onClick={onBack}>
              <ArrowLeft className="w-4 h-4" />
            </ResponsiveButton>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary rounded-full flex items-center justify-center">
                <Bell className="w-5 h-5 sm:w-6 sm:h-6 text-primary-foreground" />
              </div>
              <div>
                <ResponsiveTitle level={2} className="text-lg sm:text-xl md:text-2xl">
                  Configurações de Notificação
                </ResponsiveTitle>
                <ResponsiveText 
                  size={{ mobile: 'sm', tablet: 'base' }}
                  color="muted"
                >
                  Gerencie como você recebe suas notificações
                </ResponsiveText>
              </div>
            </div>
          </div>
        </ResponsiveContainer>
      </div>

      <ResponsiveContainer 
        maxWidth="xl" 
        padding={{ mobile: 4, tablet: 6, desktop: 8 }}
      >
        <ResponsiveGrid 
          cols={{ mobile: 1, tablet: 1, desktop: 1 }}
          gap={{ mobile: 6, tablet: 6, desktop: 6 }}
        >
          {/* Email Notifications */}
          <Card>
            <CardHeader className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Mail className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg sm:text-xl">Email</CardTitle>
                    <CardDescription className="text-sm sm:text-base">
                      Receba notificações por email
                    </CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant={settings.email.enabled ? "default" : "secondary"}>
                    {settings.email.enabled ? "Ativo" : "Inativo"}
                  </Badge>
                  <Switch
                    checked={settings.email.enabled}
                    onCheckedChange={(checked) => 
                      setSettings({
                        ...settings,
                        email: { ...settings.email, enabled: checked }
                      })
                    }
                  />
                </div>
              </div>
            </CardHeader>
            {settings.email.enabled && (
              <CardContent className="space-y-4 p-4 sm:p-6 pt-0">
                <div className="space-y-2">
                  <Label htmlFor="email-address" className="text-sm sm:text-base">Endereço de email</Label>
                  <div className="flex gap-2">
                    <Input
                      id="email-address"
                      type="email"
                      value={settings.email.address}
                      onChange={(e) => 
                        setSettings({
                          ...settings,
                          email: { ...settings.email, address: e.target.value }
                        })
                      }
                      className="h-10 sm:h-11 text-sm sm:text-base"
                    />
                    <Button 
                      variant="outline" 
                      onClick={() => handleTestNotification('email')}
                      disabled={testNotification === 'email'}
                    >
                      {testNotification === 'email' ? (
                        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      ) : (
                        "Testar"
                      )}
                    </Button>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label className="text-sm sm:text-base">Tipos de notificação por email</Label>
                  {notificationTypes.map((type) => (
                    <div key={type.key} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium text-sm sm:text-base">{type.label}</div>
                        <div className="text-xs sm:text-sm text-muted-foreground">{type.description}</div>
                      </div>
                      <Switch
                        checked={settings.email[type.key as keyof typeof settings.email] as boolean}
                        onCheckedChange={(checked) => 
                          setSettings({
                            ...settings,
                            email: { ...settings.email, [type.key]: checked }
                          })
                        }
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            )}
          </Card>

          {/* SMS Notifications */}
          <Card>
            <CardHeader className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Phone className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg sm:text-xl">SMS</CardTitle>
                    <CardDescription className="text-sm sm:text-base">
                      Receba notificações por mensagem de texto
                    </CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant={settings.sms.enabled ? "default" : "secondary"}>
                    {settings.sms.enabled ? "Ativo" : "Inativo"}
                  </Badge>
                  <Switch
                    checked={settings.sms.enabled}
                    onCheckedChange={(checked) => 
                      setSettings({
                        ...settings,
                        sms: { ...settings.sms, enabled: checked }
                      })
                    }
                  />
                </div>
              </div>
            </CardHeader>
            {settings.sms.enabled && (
              <CardContent className="space-y-4 p-4 sm:p-6 pt-0">
                <div className="space-y-2">
                  <Label htmlFor="sms-phone" className="text-sm sm:text-base">Número do telefone</Label>
                  <div className="flex gap-2">
                    <Input
                      id="sms-phone"
                      type="tel"
                      placeholder="(11) 99999-9999"
                      value={settings.sms.phone}
                      onChange={(e) => handlePhoneChange('sms', e.target.value)}
                      className="h-10 sm:h-11 text-sm sm:text-base"
                    />
                    <Button 
                      variant="outline" 
                      onClick={() => handleTestNotification('sms')}
                      disabled={testNotification === 'sms' || !settings.sms.phone}
                    >
                      {testNotification === 'sms' ? (
                        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      ) : (
                        "Testar"
                      )}
                    </Button>
                  </div>
                </div>

                <Alert>
                  <Shield className="h-4 w-4" />
                  <AlertDescription>
                    Podem ser aplicadas taxas de mensagem pela sua operadora.
                  </AlertDescription>
                </Alert>

                <div className="space-y-3">
                  <Label className="text-sm sm:text-base">Tipos de notificação por SMS</Label>
                  {notificationTypes.map((type) => (
                    <div key={type.key} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium text-sm sm:text-base">{type.label}</div>
                        <div className="text-xs sm:text-sm text-muted-foreground">{type.description}</div>
                      </div>
                      <Switch
                        checked={settings.sms[type.key as keyof typeof settings.sms] as boolean}
                        onCheckedChange={(checked) => 
                          setSettings({
                            ...settings,
                            sms: { ...settings.sms, [type.key]: checked }
                          })
                        }
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            )}
          </Card>

          {/* WhatsApp Notifications */}
          <Card>
            <CardHeader className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg sm:text-xl">WhatsApp</CardTitle>
                    <CardDescription className="text-sm sm:text-base">
                      Receba notificações pelo WhatsApp
                    </CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant={settings.whatsapp.enabled ? "default" : "secondary"}>
                    {settings.whatsapp.enabled ? "Ativo" : "Inativo"}
                  </Badge>
                  <Switch
                    checked={settings.whatsapp.enabled}
                    onCheckedChange={(checked) => 
                      setSettings({
                        ...settings,
                        whatsapp: { ...settings.whatsapp, enabled: checked }
                      })
                    }
                  />
                </div>
              </div>
            </CardHeader>
            {settings.whatsapp.enabled && (
              <CardContent className="space-y-4 p-4 sm:p-6 pt-0">
                <div className="space-y-2">
                  <Label htmlFor="whatsapp-phone" className="text-sm sm:text-base">Número do WhatsApp</Label>
                  <div className="flex gap-2">
                    <Input
                      id="whatsapp-phone"
                      type="tel"
                      placeholder="(11) 99999-9999"
                      value={settings.whatsapp.phone}
                      onChange={(e) => handlePhoneChange('whatsapp', e.target.value)}
                      className="h-10 sm:h-11 text-sm sm:text-base"
                    />
                    <Button 
                      variant="outline" 
                      onClick={() => handleTestNotification('whatsapp')}
                      disabled={testNotification === 'whatsapp' || !settings.whatsapp.phone}
                    >
                      {testNotification === 'whatsapp' ? (
                        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      ) : (
                        "Testar"
                      )}
                    </Button>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label className="text-sm sm:text-base">Tipos de notificação por WhatsApp</Label>
                  {notificationTypes.map((type) => (
                    <div key={type.key} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium text-sm sm:text-base">{type.label}</div>
                        <div className="text-xs sm:text-sm text-muted-foreground">{type.description}</div>
                      </div>
                      <Switch
                        checked={settings.whatsapp[type.key as keyof typeof settings.whatsapp] as boolean}
                        onCheckedChange={(checked) => 
                          setSettings({
                            ...settings,
                            whatsapp: { ...settings.whatsapp, [type.key]: checked }
                          })
                        }
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            )}
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button variant="outline" onClick={onBack} className="w-full sm:w-auto order-2 sm:order-1">
              Cancelar
            </Button>
            <Button onClick={handleSave} className="w-full sm:w-auto order-1 sm:order-2">
              <Settings className="w-4 h-4 mr-2" />
              Salvar configurações
            </Button>
          </div>
        </ResponsiveGrid>
      </ResponsiveContainer>
    </div>
  );
}
import React from 'react';
import { ResponsiveShowcase } from './responsive-showcase';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { ResponsiveGrid, ResponsiveContainer } from './ui/responsive-grid';
import { ResponsiveText, ResponsiveTitle } from './ui/responsive-text';
import { ResponsiveButton } from './ui/responsive-button';
import { Badge } from './ui/badge';
import { Smartphone, Tablet, Monitor, CheckCircle } from 'lucide-react';

export function ResponsiveDemo() {
  const features = [
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: "Mobile First",
      description: "Projetado primeiro para mobile com touch targets de 44px mínimo",
      improvements: [
        "Login compacto em 2x3 grid",
        "Botões full-width em mobile",
        "Scroll otimizado para touch",
        "FAB para notificações"
      ]
    },
    {
      icon: <Tablet className="w-6 h-6" />,
      title: "Tablet Optimized",
      description: "Layouts adaptativos que aproveitam o espaço extra do tablet",
      improvements: [
        "Grids 2-3 colunas em tablets",
        "Formulários em 2 colunas",
        "Headers horizontais",
        "Navegação lateral"
      ]
    },
    {
      icon: <Monitor className="w-6 h-6" />,
      title: "Desktop Enhanced",
      description: "Experiência rica para desktop com múltiplas colunas",
      improvements: [
        "Layouts até 4 colunas",
        "Sidebar fixa",
        "Hover states",
        "Keyboard navigation"
      ]
    }
  ];

  const breakpoints = [
    { name: "Mobile", size: "< 640px", description: "Smartphones" },
    { name: "Small", size: "640px+", description: "Smartphones grandes" },
    { name: "Medium", size: "768px+", description: "Tablets" },
    { name: "Large", size: "1024px+", description: "Laptops" },
    { name: "XL", size: "1280px+", description: "Desktops" },
    { name: "2XL", size: "1536px+", description: "Monitores grandes" }
  ];

  const components = [
    {
      name: "ResponsiveGrid",
      description: "Grid system com configurações por breakpoint",
      example: "cols={{ mobile: 1, tablet: 2, desktop: 3 }}"
    },
    {
      name: "ResponsiveContainer",
      description: "Container com padding e max-width responsivos",
      example: "padding={{ mobile: 4, tablet: 6, desktop: 8 }}"
    },
    {
      name: "ResponsiveText",
      description: "Texto com tamanhos responsivos",
      example: "size={{ mobile: 'sm', tablet: 'base', desktop: 'lg' }}"
    },
    {
      name: "ResponsiveButton",
      description: "Botões com largura e tamanho adaptativos",
      example: "width={{ mobile: 'full', tablet: 'auto' }}"
    },
    {
      name: "useBreakpoint",
      description: "Hook para detectar breakpoint atual",
      example: "const { isMobile, isTablet, isDesktop } = useBreakpoint()"
    }
  ];

  return (
    <ResponsiveContainer maxWidth="xl" className="min-h-screen bg-background py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <ResponsiveTitle level={1} className="mb-4">
          Saúde Mais - Sistema Totalmente Responsivo
        </ResponsiveTitle>
        <ResponsiveText 
          size={{ mobile: 'base', tablet: 'lg' }}
          color="muted"
          className="max-w-3xl mx-auto mb-6"
        >
          Sistema de saúde digital adaptável a todos os dispositivos, com design mobile-first 
          e componentes responsivos avançados para uma experiência consistente em qualquer tela.
        </ResponsiveText>
        <div className="flex flex-wrap justify-center gap-2">
          <Badge variant="secondary">Mobile-First</Badge>
          <Badge variant="secondary">Touch-Friendly</Badge>
          <Badge variant="secondary">Acessível</Badge>
          <Badge variant="secondary">PWA Ready</Badge>
        </div>
      </div>

      {/* Features */}
      <ResponsiveGrid 
        cols={{ mobile: 1, tablet: 2, desktop: 3 }}
        gap={{ mobile: 6, tablet: 8 }}
        className="mb-12"
      >
        {features.map((feature, index) => (
          <Card key={index} className="h-full">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                  {feature.icon}
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </div>
              <CardDescription>{feature.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {feature.improvements.map((improvement, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span>{improvement}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </ResponsiveGrid>

      {/* Breakpoints */}
      <Card className="mb-12">
        <CardHeader>
          <CardTitle>Breakpoints Tailwind CSS</CardTitle>
          <CardDescription>
            Sistema de breakpoints utilizado para criar layouts responsivos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveGrid 
            cols={{ mobile: 1, tablet: 2, desktop: 3 }}
            gap={{ mobile: 4, tablet: 6 }}
          >
            {breakpoints.map((bp, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <div className="font-medium">{bp.name}</div>
                  <div className="text-sm text-muted-foreground">{bp.description}</div>
                </div>
                <Badge variant="outline">{bp.size}</Badge>
              </div>
            ))}
          </ResponsiveGrid>
        </CardContent>
      </Card>

      {/* Components */}
      <Card className="mb-12">
        <CardHeader>
          <CardTitle>Componentes Responsivos Criados</CardTitle>
          <CardDescription>
            Componentes customizados para facilitar o desenvolvimento responsivo
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {components.map((component, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <div className="font-medium text-primary">{component.name}</div>
                  <Badge variant="outline" className="self-start sm:self-auto">Componente</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{component.description}</p>
                <code className="text-xs bg-muted px-2 py-1 rounded text-foreground">
                  {component.example}
                </code>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Call to Action */}
      <div className="text-center">
        <ResponsiveTitle level={2} className="mb-4">
          Teste a Responsividade
        </ResponsiveTitle>
        <ResponsiveText 
          size={{ mobile: 'sm', tablet: 'base' }}
          color="muted"
          className="mb-6"
        >
          Explore o sistema completo e veja como ele se adapta perfeitamente a qualquer dispositivo
        </ResponsiveText>
        <ResponsiveButton 
          size={{ mobile: 'default', tablet: 'lg' }}
          className="bg-primary hover:bg-primary/90"
        >
          Explorar Demonstração Interativa
        </ResponsiveButton>
      </div>

      {/* Interactive Demo */}
      <div className="mt-16">
        <ResponsiveShowcase />
      </div>
    </ResponsiveContainer>
  );
}
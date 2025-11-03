# Diretrizes de Responsividade - Saúde Mais

## Breakpoints Tailwind CSS
- **sm**: 640px (smartphones grandes)
- **md**: 768px (tablets)
- **lg**: 1024px (laptops)
- **xl**: 1280px (desktops)
- **2xl**: 1536px (monitores grandes)

## Layouts Responsivos

### Grid Systems
- Mobile (default): `grid-cols-1`
- Tablet (md): `md:grid-cols-2` ou `md:grid-cols-3`
- Desktop (lg+): `lg:grid-cols-3`, `lg:grid-cols-4`, `xl:grid-cols-5`

### Spacing
- Mobile: `p-4 space-y-4 gap-4`
- Tablet: `md:p-6 md:space-y-6 md:gap-6`
- Desktop: `lg:p-8 lg:space-y-8 lg:gap-8`

### Content Width
- Mobile: `max-w-full`
- Tablet: `md:max-w-4xl`
- Desktop: `lg:max-w-6xl xl:max-w-7xl`

## Componentes Específicos

### Headers
- Mobile: Stack vertical, botões menores
- Tablet+: Horizontal layout, botões normais
- Usar `flex-col sm:flex-row` para reorganizar

### Cards de Estatísticas
- Mobile: 1 coluna
- Tablet: 2-3 colunas
- Desktop: 4-6 colunas
- Usar `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6`

### Formulários
- Mobile: Campos em coluna única
- Tablet+: 2 colunas para campos relacionados
- Usar `grid-cols-1 md:grid-cols-2`

### Navegação
- Mobile: Bottom navigation ou hamburger menu
- Tablet+: Side navigation ou top navigation
- Botões touch-friendly (min 44px altura)

### Texto
- Títulos: Responsivos com `text-xl md:text-2xl lg:text-3xl`
- Subtítulos: `text-lg md:text-xl`
- Corpo: `text-sm md:text-base`

### Botões
- Mobile: `w-full` para ações principais
- Tablet+: `w-auto` com padding adequado
- Touch targets: mínimo 44px x 44px

## Padrões de Design

### Dashboard Cards
```tsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
  <Card className="p-4 md:p-6">
    // Conteúdo
  </Card>
</div>
```

### Formulários Responsivos
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
  <div>
    <Label>Campo 1</Label>
    <Input />
  </div>
  <div>
    <Label>Campo 2</Label>
    <Input />
  </div>
</div>
```

### Headers Responsivos
```tsx
<div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 md:p-6">
  <div className="flex items-center gap-3">
    <Icon />
    <div>
      <h1 className="text-lg md:text-xl lg:text-2xl">Título</h1>
      <p className="text-sm md:text-base text-muted-foreground">Subtítulo</p>
    </div>
  </div>
  <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
    <Button className="w-full sm:w-auto">Ação 1</Button>
    <Button className="w-full sm:w-auto" variant="outline">Ação 2</Button>
  </div>
</div>
```

## Testes de Responsividade

### Dispositivos de Teste
1. **Mobile**: iPhone SE (375px), iPhone 12 (390px)
2. **Tablet**: iPad (768px), iPad Pro (1024px)
3. **Desktop**: MacBook (1280px), Monitor 4K (1920px+)

### Checklist
- [ ] Conteúdo legível em todas as telas
- [ ] Botões facilmente clicáveis (touch-friendly)
- [ ] Formulários utilizáveis sem zoom
- [ ] Navegação intuitiva em cada dispositivo
- [ ] Imagens e ícones bem dimensionados
- [ ] Scroll horizontal desnecessário evitado
- [ ] Performance mantida em dispositivos móveis

## Boas Práticas

### Performance Mobile
- Lazy loading para listas longas
- Otimização de imagens
- Minimizar re-renders desnecessários

### UX Mobile
- Feedback visual para toque
- Gestos intuitivos (swipe, tap)
- Modo escuro considerado
- Acessibilidade mantida

### Consistência Visual
- Manter hierarquia visual
- Espaçamento proporcional
- Tipografia escalonável
- Cores mantendo contraste
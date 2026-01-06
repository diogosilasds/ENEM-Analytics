# Sistema de Design: Identidade Visual e UI

O ENEM Analytics 2026 adota uma linguagem visual de alto contraste denominada "Cyberpunk Analyst". O objetivo é proporcionar uma interface técnica que minimize distrações e destaque métricas críticas.

## 1. Paleta Cromática

O sistema opera exclusivamente em modo escuro (Dark Mode), utilizando cores neon para sinalização semântica.

- Fundo Principal (#050505): Preto neutro para redução de fadiga ocular.
- Destaque Positivo (#00ff9f): Utilizado para metas atingidas e crescimento.
- Destaque Informativo (#00f3ff): Utilizado para projeções e elementos tecnológicos.
- Destaque Crítico (#ff0055): Utilizado para erros e áreas de intervenção urgente.
- Alerta/Atenção (#f3e600): Utilizado para instabilidades e zonas de transição.
- Texto Primário (#ffffff): Branco puro para legibilidade máxima.
- Texto Secundário (#a3a3a3): Cinza claro para rótulos e eixos de gráficos.

## 2. Tipografia

A hierarquia tipográfica utiliza três famílias de fontes distintas para separar categorias de informação:

- Orbitron (font-display): Utilizada para títulos de seção, KPIs numéricos e cabeçalhos principais. Transmite uma estética técnica e futurista.
- Rajdhani (font-sans): Utilizada para textos explicativos, parágrafos e interface geral. Sua estrutura condensada permite alta densidade de informação sem comprometer a clareza.
- JetBrains Mono (font-mono): Utilizada para metadados, eixos de gráficos, tabelas técnicas e identificadores de sistema. Garante o alinhamento perfeito de dados numéricos.

## 3. Diretrizes de Interface

- Bordas e Grids: Utilização de grids de 50px de fundo e bordas de 1px para delimitar módulos, reforçando a estrutura de "Dashboard Técnico".
- Efeitos de Vidro (Glassmorphism): Aplicação de `backdrop-blur` em cabeçalhos e menus para criar profundidade visual.
- Coerência de Ícones: Uso da biblioteca Lucide React com espessura de linha padronizada em 1.5px.

## 4. Responsividade e Adaptabilidade

O sistema é projetado sob a filosofia Mobile-First Intelligence:
- Breakpoint XS (380px): Otimização para dispositivos ultra-compactos.
- Densidade Adaptativa: Em telas menores, o sistema converte tabelas complexas em listas de cards técnicos e utiliza siglas (ex: HUMANAS para HUM) para preservar o espaço horizontal.
- Interação: Botões e áreas clicáveis respeitam a dimensão mínima de 44x44px em resoluções móveis para garantir precisão no toque.

# ENEM Analytics 2026: Terminal de Inteligência Acadêmica

O **ENEM Analytics 2026** é uma plataforma de telemetria de alta performance projetada para converter dados brutos de simulados em estratégias de aprovação. Diferente de dashboards convencionais, este sistema opera sob uma identidade visual **Cyberpunk Analyst**, tratando o estudante como um operador de sistema que precisa otimizar variáveis críticas (TRI, Coerência, Tempo) para hackear a aprovação.

## 🎯 Diretriz do Sistema

O software resolve a fragmentação de dados na preparação para o ENEM. Ele substitui planilhas estáticas por uma interface reativa que:
1.  **Audita a Coerência (TRI):** Detecta quando acertos difíceis são anulados por erros fáceis.
2.  **Materializa o Abstrato:** Transforma sentimentos de "estudei muito" em métricas de **Eficiência de Sincronia**.
3.  **Micro-Gerencia a Redação:** Analisa o texto linha a linha, conectando falhas gramaticais a gaps de competência.

## ⚡ Arquitetura "No-Build" Híbrida

A aplicação utiliza uma arquitetura moderna baseada em **Vite + React 19**, otimizada para deployment estático (GitHub Pages) mas com experiência de desenvolvimento local robusta (HMR).
- **Core:** React 19 (Hooks, Context API).
- **Viz:** Recharts (customizado para renderização vetorial de alta fidelidade).
- **Styling:** Tailwind CSS com Design Tokens estendidos para paletas Neon.
- **Data Layer:** Arquitetura *Static-First* com processamento em tempo real no cliente (Client-Side Logic).

## 🚀 Módulos do Ecossistema

### 1. Centro de Comando (Overview)
Painel de controle inicial com métricas de saúde global, cobertura de syllabus e status de processamento de dados.

### 2. Deep Dive por Disciplina
Interfaces específicas para Matemática, Humanas, Linguagens e Natureza, divididas em camadas:
- **Camada Tática:** KPIs e Vetor de Projeção.
- **Camada Estratégica:** Matriz de Priorização (Esforço x Impacto).
- **Camada Cognitiva:** Análise de Pareto e Elasticidade de Dificuldade.

### 3. Redação Studio (Essay Lab)
Um ambiente dedicado para análise textual:
- **Transcrição Digital:** Texto anotado com tooltips interativos de erro.
- **Velocímetro de Meta:** Visualização radial da nota.
- **Manual de Construção:** Guias estruturais dinâmicos baseados nas falhas detectadas.

### 4. Modo Debug (Audit Log)
O módulo mais avançado do sistema. Realiza uma varredura transversal em todos os dados para encontrar:
- **Black Box Recovery:** Logs detalhados de cada questão (Acerto/Erro/Anulada).
- **Integrity Map:** Treemaps que mostram onde a nota está sendo "drenada".
- **Radar de Urgência:** Identificação algorítmica da matéria que requer intervenção imediata.

## 📚 Documentação Técnica

Para navegar na complexidade do sistema, consulte os manuais dedicados:

- [Guia de Páginas](./PAGES_GUIDE.md): Tour detalhado por cada tela.
- [Catálogo de Componentes](./COMPONENTS_GUIDE.md): Detalhes dos widgets (Gauges, Radars, Treemaps).
- [Lógica de Negócio](./BUSINESS_LOGIC.md): Fórmulas do Impact Score e Pesos TRI.
- [Arquitetura de Dados](./DATA_ARCHITECTURE.md): Estrutura das camadas JSON e Adapters.
- [Design System](./DESIGN_SYSTEM.md): Tokens visuais, tipografia e acessibilidade em alto contraste.

# Catálogo de Componentes e Widgets

Este documento descreve os principais componentes visuais do dashboard e sua finalidade analítica dentro do sistema de telemetria.

## 1. Módulos de Navegação

### Header
Barra superior fixa que gerencia a navegação entre disciplinas e a filtragem por ano e tentativa. Em dispositivos móveis, transiciona para um menu lateral (Drawer).

### SubjectHeader
Componente de identidade que exibe o `SECTION_ID` da disciplina atual, metadados de acesso e o ano do terminal ativo.

## 2. Widgets de Performance (Módulo Overview)

### KPIGrid
Conjunto de seis indicadores-chave de desempenho (KPIs). Fornece uma visão imediata da nota atual, gap para meta, taxa de eficiência, volume de questões, erros totais e tempo médio por questão.

### ProjectionChart
Gráfico de área que visualiza o Vetor de Projeção. Compara a nota atual com a meta de longo prazo, traçando o caminho necessário para o atingimento do objetivo.

### ExecutiveSynthesis
Tabela de maturidade que classifica o desempenho em cada nível de dificuldade (L_400 a L_900). Fornece o status operacional de cada faixa (Domínio, Estável, Instável ou Crítico).

## 3. Widgets de Estratégia (Módulo Strategy)

### StrategicMatrix
Gráfico de dispersão para priorização de estudos. Identifica quais níveis de dificuldade possuem o maior volume de erros com o menor esforço necessário para correção (Quadrante de Prioridade).

### DiagnosticsSection
Bloco de análise qualitativa que extrai dos dados os pontos fortes, zonas críticas e padrões de erro recorrentes.

## 4. Widgets de Análise (Módulo Analytics)

### CognitiveBreakdown
Combina um Gráfico de Pareto (concentração de erros) com uma análise de Elasticidade de Dificuldade (sensibilidade da nota à variação de nível).

### AdvancedCharts
Inclui o Radar de Competências (Balanço de Competência) para visualizar o equilíbrio entre as diferentes áreas avaliadas.

## 5. Módulo de Auditoria (Debug Module)

### IntegrityTreeMap
Mapa de calor hierárquico que visualiza a densidade de erros em todo o sistema, permitindo identificar quais matérias e níveis estão consumindo a nota global.

### TargetCard
Cartões de intervenção urgente gerados pelo algoritmo de Impact Score. Cada cartão representa uma falha de coerência TRI que deve ser priorizada.

### ProtocolSection
Logs detalhados de recomendação técnica para correção das falhas identificadas na auditoria.
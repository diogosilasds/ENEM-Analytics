
# Catálogo de Componentes e Widgets

Este documento descreve a biblioteca de componentes visuais do **ENEM Analytics 2026**. Cada componente é tratado como um "módulo de visualização" independente, projetado para renderizar dados complexos com estética de alta fidelidade.

## 1. Módulos de Identidade e Navegação

### `Header` & `SubjectHeader`
Barra de controle superior e cabeçalhos de seção.
- **Função:** Contextualização imediata (Onde estou?).
- **Visual:** Utiliza ícones da biblioteca *Lucide* e tipografia *Orbitron* para simular terminais de sistema. No modo `Debug`, as cores transicionam de Accent (Verde) para Critical (Pink).

## 2. Widgets de Performance (Overview Module)

### `KPIGrid`
Matriz de indicadores 6x1.
- **Dados:** Nota Atual, Gap, Eficiência, Volume, Erros, Ritmo.
- **Interação:** Efeitos de hover com *Neon Glow*.

### `ProjectionChart`
Gráfico de área (AreaChart).
- **Propósito:** Visualizar o *Vetor de Projeção Linear*. Mostra se a trajetória atual intercepta a meta no tempo estipulado.
- **Detalhe:** Inclui linhas de referência tracejadas para o "Target Score".

### `ExecutiveSynthesis`
Tabela de classificação de maturidade.
- **Lógica:** Segmenta o desempenho em camadas (Base, Operacional, Avançada).
- **Visual:** Utiliza ícones de escudo (Shield) para indicar o nível de blindagem do conhecimento.

## 3. Widgets de Estratégia (Strategy Module)

### `StrategicMatrix` (Scatter Plot)
O cérebro estratégico do sistema.
- **Eixo X:** Dificuldade (Esforço).
- **Eixo Y:** Erros (Impacto).
- **Quadrantes:** Define automaticamente zonas de "Ataque" (Fácil/Muito Erro) e "Manutenção".

### `DiagnosticsSection`
Bloco de texto gerado algoritmicamente.
- **Componentes:** Cards de "Ponto Forte", "Zona Crítica" e "Plano de Resgate".
- **Estilo:** Bordas laterais coloridas indicando a severidade do diagnóstico.

## 4. Widgets Analíticos (Analytics Module)

### `CognitiveBreakdown`
Combo Chart (Barra + Linha).
- **Barras:** Pareto de Erros (Onde erro mais?).
- **Linha:** Elasticidade (Sensibilidade à dificuldade).
- **Função:** Detectar o "Ponto de Ruptura" onde o aluno deixa de dominar o conteúdo.

### `AdvancedCharts` (Radar)
Gráfico de Radar (Spider Chart).
- **Uso:** Balanço de competência. Mostra a assimetria do conhecimento (ex: muito bom em teoria, ruim em aplicação).

## 5. Redação Studio (Essay Module) - NOVO

### `ScoreGauge`
Velocímetro de 270 graus.
- **Visual:** SVG customizado com animação de preenchimento baseada na nota (0-1000). Muda de cor (Amarelo/Verde) conforme a meta.

### `AnnotatedText`
Renderizador de texto rico.
- **Funcionalidade:** Exibe a redação transcrita. Palavras com desvios possuem sublinhados coloridos (Rosa=Gramática, Amarelo=Estrutura).
- **Interação:** *Tooltips* flutuantes explicam o erro ao passar o mouse.

### `StructuralGuide`
Manual interativo expansível.
- **Conteúdo:** Cards passo-a-passo (Afirmação -> Argumento -> Garantia -> Fechamento) ensinando a estrutura ideal.

## 6. Auditoria de Falhas (Debug Module) - NOVO

### `IntegrityTreeMap`
Mapa de calor hierárquico (Treemap).
- **Hierarquia:** Matéria -> Nível de Dificuldade.
- **Tamanho:** Volume de Erros.
- **Cor:** Severidade TRI (Rosa = Erro Crítico em questão fácil; Ciano = Erro em questão difícil).

### `CCIChart` (Curvas Características)
Gráfico de linhas comparativo.
- **Função:** Sobrepõe as curvas de desempenho de todas as matérias para identificar inconsistências sistêmicas.

### `TargetCard` (Cards de Urgência)
Cartões de alerta máximo.
- **Lógica:** Gerados pelo *Impact Score*. Destacam a matéria que mais está prejudicando a nota global.
- **Visual:** Inclui mini-gráficos de barra para "Precisão Local".

### `QuestionTable` (Black Box Log)
Tabela detalhada de itens.
- **Colunas:** Número, Dificuldade TRI (com tag colorida), Status (Acerto/Erro).
- **Função:** Auditoria granular questão a questão.

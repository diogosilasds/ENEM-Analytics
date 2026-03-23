
# Catálogo de Componentes e Widgets

Este documento elenca a biblioteca de componentes visuais do **ENEM Analytics 2026**. Cada módulo de visualização é independente e projetado para renderizar dados complexos com alta fidelidade estética.

## 1. Identidade e Navegação

### `Header` & `SubjectHeader`
Barra de controle e cabeçalhos de seção.
- **Função:** Contextualização imediata.
- **Visual:** Ícones *Lucide* e tipografia *Orbitron*, simulando terminais. No modo *Debug*, as cores transicionam para tons críticos.

## 2. Performance (*Overview Module*)

### `KPIGrid`
Matriz de indicadores 6x1.
- **Dados:** Nota Atual, Lacuna, Eficiência, Volume, Erros, Ritmo.
- **Interação:** Efeitos de *hover* com *neon glow*.

### `ProjectionChart`
Gráfico de área (*AreaChart*).
- **Função:** Exibir o vetor de projeção linear e sua intersecção com a meta temporal.
- **Detalhe:** Linhas de referência para a pontuação-alvo.

### `ExecutiveSynthesis`
Tabela de maturidade.
- **Lógica:** Segmenta o desempenho em Base, Operacional e Avançado.
- **Visual:** Ícones de escudo indicam a blindagem do conhecimento.

## 3. Estratégia (*Strategy Module*)

### `StrategicMatrix` (*Scatter Plot*)
Núcleo estratégico do sistema.
- **Eixos:** Dificuldade (X) *versus* Erros (Y).
- **Quadrantes:** Define zonas de "Ataque" e "Manutenção".

### `DiagnosticsSection`
Síntese textual algorítmica.
- **Componentes:** *Cards* de "Ponto Forte", "Zona Crítica" e "Plano de Resgate".
- **Estilo:** Bordas coloridas indicam a severidade do diagnóstico.

## 4. Analítica (*Analytics Module*)

### `CognitiveBreakdown`
Gráfico combinado (Barra + Linha).
- **Barras:** Princípio de Pareto aplicado aos erros.
- **Linha:** Elasticidade e sensibilidade à dificuldade.
- **Função:** Detectar o ponto de ruptura do domínio de conteúdo.

### `AdvancedCharts` (*Radar*)
Gráfico de radar (*Spider Chart*).
- **Função:** Evidenciar assimetrias de competência (teoria *versus* aplicação).

## 5. Estúdio de Redação (*Essay Module*)

### `ScoreGauge`
Velocímetro de 270 graus.
- **Visual:** SVG customizado com animação de preenchimento (0-1000) e transição cromática conforme a meta.

### `AnnotatedText`
Renderizador de texto enriquecido.
- **Função:** Exibe a redação com sublinhados semânticos para desvios.
- **Interação:** *Tooltips* explicativos *on hover*.

### `StructuralGuide`
Manual interativo expansível.
- **Conteúdo:** *Cards* sequenciais instruindo a estrutura retórica ideal.

## 6. Auditoria de Falhas (*Debug Module*)

### `IntegrityTreeMap`
Mapa de calor hierárquico (*Treemap*).
- **Hierarquia:** Matéria > Dificuldade.
- **Dimensões:** Tamanho reflete o volume de erros; cor indica a severidade TRI.

### `CCIChart` (Curvas Características)
Gráfico de linhas comparativo.
- **Função:** Sobreposição de curvas de desempenho para detecção de inconsistências sistêmicas.

### `TargetCard` (*Cards* de Urgência)
Cartões de alerta máximo.
- **Lógica:** Baseados no *Impact Score*, destacam a disciplina mais lesiva à nota global.
- **Visual:** Minigráficos de precisão local.

### `QuestionTable` (*Black Box Log*)
Tabela de auditoria granular.
- **Colunas:** Número, Dificuldade TRI e Status.
- **Função:** Rastreamento item a item.

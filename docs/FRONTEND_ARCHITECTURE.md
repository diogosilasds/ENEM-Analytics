# Arquitetura de Interface e Visualização

Manual descritivo da topologia visual. O leitor carece do código-fonte; a abstração aqui delineada é a única diretriz para a reconstrução do *front-end*.

## 1. Padrão Estrutural e Estético
- **Estética:** *Cyberpunk Analyst*. Fundo *Void Black* (#050505), painéis *Tech Gray* (#0f0f11).
- **Sinalização:** Acentos *neon* restritos a dados vitais (Esmeralda para êxito, Ciano para estabilidade, Rosa para falha crítica).
- **Layout:** *Grid* responsivo. Densidade informacional alta em *desktop*; empilhamento em *cards* e *drawers* em *mobile*.

## 2. Tipologia Gráfica e Estilo
Cada representação visual possui um propósito estrito e estilo inegociável:

- **Gráfico de Área (*AreaChart*):** Preenchimento translúcido *neon* com gradiente vertical. Linhas tracejadas indicam a meta. Uso: Projeção temporal.
- **Gráfico de Dispersão (*Scatter Plot*):** Eixos cartesianos invisíveis, grade sutil. Bolhas dimensionadas por volume de questões. Uso: Matriz estratégica (esforço *vs.* impacto).
- **Gráfico de Barras (*BarChart*):** Orientação horizontal, ordenação decrescente. Barras finas com cantos arredondados. Uso: Princípio de Pareto para erros.
- **Gráfico de Radar (*RadarChart*):** Polígonos translúcidos sobrepostos. Eixos radiais marcados. Uso: Equilíbrio de competências.
- **Mapa de Árvore (*Treemap*):** Retângulos aninhados sem margens. Área = volume; Cor = severidade TRI. Uso: Mapa de integridade.
- **Gráfico de Linhas (*LineChart*):** Séries multivariáveis sobrepostas. Linhas sólidas, sem preenchimento. Uso: Curvas características (CCI).
- **Velocímetro Radial (*Gauge*):** Arco de 270º. Espessura grossa. Transição cromática condicional (vermelho ao verde) baseada na proximidade da meta. Uso: Aferição de nota da redação.

## 3. Topologia das Páginas

A taxonomia da interface divide-se em quatro arquétipos distintos.

### A. Página Inicial (*Home*)
Visão macro e agregada. Ausência de gráficos complexos.
- **Cabeçalho:** Três *cards* numéricos gigantes (Média Geral, Dados Processados, Cobertura).
- **Corpo:** *Cards* de disciplinas. Cada *card* exibe: *status* binário (online/offline), barra de progresso linear (sincronia/eficiência) e um botão de atalho para o modo *Debug*.

### B. Painel de Disciplinas (*Subjects*)
Estrutura vertical tripartite, aprofundando a complexidade a cada rolagem.
- **Módulo 1 (Visão Geral):** Grade 6x1 de KPIs numéricos. Gráfico de Área (projeção). Tabela de maturidade (Base, Operacional, Avançado).
- **Módulo 2 (Estratégia):** Gráfico de Dispersão subdividido em quatro quadrantes táticos. Bloco de texto gerado algoritmicamente (diagnóstico).
- **Módulo 3 (Analítica):** Gráfico de Barras (Pareto de erros), Gráfico Combinado (elasticidade de dificuldade) e Gráfico de Radar (competências).

### C. Estúdio de Redação (*Essay*)
Foco estrito na análise textual e nas cinco competências.
- **Topo:** Velocímetro Radial (nota global) ladeado por um Gráfico de Radar (equilíbrio das competências).
- **Centro (Transcrição Interativa):** Renderizador de texto enriquecido. Desvios são sublinhados com cores semânticas. O *hover* aciona *tooltips* flutuantes com a correção.
- **Laterais/Inferior:** *Cards* listando erros por categoria e um manual expansível com diretrizes estruturais.

### D. Modo *Debug* (Dados de Erros)
Foco forense e transversal. A interface mais densa do sistema.
- **Topo:** Mapa de Árvore (visão unificada de falhas de todas as matérias).
- **Meio:** Gráfico de Radar (urgência inter-disciplinar) e Gráfico de Linhas (consistência).
- **Base:** *Cards* de intervenção (prioridades absolutas) e a *Black Box Recovery* — uma tabela de auditoria granular listando cada questão, sua dificuldade TRI (com *tag neon*) e o *status* (Acerto/Erro).

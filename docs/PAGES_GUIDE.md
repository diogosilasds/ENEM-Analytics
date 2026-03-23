# Guia de Navegação e Funcionalidades

Estrutura e propósito das visualizações do **ENEM Analytics 2026**.

---

## 1. Página Inicial (*Home*)

Centro de comando. Fornece um panorama imediato da saúde geral, sem aprofundamentos prematuros.

### Cabeçalho de *Status* Global
Métricas agregadas no topo:
- **Média Geral Estimada:** Pontuação combinada das áreas ativas. O "norte" da performance.
- **Dados Processados:** Volume de questões analisadas (*input*).
- **Cobertura:** Áreas com dados suficientes para diagnóstico.

### Módulos de Conhecimento (*Cards* de Disciplina)
Representação interativa de cada disciplina:
- ***Status Online/Offline*:** Presença de dados.
- **Barra de Sincronia:** Eficiência global (taxa de acerto).
- **Botão *Debug Mode*:** Acesso aos *Audit Logs* e análise de erros.

---

## 2. Painel de Disciplina

*Dashboard* tripartido em complexidade crescente.

### Módulo 1: Visão Geral (*Overview*)
Foco: "Onde estou e para onde vou".

- **Grade KPI:** Seis métricas: Nota Atual (TRI), *Gap* (distância da meta), Eficiência (%), Volume, Erros e Ritmo. Diagnóstico rápido.
- **Vetor de Projeção:** Gráfico de área (Tempo vs. Pontuação). Monitora a viabilidade da meta no prazo.
- **Síntese Executiva:** Matriz de maturidade. Segmenta o conhecimento em Base (≤500), Operacional (501-700) e Avançado (>700).

### Módulo 2: Estratégia (*Strategy*)
Foco: "O que priorizar".

- **Matriz Estratégica (*Scatter Plot*):** Dificuldade (Eixo X) vs. Erros (Eixo Y) vs. Volume (Tamanho). O **Quadrante Superior Esquerdo** (erros em questões fáceis) dita a prioridade máxima (alto ganho, baixo esforço).
- **Diagnóstico Sistêmico:** Texto algorítmico apontando Ponto Forte, Zona Crítica e Plano de Resgate.

### Módulo 3: Análise Profunda (*Analytics*)
Foco: "Causa-raiz dos erros".

- **Pareto de Erros:** Gráfico de barras horizontal. Ordena níveis de dificuldade por volume absoluto de erros.
- **Elasticidade de Dificuldade:** Queda de desempenho (*Delta*) versus dificuldade. Detecta quebras na "Régua de Coerência".
- **Balanço de Competência:** Gráfico de radar. Visualiza o equilíbrio entre subtemas.

---

## 3. Painel de Redação (*Essay View*)

Interface dedicada às 5 competências do ENEM e análise textual.

### Métricas (Topo)
- **Velocímetro (*Score Gauge*):** Gráfico circular (270º) exibindo a nota atual *versus* meta.
- **Radar de Competências:** Pentágono de equilíbrio entre C1 e C5.

### Transcrição Interativa
- **Texto Anotado:** Exibição digital com desvios sublinhados.
- **Interatividade:** *Tooltips* em *hover* detalham o erro e sugerem correção.

### *Cards* de Diagnóstico
Agrupamento lateral de erros por categoria (ex.: "6 repetições lexicais").

### Manual de Construção
Guia estrutural corretivo, baseado nas falhas detectadas.

---

## 4. Modo *Debug* (Auditoria de Falhas)

A interface mais técnica. Focada em inconsistências e "buracos" no aprendizado.

### Mapa de Integridade (*Treemap*)
- Retângulos dimensionados por volume de erros.
- **Cores:** Gravidade (Rosa = erro crítico/fácil; Ciano = erro diferencial/difícil). Visão unificada de falhas.

### Radar de Urgência
Comparativo entre matérias baseado no ***Impact Score***. Picos indicam atenção imediata.

### Curvas CCI (*Item Characteristic Curve*)
Sobreposição de curvas de desempenho. Avalia a consistência inter-disciplinar.

### Matriz de Intervenção
Elege e exibe as "Top Prioridades" em *cards* com recomendações textuais diretas.

### *Black Box Recovery* (Tabela de Itens)
*Log* detalhado: número, dificuldade TRI e *status* (Acerto/Erro), com codificação *neon* por dificuldade.


# Guia de Navegação e Funcionalidades das Páginas

Este documento detalha a estrutura de cada visualização do **ENEM Analytics 2026**, explicando o propósito de cada gráfico, métrica e seção interativa.

---

## 1. Página Inicial (Visão Geral / Home)

A `Home` atua como o centro de comando do estudante. Seu objetivo não é a análise profunda, mas fornecer um panorama imediato da saúde geral dos estudos.

### Cabeçalho de Status Global
Localizado no topo, apresenta três grandes cartões de métricas agregadas:
- **Média Geral Estimada:** A pontuação média combinada de todas as áreas ativas. Serve como o "norte" da performance atual.
- **Dados Processados:** O volume total de questões analisadas pelo sistema (input).
- **Cobertura:** Quantas das 5 grandes áreas possuem dados suficientes para gerar diagnósticos.

### Módulos de Conhecimento (Cards de Disciplina)
Cada disciplina (Humanas, Linguagens, etc.) é representada por um cartão interativo.
- **Status Online/Offline:** Indica se há dados inseridos para aquela matéria.
- **Barra de Sincronia:** Uma barra de progresso visual que representa a eficiência (taxa de acerto) global da matéria.
- **Botão Debug Mode:** Um cartão especial (Audit Logs) que leva à tela de análise de erros.

---

## 2. Painel de Disciplina (Matemática, Humanas, Natureza, Linguagens)

Ao selecionar uma matéria, o usuário acessa um dashboard dividido em três módulos verticais de complexidade crescente.

### Módulo 1: Visão Geral (Overview)
Focado em "Onde estou e para onde vou".

*   **KPI Grid (Indicadores Chave):**
    *   Uma grade com 6 métricas fundamentais: Nota Atual (TRI), Gap (distância para a meta), Eficiência (%), Volume (questões feitas), Erros e Ritmo (tempo de prova).
    *   *Função:* Diagnóstico rápido de saúde da matéria.

*   **Vetor de Projeção (Gráfico de Área):**
    *   *Eixo X:* Linha do tempo (Meses até o ENEM).
    *   *Eixo Y:* Pontuação (400 a 1000).
    *   *Visualização:* Uma curva ascendente que mostra o crescimento necessário para atingir a meta.
    *   *Função:* Monitorar se o ritmo atual de estudo é suficiente para alcançar o objetivo no prazo.

*   **Síntese Executiva (Matriz de Maturidade):**
    *   Divide o conhecimento em três camadas: Base (até 500), Operacional (500-700) e Avançada (+700).
    *   *Função:* Mostra em qual faixa de dificuldade o aluno está "Travado" ou "Fluente".

### Módulo 2: Estratégia (Strategy)
Focado em "O que devo priorizar".

*   **Matriz Estratégica (Scatter Plot / Gráfico de Dispersão):**
    *   *Eixo X (Horizontal):* Dificuldade da Questão (Esforço).
    *   *Eixo Y (Vertical):* Quantidade de Erros (Impacto na Nota).
    *   *Eixo Z (Tamanho da Bolha):* Volume total de questões.
    *   *Interpretação:* O **Quadrante Superior Esquerdo** (Muitos Erros em Questões Fáceis) é a zona de prioridade máxima, pois oferece o maior ganho de nota com o menor esforço de estudo.

*   **Diagnóstico Sistêmico:**
    *   Texto gerado algoritmicamente que aponta explicitamente o "Ponto Forte", a "Zona Crítica" e o "Plano de Resgate".

### Módulo 3: Análise Profunda (Analytics)
Focado em "Por que estou errando".

*   **Pareto de Erros (Gráfico de Barras Horizontal):**
    *   Ordena os níveis de dificuldade pelo número absoluto de erros.
    *   *Função:* Identificar rapidamente qual nível específico (ex: Nível 650) está drenando a nota.

*   **Elasticidade de Dificuldade (Gráfico Combinado):**
    *   Mostra a queda de desempenho (Delta) conforme a dificuldade aumenta.
    *   *Função:* Detectar onde a "Régua de Coerência" quebra (ex: acertar tudo até o nível 600 e cair bruscamente no 650).

*   **Balanço de Competência (Radar Chart):**
    *   Visualiza o equilíbrio entre diferentes sub-temas ou faixas de dificuldade.

---

## 3. Painel de Redação (Essay View)

Uma interface totalmente distinta, focada nas 5 competências do ENEM e na análise textual.

### Seção de Métricas (Topo)
*   **Velocímetro (Score Gauge):** Um gráfico circular de 270º que mostra a nota atual (0-1000) em relação à meta, com codificação de cores (Verde, Amarelo, Vermelho).
*   **Radar de Competências:** Um pentágono que mostra o equilíbrio entre C1, C2, C3, C4 e C5. Ajuda a ver se o aluno é bom em gramática mas ruim em argumentação, por exemplo.

### Transcrição Interativa
*   **Texto Anotado:** O texto da redação é exibido digitalmente. Palavras com desvios (gramaticais ou estruturais) são sublinhadas e coloridas.
*   **Interatividade:** Ao passar o mouse sobre um erro, um *tooltip* aparece explicando o tipo do erro (ex: "Crase Indevida") e a correção sugerida.

### Cards de Diagnóstico
*   Listas laterais que agrupam os erros por categoria (ex: "6 erros de repetição de palavras", "Argumentação superficial").

### Manual de Construção
*   Um guia passo-a-passo (frequentemente oculto e revelado ao final) que ensina a estrutura ideal para os parágrafos, baseado nas falhas detectadas.

---

## 4. Modo Debug (Auditoria de Falhas)

Esta é a página mais técnica do sistema, desenhada para encontrar inconsistências na preparação do aluno ("Buracos" no aprendizado).

### Mapa de Integridade (Treemap)
*   Um gráfico retangular onde o tamanho de cada bloco representa a quantidade de erros.
*   *Cores:* Indicam a gravidade (Rosa = Erro em questão fácil/crítica; Ciano = Erro em questão difícil).
*   *Função:* Permite visualizar, em uma única imagem, onde está a maior concentração de falhas de todo o ecossistema de estudo.

### Radar de Urgência
*   Um gráfico de radar que compara todas as matérias (Matemática, Humanas, etc.) baseando-se no **Impact Score**. A matéria que tiver o pico mais alto é a que precisa de atenção imediata.

### Curvas CCI (Item Characteristic Curve)
*   Um gráfico de linhas multivariável que sobrepõe as curvas de desempenho de todas as matérias.
*   *Função:* Comparar a consistência entre matérias (ex: verificar se o aluno é consistente em Humanas mas instável em Natureza).

### Matriz de Intervenção (Cards de Prioridade)
*   O sistema elege automaticamente as "Top Prioridades".
*   Exibe cartões ("Rank #1", "Rank #2") com recomendações de texto específicas (ex: "Pare de estudar Logaritmo e volte para Aritmética Básica").

### Black Box Recovery (Tabela de Itens)
*   Uma tabela detalhada ("Log do Sistema") listando questão por questão: número, dificuldade TRI, e status (Acerto/Erro).
*   *Visual:* Usa cores neon para categorizar a dificuldade de cada item individualmente.

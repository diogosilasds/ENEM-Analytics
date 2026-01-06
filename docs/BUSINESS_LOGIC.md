# Lógica de Negócio e Algoritmos Analíticos

Este documento descreve as premissas matemáticas e lógicas que sustentam as métricas apresentadas no ENEM Analytics 2026.

## 1. Simulação da Teoria de Resposta ao Item (TRI)

O sistema não utiliza uma média aritmética simples para projetar a nota do estudante. A lógica de cálculo busca a coerência pedagógica:

- Premissa de Coerência: O sistema penaliza acertos em questões de alta dificuldade caso o estudante apresente uma taxa de erro elevada em questões de nível básico.
- Validação no Código: Caso a taxa de acerto em níveis inferiores a 500 pontos seja menor que 80%, o sistema sinaliza uma "Régua de Coerência Quebrada". Nesses casos, acertos em níveis superiores a 750 são tratados como estatisticamente irrelevantes para o crescimento consistente da nota.

## 2. Algoritmo de Auditoria de Falhas (Debug Mode)

O módulo de auditoria utiliza um índice proprietário chamado Impact Score para determinar a urgência de intervenção em cada área do conhecimento.

### Fórmula do Impact Score
O cálculo é realizado da seguinte forma:
`ImpactScore = (Erros_Absolutos * Peso_TRI) + ((100 - Taxa_Acerto) / 10)`

### Pesos por Nível de Dificuldade (Peso_TRI)
Para simular o impacto real no exame, os erros são ponderados de acordo com sua gravidade pedagógica:
- Nível ≤ 500: Peso 3.0 (Crítico - Indica falha de fundamentos básicos).
- Nível 501 a 650: Peso 2.0 (Importante - Obstrui a transição para notas competitivas).
- Nível > 800: Peso 0.5 (Secundário - Erros esperados em alta complexidade).

## 3. Matriz de Priorização (Impacto vs. Esforço)

A Matriz Estratégica posiciona os dados em quatro quadrantes baseados em dois eixos:
- Eixo X (Esforço): Representado pelo nível de dificuldade da questão.
- Eixo Y (Impacto): Representado pela quantidade absoluta de pontos perdidos (erros).

O algoritmo prioriza o quadrante de Baixa Dificuldade e Alto Impacto. A lógica didática é que a correção de erros simples gera um ganho de nota maior com menor carga cognitiva de estudo.

## 4. Vetor de Projeção

A projeção de notas é calculada de forma linear ao longo de um ciclo de 10 meses, onde o Req_Delta (Delta Requerido) é a diferença entre a Meta Alvo e a Nota Atual dividida pelo número de iterações restantes até o exame oficial.

## 5. Protocolos de Intervenção Dinâmica

As recomendações textuais são geradas através de uma matriz de decisão que cruza a Matéria com o Nível de Erro identificado:
- Nível Baixo (< 500): Recomendações focadas em revisão de pré-requisitos e conceitos fundamentais.
- Nível Médio (500-700): Recomendações focadas em aplicação prática, interpretação de enunciados e conexão interdisciplinar.
- Nível Alto (> 700): Recomendações de refinamento técnico e gestão de tempo.
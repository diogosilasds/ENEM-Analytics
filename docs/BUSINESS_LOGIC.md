
# Lógica de Negócio e Algoritmos Analíticos

Este documento descreve as "Leis do Sistema": as premissas matemáticas e lógicas que transformam dados brutos em inteligência de aprovação no **ENEM Analytics 2026**.

## 1. Simulação TRI (Teoria de Resposta ao Item)

O sistema rejeita médias aritméticas simples. A lógica de cálculo busca a **Coerência Pedagógica**:

- **Régua de Coerência:** O sistema monitora a taxa de acerto em faixas progressivas.
- **Penalidade de Inversão:** Se o estudante acerta questões Nível 800 mas erra questões Nível 400, o sistema sinaliza uma "Ruptura de Coerência". No painel de diagnósticos, isso é traduzido como "Incoerência Gráfica" ou "Chute Provável".

## 2. Algoritmo de Auditoria (Debug Mode & Impact Score)

O coração do Modo Debug é o **Impact Score**. Este índice define a ordem de prioridade dos estudos.

### Fórmula do Impact Score
```
ImpactScore = (Erros_Absolutos * Peso_Pedagógico) + ((100 - Taxa_Acerto) / 10)
```

### Pesos Pedagógicos (A Gravidade do Erro)
Nem todo erro tem o mesmo peso. O sistema pune severamente falhas na base:
- **Nível ≤ 500 (Base):** Peso **3.0** (CRÍTICO). Errar aqui destrói a nota TRI.
- **Nível 501-650 (Operacional):** Peso **2.0** (ALERTA). Zona de maior ganho de volume.
- **Nível > 650 (Refinamento):** Peso **1.0**.
- **Nível > 800 (Topo):** Peso **0.5**. Erros aceitáveis estatisticamente.

## 3. Matriz Estratégica (O Quadrante Alpha)

O gráfico de dispersão (`StrategicMatrix`) classifica os tópicos em quatro quadrantes táticos:
1.  **Prioridade Alpha (Ataque):** Baixa Dificuldade + Alto Volume de Erros. (Foco Imediato).
2.  **Oportunidade (Refinar):** Média Dificuldade + Médio Erro.
3.  **Manutenção (Monitorar):** Alta Taxa de Acerto (independente da dificuldade).
4.  **Descarte Tático:** Alta Dificuldade + Baixo Volume (Custo-benefício ruim).

## 4. Lógica de Redação (Essay Logic)

A análise de redação opera de forma distinta, baseada nas 5 Competências Oficiais:

- **Quantificação de Desvios:** O sistema conta ocorrências de tags (`grammar`, `structure`, `cohesion`).
- **Detecção de Vícios:** Algoritmos simples (regex) identificam repetição de palavras (ex: usar "família" > 3 vezes).
- **Cálculo de Gap:** `Gap_Competencia = 200 - Nota_Atual`. O sistema ordena as competências pelo tamanho do Gap para sugerir correções.

## 5. Vetor de Projeção Linear

A projeção de crescimento utiliza uma regressão linear simplificada sobre um período fixo (ex: 10 meses até o exame).
- **Req_Delta (Delta Requerido):** Quantos pontos o aluno precisa ganhar *por mês* para atingir a meta.
- Se `Req_Delta > 40 pontos/mês`, o sistema emite um alerta de "Meta Irrealista" ou "Necessidade de Intensivão".

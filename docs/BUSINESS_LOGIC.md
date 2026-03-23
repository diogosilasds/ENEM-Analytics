
# Lógica de Negócio e Algoritmos Analíticos

Este documento delineia as premissas matemáticas que convertem dados brutos em inteligência estratégica no **ENEM Analytics 2026**.

## 1. Simulação TRI (Teoria de Resposta ao Item)

O sistema pretere médias aritméticas em favor da **Coerência Pedagógica**:
- **Régua de Coerência:** Monitoramento contínuo da taxa de acerto em faixas progressivas.
- **Penalidade de Inversão:** Acertos em questões complexas (Nível 800) combinados a erros em questões basilares (Nível 400) configuram "Ruptura de Coerência", sinalizada como "Chute Provável".

## 2. Algoritmo de Auditoria (Impact Score)

O **Impact Score** rege o Modo Debug, estabelecendo a prioridade de estudos.

### Fórmula
```text
ImpactScore = (Erros_Absolutos * Peso_Pedagógico) + ((100 - Taxa_Acerto) / 10)
```

### Pesos Pedagógicos
O sistema penaliza assimetrias na base do conhecimento:
- **Nível ≤ 500 (Base):** Peso **3.0** (Crítico). Falhas aqui comprometem severamente a nota TRI.
- **Nível 501-650 (Operacional):** Peso **2.0** (Alerta). Zona de maior alavancagem de volume.
- **Nível > 650 (Refinamento):** Peso **1.0**.
- **Nível > 800 (Topo):** Peso **0.5**. Erros estatisticamente toleráveis.

## 3. Matriz Estratégica

O gráfico de dispersão (`StrategicMatrix`) categoriza tópicos em quatro quadrantes:
1. **Prioridade Alpha (Ataque):** Baixa dificuldade e alto volume de erros (foco imediato).
2. **Oportunidade (Refinamento):** Dificuldade e erros medianos.
3. **Manutenção (Monitoramento):** Alta taxa de acerto, independentemente da dificuldade.
4. **Descarte Tático:** Alta dificuldade e baixo volume de erros (relação custo-benefício desfavorável).

## 4. Lógica de Redação

A análise textual fundamenta-se nas cinco competências oficiais:
- **Quantificação de Desvios:** Contabilização de *tags* (`grammar`, `structure`, `cohesion`).
- **Detecção de Vícios:** Identificação algorítmica de repetições lexicais via expressões regulares.
- **Cálculo de Lacuna:** `Gap_Competencia = 200 - Nota_Atual`. Ordenação das competências pelo déficit para direcionar correções.

## 5. Vetor de Projeção Linear

A projeção de crescimento emprega regressão linear simplificada sobre um período fixo.
- **Delta Requerido (`Req_Delta`):** Pontuação mensal necessária para atingir a meta.
- **Alerta:** Valores superiores a 40 pontos/mês acionam advertências de "Meta Irrealista" ou "Necessidade de Intensivão".

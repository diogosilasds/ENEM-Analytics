# ADR 001: Arquitetura Modular do *Dashboard*

## *Status*
Aceito

## Contexto
A centralização de múltiplas visualizações (KPIs, gráficos, tabelas) em um único componente gera um monólito de difícil manutenção e testabilidade.

## Decisão
Adotar uma arquitetura modular baseada em "Momentos de Uso", segmentando o *dashboard* em três submódulos autônomos:
1. **Overview:** Visão rápida e *status*.
2. **Strategy:** Planejamento e priorização.
3. **Analytics:** Análise histórica e profunda.

## Consequências

### Positivas
- **Separação de Preocupações (SoC):** Responsabilidades estritas por módulo.
- **Manutenibilidade:** Isolamento de lógicas (ex.: alterações em *Analytics* não afetam *Overview*).
- **Escalabilidade:** Inserção de novos módulos sem refatoração estrutural.

### Negativas
- ***Prop Drilling*:** Necessidade de repasse do objeto de dados aos submódulos (mitigado por *hooks* centralizados).
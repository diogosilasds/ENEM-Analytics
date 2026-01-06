# ADR 001: Arquitetura Modular do Dashboard

## Status
Aceito

## Contexto
O componente principal do dashboard tende a crescer excessivamente ao tentar gerenciar múltiplas visualizações e tipos de dados simultaneamente (KPIs, gráficos complexos, tabelas de diagnóstico). Isso resulta em um código monolítico, difícil de manter e testar.

## Decisão
Adotar uma arquitetura modular baseada em "Momentos de Uso", dividindo o dashboard em três sub-módulos independentes:
1.  **Overview**: Para visualização rápida e status.
2.  **Strategy**: Para planejamento e ação.
3.  **Analytics**: Para análise profunda e histórica.

## Consequências

### Positivas
*   **Separação de Preocupações (SoC)**: Cada módulo tem uma responsabilidade clara e única.
*   **Manutenibilidade**: Alterações na lógica de "Análise" não afetam a lógica de "Visão Geral".
*   **Escalabilidade**: Novos módulos podem ser adicionados sem refatorar a estrutura existente.

### Negativas
*   **Prop Drilling**: Necessidade de passar o objeto de dados principal para cada sub-módulo (mitigado pelo uso de um hook centralizado de dados).
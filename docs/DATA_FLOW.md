# Fluxo de Dados (*Data Lifeline*)

Este documento descreve a trajetória da informação, do armazenamento estático à renderização na interface.

## 1. Fonte de Dados (*Static DB*)
Dados brutos residem em arquivos TypeScript (`data/db/json/`), estruturados conforme contratos de configuração e registros históricos.

## 2. Processamento (*Logic Layer*)
A camada lógica (`data/logic/processor.ts`) consome os dados brutos, executando cálculos estatísticos, projeções e atribuição de coloração semântica.

## 3. Adaptação e Exposição (*Adapter Layer*)
Adaptadores (`data/modules/`) exportam dados processados ao `dashboardService`. Este atua como *Facade*, isolando a interface da lógica de processamento e da estrutura de dados.

## 4. Gerenciamento de Estado (*Hook Layer*)
O *hook* `useDashboard` monitora interações do usuário, requisita dados ao `dashboardService` e preserva o estado da visualização.

## 5. Renderização (*UI Layer*)
Componentes React recebem dados via *props*, restringindo-se à apresentação visual. A ausência de cálculos pesados nesta camada assegura fluidez.

### Síntese do Percurso
`TS Definition -> Analytical Processor -> Dashboard Service -> useDashboard Hook -> UI Component`

A unidirecionalidade do fluxo garante que alterações lógicas reflitam-se de maneira automática e consistente em todos os *widgets*.
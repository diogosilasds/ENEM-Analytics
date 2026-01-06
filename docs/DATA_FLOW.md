# Fluxo de Dados (Data Lifeline)

Este documento descreve o percurso da informação, desde o armazenamento estático até a renderização visual nos componentes da interface.

## 1. Fonte de Dados (Static DB)
Os dados brutos são definidos em arquivos TypeScript no diretório `data/db/json/`. Estes arquivos contêm objetos que seguem o contrato de configuração e registros históricos.

## 2. Processamento (Logic Layer)
A Camada de Lógica (`data/logic/processor.ts`) consome os dados brutos. Ela executa os cálculos estatísticos, gera as projeções e aplica as regras de coloração semântica baseadas em faixas de acerto.

## 3. Adaptação e Exposição (Adapter Layer)
Os adaptadores em `data/modules/` exportam os dados processados para o `dashboardService`. Este serviço atua como uma fachada (Facade), isolando a interface da lógica de processamento e da estrutura do banco de dados.

## 4. Gerenciamento de Estado (Hook Layer)
O hook `useDashboard` monitora as interações do usuário (troca de matéria, ano ou tentativa). Ele solicita os dados necessários ao `dashboardService` e armazena o estado atual da visualização.

## 5. Renderização (UI Layer)
Os componentes React recebem os dados processados via Props. Eles são responsáveis apenas pela apresentação visual e não realizam cálculos de negócio pesados, garantindo uma interface fluida.

### Resumo do Percurso
`TS Definition -> Analytical Processor -> Dashboard Service -> useDashboard Hook -> UI Component`

Este fluxo unidirecional garante que qualquer alteração na lógica de cálculo de nota seja refletida automaticamente em todos os widgets do sistema de forma consistente.
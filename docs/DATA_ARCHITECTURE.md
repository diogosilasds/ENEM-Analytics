# Arquitetura de Dados Estratificada

O sistema adota um modelo de dados segmentado em quatro camadas independentes, assegurando integridade informacional e escalabilidade.

## Camada 1: Identidade e Configuração (*Identity Layer*)
Situada em `data/db/json/` (campo `config`).
Define os metadados perenes de cada disciplina:
- Identificadores unívocos (ID).
- Metas de pontuação de longo prazo.
- Competências avaliadas.
- Configuração de *widgets* autorizados.

## Camada 2: Registros e Eventos (*Registry Layer*)
Situada em `data/db/json/` (campo `registries`).
Armazena o histórico cronológico de *snapshots* de performance:
- Referência do exame (ex.: ENEM 2024).
- Tempo de execução.
- Detalhamento granular de acertos e erros por nível de dificuldade.
- Análises qualitativas do evento.

## Camada 3: Lógica Analítica (*Logic Layer*)
Situada em `data/logic/processor.ts`.
Processa os dados brutos das camadas antecedentes:
- Agregação estatística de acertos.
- Geração de tabelas de detalhamento por nível.
- Atribuição de cores semânticas baseadas em performance.
- Execução de heurísticas de projeção.

## Camada 4: Adaptação (*Adapter Layer*)
Situada em `data/modules/`.
Atua como interface final para o *Dashboard Service*. Instancia o processador disciplinar e exporta objetos formatados segundo a interface `MateriaData`.

## Fluxo de Sincronização
O sistema impõe a unidirecionalidade dos dados:
`JSON Bruto (1 e 2) -> Processador Lógico (3) -> Módulo Adaptador (4) -> Service -> UI`.

Tal desacoplamento viabiliza alterações na interface visual e a criação de novas métricas sem a reestruturação da base histórica.
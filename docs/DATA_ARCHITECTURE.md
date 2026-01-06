# Arquitetura de Dados Estratificada

O sistema utiliza um modelo de dados dividido em quatro camadas independentes para garantir a integridade das informações e a escalabilidade da plataforma.

## Camada 1: Identidade e Configuração (Identity Layer)
Localizada em `data/db/json/` sob o campo `config`.
Esta camada define os metadados permanentes de cada disciplina, incluindo:
- Identificadores únicos (ID).
- Metas de pontuação de longo prazo.
- Competências específicas avaliadas.
- Configuração de widgets autorizados para aquela área.

## Camada 2: Registros e Eventos (Registry Layer)
Localizada em `data/db/json/` sob o campo `registries`.
Armazena o histórico cronológico de snapshots de performance. Cada registro contém:
- Referência do exame (ex: ENEM 2024).
- Tempo total de realização.
- Detalhamento granular de acertos e erros por nível de dificuldade.
- Análises qualitativas capturadas no momento do evento.

## Camada 3: Lógica Analítica (Logic Layer)
Localizada em `data/logic/processor.ts`.
Esta camada é responsável por processar os dados brutos das Camadas 1 e 2. Suas funções incluem:
- Agregação estatística de acertos totais.
- Geração de tabelas de detalhamento de nível.
- Cálculo de cores semânticas para interface baseadas em performance.
- Execução de heurísticas de projeção.

## Camada 4: Adaptação (Adapter Layer)
Localizada em `data/modules/`.
Atua como a interface final para o Dashboard Service. Ela instancia o processador para a disciplina específica e exporta os objetos formatados conforme a interface `MateriaData`.

## Fluxo de Sincronização
O sistema prioriza a unidirecionalidade dos dados:
`JSON Bruto (1 e 2) -> Processador Lógico (3) -> Módulo Adaptador (4) -> Service -> UI`.

Este desacoplamento permite que a interface visual seja alterada ou que novas métricas sejam criadas sem a necessidade de reestruturar a base de dados histórica.
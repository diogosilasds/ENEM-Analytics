# Estrutura do Projeto e Organização de Arquivos

O projeto segue um padrão modular projetado para facilitar a manutenção e o isolamento de responsabilidades. Abaixo está a descrição detalhada da hierarquia de diretórios.

## Diretórios Principais

- `/components`: Contém todos os componentes React.
    - `/dashboard`: Componentes específicos de negócio e widgets de visualização.
    - `/dashboard/modules`: Módulos principais que agrupam widgets (Overview, Strategy, Analytics, Debug).
    - `/ui`: Componentes genéricos de interface (Tooltips, Overlays).
- `/data`: Camada de persistência e lógica de processamento.
    - `/db`: Banco de dados estático organizado por disciplinas.
    - `/logic`: Algoritmos de processamento analítico e TRI.
    - `/modules`: Adaptadores que expõem os dados processados para a aplicação.
- `/services`: Abstração de acesso aos dados. Contém o `dashboardService`, única fonte de verdade para a interface.
- `/hooks`: Hooks customizados para gerenciamento de estado e navegação.
- `/styles`: Design tokens, definições do Tailwind e estilos globais CSS.
- `/types`: Definições de interfaces TypeScript que garantem o contrato de dados em todo o sistema.
- `/docs`: Documentação técnica, registros de decisão (ADRs) e guias de uso.

## Padrões de Nomenclatura

- Componentes: PascalCase (ex: `ProjectionChart.tsx`).
- Serviços e Hooks: camelCase (ex: `useDashboard.ts`).
- Arquivos de Dados: kebab-case ou camelCase (ex: `humanas.ts`).
- Identificadores Técnicos: O sistema utiliza o prefixo `SECTION://` para identificar áreas do conhecimento e `SYSTEM://` para diagnósticos globais.
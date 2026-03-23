# Estrutura do Projeto

O sistema adota um padrão modular, concebido para maximizar a manutenibilidade e o isolamento de responsabilidades.

## Hierarquia de Diretórios

- `/components`: Componentes React.
  - `/dashboard`: *Widgets* de visualização e componentes de negócio.
  - `/dashboard/modules`: Agrupamentos modulares (*Overview*, *Strategy*, *Analytics*, *Debug*).
  - `/ui`: Elementos genéricos de interface (*tooltips*, *overlays*).
- `/data`: Persistência e processamento.
  - `/db`: Banco de dados estático, segmentado por disciplina.
  - `/logic`: Algoritmos analíticos e simulação TRI.
  - `/modules`: Adaptadores para exposição de dados processados.
- `/services`: Abstração de acesso a dados. Inclui `dashboardService`, a fonte única de verdade (*SSOT*) da interface.
- `/hooks`: *Hooks* customizados para estado e navegação.
- `/styles`: *Design tokens*, configurações Tailwind e CSS global.
- `/types`: Contratos TypeScript que asseguram a integridade tipográfica do sistema.
- `/docs`: Documentação técnica, ADRs e guias.

## Padrões de Nomenclatura

- **Componentes:** *PascalCase* (ex.: `ProjectionChart.tsx`).
- **Serviços e Hooks:** *camelCase* (ex.: `useDashboard.ts`).
- **Dados:** *kebab-case* ou *camelCase* (ex.: `humanas.ts`).
- **Identificadores Técnicos:** Prefixos `SECTION://` para áreas de conhecimento e `SYSTEM://` para diagnósticos globais.
# Diretrizes de Reconstrução: Gênese

Manual estrito para replicação arquitetural. Prescinde de fontes externas; a gênese do sistema reside nestas linhas.

## 1. Topologia de Diretórios
- `/components`: Elementos visuais. Segregue em `/ui` (genéricos) e `/dashboard` (regras de negócio).
- `/data`: Persistência estática. Subdivida em `/db` (arquivos brutos) e `/logic` (processamento analítico).
- `/services`: Fachadas (*Facades*). Intermediários exclusivos entre dados e interface.
- `/hooks`: Gerenciamento de estado e reatividade.
- `/styles`: *Tokens* visuais e CSS global (Tailwind).
- `/types`: Contratos TypeScript. Rigor tipográfico inegociável.

## 2. Arquivos Fundamentais
- `main.tsx`: Ponto de ignição. Injeção do React no DOM.
- `App.tsx`: Orquestrador de rotas e *layout* mestre.
- `dashboardService.ts`: Único canal de acesso aos dados. Fonte única de verdade (*SSOT*).

## 3. Persistência e Fluxo
- **Abordagem:** *Static-First*. Dados residem em arquivos `.ts` ou `.json`.
- **Estrutura:** Divida em `config` (metadados perenes) e `registries` (histórico cronológico).
- **Fluxo Unidirecional:** `JSON -> Processador Lógico -> Serviço -> Hook -> Componente`.
- **Restrição:** A interface (UI) jamais acessa dados diretamente.

## 4. Estados de Ausência (Páginas sem Dados)
- **Tolerância a Falhas:** Ausência de dados não colapsa a interface.
- **Renderização:** Exiba *layouts* estruturais com *placeholders* ou indicativos visuais (ex.: `NO_DATA`). Preserve a estética do terminal.

## 5. Protocolo de Atualização
- **Mutabilidade:** Alterações exigem edição direta nos arquivos em `/data/db/`.
- **Efetivação:** Requer nova compilação (*build*) e implantação (*deploy*). Não há banco de dados dinâmico.

## 6. Pilha Tecnológica (*Stack*)
- **Núcleo:** React 19, Vite, TypeScript.
- **Estilização:** Tailwind CSS (modo escuro estrito, alto contraste).
- **Visualização:** Recharts (vetorial).
- **Iconografia:** Lucide React.

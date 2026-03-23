# ADR 002: Padrão de Dados (*Static-First*)

## *Status*
Aceito

## Contexto
A aplicação exige carregamento instantâneo e estabilidade demonstrativa, prescindindo da complexidade operacional de um *backend* relacional imediato.

## Decisão
Persistir dados via arquivos TypeScript estáticos (`data/modules/*.ts`), acessados exclusivamente por uma camada de serviço (`services/`).

### Regras de Implementação
- A interface (UI) jamais importa arquivos de `data/` diretamente.
- Toda requisição de dados é intermediada pelo `dashboardService`.

## Consequências

### Positivas
- **Latência Zero:** Eliminação do tempo de rede (*Round Trip Time*).
- ***Type Safety*:** Garantia de integridade de dados em tempo de compilação via TypeScript.
- **Simplicidade de *Deploy*:** Hospedagem viável em qualquer CDN como SPA (*Single Page Application*).

### Negativas
- **Atualização de Dados:** Exige alteração no código-fonte e novo *deploy* para refletir mudanças.
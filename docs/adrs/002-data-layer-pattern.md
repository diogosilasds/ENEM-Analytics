# ADR 002: Padrão de Camada de Dados (Static-first)

## Status
Aceito

## Contexto
A aplicação requer alta performance de carregamento e estabilidade para demonstração, sem a complexidade operacional imediata de um backend dedicado e banco de dados relacional.

## Decisão
Implementar a persistência de dados através de arquivos TypeScript estáticos (`data/modules/*.ts`) acessados exclusivamente por uma camada de serviço (`services/`).

### Regras de Implementação
*   A UI nunca importa arquivos da pasta `data/` diretamente.
*   Toda solicitação de dados deve passar pelo `dashboardService`.

## Consequências

### Positivas
*   **Latência Zero**: Elimina o tempo de requisição de rede (Round Trip Time).
*   **Type Safety**: Aproveita a tipagem estática do TypeScript para garantir a integridade dos dados em tempo de compilação.
*   **Simplicidade de Deploy**: Permite hospedagem em qualquer CDN como uma SPA (Single Page Application).

### Negativas
*   **Atualização de Dados**: Requer alteração no código-fonte e novo deploy para atualizar as informações.
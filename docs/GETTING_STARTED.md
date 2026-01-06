# Guia de Início Rápido (Getting Started)

Este documento instrui sobre como configurar e executar o ambiente de desenvolvimento do ENEM Analytics 2026.

## Requisitos de Ambiente

O projeto utiliza uma arquitetura moderna que dispensa etapas de compilação pesadas (No-Build). Para executá-lo, é necessário apenas um servidor HTTP simples.

## Execução Local

Como o sistema utiliza módulos ES6 nativos, ele não deve ser aberto diretamente pelo sistema de arquivos (protocolo `file://`). Utilize um dos métodos abaixo:

### Método 1: Extensão Live Server (VS Code)
1. Abra a pasta raiz no VS Code.
2. Com a extensão Live Server instalada, clique no botão "Go Live" no canto inferior direito.
3. A aplicação será aberta automaticamente em `http://127.0.0.1:5500`.

### Método 2: Python (Servidor Rápido)
No terminal, na pasta raiz do projeto, execute:
`python -m http.server 3000`
Acesse `http://localhost:3000` em seu navegador.

## Gerenciamento de Dependências

O projeto não utiliza `npm install` para bibliotecas de runtime. As dependências são gerenciadas via Import Maps localizados no arquivo `index.html`.

As principais bibliotecas carregadas via CDN (esm.sh) são:
- React (v19)
- Recharts (v3)
- Lucide React

Para adicionar novas bibliotecas, o mapeamento deve ser inserido na tag `<script type="importmap">`.

## Fluxo de Desenvolvimento

Ao realizar alterações nos arquivos `.ts` ou `.tsx`, o navegador refletirá as mudanças após o recarregamento, desde que o ambiente de execução suporte a transpilação imediata ou que os arquivos já estejam em formato compatível com o navegador conforme configurado na infraestrutura de serviço.
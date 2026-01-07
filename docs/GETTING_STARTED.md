# Guia de Início Rápido (Getting Started)

Este documento instrui sobre como configurar e executar o ambiente de desenvolvimento do ENEM Analytics 2026.

## Requisitos de Ambiente

O projeto utiliza **Vite** para compilação e desenvolvimento local.
- **Node.js**: Versão 18 ou superior.
- **NPM**: Gerenciador de pacotes padrão.

## Instalação

1. Clone o repositório.
2. Na raiz do projeto, instale as dependências:
   ```bash
   npm install
   ```

## Execução Local (Desenvolvimento)

Para iniciar o servidor de desenvolvimento com Hot Module Replacement (HMR):

```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:3000`.

## Build para Produção (GitHub Pages)

Para gerar os arquivos estáticos otimizados para produção:

```bash
npm run build
```

Os arquivos serão gerados na pasta `dist/`. O conteúdo desta pasta é o que deve ser servido pelo GitHub Pages.

## Deploy

O projeto está configurado (`vite.config.ts`) com `base: '/ENEM-Analytics/'` para suportar o deploy em subdiretórios, como é o caso padrão do GitHub Pages (User Site).
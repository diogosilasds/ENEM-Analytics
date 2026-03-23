# Guia de Início Rápido

Instruções para configuração e execução do ambiente de desenvolvimento do **ENEM Analytics 2026**.

## Pré-requisitos

O projeto emprega **Vite** para compilação.
- **Node.js:** Versão 18 ou superior.
- **NPM:** Gerenciador de pacotes.

## Instalação

1. Clone o repositório.
2. No diretório raiz, instale as dependências:
   ```bash
   npm install
   ```

## Desenvolvimento Local

Inicie o servidor com *Hot Module Replacement* (HMR):
```bash
npm run dev
```
Acesso via: `http://localhost:3000`.

## Compilação para Produção

Gere os artefatos estáticos otimizados:
```bash
npm run build
```
Os arquivos serão alocados no diretório `dist/`, prontos para distribuição.

## Implantação (*Deploy*)

O arquivo `vite.config.ts` define `base: '/ENEM-Analytics/'`, viabilizando a implantação em subdiretórios, padrão do *GitHub Pages*.
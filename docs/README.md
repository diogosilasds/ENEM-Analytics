# ENEM Analytics 2026: Documentação Técnica do Sistema

O ENEM Analytics 2026 é um sistema de telemetria de performance acadêmica desenvolvido para converter dados brutos de simulados e exames em inteligência diagnóstica. O software utiliza uma interface de alto contraste para facilitar a análise de métricas complexas e identificação de padrões de erro.

## Objetivos do Software

O sistema visa resolver a fragmentação de dados no processo de preparação para o ENEM. Em vez de focar apenas no número absoluto de acertos, a plataforma analisa a coerência pedagógica do estudante através da Teoria de Resposta ao Item (TRI) e fornece protocolos de intervenção baseados em evidências estatísticas.

## Visão Geral da Arquitetura

A aplicação é construída sobre uma arquitetura No-Build moderna, utilizando módulos ES6 nativos e Import Maps. Esta escolha técnica garante que o sistema seja leve, de fácil implantação e mantenha alta performance sem a necessidade de etapas de compilação complexas no ambiente de desenvolvimento local.

## Principais Funcionalidades

1. Telemetria de Performance: Monitoramento de score estimado, eficiência por área e ritmo de prova.
2. Análise de Vetor de Projeção: Cálculo de crescimento necessário para atingir metas pré-estabelecidas.
3. Matriz de Priorização: Gráficos de dispersão que correlacionam impacto (volume de erros) com esforço (nível de dificuldade).
4. Auditoria de Falhas (Debug Mode): Um módulo transversal que analisa a consistência de todos os dados do sistema para identificar falhas de base que prejudicam a nota global.

## Navegação da Documentação

Para uma compreensão aprofundada do sistema, consulte os seguintes documentos:

- Estrutura do Projeto: Organização de diretórios e padrões de nomenclatura.
- Arquitetura de Dados: O modelo de quatro camadas (Identidade, Registro, Lógica e Adaptação).
- Lógica de Negócio: Fórmulas de cálculo de impacto, pesos TRI e algoritmos de recomendação.
- Design System: Definição de tokens visuais, tipografia e diretrizes de acessibilidade.
- Guia de Início Rápido: Instruções para execução do ambiente e gerenciamento de dependências via CDN.
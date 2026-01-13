
# Sistema de Design: Cyberpunk Analyst

O **ENEM Analytics 2026** adota uma linguagem visual agressiva, de alto contraste e densidade de informação, inspirada em interfaces de ficção científica (Sci-Fi UI) e terminais de dados. O objetivo não é apenas estética, mas **foco cognitivo**: em um mar de dados escuros, apenas o que importa brilha.

## 1. Paleta Cromática Semântica

O sistema opera exclusivamente em **Deep Dark Mode**. As cores não são decorativas; são indicadores de status.

### Cores de Interface (UI)
- **Void Black (#050505):** Fundo principal. Reduz a emissão de luz para sessões longas.
- **Tech Gray (#0f0f11):** Fundo de cartões e módulos.
- **Muted Text (#a3a3a3):** Metadados, rótulos e eixos.

### Cores de Dados (Data Viz)
- **Accent Emerald (#00ff9f):** Sucesso, crescimento, Nível Seguro, Competência Dominada.
- **Cyber Cyan (#00f3ff):** Informação técnica, projeções, Nível Estável.
- **Warning Yellow (#f3e600):** Atenção, Nível Alerta, Vícios de Linguagem.
- **Critical Pink (#ff0055):** Erro, Perda, Nível Crítico, Falha Gramatical.

### Código de Cores TRI (Níveis de Dificuldade)
Utilizado especificamente no `QuestionTable` e `IntegrityTreeMap`:
- **≤ 500 (Base):** Verde Esmeralda (Deve-se acertar).
- **501 - 700 (Médio):** Amarelo (Zona de transição).
- **> 700 (Difícil):** Ciano (Diferencial).
- **Anulada:** Cinza Escuro.

## 2. Tipografia Hierárquica

Três famílias tipográficas distintas organizam a informação:

1.  **ORBITRON (Display / Títulos):**
    - Uso: Cabeçalhos, KPIs gigantes, Identificadores de Seção (`SECTION://`).
    - Vibe: Futurista, estrutural.

2.  **RAJDHANI (UI / Texto):**
    - Uso: Parágrafos, descrições, botões.
    - Vibe: Técnica, condensada (ótima para alta densidade).

3.  **JETBRAINS MONO (Dados / Código):**
    - Uso: Tabelas, Eixos de gráficos, Logs (`LOG_ID`), Tags.
    - Vibe: Engenharia, precisão, imutabilidade.

## 3. Diretrizes de Componentes

- **Glassmorphism Tático:** Uso de `backdrop-blur-md` apenas em elementos flutuantes (Tooltips, Header Fixo) para manter o contexto do fundo visível.
- **Bordas de Neon:** Elementos ativos ou críticos recebem `box-shadow` colorido (Glow) para atrair o olho.
- **Micro-Interações:**
    - *Hover:* Revela detalhes adicionais (ex: Tooltips na redação).
    - *Load:* Barras de progresso com animação fluida (`transition-all duration-1000`).

## 4. Layout Responsivo (Mobile Intelligence)

- **Densidade Adaptativa:**
    - *Desktop:* Tabelas completas, Gráficos lado a lado.
    - *Mobile:* Tabelas viram Cards, Gráficos empilham, Menus viram Drawers.
- **Touch Targets:** Áreas de toque aumentadas em mobile (44px min) sem perder a estética compacta.


# Sistema de Design: *Cyberpunk Analyst*

O **ENEM Analytics 2026** emprega uma linguagem visual de alto contraste e densidade informacional, inspirada em terminais *sci-fi*. O escopo transcende a estética, visando o **foco cognitivo**: em um fundo obscuro, apenas dados vitais emitem luminescência.

## 1. Paleta Cromática Semântica

O sistema opera exclusivamente em *Deep Dark Mode*. As cores atuam como indicadores estritos de *status*.

### Interface (UI)
- **Void Black (#050505):** Fundo principal; mitiga a fadiga visual.
- **Tech Gray (#0f0f11):** Fundo de cartões e módulos.
- **Muted Text (#a3a3a3):** Metadados, rótulos e eixos.

### Visualização de Dados (*Data Viz*)
- **Accent Emerald (#00ff9f):** Êxito, crescimento, nível seguro.
- **Cyber Cyan (#00f3ff):** Dados técnicos, projeções, estabilidade.
- **Warning Yellow (#f3e600):** Alerta, vícios linguísticos.
- **Critical Pink (#ff0055):** Falha, nível crítico, desvio gramatical.

### Codificação TRI (Dificuldade)
Aplicada no `QuestionTable` e `IntegrityTreeMap`:
- **≤ 500 (Base):** Verde Esmeralda (acerto mandatório).
- **501 - 700 (Médio):** Amarelo (transição).
- **> 700 (Difícil):** Ciano (diferencial).
- **Anulada:** Cinza Escuro.

## 2. Tipografia Hierárquica

A informação é estruturada por três famílias tipográficas:

1. **Orbitron (*Display* / Títulos):**
   - **Uso:** Cabeçalhos, KPIs, identificadores de seção.
   - **Caráter:** Futurista e estrutural.

2. **Rajdhani (UI / Texto):**
   - **Uso:** Parágrafos, descrições, botões.
   - **Caráter:** Técnico e condensado (ideal para alta densidade).

3. **JetBrains Mono (Dados / Código):**
   - **Uso:** Tabelas, eixos, *logs*, *tags*.
   - **Caráter:** Engenharia, precisão e imutabilidade.

## 3. Diretrizes de Componentes

- ***Glassmorphism* Tático:** Emprego de `backdrop-blur-md` restrito a elementos flutuantes (*tooltips*, cabeçalhos fixos).
- **Bordas Neon:** Elementos ativos ou críticos recebem *glow* (`box-shadow` colorido) para direcionamento focal.
- **Microinterações:**
  - ***Hover*:** Exposição de detalhes adicionais.
  - ***Load*:** Barras de progresso com animação fluida.

## 4. Layout Responsivo (*Mobile Intelligence*)

- **Densidade Adaptativa:**
  - *Desktop:* Tabelas integrais e gráficos dispostos lateralmente.
  - *Mobile:* Conversão de tabelas em *cards*, empilhamento de gráficos e menus em *drawers*.
- **Alvos de Toque:** Áreas interativas expandidas em dispositivos móveis (mínimo de 44px), preservando a estética compacta.

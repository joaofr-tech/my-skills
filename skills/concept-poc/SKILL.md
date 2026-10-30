---
name: concept-poc
description: Use when o usuário perguntar como testar uma ideia ou ferramenta na prática, pedir para validar uma discussão ou post técnico, ou quiser uma Prova de Conceito (POC) guiada gerando um guia.html interativo passo a passo para ele mesmo codificar e validar.
---

# Concept POC Lab

Skill para transformar qualquer conceito técnico, ferramenta ou debate em uma Prova de Conceito (POC) guiada, onde **o usuário coloca a mão na massa**.

## Regra de Ouro: O Agente Gera o Guia, o Usuário Codifica

> [!IMPORTANT]
> **O agente NÃO deve criar os arquivos de código da aplicação diretamente no projeto.**
> O papel do agente é planejar a POC mínima, desenhar a arquitetura e gerar um arquivo **`guia.html`** interativo e autocontido no diretório da POC.
> O usuário é o protagonista: ele abrirá o `guia.html`, lerá as explicações, criará os arquivos, copiará/escreverá o código e rodará os comandos.

---

## Diretrizes Fundamentais

1. **Hipótese Central Objetiva:** Toda POC deve responder a uma única pergunta clara (ex: *"Como funciona a instrumentação do New Relic com Node.js?"*, *"X funciona com Y?"*, *"Qual a diferença prática de performance entre A e B?"*).
2. **Mínimo Absoluto:** Corte tudo o que for secundário (sem layouts elaborados, sem autenticação desnecessária, sem validações complexas). Apenas o estritamente necessário para comprovar a hipótese.
3. **Setup Zero Fricção:** Priorize o menor número de dependências e a forma mais rápida de rodar localmente (ex: Docker, scripts diretos, CLI padrão).
4. **Isolamento e Limpeza:** A POC deve ser fácil de iniciar, validar e descartar sem poluir o sistema operacional do usuário.

---

## Requisitos do `guia.html`

O `guia.html` deve ser gerado pelo agente diretamente no diretório do projeto. Ele precisa ser **100% autocontido** (CSS e JavaScript embutidos, sem dependências externas de CDN obrigatórias para funcionar perfeitamente offline).

### Padrão Visual e Funcionalidades
- **Design moderno e legível:** Tema escuro ou neutro dev-friendly, tipografia limpa, alto contraste para blocos de código.
- **Checklists Interativos:** Passos com checkboxes (`<input type="checkbox">`) para que o usuário marque o progresso à medida que cria os arquivos. Use `localStorage` simples para salvar o estado caso o usuário recarregue a página.
- **Botões "Copiar":** Cada bloco de código e comando de terminal deve ter um botão de cópia com 1 clique (via `navigator.clipboard.writeText`).
- **Feedback visual:** Notificação sutil ao copiar código ou ao concluir todos os passos da POC.

### Seções Obrigatórias do `guia.html`

1. **Cabeçalho & Hipótese:**
   - Título da POC.
   - A hipótese/pergunta formulada em 1 a 2 frases claras.
   - Tempo estimado de execução (ex: "⏱ 10 a 15 minutos").
2. **Pré-requisitos:**
   - Softwares necessários instalados (ex: Docker, Node.js, Python) e comandos para checar versão.
3. **Estrutura de Arquivos:**
   - A árvore de pastas mínima que o usuário irá montar.
4. **Passo a Passo Guiado (Mão na Massa):**
   - Dividido em etapas lógicas e numeradas.
   - Cada passo indica o arquivo a ser criado/editado.
   - Bloco de código completo, pronto e comentado com explicações dos pontos críticos.
5. **Comandos de Execução:**
   - Comandos exatos de terminal para iniciar serviços, subir containers ou rodar o script.
6. **Validação & Teste de Sucesso:**
   - Como o usuário valida que a POC funcionou (chamada `curl`, abrir `http://localhost:...`, log esperado no terminal, etc.).
   - Critério de aceite explícito: "Se você vir [X], a hipótese está validada."
7. **Solução de Problemas (Troubleshooting):**
   - 2 ou 3 erros comuns previsíveis e a solução direta.
8. **Teardown / Limpeza:**
   - Comandos para parar e limpar containers, portas ocupadas ou arquivos temporários.

---

## Fluxo de Execução do Agente

Quando o usuário solicitar uma POC ou validação técnica:

1. **Definir a Hipótese:** Formular com clareza o que está sendo testado.
2. **Elaborar o Código e os Passos Mentalmente:** Planejar a POC enxuta e funcional.
3. **Gerar o `guia.html`:** Escrever o arquivo `guia.html` no diretório de trabalho do projeto.
4. **Responder no Chat com Brevidade:**
   - Apresentar a hipótese formulada.
   - Avisar que o `guia.html` foi criado no diretório.
   - Fornecer o link para o arquivo local (`[guia.html](file:///...)`).
   - Indicar o comando rápido de abertura (ex: `Start-Process guia.html` no Windows ou `open guia.html` no macOS/Linux).
   - Lembrar o usuário de que você está à disposição para tirar dúvidas ou ajudar caso ele encontre algum imprevisto enquanto segue o guia.

---

## O que NÃO Fazer (Red Flags)

| Anti-Padrão | Correção |
|---|---|
| Agente criar os arquivos de código (`index.js`, `Dockerfile`, etc.) no workspace | **Não crie.** Forneça os códigos dentro do `guia.html` para o usuário criá-los. |
| Depender de fontes/scripts externos via CDN no `guia.html` | Mantenha todo CSS e JS embutidos (inline). |
| Criar POC complexa com autenticação, banco com migrações completas, etc. | Reduza ao mínimo absoluto que comprove a hipótese. |
| Não incluir como validar o resultado esperado | Sempre inclua o teste exato e o resultado esperado no guia. |

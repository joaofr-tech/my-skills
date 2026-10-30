# 🧠 Personal Agent Skills

Coleção de skills autorais para agentes de IA (**Google Antigravity**, **Gemini CLI**, **Cursor**, **Claude Code**, **Cline** e ferramentas compatíveis com o padrão de agent skills).

---

## 📦 Skills Disponíveis

### 1. [`concept-poc`](./skills/concept-poc/SKILL.md)
> **Laboratório de Provas de Conceito Guiadas (Hands-on)**
* Transforma qualquer ideia, debate técnico ou ferramenta em uma Prova de Conceito (POC) mínima e funcional.
* **Princípio central:** O agente não implementa o código no seu lugar; ele arquiteta a solução e gera um arquivo `guia.html` interativo, autocontido e offline para você mesmo colocar a mão na massa, entender os fundamentos e validar a hipótese técnica.

### 2. [`custom-presentation-template`](./skills/custom-presentation-template/SKILL.md)
> **Gerador Determinístico de Apresentações PowerPoint (.pptx)**
* Transforma textos e briefings em apresentações profissionais em formato widescreen (16:9 - 20x11.25"), fundo marfim (`#FFFBF4`), tipografia moderna (Open Sauce / DM Sans) e stickers vetoriais 2D.
* Possui cálculo preditivo de altura e quebras de linha para evitar qualquer sobreposição de títulos, subtítulos e cartões de conteúdo.

### 3. [`local-first-architecture`](./skills/local-first-architecture/SKILL.md)
> **Arquitetura Serverless e Offline-First para Web Apps**
* Padrão arquitetural para aplicações web que persistem 100% dos dados na máquina do usuário sem precisar de banco de dados ou backend.
* Utiliza armazenamento híbrido: `LocalStorage` para estados/JSONs e `IndexedDB` para arquivos binários pesados (PDFs, imagens).
* Inclui rotinas prontas de backup (`.json` bundling) com exportação e importação resilientes.

---

## 🚀 Como Instalar e Utilizar

### Método 1: Via Skills CLI (`npx skills`)

Se você utiliza o gerenciador universal de skills:

```bash
# Instalar uma skill específica
npx skills add <seu-usuario-github>/my-skills --skill concept-poc

# Ou instalar todas as skills
npx skills add <seu-usuario-github>/my-skills
```

---

### Método 2: Instalação Manual

Basta clonar este repositório ou copiar a pasta da skill desejada para o diretório de configuração do seu assistente:

* **Google Antigravity / Gemini CLI:**
  ```bash
  # Copie para a pasta de customizações globais
  cp -r skills/* ~/.gemini/config/skills/
  ```

* **Hub Universal (`~/.agents`):**
  ```bash
  cp -r skills/* ~/.agents/skills/
  ```

* **Cursor:**
  ```bash
  cp -r skills/* .cursor/skills/
  ```

* **Claude Code:**
  ```bash
  cp -r skills/* ~/.claude/skills/
  ```

---

## 📄 Licença

Este repositório está sob a licença [MIT](./LICENSE).

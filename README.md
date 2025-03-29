![header](https://capsule-render.vercel.app/api?type=waving&color=auto&height=300&section=header&text=Keeggo&fontSize=90&animation=fadeIn&fontAlignY=40)

# 🚀 Cypress + Cucumber | Testes Funcionais Web & API

Este repositório contém a automação de testes desenvolvida com **Cypress**, utilizando o **Cucumber (Gherkin)** para escrita dos cenários, seguindo boas práticas como:  
- Reutilização de código com **Custom Commands**  
- **Page Objects** e helpers  
- Separação de contextos Web e API  
- Cobertura de testes de sucesso e falha  

---

## 📁 Estrutura do Projeto

```bash
.
├── cypress
│   ├── e2e
│   │   ├── api
│   │   │   ├── getProductsApi.feature
│   │   │   └── postLoginApi.feature
│   │   └── web
│   │       ├── carrinho
│   │       │   └── adicionarProduto.feature
│   │       └── checkout
│   │           └── checkout.feature
│   ├── support
│   │   ├── commands.js
│   │   ├── helpers
│   │   │   ├── carrinhoUtils.js
│   │   │   ├── formUtils.js
│   │   │   └── authUtils.js
│   │   └── step_definitions
│   │       ├── api
│   │           ├── getProductsApi.js
│   │       │   └── postLoginApi.js
│   │       ├── web
│   │       │   ├── carrinho
│   │       │   └── checkout
│   │       └── hooks.js
├── cypress.config.js
├── package.json
└── README.md
```

---

## 🚀 Como rodar o projeto

### 📦 Pré-requisitos

- Node.js (recomendado: versão LTS)
- npm
- Git

### 🔧 Instalação

```bash
git clone https://github.com/SEU GITHUB/qa-commerce-keeggo-test.git
cd nome-do-repo
npm install
```

---

## 🧪 Executando os testes

### 🔹 Interface interativa (Cypress UI)

```bash
npx cypress open
```

### 🔹 Linha de comando (headless)

```bash
npx cypress run
```

### 🔹 Rodar testes por tag

Exemplo: rodar apenas os testes de API

```bash
npx cypress run --env TAGS="@api"
```

Você pode combinar tags usando:
```bash
--env TAGS="@api and @post"
--env TAGS="@web and not @erro"
```

---

## 🧩 Plugins e Ferramentas Utilizadas

- [Cypress](https://www.cypress.io/)
- [@badeball/cypress-cucumber-preprocessor](https://github.com/badeball/cypress-cucumber-preprocessor)
- [cypress-plugin-api](https://github.com/filiphric/cypress-plugin-api)
- [esbuild](https://esbuild.github.io/)

---

## ✅ Testes Web

- 🛒 **Carrinho**  
  - Adicionar produto único ou múltiplos  
  - Carrinho vazio  
  - Validação de totais, contador e paginação

- 💳 **Checkout**  
  - Finalização de pedido com sucesso  
  - Validação de mensagens de erro e campos obrigatórios

---

## 🔁 Testes API

- 📦 **GET /api/produtos**  
  - Listar produtos  
  - Validação dos campos retornados  
  - Validação de estrutura da resposta

- 🔐 **POST /api/login**  
  - Login com sucesso  
  - Login com erro (credenciais inválidas)  
  - Testes de validação (campos ausentes, dados inválidos)

---

## 🛠️ Boas Práticas Aplicadas

- Estrutura modular por contexto (Web / API)
- Reutilização com custom commands
- Helpers utilitários para formulários, carrinho e autenticação
- Testes negativos e positivos
- Uso de `DocString` para bodies dinâmicos em APIs
- Hooks de limpeza no carrinho

---

## ✍️ Autor

Carlos Vinicius  

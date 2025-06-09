# 🌍 WorldWise

**WorldWise** é uma aplicação web construída com **React** e **Vite**, que permite selecionar cidades em um mapa, adicionar comentários e registrar datas de visita. Ideal para registrar e revisitar suas memórias de viagem pelo mundo!
Conta também com um sistema simples de **login fictício** para simular a autenticação de usuários.

## 🚀 Tecnologias Utilizadas

* [React 19](https://react.dev/)
* [Vite](https://vitejs.dev/)
* [React Router DOM v7](https://reactrouter.com/)
* [Leaflet](https://leafletjs.com/) & [React-Leaflet](https://react-leaflet.js.org/)
* [JSON Server](https://github.com/typicode/json-server) (para simular uma API REST)
* [ESLint](https://eslint.org/) (para linting de código)

## 📸 Funcionalidades

* 🗺️ Visualização de mapa interativo com Leaflet
* 📍 Seleção de cidades diretamente no mapa
* 📝 Adição de comentários personalizados para cada cidade
* 📅 Registro da data da visita
* 🔐 Login fictício para simular autenticação

## 📦 Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/worldwise.git
cd worldwise

# Instale as dependências
npm install
```

## 🧪 Modo de Desenvolvimento

Você pode iniciar o frontend e o backend falso (JSON Server) ao mesmo tempo com o comando:

```bash
npm run dev
```

Se preferir iniciar apenas o servidor da API fake:

```bash
npm run server
```

## 🏗️ Build para Produção

```bash
npm run build
```

Para visualizar o build:

```bash
npm run preview
```

## 📁 Estrutura Básica

```
src/
├── components/       # Componentes reutilizáveis
├── data/             # Base de dados local (JSON Server)
│   └── cities.json
├── pages/            # Páginas principais da aplicação
├── App.jsx           # Componente principal
├── main.jsx          # Ponto de entrada da aplicação
```

## 🔒 Login Fictício

O sistema de login é apenas uma simulação e **não possui autenticação real**. Serve apenas para demonstrar rotas protegidas e experiência do usuário logado.

## 🧹 Lint

Para verificar o lint do projeto:

```bash
npm run lint
```

## 📌 Observações

* A aplicação utiliza **JSON Server** para simular um backend. Os dados de cidades são persistidos no arquivo `src/data/cities.json`.
* O mapa é renderizado utilizando o Leaflet, com pontos de marcação representando as cidades selecionadas.

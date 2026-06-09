🚀 MetaManager

Sistema web para gerenciamento e acompanhamento de metas pessoais, permitindo que usuários organizem atividades, monitorem progresso diário e desenvolvam consistência ao longo do tempo.

📌 Sobre o Projeto

O MetaManager é uma aplicação web criada para ajudar pessoas a organizarem e acompanharem suas metas pessoais.

A plataforma permite que os usuários registrem metas importantes, acompanhem seu progresso diário e visualizem sua evolução ao longo do tempo.

O sistema também incentiva a criação de hábitos positivos, utilizando o conceito de streaks, que representam sequências de dias consecutivos em que uma meta é cumprida.

Este projeto também tem como objetivo aplicar boas práticas de desenvolvimento de software, utilizando arquitetura organizada e tecnologias modernas utilizadas no mercado.

✨ Funcionalidades

✅ Criar metas pessoais

✏️ Editar metas existentes

🗑 Excluir metas

📅 Marcar metas como concluídas diariamente

🔥 Acompanhar streaks (sequência de dias consecutivos)

📊 Visualizar progresso semanal e mensal

📈 Relatórios simples de consistência

🏗 Arquitetura
Frontend – Feature-Sliced Design (FSD)

O frontend utiliza Feature-Sliced Design, uma arquitetura que organiza o projeto por funcionalidades, tornando o código mais escalável e fácil de manter.

Estrutura principal:

src
 ├── app
 ├── pages
 ├── widgets
 ├── features
 ├── entities
 └── shared
Backend – Arquitetura em Camadas

O backend segue uma arquitetura em camadas para separar responsabilidades:

Controllers → recebem as requisições da aplicação

Services → contêm as regras de negócio

Repositories → realizam o acesso ao banco de dados

Essa estrutura facilita manutenção, testes e evolução do sistema.

🛠 Tecnologias Utilizadas
Frontend

React.js

Next.js

TypeScript

React Query

TailwindCSS

Backend

Node.js

TypeScript

⚙️ Como Rodar o Projeto
1️⃣ Clonar o repositório
git clone https://github.com/seu-usuario/metamanager.git
2️⃣ Entrar na pasta do projeto
cd metamanager
3️⃣ Instalar dependências
npm install
4️⃣ Rodar o projeto
npm run dev

# MetaManager integrado

Projeto integrado com frontend React/Vite e backend Node/Express/PostgreSQL.

## Como rodar

### 1. Banco de dados
Crie o banco `MetaManager` no PostgreSQL e execute o script:

```bash
psql -U postgres -d MetaManager -f backend/src/db/init.sql
```

O script também cria o usuário de teste:

- Usuário: `MetaManagerAdmin`
- Senha: `Password12@`

### 2. Backend

```bash
cd backend
cp .env.example .env
# ajuste a senha do PostgreSQL no .env
npm install
npm start
```

Backend: `http://localhost:3000`

### 3. Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend: `http://localhost:5173`

## Principais ajustes feitos

- Integração do login do frontend com `POST /api/auth/login`.
- Integração das metas com o backend: listar, criar, editar, excluir e concluir.
- Separação correta das rotas do backend em `/api/auth`, `/api/goals` e `/api/users`.
- Correção do bug em que `completed` sempre voltava `false`.
- Correção do `findByUserId`, que era chamado no login mas não existia no repositório.
- Adição de CORS para permitir o frontend acessar o backend localmente.
- Ajuste do build do frontend.

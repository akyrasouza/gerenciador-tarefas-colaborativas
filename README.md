# Plataforma de Tarefas Colaborativas

## Visão Geral
A Plataforma de Tarefas Colaborativas é uma aplicação web projetada para facilitar o gerenciamento de tarefas entre usuários. Ela permite que os usuários se registrem, façam login, criem, editem e gerenciem tarefas de forma colaborativa. A aplicação é construída usando React.js para o frontend e Node.js com Express para o backend, com PostgreSQL como banco de dados para persistência de dados.

## Estrutura do Projeto
O projeto está organizado em dois diretórios principais: 
  - Pasta `frontend/` contendo todos os arquivos do React
  - Pasta `backend/` contendo os arquivos do servidor Node.js e conexão com PostgreSQL

### Frontend
- **Tecnologias**: React.js
- **components / Componentes**:
  - `Dashboard.jsx`: Exibe a lista de tarefas.
  - `LoginForm.jsx`: Lida com o login do usuário.
  - `Register.jsx`: Lida com o registro de usuários.
  - `TaskForm.jsx`: Permite aos usuários criar ou editar tarefas.
  - `Dashboard.jsx`: Exibe todas as tarefas.
- **contexts / Contexto**: 
  - `AuthContext.jsx`: Fornece estado de autenticação e funções para os componentes.
- **services / Serviços**:
  - `api.js`: Funções para fazer chamadas de API para o backend.
- **styles / Estilos**: 
  -  Contém estilos para a aplicação React.

### Backend
- **Tecnologias**: Node.js, Express, PostgreSQL
- **controllers / Controladores**:
  - `taskController.js`: Funções para gerenciamento de tarefas (criar, editar, excluir).
  - `userController.js`: Funções para gerenciamento de usuários (recuperar informações do usuário).
- **routes / Rotas**:
  - `taskRoutes.js`: Rotas relacionadas ao gerenciamento de tarefas.
  - `userRoutes.js`: Rotas relacionadas ao gerenciamento de usuários.
- **Serviços**:
  - `db.js`: Gerencia a conexão com o banco de dados e consultas ao PostgreSQL.
- **Arquivos Principais**:
  - `index.js`: Inicializa a aplicação Express e configura o middleware.
  -  Inicia o servidor e escuta por requisições recebidas.

 
  # Iniciando Projeto:

   ## Configure o backend:
   1. Acessar pasta
  - Navegue até o diretório `backend`.
  - Instale as dependências:
  ```
     cd backend
     npm install
     ```
  1.1 **Abra o PostgreSQL**:
  - Crie o banco de dados `taskdb` e execute os scripts SQL para criar as tabelas `users` e `tasks`.

  **Tabela users**
```sql
       CREATE TABLE users (
       id SERIAL PRIMARY KEY,
       name VARCHAR(100),
       email VARCHAR(100) UNIQUE NOT NULL,
       password VARCHAR(100) NOT NULL
     );
```
  **Tabela tasks**
  ```sql
      -- Criar o tipo ENUM
    CREATE TYPE task_status AS ENUM    ('pendente', 'fazendo', 'concluido');

    -- Criar a tabela tasks com status como ENUM
      CREATE TABLE tasks (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      status task_status DEFAULT 'pendente',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
  ```
 1.2 **Execute o servidor:**
   ```
     node index.js
   ```
## Configure o Fontend:
1. Acessar pasta
   - Navegue até o diretório `frontend`.
   - Instale as dependências:
```
     cd frontend
     npm install
  ```
2.Executar aplicação frontend
```
     npm run dev
  ```
3.Acesse a aplicação em: 
```
     http://localhost:<número-da-porta>
  ```
import pg from 'pg';
const { Pool } = pg;

//Configuração do Banco de Dados
export const pool = new Pool({
  user: 'postgres', //seu usuário do Postgres
  password: 'password', //senha do usuário postgres
  host: 'localhost',
  port: 5432,
  database: 'taskdb'//banco criado no Postgres
});

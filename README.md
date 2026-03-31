# App

GymPass app.

## RFs (Requisitos funcionais)

- [x] Deve ser possível se cadastrar;
- [x] Deve ser possível se autenticar;
- [x] Deve ser possível obter o perfil de um usuário logado;
- [x] Deve ser possível obter o número de check-ins realizados pelo usuário logado;
- [x] Deve ser possível o usuário obter o seu histórico de check-ins;
- [x] Deve ser possível o usuário buscar academias próximas;
- [x] Deve ser possível o usuário buscar academias pelo nome;
- [x] Deve ser possível o usuário realizar check-in em uma academia;
- [x] Deve ser possível validar o check-in de um usuário;
- [x] Deve ser possível cadastrar uma academia;

## RNs (Regras de negócio)

- [x] O usuário não deve poder se cadastrar com um e-mail duplicado;
- [x] O usuário não pode fazer 2 check-ins no mesmo dia;
- [x] O usuário não pode fazer check-in se não estiver perto (100m) da academia;
- [x] O check-in só pode ser validado até 20 minutos após ser criado;
- [x] O check-in só pode ser validado por administradores;
- [x] A academia só pode ser cadastrada por administradores;

## RNFs (Requisitos não-funcionais)

- [x] A senha do usuário precisa estar criptografada;
- [x] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [x] Todas listas de dados precisam estar paginadas com 20 itens por página;
- [x] O usuário deve ser identificado por um JWT (JSON Web Token);

## Visão geral

API inspirada no GymPass para gestão de academias e check-ins de usuários. O sistema permite cadastro e autenticação de usuários, cadastro de academias, busca por academias (por nome e por proximidade) e fluxo de check-in com validação por administradores.

## Tecnologias e ferramentas

- Node.js
- TypeScript
- Fastify (HTTP server e rotas)
- Prisma ORM
- PostgreSQL
- Zod (validação de dados)
- JWT com `@fastify/jwt` (auth + refresh token)
- `@fastify/cookie` (cookies)
- `bcryptjs` (hash de senha)
- `dayjs` (datas/tempo)
- Vitest + Supertest (testes unitários e e2e)
- TSX (dev server)
- Tsup (build)
- ESLint (padrões de código)

## Arquitetura

- **Camadas bem separadas**: `http/controllers` (camada HTTP), `use-cases` (regras de negócio), `repositories` (acesso a dados).
- **Inversão de dependência**: use-cases dependem de interfaces de repositório. Implementações concretas existem em `repositories/prisma` e `repositories/in-memory` (para testes).
- **Factories**: em `use-cases/factories`, centralizam a composição das dependências.
- **Validação**: entradas são validadas com Zod nos controllers.
- **Auth**: JWT com token curto e refresh token via cookie.
- **Tratamento de erros**: handler global em `src/app.ts`.

## Estrutura de pastas (resumo)

- `src/http`: rotas, controllers e middlewares
- `src/use-cases`: regras de negócio
- `src/repositories`: interfaces e implementações (Prisma / in-memory)
- `prisma`: schema e migrations

## Endpoints principais

- `POST /users` cadastro de usuário
- `POST /sessions` autenticação e emissão de tokens
- `PATCH /token/refresh` renovação do token via refresh cookie
- `GET /profile` perfil do usuário autenticado
- `POST /gyms` cadastro de academia (admin)
- `GET /gyms/search` busca por nome
- `GET /gyms/nearby` busca por proximidade
- `POST /gyms/:gymId/check-ins` check-in em uma academia
- `GET /check-ins/history` histórico de check-ins
- `GET /check-ins/metrics` métricas (quantidade de check-ins)
- `PATCH /check-ins/:checkInId/validate` validação de check-in (admin)

## Como rodar o projeto

1. Instale as dependências com `npm install`.

2. Configure as variáveis de ambiente: copie `.env.example` para `.env` e preencha `DATABASE_URL` e `JWT_SECRET`.

3. Suba o banco PostgreSQL (opcional via Docker) com `docker-compose up -d`.

4. Rode as migrations do Prisma com `npx prisma migrate dev`.

5. Inicie a aplicação em modo desenvolvimento com `npm run dev`.

O servidor sobe por padrão em `http://localhost:3333`.

## Build e produção

- Build: `npm run build`
- Start (após build): `npm run start`

## Testes

- Unitários: `npm run test`
- E2E: `npm run test:e2e`
- Coverage: `npm run test:coverage`
- Watch: `npm run test:watch`

## CI

O pipeline de CI roda no GitHub Actions com dois workflows:
- **Push**: roda testes unitários com Node `22.12.0`, `npm ci` e `npm run test`.
- **Pull Request**: roda testes E2E com Node `22.12.0`, `npm ci` e `npm run test:e2e`, usando Postgres via service.

Workflows:
- `.github/workflows/run-unit-tests.yml`
- `.github/workflows/run-e2e-tests.yml`

## Observações

- O refresh token é armazenado em cookie `httpOnly`.
- Endpoints de criação/validação exigem role `ADMIN`.

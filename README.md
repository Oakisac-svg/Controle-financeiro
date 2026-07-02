# FinMb

SaaS de organização financeira pessoal com dashboard, lançamentos, metas e o assistente contextual FinBot.

## Requisitos

- Node.js 20 ou superior
- Um projeto Supabase

## Configuração

1. Copie `.env.example` para `.env.local`.
2. Preencha `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
3. Execute o arquivo único [`src/config/database.sql`](src/config/database.sql) no SQL Editor do Supabase. Ele funciona tanto em uma base nova quanto sobre o schema anterior do FinMb.
4. Instale e inicie o projeto:

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

## Scripts

```bash
npm run dev    # servidor de desenvolvimento
npm run lint   # ESLint
npm run build  # build de produção e TypeScript
npm run start  # servidor do build de produção
```

## Estrutura

- `src/app`: rotas do App Router
- `src/components`: componentes reutilizáveis e autenticação
- `src/context`: sessão e tema
- `src/hooks`: operações de transações, metas e toasts
- `src/lib`: cliente Supabase e cálculos financeiros
- `src/config/database.sql`: schema e políticas RLS

O frontend usa somente a chave pública anônima. Nunca adicione uma `SUPABASE_SERVICE_ROLE_KEY` a variáveis `NEXT_PUBLIC_*`.

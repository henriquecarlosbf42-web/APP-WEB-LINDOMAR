# Lindomar Funilaria & Pintura — Orçamento Online

SaaS para recebimento de orçamentos de **funilaria, pintura, polimento e
pintura de rodas**. O cliente preenche um formulário multi-etapas (dados do
veículo, tipo de serviço, fotos, dados de contato) e o pedido cai direto num
painel administrativo, com opção de responder pelo WhatsApp.

## Stack

- [Next.js](https://nextjs.org) (App Router) + TypeScript
- Tailwind CSS
- [Prisma](https://www.prisma.io) + SQLite (banco de dados local em arquivo)
- [Zod](https://zod.dev) para validação dos formulários

## Funcionalidades

- **Formulário multi-etapas** (`/orcamento`): o cliente avança clicando em
  "Continuar", uma etapa por vez:
  1. Dados do veículo (marca, modelo, ano, cor, placa)
  2. Tipo de serviço (funilaria, pintura, polimento, pintura de rodas, etc.)
  3. Fotos do veículo (opcional)
  4. Dados de contato (nome, WhatsApp, e-mail, cidade)
  5. Revisão e envio
- Ao final, o cliente recebe a opção de confirmar também via WhatsApp.
- **Painel administrativo** (`/admin`, protegido por senha): lista os
  orçamentos recebidos, permite filtrar por status e atualizar o andamento
  de cada um (Novo, Em análise, Respondido, Aprovado, Recusado), além de um
  atalho para responder o cliente direto no WhatsApp.

## Como rodar localmente

1. Instale as dependências:

   ```bash
   npm install
   ```

2. Copie o arquivo de variáveis de ambiente e ajuste os valores:

   ```bash
   cp .env.example .env
   ```

   - `ADMIN_PASSWORD`: senha de acesso ao painel `/admin`.
   - `NEXT_PUBLIC_WHATSAPP_NUMBER`: número de WhatsApp da oficina (DDI + DDD
     + número, apenas dígitos) usado no botão de confirmação do cliente.

3. Crie o banco de dados (SQLite) e aplique as migrations:

   ```bash
   npx prisma migrate deploy
   ```

4. Rode o servidor de desenvolvimento:

   ```bash
   npm run dev
   ```

5. Acesse:
   - `http://localhost:3000` — site institucional
   - `http://localhost:3000/orcamento` — formulário de orçamento
   - `http://localhost:3000/admin` — painel administrativo

## Build de produção

```bash
npm run build
npm run start
```

## Hospedagem

Este projeto grava dados em um arquivo SQLite (`dev.db`) e as fotos enviadas
pelos clientes em `public/uploads/`. Isso funciona muito bem em um servidor
tradicional (VPS, Docker, Railway, Render etc.) rodando `npm run start`, mas
**não é compatível com deploys serverless "read-only"** (como a Vercel no
plano padrão), pois o sistema de arquivos não é persistente nesses ambientes.

Para hospedar em plataformas serverless, será necessário trocar:
- O SQLite por um banco gerenciado (Postgres, MySQL etc.) — basta trocar o
  `provider` em `prisma/schema.prisma` e o adapter em `lib/prisma.ts`.
- O upload de fotos em disco por um serviço de armazenamento de objetos
  (S3, Cloudflare R2, Vercel Blob etc.) em `app/api/upload/route.ts`.

## Estrutura principal

```
app/
  page.tsx                 landing page
  orcamento/page.tsx        formulário multi-etapas
  admin/                    painel administrativo (protegido por senha)
  api/orcamentos/           API para criar/listar orçamentos
  api/upload/                API para upload de fotos
components/
  wizard/                   etapas do formulário multi-etapas
  admin/                    painel de orçamentos
lib/
  quote.ts                  schema de validação (zod) e constantes
  prisma.ts                 client do Prisma
  auth.ts                   autenticação simples do painel admin
prisma/schema.prisma         modelo de dados
```

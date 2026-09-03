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

Este projeto grava dados em um arquivo SQLite e as fotos enviadas pelos
clientes em disco (pasta controlada pela variável `UPLOADS_DIR`). Isso
funciona muito bem em um servidor tradicional com disco persistente (VPS,
Docker, Railway, Render etc.) rodando `npm run start`, mas **não é
compatível com deploys serverless "read-only"** (como a Vercel no plano
padrão), pois o sistema de arquivos não é persistente nesses ambientes.

### Deploy no Render (recomendado, já configurado)

O repositório já inclui um `render.yaml` pronto:

1. Crie uma conta em [render.com](https://render.com) e conecte sua conta do
   GitHub.
2. No painel do Render, clique em **New → Blueprint** e selecione este
   repositório. O Render vai detectar o `render.yaml` automaticamente
   (branch `claude/saas-orcamento-funilaria-3zfdhj`).
3. Quando pedir, preencha as variáveis de ambiente:
   - `ADMIN_PASSWORD` — senha do painel `/admin`.
   - `NEXT_PUBLIC_WHATSAPP_NUMBER` — número de WhatsApp da oficina (só
     números, com DDI+DDD, ex: `5511999999999`).
4. Clique em **Apply**. O Render cria o serviço web com um disco persistente
   de 1GB montado em `/data` (onde ficam o banco SQLite e as fotos), roda
   `npx prisma migrate deploy` automaticamente antes de iniciar, e publica
   uma URL pública (`https://<nome-do-serviço>.onrender.com`).
5. Todo novo `git push` nessa branch dispara um novo deploy automaticamente.

### Outras plataformas com disco persistente (Railway, VPS, Docker)

Mesma lógica do Render: defina `DATABASE_URL` apontando para um arquivo no
disco persistente (ex: `file:/data/app.db`) e `UPLOADS_DIR` para uma pasta
nesse mesmo disco (ex: `/data/uploads`), rode `npx prisma migrate deploy` no
início do deploy e depois `npm run start`.

### Deploy serverless (Vercel e similares)

Para hospedar em plataformas serverless, será necessário trocar:
- O SQLite por um banco gerenciado (Postgres, MySQL etc.) — basta trocar o
  `provider` em `prisma/schema.prisma` e o adapter em `lib/prisma.ts`.
- O upload de fotos em disco por um serviço de armazenamento de objetos
  (S3, Cloudflare R2, Vercel Blob etc.) em `app/api/upload/route.ts` e
  `app/api/files/[filename]/route.ts`.

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

# Oficina Classe A — Orçamento Online

Site estático para receber orçamentos de **funilaria, pintura, polimento e
pintura de rodas**. O cliente preenche um formulário multi-etapas (dados do
veículo, tipo de serviço, contato) e no final envia tudo direto pelo
**WhatsApp** (ou por e-mail) para a oficina — sem precisar de servidor ou
banco de dados.

## Stack

- [Next.js](https://nextjs.org) (App Router, export estático) + TypeScript
- Tailwind CSS
- [Zod](https://zod.dev) para validação do formulário

## Como funciona

O formulário (`/orcamento`) tem 5 etapas — o cliente vai clicando em
"Continuar":
1. Dados do veículo (marca, modelo, ano, cor, tipo de pintura, placa)
2. Tipo de serviço (funilaria, pintura, polimento, pintura de rodas, etc.)
3. Onde está o problema (diagrama do carro, gravidade, fotos)
4. Dados de contato (nome, WhatsApp, e-mail, cidade, prazo)
5. Revisão do pedido

Na revisão, o cliente escolhe **Enviar pelo WhatsApp** (abre uma conversa já
com a mensagem do orçamento pronta) ou **Enviar por e-mail** (abre o
aplicativo de e-mail com assunto e corpo preenchidos). Como o site é
totalmente estático, é o próprio navegador do cliente que monta e abre essa
mensagem — não existe banco de dados guardando o histórico de pedidos.

## Como rodar localmente

```bash
npm install
cp .env.example .env   # ajuste o nome, WhatsApp e e-mail da oficina
npm run dev
```

Acesse `http://localhost:3000` (site) e `http://localhost:3000/orcamento`
(formulário).

## Publicando no GitHub Pages

O repositório já vem com um workflow pronto em
`.github/workflows/deploy-pages.yml`, que builda o site como export estático
e publica no GitHub Pages a cada push na branch
`claude/saas-orcamento-funilaria-3zfdhj`.

Para ativar (uma vez só):

1. No repositório do GitHub, vá em **Settings → Pages** e em "Build and
   deployment" escolha **Source: GitHub Actions**.
2. Ainda em Settings, vá em **Secrets and variables → Actions → Variables**
   e crie estas "Repository variables":
   - `NEXT_PUBLIC_BUSINESS_NAME` — nome do negócio (ex: `Oficina Classe A`).
   - `NEXT_PUBLIC_WHATSAPP_NUMBER` — WhatsApp da oficina, só números, com
     DDI+DDD (ex: `5511999999999`).
   - `NEXT_PUBLIC_CONTACT_EMAIL` — e-mail da oficina (ex:
     `contato@suaoficina.com.br`).
   - `NEXT_PUBLIC_YOUTUBE_URL` — link do canal do YouTube.
   - `NEXT_PUBLIC_INSTAGRAM_URL` — link do perfil do Instagram.
3. Dê um `git push` nessa branch (ou rode o workflow manualmente em
   **Actions → Deploy para o GitHub Pages → Run workflow**).
4. Em alguns minutos o site fica no ar em
   `https://<seu-usuário>.github.io/APP-WEB-LINDOMAR/`. O link exato aparece
   no resumo da execução do workflow em **Actions**, e também em
   **Settings → Pages**.

Todo novo `git push` nessa branch atualiza o site automaticamente.

### Por que não tem painel administrativo?

Um painel para acompanhar os orçamentos recebidos (com login, status,
histórico) exige um servidor e um banco de dados rodando o tempo todo — o
GitHub Pages só serve arquivos estáticos (HTML/CSS/JS), sem executar nada no
servidor. Por isso aqui o "envio" acontece direto entre o navegador do
cliente e o WhatsApp/e-mail da oficina, sem passar por um servidor
intermediário nem guardar histórico. Se no futuro quiser um painel com
histórico de orçamentos, será necessário hospedar em um serviço com
servidor (Render, Railway, VPS etc.) e adicionar um backend.

## Estrutura principal

```
app/
  page.tsx                 landing page
  orcamento/page.tsx        formulário multi-etapas
components/
  wizard/                   etapas do formulário multi-etapas
lib/
  quote.ts                  schema de validação (zod) e montagem da mensagem
  contact.ts                nome, WhatsApp/e-mail/redes sociais da oficina (via env vars)
  vehicles.ts                marcas, modelos, anos e cores dos veículos
  protocol.ts                gera o número de protocolo do pedido
.github/workflows/
  deploy-pages.yml           build + deploy automático no GitHub Pages
```

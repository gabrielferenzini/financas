# Finanças do Casal — guia de instalação

Este guia coloca o app no ar sem depender do Claude: os dados ficam num banco do Google (Firebase) e o app fica num site gratuito (GitHub Pages). Leva de 30 a 40 minutos, uma vez só. Façam no computador; no fim, instalam no celular.

Custo: zero. O plano gratuito do Firebase (Spark) aguenta com folga o uso de um casal.

Os nomes dos botões podem variar um pouco conforme a versão do site do Firebase e do GitHub.

---

## 1. Criar o projeto no Firebase

1. Acesse **console.firebase.google.com** com a conta Google do Gabriel.
2. Clique em **Criar um projeto** (ou "Adicionar projeto").
3. Nome: `financas-casal`. Continue.
4. Quando perguntar sobre o **Google Analytics**, desative. Clique em **Criar projeto**.

## 2. Registrar o app e copiar a configuração

1. Na página inicial do projeto, clique no ícone **Web** (`</>`).
2. Apelido do app: `Finanças`. **Não** marque "Firebase Hosting". Clique em **Registrar app**.
3. Vai aparecer um bloco de código com `const firebaseConfig = { apiKey: "...", authDomain: "...", ... }`.
4. Abra o arquivo **firebase-config.js** (que veio no .zip) num editor de texto (Bloco de Notas serve) e troque cada `COLE_AQUI` pelo valor correspondente desse bloco. Mantenha as aspas. Salve.

Esses valores só identificam o projeto; não são senha. Quem protege os dados são as regras da seção 4.

## 3. Ativar o login e cadastrar vocês dois

1. No menu da esquerda: **Criação › Authentication** (ou "Autenticação"). Clique em **Vamos começar**.
2. Aba **Método de login** › **E-mail/senha** › ative a primeira opção › **Salvar**.
3. Aba **Usuários** › **Adicionar usuário**:
   - e-mail do Gabriel + uma senha (mínimo 6 caracteres);
   - repita para o e-mail da Ana Luiza.

Cada um usa esse e-mail e essa senha para entrar no app. Para trocar a senha depois, use "Esqueci a senha" na tela de login.

## 4. Criar o banco de dados e proteger

1. No menu: **Criação › Firestore Database** › **Criar banco de dados**.
2. Local: **southamerica-east1 (São Paulo)**. Esse local não pode ser mudado depois.
3. Modo: **produção**. Criar.
4. Abra a aba **Regras**. Apague tudo e cole o conteúdo do arquivo **firestore.rules**.
5. Troque `EMAIL_DO_GABRIEL` e `EMAIL_DA_ANA_LUIZA` pelos e-mails cadastrados na seção 3, exatamente iguais e em minúsculas, entre aspas simples. Exemplo:
   `['gabriel@gmail.com', 'ana@gmail.com']`
6. Clique em **Publicar**.

Com isso, só vocês dois conseguem ler ou gravar qualquer coisa.

## 5. Colocar o app no ar (GitHub Pages)

1. Crie uma conta gratuita em **github.com** (se ainda não tiver).
2. Clique em **+ › New repository**.
   - Nome: `financas`.
   - Visibilidade: **Public** (o GitHub Pages gratuito exige repositório público; só o código fica visível, nunca os dados, que estão protegidos no Firebase).
   - Clique em **Create repository**.
3. Na página do repositório: **uploading an existing file** (ou **Add file › Upload files**).
4. Arraste **todos os arquivos** do .zip (inclusive o `firebase-config.js` já preenchido). Clique em **Commit changes**.
5. Vá em **Settings › Pages**. Em "Build and deployment": Source **Deploy from a branch**, branch **main**, pasta **/ (root)**. **Save**.
6. Espere 1 a 2 minutos e recarregue a página. Aparece o endereço do app, algo como:
   `https://SEU-USUARIO.github.io/financas/`

## 6. Autorizar o endereço no Firebase

1. No Firebase: **Authentication › Configurações › Domínios autorizados** › **Adicionar domínio**.
2. Informe `SEU-USUARIO.github.io` (sem `https://` e sem `/financas`). Salve.

Isso permite que o e-mail de "Esqueci a senha" volte para o app.

## 7. Instalar no celular

1. Abra o endereço do app no celular.
2. Entre com o seu e-mail e senha e toque no seu nome em "Quem está usando este celular?".
3. Adicione à tela inicial:
   - **iPhone (Safari):** Compartilhar › **Adicionar à Tela de Início**.
   - **Android (Chrome):** menu ⋮ › **Instalar app** ou **Adicionar à tela inicial**.
4. A Ana Luiza faz o mesmo no celular dela, com o e-mail e a senha dela.

Depois disso o app abre como qualquer outro, mesmo sem internet: os lançamentos ficam guardados no celular e sincronizam quando a conexão voltar.

## 8. Primeiros ajustes no app

Em **Ajustes**, cadastrem:
- os cartões, com o dia real de fechamento e de vencimento;
- o valor previsto das contas fixas (as sem valor não aparecem nos meses);
- os salários, em Receitas fixas;
- a divisão padrão do Casal, se não for 50/50.

## Quando eu mandar uma versão nova

1. No GitHub, abra o repositório e use **Add file › Upload files** para enviar só os arquivos alterados (normalmente `index.html` e `sw.js`). **Nunca** envie de novo o `firebase-config.js` em branco.
2. **Commit changes**. Em 1 a 2 minutos o site atualiza.
3. No celular, feche e abra o app duas vezes para pegar a versão nova.

## Se algo der errado

| O que aparece | O que fazer |
| --- | --- |
| "Falta configurar o Firebase" | O `firebase-config.js` enviado ainda tem `COLE_AQUI`. Refaça a seção 2 e envie o arquivo de novo. |
| "E-mail ou senha incorretos" | Confira o usuário em Authentication › Usuários, ou use "Esqueci a senha". |
| "Sem acesso aos dados" | O e-mail não está igual nas regras do Firestore (seção 4). Confira maiúsculas, aspas e vírgula. |
| Página 404 no endereço do GitHub | Espere alguns minutos; confira se os arquivos estão na raiz do repositório (não dentro de uma pasta). |

## Backup

No fim de cada mês, em **Mês › Exportar (CSV para Excel)**, salvem o arquivo do mês fora do app.

## Segurança

- Nunca digitem número de cartão, CVV, senhas ou dados de conta bancária no app. Cartões são identificados só por apelido e, no máximo, os 4 últimos dígitos.
- O app bloqueia descrições que pareçam número de cartão ou de conta.

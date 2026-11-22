# DevBlog

O CMS é a base [DevBlog](https://app.notion.com/p/41b468bac2c7819bb6fed5be19d639bb). O nome do blog está em lib/blog.mjs.

## Publicação

1. Crie um artigo na base. Preencha Título, Slug único (letras minúsculas ASCII, números e hífens), Descrição, Categoria, Autor, Tags e Data de publicação.
2. Envie uma imagem 16:9 pela propriedade Capa. Se estiver vazia, usa-se a capa da página; se indisponível, uma arte automática.
3. Escreva no corpo da página: títulos, parágrafos, negrito, itálico, sublinhado, listas aninhadas, citações, callouts, toggles, tarefas, tabelas, imagens e código. Links inseguros e blocos não suportados são ignorados.
4. Revise o artigo e marque Status como Publicado. Datas futuras, lixeira, arquivos, rascunhos e slugs inválidos ou duplicados não são exibidos.
5. Confira /blog e /blog/<slug>. O RSS (/blog/rss.xml) e sitemap (/sitemap.xml) incluem as publicações elegíveis. Para retirar um artigo, volte o Status para Rascunho.

## Configuração e segurança

Integração interna Notion somente para leitura, conectada à base editorial (não ao restante do workspace). Variáveis de servidor na Vercel: NOTION_TOKEN e NOTION_DATA_SOURCE_ID. ID da fonte: 41b468ba-c2c7-817e-a178-000b322f1c1b. Nunca use NEXT_PUBLIC_ para o token. Não envie credenciais ao GitHub. O usuário informou que configurou as variáveis na Vercel; a conexão precisa ser verificada em execução. Sem as duas variáveis, o catálogo local é usado apenas como alternativa de desenvolvimento; configuração parcial causa erro explícito.

As consultas são feitas sem cache persistente. URLs assinadas de mídia Notion expiram; uma nova navegação/recarregamento solicita URLs novas. Não existe proxy de imagens de origem arbitrária. Imagens externas são solicitadas diretamente pelo navegador, sem referrer. Use apenas mídias públicas autorizadas. Para compartilhamento social, o metadado usa uma imagem estável do portfólio, não uma URL temporária. Nunca publique informações privadas.

## Validação

Node conforme .nvmrc, npm ci, npm run lint, npm test, npm run build. Os testes mockados cobrem regras de publicação, capas, links, blocos e paginação; não substituem a validação com Notion/Vercel. Verifique também a página vazia, pesquisa, filtros, leitura no celular, erros de API, feed, sitemap e um artigo autorizado real com imagem. Os rascunhos existentes são preservados até revisão pelo autor.

Supabase, newsletter e contagem de visualizações estão expressamente adiados.

## Comentários anônimos

O projeto possui um módulo opcional de comentários por artigo, sem conta, nome ou e-mail. Os comentários ficam **pendentes** até aprovação na área [Moderação do DevBlog](https://albericojr-portfolio-xi.vercel.app/admin/devblog-comments). O armazenamento é Upstash Redis, separado do Notion; a segurança antibot utiliza Cloudflare Turnstile. **Não foi criado nem contratado um serviço de armazenamento nesta implementação.** A interface só aparece depois que o proprietário configurar as credenciais e habilitar o recurso na Vercel.

Passo a passo, variáveis de ambiente, segurança e moderação: **[docs/comments.md](comments.md)**. Não é necessária conta GitHub para os leitores, nem newsletter, Supabase ou contagem de visualizações.

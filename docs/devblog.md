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

## Comentários em artigos (opcional)

O DevBlog está preparado para o [giscus](https://giscus.app/pt), usando GitHub Discussions. Não há necessidade de Supabase, de tabela própria nem de tokens GitHub no site. Para proteger a privacidade do visitante, o script do serviço só é carregado quando ele clica em **Carregar comentários**. O leitor precisa entrar no GitHub para escrever; comentários podem ser moderados diretamente nas Discussions.

**Ativação manual pelo proprietário** (alterações na configuração do GitHub exigem sua ação):

1. No repositório público [AlbericoJr-portfolio](https://github.com/AlbericoJr/AlbericoJr-portfolio), ative **Settings > General > Features > Discussions**.
2. Instale o [GitHub App do giscus](https://github.com/apps/giscus) apenas nesse repositório, concedendo somente as permissões apresentadas e necessárias.
3. Crie ou escolha uma categoria de Discussions adequada aos comentários (por exemplo, “Comentários”).
4. Abra [giscus.app/pt](https://giscus.app/pt), informe **AlbericoJr/AlbericoJr-portfolio**, escolha a categoria e o mapeamento **pathname** (caminho da página). Confirme o ID da categoria gerado; o ID público do repositório é **R_kgDOMgNY0A**.
5. Na Vercel, configure estas variáveis públicas em **Production** (e em Preview, se for testar a prévia): `NEXT_PUBLIC_GISCUS_CATEGORY` = nome exato da categoria; `NEXT_PUBLIC_GISCUS_CATEGORY_ID` = ID da categoria, iniciado em `DIC_`. **Não são segredos**.
6. Faça redeploy da aplicação. Visite um artigo em `/blog/<slug>`, clique em **Carregar comentários**, verifique a autenticação via GitHub e teste um comentário. Modere a discussão no GitHub.

A seção fica **oculta** até que as duas variáveis públicas sejam válidas. Ela aparece apenas nas páginas individuais dos artigos existentes, não na página inicial do blog. A associação é pelo caminho `/blog/<slug>`: mudar o slug depois de receber comentários pode separar o tópico antigo; evite alterações de slug ou planeje a migração. Se desativar as variáveis, a seção desaparece sem apagar discussões já criadas no GitHub.

**Importante:** usuários sem conta GitHub não poderão publicar comentários. Se o público-alvo exigir comentários sem GitHub, será necessário escolher outro provedor e revisar privacidade, moderação e custos antes de implementá-lo. Este recurso não é newsletter nem contagem de visualizações.

# DevBlog

## Publicação
O CMS privado no Notion é a fonte editorial: https://app.notion.com/p/41b468bac2c7819bb6fed5be19d639bb.
Defina Título, Slug (único, minúsculo e separado por hífens), Descrição, Categoria, Autor, Tags, Data de publicação e Status. Opcionalmente marque Destaque. Use apenas conteúdo e imagens destinados à divulgação pública. Rascunho e Revisão não aparecem no site; Publicado exige data válida, não futura (fuso America/Recife). Slugs duplicados entre artigos elegíveis são omitidos. O nome do blog está em lib/blog.mjs.
A propriedade Capa tem prioridade sobre a capa da página. Use WebP/JPG/PNG 1200×675. Sem imagem ou se falhar, aparece a arte da categoria. Imagens dentro do conteúdo, títulos, parágrafos, negrito, itálico, sublinhado, tachado, links, listas aninhadas, citações, callouts, toggles, checklists, código e tabelas simples são suportados. Blocos não reconhecidos (por exemplo, embeds, bases internas e equações) são omitidos. Código tem realce leve, não um parser de linguagem. Imagens Notion têm URLs temporárias: recarregue para renovar; não são armazenadas nem usadas como URLs permanentes de SEO. URLs externas HTTPS podem ser carregadas no navegador; use apenas hosts confiáveis. Metadados sociais usam a imagem estável do portfólio.
O tempo de leitura dos posts Notion é calculado na página individual, evitando baixar todos os blocos na listagem, RSS e sitemap.

## Conexão
1. Crie uma integração interna somente leitura em https://www.notion.so/my-integrations.
2. Na base DevBlog, adicione a conexão à integração, sem compartilhar outras páginas.
3. Configure na Vercel (Preview e Production conforme necessário):
   - NOTION_TOKEN: segredo da integração.
   - NOTION_DATA_SOURCE_ID: 41b468ba-c2c7-817e-a178-000b322f1c1b
   Nunca use NEXT_PUBLIC_ para o token, nem envie o token ao GitHub ou chat. Para testes locais, use .env.local ignorado pelo Git.
4. Com ambas as variáveis ausentes, o blog usa os artigos locais de lib/blog.mjs (inicialmente vazio). Com configuração parcial ou falha da API, a página exibe erro recuperável; RSS retorna 503, sitemap mantém páginas do portfólio.
5. Faça deploy de preview. Publique um artigo de teste revisado no Notion, confirme card, capa, texto, imagens, links, tabela, código, pesquisa, filtros, navegação mobile, RSS e sitemap. Volte a Rascunho e confira que desaparece. Só então integre a branch principal.

## Testes
Node >=22.13.0: npm ci, npm run lint, npm test, npm run build. Workflow .github/workflows/devblog-check.yml executa os checks em push e PR. Testes simulam respostas Notion e não exigem credenciais. Testes de integração real e navegador precisam de preview configurado.
Supabase, newsletter e contadores de visualizações foram explicitamente adiados pelo usuário; nenhuma configuração desses serviços é necessária.

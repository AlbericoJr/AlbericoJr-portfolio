# DevBlog — comentários anônimos e moderação

Os comentários são enviados sem conta, nome ou e-mail. Apenas o texto é necessário. Eles ficam pendentes até a aprovação do administrador. Os artigos continuam no Notion. **Não use Supabase para este módulo**, nem habilite newsletter ou contagem de visualizações.

## Antes de ativar

O sistema foi implementado no código, mas **não está ativo** sem armazenamento persistente, desafio antibot e senha administrativa. Não ativamos nem contratamos serviços externos automaticamente. O [Upstash Redis na Vercel](https://vercel.com/marketplace/upstash) pode ter limites e custos de acordo com seu plano; confira antes de criar.

1. Abra [Vercel > Marketplace > Upstash](https://vercel.com/marketplace/upstash), crie ou conecte uma base Redis dedicada para comentários e vincule-a **somente** ao projeto do portfólio. Copie as variáveis públicas e privadas conforme a integração. Na Vercel, em **Settings > Environment Variables**, configure \`UPSTASH_REDIS_REST_URL\` e \`UPSTASH_REDIS_REST_TOKEN\` no ambiente Production.
2. Em [Cloudflare Turnstile](https://dash.cloudflare.com/?to=/:account/turnstile), crie um widget para o domínio publicado do portfólio. Use **Managed**. Defina \`NEXT_PUBLIC_TURNSTILE_SITE_KEY\` (chave pública) e \`TURNSTILE_SECRET_KEY\` (segredo privado) na Vercel. O backend valida cada token pela API Cloudflare; sem validação não recebe mensagens.
3. Crie uma senha administrativa longa, única e aleatória, com **no mínimo 24 caracteres**. Defina \`COMMENTS_ADMIN_SECRET\` na Vercel (não em NEXT_PUBLIC_).
4. Quando as cinco credenciais estiverem definidas, configure \`COMMENTS_ENABLED=true\`. Faça um **Redeploy**. Se qualquer parte estiver faltando, o recurso permanece oculto, e o restante do blog funciona normalmente.

Nunca envie URLs com token, senhas, chaves ou valores de credenciais para o GitHub ou para outras pessoas. Os IDs do Notion e o token do Notion já existentes permanecem inalterados.

## Como os leitores comentam

Cada artigo publicado em \`/blog/<slug>\` possui um formulário com apenas o campo de texto e a verificação antibot. Mensagens precisam ter de 10 a 1.200 caracteres. Não há nome, e-mail, cadastro ou login. Um limite de até cinco tentativas por hora por identificador temporário de rede e um intervalo de 90 segundos reduzem spam. O identificador é um hash, e não o endereço de IP em texto puro; as chaves temporárias expiram.

O envio retorna a confirmação de que o comentário foi recebido para avaliação. **Não aparece publicamente até que seja aprovado**. Os comentários publicados são exibidos como “Visitante”, por data, com paginação. A formatação é somente texto simples; o React escapa qualquer HTML enviado.

## Administração

Acesse **https://albericojr-portfolio-xi.vercel.app/admin/devblog-comments** e entre com a senha de \`COMMENTS_ADMIN_SECRET\`. A página não aparece no menu público e informa aos mecanismos de busca que não deve ser indexada, mas a proteção verdadeira é feita na API. A sessão possui cookie HTTP-only, SameSite Strict, duração máxima de 6 horas. As operações de escrita também validam a origem da requisição.

- **Aprovar**: remove da fila pendente e publica no artigo.
- **Excluir**: apaga permanentemente a mensagem do armazenamento e de seus índices.
- **Sair**: encerra a sessão atual.

Os últimos cem comentários pendentes e cem aprovados são mostrados na administração. Faça revisões periódicas para não deixar a fila acumulada. Atualmente não existe resposta encadeada a comentários.

## Privacidade e manutenção

O público não fornece identidade, mas a proteção Turnstile pode processar dados técnicos de segurança. Apenas o texto aprovado, data e o rótulo “Visitante” ficam públicos. Não armazene segredos nem dados pessoais em comentários. A base Redis guarda os comentários até a remoção; configure backups/exportação no próprio serviço se precisar conservar histórico. O Notion não armazena comentários.

Se o serviço Redis ou Cloudflare ficar indisponível, o módulo apresenta um erro; a leitura dos artigos e o RSS continuam independentes. Para desativar imediatamente, coloque \`COMMENTS_ENABLED=false\` e realize novo deployment. **Não apague o Redis se quiser preservar os comentários.**

## Teste pós-ativação

1. Abra um artigo real e veja “Comentários e opiniões”.
2. Envie uma mensagem de teste pelo formulário com Turnstile válido.
3. Confirme que a mensagem **não aparece** antes da aprovação.
4. Entre no painel privado, aprove o comentário e recarregue o artigo.
5. Apague o comentário de teste e confirme sua retirada da página pública.
6. Teste uma mensagem curta demais, várias tentativas seguidas, dispositivo móvel e expiração da sessão administrativa.
7. Verifique a página de privacidade e o comportamento sem as credenciais.

## Links

- [DevBlog — artigos](https://albericojr-portfolio-xi.vercel.app/blog)
- [Painel de moderação](https://albericojr-portfolio-xi.vercel.app/admin/devblog-comments)
- [Notion — CMS](https://app.notion.com/p/41b468bac2c7819bb6fed5be19d639bb)
- [GitHub — código](https://github.com/AlbericoJr/AlbericoJr-portfolio)
- [Vercel — configurações](https://vercel.com/)
- [Upstash — documentação](https://upstash.com/docs/redis/quickstarts/vercel-functions-app-router)
- [Turnstile — validação](https://developers.cloudflare.com/turnstile/get-started/server-side-validation/)

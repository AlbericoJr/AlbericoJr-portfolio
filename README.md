# Portfólio — Albérico Júnior

Portfólio profissional de **desenvolvimento Front-end e Mobile**, com projetos em React, Next.js, TypeScript e React Native.

**Site:** https://albericojr-portfolio-xi.vercel.app/

## Principais páginas

- **Início:** apresentação, especialidades, links profissionais e currículo.
- **Projetos:** galeria com filtros Web, Mobile e Estudos, páginas individuais com resumos técnicos e links para repositórios/demonstrações.
- **Serviços:** desenvolvimento web, mobile, interfaces e manutenção.
- **Experiência:** trajetória, formação acadêmica e competências.
- **Contato:** formulário Formspree com validação, estados de sucesso/erro e aviso de privacidade.

## Tecnologias

**Next.js 16.4.3**, **React 19**, **Node.js 24 LTS**, Tailwind CSS, React Icons, Radix UI e Framer Motion. Aplicação responsiva com suporte a `prefers-reduced-motion`.

## Desenvolvimento local

```bash
git clone https://github.com/AlbericoJr/AlbericoJr-portfolio.git
cd AlbericoJr-portfolio
nvm install
nvm use
npm ci
npm run dev
```

Abra o endereço indicado no terminal, normalmente http://localhost:3000.

### Verificações

```bash
npm run lint
npm test
npm run build
```

## Segurança e manutenção

- Os scripts executam ESLint 9, testes Node.js e build do Next.js via GitHub Actions.
- O Dependabot verifica dependências e workflows semanalmente.
- Arquivos `.env` e `.env.*` são ignorados no Git (exceto `.env.example`).
- A auditoria automatizada bloqueia alertas de severidade alta nas dependências de produção. Na revisão de 02/11/2026, permaneceram três alertas moderados em dependências transitivas (`glob`, `minimatch` e `sucrase`), que exigem acompanhamento. Antes do merge, revisar resultados do CI e a prévia da Vercel.

## Sobre o contato

O formulário está associado a um endpoint do **Formspree**. Antes de publicar para clientes, confirme a propriedade desse formulário, o endereço que recebe respostas, os limites antispam e a política de privacidade. Nenhuma senha ou chave de serviço deve ser armazenada no navegador.

## Metadados e SEO

Metadados Open Graph, sitemap e robots são gerados pelo App Router. Atualize o domínio nas configurações caso o deploy seja movido.

## Melhorias futuras

- Adicionar estudos de caso completos para projetos principais.
- Capturar imagens atualizadas dos aplicativos e criar vídeos demonstrativos.
- Executar auditorias Lighthouse e testes E2E nos navegadores.
- Atualizar o conteúdo do currículo PDF sempre que a experiência profissional mudar.

## Autor

Albérico Júnior — [LinkedIn](https://www.linkedin.com/in/alberico-junior/) · [GitHub](https://github.com/AlbericoJr)

## Verificação de qualidade visual

Um segundo workflow executa Playwright em navegadores e resoluções diferentes, capturando screenshots e publicando relatórios. O Lighthouse mede a versão de produção compilada em um servidor local no runner. Esses testes não provam a entrega real de e-mails pelo Formspree nem validam dados pessoais do currículo.

## Estudos de caso

As páginas de detalhes destacam problema abordado, arquitetura e recursos documentados dos projetos selecionados. As descrições não apresentam métricas comerciais inventadas.

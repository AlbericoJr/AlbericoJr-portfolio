// Resumos documentados com base nas funcionalidades descritas nos repositórios.
// Não representam métricas de usuários, resultados comerciais ou certificação das funcionalidades.
export const caseStudies={
 upfit:{
  challenge:"Organizar treinos e acompanhar atividades em uma experiência mobile.",
  approach:"Estrutura de aplicação React Native com Expo e TypeScript, apoiada por uma API Node.js/Express e banco MongoDB.",
  highlights:["Separação entre aplicativo mobile e servidor.","Foco em interface para exercícios, histórico e perfil.","A documentação do repositório apresenta autenticação e acompanhamento de progresso como funcionalidades em evolução."],
  status:"Projeto de estudo e portfólio. Para testar fluxos reais, configure backend e ambiente Expo."
 },
 granago:{
  challenge:"Simplificar o registro de receitas e despesas e a visualização de informações financeiras no celular.",
  approach:"Aplicativo React Native/Expo conectado a backend Node.js/Express em TypeScript, com Prisma, SQLite e autenticação baseada em JWT.",
  highlights:["Organização dos registros financeiros e histórico de transações.","Separação de camadas entre app mobile e API.","Uso documentado de JWT, bcryptjs, React Navigation e Axios."],
  status:"Projeto de portfólio; a disponibilidade e segurança de um backend público devem ser verificadas antes de usar dados reais."
 },
 "vice-city":{
  "challenge": "Criar uma experiência visual imersiva que permita explorar os destinos fictícios de Leonida.",
  "approach": "Site estático com HTML semântico, CSS responsivo, JavaScript puro e ícones Lucide, organizado em módulos de navegação, galeria e rádio.",
  "highlights": [
    "Carrossel de paisagens com movimento sutil no desktop.",
    "Vice FM com três faixas em loop e reprodução iniciada pelo usuário.",
    "Galeria ampliável com navegação por teclado e gestos de toque; menu mobile e suporte a movimento reduzido."
  ],
  "status": "Projeto de fã independente inspirado em GTA VI, sem afiliação com a Rockstar Games."
},
 gym:{
  challenge:"Apresentar uma academia e suas modalidades em um website de demonstração responsivo.",
  approach:"React com Vite e Tailwind CSS, navegação em páginas e componentes reutilizáveis.",
  highlights:["Páginas de modalidades e comparação de planos ilustrativos.","Calculadora de IMC educativa e formulário demonstrativo.","Atenção a acessibilidade e movimento reduzido."],
  status:"Preços, treinadores e formulários têm caráter demonstrativo; não existem matrículas ou pagamentos integrados."
 },
 nova:{
  challenge:"Organizar a comunicação visual de um serviço corporativo conceitual com múltiplas áreas de conteúdo.",
  approach:"SPA React/Vite com React Router, interface responsiva, páginas de serviços, blog, FAQ e contato.",
  highlights:["Arquitetura de páginas com navegação e conteúdo institucional.","Seções voltadas à apresentação de serviços e projetos.","Conteúdo conceitual de logística e segurança."],
  status:"Projeto de interface; não é prova da existência de uma plataforma operacional real."
 },
 brainwave:{
  challenge:"Explorar a experiência visual de uma plataforma conceitual ligada à tecnologia e IA.",
  approach:"Landing page com React, Vite e Tailwind CSS.",
  highlights:["Seções de recursos e benefícios do produto fictício.","Componentes e transições visuais reutilizáveis.","Layout responsivo de portfólio."],
  status:"Demonstração de frontend; não oferece um serviço de IA operacional."
 },
 "financas-ai":{
  "challenge": "Facilitar o acompanhamento das finanças pessoais, dos gastos e das metas em uma interface integrada.",
  "approach": "React e TypeScript com Vite, gráficos Recharts, ícones Lucide e persistência local no navegador. Assistente com interpretação local e confirmação das movimentações sugeridas.",
  "highlights": [
    "Dashboard de saldo, receitas, despesas e movimentações recentes.",
    "Registro de transações, acompanhamento de metas e relatórios de evolução financeira.",
    "Assistente interativo com confirmação antes dos lançamentos e exportação CSV de transações."
  ],
  "status": "Versão local sem login, sincronização bancária ou backup automático. Os dados ficam no navegador; a integração externa Gemini não está habilitada nesta versão."
}
}

import Link from "next/link"
export const metadata={title:"Privacidade e contato",description:"Informações sobre o tratamento de dados enviados pelo formulário do portfólio.",alternates:{canonical:"/privacy"}}
export default function Privacy(){
 return <main id="conteudo" className="site-shell mx-auto max-w-4xl py-14 sm:py-20">
  <p className="text-sm font-semibold uppercase tracking-widest text-accent">Transparência</p>
  <h1 className="h2 mt-4">Privacidade e formulário de contato</h1>
  <p className="mt-6 leading-relaxed text-white/70">Este portfólio apresenta trabalhos de desenvolvimento. Ao preencher o formulário de contato, você fornece voluntariamente nome, e-mail, assunto, mensagem e, caso queira, telefone.</p>
  <section className="mt-10 space-y-6 text-white/70">
   <div><h2 className="text-xl font-bold text-white">Para que são usados?</h2><p className="mt-2">Os dados fornecidos são utilizados para receber e responder à sua solicitação. Evite compartilhar senhas ou documentos sensíveis.</p></div>
   <div><h2 className="text-xl font-bold text-white">Quem processa o formulário?</h2><p className="mt-2">O envio utiliza o serviço de terceiros <a className="text-accent underline" href="https://formspree.io/legal/privacy-policy/" target="_blank" rel="noopener noreferrer">Formspree</a>. O processamento e armazenamento no serviço seguem também suas políticas e configurações. A titularidade e o destinatário da conta devem ser confirmados pelo responsável pelo site.</p></div>
   <div><h2 className="text-xl font-bold text-white">Solicitações sobre seus dados</h2><p className="mt-2">Para solicitar informações, correção ou exclusão de uma mensagem enviada, entre em contato por <a className="text-accent underline" href="mailto:alberico14@live.com">alberico14@live.com</a>. O atendimento dependerá da identificação da mensagem e das condições da plataforma de processamento.</p></div>
   <div><h2 className="text-xl font-bold text-white">Sobre esta página</h2><p className="mt-2">Este é um resumo informativo do fluxo de contato implementado; não substitui a conferência das políticas de retenção, segurança e privacidade da conta que recebe os dados.</p></div>
  </section>
  <Link href="/contact" className="site-link mt-10">Voltar ao contato</Link>
 </main>
}

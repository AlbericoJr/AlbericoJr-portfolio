import CommentsAdmin from "@/components/CommentsAdmin";
import {enabledConfig} from "@/lib/comments-core.mjs";
import Link from "next/link";
export const dynamic="force-dynamic";
export const metadata={title:"Moderação de comentários | DevBlog",robots:{index:false,follow:false}};
export default function AdminCommentsPage(){
 return <main id="conteudo" className="site-shell min-h-[70vh] max-w-4xl py-14">
  <p className="mb-3 text-sm text-accent">DevBlog · Administração</p>
  <h1 className="h2 mb-4">Moderação de comentários</h1>
  <p className="mb-8 text-sm text-white/70">Aprove ou exclua opiniões enviadas anonimamente. Não há contas de visitantes nem endereços de e-mail associados.</p>
  <CommentsAdmin enabled={enabledConfig()}/>
  <Link href="/blog" className="mt-10 inline-block text-accent">← Voltar ao blog</Link>
 </main>;
}

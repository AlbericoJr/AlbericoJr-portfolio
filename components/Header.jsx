import Link from "next/link"
import Nav from "./Nav"
import MobileNav from "./MobileNav"
export default function Header(){
 return <header className="relative z-30 border-b border-white/5 bg-primary/95 py-5 text-white">
 <div className="site-shell flex items-center justify-between gap-4">
 <Link href="/" aria-label="Albérico Júnior, página inicial" className="text-2xl font-semibold tracking-tight">Albérico <span className="text-accent">Jr.</span></Link>
 <div className="hidden items-center gap-8 xl:flex"><Nav/><Link href="/contact" className="site-link">Vamos conversar</Link></div>
 <div className="xl:hidden"><MobileNav/></div>
 </div></header>
}

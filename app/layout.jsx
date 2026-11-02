import { JetBrains_Mono } from "next/font/google"
import "./globals.css"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import PageTransition from "@/components/PageTransition"
import StairTransition from "@/components/StairTransition"

const font = JetBrains_Mono({ subsets: ["latin"], display: "swap", variable: "--font-jetbrainsMono" })
const website = "https://albericojr-portfolio-xi.vercel.app"

export const metadata = {
  metadataBase: new URL(website),
  title: { default: "Albérico Júnior | Desenvolvedor Front-end & Mobile", template: "%s | Albérico Júnior" },
  description: "Desenvolvedor Front-end e Mobile. Projetos com React, Next.js, TypeScript e React Native. Conheça meu portfólio e entre em contato.",
  openGraph: {
    title: "Albérico Júnior | Desenvolvedor Front-end & Mobile",
    description: "Interfaces web, aplicações mobile e projetos reais em React, Next.js e React Native.",
    url: website,
    locale: "pt_BR",
    type: "website",
    images: [{ url: "/assets/albericojr.png", width: 600, height: 600, alt: "Albérico Júnior" }],
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }) {
  return <html lang="pt-BR"><body className={font.variable}>
    <a href="#conteudo" className="skip-link">Pular para o conteúdo</a>
    <Header />
    <StairTransition />
    <PageTransition>{children}</PageTransition>
    <Footer/>
  </body></html>
}

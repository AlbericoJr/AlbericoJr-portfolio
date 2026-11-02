import Link from "next/link"
import { FaGithub, FaLinkedinIn, FaDev } from "react-icons/fa"

const socialLinks = [
  {icon:FaGithub,name:"GitHub",href:"https://github.com/AlbericoJr"},
  {icon:FaLinkedinIn,name:"LinkedIn",href:"https://www.linkedin.com/in/alberico-junior/"},
  {icon:FaDev,name:"Dev.to",href:"https://dev.to/albericojr"},
]
export default function Socials({containerStyles="",iconStyles=""}) {
  return <nav aria-label="Redes profissionais" className={containerStyles}>
    {socialLinks.map(({icon:Icon,name,href})=><Link key={name} href={href} target="_blank" rel="noopener noreferrer" aria-label={"Abrir "+name} title={name} className={iconStyles}><Icon aria-hidden="true" /></Link>)}
  </nav>
}

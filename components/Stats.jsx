import { FiCode, FiSmartphone, FiUsers } from "react-icons/fi"
const values=[
 {Icon:FiCode,title:"Desenvolvimento web",description:"React, Next.js e interfaces responsivas"},
 {Icon:FiSmartphone,title:"Aplicações mobile",description:"React Native e Expo"},
 {Icon:FiUsers,title:"Colaboração",description:"Visão de produto, comunicação e aprendizado contínuo"}
]
export default function Stats(){
 return <section aria-label="Áreas de atuação" className="site-shell grid gap-4 pb-14 pt-5 md:grid-cols-3">{values.map(({Icon,title,description})=><div key={title} className="site-card flex items-start gap-4 p-5"><Icon size={24} className="mt-1 shrink-0 text-accent" aria-hidden="true"/><div><h2 className="font-semibold">{title}</h2><p className="mt-1 text-sm text-white/60">{description}</p></div></div>)}</section>
}

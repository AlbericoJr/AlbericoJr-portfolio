"use client"

import {BsArrowDownRight} from "react-icons/bs"
import Link from "next/link"

const services = [
  {
    num: '01',
    title: "Web Development",
    description: "Minha missão é criar soluções web de excelência, otimizando desempenho e aprimorando a experiência do usuário de forma significativa. ",
    href: ""
  },
  {
    num: '02',
    title: "UI/UX Design",
    description: "Meu objetivo é desenvolver interfaces intuitivas e funcionais que aprimorem a experiência do usuário, garantindo usabilidade e satisfação.",
    href: ""
  },
  {
    num: '03',
    title: "Logo Design",
    description: "O objetivo é desenvolver logotipos criativos e impactantes que fortaleçam a identidade visual e a presença da marca.",
    href: ""
  },
  {
    num: '04',
    title: "SEO",
    description: "O compromisso que tenho é otimizar estratégias de SEO para garantir resultados eficazes e melhorar a visibilidade online da sua marca.",
    href: ""
  },
]

import { motion } from "framer-motion"

const Servicos = () => {
  return (
    <section className="min-h-[80vh] flex flex-col justify-center py-12 xl:py-0 mb-9">
      <div className="container mx-auto">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: 1, 
            transition: { duration: 0.5, delay: 2.4, ease: "easeIn" },
          }}
          className="grid grid-cols-1 md:grid-cols-2 gap-[60px]"
        >
          {services.map((service, index) => {
            return(
              <div 
                key={index}
                className="flex-1 flex flex-col justify-center gap-6 group"
              >
                {/* top */}
                <div className="w-full flex justify-between items-center">
                  <div className="text-5xl font-extrabold text-outline text-transparent group-hover:text-outline-hover transition-all duration-500">
                    {service.num}
                  </div>
                  <Link href={service.href} className="w-[70px] h-[70px] rounded-full bg-white group-hover:bg-accent transition-all duration-500 flex justify-center items-center hover:-rotate-45">
                  <BsArrowDownRight className="text-primary text-3xl"/>
                  </Link>
                </div>
                {/* title */}
                <h2 className="text-[42px] font-bold leading-none text-white group-hover:text-accent transition-all duration-500">
                  {service.title}
                </h2>
                {/* description */}
                <p className="text-white/60">{service.description}</p>
                {/* border */}
                <div className="border-b border-white/20 w-full "></div>
              </div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

export default Servicos

"use client"

import { motion } from "framer-motion"
import { FaEnvelope, FaMapMarkedAlt } from "react-icons/fa"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const info = [
  {
    icon: <FaEnvelope />,
    title: "E-mail",
    description: "alberico14@live.com",
  },
  {
    icon: <FaMapMarkedAlt />,
    title: "Endereço",
    description: "Recife - PE",
  },
]

const Contact = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { delay: 2.4, duration: 0.4, ease: "easeIn" },
      }}
      className="py-6"
    >
      <div className="container mx-auto">
        <div className="flex flex-col xl:flex-row gap-[30px]">
          {/* form */}
          <div className="xl:w-[55%] order-2 xl:order-none ">
            <form
              action="https://formspree.io/f/mdknzqra"
              method="POST"
              className="flex flex-col gap-6 p-10 bg-[#27272c] rounded-xl"
            >
              <h3 className="text-4xl text-accent">Vamos trabalhar juntos</h3>
              <p className="text-white/60">
                Vamos trabalhar juntos para transformar suas ideias em soluções
                digitais impactantes.
              </p>
              {/* input */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Para acessibilidade, é melhor usar <label> em vez de placeholder. 
                    Como o design é minimalista, uma opção é usar labels flutuantes ou 
                    labels visivelmente ocultas, mas ainda acessíveis para leitores de tela.
                    Por simplicidade, mantive o placeholder, mas adicionei o atributo `aria-label`.
                */}
                <Input
                  type="text"
                  name="firstname"
                  placeholder="Primeiro Nome"
                  aria-label="Primeiro Nome"
                  required
                />
                <Input
                  type="text"
                  name="lastname"
                  placeholder="Sobrenome"
                  aria-label="Sobrenome"
                />
                <Input
                  type="email"
                  name="email"
                  placeholder="E-mail"
                  aria-label="E-mail"
                  required
                />
                <Input
                  type="phone"
                  name="phone"
                  placeholder="Número de telefone"
                  aria-label="Número de telefone"
                />
              </div>

              {/* textarea */}
              <Textarea
                name="message"
                className="h-[200px]"
                placeholder="Digite sua mensagem aqui..."
                aria-label="Sua mensagem"
              />
              {/* btn */}
              <Button type="submit" size="md" className="max-w-48">
                enviar mensagem
              </Button>
            </form>
          </div>
          {/* info */}
          <div className="flex-1 flex items-center xl:justify-end order-1 xl:order-none mb-8 xl:mb-0">
            <ul className="flex flex-col gap-10">
              {info.map((item, index) => {
                return (
                  <li key={index} className="flex items-center gap-6">
                    <div className="w-[52px] h-[52px] xl:w-[72px] xl:h-[72px] bg-[#27272c] text-accent rounded-md flex items-center justify-center">
                      <div className="text-[28px]">{item.icon}</div>
                    </div>
                    <div className="flex-1">
                      <p className="text-white/60">{item.title}</p>
                      <h3 className="text-xl">{item.description}</h3>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    </motion.section>
  )
}

export default Contact

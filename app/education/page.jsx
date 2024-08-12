"use client"

import { FaHtml5, FaCss3, FaJs, FaReact, FaFigma, FaNodeJs, FaSass, FaPython, FaBootstrap, FaAws } from "react-icons/fa"
import { SiTypescript, SiTailwindcss, SiNextdotjs } from "react-icons/si"

const about = {
  title: "Sobre mim",
  description: "Sou Alberico Junior, desenvolvedor Front-End com mais de 3 anos de experiência, apaixonado por criar soluções web intuitivas e funcionais. Com habilidades em diversas tecnologias, estou disponível para projetos freelance.",
  info: [
    {
      fieldName: "Name",
      fieldValue: "Albérico Junior",
    },
    {
      fieldName: "Experiência",
      fieldValue: "3+ anos",
    },
    {
      fieldName: "Nacionalidade",
      fieldValue: "Brasileiro ",
    },
    {
      fieldName: "E-mail",
      fieldValue: "alberico14@live.com",
    },
    {
      fieldName: "Freelance",
      fieldValue: "Disponível",
    },
    {
      fieldName: "Idiomas",
      fieldValue: "Inglês, Espanhol",
    },
  ]
}

// experienciar
const experience ={
  icon: "/assets/formacao/badge.svg",
  title: "Minha experiência",
  description: "Sou um Desenvolvedor dedicado com experiência em administração de software e desenvolvimento web, especializado em HTML, CSS, JavaScript, React, e mais. Com sólida formação em Gestão de Pessoas e em andamento em Sistemas de Informação, destacando-se na criação de interfaces interativas e responsivas.",
  items: [
    {
      company: "G.Bombons",
      position: "Vendedor",
      duration: " 2014 - 2022"
    },
    {
      company: "Contax",
      position: "Atendente de Telemarketing",
      duration: " 2011 - 2013"
    },
  ]
}

// edução
const education = {
  icon: "/assets/formacao/cap.svg",
  title: "Minha Formação",	
  description: "Sou graduação em Gestão de Recursos Humanos pela Unibra, concluída em 2013, e um curso técnico em Desenvolvimento de Sistemas pela Secretaria de Educação de Pernambuco, finalizado em 2021. Atualmente, estou cursando o 6º período de Sistemas de Informação na UNIFG, com previsão de conclusão em 2025, focado em aprimorar meus conhecimentos.",
  items: [
    {
      institution: "UNIFG",
      degree: "Sistema de Informação",
      duration: " Cursando"
    },
    {
      institution: "Secretaria de Educação de PE",
      degree: "Tec. Desenvolvimento de Sistema",
      duration: " 2019 - 2021"
    },
    {
      institution: "Unibra",
      degree: "Gestão de Recursos Humanos",
      duration: " 2011 - 2013"
    },
  ]
}

// skills
const skills = {
  title: "Minhas Skills",
  description: "Minhas habilidades abrangem uma ampla gama de tecnologias e ferramentas essenciais para o desenvolvimento Front-End.",
  skillList:[
    {
      icon: <FaHtml5 />,
      name: "html 5",
    },
    {
      icon: <FaCss3 />,
      name: "css 3",
    },
    {
      icon: <FaJs />,
      name: "javascript",
    },
    {
      icon: <FaBootstrap />,
      name: "bootstrap",
    },
    {
      icon: <FaSass />,
      name: "sass",
    },
    {
      icon: <SiTypescript />,
      name: "typescript",
    },
    {
      icon: <FaReact />,
      name: "React.js",
    },
    {
      icon: <SiNextdotjs />,
      name: "next.js",
    },
    {
      icon: <SiTailwindcss />,
      name: "tailwind.css",
    },
    {
      icon: <FaNodeJs />,
      name: "node.js",
    },
    {
      icon: <FaPython />,
      name: "python",
    },
    {
      icon: <FaAws />,
      name: "aws",
    },
    {
      icon: <FaFigma />,
      name: "figma",
    },
  ]
}

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@radix-ui/react-tooltip"

import { ScrollArea } from "@/components/ui/scroll-area"
import { motion } from "framer-motion"

const Formacao = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: {
          delay: 2.4,
          duration: 0.4,
          ease: "easeIn",
        },
      }}
      className="min-h-[80vh] flex items-center justify-center py-12 xl:py-0"
    >
      <div className="container mx-auto">
        <Tabs
          defaultValue="experience"
          className="flex flex-col xl:flex-row gap-[60px]"
        >
          <TabsList className="flex flex-col w-full max-w-[380px] mx-auto xl:mx-0 gap-6">
            <TabsTrigger value="experience">Experiencia</TabsTrigger>
            <TabsTrigger value="education">Formação</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="about">Sobre mim</TabsTrigger>
          </TabsList>

          <div className="min-h-[70vh] w-full mb-7">
            <TabsContent value="experience" className="w-full">
              <div className="flex flex-col gap-[30px] text-center xl:text-left">
                <h3 className="text-4xl font-bold">{experience.title}</h3>
                <p className="max-w-[600px] text-white/60 mx-auto xl:mx-0">
                {experience.description}
              </p>
              <ScrollArea className="h-[400px]">
                <ul className="grid grid-cols-1 lg:grid-cols-2 gap-[30px]">
                  {experience.items.map((item, index) => {
                    return(
                      <li key={index} className="bg-[#232329] h-[184px] py-6 px-10 rounded-xl flex flex-col justify-center items-center lg:items-start gap-1">
                        <span className="text-accent">{item.duration}</span>
                        <h3 className="text-xl mx-w-[260px] min-h-[60px] text-center lg:text-left">{item.position}</h3>
                        <div className="flex items-center gap-3">
                          <span className="w-[6px] h-[6px] rounded-full bg-accent"></span>
                          <p className="text-white/60">{item.company}</p>
                        </div>
                      </li>
                    )
                  })}
                </ul>
              </ScrollArea>
              </div>
            </TabsContent>

            <TabsContent value="education" className="w-full">
            <div className="flex flex-col gap-[30px] text-center xl:text-left">
                <h3 className="text-4xl font-bold">{education.title}</h3>
                <p className="max-w-[600px] text-white/60 mx-auto xl:mx-0">
                {education.description}
              </p>
              <ScrollArea className="h-[400px]">
                <ul className="grid grid-cols-1 lg:grid-cols-2 gap-[30px]">
                  {education.items.map((item, index) => {
                    return(
                      <li key={index} className="bg-[#232329] h-[184px] py-6 px-10 rounded-xl flex flex-col justify-center items-center lg:items-start gap-1">
                        <span className="text-accent">{item.duration}</span>
                        <h3 className="text-xl mx-w-[260px] min-h-[60px] text-center lg:text-left">{item.degree}</h3>
                        <div className="flex items-center gap-3">
                          <span className="w-[6px] h-[6px] rounded-full bg-accent"></span>
                          <p className="text-white/60">{item.institution}</p>
                        </div>
                      </li>
                    )
                  })}
                </ul>
              </ScrollArea>
              </div>
            </TabsContent>

            <TabsContent value="skills" className="w-full h-full">
              <div className="flex flex-col gap-[30px]">
                <div className="flex flex-col gap-[30px] text-center xl:text-left">
                  <h3 className="text-4xl font-bold">{skills.title}</h3>
                  <p className="max-w-[600px] text-white/60 mx-auto xl:mx-0">
                    {skills.description}
                  </p>
                </div>
                <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 xl:gap-[30px]">
                  {skills.skillList.map((skill, index) => {
                    return(
                      <li key={index}>
                        <TooltipProvider delayDuration={100}>
                          <Tooltip>
                            <TooltipTrigger className="w-full h-[150px] bg-[#232329] rounded-xl flex justify-center items-center group">
                              <div className="text-6xl group-hover:text-accent transition-all duration-300">
                                {skill.icon}
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="capitalize">{skill.name}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </TabsContent>

            <TabsContent value="about" className="w-full text-center xl:text-left">
              <div className="flex flex-col gap-[30px]">
                <h3 className="text-4xl font-bold">{about.title}</h3>
                <p className="max-w-[600px] text-white/60 mx-auto xl:mx-0">
                  {about.description}
                </p>
                <ul className="grid grid-cols-1 xl:grid-cols-2 gap-y-6 max-w-[620px] mx-auto xl:mx-0">
                  {about.info.map((item, index) => {
                    return(
                      <li 
                        key={index} 
                        className="flex items-center justify-center xl:justify-start gap-4"
                      >
                        <span className="text-white/60">{item.fieldName}</span>
                        <span className="text-xl">{item.fieldValue}</span>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </motion.div>
  )
}

export default Formacao

"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"

import { BsArrowUpRight, BsGithub } from "react-icons/bs"
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip" // Importando do local correto do shadcn/ui
import WorkSliderBtns from "@/components/WorkSliderBtns"

const projects = [
  {
    num: "01",
    category: "front-end",
    title: "GYM Academy",
    description:
      "Um site para a academia GYM, com o objetivo de promover seus serviços e facilitar o acesso a informações essenciais para seus clientes.",
    stack: [{ name: "Rect.js" }, { name: "Tailwind.css" }],
    image: "/assets/work/GYM-academy.png",
    live: "https://gym-academia.vercel.app/",
    github: "https://github.com/AlbericoJr/GYM",
  },
  {
    num: "02",
    category: "front-end",
    title: "Spider Man 2",
    description:
      "Projeto de estudo inspirado no jogo Spider-Man 2, focado em demonstrar o uso de HTML e CSS para criar um site responsivo e moderno.",
    stack: [{ name: "HTML" }, { name: "CSS" }],
    image: "/assets/work/spider-man-2.png",
    live: "https://spider-man-rho-two.vercel.app/",
    github: "https://github.com/AlbericoJr/SPIDER-MAN",
  },
  {
    num: "03",
    category: "front-end",
    title: "Gpt",
    description:
      "Projeto que explora as possibilidades da inteligência artificial, utilizando tecnologias como o ChatGPT para construir soluções inovadoras e personalizadas.",
    stack: [{ name: "React.js" }, { name: "CSS" }],
    image: "/assets/work/gpt.png",
    live: "https://hilarious-tartufo-d8cc6d.netlify.app/",
    github: "https://github.com/AlbericoJr/Gpt",
  },
  {
    num: "04",
    category: "front-end",
    title: "Zingen",
    description:
      "Aplicativo inovador que utiliza IA para remover a voz de músicas, permitindo que usuários pratiquem suas habilidades vocais de forma divertida e eficaz.",
    stack: [{ name: "HTML" }, { name: "CSS" }],
    image: "/assets/work/zingen-mockup.png",
    live: "https://albericojr.github.io/Zingen/",
    github: "https://github.com/AlbericoJr/Zingen",
  },
  {
    num: "05",
    category: "front-end",
    title: "Ped Doctor",
    description:
      "Plataforma dedicada ao cuidado de animais de estimação, oferecendo serviços, produtos e informações úteis com um design amigável e acolhedor.",
    stack: [{ name: "HTML" }, { name: "CSS" }, { name: "JavaScript" }],
    image: "/assets/work/pet_doctor.png",
    live: "https://albericojr.github.io/Pet_Doctor/",
    github: "https://github.com/AlbericoJr/Pet_Doctor",
  },
  {
    num: "06",
    category: "Mobile",
    title: "UpFit",
    description:
      "Aplicativo para gerenciamento de treinos e acompanhamento da evolução física, com autenticação, cadastro de exercícios e histórico de atividades.",
    stack: [
      { name: "React Native" },
      { name: "Expo" },
      { name: "Node.js" },
      { name: "Express" },
      { name: "MongoDB" },
    ],
    image: "/assets/work/UpFit.png",
    live: "",
    github: "https://github.com/AlbericoJr/UpFit",
  },
  {
    num: "07",
    category: "Mobile",
    title: "GranaGo",
    description:
      "O GranaGo é um aplicativo completo para controle de finanças pessoais, ajudando usuários a gerenciar suas receitas e despesas de forma simples.",
    stack: [{ name: "React Native" }, { name: "Expo" }, { name: "Node.js" }],
    image: "/assets/work/GranaGo.png",
    live: "",
    github: "https://github.com/AlbericoJr/GranaGo",
  },
  {
    num: "08",
    category: "front-end",
    title: "Brainwave",
    description:
      "Landing page moderna e responsiva para uma plataforma fictícia de IA, com foco em experiência visual e comunicação clara.",
    stack: [{ name: "Rect.js" }, { name: "Tailwind.css" }],
    image: "/assets/work/brainwave.png",
    live: "https://brainwave-rho-ten.vercel.app/",
    github: "https://github.com/AlbericoJr/Brainwave",
  },
  {
    num: "09",
    category: "front-end",
    title: "Brainwave",
    description:
      "Karla Design! É um projeto de site de página única, moderno e responsivo, desenvolvido para um estúdio de nail art. O design é vibrante, criativo e focado em proporcionar uma excelente experiência visual para o usuário.",
    stack: [{ name: "HTML" }, { name: "Tailwind.css" }],
    image: "/assets/work/Karla-Design.png",
    live: "https://albericojr.github.io/Karla_Design/",
    github: "https://github.com/AlbericoJr/Karla_Design",
  },
]

const Work = () => {
  const [project, setProject] = useState(projects[0])

  const handleSlideChange = (swiper) => {
    const currentIndex = swiper.activeIndex

    setProject(projects[currentIndex])
  }

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { delay: 2.4, duration: 0.4, ease: "easeIn" },
      }}
      className="min-h-[80vh] flex flex-col justify-center py-12 xl:py-0"
    >
      <div className="container mx-auto">
        <div className="flex flex-col xl:flex-row xl:gap-[30px]">
          <div className="w-full xl:w-[50%] xl:h-[460px] flex flex-col xl:justify-between order-2 xl:order-none">
            <div className="flex flex-col gap-[30px] h-[50%]">
              {/* outline num */}
              <div className="text-8xl leading-none font-extrabold text-transparent text-outline">
                {project.num}
              </div>
              {/* category */}
              <h2 className="text-[42px] font-bold leading-none text-white hover:text-accent transition-all duration-500 capitalize">
                projeto {project.category}
              </h2>
              {/* description */}
              <p className="text-white/60">{project.description}</p>
              {/* stack */}
              <ul className="flex gap-4">
                {project.stack.map((item, index) => {
                  return (
                    <li
                      key={item.name} // Usar um valor único como chave
                      className="text-md text-accent"
                    >
                      {item.name}
                      {index !== project.stack.length - 1 && ","}
                    </li>
                  )
                })}
              </ul>
              {/* border */}
              <div className="border border-white/20"></div>
              {/* buttons */}
              <TooltipProvider delayDuration={100}>
                <div className="flex items-center gap-4">
                  {/* live project button */}
                  {project.live && (
                    <Link href={project.live} target="_blank">
                      <Tooltip>
                        <TooltipTrigger className="w-[70px] h-[70px] rounded-full bg-white/5 flex justify-center items-center group">
                          <BsArrowUpRight className="text-white text-3xl group-hover:text-accent" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Projeto ao vivo</p>
                        </TooltipContent>
                      </Tooltip>
                    </Link>
                  )}
                  {/* github project button */}
                  <Link href={project.github} target="_blank">
                    <Tooltip>
                      <TooltipTrigger className="w-[70px] h-[70px] rounded-full bg-white/5 flex justify-center items-center group">
                        <BsGithub className="text-white text-3xl group-hover:text-accent" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Repositório Github</p>
                      </TooltipContent>
                    </Tooltip>
                  </Link>
                </div>
              </TooltipProvider>
            </div>
          </div>
          <div className="w-full xl:w-[50%]">
            <Swiper
              spaceBetween={30}
              slidesPerView={1}
              className="xl:h-[520px] mb-12"
              onSlideChange={handleSlideChange}
            >
              {projects.map((project, index) => {
                return (
                  <SwiperSlide key={project.num} className="w-full">
                    <div className="h-[460px] relative group flex justify-center items-center bg-black/10">
                      {/* overlay */}
                      <div className="absolute top-0 bottom-0 w-full h-full bg-black/10 z-10"></div>
                      {/* image */}
                      <div className="relative w-full h-full">
                        <Image
                          src={project.image}
                          fill
                          className="object-cover"
                          alt={`Imagem do projeto ${project.title}`}
                        />
                      </div>
                    </div>
                  </SwiperSlide>
                )
              })}
              {/* slider Botão */}
              <WorkSliderBtns
                containerStyles="flex gap-2 absolute right-0 bottom-[calc(50%_-_22px)] xl:bottom-0 z-20 w-full justify-between xl:w-max xl:justify-none"
                btnStyles="bg-accent hover:bg-accent-hover text-primary text-[22px] w-[44px] h-[44px] flex justify-center items-center transition-all"
              />
            </Swiper>
          </div>
        </div>
      </div>
    </motion.section>
  )
}

export default Work

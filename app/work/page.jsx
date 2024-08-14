"use client"

import {motion} from "framer-motion";
import { useState } from "react";

import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css"

import { BsArrowUpRight, BsGithub } from "react-icons/bs";

import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@radix-ui/react-tooltip";

import Link from "next/link";
import Image from "next/image";
import WorkSliderBtns from "@/components/WorkSliderBtns";

const projects =[
  {
    num: "01",
    category: "front-end",
    title: "GYM Academy",
    description: "Este projeto é um site desenvolvido para a academia GYM, com o objetivo de promover seus serviços e facilitar o acesso às informações essenciais para seus clientes.",
    stack: [{name: "Rect.js"}, {name: "Tailwind.css"}],
    image: "/assets/work/GYM-academy.png",
    live: "https://gym-academia.vercel.app/",
    github: "https://github.com/AlbericoJr/GYM",
  },
  {
    num: "02",
    category: "front-end",
    title: "Spider Man 2",
    description: "Projeto realizado através de estudos e inspirado no jogo Spider Man. O projeto foi feito para mostrar como utilizar o HTML e o CSS para criar um site responsível e moderno.",
    stack: [{name: "HTML"}, {name: "CSS"}],
    image: "/assets/work/spider-man-2.png",
    live: "https://spider-man-rho-two.vercel.app/",
    github: "https://github.com/AlbericoJr/SPIDER-MAN",
  },
  {
    num: "03",
    category: "front-end",
    title: "Gpt",
    description: "Utilizo as mais recentes tecnologias, como o ChatGPT, para construir soluções inovadoras e personalizadas. Meus projetos exploram as possibilidades da inteligência artificial para transformar ideias em realidade.",
    stack: [{name: "React.js"}, {name: "Css"}],
    image: "/assets/work/gpt.png",
    live: "https://hilarious-tartufo-d8cc6d.netlify.app/",
    github: "https://github.com/AlbericoJr/Gpt",
  },
]

const Work = () => {
  const [project, setProject] = useState(projects[0]);

  const handleSlideChange = (swiper) => {
    const currentIndex = swiper.activeIndex;

    setProject(projects[currentIndex]);
  }

  return (
    <motion.section 
      initial={{opacity: 0}} 
      animate={{
        opacity: 1,
        transition: {delay: 2.4, duration: 0.4, ease: "easeIn"},
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
              <h2 className="text-[42px] font-bold leading-none text-white group-hover:text-accent transition-all duration-500 capitalize">
                projeto {project.category}
              </h2>
              {/* description */}
              <p className="text-white/60">
                {project.description}
              </p>
              {/* stack */}
              <ul className="flex gap-4">
                {project.stack.map((item, index) => {
                  return (
                    <li 
                      key={index}
                      className="text-xl text-accent"
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
              <div className="flex items-center gap-4">
                {/* live project button */}
                <Link href={project.live} target="_blank">
                  <TooltipProvider delayDuration={100}>
                    <Tooltip>
                      <TooltipTrigger className="w-[70px] h-[78px] rounded-full bg-white/5 flex justify-center items-center group">
                        <BsArrowUpRight className="text-white text-3xl group-hover:text-accent"/>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Projeto ao vivo</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Link>
                {/* github project button */}
                <Link href={project.github} target="_blank">
                  <TooltipProvider delayDuration={100}>
                    <Tooltip>
                      <TooltipTrigger className="w-[70px] h-[78px] rounded-full bg-white/5 flex justify-center items-center group">
                        <BsGithub className="text-white text-3xl group-hover:text-accent"/>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Repositório Github</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Link>
              </div>
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
                  <SwiperSlide key={index} className="w-full">
                    <div className="h-[460px] relative group flex justify-center items-center bg-pink-50/20">
                      {/* overlay */}
                      <div className="absolute top-0 bottom-0 w-full h-full bg-black/10 z-10"></div>
                      {/* image */}
                      <div className="relative w-full h-full">
                        <Image 
                          src={project.image} 
                          fill 
                          className="object-cover" 
                          alt=""
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

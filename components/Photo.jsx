"use client"
import { useReducedMotion, motion } from "framer-motion"
import Image from "next/image"

export default function Photo() {
  const reduceMotion = useReducedMotion()
  return <div className="relative h-[300px] w-[300px] sm:h-[370px] sm:w-[370px] xl:h-[500px] xl:w-[500px]">
    <div className="absolute inset-5 rounded-full bg-accent/10 blur-3xl" aria-hidden="true"/>
    <div className="absolute inset-[5%] overflow-hidden rounded-full border border-accent/15">
      <Image src="/assets/albericojr.png" priority alt="Foto de Albérico Júnior" fill quality={85} sizes="(max-width:640px) 270px,(max-width:1200px) 340px,450px" className="object-contain" />
    </div>
    <motion.svg aria-hidden="true" className="absolute inset-0 h-full w-full" viewBox="0 0 506 506" fill="none">
      <motion.circle cx="253" cy="253" r="247" stroke="#00ff99" strokeWidth="3" strokeDasharray="18 100 28 105" strokeLinecap="round" animate={reduceMotion ? undefined : {rotate:360}} transition={{duration:35,repeat:Infinity,ease:"linear"}} style={{transformOrigin:"50% 50%"}}/>
    </motion.svg>
  </div>
}

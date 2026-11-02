"use client"
import { useReducedMotion, motion } from "framer-motion"
import { usePathname } from "next/navigation"
export default function PageTransition({children}) {
  const pathname = usePathname()
  const reduce = useReducedMotion()
  return <motion.div key={pathname} initial={reduce ? false : {opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{duration:reduce?0:0.22}}>{children}</motion.div>
}

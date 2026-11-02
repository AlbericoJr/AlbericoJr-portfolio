"use client"
import {useSwiper} from "swiper/react"
import {PiCaretLeftBold,PiCaretRightBold} from "react-icons/pi"
export default function WorkSliderBtns({containerStyles="",btnStyles="",iconsStyles=""}){
 const swiper=useSwiper()
 return <div className={containerStyles}>
  <button type="button" aria-label="Projeto anterior" className={btnStyles} onClick={()=>swiper.slidePrev()}><PiCaretLeftBold className={iconsStyles} aria-hidden="true"/></button>
  <button type="button" aria-label="Próximo projeto" className={btnStyles} onClick={()=>swiper.slideNext()}><PiCaretRightBold className={iconsStyles} aria-hidden="true"/></button>
 </div>
}

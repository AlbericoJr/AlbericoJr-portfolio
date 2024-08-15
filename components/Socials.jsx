import Link from "next/link"

import { FaGithub, FaLinkedinIn, FaInstagram, FaDev } from "react-icons/fa"

const socials = [
  { icon: <FaGithub />, path: "https://github.com/AlbericoJr" },
  { icon: <FaLinkedinIn />, path: "https://www.linkedin.com/in/alberico-junior/" },
  { icon: <FaInstagram />, path: "https://www.instagram.com/dev.junior_/" },
  { icon: <FaDev />, path: "https://dev.to/albericojr" },
]

const Socials = ({ containerSyles, iconStyles }) => {
  return (
    <div className={containerSyles}>
      {socials.map((item, index) => {
        return (
          <Link key={index} href={item.path} target="_blank" className={iconStyles}>
            {item.icon}
          </Link>
        )
      })}
    </div>
  )
}

export default Socials

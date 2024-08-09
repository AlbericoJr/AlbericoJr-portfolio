import Link from "next/link"

import { FaGithub, FaYoutube, FaTwitter, FaLinkedinIn } from "react-icons/fa"

const socials = [
  { icon: <FaGithub />, path: "https://github.com" },
  { icon: <FaLinkedinIn />, path: "https://linkedin.com" },
  { icon: <FaYoutube />, path: "" },
  { icon: <FaTwitter />, path: "" },
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

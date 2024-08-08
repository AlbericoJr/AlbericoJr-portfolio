import { Button } from "@/components/ui/button"
import { FiDownload } from "react-icons/fi"

// components
import Socials from "@/components/Socials"

const page = () => {
  return (
    <section>
      <div className="container mx-auto h-full">
        <div className="flex flex-col xl:flex-row items-center justify-between xl:pt-8 xl:pb-24">
          <div className="text-center xl:text-left">
            <span className="text-xl">Web Developer</span>
            <h1 className="h1 mb-6">
              Hello I'm <br /> <span className="text-accent">Albérico Jr.</span>
            </h1>
            <p className="max-w-[500px] mb-9 text-white/80">
              Sou web Developer, cursando a graduação em Sistema de informação,
              com experiência em administração de software, com habilidade em
              HTML, CSS, JavaScript, Bootstrap, Sass, Tailwind CSS, React,
              Python e UX/UI Design.
            </p>
            {/* btn socials */}
            <div className="flex flex-col xl:flex-row items-center gap-8">
              <Button
                variant="outline"
                size="lg"
                className="uppercase flex items-center gap-2"
              >
                <a
                  href="/AlbericoJr.pdf"
                  download="AlbericoJr.pdf"
                  className="flex items-center gap-2"
                >
                  <span>Download CV</span>
                  <FiDownload className="text-xl" />
                </a>
              </Button>
              <div className="mb-8 xl:mb-0">
                <Socials containerSyles="flex gap-6" iconStyles="w-9 h-9 border border-accent rounded-full flex justify-center items-center text-accent text-base hover:bg-accent hover:text-primary hover:transition-all duration-500"/>
              </div>
            </div>
          </div>
          <div>text</div>
        </div>
      </div>
    </section>
  )
}

export default page


// https://youtu.be/dImgZ_AH7uA?si=OfaGO0HSF-0GDyZ_
// 1:02:03
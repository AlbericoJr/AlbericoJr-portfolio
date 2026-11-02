// CSS-only transition: avoid hydrating a motion library just for page fade.
export default function PageTransition({children}){
 return <div className="portfolio-page-enter">{children}</div>
}

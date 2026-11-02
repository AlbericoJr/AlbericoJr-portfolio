const base="https://albericojr-portfolio-xi.vercel.app"
export default function sitemap(){return ["/","/work","/services","/resume","/contact"].map(path=>({url:base+path,changeFrequency:"monthly",priority:path==="/"?1:0.7}))}

export const blogName = "DevBlog";
export const siteUrl = "https://albericojr-portfolio-xi.vercel.app";
export const categories = ["Desenvolvimento Web","Mobile","Inteligência Artificial","Carreira","UI/UX","Radar TECH","Empreendedorismo"];
export const posts = [];
export function publishedPosts(){return posts.filter(p=>p.published===true).sort((a,b)=>b.date.localeCompare(a.date))}
export function readingTime(post){return Math.max(1,Math.ceil(post.sections.map(s=>s.text).join(" ").trim().split(/\s+/).length/200))}
export function findPost(slug){return publishedPosts().find(p=>p.slug===slug)}

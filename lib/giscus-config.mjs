// IDs de Discussions são públicos. Não coloque tokens de autenticação neste arquivo.
export function isGiscusConfigured(category,categoryId){
 return typeof category==="string" && category.trim().length>0 && category.length<=100
   && typeof categoryId==="string" && /^DIC_[A-Za-z0-9_-]+$/.test(categoryId);
}

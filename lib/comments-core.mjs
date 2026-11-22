export const COMMENTS_MAX_LENGTH=1200;
export const COMMENTS_PAGE_SIZE=20;
export const COMMENTS_KEY_PREFIX="devblog:comments:v1";
export const validSlug=slug=>typeof slug==="string"&&slug.length<=120&&/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug);
export const validId=id=>typeof id==="string"&&/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);
export function normalizeComment(input){
 if(typeof input!=="string")return null;
 const value=input.trim().normalize("NFC");
 if(value.length<10||value.length>COMMENTS_MAX_LENGTH||/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/.test(value))return null;
 return value;
}
export function enabledConfig(env=process.env){
 const url=env.UPSTASH_REDIS_REST_URL,token=env.UPSTASH_REDIS_REST_TOKEN;
 const siteKey=env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,secret=env.TURNSTILE_SECRET_KEY,admin=env.COMMENTS_ADMIN_SECRET;
 let safeUrl=false;
 try{const u=new URL(url);safeUrl=u.protocol==="https:"&&!u.username&&!u.password;}catch{}
 return env.COMMENTS_ENABLED==="true"&&safeUrl&&!!token&&!!siteKey&&!!secret&&!!admin&&admin.length>=24;
}
export function sameOrigin(request){
 try {
  const origin=request.headers.get("origin");
  if(!origin)return false;
  const o=new URL(origin),u=new URL(request.url);
  return o.protocol==="https:"||u.hostname==="localhost"||u.hostname==="127.0.0.1"
    ? o.origin===u.origin : false;
 }catch{return false;}
}

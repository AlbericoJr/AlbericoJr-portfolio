import {createHash,createHmac,timingSafeEqual} from "node:crypto";

export const ADMIN_COOKIE="devblog-comments-admin";
const digest=value=>createHash("sha256").update(value).digest();
const equal=(a,b)=>a.length===b.length&&timingSafeEqual(a,b);

export function validAdminPassword(password,secret=process.env.COMMENTS_ADMIN_SECRET){
 return typeof password==="string"&&typeof secret==="string"&&secret.length>=24
   &&equal(digest(password),digest(secret));
}
export function signSession(secret=process.env.COMMENTS_ADMIN_SECRET,now=Date.now()){
 if(!secret||secret.length<24)throw new Error("Admin not configured");
 const expires=Math.floor(now/1000)+60*60*6;
 const payload="v1."+expires;
 const signature=createHmac("sha256",secret).update(payload).digest("base64url");
 return {token:payload+"."+signature,maxAge:60*60*6};
}
export function validSession(cookie,secret=process.env.COMMENTS_ADMIN_SECRET,now=Date.now()){
 if(typeof cookie!=="string"||typeof secret!=="string"||secret.length<24)return false;
 const match=/^v1\.(\d{10})\.([A-Za-z0-9_-]+)$/.exec(cookie);
 if(!match)return false;
 const expires=Number(match[1]),present=Math.floor(now/1000);
 if(expires<=present||expires>present+60*60*6)return false;
 const payload="v1."+match[1];
 const expected=createHmac("sha256",secret).update(payload).digest("base64url");
 return equal(Buffer.from(expected),Buffer.from(match[2]));
}
export function isAdmin(request){
 return validSession(request.cookies?.get(ADMIN_COOKIE)?.value);
}

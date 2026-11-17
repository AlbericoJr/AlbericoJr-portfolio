import BlogCode from "./BlogCode";
import BlogArticleImage from "./BlogArticleImage";
export function RichText({items=[]}){return items.map((item,i)=>{let node=item.text;if(item.code)node=<code className="rounded bg-black/30 px-1 text-accent">{node}</code>;if(item.bold)node=<strong>{node}</strong>;if(item.italic)node=<em>{node}</em>;if(item.underline)node=<u>{node}</u>;if(item.strikethrough)node=<s>{node}</s>;if(item.href)node=<a href={item.href} target="_blank" rel="noopener noreferrer" className="break-words text-accent underline">{node}</a>;return <span key={i}>{node}</span>})}
export function headings(blocks=[]){return blocks.flatMap(b=>[...(/^heading_[123]$/.test(b.type)?[{id:b.id,text:b.text.map(t=>t.text).join("")}]:[]),...headings(b.children)])}
function Block({b}){const text=<RichText items={b.text}/>,children=b.children?.length?<BlogContent blocks={b.children}/>:null;switch(b.type){
case "heading_1":case "heading_2":return <><h2 id={b.id} className="h3 mt-8 scroll-mt-8">{text}</h2>{children}</>;
case "heading_3":return <><h3 id={b.id} className="mt-6 scroll-mt-8 text-lg font-semibold">{text}</h3>{children}</>;
case "paragraph":return <><p className="whitespace-pre-wrap break-words">{text}</p>{children}</>;
case "quote":return <blockquote className="border-l-4 border-accent pl-4 italic">{text}{children}</blockquote>;
case "callout":return <aside className="site-card p-4">{text}{children}</aside>;
case "toggle":return <details className="site-card p-4"><summary className="cursor-pointer">{text}</summary>{children}</details>;
case "to_do":return <div className="flex items-start gap-2"><span aria-label={b.checked?"Concluído":"Pendente"}>{b.checked?"☑":"☐"}</span><div>{text}{children}</div></div>;
case "divider":return <hr className="border-white/15"/>;
case "image":return b.url?<BlogArticleImage src={b.url} caption={b.caption.map(t=>t.text).join("")}/>:null;
case "code":return <><BlogCode code={b.code} language={b.language}/>{b.caption?.length>0&&<p className="text-sm text-white/60"><RichText items={b.caption}/></p>}</>;
case "bookmark":return b.url?<a href={b.url} className="block break-all text-accent underline" target="_blank" rel="noopener noreferrer">{b.caption?.length?<RichText items={b.caption}/>:b.url}</a>:null;
case "table":return <div className="overflow-x-auto rounded-lg border border-white/15" tabIndex={0} aria-label="Tabela"><table className="w-full border-collapse text-sm"><tbody>{b.children.map((r,i)=><tr key={r.id}>{(r.cells||[]).map((cell,j)=>{const header=(i===0&&b.header)||(j===0&&b.rowHeader);const Tag=header?"th":"td";return <Tag key={j} scope={header?(i===0&&b.header?"col":"row"):undefined} className={"border border-white/15 p-3 text-left "+(header?"bg-white/10 font-semibold":"")}><RichText items={cell}/></Tag>})}</tr>)}</tbody></table></div>;
default:return null}}
export default function BlogContent({blocks=[]}){const groups=[];for(const b of blocks){const list=/^(bulleted|numbered)_list_item$/.test(b.type);const previous=groups.at(-1);if(list&&previous?.type===b.type)previous.items.push(b);else groups.push({type:b.type,items:[b]});}return <div className="space-y-4 text-white/80">{groups.map(g=>{const b=g.items[0];if(/^(bulleted|numbered)_list_item$/.test(g.type)){const Tag=g.type==="bulleted_list_item"?"ul":"ol";return <Tag key={b.id} className={"space-y-2 pl-6 "+(Tag==="ul"?"list-disc":"list-decimal")}>{g.items.map(item=><li key={item.id}><RichText items={item.text}/>{item.children.length>0&&<BlogContent blocks={item.children}/>}</li>)}</Tag>}return <Block key={b.id} b={b}/>})}</div>}

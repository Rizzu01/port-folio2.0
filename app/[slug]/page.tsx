import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";

type Service = {
  eyebrow: string;
  title: string;
  intro: string;
  offerings: string[];
  process: { title: string; text: string }[];
  focus: string[];
  note: string;
};
const pages: Record<string,Service> = {
  "ui-ux-design": {
    eyebrow:"UI/UX & PRODUCT DESIGN",title:"Experiences made to feel effortless.",
    intro:"I work across visual design and digital experiences, bringing structure to interfaces and helping turn complex product ideas into clear, consistent user journeys. Explore my portfolio to see UI/UX and web design work.",
    offerings:["User flows and information architecture","Wireframes and interface layouts","Responsive web and mobile UI","Visual systems and component consistency","Usability-minded design refinement","Fintech and crypto product interfaces"],
    process:[{title:"Understand",text:"Clarify the audience, product goals, constraints and user needs before choosing a direction."},{title:"Structure",text:"Organize content and journeys into understandable flows, layouts and interface priorities."},{title:"Design & refine",text:"Develop a consistent visual language and refine responsive screens against the original goals."}],
    focus:["Product UI Design","Web App Interface Design","Responsive UI","Fintech UX"],
    note:"My portfolio includes UI/UX and web design work alongside creative campaigns. Visit the selected work section for project visuals and professional context; each project should be evaluated against its actual scope and role."
  },
  "graphic-design":{
    eyebrow:"GRAPHIC & VISUAL DESIGN",title:"Visuals that have something to say.",
    intro:"From campaign graphics to digital marketing creatives, strong graphic design makes a message easier to notice and understand. My portfolio brings together visual communication, creative direction and production-ready design work.",
    offerings:["Social media campaign creatives","Digital marketing graphics","Promotional banners and mailers","Typography and visual hierarchy","Campaign systems and creative variations","Presentation and marketing visuals"],
    process:[{title:"Find the message",text:"Understand the audience, communication goal, format and key information the design needs to carry."},{title:"Build the concept",text:"Explore composition, typography, imagery and a visual direction suited to the campaign."},{title:"Prepare the assets",text:"Refine the layout for its intended format and keep visual consistency across related deliverables."}],
    focus:["Social Media Design","Digital Marketing Creatives","Campaign Design","Visual Communication"],
    note:"The portfolio features crypto campaigns, social media creatives and other visual design work. Review the homepage projects for examples, and contact me with a brief, timeline and intended deliverables."
  },
  "web-design":{
    eyebrow:"WEB DESIGN & DEVELOPMENT",title:"Web experiences worth staying for.",
    intro:"A good website balances brand expression, clear information and a smooth experience across screen sizes. My work spans web design, interface design and frontend implementation, with a focus on bringing the visual idea and the actual experience together.",
    offerings:["Responsive page layouts","Landing page visual design","Website information hierarchy","Typography and spacing systems","UI details and interaction states","Design-to-development collaboration"],
    process:[{title:"Set the direction",text:"Define the audience, purpose, content priorities and visual character of the website."},{title:"Design the experience",text:"Create a clear layout with responsive behavior, readable typography and consistent components."},{title:"Review across screens",text:"Check hierarchy and usability at desktop and mobile sizes and refine details before handoff or release."}],
    focus:["Website UI Design","Responsive Web Design","Landing Page Design","Frontend Design"],
    note:"My portfolio includes UI/UX and web design work. Visit the selected projects on the homepage to see the visual examples available, and ask about project scope, deliverables and implementation needs."
  },
  "branding":{
    eyebrow:"BRANDING & IDENTITY",title:"Identity with an unmistakable point of view.",
    intro:"Branding is more than a logo. It is the combination of visual choices that helps a business communicate with consistency across touchpoints. I approach identity work through concept, typography, color, layout and practical applications.",
    offerings:["Visual identity exploration","Logo and mark applications","Color and typography direction","Brand collateral and templates","Social and campaign consistency","Brand presentation mockups"],
    process:[{title:"Understand the brand",text:"Clarify the audience, positioning, personality and practical contexts where the identity will appear."},{title:"Explore the system",text:"Develop a visual direction through typography, color, graphic language and identity applications."},{title:"Apply consistently",text:"Check how the system works across relevant assets and document practical usage where required."}],
    focus:["Brand Identity","Logo Design","Visual Identity","Creative Direction"],
    note:"Explore the portfolio to review available work and discuss the specific identity assets needed for your project."
  },
  "fintech-crypto-design":{
    eyebrow:"FINTECH & CRYPTO DESIGN",title:"Making complex products feel clear.",
    intro:"Financial products need clear interfaces and visual communication that respects the complexity of the subject. My portfolio includes crypto campaign creative work alongside UI/UX, web design and digital marketing assets.",
    offerings:["Crypto campaign and promotional creatives","Exchange and product UI concepts","Social media campaign systems","Educational and marketing banners","Fintech visual communication","Brand-consistent digital assets"],
    process:[{title:"Clarify the audience",text:"Understand whether the asset needs to explain a product, support a campaign or guide a user through an interface."},{title:"Make the message clear",text:"Prioritize information, visual hierarchy and a coherent style for the intended channel."},{title:"Keep it consistent",text:"Align the design with brand rules and adapt the work to its relevant placements and screen sizes."}],
    focus:["Fintech UI/UX","Crypto Graphic Design","Crypto Campaign Design","Fintech Visual Design"],
    note:"The portfolio features crypto campaign work and UI/UX & web design categories. Any results, performance metrics or product claims should be confirmed before publication."
  },
};
export function generateStaticParams(){return Object.keys(pages).map(slug=>({slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{
 const {slug}=await params;const p=pages[slug];return {title:p?p.eyebrow+" | CreativeRizz":"Not Found",description:p?.intro,robots:{index:false,follow:false}};
}
function SectionTitle({number,children}:{number:string;children:ReactNode}){return <h2 className="detail-section-title"><span>{number}</span>{children}</h2>;}
export default async function ServicePage({params}:{params:Promise<{slug:string}>}){
 const {slug}=await params;const p=pages[slug];
 if(!p){const {notFound}=await import("next/navigation");notFound();}
 return <main className="detail-page"><header className="detail-nav"><Link href="/" className="detail-brand">✳ CREATIVE<span>RIZZ.</span></Link><Link href="/#expertise" className="detail-return">← BACK TO PORTFOLIO</Link></header>
 <section className="detail-hero"><div className="detail-kicker"><span>EXPERTISE / {p.eyebrow}</span><span>RIZWAN KHAN · DESIGNER</span></div><h1>{p.title}</h1><div className="detail-intro"><p>{p.intro}</p><a className="detail-contact" href="mailto:creativerizz.in@gmail.com?subject=CreativeRizz%20project%20enquiry">LET'S DISCUSS A PROJECT ↗</a></div><span className="detail-decoration" aria-hidden="true">✳</span></section>
 <section className="detail-section"><SectionTitle number="01 /">What I can help with</SectionTitle><div className="detail-offerings">{p.offerings.map((x,i)=><div key={x}><span>{String(i+1).padStart(2,"0")}</span><h3>{x}</h3><span>↗</span></div>)}</div></section>
 <section className="detail-section detail-process"><SectionTitle number="02 /">How I approach the work</SectionTitle><div className="detail-process-grid">{p.process.map((x,i)=><article key={x.title}><span>0{i+1}</span><h3>{x.title}</h3><p>{x.text}</p></article>)}</div></section>
 <section className="detail-section"><SectionTitle number="03 /">Areas of focus</SectionTitle><div className="detail-focus">{p.focus.map(x=><span key={x}>{x} ↗</span>)}</div><p className="detail-note">{p.note}</p></section>
 <section className="detail-next"><span>HAVE AN IDEA?</span><h2>Let's build something <em>worth remembering.</em></h2><a href="mailto:creativerizz.in@gmail.com?subject=CreativeRizz%20project%20enquiry">START A CONVERSATION ↗</a></section><footer className="detail-footer"><Link href="/">✳ CREATIVE RIZZ.</Link><span>© 2026 RIZWAN KHAN</span></footer></main>;
}

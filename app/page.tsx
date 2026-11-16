"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";

type Category = "Social Media Posts" | "UI/UX Designs" | "Printed Designs";
type Pin = { id:string; title:string; description?:string; imageUrl:string; imageWidth?:number; imageHeight?:number; pinUrl:string; category:Category };
const categories: Category[] = ["Social Media Posts","UI/UX Designs","Printed Designs"];
const SOCIALS = [
  { name:"LinkedIn", url:"https://www.linkedin.com/in/rizwan-khan-44771826b/" },
  { name:"Behance", url:"https://www.behance.net/creativeriz01" },
  { name:"Pinterest", url:"https://in.pinterest.com/Creative___Rizz/" },
];
const SERVICES = [
  { number:"01", name:"Digital products", type:"UI / UX DESIGN", detail:"Wireframes, intuitive user journeys, mobile apps and product interface systems.", symbol:"◎", link:"/ui-ux-design" },
  { number:"02", name:"Visual narratives", type:"GRAPHIC DESIGN", detail:"Brand campaigns, social media visuals, banners, mailers and creative direction.", symbol:"✳", link:"/graphic-design" },
  { number:"03", name:"Web experiences", type:"WEB DESIGN", detail:"Responsive websites, landing pages, frontend implementation and interaction design.", symbol:"↗", link:"/web-design" },
  { number:"04", name:"Identity systems", type:"BRANDING", detail:"Logo applications, visual identities, brand assets and cohesive design languages.", symbol:"◈", link:"/branding" },
];
const CAREER = [
  { company:"SunCrypto", role:"Graphic Designer & UI/UX Designer", date:"NOV 2024 — PRESENT", note:"Campaign design, brand communication, email marketing and digital experiences." },
  { company:"Doomshell Software Pvt. Ltd.", role:"Graphic Designer & UI/UX Designer", date:"2023 — 2024", note:"Responsive interfaces, functional layouts and usability improvements." },
  { company:"TDI Online Services", role:"Graphic Designer", date:"2022 — 2023", note:"Digital marketing creatives, branding and visual communication." },
];
function Arrow({ diagonal=false }: {diagonal?:boolean}) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={diagonal ? "M5 19 19 5M7 5h12v12" : "M4 12h16m-7-7 7 7-7 7"}/></svg>;
}
function IndexTag({index, label}:{index:string;label:string}) {
  return <div className="index-tag"><span>{index}</span><span>{label}</span></div>;
}
export default function Home(){
  const [menuOpen,setMenuOpen]=useState(false);
  const [modal,setModal]=useState(false);
  const [active,setActive]=useState<Category>("Social Media Posts");
  const [pins,setPins]=useState<Pin[]>([]);
  const [feedState,setFeedState]=useState<"loading"|"ready"|"empty">("loading");
  const [selected,setSelected]=useState<Pin|null>(null);
  const [status,setStatus]=useState<"idle"|"sending"|"sent"|"error">("idle");
  const [purpose,setPurpose]=useState("");
  const [clock,setClock]=useState("JAIPUR, INDIA");
  const root=useRef<HTMLDivElement>(null);
  useEffect(()=>{
    const controller=new AbortController();
    fetch("/api/projects",{signal:controller.signal}).then(r=>r.json()).then(d=>{
      if(controller.signal.aborted)return;
      const list=Array.isArray(d.pins)?d.pins.filter((p:Pin)=>p?.imageUrl&&p?.pinUrl):[];
      setPins(list); setFeedState(list.length?"ready":"empty");
    }).catch(()=>{if(!controller.signal.aborted)setFeedState("empty");});
    return ()=>controller.abort();
  },[]);
  useEffect(()=>{
    const update=()=>setClock(new Intl.DateTimeFormat("en-IN",{timeZone:"Asia/Kolkata",hour:"2-digit",minute:"2-digit",hour12:false}).format(new Date())+" IST / JAIPUR");
    update();const id=window.setInterval(update,60000);return()=>window.clearInterval(id);
  },[]);
  useEffect(()=>{
    const els=root.current?.querySelectorAll<HTMLElement>(".reveal");
    if(!els)return;
    if(!("IntersectionObserver" in window)){els.forEach(e=>e.classList.add("visible"));return;}
    const obs=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add("visible");obs.unobserve(e.target);}}),{threshold:.09});
    els.forEach(e=>obs.observe(e));return()=>obs.disconnect();
  },[feedState,active]);
  useEffect(()=>{
    document.body.style.overflow=modal||selected?"hidden":"";
    const handle=(e:KeyboardEvent)=>{if(e.key==="Escape"){setModal(false);setSelected(null);}};
    window.addEventListener("keydown",handle);return()=>{document.body.style.overflow="";window.removeEventListener("keydown",handle);};
  },[modal,selected]);
  async function send(e:FormEvent<HTMLFormElement>){
    e.preventDefault();setStatus("sending");
    try {
      const form=new FormData(e.currentTarget);
      form.set("access_key","b7401cb5-7c06-4ff0-863e-cf86c6d2eb11");
      form.set("subject","CreativeRizz 2.0 — Portfolio enquiry: "+purpose);
      form.set("from_name","CreativeRizz Portfolio");
      const res=await fetch("https://api.web3forms.com/submit",{method:"POST",body:form,headers:{Accept:"application/json"}});
      const data=await res.json();
      if(!res.ok||!data.success)throw new Error("Submission failed");
      setStatus("sent");
    }catch{setStatus("error");}
  }
  const filtered=pins.filter(p=>p.category===active);
  return <div className="site" ref={root}>
    <div className="noise" aria-hidden="true"/>
    <header className="topbar">
      <a className="wordmark" href="#top" aria-label="CreativeRizz home"><span className="logo-spark">✳</span> creative<span className="mark-outline">rizz</span><span className="logo-dot">.</span></a>
      <nav className={"navlinks"+(menuOpen?" show":"")} aria-label="Main navigation">
        <a onClick={()=>setMenuOpen(false)} href="#work">Work</a>
        <a onClick={()=>setMenuOpen(false)} href="#about">About</a>
        <a onClick={()=>setMenuOpen(false)} href="#expertise">Expertise</a>
        <a onClick={()=>setMenuOpen(false)} href="#experience">Experience</a>
        <a onClick={()=>setMenuOpen(false)} href="#contact">Contact</a>
      </nav>
      <div className="nav-actions"><span className="availability"><i/> AVAILABLE FOR WORK</span><button className="nav-cta" onClick={()=>setModal(true)}>LET'S TALK <Arrow diagonal/></button><button className="menu-button" aria-label={menuOpen?"Close menu":"Open menu"} aria-expanded={menuOpen} onClick={()=>setMenuOpen(!menuOpen)}>{menuOpen?"✕":"☰"}</button></div>
    </header>
    <main>
      <section id="top" className="hero">
        <div className="hero-topline"><span>INDEPENDENT DESIGNER / CREATIVE THINKER</span><span>{clock}</span></div>
        <div className="hero-layout">
          <div className="hero-main">
            <div className="hero-label"><span className="asterisk">✳</span> HELLO, I'M RIZWAN KHAN</div>
            <h1>Designing<br/><span>what's</span> <em>next<span className="accent-period">.</span></em></h1>
            <p className="hero-description">I’m a <strong>UI/UX & graphic designer</strong> based in Jaipur, India. I turn complex ideas into intuitive digital products, bold visuals and brands that people remember.</p>
            <div className="hero-buttons"><a className="pill pill-lime" href="#work">EXPLORE MY WORK <Arrow diagonal/></a><button className="pill pill-border" onClick={()=>setModal(true)}>START A PROJECT <Arrow/></button></div>
          </div>
          <div className="hero-visual">
            <div className="image-grid" aria-hidden="true"/><div className="visual-orbit orbit-one"/><div className="visual-orbit orbit-two"/>
            <div className="portrait-backdrop"></div>
            <img src="https://www.creativerizz.in/portrait.png" alt="Rizwan Khan — UI/UX and graphic designer" className="hero-portrait"/>
            <div className="float-chip chip-left"><span>◉</span><small>THINK<br/>DIFFERENT</small></div>
            <div className="float-chip chip-right"><span>↗</span><small>MAKE<br/>IT MATTER</small></div>
            <div className="visual-number">01 / 04</div>
          </div>
        </div>
        <div className="hero-bottom"><div className="scroll-prompt"><span className="scroll-line"/>SCROLL TO EXPLORE</div><div className="hero-stats"><span><strong>4+</strong> YEARS OF EXPERIENCE</span><span><strong>∞</strong> CURIOSITY</span></div><span className="hero-coordinate">26.9124° N · 75.7873° E</span></div>
      </section>
      <div className="ticker" aria-hidden="true"><div className="ticker-content">{Array.from({length:4},(_,i)=><span key={i}>DESIGN WITH INTENT <b>✳</b> CREATE WITH PURPOSE <b>✳</b> THINK BEYOND PIXELS <b>✳</b></span>)}</div></div>
      <section className="section work-section" id="work">
        <div className="section-top reveal"><IndexTag index="01 /" label="FEATURED PORTFOLIO"/><span className="tiny-intro">A CURATED SELECTION OF REAL PROJECTS</span></div>
        <div className="section-heading reveal"><h2>Selected <em>work.</em></h2><p>Thoughtful design, striking execution. A look at the visuals and experiences I've created.</p></div>
        <div className="work-tabs" role="tablist" aria-label="Portfolio categories">{categories.map(c=><button key={c} role="tab" aria-selected={active===c} className={active===c?"active":""} onClick={()=>setActive(c)}>{c}<span>{active===c?"↗":"+"}</span></button>)}</div>
        {feedState==="loading"?<div className="portfolio-state">LOADING SELECTED WORK <span className="pulse-dots">•••</span></div>:filtered.length?
        <div className="work-grid">{filtered.slice(0,6).map((p,i)=><button className={"work-card reveal work-card-"+i} key={p.id} onClick={()=>setSelected(p)}>
          <div className="work-image"><img src={p.imageUrl} alt={p.title} loading="lazy"/><span className="card-open"><Arrow diagonal/></span><span className="card-index">PROJECT / {String(i+1).padStart(2,"0")}</span></div>
          <div className="work-caption"><div><h3>{p.title}</h3><p>{p.category} / CreativeRizz</p></div><span>↗</span></div>
        </button>)}</div>:
        <div className="portfolio-state"><span className="empty-mark">↗</span><h3>No live projects available in this category.</h3><p>View real work directly on the CreativeRizz Pinterest profile.</p><a href="https://in.pinterest.com/Creative___Rizz/" target="_blank" rel="noopener noreferrer">VIEW PINTEREST <Arrow diagonal/></a></div>}
        <div className="section-end"><a className="text-link" href="https://in.pinterest.com/Creative___Rizz/" target="_blank" rel="noopener noreferrer">EXPLORE THE FULL PORTFOLIO <Arrow diagonal/></a><span>THE WORK SPEAKS FOR ITSELF.</span></div>
      </section>
      <section className="statement" id="about">
        <div className="statement-grid" aria-hidden="true"/><div className="statement-top"><IndexTag index="02 /" label="THE THINKING"/><span>LESS NOISE. MORE MEANING.</span></div>
        <h2 className="reveal">Good design isn't just<br/>how it <em>looks.</em> It's how<br/>it <span>feels<span className="accent-period">.</span></span></h2>
        <div className="statement-bottom reveal"><span className="statement-symbol">✳</span><p>I'm Rizwan — a UI/UX and graphic designer with 4+ years of experience creating clear digital experiences and memorable visual communication. I care about the small details, the bigger picture, and making every design decision serve a purpose.</p><a className="outline-round" href="#expertise" aria-label="Explore expertise"><Arrow diagonal/></a></div>
      </section>
      <section id="expertise" className="section expertise-section">
        <div className="section-top reveal"><IndexTag index="03 /" label="WHAT I DO"/><span className="tiny-intro">A BLEND OF LOGIC & IMAGINATION</span></div>
        <div className="section-heading reveal"><h2>Ways I can <em>help.</em></h2><p>From first sketch to final pixel — practical design solutions with personality.</p></div>
        <div className="service-list">{SERVICES.map(s=><a className="service-row reveal" href={s.link} key={s.number}><span className="service-index">{s.number}</span><div className="service-title"><small>{s.type}</small><h3>{s.name}</h3></div><p>{s.detail}</p><span className="service-symbol">{s.symbol}</span><span className="service-arrow"><Arrow diagonal/></span></a>)}</div>
        <div className="expertise-footer"><span>ALSO EXPLORING FINTECH & CRYPTO DIGITAL EXPERIENCES</span><a href="/fintech-crypto-design">VIEW SPECIALISM ↗</a></div>
      </section>
      <section className="about-image-section">
        <div className="about-image"><img src="https://www.creativerizz.in/About.png" alt="Rizwan Khan working on design" loading="lazy"/><div className="about-image-label">ALWAYS CURIOUS. NEVER STATIC.</div></div>
        <div className="about-text"><span className="eyebrow">THE PERSON BEHIND THE PIXELS</span><h2>Curiosity is<br/>my <em>superpower.</em></h2><p>I design for the moments when clarity meets emotion. Whether it's a product interface, campaign graphic, brand identity or website, I build visual experiences that communicate with purpose.</p><div className="about-values"><div><strong>01</strong><span>THINK WITH CLARITY</span></div><div><strong>02</strong><span>DESIGN WITH PURPOSE</span></div><div><strong>03</strong><span>CARE ABOUT DETAILS</span></div></div><a className="text-link" href="#contact">LET'S CREATE SOMETHING <Arrow diagonal/></a></div>
      </section>
      <section className="section experience-section" id="experience">
        <div className="section-top reveal"><IndexTag index="04 /" label="MY JOURNEY"/><span className="tiny-intro">BUILT THROUGH REAL-WORLD WORK</span></div>
        <div className="section-heading reveal"><h2>Experience <em>matters.</em></h2><p>Four-plus years of designing, collaborating, experimenting and shipping creative work.</p></div>
        <div className="career-list">{CAREER.map((c,i)=><div className="career-row reveal" key={c.company}><span className="career-number">0{i+1}</span><div><h3>{c.company}</h3><p>{c.role}</p><small>{c.note}</small></div><span className="career-date">{c.date}</span><span className="career-arrow">↗</span></div>)}</div>
      </section>
      <section id="contact" className="contact-section"><div className="contact-bg" aria-hidden="true">✳</div><div className="contact-inner"><div className="contact-head"><IndexTag index="05 /" label="LET'S CONNECT"/><span><i className="green-dot"/> OPEN TO NEW PROJECTS</span></div><p className="contact-lead">HAVE SOMETHING IN MIND?</p><h2>Let's make<br/><em>it happen.</em><span className="accent-period">↗</span></h2><div className="contact-bottom"><button className="contact-big-button" onClick={()=>setModal(true)}>START A CONVERSATION <Arrow diagonal/></button><a href="mailto:creativerizz.in@gmail.com">creativerizz.in@gmail.com</a></div></div></section>
    </main>
    <footer className="footer"><a className="footer-brand" href="#top">CREATIVE<span>RIZZ.</span></a><div className="footer-socials">{SOCIALS.map(s=><a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer">{s.name} ↗</a>)}</div><span>© 2026 RIZWAN KHAN · MADE WITH INTENT</span><a className="back-top" href="#top">BACK TO TOP ↑</a></footer>
    {selected&&<div className="overlay" onMouseDown={e=>{if(e.target===e.currentTarget)setSelected(null)}}><div className="project-modal" role="dialog" aria-modal="true" aria-label={selected.title}><button className="close-modal" onClick={()=>setSelected(null)} aria-label="Close">✕</button><div className="project-modal-img"><img src={selected.imageUrl} alt={selected.title}/></div><div className="project-modal-info"><span className="eyebrow">{selected.category}</span><h3>{selected.title}</h3><p>{selected.description||"Selected creative work by Rizwan Khan."}</p><a className="pill pill-lime" href={selected.pinUrl} target="_blank" rel="noopener noreferrer">VIEW ON PINTEREST <Arrow diagonal/></a></div></div></div>}
    {modal&&<div className="overlay" onMouseDown={e=>{if(e.target===e.currentTarget)setModal(false)}}><section className="contact-modal" role="dialog" aria-modal="true" aria-label="Contact Rizwan Khan"><button className="close-modal" onClick={()=>{setModal(false);setStatus("idle")}} aria-label="Close contact form">✕</button><div className="form-head"><span className="eyebrow">/ START SOMETHING GOOD</span><h2>Tell me about <em>your idea.</em></h2><p>Share a few details and I'll get back to you.</p></div>{status==="sent"?<div className="form-success"><span>✓</span><h3>Message sent!</h3><p>Thanks for reaching out. I’ll get back to you soon.</p><button className="pill pill-lime" onClick={()=>{setModal(false);setStatus("idle")}}>BACK TO PORTFOLIO <Arrow/></button></div>:<form onSubmit={send} className="contact-form"><input name="botcheck" type="checkbox" tabIndex={-1} className="honeypot" aria-hidden="true"/><label>YOUR NAME<input name="name" placeholder="What's your name?" required autoComplete="name"/></label><label>EMAIL ADDRESS<input name="email" type="email" placeholder="you@example.com" required autoComplete="email"/></label><label>PHONE NUMBER<input name="phone" type="tel" placeholder="+91 98765 43210" required autoComplete="tel"/></label><label>WHAT'S THE PROJECT?<select name="purpose" value={purpose} required onChange={e=>setPurpose(e.target.value)}><option value="" disabled>Choose a service</option>{["UI/UX Design","Visual Design","Print Ready Design","Branding","Website / Development","Freelance Collaboration","Other"].map(x=><option key={x}>{x}</option>)}</select></label>{status==="error"&&<p className="form-error">Something went wrong. Please try again or email directly.</p>}<button className="form-submit" disabled={status==="sending"}>{status==="sending"?"SENDING...":"SEND YOUR MESSAGE"} <Arrow diagonal/></button></form>}</section></div>}
  </div>;
}

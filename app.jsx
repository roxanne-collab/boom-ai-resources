// Boom Business Solutions — GMID 2026 landing page
// Built around Roxanne's "You can just talk to it." talk + AI Foundations program
// Brand: Onyx, White, Sapphire only. Catamaran type (Atten New stand-in).

const { useState, useEffect, useRef } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "layout": "split",
  "showPrompts": true,
  "heroEmphasis": "talk",
  "darkSections": true
}/*EDITMODE-END*/;

// ──────────────────────────────────────────────────────────────────────────
// The seven prompts from the talk

const PROMPTS = [
  { n: '01', label: 'The Universal Starter', tag: 'IF YOU ONLY REMEMBER ONE',
    text: "Here's what I'm dealing with. I'm not sure what I need yet. Can you help me figure out where to start?" },
  { n: '02', label: 'From Scratch', tag: "WHEN YOU'RE STARTING FROM ZERO",
    text: "I'm working on X and I don't know where to start. Can you ask me questions to help me figure out the right first step?" },
  { n: '03', label: 'The Blind-Spot Check', tag: "FOR THE THINGS YOU'RE MISSING",
    text: "What am I probably forgetting or underestimating?" },
  { n: '04', label: 'Top 0.1%', tag: 'BRUTAL IN THE BEST WAY',
    text: "What would a top 0.1% person in this field think of this?" },
  { n: '05', label: 'Reframe', tag: 'WHEN YOU NEED A NEW ANGLE',
    text: "Reframe this in a way that challenges how I see the problem." },
  { n: '06', label: 'Accuracy Check', tag: "ROXANNE'S FAVOURITE",
    text: "At the end of your answer, give me an accuracy rating. If it's not 100% accurate, list the other possible answers and why you excluded them." },
  { n: '07', label: 'Cite the Source', tag: 'THE ACCURACY CHECK, PART 2',
    text: "Cite the source. Give me a list of every fact you relied on." },
];

// ──────────────────────────────────────────────────────────────────────────
// Global styles — Boom brand: Onyx / White / Sapphire only

const CSS = `
  *,*::before,*::after{box-sizing:border-box}
  html,body{margin:0;padding:0}

  :root{
    --onyx:#0E0E10;
    --onyx-90:#1B1B1E;
    --onyx-70:#3A3A3F;
    --onyx-50:#76767A;
    --onyx-30:#B5B5B7;
    --onyx-10:#E6E6E7;
    --paper:#FFFFFF;
    --paper-tint:#F7F7F8;
    --sapphire:#008EAA;
    --sapphire-tint:#E6F3F6;
    --sapphire-deep:#006B80;
  }

  body{
    background:var(--paper);
    color:var(--onyx);
    font-family:"Catamaran","Atten New",-apple-system,BlinkMacSystemFont,sans-serif;
    font-size:17px;line-height:1.55;
    font-weight:400;
    -webkit-font-smoothing:antialiased;
    text-rendering:optimizeLegibility;
  }
  ::selection{background:var(--sapphire);color:var(--paper)}

  a{color:inherit;text-decoration:none}
  button{font:inherit;cursor:pointer}

  /* ── Type system from brand guidelines ────────────────────────── */

  .h1{
    font-family:"Catamaran","Atten New",sans-serif;
    font-weight:800;
    font-size:clamp(48px,8vw,120px);
    line-height:0.92;letter-spacing:-0.025em;
    margin:0;text-wrap:balance;
    text-transform:uppercase;
  }
  .h1-mixed{
    font-weight:800;
    font-size:clamp(48px,8vw,120px);
    line-height:0.92;letter-spacing:-0.025em;
    margin:0;text-wrap:balance;
  }
  .h2{
    font-weight:800;
    font-size:clamp(34px,4.6vw,64px);
    line-height:1;letter-spacing:-0.02em;
    margin:0;text-wrap:balance;
    text-transform:uppercase;
  }
  .h3{
    font-weight:800;
    font-size:clamp(22px,2vw,30px);
    line-height:1.1;letter-spacing:-0.01em;
    margin:0;text-transform:uppercase;
  }
  .h4{
    font-weight:800;
    font-size:14px;letter-spacing:0.06em;
    line-height:1.2;
    margin:0;text-transform:uppercase;
  }
  .standout{
    font-weight:500;font-style:italic;
    font-size:clamp(22px,2.4vw,32px);line-height:1.25;
    letter-spacing:-0.015em;margin:0;text-wrap:pretty;
  }
  .body{font-size:17px;line-height:1.55;font-weight:400;color:var(--onyx-90)}
  .body-lg{font-size:clamp(18px,1.5vw,21px);line-height:1.5;font-weight:400;color:var(--onyx-90);text-wrap:pretty}
  .micro{
    font-weight:600;font-size:11px;
    letter-spacing:0.14em;text-transform:uppercase;
    color:var(--onyx-50);
  }

  /* ── Layout primitives ──────────────────────────────────────── */

  .container{max-width:1240px;margin:0 auto;padding:0 32px}
  .container-narrow{max-width:880px;margin:0 auto;padding:0 32px}
  .section{padding:120px 0;border-top:1px solid var(--onyx-10)}
  .section-tight{padding:80px 0;border-top:1px solid var(--onyx-10)}
  .section.dark{
    background:var(--onyx);color:var(--paper);
    border-top-color:var(--onyx-90);
  }
  .section.dark .body,.section.dark .body-lg{color:var(--onyx-30)}
  .section.dark .micro{color:var(--sapphire)}

  /* ── Marks (the triangle) ───────────────────────────────────── */

  .triangle{
    width:0;height:0;
    border-top:8px solid transparent;
    border-bottom:8px solid transparent;
    border-left:14px solid var(--sapphire);
    display:inline-block;
    flex-shrink:0;
  }
  .triangle-lg{
    border-top-width:18px;border-bottom-width:18px;
    border-left-width:30px;
  }
  .triangle-xl{
    border-top-width:42px;border-bottom-width:42px;
    border-left-width:72px;
  }

  .eyebrow{
    display:inline-flex;align-items:center;gap:14px;
    font-weight:600;font-size:11px;
    letter-spacing:0.14em;text-transform:uppercase;
    color:var(--sapphire);
  }

  /* ── Buttons ────────────────────────────────────────────────── */

  .btn{
    display:inline-flex;align-items:center;gap:12px;
    height:56px;padding:0 28px;
    font-weight:700;font-size:14px;letter-spacing:0.06em;
    text-transform:uppercase;
    border:2px solid transparent;
    transition:transform .15s ease,background .2s ease,color .2s ease,border-color .2s ease;
  }
  .btn:hover{transform:translateY(-2px)}
  .btn-primary{background:var(--sapphire);color:var(--paper)}
  .btn-primary:hover{background:var(--sapphire-deep)}
  .btn-onyx{background:var(--onyx);color:var(--paper)}
  .btn-onyx:hover{background:var(--onyx-90)}
  .btn-ghost{background:transparent;color:var(--onyx);border-color:var(--onyx)}
  .btn-ghost:hover{background:var(--onyx);color:var(--paper)}
  .btn-ghost-light{background:transparent;color:var(--paper);border-color:var(--paper)}
  .btn-ghost-light:hover{background:var(--paper);color:var(--onyx)}
  .btn .arrow{transition:transform .2s ease}
  .btn:hover .arrow{transform:translateX(4px)}

  /* ── Nav ────────────────────────────────────────────────────── */

  .nav{
    position:sticky;top:0;z-index:50;
    background:rgba(255,255,255,.92);
    -webkit-backdrop-filter:blur(14px);backdrop-filter:blur(14px);
    border-bottom:1px solid var(--onyx-10);
  }
  .nav-inner{
    display:flex;align-items:center;justify-content:space-between;
    height:80px;padding:0 32px;max-width:1240px;margin:0 auto;
  }
  .nav-logo{height:40px;display:block}
  .nav-logo img{height:100%;width:auto;display:block}
  .nav-links{display:flex;gap:32px;align-items:center}
  .nav-link{
    font-size:13px;font-weight:600;letter-spacing:0.04em;text-transform:uppercase;
    color:var(--onyx-70);transition:color .15s;
  }
  .nav-link:hover{color:var(--onyx)}
  @media (max-width:820px){.nav-links .nav-link{display:none}}

  /* ── HERO ───────────────────────────────────────────────────── */

  .hero{
    padding:80px 0 120px;
    position:relative;overflow:hidden;
  }
  .hero-tagrow{
    display:flex;align-items:center;gap:16px;
    margin-bottom:48px;flex-wrap:wrap;
  }
  .hero-tag{
    display:inline-flex;align-items:center;gap:10px;
    padding:8px 16px;border:1px solid var(--onyx);
    font-weight:600;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;
  }
  .hero-tag .dot{
    width:8px;height:8px;background:var(--sapphire);
    box-shadow:0 0 0 0 var(--sapphire);
    animation:pulse 2.4s ease-out infinite;
  }
  @keyframes pulse{
    0%{box-shadow:0 0 0 0 rgba(0,142,170,.6)}
    100%{box-shadow:0 0 0 10px transparent}
  }

  .hero-h1{
    display:flex;align-items:flex-start;gap:24px;
  }
  .hero-h1 .triangle-xl{
    margin-top:18px;
  }
  .hero-h1-text{
    font-weight:800;
    font-size:clamp(56px,9.5vw,148px);
    line-height:0.88;letter-spacing:-0.03em;
    margin:0;text-wrap:balance;
  }
  .hero-h1-text em{
    font-style:italic;font-weight:500;
    color:var(--sapphire);
  }

  .hero-grid{
    display:grid;grid-template-columns:1.4fr 1fr;gap:80px;align-items:end;
    margin-top:64px;
  }
  @media (max-width:900px){.hero-grid{grid-template-columns:1fr;gap:48px}}

  .hero-lede{
    font-size:clamp(19px,1.8vw,24px);line-height:1.45;
    color:var(--onyx-90);max-width:620px;
    margin:0 0 36px;text-wrap:pretty;
  }
  .hero-lede strong{font-weight:700;color:var(--onyx)}

  .hero-card{
    border:2px solid var(--onyx);padding:32px;
    background:var(--paper);
  }
  .hero-card-row{
    display:flex;justify-content:space-between;align-items:baseline;
    padding:14px 0;border-bottom:1px solid var(--onyx-10);
  }
  .hero-card-row:last-child{border-bottom:0;padding-bottom:0}
  .hero-card-row:first-child{padding-top:0}
  .hero-card-row dt{
    font-weight:600;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;
    color:var(--onyx-50);margin:0;
  }
  .hero-card-row dd{
    font-weight:700;font-size:15px;margin:0;text-align:right;
  }

  .hero-cta{display:flex;gap:14px;flex-wrap:wrap}

  /* ── Marquee strip ──────────────────────────────────────────── */

  .strip{
    background:var(--onyx);color:var(--paper);
    padding:24px 0;overflow:hidden;
  }
  .strip-track{
    display:flex;gap:56px;animation:marq 32s linear infinite;
    white-space:nowrap;align-items:center;
  }
  @keyframes marq{from{transform:translateX(0)}to{transform:translateX(-50%)}}
  .strip-item{
    display:inline-flex;align-items:center;gap:18px;
    font-weight:800;font-size:18px;letter-spacing:0.04em;text-transform:uppercase;
  }
  .strip-item .triangle{
    border-top-width:7px;border-bottom-width:7px;border-left-width:12px;
  }

  /* ── Reframe section ────────────────────────────────────────── */

  .reframe{
    display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:center;
  }
  @media (max-width:820px){.reframe{grid-template-columns:1fr;gap:40px}}
  .reframe-quote{
    font-weight:500;font-style:italic;
    font-size:clamp(28px,3.4vw,46px);line-height:1.15;letter-spacing:-0.015em;
    margin:0;text-wrap:balance;
  }
  .reframe-quote strong{
    font-weight:800;font-style:normal;color:var(--sapphire);
  }

  /* ── Two steps ──────────────────────────────────────────────── */

  .steps{display:grid;grid-template-columns:1fr 1fr;gap:32px;margin-top:56px}
  @media (max-width:820px){.steps{grid-template-columns:1fr}}
  .step{
    border:2px solid var(--onyx);padding:48px 40px;
    display:flex;flex-direction:column;gap:24px;
    position:relative;
  }
  .step-num{
    font-weight:800;font-size:13px;letter-spacing:0.16em;
    color:var(--sapphire);text-transform:uppercase;
  }
  .step-h{
    font-weight:800;font-size:clamp(28px,3vw,40px);
    line-height:1;letter-spacing:-0.02em;
    margin:0;text-transform:uppercase;
  }
  .step-h em{font-style:italic;font-weight:500;color:var(--sapphire)}
  .step-tags{display:flex;flex-wrap:wrap;gap:8px;margin-top:8px}
  .step-tag{
    font-size:13px;padding:6px 12px;
    border:1px solid var(--onyx-30);
    background:var(--paper-tint);
    font-weight:500;
  }

  /* ── Prompts grid ───────────────────────────────────────────── */

  .prompts{
    display:grid;grid-template-columns:repeat(2,1fr);gap:1px;
    background:var(--onyx-10);
    border:1px solid var(--onyx-10);margin-top:48px;
  }
  @media (max-width:820px){.prompts{grid-template-columns:1fr}}
  .prompt{
    background:var(--paper);padding:36px 32px;
    display:flex;flex-direction:column;gap:14px;
    transition:background .2s,color .2s;
    cursor:pointer;
  }
  .prompt:hover{background:var(--onyx);color:var(--paper)}
  .prompt:hover .prompt-tag{color:var(--sapphire)}
  .prompt:hover .prompt-num{color:var(--paper)}
  .prompt:hover .prompt-copy{
    border-color:var(--sapphire);color:var(--sapphire);
  }
  .prompt-hd{display:flex;justify-content:space-between;align-items:flex-start;gap:16px}
  .prompt-num{
    font-weight:800;font-size:48px;line-height:0.9;
    color:var(--onyx);transition:color .2s;
    font-feature-settings:"tnum";
  }
  .prompt-meta{display:flex;flex-direction:column;gap:4px;text-align:right}
  .prompt-tag{
    font-weight:700;font-size:10px;letter-spacing:0.14em;
    text-transform:uppercase;color:var(--sapphire);
    transition:color .2s;
  }
  .prompt-label{font-weight:800;font-size:18px;text-transform:uppercase;letter-spacing:-0.005em}
  .prompt-text{
    font-weight:500;font-style:italic;
    font-size:18px;line-height:1.4;
    margin:8px 0 0;
  }
  .prompt-copy{
    margin-top:auto;align-self:flex-start;
    font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;
    padding:8px 14px;border:1px solid var(--onyx-10);
    transition:all .2s;
  }

  /* ── Program / pricing ──────────────────────────────────────── */

  .program{
    display:grid;grid-template-columns:1.15fr 0.85fr;gap:48px;align-items:start;
  }
  @media (max-width:900px){.program{grid-template-columns:1fr;gap:32px}}

  /* Right column wrapper to stack portrait + pull card */
  .program-right{display:flex;flex-direction:column;gap:20px}

  /* Roxanne portrait card inside program */
  .program-portrait{
    position:relative;background:var(--sapphire);overflow:hidden;
    aspect-ratio:4/5;
  }
  .program-portrait img{
    width:100%;height:100%;object-fit:cover;display:block;
    animation:portraitFloat 7s ease-in-out infinite;
  }
  @keyframes portraitFloat{
    0%,100%{transform:scale(1.02) translateY(0)}
    50%{transform:scale(1.04) translateY(-6px)}
  }
  .program-portrait .pp-badge{
    position:absolute;top:20px;left:20px;z-index:2;
    background:var(--paper);color:var(--onyx);
    padding:10px 14px;font-family:'Catamaran',sans-serif;font-weight:800;
    font-size:11px;letter-spacing:0.14em;text-transform:uppercase;
    display:flex;align-items:center;gap:10px;
  }
  .program-portrait .pp-badge .dot{
    width:8px;height:8px;background:var(--sapphire);
    animation:pulse 2.4s ease-out infinite;
  }
  .program-portrait .pp-tri{
    position:absolute;top:20px;right:20px;z-index:2;
    width:0;height:0;
    border-left:14px solid transparent;
    border-right:14px solid transparent;
    border-bottom:18px solid var(--paper);
    animation:triPulse 3s ease-in-out infinite;
  }
  @keyframes triPulse{
    0%,100%{transform:rotate(0deg)}
    50%{transform:rotate(8deg)}
  }
  .program-portrait .pp-quote{
    position:absolute;left:-1px;top:50%;z-index:2;
    transform:translateY(-50%);
    background:var(--paper);color:var(--onyx);
    padding:16px 20px;max-width:58%;
    font-family:'Catamaran',sans-serif;font-weight:800;font-style:italic;
    font-size:18px;line-height:1.2;
    box-shadow:6px 6px 0 var(--onyx);
    animation:quoteSlide 6s ease-in-out infinite;
  }
  @keyframes quoteSlide{
    0%,100%{transform:translateY(-50%) translateX(0)}
    50%{transform:translateY(-50%) translateX(6px)}
  }
  @media (max-width:900px){
    .program-portrait{aspect-ratio:5/4;max-width:520px}
    .program-portrait .pp-quote{max-width:70%;font-size:16px}
  }

  /* Credibility pull card sitting under the portrait */
  .program-pull{
    background:var(--paper);border:2px solid var(--onyx);
    padding:28px;position:relative;
  }
  .program-pull::before{
    content:"";position:absolute;top:-2px;left:-2px;
    width:0;height:0;
    border-top:36px solid var(--sapphire);
    border-right:36px solid transparent;
  }
  .program-pull .pull-eyebrow{
    font-family:'Catamaran',sans-serif;font-weight:800;font-size:11px;
    letter-spacing:0.16em;text-transform:uppercase;color:var(--sapphire);
    margin:0 0 14px;padding-left:18px;
  }
  .program-pull .pull-quote{
    font-family:'Catamaran',sans-serif;font-weight:700;font-size:19px;
    line-height:1.35;letter-spacing:-0.01em;color:var(--onyx);margin:0 0 20px;
  }
  .program-pull .pull-quote em{font-style:italic;font-weight:700;color:var(--sapphire)}
  .program-pull .pull-attr{
    display:flex;align-items:center;gap:12px;
    padding-top:18px;border-top:1px solid var(--onyx-10);
    font-size:13px;color:var(--onyx-70);line-height:1.4;
  }
  .program-pull .pull-attr strong{color:var(--onyx);font-weight:800;display:block}
  .program-pull .pull-tri{
    width:0;height:0;
    border-left:8px solid transparent;
    border-right:8px solid transparent;
    border-bottom:11px solid var(--sapphire);
    flex-shrink:0;
  }

  .program-card{
    background:var(--onyx);color:var(--paper);
    padding:56px;position:relative;overflow:hidden;
  }
  @media (max-width:820px){.program-card{padding:40px 32px}}
  .program-card::after{
    content:"";position:absolute;bottom:-1px;right:-1px;
    width:0;height:0;
    border-right:140px solid var(--sapphire);
    border-top:140px solid transparent;
  }
  .program-stamp{
    display:inline-block;
    background:var(--sapphire);color:var(--paper);
    padding:8px 14px;font-weight:800;font-size:11px;
    letter-spacing:0.14em;text-transform:uppercase;
    margin:0 0 28px;
  }
  .program-features{
    display:flex;flex-direction:column;gap:16px;
    margin:32px 0;
  }
  .program-feature{
    display:flex;align-items:flex-start;gap:14px;
    padding:14px 0;border-top:1px solid var(--onyx-70);
    font-size:16px;line-height:1.45;
  }
  .program-feature:last-child{border-bottom:1px solid var(--onyx-70)}
  .program-feature .triangle{margin-top:7px}

  .program-meta{
    display:grid;grid-template-columns:1fr 1fr;gap:16px;
    margin-top:32px;
  }
  @media (max-width:560px){.program-meta{grid-template-columns:1fr}}
  .program-meta-item{
    border:2px solid var(--onyx);padding:24px;
  }
  .program-meta-item dt{
    font-weight:700;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;
    color:var(--sapphire);margin:0 0 6px;
  }
  .program-meta-item dd{
    margin:0;font-weight:700;font-size:18px;
  }
  .program-meta-item .sub{
    display:block;font-weight:400;font-size:14px;
    color:var(--onyx-70);margin-top:2px;
  }

  .price-block{
    display:flex;align-items:flex-end;gap:18px;
    margin:24px 0 8px;
  }
  .price-now{
    font-weight:800;font-size:64px;line-height:0.9;letter-spacing:-0.02em;
  }
  .price-was{
    text-decoration:line-through;color:var(--onyx-50);
    font-weight:600;font-size:20px;margin-bottom:8px;
  }
  .price-deadline{
    display:inline-block;background:var(--sapphire);color:var(--paper);
    padding:6px 12px;font-weight:800;font-size:11px;
    letter-spacing:0.14em;text-transform:uppercase;
    margin-top:8px;
  }

  /* ── Speaker / About ────────────────────────────────────────── */

  .speaker{
    display:grid;grid-template-columns:1fr 1.4fr;gap:64px;align-items:center;
  }
  @media (max-width:820px){.speaker{grid-template-columns:1fr;gap:32px}}
  .speaker-portrait{
    aspect-ratio:4/5;background:var(--onyx);
    position:relative;overflow:hidden;
  }
  .speaker-portrait img{
    width:100%;height:100%;object-fit:cover;display:block;
  }
  .speaker-portrait::before{
    content:"";position:absolute;inset:0;
    background:linear-gradient(180deg,transparent 55%,rgba(0,0,0,.35) 100%);
    pointer-events:none;z-index:1;
  }
  .speaker-portrait .portrait-tag{
    position:absolute;left:16px;bottom:16px;z-index:2;
    background:var(--paper);color:var(--onyx);
    padding:8px 14px;font-family:'Catamaran',sans-serif;font-weight:800;
    font-size:10px;letter-spacing:0.14em;text-transform:uppercase;
  }
  .speaker-portrait .portrait-tri{
    position:absolute;right:18px;top:18px;z-index:2;
    width:0;height:0;
    border-left:14px solid transparent;
    border-right:14px solid transparent;
    border-bottom:18px solid var(--sapphire);
  }

  /* ── FAQ ────────────────────────────────────────────────────── */

  .faq-item{border-top:1px solid var(--onyx-10)}
  .faq-item:last-child{border-bottom:1px solid var(--onyx-10)}
  .faq-q{
    display:flex;justify-content:space-between;align-items:center;gap:24px;
    padding:28px 0;cursor:pointer;list-style:none;
    font-weight:800;font-size:clamp(20px,2vw,26px);
    letter-spacing:-0.01em;text-transform:uppercase;
  }
  .faq-q::-webkit-details-marker{display:none}
  .faq-q::after{
    content:"+";font-weight:300;font-size:32px;color:var(--sapphire);
    transition:transform .2s;
  }
  .faq-item[open] .faq-q::after{content:"\u2013"}
  .faq-a{padding:0 0 28px;color:var(--onyx-90);max-width:760px;line-height:1.6;font-size:17px}

  /* ── Footer ─────────────────────────────────────────────────── */

  .footer{
    background:var(--onyx);color:var(--paper);
    padding:80px 0 48px;
  }
  .footer-grid{
    display:grid;grid-template-columns:1.5fr 1fr 1fr;gap:48px;
    padding-bottom:48px;border-bottom:1px solid var(--onyx-70);
  }
  @media (max-width:820px){.footer-grid{grid-template-columns:1fr}}
  .footer-logo{height:56px;margin-bottom:24px;display:block}
  .footer-logo img{height:100%;width:auto;display:block}
  .footer-links{display:flex;flex-direction:column;gap:12px}
  .footer-link{
    font-size:13px;font-weight:600;letter-spacing:0.04em;text-transform:uppercase;
    color:var(--onyx-30);transition:color .15s;
  }
  .footer-link:hover{color:var(--sapphire)}
  .footer-h{
    font-weight:800;font-size:11px;letter-spacing:0.16em;text-transform:uppercase;
    color:var(--paper);margin:0 0 20px;
  }
  .footer-bottom{
    padding-top:32px;display:flex;justify-content:space-between;
    flex-wrap:wrap;gap:16px;
    font-size:12px;color:var(--onyx-50);font-weight:500;letter-spacing:0.04em;
  }

  /* ── Reveal ────────────────────────────────────────────────── */
  .reveal{opacity:0;transform:translateY(20px);transition:opacity .9s ease,transform .9s ease}
  .reveal.in{opacity:1;transform:translateY(0)}

  /* ── Toast ─────────────────────────────────────────────────── */
  .toast{
    position:fixed;bottom:32px;left:50%;transform:translateX(-50%) translateY(120%);
    background:var(--onyx);color:var(--paper);
    padding:14px 24px;font-weight:700;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;
    transition:transform .3s ease;z-index:100;
    border-left:4px solid var(--sapphire);
  }
  .toast.show{transform:translateX(-50%) translateY(0)}
`;

// ──────────────────────────────────────────────────────────────────────────

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function useToast() {
  const [msg, setMsg] = useState(null);
  const tRef = useRef(null);
  const show = (text) => {
    setMsg(text);
    clearTimeout(tRef.current);
    tRef.current = setTimeout(() => setMsg(null), 1800);
  };
  return [msg, show];
}

// ──────────────────────────────────────────────────────────────────────────
// App

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [toast, showToast] = useToast();
  useReveal();

  const copyPrompt = async (p) => {
    try {
      await navigator.clipboard.writeText(p.text);
      showToast(`Copied · ${p.label}`);
    } catch {
      showToast('Copy failed');
    }
  };

  return (
    <>
      <style>{CSS}</style>

      {/* NAV */}
      <nav className="nav">
        <div className="nav-inner">
          <a href="#top" className="nav-logo" aria-label="Boom Business Solutions">
            <img src="brand/boom-logo-color.png" alt="Boom Business Solutions" />
          </a>
          <div className="nav-links">
            <a className="nav-link" href="#talk">The talk</a>
            <a className="nav-link" href="#prompts">Prompts</a>
            <a className="nav-link" href="#program">Program</a>
            <a className="btn btn-primary" href="#program" style={{height:44,padding:'0 20px',fontSize:11}}>
              Register · GMID rate
            </a>
          </div>
        </div>
      </nav>

      <main id="top">
        {/* PROGRAM */}
        <section className="section dark" id="program" data-screen-label="Program">
          <div className="container">
            <div className="reveal" style={{marginBottom:24}}>
              <span className="eyebrow"><span className="triangle" />Now enrolling · GMID 2026 rate</span>
            </div>
            <h2 className="reveal h2" style={{maxWidth:900,marginBottom:24}}>
              Program 01 · AI Foundations &amp; Applied Use.
            </h2>
            <p className="reveal body-lg" style={{maxWidth:720,marginBottom:56}}>
              A small-group AI training program built specifically for the meetings &amp; events industry. Six live sessions, plus an ongoing community of practice. We go deep — that's why we cap it at 20.
            </p>
            <span className="reveal program-stamp">GMID 2026 rate</span>

            <div className="program">
              <div>
                <div className="reveal program-card">
                  <h3 className="h3" style={{color:'var(--paper)',marginBottom:8}}>What you'll walk away with</h3>
                  <div className="program-features">
                    <div className="program-feature">
                      <span className="triangle" />
                      <span><strong>AI foundations</strong> + the prompts that actually work for your tasks</span>
                    </div>
                    <div className="program-feature">
                      <span className="triangle" />
                      <span><strong>Build your context documents</strong> end-to-end — so you stop starting from zero</span>
                    </div>
                    <div className="program-feature">
                      <span className="triangle" />
                      <span><strong>Role-specific AI assistants</strong> for your work — yours, not generic</span>
                    </div>
                    <div className="program-feature">
                      <span className="triangle" />
                      <span><strong>Workflows you'll actually use</strong> after the program ends</span>
                    </div>
                  </div>

                  <div className="price-block">
                    <span className="price-now">$1,097</span>
                    <span className="price-was">$1,497 regular</span>
                  </div>
                  <p className="body" style={{color:'var(--onyx-30)',margin:'0 0 12px',fontSize:15}}>
                    Per seat · GMID rate
                  </p>
                  <span className="price-deadline">Deadline · May 16, 2026</span>

                  <div style={{display:'flex',gap:12,marginTop:32,flexWrap:'wrap'}}>
                    <a href="register.html" className="btn btn-primary">
                      Register now <span className="arrow">→</span>
                    </a>
                    <a href="#contact" className="btn btn-ghost-light">
                      Ask a question
                    </a>
                  </div>
                </div>

                <dl className="reveal program-meta">
                  <div className="program-meta-item" style={{borderColor:'var(--onyx-70)',background:'var(--onyx-90)'}}>
                    <dt>Format</dt>
                    <dd>Online · Zoom<span className="sub" style={{color:'var(--onyx-30)'}}>6 live sessions · 90 min each</span></dd>
                  </div>
                  <div className="program-meta-item" style={{borderColor:'var(--onyx-70)',background:'var(--onyx-90)'}}>
                    <dt>Starts</dt>
                    <dd>Jun 2 – Jul 7, 2026<span className="sub" style={{color:'var(--onyx-30)'}}>Wednesdays · 12:00 PM ET</span></dd>
                  </div>
                  <div className="program-meta-item" style={{borderColor:'var(--onyx-70)',background:'var(--onyx-90)'}}>
                    <dt>Group size</dt>
                    <dd>Min 10 · Max 20<span className="sub" style={{color:'var(--onyx-30)'}}>Capped so we can go deep</span></dd>
                  </div>
                  <div className="program-meta-item" style={{borderColor:'var(--onyx-70)',background:'var(--onyx-90)'}}>
                    <dt>Built for</dt>
                    <dd>Event &amp; meeting pros<span className="sub" style={{color:'var(--onyx-30)'}}>Planners, suppliers, DMOs</span></dd>
                  </div>
                </dl>
              </div>

              <div className="program-right">
                <div className="reveal program-portrait">
                  <span className="pp-badge"><span className="dot" />Led by Roxanne Kennedy</span>
                  <span className="pp-tri" />
                  <img src="brand/roxanne.png" alt="Roxanne Kennedy — Boom Business Solutions / Meet in Kamloops" />
                </div>

                <div className="reveal program-pull">
                  <p className="pull-eyebrow">Why this program</p>
                  <p className="pull-quote">
                    Built by people who actually <em>do this work</em> — not consultants borrowing the language of meetings &amp; events.
                  </p>
                  <div className="pull-attr">
                    <span className="pull-tri" />
                    <span>
                      <strong>Boom Business Solutions × Meet in Kamloops</strong>
                      Comms + PR agency deeply rooted in business event sales and destination marketing. We use AI every day on real client work.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* HERO */}
        <section className="hero" data-screen-label="Hero">
          <div className="container">
            <div className="reveal hero-tagrow">
              <span className="hero-tag">
                <span className="dot" />
                Session resources · Rapid-fire AI learning
              </span>
              <span className="hero-tag" style={{borderColor:'var(--sapphire)',color:'var(--sapphire)'}}>
                Made for GMID 2026 · MPI Toronto
              </span>
            </div>

            <div className="reveal hero-h1">
              <span className="triangle triangle-xl" />
              <h1 className="hero-h1-text">
                You can <em>just</em><br/>
                talk to it.
              </h1>
            </div>

            <div className="hero-grid">
              <div className="reveal">
                <p className="hero-lede">
                  You're looking at the resources from Roxanne's rapid-fire AI learning session — made just for the people who run events, supply venues, plan conferences, and answer 9:30pm client texts.
                  <br/><br/>
                  A starting point for using AI that doesn't require <strong>25 steps</strong>, <strong>17 tools</strong>, or a weekend of homework.
                </p>
                <div className="hero-cta">
                  <a href="#prompts" className="btn btn-onyx">
                    Get the seven prompts <span className="arrow">→</span>
                  </a>
                  <a href="#program" className="btn btn-ghost">
                    See the program
                  </a>
                </div>
              </div>
              <div className="reveal hero-card">
                <h4 className="h4" style={{marginBottom:18,color:'var(--sapphire)'}}>The Talk · At a glance</h4>
                <dl style={{margin:0}}>
                  <div className="hero-card-row">
                    <dt>Speaker</dt><dd>Roxanne Kennedy</dd>
                  </div>
                  <div className="hero-card-row">
                    <dt>Where</dt><dd>GMID 2026 · MPI Toronto</dd>
                  </div>
                  <div className="hero-card-row">
                    <dt>Length</dt><dd>10 minutes</dd>
                  </div>
                  <div className="hero-card-row">
                    <dt>Built for</dt><dd>Event &amp; meeting pros</dd>
                  </div>
                  <div className="hero-card-row">
                    <dt>Takeaway</dt><dd>One thing. That's it.</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </section>

        {/* MARQUEE STRIP */}
        <div className="strip">
          <div className="strip-track">
            {[...Array(2)].map((_, k) => (
              <React.Fragment key={k}>
                <span className="strip-item"><span className="triangle" />Photos of napkins</span>
                <span className="strip-item"><span className="triangle" />The 9:30pm text</span>
                <span className="strip-item"><span className="triangle" />The fam itinerary PDF</span>
                <span className="strip-item"><span className="triangle" />Voice memo from the van</span>
                <span className="strip-item"><span className="triangle" />The client's RFP</span>
                <span className="strip-item"><span className="triangle" />Your notes app</span>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* THE REFRAME */}
        <section className="section" id="talk" data-screen-label="The reframe">
          <div className="container">
            <div className="reveal" style={{marginBottom:48}}>
              <span className="eyebrow"><span className="triangle" />The reframe</span>
            </div>
            <div className="reveal reframe">
              <p className="reframe-quote">
                You don't need to use AI <em>perfectly</em> to get value from it.
                <br/><br/>
                You just need to <strong>talk to it.</strong>
              </p>
              <div>
                <p className="body-lg" style={{margin:'0 0 20px'}}>
                  Most AI talks make people feel <em>more</em> behind, not less. Long workflows. 25 rapid-fire steps. The slide with seventeen tools on it. The 45-minute pitch that ends with you somehow responsible for implementation.
                </p>
                <p className="body-lg" style={{margin:0}}>
                  This isn't that. The people who'll feel the biggest lift from AI aren't the ones who took the most courses on it — they're the ones who got comfortable just talking to it.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* TWO STEPS */}
        <section className="section dark" id="steps" data-screen-label="Two steps">
          <div className="container">
            <div className="reveal" style={{marginBottom:24}}>
              <span className="eyebrow"><span className="triangle" />The whole talk in two steps</span>
            </div>
            <h2 className="reveal h2" style={{maxWidth:880,marginBottom:24}}>
              Two moves. That's the whole thing.
            </h2>
            <p className="reveal body-lg" style={{maxWidth:680}}>
              Forget the workflow diagrams. Forget the tool stack. If you can do these two things, you're using AI better than 80% of the people who claim to.
            </p>

            <div className="steps">
              <div className="reveal step" style={{background:'var(--onyx-90)',borderColor:'var(--onyx-70)'}}>
                <span className="step-num">Step 01</span>
                <h3 className="step-h">Give it <em>everything</em> you have.</h3>
                <p className="body" style={{color:'var(--onyx-30)',margin:0}}>
                  Photos of napkins. Screenshots of that 9:30pm text. The fam itinerary PDF. The destination materials. The client's RFP. Drag it all into the chat. Don't organize it first — that's the AI's job.
                </p>
                <div className="step-tags">
                  <span className="step-tag" style={{background:'var(--onyx)',borderColor:'var(--onyx-70)',color:'var(--onyx-30)'}}>📸 Photos</span>
                  <span className="step-tag" style={{background:'var(--onyx)',borderColor:'var(--onyx-70)',color:'var(--onyx-30)'}}>💬 Screenshots</span>
                  <span className="step-tag" style={{background:'var(--onyx)',borderColor:'var(--onyx-70)',color:'var(--onyx-30)'}}>📄 PDFs</span>
                  <span className="step-tag" style={{background:'var(--onyx)',borderColor:'var(--onyx-70)',color:'var(--onyx-30)'}}>📝 Voice memos</span>
                </div>
              </div>
              <div className="reveal step" style={{background:'var(--onyx-90)',borderColor:'var(--onyx-70)'}}>
                <span className="step-num">Step 02</span>
                <h3 className="step-h">Then <em>write this:</em></h3>
                <p className="standout" style={{color:'var(--paper)',margin:0,fontSize:'clamp(18px,1.8vw,22px)',lineHeight:1.4}}>
                  "I need to write a <strong style={{color:'var(--sapphire)',fontStyle:'normal'}}>debrief / proposal / report</strong> and I have <strong style={{color:'var(--sapphire)',fontStyle:'normal'}}>notes / a transcript / scattered info</strong>. Ask me clarifying questions until you're <strong style={{color:'var(--sapphire)',fontStyle:'normal'}}>95% confident</strong> you can complete the task successfully."
                </p>
                <p className="body" style={{color:'var(--onyx-30)',margin:0,fontSize:14}}>
                  Copy this. Save it. Use it for almost anything.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* THE 7 PROMPTS */}
        <section className="section" id="prompts" data-screen-label="The seven prompts">
          <div className="container">
            <div className="reveal" style={{marginBottom:24}}>
              <span className="eyebrow"><span className="triangle" />Take these with you</span>
            </div>
            <h2 className="reveal h2" style={{maxWidth:900,marginBottom:24}}>
              Seven starter prompts. Copy-paste ready.
            </h2>
            <p className="reveal body-lg" style={{maxWidth:680}}>
              These are the prompts Roxanne actually uses — for proposals, debriefs, pricing decisions, hard conversations, and the moments she's not sure where to start. Click any of them to copy.
            </p>

            <div className="prompts">
              {PROMPTS.map((p) => (
                <div key={p.n} className="prompt reveal" onClick={() => copyPrompt(p)}>
                  <div className="prompt-hd">
                    <span className="prompt-num">{p.n}</span>
                    <div className="prompt-meta">
                      <span className="prompt-tag">{p.tag}</span>
                      <span className="prompt-label">{p.label}</span>
                    </div>
                  </div>
                  <p className="prompt-text">"{p.text}"</p>
                  <span className="prompt-copy">Click to copy ↗</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SPEAKER */}
        <section className="section" id="speaker" data-screen-label="Speaker">
          <div className="container">
            <div className="speaker">
              <div className="reveal speaker-portrait">
                <img src="brand/roxanne-gmid.png" alt="Roxanne Kennedy" />
                <span className="portrait-tri" />
                <span className="portrait-tag">Roxanne Kennedy</span>
              </div>
              <div className="reveal">
                <span className="eyebrow"><span className="triangle" />Who's behind this</span>
                <h2 className="h2" style={{margin:'16px 0 24px',maxWidth:560}}>
                  Roxanne Kennedy.
                </h2>
                <p className="body-lg" style={{marginBottom:20,maxWidth:560}}>
                  Some of you know her as <strong>Roxanne from Meet in Kamloops</strong>. What you might not know: Meet in Kamloops is run by her team at Boom Business Solutions — a comms + PR firm.
                </p>
                <p className="body-lg" style={{marginBottom:32,maxWidth:560}}>
                  Having a team is what gave her the space to actually sit with AI, play with it, and break it. This program is what came out of that.
                </p>
                <div style={{display:'flex',gap:12,flexWrap:'wrap'}}>
                  <a href="https://boombusinesssolutions.com" target="_blank" rel="noopener" className="btn btn-ghost">
                    boombusinesssolutions.com <span className="arrow">→</span>
                  </a>
                  <a href="https://tourismkamloops.com/meetings" target="_blank" rel="noopener" className="btn btn-ghost">
                    tourismkamloops.com/meetings <span className="arrow">→</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="section" id="faq" data-screen-label="FAQ">
          <div className="container-narrow">
            <div className="reveal" style={{marginBottom:32}}>
              <span className="eyebrow"><span className="triangle" />Frequently asked</span>
              <h2 className="h2" style={{marginTop:16}}>Questions, answered.</h2>
            </div>
            <div className="reveal">
              {[
                { q: "I'm not technical. Will I keep up?", a: "Yes. The whole point of this approach is that you don't need to be. If you can write an email, you can do this. The program assumes zero prior AI experience." },
                { q: 'What AI tool do I need?', a: "Whatever you already have access to. ChatGPT, Claude, Gemini, Copilot — they're all capable of this. We'll show you what we use and why, but you don't have to switch." },
                { q: 'Why is the group capped at 20?', a: "Because we go deep. Below 10 the energy dies; above 20 nobody gets real attention. 10–20 is the sweet spot for a group that becomes an ongoing community." },
                { q: 'What does the GMID rate include?', a: "Same program, $400 off. $1,097 per seat instead of $1,497, plus the May 16 deadline. Use it before then. After May 16 it's the regular rate." },
                { q: 'Do I have to be at GMID Toronto to qualify?', a: "No. The GMID rate is open to anyone in the meetings &amp; events industry until the May 16 deadline — we're trusting you to know whether that's you." },
                { q: "What if I can't make a session?", a: "Every session is recorded and lives in the community space along with the prompts, templates, and context-document workshops. Most people watch some live and catch others on replay." },
              ].map((f, i) => (
                <details key={i} className="faq-item" open={i === 0}>
                  <summary className="faq-q">{f.q}</summary>
                  <p className="faq-a">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CLOSING */}
        <section className="section dark" id="contact" data-screen-label="Closing">
          <div className="container">
            <div className="reveal" style={{marginBottom:24}}>
              <span className="eyebrow"><span className="triangle" />The close</span>
            </div>
            <h2 className="reveal h1-mixed" style={{maxWidth:1100,fontSize:'clamp(40px,6vw,84px)',marginBottom:32}}>
              Now go open it up and tell it <em style={{fontStyle:'italic',fontWeight:500,color:'var(--sapphire)'}}>what you're dealing with.</em>
            </h2>
            <p className="reveal body-lg" style={{maxWidth:720,marginBottom:48}}>
              Start there. The rest follows. And if you want help getting there — that's what the program is for.
            </p>
            <div className="reveal" style={{display:'flex',gap:14,flexWrap:'wrap'}}>
              <a href="register.html" className="btn btn-primary">
                Register · $1,097 GMID rate <span className="arrow">→</span>
              </a>
              <a href="mailto:hello@boombusinesssolutions.com" className="btn btn-ghost-light">
                Email Roxanne
              </a>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="footer">
          <div className="container">
            <div className="footer-grid">
              <div>
                <a className="footer-logo" href="https://boombusinesssolutions.com" aria-label="Boom Business Solutions">
                  <img src="brand/boom-logo-white.png" alt="Boom Business Solutions" />
                </a>
                <p className="body" style={{color:'var(--onyx-30)',maxWidth:380,fontSize:14}}>
                  A comms + PR firm helping the meetings, events, and tourism industry get unstuck — including with AI.
                </p>
              </div>
              <div>
                <h4 className="footer-h">The talk</h4>
                <div className="footer-links">
                  <a className="footer-link" href="#talk">The reframe</a>
                  <a className="footer-link" href="#steps">Two steps</a>
                  <a className="footer-link" href="#prompts">Seven prompts</a>
                </div>
              </div>
              <div>
                <h4 className="footer-h">Connect</h4>
                <div className="footer-links">
                  <a className="footer-link" href="https://boombusinesssolutions.com" target="_blank" rel="noopener">boombusinesssolutions.com</a>
                  <a className="footer-link" href="register.html">/ai · the program</a>
                  <a className="footer-link" href="mailto:hello@boombusinesssolutions.com">Email Roxanne</a>
                </div>
              </div>
            </div>
            <div className="footer-bottom">
              <span>© 2026 Boom Business Solutions</span>
              <span>GMID 2026 · MPI Toronto · May 6</span>
              <span>boombusinesssolutions.com</span>
            </div>
          </div>
        </footer>
      </main>

      {/* TOAST */}
      <div className={`toast ${toast ? 'show' : ''}`}>{toast || ' '}</div>

      {/* TWEAKS */}
      <TweaksPanel title="Page tweaks">
        <TweakSection label="Sections" />
        <TweakToggle label="Show seven prompts" value={t.showPrompts} onChange={(v) => setTweak('showPrompts', v)} />
        <TweakSection label="Hosting" />
        <div style={{fontSize:11,lineHeight:1.5,color:'rgba(41,38,27,.7)'}}>
          To put this on your domain: open netlify.com/drop and drag the project folder. Then point your domain at the URL Netlify gives you. See HOSTING.md.
        </div>
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);

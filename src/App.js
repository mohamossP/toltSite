import { useState, useEffect, useRef } from "react";

const ACCENT = "#2A6496";
const BG = "#F0F6FB";
const INK = "#111820";
const MUTED = "#5A7A90";

const ToltLogo = ({ size = 40 }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: "block" }}>
      <rect width="40" height="40" rx="4" fill="#CC2200" />
      <text x="20" y="17" fontFamily="'Lato', Arial, sans-serif" fontSize="13" fontWeight="700" letterSpacing="0.5" fill="#FFFFFF" textAnchor="middle">Tölt</text>
      <text x="35" y="33" fontFamily="'Lato', Arial, sans-serif" fontSize="10" fontWeight="300" letterSpacing="1.5" fill="#FFFFFF" textAnchor="end">AI</text>
    </svg>
  );
};

const useInView = (threshold = 0.15) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return [ref, visible];
};

const Reveal = ({ children, delay = 0, className = "" }) => {
  const [ref, visible] = useInView();
  return (
    <div ref={ref} className={className} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(28px)", transition: `opacity 0.75s ease ${delay}ms, transform 0.75s ease ${delay}ms` }}>
      {children}
    </div>
  );
};

const features = [
  { num: "01", title: "Agentic AI Automation", desc: "Deploy intelligent agents that plan, reason, and act across your business processes — autonomously completing multi-step workflows that once required entire teams." },
  { num: "02", title: "Business Process Automation", desc: "Map your existing workflows and let Tölt-AI agents handle the repetitive, rule-bound, and data-intensive tasks — freeing your people for high-value work." },
  { num: "03", title: "Local LLM Solutions", desc: "Run powerful language models entirely within your infrastructure. No data leaves your environment — ideal for healthcare, government, and regulated industries." },
  { num: "04", title: "Training & Enablement", desc: "We don't just deploy — we upskill. Tailored training programmes ensure your teams understand, trust, and confidently extend the AI solutions we build together." },
];

const TeamIllustrations = {
  "AI Strategy": (
    <svg width="100%" height="100%" viewBox="0 0 300 220" xmlns="http://www.w3.org/2000/svg">
      <rect width="300" height="220" fill="#1a3a52"/>
      {[0,1,2,3,4].map(i => (<line key={`h${i}`} x1="0" y1={44*i+22} x2="300" y2={44*i+22} stroke="#2A6496" strokeWidth="0.5" strokeOpacity="0.4"/>))}
      {[0,1,2,3,4,5].map(i => (<line key={`v${i}`} x1={50*i} y1="0" x2={50*i} y2="220" stroke="#2A6496" strokeWidth="0.5" strokeOpacity="0.4"/>))}
      <rect x="40" y="140" width="28" height="60" rx="2" fill="#2A6496" opacity="0.7"/>
      <rect x="85" y="100" width="28" height="100" rx="2" fill="#2A6496" opacity="0.85"/>
      <rect x="130" y="70" width="28" height="130" rx="2" fill="#5B9EC9" opacity="0.9"/>
      <rect x="175" y="50" width="28" height="150" rx="2" fill="#CC2200" opacity="0.85"/>
      <rect x="220" y="80" width="28" height="120" rx="2" fill="#5B9EC9" opacity="0.7"/>
      <polyline points="54,135 99,95 144,65 189,45 234,75" stroke="#ffffff" strokeWidth="2" fill="none" strokeDasharray="4 2" opacity="0.6"/>
      {[[54,135],[99,95],[144,65],[189,45],[234,75]].map(([cx,cy],i) => (<circle key={i} cx={cx} cy={cy} r="4" fill="#fff" opacity="0.9"/>))}
      <text x="20" y="210" fontFamily="Lato,sans-serif" fontSize="10" fill="#5B9EC9" opacity="0.7" letterSpacing="2">STRATEGY</text>
    </svg>
  ),
  "Engineering": (
    <svg width="100%" height="100%" viewBox="0 0 300 220" xmlns="http://www.w3.org/2000/svg">
      <rect width="300" height="220" fill="#111e2e"/>
      <line x1="50" y1="60" x2="150" y2="60" stroke="#2A6496" strokeWidth="1.5" opacity="0.7"/>
      <line x1="150" y1="60" x2="150" y2="110" stroke="#2A6496" strokeWidth="1.5" opacity="0.7"/>
      <line x1="150" y1="110" x2="250" y2="110" stroke="#2A6496" strokeWidth="1.5" opacity="0.7"/>
      <line x1="80" y1="60" x2="80" y2="150" stroke="#5B9EC9" strokeWidth="1" opacity="0.5"/>
      <line x1="80" y1="150" x2="220" y2="150" stroke="#5B9EC9" strokeWidth="1" opacity="0.5"/>
      <line x1="220" y1="150" x2="220" y2="90" stroke="#5B9EC9" strokeWidth="1" opacity="0.5"/>
      <line x1="220" y1="90" x2="260" y2="90" stroke="#5B9EC9" strokeWidth="1" opacity="0.5"/>
      <rect x="120" y="45" width="60" height="30" rx="3" fill="#2A6496" opacity="0.8"/>
      <rect x="130" y="52" width="40" height="16" rx="2" fill="#111e2e"/>
      <text x="150" y="63" fontFamily="monospace" fontSize="7" fill="#5B9EC9" textAnchor="middle">LLM</text>
      <rect x="195" y="95" width="50" height="30" rx="3" fill="#1a3a52" stroke="#2A6496" strokeWidth="1"/>
      <text x="220" y="114" fontFamily="monospace" fontSize="7" fill="#5B9EC9" textAnchor="middle">AGENT</text>
      {[[50,60],[150,60],[150,110],[250,110],[80,150],[220,150],[220,90],[260,90]].map(([cx,cy],i) => (<circle key={i} cx={cx} cy={cy} r="4" fill="#CC2200" opacity="0.9"/>))}
      <circle cx="150" cy="110" r="7" fill="#CC2200" opacity="0.3"/>
      <circle cx="150" cy="110" r="4" fill="#CC2200" opacity="0.9"/>
      <text x="20" y="210" fontFamily="Lato,sans-serif" fontSize="10" fill="#5B9EC9" opacity="0.7" letterSpacing="2">ENGINEERING</text>
    </svg>
  ),
  "Sector Experts": (
    <svg width="100%" height="100%" viewBox="0 0 300 220" xmlns="http://www.w3.org/2000/svg">
      <rect width="300" height="220" fill="#152535"/>
      <rect x="30" y="60" width="70" height="130" rx="4" fill="#1a3a52" stroke="#2A6496" strokeWidth="1" opacity="0.8"/>
      <text x="65" y="88" fontFamily="Lato,sans-serif" fontSize="8" fill="#5B9EC9" textAnchor="middle" letterSpacing="1">HEALTH</text>
      <line x1="55" y1="105" x2="75" y2="105" stroke="#fff" strokeWidth="2" opacity="0.7"/>
      <line x1="65" y1="95" x2="65" y2="115" stroke="#fff" strokeWidth="2" opacity="0.7"/>
      <circle cx="65" cy="145" r="14" fill="#2A6496" opacity="0.4"/>
      <text x="65" y="149" fontFamily="Lato,sans-serif" fontSize="18" fill="#5B9EC9" textAnchor="middle" opacity="0.8">+</text>
      <rect x="115" y="40" width="70" height="150" rx="4" fill="#1a3a52" stroke="#CC2200" strokeWidth="1" opacity="0.8"/>
      <text x="150" y="68" fontFamily="Lato,sans-serif" fontSize="8" fill="#e07060" textAnchor="middle" letterSpacing="1">GOVT</text>
      <polygon points="150,85 158,100 142,100" fill="#CC2200" opacity="0.7"/>
      <rect x="142" y="100" width="16" height="20" rx="1" fill="#CC2200" opacity="0.5"/>
      <circle cx="150" cy="148" r="14" fill="#CC2200" opacity="0.2"/>
      <text x="150" y="152" fontFamily="Lato,sans-serif" fontSize="11" fill="#e07060" textAnchor="middle" opacity="0.8">&#9878;</text>
      <rect x="200" y="60" width="70" height="130" rx="4" fill="#1a3a52" stroke="#2A6496" strokeWidth="1" opacity="0.8"/>
      <text x="235" y="88" fontFamily="Lato,sans-serif" fontSize="8" fill="#5B9EC9" textAnchor="middle" letterSpacing="1">EDUC</text>
      <rect x="220" y="100" width="30" height="22" rx="2" fill="#2A6496" opacity="0.5"/>
      <line x1="225" y1="106" x2="245" y2="106" stroke="#fff" strokeWidth="1.5" opacity="0.7"/>
      <line x1="225" y1="112" x2="245" y2="112" stroke="#fff" strokeWidth="1.5" opacity="0.7"/>
      <line x1="225" y1="118" x2="238" y2="118" stroke="#fff" strokeWidth="1.5" opacity="0.7"/>
      <text x="20" y="210" fontFamily="Lato,sans-serif" fontSize="10" fill="#5B9EC9" opacity="0.7" letterSpacing="2">SECTORS</text>
    </svg>
  ),
  "Training": (
    <svg width="100%" height="100%" viewBox="0 0 300 220" xmlns="http://www.w3.org/2000/svg">
      <rect width="300" height="220" fill="#1a2840"/>
      <rect x="60" y="30" width="180" height="110" rx="4" fill="#1e3a5a" stroke="#2A6496" strokeWidth="1.5"/>
      <line x1="80" y1="55" x2="180" y2="55" stroke="#5B9EC9" strokeWidth="1.5" opacity="0.7"/>
      <line x1="80" y1="70" x2="160" y2="70" stroke="#5B9EC9" strokeWidth="1" opacity="0.5"/>
      <line x1="80" y1="85" x2="170" y2="85" stroke="#5B9EC9" strokeWidth="1" opacity="0.5"/>
      <rect x="80" y="100" width="100" height="8" rx="4" fill="#111e2e"/>
      <rect x="80" y="100" width="65" height="8" rx="4" fill="#CC2200" opacity="0.8"/>
      <text x="190" y="108" fontFamily="Lato,sans-serif" fontSize="8" fill="#e07060">65%</text>
      <circle cx="100" cy="165" r="10" fill="#2A6496" opacity="0.8"/>
      <circle cx="150" cy="158" r="10" fill="#CC2200" opacity="0.8"/>
      <circle cx="200" cy="165" r="10" fill="#2A6496" opacity="0.8"/>
      <line x1="110" y1="165" x2="140" y2="160" stroke="#5B9EC9" strokeWidth="1" opacity="0.5"/>
      <line x1="160" y1="160" x2="190" y2="165" stroke="#5B9EC9" strokeWidth="1" opacity="0.5"/>
      <line x1="150" y1="140" x2="150" y2="155" stroke="#2A6496" strokeWidth="2" opacity="0.6"/>
      <text x="20" y="210" fontFamily="Lato,sans-serif" fontSize="10" fill="#5B9EC9" opacity="0.7" letterSpacing="2">TRAINING</text>
    </svg>
  ),
};

const team = [
  { name: "AI Strategy",    role: "Enterprise transformation consulting",  bg: "#1a3a52" },
  { name: "Engineering",    role: "Agent architecture & LLM integration",  bg: "#111e2e" },
  { name: "Sector Experts", role: "Healthcare · Government · Education",   bg: "#152535" },
  { name: "Training",       role: "Enablement & change management",        bg: "#1a2840" },
];

const testimonials = [
  { quote: "Tölt-AI automated our patient intake and triage workflows. Our clinical staff reclaimed hours every shift — without compromising on compliance.", name: "Dr. A. Hassan", company: "Director of Digital Health, Regional Hospital Network" },
  { quote: "The local LLM deployment was a game-changer for us. Sensitive citizen data stays on-premises, and the agents still perform beautifully.", name: "M. Okonkwo", company: "Head of IT, Municipal Government Authority" },
  { quote: "We piloted Tölt-AI across three departments. The training programme made adoption smooth — staff went from sceptical to advocates in two weeks.", name: "Prof. L. Strand", company: "VP Operations, National University" },
];

export default function ToltAILanding() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSubmit = () => {
    if (!email.includes("@")) return;
    const subject = encodeURIComponent("Enquiry from Tölt-AI Website");
    const body = encodeURIComponent(`Hello Tölt-AI Team,\n\nName: ${name || "Not provided"}\nEmail: ${email}\n\nMessage:\n${message || "I'd like to learn more about your agentic AI solutions."}\n\n---\nSent via Tölt-AI website contact form.`);
    window.open(`mailto:ayman@tolt-AI.com?subject=${subject}&body=${body}`, "_blank");
    setSent(true); setEmail(""); setName(""); setMessage("");
  };

  return (
    <div style={{ background: BG, color: INK, fontFamily: "'Lato', sans-serif", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Lato:wght@300;400;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        ::selection { background: ${ACCENT}; color: #fff; }
        a { text-decoration: none; color: inherit; }
        button { cursor: pointer; border: none; background: none; font-family: inherit; }
        .nav-link { font-size: 13px; font-weight: 400; letter-spacing: 0.06em; color: ${MUTED}; transition: color 0.2s; }
        .nav-link:hover { color: ${INK}; }
        .feature-card { border-top: 1px solid #B8D4E8; padding: 32px 0; transition: background 0.3s; }
        .feature-card:hover .feat-num { color: ${ACCENT}; }
        .testimonial-card { background: #E8F4FB; border: 1px solid #C2DDEF; padding: 36px 32px; border-radius: 2px; }
        .team-card { overflow: hidden; border-radius: 2px; }
        .cta-btn { background: ${INK}; color: #fff; padding: 14px 32px; font-size: 13px; letter-spacing: 0.08em; font-weight: 500; border-radius: 1px; transition: background 0.25s, transform 0.2s; }
        .cta-btn:hover { background: ${ACCENT}; transform: translateY(-1px); }
        .outline-btn { border: 1px solid ${INK}; padding: 12px 28px; font-size: 13px; letter-spacing: 0.08em; font-weight: 400; border-radius: 1px; transition: background 0.25s, color 0.25s; }
        .outline-btn:hover { background: ${INK}; color: #fff; }
        .input-field { background: #fff; border: 1px solid #DDDBD6; padding: 13px 18px; font-size: 14px; font-family: 'Lato', sans-serif; border-radius: 1px; width: 100%; outline: none; transition: border-color 0.2s; }
        .input-field:focus { border-color: ${ACCENT}; }
        textarea.input-field { font-family: 'Lato', sans-serif; padding: 14px 18px; }
        @media (max-width: 768px) {
          .hero-title { font-size: clamp(40px, 12vw, 72px) !important; }
          .features-grid { grid-template-columns: 1fr !important; }
          .team-grid { grid-template-columns: 1fr 1fr !important; }
          .testimonials-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: scrolled ? "rgba(230,243,251,0.95)" : "transparent", backdropFilter: scrolled ? "blur(12px)" : "none", borderBottom: scrolled ? "1px solid #B8D4E8" : "1px solid transparent", transition: "all 0.35s ease", padding: "0 clamp(24px, 5vw, 72px)", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
        <a href="/" style={{ display: "flex", alignItems: "center" }}>
          <ToltLogo size={36} />
        </a>
        <div style={{ display: "flex", gap: 36, alignItems: "center" }}>
          {["Features", "Team", "Testimonials", "Contact"].map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} className="nav-link" style={{ display: window.innerWidth < 640 ? "none" : undefined }}>{l}</a>
          ))}
          <button className="cta-btn" style={{ padding: "9px 22px", fontSize: 12 }}>Get Early Access</button>
        </div>
      </nav>

      <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "120px clamp(24px, 8vw, 140px) 80px", position: "relative" }}>
        <div style={{ position: "absolute", top: 0, right: 0, width: "45%", height: "100%", background: "linear-gradient(135deg, #B8DCF0 0%, transparent 70%)", opacity: 0.55, pointerEvents: "none" }} />
        <div style={{ position: "relative", maxWidth: 760 }}>
          <div style={{ marginBottom: 40, animation: "fadeUp 0.7s ease both" }}><ToltLogo size={52} /></div>
          <div style={{ opacity: 1 }}>
            <p style={{ fontSize: 11, letterSpacing: "0.18em", color: ACCENT, fontWeight: 500, textTransform: "uppercase", marginBottom: 28 }}>Reliable Agentic AI · Enterprise Ready</p>
          </div>
          <h1 className="hero-title" style={{ fontFamily: "'EB Garamond', serif", fontSize: "clamp(52px, 8vw, 96px)", fontWeight: 400, lineHeight: 1.05, letterSpacing: "-0.01em", marginBottom: 32, animation: "fadeUp 0.9s ease both" }}>
            Automate the work.<br /><em style={{ fontStyle: "italic", color: ACCENT }}>Amplify</em> the people.
          </h1>
          <p style={{ fontSize: 17, fontWeight: 400, color: MUTED, lineHeight: 1.75, maxWidth: 480, marginBottom: 48, animation: "fadeUp 0.9s 0.15s ease both" }}>
            Tölt-AI delivers reliable agentic AI solutions that transform business processes in healthcare, government, and education — securely, on your terms.
          </p>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap", animation: "fadeUp 0.9s 0.3s ease both" }}>
            <button className="cta-btn">Book a Discovery Call</button>
            <button className="outline-btn">See our solutions</button>
          </div>
          <p style={{ marginTop: 24, fontSize: 12, color: MUTED, letterSpacing: "0.04em", animation: "fadeUp 0.9s 0.45s ease both" }}>On-premise · Compliant · Sector-specialist</p>
        </div>
        <div style={{ position: "absolute", bottom: 40, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, animation: "bounce 2s infinite" }}>
          <span style={{ fontSize: 11, letterSpacing: "0.12em", color: MUTED }}>SCROLL</span>
          <div style={{ width: 1, height: 32, background: ACCENT, opacity: 0.5 }} />
        </div>
      </section>

      <Reveal>
        <div style={{ borderTop: "1px solid #B8D4E8", borderBottom: "1px solid #B8D4E8", padding: "24px clamp(24px, 8vw, 140px)", display: "flex", gap: 48, alignItems: "center", flexWrap: "wrap" }}>
          <span style={{ fontSize: 12, letterSpacing: "0.12em", color: MUTED, textTransform: "uppercase" }}>Deployed across</span>
          {["Regional Health Networks", "Local Government Authorities", "Universities", "Public Sector Agencies", "Education Departments"].map(b => (
            <span key={b} style={{ fontSize: 13, fontWeight: 500, color: "#B0ADA8", letterSpacing: "0.04em" }}>{b}</span>
          ))}
        </div>
      </Reveal>

      <section id="features" style={{ padding: "120px clamp(24px, 8vw, 140px)" }}>
        <Reveal>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 64, flexWrap: "wrap", gap: 24 }}>
            <h2 style={{ fontFamily: "'EB Garamond', serif", fontSize: "clamp(36px, 5vw, 58px)", fontWeight: 400, lineHeight: 1.1 }}>Four pillars.<br />One reliable platform.</h2>
            <p style={{ fontSize: 14, color: MUTED, maxWidth: 280, lineHeight: 1.8, fontWeight: 400 }}>From strategy to deployment to training — Tölt-AI covers the full lifecycle of intelligent automation.</p>
          </div>
        </Reveal>
        <div className="features-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 64px" }}>
          {features.map((f, i) => (
            <Reveal key={f.num} delay={i * 80}>
              <div className="feature-card">
                <span className="feat-num" style={{ fontSize: 11, letterSpacing: "0.14em", color: MUTED, display: "block", marginBottom: 16, transition: "color 0.3s" }}>{f.num}</span>
                <h3 style={{ fontSize: 20, fontWeight: 400, marginBottom: 12, fontFamily: "'EB Garamond', serif", letterSpacing: "0.01em" }}>{f.title}</h3>
                <p style={{ fontSize: 14, color: MUTED, lineHeight: 1.8, fontWeight: 400 }}>{f.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="team" style={{ padding: "120px clamp(24px, 8vw, 140px)", background: "#DCF0F9" }}>
        <Reveal>
          <p style={{ fontSize: 11, letterSpacing: "0.18em", color: ACCENT, textTransform: "uppercase", marginBottom: 16 }}>Who we are</p>
          <h2 style={{ fontFamily: "'EB Garamond', serif", fontSize: "clamp(36px, 5vw, 58px)", fontWeight: 400, marginBottom: 64 }}>Deep expertise.<br />Sector by sector.</h2>
        </Reveal>
        <div className="team-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }}>
          {team.map((m, i) => (
            <Reveal key={m.name} delay={i * 80}>
              <div className="team-card">
                <div style={{ height: 220, background: m.bg, position: "relative", overflow: "hidden" }}>
                  {TeamIllustrations[m.name]}
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(160deg, rgba(42,100,150,0.15) 0%, rgba(17,24,32,0.3) 100%)" }} />
                </div>
                <div style={{ padding: "18px 0 0" }}>
                  <p style={{ fontSize: 15, fontWeight: 400, marginBottom: 4 }}>{m.name}</p>
                  <p style={{ fontSize: 12, color: MUTED, letterSpacing: "0.04em" }}>{m.role}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="testimonials" style={{ padding: "120px clamp(24px, 8vw, 140px)" }}>
        <Reveal>
          <p style={{ fontSize: 11, letterSpacing: "0.18em", color: ACCENT, textTransform: "uppercase", marginBottom: 16 }}>Client voices</p>
          <h2 style={{ fontFamily: "'EB Garamond', serif", fontSize: "clamp(36px, 5vw, 58px)", fontWeight: 400, marginBottom: 64 }}>Trusted where<br />it matters most.</h2>
        </Reveal>
        <div className="testimonials-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          {testimonials.map((t, i) => (
            <Reveal key={i} delay={i * 100}>
              <div className="testimonial-card">
                <p style={{ fontFamily: "'EB Garamond', serif", fontSize: 20, fontWeight: 400, lineHeight: 1.65, marginBottom: 28, fontStyle: "italic" }}>"{t.quote}"</p>
                <div style={{ borderTop: "1px solid #ECEAE5", paddingTop: 20 }}>
                  <p style={{ fontSize: 13, fontWeight: 500, marginBottom: 4 }}>{t.name}</p>
                  <p style={{ fontSize: 12, color: MUTED }}>{t.company}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="contact" style={{ padding: "120px clamp(24px, 8vw, 140px)", background: INK, color: "#FAF9F6" }}>
        <Reveal>
          <div style={{ maxWidth: 560 }}>
            <p style={{ fontSize: 11, letterSpacing: "0.18em", color: ACCENT, textTransform: "uppercase", marginBottom: 20 }}>Work with us</p>
            <h2 style={{ fontFamily: "'EB Garamond', serif", fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 400, lineHeight: 1.1, marginBottom: 24 }}>Ready to automate<br />with confidence?</h2>
            <p style={{ fontSize: 15, color: "#8A8880", fontWeight: 400, lineHeight: 1.8, marginBottom: 48 }}>Tell us about your organisation and we'll tailor a solution for your sector — on-premise, compliant, and built to last.</p>
            {sent ? (
              <div style={{ padding: "28px 32px", border: `1px solid ${ACCENT}`, borderRadius: 2, background: "rgba(42,100,150,0.12)" }}>
                <p style={{ fontSize: 15, color: "#7BB8D8", letterSpacing: "0.04em", marginBottom: 6 }}>✓ Your email client has been opened.</p>
                <p style={{ fontSize: 13, color: "#5A7A90" }}>We look forward to hearing from you at <span style={{ color: "#7BB8D8" }}>ayman@tolt-AI.com</span></p>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 14, maxWidth: 480 }}>
                <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                  <input className="input-field" style={{ flex: 1, minWidth: 180, background: "#162535", border: "1px solid #2A4A65", color: "#FAF9F6" }} type="text" placeholder="Your name" value={name} onChange={e => setName(e.target.value)} />
                  <input className="input-field" style={{ flex: 1, minWidth: 180, background: "#162535", border: "1px solid #2A4A65", color: "#FAF9F6" }} type="email" placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <textarea className="input-field" style={{ background: "#162535", border: "1px solid #2A4A65", color: "#FAF9F6", resize: "vertical", minHeight: 110, lineHeight: 1.7 }} placeholder="Tell us about your organisation and what you're looking to automate…" value={message} onChange={e => setMessage(e.target.value)} onKeyDown={e => e.key === "Enter" && e.ctrlKey && handleSubmit()} />
                <div style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
                  <button className="cta-btn" style={{ background: ACCENT, whiteSpace: "nowrap" }} onClick={handleSubmit}>Get in Touch →</button>
                </div>
              </div>
            )}
          </div>
        </Reveal>
      </section>

      <footer style={{ padding: "32px clamp(24px, 8vw, 140px)", borderTop: "1px solid #1E3A52", background: INK, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
        <ToltLogo size={34} />
        <span style={{ fontSize: 12, color: "#6A6A66", letterSpacing: "0.06em" }}>© 2026 · All rights reserved</span>
      </footer>

      <style>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes bounce { 0%, 100% { transform: translateX(-50%) translateY(0); } 50% { transform: translateX(-50%) translateY(8px); } }
      `}</style>
    </div>
  );
}

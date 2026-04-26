import { useState, useEffect, useRef } from "react";

const RED   = "#CC2200";
const DARK  = "#0D1117";
const NAVY  = "#111820";
const WHITE = "#FFFFFF";
const LIGHT = "#F4F4F2";

// ─── Logo ──────────────────────────────────────────────────────────────────
const ToltLogo = ({ size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none"
    xmlns="http://www.w3.org/2000/svg" style={{ display: "block", flexShrink: 0 }}>
    <rect width="40" height="40" rx="0" fill="#CC2200" />
    <text x="20" y="17" fontFamily="'Heebo', Arial, sans-serif" fontSize="13"
      fontWeight="700" letterSpacing="0.5" fill="#FFFFFF" textAnchor="middle">Tölt</text>
    <text x="35" y="33" fontFamily="'Heebo', Arial, sans-serif" fontSize="10"
      fontWeight="300" letterSpacing="1.5" fill="#FFFFFF" textAnchor="end">AI</text>
  </svg>
);

// ─── Scroll reveal ─────────────────────────────────────────────────────────
const useInView = (threshold = 0.1) => {
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

const Reveal = ({ children, delay = 0, from = "bottom", style: outerStyle = {}, className = "" }) => {
  const [ref, visible] = useInView();
  const origin = { bottom: "translateY(40px)", left: "translateX(-48px)", right: "translateX(48px)" };
  return (
    <div ref={ref} className={className} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "none" : origin[from],
      transition: `opacity 0.85s cubic-bezier(0.4,0,0.2,1) ${delay}ms, transform 0.85s cubic-bezier(0.4,0,0.2,1) ${delay}ms`,
      ...outerStyle,
    }}>
      {children}
    </div>
  );
};

// ─── Scroll indicator ──────────────────────────────────────────────────────
const SECTIONS = ["hero", "whatwedo", "sectors", "solutions", "why", "team", "contact"];

const ScrollIndicator = ({ active }) => (
  <div style={{
    position: "fixed", left: 24, top: "50%", transform: "translateY(-50%)",
    zIndex: 99, display: "flex", flexDirection: "column", alignItems: "center", gap: 10,
  }}>
    {SECTIONS.map((id, i) => (
      <button
        key={id}
        onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })}
        style={{
          width: active === i ? 14 : 6,
          height: active === i ? 14 : 6,
          borderRadius: "50%",
          background: active === i ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.25)",
          border: "none", padding: 0, cursor: "pointer",
          transition: "all 0.35s ease",
          boxShadow: active === i ? "0 0 10px rgba(255,255,255,0.5)" : "none",
        }}
      />
    ))}
  </div>
);

// ─── Data ──────────────────────────────────────────────────────────────────
const pillars = [
  { num: "01", title: "Agentic AI Automation",       desc: "Deploy intelligent agents that plan, reason, and act across your business processes — autonomously completing multi-step workflows that once required entire teams." },
  { num: "02", title: "Business Process Automation", desc: "Map your existing workflows and let Tölt-AI agents handle the repetitive, rule-bound, and data-intensive tasks — freeing your people for high-value work." },
  { num: "03", title: "Local LLM Solutions",          desc: "Run powerful language models entirely within your infrastructure. No data leaves your environment — ideal for healthcare, government, and regulated industries." },
  { num: "04", title: "Adoption and Change Management",       desc: "Ready for being an AI Frontier Firm ? — we upskill. Tailored ACM programmes ensure your teams understand, trust, and confidently unleash the Power of AI." },
];

const differentials = [
  { title: "Enterprise-Grade Reliability", desc: "Production-ready agents with monitoring, fallbacks, and audit trails built in from day one." },
  { title: "Sector Specialisation",        desc: "Deep expertise in healthcare, government, and education — we know your compliance landscape inside out." },
  { title: "On-Premise First",             desc: "Your data never leaves your infrastructure. Full sovereignty, full compliance, full control." },
  { title: "End-to-End Ownership",         desc: "From strategy through deployment to staff enablement — one team, one accountability, no handoffs." },
];

const sectors = [
  "Regional Health Networks",
  "Government Entities",
  "Universities",
  "Public Sector Agencies",
  "Education Departments",
  "Financial Institutions",
];

const team = [
  {
    num: "01", name: "AI Strategy", role: "Enterprise transformation consulting",
    desc: "We begin every engagement with a structured discovery process — mapping your processes, identifying high-value automation targets, and designing a roadmap aligned with your strategic goals.",
  },
  {
    num: "02", name: "Engineering", role: "Agent architecture & LLM integration",
    desc: "Our engineers specialise in LLM integration, multi-agent orchestration, and production deployment — building systems that are robust, observable, and maintainable at scale.",
  },
  {
    num: "03", name: "Sector Experts", role: "Healthcare · Government · Education",
    desc: "Domain specialists embedded in every project — ensuring our solutions respect sector-specific compliance, workflows, and culture from the very first day.",
  },
  {
    num: "04", name: "Training", role: "Enablement & change management",
    desc: "Technology is only as powerful as the people using it. We deliver hands-on training and change management that turns sceptics into confident AI practitioners.",
  },
];

const testimonials = [
  { quote: "Tölt-AI automated our patient intake and triage workflows. Our clinical staff reclaimed hours every shift — without compromising on compliance.", name: "Dr. A. Hassan",   company: "Director of Digital Health, Regional Hospital Network" },
  { quote: "The local LLM deployment was a game-changer for us. Sensitive citizen data stays on-premises, and the agents still perform beautifully.",      name: "M. Okonkwo",    company: "Head of IT, Municipal Government Authority" },
  { quote: "We piloted Tölt-AI across three departments. The training programme made adoption smooth — staff went from sceptical to advocates in two weeks.", name: "Prof. L. Strand", company: "VP Operations, National University" },
];

// ─── App ───────────────────────────────────────────────────────────────────
export default function ToltAILanding() {
  const [scrolled,       setScrolled]       = useState(false);
  const [activeSection,  setActiveSection]  = useState(0);
  const [name,           setName]           = useState("");
  const [email,          setEmail]          = useState("");
  const [message,        setMessage]        = useState("");
  const [sent,           setSent]           = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const idx = SECTIONS.indexOf(entry.target.id);
          if (idx !== -1) setActiveSection(idx);
        }
      });
    }, { threshold: 0.4 });
    SECTIONS.forEach(id => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const handleSubmit = () => {
    if (!email.includes("@")) return;
    const subject = encodeURIComponent("Enquiry from Tölt-AI Website");
    const body    = encodeURIComponent(
      `Name: ${name || "Not provided"}\nEmail: ${email}\n\nMessage:\n${message || "I'd like to learn more."}`
    );
    window.open(`mailto:ayman@tolt-AI.com?subject=${subject}&body=${body}`, "_blank");
    setSent(true); setName(""); setEmail(""); setMessage("");
  };

  const scrollTo = id => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <div style={{ background: DARK, color: WHITE, fontFamily: "'Heebo', sans-serif", overflowX: "hidden" }}>

      <ScrollIndicator active={activeSection} />

      {/* ── Global styles ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Heebo:wght@100;300;400;500;700;800&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        ::selection { background: ${RED}; color: #fff; }
        a { text-decoration: none; color: inherit; }
        button { cursor: pointer; border: none; background: none; font-family: inherit; }

        .nav-link {
          font-size: 11px; font-weight: 300; letter-spacing: 0.18em;
          color: rgba(255,255,255,0.6); text-transform: uppercase;
          transition: color 0.25s;
        }
        .nav-link:hover { color: ${WHITE}; }

        .btn-red {
          background: ${RED}; color: #fff;
          padding: 14px 38px; font-size: 11px; font-weight: 500;
          letter-spacing: 0.14em; text-transform: uppercase;
          transition: background 0.25s, transform 0.2s;
          display: inline-block; border-radius: 0;
        }
        .btn-red:hover { background: #a81c00; transform: translateY(-2px); }

        .btn-outline {
          border: 1px solid rgba(255,255,255,0.3); color: #fff;
          padding: 13px 34px; font-size: 11px; font-weight: 300;
          letter-spacing: 0.14em; text-transform: uppercase;
          transition: border-color 0.25s, background 0.25s;
          display: inline-block; border-radius: 0;
        }
        .btn-outline:hover { border-color: ${RED}; background: rgba(204,34,0,0.08); }

        .pillar-card {
          border-left: 2px solid ${RED}; padding: 36px 32px;
          background: #161d27; color: ${WHITE};
          transition: transform 0.3s, box-shadow 0.3s;
        }
        .pillar-card:hover { transform: translateY(-4px); box-shadow: 0 16px 48px rgba(0,0,0,0.4); }

        .diff-card {
          border-left: 2px solid rgba(204,34,0,0.35); padding: 28px 32px;
          transition: border-color 0.3s;
        }
        .diff-card:hover { border-color: ${RED}; }

        .team-card { border-top: 2px solid ${RED}; padding: 32px 0; color: ${WHITE}; }

        .testi-card { border-top: 1px solid rgba(255,255,255,0.08); padding: 40px 0; }

        .input-field {
          background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.12);
          padding: 14px 18px; font-size: 14px; font-family: 'Heebo', sans-serif;
          font-weight: 300; color: #fff; width: 100%; outline: none; border-radius: 0;
          transition: border-color 0.2s;
        }
        .input-field:focus { border-color: ${RED}; }
        .input-field::placeholder { color: rgba(255,255,255,0.28); }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes scrollBounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50%       { transform: translateX(-50%) translateY(10px); }
        }

        @media (max-width: 900px) {
          .hide-sm { display: none !important; }
          .pillars-grid  { grid-template-columns: 1fr !important; }
          .diff-grid     { grid-template-columns: 1fr !important; }
          .team-grid     { grid-template-columns: 1fr 1fr !important; }
          .testi-grid    { grid-template-columns: 1fr !important; }
          .two-col       { flex-direction: column !important; gap: 48px !important; }
        }
      `}</style>

      {/* ══════════════════════════════════════════════════════
          NAV
      ══════════════════════════════════════════════════════ */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, height: 80,
        padding: "0 clamp(24px, 6vw, 100px)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: scrolled ? "rgba(13,17,23,0.96)" : "transparent",
        backdropFilter: scrolled ? "blur(18px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.05)" : "1px solid transparent",
        transition: "all 0.4s ease",
      }}>
        <a href="/" style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <ToltLogo size={36} />
          <span style={{ fontSize: 14, fontWeight: 300, letterSpacing: "0.18em", color: WHITE }}>
            Tölt-AI
          </span>
        </a>
        <div className="hide-sm" style={{ display: "flex", gap: 44, alignItems: "center" }}>
          {[["Solutions", "solutions"], ["Sectors", "sectors"], ["Team", "team"], ["Contact", "contact"]].map(([label, id]) => (
            <button key={id} className="nav-link" onClick={() => scrollTo(id)}>{label}</button>
          ))}
        </div>
      </nav>

      {/* ══════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════ */}
      <section id="hero" style={{
        minHeight: "100vh",
        display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",
        textAlign: "center",
        padding: "140px clamp(24px, 8vw, 160px) 100px",
        position: "relative", overflow: "hidden",
        background: `linear-gradient(155deg, #0D1117 0%, #1a0800 55%, #0D1117 100%)`,
      }}>
        {/* Subtle grid */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: `linear-gradient(rgba(204,34,0,0.035) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(204,34,0,0.035) 1px, transparent 1px)`,
          backgroundSize: "90px 90px",
        }} />
        {/* Red ambient glow */}
        <div style={{
          position: "absolute", top: "35%", left: "50%", transform: "translate(-50%, -50%)",
          width: "70vw", height: "70vw", maxWidth: 900, maxHeight: 900, pointerEvents: "none",
          background: "radial-gradient(circle, rgba(204,34,0,0.11) 0%, transparent 65%)",
        }} />

        <div style={{ position: "relative", maxWidth: 880 }}>
          <div style={{ marginBottom: 44, animation: "fadeUp 0.6s ease both" }}>
            <ToltLogo size={68} />
          </div>
          <p style={{
            fontSize: 10, letterSpacing: "0.28em", color: RED, fontWeight: 500,
            textTransform: "uppercase", marginBottom: 36,
            animation: "fadeUp 0.75s 0.05s ease both",
          }}>
            Reliable Agentic AI · Enterprise Ready
          </p>
          <h1 style={{
            fontFamily: "'Heebo', sans-serif",
            fontSize: "clamp(48px, 7.5vw, 96px)",
            fontWeight: 100, lineHeight: 1.06, letterSpacing: "-0.01em",
            textTransform: "uppercase", marginBottom: 40,
            animation: "fadeUp 0.9s 0.12s ease both",
          }}>
            Automate the work.<br />
            <span style={{ color: RED, fontWeight: 300 }}>Amplify</span> the people.
          </h1>
          <p style={{
            fontSize: 17, fontWeight: 300, color: "rgba(255,255,255,0.5)",
            lineHeight: 1.85, maxWidth: 520, margin: "0 auto 56px",
            animation: "fadeUp 0.9s 0.22s ease both",
          }}>
            Tölt-AI delivers reliable agentic AI solutions that transform business
            processes in healthcare, government, and education — securely, on your terms.
          </p>
          <div style={{
            display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center",
            animation: "fadeUp 0.9s 0.32s ease both",
          }}>
            <button className="btn-red" onClick={() => scrollTo("contact")}>Book a Discovery Call</button>
            <button className="btn-outline" onClick={() => scrollTo("solutions")}>See Our Solutions</button>
          </div>
        </div>

        <div style={{
          position: "absolute", bottom: 40, left: "50%",
          display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
          animation: "scrollBounce 2.5s infinite",
        }}>
          <span style={{ fontSize: 8, letterSpacing: "0.22em", color: "rgba(255,255,255,0.25)", textTransform: "uppercase" }}>Scroll</span>
          <div style={{ width: 1, height: 44, background: `linear-gradient(to bottom, ${RED}, transparent)` }} />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          WHAT WE DO
      ══════════════════════════════════════════════════════ */}
      <section id="whatwedo" style={{
        minHeight: "100vh", display: "flex", alignItems: "center",
        padding: "120px clamp(24px, 8vw, 140px)",
        background: NAVY, position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", right: 0, top: 0, bottom: 0, width: "40%", pointerEvents: "none",
          background: "linear-gradient(to left, rgba(204,34,0,0.04), transparent)",
        }} />
        <div className="two-col" style={{ display: "flex", gap: "8vw", alignItems: "center", width: "100%" }}>
          <Reveal from="left" style={{ flex: "1 1 300px" }}>
            <p style={{ fontSize: 10, letterSpacing: "0.24em", color: RED, textTransform: "uppercase", marginBottom: 24, fontWeight: 500 }}>
              What We Do
            </p>
            <h2 style={{
              fontFamily: "'Heebo', sans-serif",
              fontSize: "clamp(40px, 6vw, 80px)",
              fontWeight: 100, lineHeight: 1.07, textTransform: "uppercase",
            }}>
              Intelligence<br />built for<br />the real world.
            </h2>
          </Reveal>
          <Reveal from="right" delay={160} style={{ flex: "1 1 300px", borderLeft: `2px solid ${RED}`, paddingLeft: 44 }}>
            <p style={{ fontSize: 17, fontWeight: 300, color: "rgba(255,255,255,0.6)", lineHeight: 1.9, marginBottom: 28 }}>
              We design and deploy agentic AI systems that operate reliably inside complex,
              regulated environments. Not demos — production systems that replace manual
              processes, reduce risk, and deliver measurable ROI from day one.
            </p>
            <p style={{ fontSize: 17, fontWeight: 300, color: "rgba(255,255,255,0.6)", lineHeight: 1.9 }}>
              From strategy through engineering to enablement, Tölt-AI is the partner
              that stays with you for the full journey.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTORS
      ══════════════════════════════════════════════════════ */}
      <section id="sectors" style={{
        minHeight: "80vh", display: "flex", flexDirection: "column", justifyContent: "center",
        padding: "120px clamp(24px, 8vw, 140px)",
        background: DARK, position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "radial-gradient(ellipse at 50% 50%, rgba(204,34,0,0.07) 0%, transparent 60%)",
        }} />
        <Reveal style={{ textAlign: "center" }}>
          <p style={{ fontSize: 10, letterSpacing: "0.24em", color: RED, textTransform: "uppercase", marginBottom: 20, fontWeight: 500 }}>
            Deployed Across
          </p>
          <h2 style={{
            fontFamily: "'Heebo', sans-serif",
            fontSize: "clamp(36px, 5vw, 68px)",
            fontWeight: 100, textTransform: "uppercase", lineHeight: 1.1, marginBottom: 72,
          }}>
            Trusted where<br />it matters most.
          </h2>
        </Reveal>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", rowGap: 16, columnGap: "clamp(20px, 4vw, 60px)" }}>
          {sectors.map((s, i) => (
            <Reveal key={s} delay={i * 60}>
              <span style={{
                fontSize: "clamp(18px, 2.8vw, 34px)", fontWeight: 100,
                color: "rgba(255,255,255,0.3)", textTransform: "uppercase",
                letterSpacing: "0.04em", display: "inline-block",
              }}>
                {s}
              </span>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          FOUR PILLARS
      ══════════════════════════════════════════════════════ */}
      <section id="solutions" style={{
        padding: "120px clamp(24px, 8vw, 140px)",
        background: DARK, color: WHITE,
      }}>
        <Reveal style={{ textAlign: "center" }}>
          <p style={{ fontSize: 10, letterSpacing: "0.24em", color: RED, textTransform: "uppercase", marginBottom: 20, fontWeight: 500 }}>
            Our Solutions
          </p>
          <h2 style={{
            fontFamily: "'Heebo', sans-serif",
            fontSize: "clamp(36px, 5vw, 72px)",
            fontWeight: 100, textTransform: "uppercase", lineHeight: 1.07, marginBottom: 20,
          }}>
            Four pillars.<br />One platform.
          </h2>
          <p style={{ fontSize: 14, fontWeight: 300, color: "rgba(255,255,255,0.45)", maxWidth: 400, lineHeight: 1.85, marginBottom: 80, margin: "0 auto 80px" }}>
            From strategy to deployment to training — Tölt-AI covers the full lifecycle
            of intelligent automation.
          </p>
        </Reveal>
        <div className="pillars-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 3 }}>
          {pillars.map((p, i) => (
            <Reveal key={p.num} delay={i * 80}>
              <div className="pillar-card">
                <span style={{ fontSize: 10, letterSpacing: "0.2em", color: RED, display: "block", marginBottom: 22, fontWeight: 500 }}>
                  {p.num}
                </span>
                <h3 style={{ fontSize: 21, fontWeight: 400, marginBottom: 16, letterSpacing: "0.01em", color: WHITE }}>{p.title}</h3>
                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.88, fontWeight: 300 }}>{p.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          WHY TÖLT-AI
      ══════════════════════════════════════════════════════ */}
      <section id="why" style={{
        minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center",
        padding: "120px clamp(24px, 8vw, 140px)",
        background: NAVY, position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", left: 0, bottom: 0, width: "50%", height: "50%", pointerEvents: "none",
          background: "radial-gradient(circle at bottom left, rgba(204,34,0,0.07), transparent 60%)",
        }} />
        <Reveal style={{ textAlign: "center" }}>
          <p style={{ fontSize: 10, letterSpacing: "0.24em", color: RED, textTransform: "uppercase", marginBottom: 20, fontWeight: 500 }}>
            Why Tölt-AI
          </p>
          <h2 style={{
            fontFamily: "'Heebo', sans-serif",
            fontSize: "clamp(36px, 5vw, 72px)",
            fontWeight: 100, textTransform: "uppercase", lineHeight: 1.07, marginBottom: 80,
          }}>
            Built different.<br />Delivered differently.
          </h2>
        </Reveal>
        <div className="diff-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4px 60px" }}>
          {differentials.map((d, i) => (
            <Reveal key={d.title} delay={i * 80}>
              <div className="diff-card">
                <h3 style={{ fontSize: 19, fontWeight: 400, marginBottom: 14, color: WHITE }}>{d.title}</h3>
                <p style={{ fontSize: 14, fontWeight: 300, color: "rgba(255,255,255,0.5)", lineHeight: 1.88 }}>{d.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          TEAM / EXPERTISE
      ══════════════════════════════════════════════════════ */}
      <section id="team" style={{
        padding: "120px clamp(24px, 8vw, 140px)",
        background: NAVY, color: WHITE,
      }}>
        <Reveal style={{ textAlign: "center" }}>
          <p style={{ fontSize: 10, letterSpacing: "0.24em", color: RED, textTransform: "uppercase", marginBottom: 20, fontWeight: 500 }}>
            Who We Are
          </p>
          <h2 style={{
            fontFamily: "'Heebo', sans-serif",
            fontSize: "clamp(36px, 5vw, 72px)",
            fontWeight: 100, textTransform: "uppercase", lineHeight: 1.07, marginBottom: 80,
          }}>
            End to end Support.
          </h2>
        </Reveal>
        <div className="team-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0 40px" }}>
          {team.map((m, i) => (
            <Reveal key={m.name} delay={i * 80}>
              <div className="team-card">
                <p style={{ fontSize: 10, letterSpacing: "0.2em", color: RED, textTransform: "uppercase", marginBottom: 18, fontWeight: 500 }}>
                  {m.num}
                </p>
                <h3 style={{ fontSize: 19, fontWeight: 500, marginBottom: 8, color: WHITE }}>{m.name}</h3>
                <p style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", letterSpacing: "0.07em", marginBottom: 20, textTransform: "uppercase", fontWeight: 400 }}>
                  {m.role}
                </p>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", lineHeight: 1.88, fontWeight: 300 }}>{m.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          CONTACT
      ══════════════════════════════════════════════════════ */}
      <section id="contact" style={{
        minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center",
        alignItems: "center", textAlign: "center",
        padding: "120px clamp(24px, 8vw, 140px)",
        background: NAVY, position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "radial-gradient(ellipse at 50% 50%, rgba(204,34,0,0.06), transparent 60%)",
        }} />
        <Reveal style={{ width: "100%", maxWidth: 640 }}>
          <p style={{ fontSize: 10, letterSpacing: "0.24em", color: RED, textTransform: "uppercase", marginBottom: 20, fontWeight: 500 }}>
            Work With Us
          </p>
          <h2 style={{
            fontFamily: "'Heebo', sans-serif",
            fontSize: "clamp(36px, 5vw, 72px)",
            fontWeight: 100, textTransform: "uppercase", lineHeight: 1.07, marginBottom: 18,
          }}>
            Ready to automate<br />with confidence?
          </h2>
          <p style={{ fontSize: 12, fontWeight: 300, color: "rgba(255,255,255,0.35)", marginBottom: 56, lineHeight: 1.8 }}>
            Tell us about your organisation and we'll tailor a solution for your sector.
          </p>
        </Reveal>

        {sent ? (
          <Reveal style={{ width: "100%", maxWidth: 640 }}>
            <div style={{ padding: "36px 40px", border: `1px solid ${RED}`, background: "rgba(204,34,0,0.07)" }}>
              <p style={{ fontSize: 15, color: RED, marginBottom: 10, fontWeight: 400 }}>✓ Email client opened.</p>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", fontWeight: 300 }}>We look forward to hearing from you.</p>
            </div>
          </Reveal>
        ) : (
          <Reveal delay={100} style={{ width: "100%", maxWidth: 640 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, textAlign: "left" }}>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <input className="input-field" style={{ flex: "1 1 200px" }} type="text"
                  placeholder="Your name" value={name} onChange={e => setName(e.target.value)} />
                <input className="input-field" style={{ flex: "1 1 200px" }} type="email"
                  placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)} />
              </div>
              <textarea className="input-field" style={{ resize: "vertical", minHeight: 130, lineHeight: 1.75 }}
                placeholder="Tell us about your organisation and what you're looking to automate…"
                value={message} onChange={e => setMessage(e.target.value)}
                onKeyDown={e => e.key === "Enter" && e.ctrlKey && handleSubmit()} />
              <div style={{ marginTop: 6, textAlign: "center" }}>
                <button className="btn-red" onClick={handleSubmit}>Get in Touch →</button>
              </div>
            </div>
          </Reveal>
        )}
      </section>

      {/* ══════════════════════════════════════════════════════
          FOOTER
      ══════════════════════════════════════════════════════ */}
      <footer style={{
        padding: "28px clamp(24px, 8vw, 140px)",
        borderTop: "1px solid rgba(255,255,255,0.05)",
        background: DARK,
        display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <ToltLogo size={30} />
          <span style={{ fontSize: 12, fontWeight: 300, letterSpacing: "0.16em", color: "rgba(255,255,255,0.35)" }}>
            Tölt-AI
          </span>
        </div>
        <span style={{ fontSize: 10, color: "rgba(255,255,255,0.2)", letterSpacing: "0.1em", fontWeight: 300 }}>
          © 2026 Tölt-AI · All rights reserved
        </span>
      </footer>
    </div>
  );
}

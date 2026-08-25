import { createFileRoute } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import portrait from "@/assets/asnar-portrait.png";
import collegeHome from "@/assets/home.png";
import collegeAdmin from "@/assets/admin.png";
import collegeStudent from "@/assets/student prodile.png";
import collegeTeacher from "@/assets/teacher profile.png";
import collegeCampus from "@/assets/abdul rehman campus.png";
import "../styles/portfolio.css";

export const Route = createFileRoute("/")({
  component: Index,
});

const FORM_ENDPOINT = "https://api.web3forms.com/submit";
const CONTACT_EMAIL = "ansarabbas140@gmail.com";
const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY as string | undefined;
const GITHUB_URL = "https://github.com/Ansar51214";
const LINKEDIN_URL = "https://www.linkedin.com/in/ansar-abbas-awan";
const ABU_BAKAR_PORTFOLIO_URL = "https://ansar51214.github.io/abu-bakar-shah-portfolio/";
const ABU_BAKAR_SOURCE_URL = "https://github.com/Ansar51214/abu-bakar-shah-portfolio";
const WHATSAPP_URL =
  "https://wa.me/923277336712?text=" +
  encodeURIComponent("Hi Ansar, I visited your portfolio and would like to discuss a project.");

const navLinks = [
  { href: "#hero", label: "Home" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

const skills = [
  {
    num: "01",
    title: "Web Development",
    desc: "Full-stack and institutional websites — college portals, CMS builds, and polished front-ends with production-ready delivery.",
    years: "5+ years",
    width: "88%",
    green: false,
  },
  {
    num: "02",
    title: "AI-Assisted Development",
    desc: "Rapid, high-quality shipping with modern AI tooling (Lovable, Claude, Replit) while keeping structure, performance, and handoff clean.",
    years: "1+ year",
    width: "65%",
    green: false,
  },
  {
    num: "03",
    title: "Digital Marketing",
    desc: "SEO foundations, content strategy, and paid campaigns focused on measurable visibility and lead quality — not vanity metrics.",
    years: "2 years",
    width: "72%",
    green: true,
  },
  {
    num: "04",
    title: "n8n Automation",
    desc: "Workflow automation, webhooks, and API integrations that cut repetitive admin and keep follow-ups reliable.",
    years: "6+ months",
    width: "50%",
    green: false,
  },
  {
    num: "05",
    title: "Education & Training",
    desc: "Nine years teaching computer science (MSCS). Clear communication, mentoring, and systems that serve students and staff.",
    years: "9 years",
    width: "95%",
    green: true,
  },
  {
    num: "06",
    title: "Rapid Prototyping",
    desc: "Browser-based builds and fast iterations on Replit and modern stacks — from concept screens to deployable demos.",
    years: "Active",
    width: "58%",
    green: false,
  },
];

const experience = [
  {
    year: "2024 – Present",
    title: "Freelance Web & AI-Assisted Builds",
    desc: "Delivering client and institutional sites from brief to deploy — modern UI, solid structure, and practical handoff using Lovable, Claude, and production workflows.",
    tags: ["Lovable", "Claude", "Replit", "Client delivery"],
  },
  {
    year: "2024 – Present",
    title: "Automation Specialist (n8n)",
    desc: "Designing lead capture, notifications, and app-to-app pipelines so teams spend less time on repetitive tasks and more on core work.",
    tags: ["n8n", "APIs", "Webhooks", "No-code"],
  },
  {
    year: "2022 – 2024",
    title: "Digital Marketing",
    desc: "Full-cycle campaigns: SEO, content, social, and paid ads aimed at growth you can track — traffic, inquiries, and clarity of offer.",
    tags: ["SEO", "Content", "Paid ads"],
  },
  {
    year: "2019 – Present",
    title: "Web Developer",
    desc: "Five-plus years building web projects including a complete college management experience — public pages, campus content, and role-based portal screens.",
    tags: ["HTML/CSS", "JavaScript", "CMS", "Institutions"],
  },
  {
    year: "2015 – Present",
    title: "Educator & Lecturer (MSCS)",
    desc: "Nine years teaching computer science and technology — curriculum delivery, mentoring, and the discipline to explain complex systems simply.",
    tags: ["MSCS", "Computer science", "Mentoring"],
  },
];

function Index() {
  const [loaded, setLoaded] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);

  const [cfName, setCfName] = useState("");
  const [cfEmail, setCfEmail] = useState("");
  const [cfMsg, setCfMsg] = useState("");
  const [cfStatus, setCfStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [cfError, setCfError] = useState<string | null>(null);

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCfError(null);

    const name = cfName.trim();
    const email = cfEmail.trim();
    const message = cfMsg.trim();

    if (!name || !email || !message) {
      setCfError("Please fill in all fields.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setCfError("Please enter a valid email address.");
      return;
    }
    if (!WEB3FORMS_ACCESS_KEY) {
      setCfError("Contact form is not configured yet. Please email or WhatsApp me directly.");
      return;
    }

    setCfStatus("loading");
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          name,
          email,
          message,
          subject: `Portfolio inquiry from ${name}`,
        }),
      });
      if (!res.ok) throw new Error("Request failed");
      setCfStatus("success");
      setCfName("");
      setCfEmail("");
      setCfMsg("");
      setTimeout(() => setCfStatus("idle"), 5000);
    } catch {
      setCfStatus("error");
      setCfError("Something went wrong. Please try again or use WhatsApp.");
    }
  };

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 350);

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

    const onScroll = () => {
      document.body.classList.toggle("scrolled", window.scrollY > 30);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const isMobileViewport = window.matchMedia("(max-width: 760px)").matches;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let tx = 0;
    let ty = 0;
    let rx = 0;
    let ry = 0;
    const onMove = (ev: MouseEvent) => {
      tx = ev.clientX;
      ty = ev.clientY;
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${tx - 4}px, ${ty - 4}px, 0)`;
      }
    };
    const tick = () => {
      rx += (tx - rx) * 0.18;
      ry += (ty - ry) * 0.18;
      if (cursorRingRef.current) {
        cursorRingRef.current.style.transform = `translate3d(${rx - 18}px, ${ry - 18}px, 0)`;
      }
      raf = requestAnimationFrame(tick);
    };
    if (!isTouch && !reduceMotion) {
      window.addEventListener("mousemove", onMove);
      raf = requestAnimationFrame(tick);
      const hoverables = document.querySelectorAll(
        "a, button, .skill-card, .project-card, .hero-photo",
      );
      const enter = () => document.body.classList.add("cursor-hover");
      const leave = () => document.body.classList.remove("cursor-hover");
      hoverables.forEach((el) => {
        el.addEventListener("mouseenter", enter);
        el.addEventListener("mouseleave", leave);
      });
    }

    const counters = document.querySelectorAll<HTMLElement>("[data-count]");
    const counterIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          const target = Number(el.dataset.count || "0");
          const dur = reduceMotion ? 1 : 1100;
          const start = performance.now();
          const step = (now: number) => {
            const p = Math.min(1, (now - start) / dur);
            const eased = 1 - Math.pow(1 - p, 3);
            el.textContent = String(Math.round(target * eased));
            if (p < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
          counterIO.unobserve(el);
        });
      },
      { threshold: 0.5 },
    );
    counters.forEach((c) => counterIO.observe(c));

    const cards = document.querySelectorAll<HTMLElement>(".project-card");
    const tiltHandlers: Array<{
      el: HTMLElement;
      move: (e: MouseEvent) => void;
      leave: () => void;
    }> = [];
    if (!isMobileViewport && !reduceMotion) {
      cards.forEach((el) => {
        const move = (e: MouseEvent) => {
          const r = el.getBoundingClientRect();
          const x = (e.clientX - r.left) / r.width - 0.5;
          const y = (e.clientY - r.top) / r.height - 0.5;
          el.style.transform = `perspective(1000px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translateY(-6px)`;
        };
        const leave = () => {
          el.style.transform = "";
        };
        el.addEventListener("mousemove", move);
        el.addEventListener("mouseleave", leave);
        tiltHandlers.push({ el, move, leave });
      });
    }

    return () => {
      clearTimeout(t);
      io.disconnect();
      counterIO.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
      tiltHandlers.forEach(({ el, move, leave }) => {
        el.removeEventListener("mousemove", move);
        el.removeEventListener("mouseleave", leave);
      });
    };
  }, []);

  const particles = Array.from({ length: 18 });

  return (
    <div className="portfolio">
      <div className="particles" aria-hidden="true">
        {particles.map((_, i) => (
          <span
            key={i}
            className="particle"
            style={{
              left: `${(i * 5.3) % 100}%`,
              animationDuration: `${14 + (i % 6) * 2}s`,
              animationDelay: `${(i % 9) * -1.4}s`,
              width: `${2 + (i % 3)}px`,
              height: `${2 + (i % 3)}px`,
            }}
          />
        ))}
      </div>

      <div className={`page-loader${loaded ? " gone" : ""}`}>
        <div className="loader-mark">
          A<span>.</span>
        </div>
      </div>

      <div ref={cursorRef} className="cursor-dot" aria-hidden="true" />
      <div ref={cursorRingRef} className="cursor-ring" aria-hidden="true" />

      <nav className={`site-nav${navOpen ? " open" : ""}`} aria-label="Primary navigation">
        <div className="logo">
          <a href="#hero" onClick={() => setNavOpen(false)}>
            Ansar<span>.</span>
          </a>
        </div>
        <button
          type="button"
          className="nav-toggle"
          aria-label={navOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={navOpen}
          aria-controls="primary-nav-links"
          onClick={() => setNavOpen((open) => !open)}
        >
          {navOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
        </button>
        <ul className="nav-links" id="primary-nav-links">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a href={link.href} onClick={() => setNavOpen(false)}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <section id="hero" className="reveal">
        <div className="hero-bg" aria-hidden="true">
          <div className="grid-lines" />
          <div className="orb orb-a" />
          <div className="orb orb-b" />
        </div>
        <div className="hero-grid">
          <div className="hero-inner">
            <div className="hero-badge">
              <div className="badge-dot"></div>Available for freelance & institutional projects
            </div>
            <h1 className="hero-name">
              <span className="name-line">Ansar</span>
              <em className="name-line">Abbas</em>
            </h1>
            <p className="hero-tagline">
              I help colleges, businesses, and professionals ship modern websites, management systems,
              and smart automation — clearer online presence, less admin work, and results you can measure.
            </p>
            <div className="hero-stats">
              <div className="stat-item">
                <div className="stat-num">
                  <span data-count="5">0</span>
                  <span>+</span>
                </div>
                <div className="stat-label">Years Web Dev</div>
              </div>
              <div className="stat-item">
                <div className="stat-num">
                  <span data-count="2">0</span>
                  <span>yr</span>
                </div>
                <div className="stat-label">Digital Marketing</div>
              </div>
              <div className="stat-item">
                <div className="stat-num">
                  <span data-count="9">0</span>
                  <span>yr</span>
                </div>
                <div className="stat-label">Teaching</div>
              </div>
              <div className="stat-item">
                <div className="stat-num">MSCS</div>
                <div className="stat-label">Qualification</div>
              </div>
            </div>
            <div className="hero-cta">
              <a href="#projects" className="btn-primary">
                View case studies
              </a>
              <a href="#contact" className="btn-outline">
                Start a project
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
              >
                WhatsApp
              </a>
            </div>
          </div>
          <div className="hero-photo">
            <img src={portrait} alt="Professional portrait of Ansar Abbas" />
          </div>
        </div>
      </section>

      <section id="skills" className="reveal">
        <div className="section-label">Expertise</div>
        <h2 className="section-title">Skills & tools</h2>
        <div className="skills-grid">
          {skills.map((s) => (
            <div className="skill-card" key={s.num}>
              <div className="skill-icon-row">
                <span className="skill-dot" aria-hidden="true" />
                <span className="skill-num">{s.num}</span>
              </div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              <div className="skill-years">{s.years}</div>
              <div className="skill-bar">
                <div
                  className={`skill-fill${s.green ? " green" : ""}`}
                  style={{ width: s.width }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="experience" className="reveal">
        <div className="section-label">Journey</div>
        <h2 className="section-title">Experience</h2>
        <div>
          {experience.map((e) => (
            <div className="exp-item" key={e.title}>
              <div className="exp-year">{e.year}</div>
              <div className="exp-content">
                <h3>{e.title}</h3>
                <p>{e.desc}</p>
                {e.tags.map((t) => (
                  <span className="tag" key={t}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="projects" className="reveal">
        <div className="section-label">Work</div>
        <h2 className="section-title">Featured case studies</h2>
        <div className="projects-grid">
          <div className="project-card featured has-preview">
            <div className="featured-badge red">Case study</div>
            <div className="project-mockup" aria-label="College website preview">
              <div className="mockup-bar">
                <span className="mockup-dot red" />
                <span className="mockup-dot yellow" />
                <span className="mockup-dot green" />
              </div>
              <div className="mockup-thumb slideshow">
                <img src={collegeHome} alt="College home page" className="slide" loading="lazy" />
                <img
                  src={collegeAdmin}
                  alt="College admin dashboard"
                  className="slide"
                  loading="lazy"
                />
                <img
                  src={collegeStudent}
                  alt="College student portal"
                  className="slide"
                  loading="lazy"
                />
                <img
                  src={collegeTeacher}
                  alt="College teacher portal"
                  className="slide"
                  loading="lazy"
                />
                <img
                  src={collegeCampus}
                  alt="College campus page"
                  className="slide"
                  loading="lazy"
                />
              </div>
            </div>
            <div className="project-num">01</div>
            <h3>College management website</h3>
            <p>
              End-to-end institutional web experience: admissions and departments, faculty and campus
              pages, plus portal-style screens for administrators, students, and teachers — built for
              clarity and day-to-day use, not just a brochure site.
            </p>
            <div className="project-footer">
              <span className="tech-stack">HTML / CSS / CMS · Institutional</span>
              <div className="project-actions">
                <a href="#contact" className="project-btn">
                  Request walkthrough
                </a>
                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-btn ghost"
                >
                  GitHub
                </a>
              </div>
            </div>
          </div>

          <div className="project-card">
            <div className="status-badge live">Live</div>
            <div className="project-num">02</div>
            <h3>Personal portfolio (this site)</h3>
            <p>
              Conversion-focused personal brand site: clear offer, case studies, contact workflow,
              and a refined glass interface so clients and recruiters can evaluate work in one scroll.
            </p>
            <div className="project-footer">
              <span className="tech-stack">React · TanStack · Vite</span>
              <div className="project-actions">
                <a href="#hero" className="project-btn">
                  You are here
                </a>
                <a
                  href={`${GITHUB_URL}/Portfolio-`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-btn ghost"
                >
                  Source
                </a>
              </div>
            </div>
          </div>

          <div className="project-card">
            <div className="status-badge live">Client live</div>
            <div className="project-num">03</div>
            <h3>Education leader portfolio</h3>
            <p>
              Professional site for Muhammad Abu Bakar Siddique Shah — public-sector education
              leadership, literacy impact, initiatives, media, and official contact in a polished
              single-page experience.
            </p>
            <div className="project-footer">
              <span className="tech-stack">HTML / CSS · GitHub Pages</span>
              <div className="project-actions">
                <a
                  href={ABU_BAKAR_PORTFOLIO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-btn"
                >
                  Live site
                </a>
                <a
                  href={ABU_BAKAR_SOURCE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-btn ghost"
                >
                  Source
                </a>
              </div>
            </div>
          </div>

          <div className="project-card">
            <div className="status-badge live">Workflows</div>
            <div className="project-num">04</div>
            <h3>Automation workflow systems</h3>
            <p>
              Practical automation concepts for lead capture, follow-up reminders, form alerts, and
              app-to-app flows — designed to reduce manual admin without locking teams into rigid tools.
            </p>
            <div className="project-footer">
              <span className="tech-stack">n8n · APIs · Webhooks</span>
              <div className="project-actions">
                <a href="#contact" className="project-btn">
                  Discuss automation
                </a>
                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-btn ghost"
                >
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="reveal">
        <div className="section-label">Let's connect</div>
        <h2 className="section-title">Get in touch</h2>
        <div className="contact-inner">
          <div className="contact-wrap">
            <h2>Ready to build something solid?</h2>
            <p>
              Website, college system, marketing support, or automation — tell me the goal and I'll
              reply with a clear next step.
            </p>
            <a href={`mailto:${CONTACT_EMAIL}`} className="contact-email">
              {CONTACT_EMAIL}
            </a>
            <form className="contact-form" onSubmit={handleContactSubmit} noValidate>
              <div className="field">
                <input
                  id="cf-name"
                  type="text"
                  placeholder=" "
                  value={cfName}
                  onChange={(e) => setCfName(e.target.value)}
                  maxLength={100}
                  required
                  autoComplete="name"
                />
                <label htmlFor="cf-name">Your name</label>
              </div>
              <div className="field">
                <input
                  id="cf-email"
                  type="email"
                  placeholder=" "
                  value={cfEmail}
                  onChange={(e) => setCfEmail(e.target.value)}
                  maxLength={255}
                  required
                  autoComplete="email"
                />
                <label htmlFor="cf-email">Email address</label>
              </div>
              <div className="field">
                <textarea
                  id="cf-msg"
                  placeholder=" "
                  value={cfMsg}
                  onChange={(e) => setCfMsg(e.target.value)}
                  maxLength={2000}
                  required
                />
                <label htmlFor="cf-msg">Project details or message</label>
              </div>
              {cfError && (
                <div className="form-error" role="alert">
                  {cfError}
                </div>
              )}
              {cfStatus === "success" && (
                <div className="form-success" role="status">
                  Message sent — I'll get back to you soon.
                </div>
              )}
              <div className="form-actions">
                <button type="submit" className="btn-neon" disabled={cfStatus === "loading"}>
                  {cfStatus === "loading" ? "Sending..." : "Send message"}
                </button>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp"
                >
                  WhatsApp
                </a>
              </div>
            </form>
            <div className="social-row">
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="social-btn"
              >
                LinkedIn
              </a>
              <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="social-btn">
                GitHub
              </a>
              <a
                href="https://web.facebook.com/ansar.abbas.5283/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-btn"
              >
                Facebook
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="social-btn"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <span>&copy; {new Date().getFullYear()} Ansar Abbas · All rights reserved</span>
        <span>MSCS · Web · Marketing · Automation</span>
      </footer>
    </div>
  );
}

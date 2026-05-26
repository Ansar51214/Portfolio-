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
const WHATSAPP_URL =
  "https://wa.me/923277336712?text=" +
  encodeURIComponent("Hi, I visited your portfolio and want to contact you");

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
    desc: "Full-stack websites, college portals, and modern web solutions with 5 years of hands-on experience.",
    years: "5 years",
    width: "85%",
    green: false,
  },
  {
    num: "02",
    title: "AI-Assisted Web Development",
    desc: "AI-assisted rapid development via Lovable and Antigravity, focused on polished, production-ready websites.",
    years: "1 year",
    width: "60%",
    green: false,
  },
  {
    num: "03",
    title: "Digital Marketing",
    desc: "SEO, content strategy, paid campaigns, and growth marketing for measurable online results.",
    years: "2 years",
    width: "70%",
    green: true,
  },
  {
    num: "04",
    title: "n8n Automation",
    desc: "Workflow automation, API integrations, and no-code pipelines to streamline business operations.",
    years: "6 months",
    width: "45%",
    green: false,
  },
  {
    num: "05",
    title: "Education & Training",
    desc: "9 years teaching computer science with an MSCS degree, clear communication, mentoring, and training.",
    years: "9 years",
    width: "95%",
    green: true,
  },
  {
    num: "06",
    title: "Replit Development",
    desc: "Cloud-based coding and rapid prototyping on Replit, building and deploying apps directly in the browser.",
    years: "Active",
    width: "55%",
    green: false,
  },
];

const experience = [
  {
    year: "2024 - Present",
    title: "AI-Assisted Web Development",
    desc: "Building production-ready websites rapidly using AI tools, from concept to deployment with Lovable, Antigravity, and Replit.",
    tags: ["Lovable", "Antigravity", "Replit", "Claude"],
  },
  {
    year: "2024 - Present",
    title: "n8n Automation Specialist",
    desc: "Designing automated workflows using n8n, connecting apps, triggering smart actions, and eliminating repetitive work.",
    tags: ["n8n", "API Integration", "No-code"],
  },
  {
    year: "2022 - 2024",
    title: "Digital Marketing",
    desc: "Managed full-cycle digital campaigns across SEO, content creation, social media, and paid advertising for measurable client growth.",
    tags: ["SEO", "Content", "Paid Ads"],
  },
  {
    year: "2019 - Present",
    title: "Web Developer",
    desc: "5+ years building web projects, including a complete college website, with front-end and back-end implementation experience.",
    tags: ["HTML/CSS", "JavaScript", "CMS"],
  },
  {
    year: "2015 - Present",
    title: "Educator & Lecturer",
    desc: "9 years of teaching experience with an MSCS qualification, specializing in computer science and technology education.",
    tags: ["MSCS", "Computer Science", "9 Years"],
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
      setCfError("Contact form is not configured yet. Please email me directly.");
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
      setCfError("Something went wrong. Please try again.");
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
              <div className="badge-dot"></div>Available for Freelance Projects
            </div>
            <h1 className="hero-name">
              <span className="name-line">Ansar</span>
              <em className="name-line">Abbas</em>
            </h1>
            <p className="hero-tagline">
              I help businesses, colleges, and professionals build modern websites, management
              systems, and smart automation workflows that improve online presence, save time, and
              generate better results.
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
                View Projects
              </a>
              <a href="#contact" className="btn-outline">
                Contact Me
              </a>
            </div>
          </div>
          <div className="hero-photo">
            <img src={portrait} alt="Portrait of Ansar Abbas" />
          </div>
        </div>
      </section>

      <section id="skills" className="reveal">
        <div className="section-label">Expertise</div>
        <h2 className="section-title">Skills & Tools</h2>
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
        <h2 className="section-title">Featured Case Studies</h2>
        <div className="projects-grid">
          <div className="project-card featured has-preview">
            <div className="featured-badge red">Case Study</div>
            <div className="project-mockup" aria-label="College Website preview">
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
            <h3>College Management Website</h3>
            <p>
              Designed a complete institutional web experience with admissions, departments, faculty
              profiles, campus pages, and portal screens for administrators, students, and teachers.
            </p>
            <div className="project-footer">
              <span className="tech-stack">HTML / CSS / CMS</span>
              <div className="project-actions">
                <a href="#contact" className="project-btn">
                  Live Preview
                </a>
                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-btn ghost"
                >
                  Source Code
                </a>
              </div>
            </div>
          </div>

          <div className="project-card">
            <div className="status-badge live">Live Case</div>
            <div className="project-num">02</div>
            <h3>Portfolio Website</h3>
            <p>
              Built a conversion-focused personal portfolio with responsive sections, a contact
              workflow, social links, and a refined futuristic glass interface for client discovery.
            </p>
            <div className="project-footer">
              <span className="tech-stack">Lovable / Antigravity / Claude</span>
              <div className="project-actions">
                <a href="#hero" className="project-btn">
                  Live Preview
                </a>
                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-btn ghost"
                >
                  Source Code
                </a>
              </div>
            </div>
          </div>

          <div className="project-card">
            <div className="status-badge live">Workflow</div>
            <div className="project-num">03</div>
            <h3>Automation Workflow Systems</h3>
            <p>
              Client-ready automation concepts for lead capture, follow-up reminders, form
              notifications, and app-to-app workflows that reduce manual admin work.
            </p>
            <div className="project-footer">
              <span className="tech-stack">n8n / APIs / Webhooks</span>
              <div className="project-actions">
                <a href="#contact" className="project-btn">
                  Live Preview
                </a>
                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-btn ghost"
                >
                  Source Code
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="reveal">
        <div className="section-label">Let's Connect</div>
        <h2 className="section-title">Get in Touch</h2>
        <div className="contact-inner">
          <div className="contact-wrap">
            <h2>Ready to build something great?</h2>
            <p>Website, automation, or digital marketing - let's talk and make it happen.</p>
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
                <label htmlFor="cf-msg">Your message</label>
              </div>
              {cfError && (
                <div className="form-error" role="alert">
                  {cfError}
                </div>
              )}
              {cfStatus === "success" && (
                <div className="form-success" role="status">
                  Message sent successfully
                </div>
              )}
              <div className="form-actions">
                <button type="submit" className="btn-neon" disabled={cfStatus === "loading"}>
                  {cfStatus === "loading" ? "Sending..." : "Send Message"}
                </button>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp"
                >
                  Contact on WhatsApp
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
        <span>&copy; {new Date().getFullYear()} Ansar Abbas</span>
        <span>MSCS / Web Dev / Digital Marketing / Automation</span>
      </footer>
    </div>
  );
}

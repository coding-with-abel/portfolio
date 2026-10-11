"use client";

import { useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";
import {
  ArrowDown,
  ArrowUpRight,
  Bot,
  Braces,
  Check,
  ChevronDown,
  Code2,
  Database,
  GitBranch,
  Globe2,
  Layers3,
  Mail,
  Menu,
  MonitorSmartphone,
  Palette,
  Rocket,
  Send,
  Server,
  Sparkles,
  Terminal,
  X,
  Zap,
} from "lucide-react";

const navItems = ["Home", "About", "Skills", "Projects", "Services", "Contact"];

const skillGroups = [
  {
    title: "Frontend",
    icon: MonitorSmartphone,
    accent: "indigo",
    items: [
      ["JavaScript", "Clean interactive logic"],
      ["React", "Composable UI architecture"],
      ["Tailwind CSS", "Fast, consistent styling"],
      ["Next.js", "Server-side rendering & API routes"],
      ["TypeScript", "Static type checking for JavaScript"],
      ["Framer Motion", "Production-ready animations & interactions"],
    ],
  },
  {
    title: "Backend",
    icon: Server,
    accent: "purple",
    items: [
      ["Node.js", "Scalable server runtimes"],
      ["Express.js", "Simple API foundations"],
      ["Python", "Automation and data"],
      ["Flask", "Lightweight web services"],
    ],
  },
  {
    title: "Database",
    icon: Database,
    accent: "blue",
    items: [
      ["MongoDB", "Flexible document storage"],
      ["SQLite", "Reliable local persistence"],
    ],
  },
  {
    title: "Tools",
    icon: Code2,
    accent: "slate",
    items: [
      ["Git", "Version control habits"],
      ["GitHub", "Open collaboration"],
      ["VS Code", "Focused development"],
      ["Vercel", "Fast global delivery"],
    ],
  },
];

const projects = [
  {
    name: "Jelegs Real Estate CMS",
    type: "Full-Stack",
    description:
      "A full-stack content management system for property management. Features a role-based admin dashboard, real-time property listings, image optimization with Cloudinary, and SEO-ready public pages. Built for scalability and performance.",
    tech: ["React", "Vite", "TypeScript", "Tailwind", "Node.js", "Express", "MongoDB", "Cloudinary"],
    icon: Globe2,
    className: "project-indigo",
    github: "https://github.com/coding-with-abel/jelegs-real-estate",
    live: "https://jelegsrealestate.com",
    image: "/images/jelegs-screenshot.png",
  },
  {
    name: "Food Delivery Platform",
    type: "Full-Stack",
    description:
      "A complete food delivery application with user authentication, restaurant browsing, real-time order placement, and Stripe payment integration. Includes an admin panel for restaurant management, menu customization, and order tracking.",
    tech: ["React", "Node.js", "Express", "MongoDB", "Stripe", "CSS"],
    icon: Zap,
    className: "project-blue",
    github: "https://github.com/coding-with-abel/Food-Delivery-Website",
    image: "/images/food-delivery-screenshot.png",
  },
  {
    name: "Hotel Booking Interface",
    type: "Frontend",
    description:
      "A responsive hotel booking interface showcasing frontend design and UX. Features a date range picker for availability, room search and filtering, and a complete checkout flow.",
    tech: ["React", "CSS", "UI/UX"],
    icon: Layers3,
    className: "project-purple",
    github: "https://github.com/coding-with-abel/hotel-booking",
    image: "/images/hotel-booking-screenshot.png",
  },
  {
    name: "AbelDev Portfolio",
    type: "Frontend",
    description:
      "A living digital home for experiments, services and thoughtful product work.",
    tech: ["React", "Tailwind", "Vite"],
    icon: Layers3,
    className: "project-purple",
    image: "/images/portfolio.png"
  },
  {
  name: "Python Expense Tracker",
  type: "Python",
  description:
    "A focused full-stack application for understanding income, spending and habits.",
  tech: ["Python", "Flask", "SQLite"],
  icon: Zap,
  className: "project-blue",
  github: "https://github.com/coding-with-abel/Python-Expense-Tracker-",
  image: "/images/expense-tracker.png"
},
];



const services = [
  [
    Globe2,
    "Custom Websites",
    "Modern websites designed around your brand and goals.",
  ],
  [
    Layers3,
    "Web Applications",
    "Interactive and scalable applications built for real-world use.",
  ],
  [
    MonitorSmartphone,
    "Responsive Design",
    "Interfaces that look considered on every screen.",
  ],
  [
    Braces,
    "Python Solutions",
    "Automation, scripting and backend applications using Python.",
  ],
  [
    Bot,
    "Telegram Bot Development",
    "Custom bots built and deployed for communities and businesses.",
  ],
  [
    Rocket,
    "Performance & SEO",
    "Fast, accessible and search-engine-friendly websites.",
  ],
] as const;

const journey = [
  [
    "2024",
    "Started Web Development",
    "Learning the fundamentals and turning curiosity into craft.",
  ],
  [
    "2025",
    "Built Full-Stack Applications",
    "Connecting thoughtful interfaces to reliable backends.",
  ],
  [
    "2026",
    "Development & Freelance Projects",
    "Building useful products for people with ambitious ideas.",
  ],
];

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={false}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  copy,
}: {
  eyebrow: string;
  title: string;
  copy?: string;
}) {
  return (
    <div className="section-heading">
      <span className="eyebrow">
        <span className="eyebrow-dot" />
        {eyebrow}
      </span>
      <h2>{title}</h2>
      {copy && <p>{copy}</p>}
    </div>
  );
}

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [filter, setFilter] = useState("All");
  const [sent, setSent] = useState(false);
  const [terminalStarted, setTerminalStarted] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 80, damping: 20 });
  const springY = useSpring(y, { stiffness: 80, damping: 20 });
  const filteredProjects =
    filter === "All"
      ? projects
      : projects.filter((project) => project.type === filter);

  function handleMove(event: React.MouseEvent<HTMLElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - rect.left - rect.width / 2) / 18);
    y.set((event.clientY - rect.top - rect.height / 2) / 18);
  }

  return (
    <main className="site-shell">
      <nav className="nav-wrap" aria-label="Primary navigation">
        <div className="nav-inner">
          <a
            
  href="#home"
  className="wordmark"
  onClick={() => setMenuOpen(false)}
  style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
>
  <img src="/images/abel.png" alt="Abel logo" style={{ height: '32px', width: '32px' }} />
  <span>Abeldev</span>
</a>
          <div className="desktop-nav">
            {navItems.map((item) => (
              <a key={item}
    href={`#${item.toLowerCase()}`}
    onClick={() => {
      setMenuOpen(false);
      // Smooth scroll to section
      setTimeout(() => {
        document.getElementById(item.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }}>
                {item}
              </a>
            ))}
          </div>
          <a href="#contact" className="nav-cta">
            Let&apos;s talk <ArrowUpRight size={15} />
          </a>
          <button
            className="menu-button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              className="mobile-nav"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
            >
              {navItems.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => {
                    setMenuOpen(false);
                    // Smooth scroll to section
                    setTimeout(() => {
                      document.getElementById(item.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }}
                >
                  {item}
                  <ArrowUpRight size={15} />
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <section
        id="home"
        className="hero section-grid"
        onMouseMove={handleMove}
        onMouseLeave={() => {
          x.set(0);
          y.set(0);
        }}
      >
        <div className="hero-copy">
          <Reveal>
            <div className="status-pill">
              <span /> Available for jobs!
            </div>
            <p className="hero-kicker">
              Full-Stack Developer <span>/</span> Digital Builder
            </p>
            <h1>
              Crafting the
              <br />
              <em>future</em> of web<span className="period">.</span>
            </h1>
            <p className="hero-description">
              Building modern, responsive and scalable digital experiences with
              clean code and thoughtful design.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#projects">
                View my work <ArrowDown size={17} />
              </a>
              <a className="button button-ghost" href="#contact">
                Let&apos;s work together <ArrowUpRight size={17} />
              </a>
            </div>
          </Reveal>
        </div>
        <motion.div
          className="hero-visual"
          style={{ x: springX, y: springY }}
          aria-label="Developer technology illustration"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="visual-orbit orbit-one" />
          <div className="visual-orbit orbit-two" />
          <motion.div
            className="hero-beacon"
            animate={{ scale: [1, 1.18, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="code-card code-card-main"
            whileHover={{ y: -8, rotateX: 3, rotateY: -3 }}
            transition={{ type: "spring", stiffness: 180, damping: 18 }}
          >
            <div className="window-bar">
              <span />
              <span />
              <span />
              <small>abeldev.tsx</small>
            </div>
            <div className="code-lines">
              <i>01</i>
              <p>
                <b>const</b> <strong>future</strong> = {"{"}
              </p>
              <i>02</i>
              <p>
                &nbsp;&nbsp;build: <span>&quot;with purpose&quot;</span>,
              </p>
              <i>03</i>
              <p>
                &nbsp;&nbsp;stack: [<span>&quot;Fullstack&quot;</span>]
              </p>
              <i>04</i>
              <p>{"}"}</p>
              <i>05</i>
              <p className="cursor-line">_</p>
            </div>
          </motion.div>
          <motion.div
            className="tech-chip chip-react"
            whileHover={{ scale: 1.08, y: -4 }}
            transition={{ type: "spring", stiffness: 300, damping: 16 }}
          >
            <span className="chip-icon react-icon">⚛</span> React
          </motion.div>
          <motion.div
            className="tech-chip chip-node"
            whileHover={{ scale: 1.08, y: -4 }}
            transition={{ type: "spring", stiffness: 300, damping: 16 }}
          >
            <span className="chip-icon node-icon">JS</span> Node.js
          </motion.div>
          <motion.div
            className="tech-chip chip-python"
            whileHover={{ scale: 1.08, y: -4 }}
            transition={{ type: "spring", stiffness: 300, damping: 16 }}
          >
            <span className="chip-icon python-icon">⌘</span> Python
          </motion.div>
          <div className="hero-spark spark-one">
            <Sparkles size={15} />
          </div>
          <div className="hero-spark spark-two">
            <Zap size={14} />
          </div>
        </motion.div>
        <div className="scroll-cue">
          <span>Scroll to explore</span>
          <ArrowDown size={16} />
        </div>
      </section>

      <section id="about" className="content-section about-section">
        <Reveal>
          <SectionHeading
            eyebrow="01 / About"
            title="A developer who builds with purpose."
            copy="I'm Olanrewaju Abel, a full-stack developer focused on turning thoughtful ideas into functional, memorable digital products. I work across the stack — from first sketch to final deploy — with a soft spot for the details that make a product feel alive."
          />
        </Reveal>
        <Reveal className="about-grid" delay={0.12}>
          <div className="profile-card">
            <div className="profile-top">
             
              <div>
                <h3>Olanrewaju Abel</h3>
                <p>Full-Stack Developer</p>
              </div>
              <span className="profile-status">
                <span /> online
              </span>
            </div>
            <div className="profile-divider" />
            <p className="profile-quote">
              &quot;The best interfaces make complex things feel simple.&quot;
            </p>
            <div className="profile-tags">
              {["React", "Node.js", "MongoDB", "Python", "JavaScript"].map(
                (tag) => (
                  <span key={tag}>{tag}</span>
                ),
              )}
            </div>
            <div className="profile-footer">
              <span>Lagos, Nigeria</span>
              <span>Building since 2024</span>
            </div>
          </div>
          <TerminalBlock compact />
        </Reveal>
      </section>

      <section id="skills" className="content-section">
        <Reveal>
          <SectionHeading
            eyebrow="02 / Capabilities"
            title="Tools for turning ideas into reality."
            copy="A practical toolkit, always evolving. I care less about collecting technologies and more about knowing when to reach for the right one."
          />
        </Reveal>
        <div className="skill-grid">
          {skillGroups.map(
            ({ title: group, icon: Icon, accent, items }, index) => (
              <Reveal key={group} delay={index * 0.08}>
                <div className={`skill-group skill-${accent}`}>
                  <div className="skill-group-head">
                    <span className="icon-box">
                      <Icon size={18} />
                    </span>
                    <h3>{group}</h3>
                    <span className="group-index">0{index + 1}</span>
                  </div>
                  <div className="skill-items">
                    {items.map(([name, description]) => (
                      <div className="skill-item" key={name}>
                        <span className="skill-name">{name}</span>
                        <span className="skill-description">{description}</span>
                        <ArrowUpRight size={14} />
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            ),
          )}
        </div>
      </section>

      <section id="projects" className="content-section projects-section">
        <Reveal>
          <div className="projects-heading">
            <SectionHeading
              eyebrow="03 / Selected work"
              title="Things I've built."
              copy="A selection of experiments and client-ready products. Each one is a chance to make something useful feel effortless."
            />
            <a
              href="https://github.com/coding-with-abel"
              target="_blank"
              rel="noreferrer"
              className="text-link"
            >
              See all on GitHub <ArrowUpRight size={16} />
            </a>
          </div>
        </Reveal>
        <div className="filter-row" role="group" aria-label="Filter projects">
          {["All", "Frontend", "Full-Stack", "Python", "Other"].map((item) => (
            <button
              key={item}
              className={filter === item ? "active" : ""}
              onClick={() => setFilter(item)}
            >
              {item}
            </button>
          ))}
        </div>
        <motion.div layout className="project-grid">
  {filteredProjects.map((project, index) => {
    const Icon = project.icon;
    return (
      <motion.article
        layout
        key={project.name}
        className={`project-card ${project.className}`}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.35, delay: index * 0.05 }}
      >
        <div className="project-art">
          {project.image ? (
            <img src={project.image} alt={project.name} />
          ) : (
            <>
              <div className="project-art-label">{project.type}</div>
              <Icon size={42} strokeWidth={1.2} />
              <div className="art-grid" />
            </>
          )}
        </div>
        <div className="project-info">
          <div>
            <h3>{project.name}</h3>
            <p>{project.description}</p>
          </div>
          <div className="tech-pills">
            {project.tech.map((tech) => (
              <span key={tech}>{tech}</span>
            ))}
          </div>
          <div className="project-links">
            {project.github && (
              <a href={project.github} target="_blank" rel="noreferrer">
                <GitBranch size={15} /> GitHub
              </a>
            )}
            {project.live && (
              <a href={project.live} target="_blank" rel="noreferrer">
                Live demo <ArrowUpRight size={15} />
              </a>
            )}
            {!project.live && (
              <a href="#contact">
                Live demo <ArrowUpRight size={15} />
              </a>
            )}
          </div>
        </div>
      </motion.article>
    );
  })}
</motion.div>
      </section>

      <section id="services" className="content-section services-section">
        <Reveal>
          <SectionHeading
            eyebrow="04 / Services"
            title="What I can build for you."
            copy="Good work starts with listening. I bring a thoughtful, end-to-end approach to every build — whether you need a landing page or a full product."
          />
        </Reveal>
        <div className="services-grid">
          {services.map(([icon, title, copy], index) => {
  const Icon = icon;
  return (
    <Reveal key={title} delay={index * 0.06}>
      <div 
        className="service-card"
        onClick={() => {
          document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
        }}
        style={{ cursor: 'pointer' }}
      >
        <span className="service-number">0{index + 1}</span>
        <Icon size={23} />
        <h3>{title}</h3>
        <p>{copy}</p>
        <ArrowUpRight className="service-arrow" size={17} />
      </div>
    </Reveal>
  );
})}
        </div>
      </section>

      <section className="content-section journey-section">
        <Reveal>
          <SectionHeading
            eyebrow="05 / Journey"
            title="Still learning. Always building."
          />
        </Reveal>
        <div className="journey-list">
          {journey.map(([year, title, copy], index) => (
            <Reveal key={year} delay={index * 0.1}>
              <div className="journey-item">
                <span className="journey-year">{year}</span>
                <span className="journey-line">
                  <span />
                </span>
                <div>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      
      <section id="contact" className="content-section contact-section">
        <Reveal>
          <div className="contact-intro">
            <SectionHeading
              eyebrow="06 / Contact"
              title="Let's build something remarkable together."
              copy="Have an idea, project or business that needs a website? 
              I'm available for freelance projects and full-time opportunities."
            />
            <div className="contact-links">
              <a href="mailto:olanrewajuoluwafikunayomi@gmail.com">
                <Mail size={17} /> Email me <ArrowUpRight size={15} />
              </a>
              <a
                href="https://github.com/coding-with-abel"
                target="_blank"
                rel="noreferrer"
              >
                <GitBranch size={17} /> GitHub <ArrowUpRight size={15} />
              </a>
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.12}>
          <form
            className="contact-form"
     onSubmit={async (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const formData = new FormData(form);
  const data = {
    name: formData.get('name'),
    email: formData.get('email'),
    projectType: formData.get('projectType'),
    message: formData.get('message'),
  };

  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      setSent(true);
      form.reset();

      // Auto-clear success message after 3 seconds
      setTimeout(() => {
        setSent(false);
      }, 3000);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}}
          >
            <div className="form-row">
              <label>
                Name
                <input name="name" required placeholder="Your name" />
              </label>
              <label>
                Email
                <input name="email" required type="email" placeholder="you@company.com" />
              </label>
            </div>
            <label>
              Project type
              <select name="projectType" defaultValue="">
                <option value="" disabled>
                  Select a service
                </option>
                <option>Custom website</option>
                <option>Web application</option>
                <option>Python solution</option>
                <option>Something else</option>
              </select>
            </label>
            <label>
              Message
              <textarea
                name="message"
                required
                placeholder="Tell me about your project..."
                rows={5}
              />
            </label>
            <button type="submit" className="button button-primary form-button">
              {sent ? (
                <>
                  <Check size={17} /> Message ready
                </>
              ) : (
                <>
                  <Send size={16} /> Send message
                </>
              )}
            </button>
            {sent && (
              <p className="form-success">
                <Check size={14} /> Thanks — your message is ready to connect to
                an email service.
              </p>
            )}
          </form>
        </Reveal>
      </section>

      

      <footer className="footer">
        <div>
          <a 
  href="#home" 
  className="wordmark"
  style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
>
  <img src="/images/abel.png" alt="Abel logo" style={{ height: '28px', width: '28px' }} />
<span>Abeldev</span>
</a>
          <p>Crafting the future of web.</p>
        </div>
        <div className="footer-links">
          <a
            href="https://github.com/coding-with-abel"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
          <a href="mailto:olanrewajuoluwafikunayomi@gmail.com">Email</a>
          <a
            href="https://wa.me/2349018901734"
            target="_blank"
            rel="noreferrer"
          >
            Whatsapp
          </a>
          <a
            href="https://x.com/defi_abel"
            target="_blank"
            rel="noreferrer"
          >
            Twitter
          </a>
        </div>
        <p className="copyright">© 2026 abeldev. All rights reserved.</p>
      </footer>
    </main>
  );
}

function TerminalBlock({
  compact = false,
  started = true,
}: {
  compact?: boolean;
  started?: boolean;
}) {
  const lines = compact
    ? [
        ["$ whoami", "Olanrewaju Abel"],
        ["$ status", "Building something great..."],
        ["$ stack", "Full-stack"],
      ]
    : [
        ["abeldev@portfolio:~$ npm run build", "> abeldev@1.0.0 build"],
        ["", "Building amazing digital experiences..."],
        ["✓", "React"],
        ["✓", "Node.js"],
        ["✓", "MongoDB"],
        ["✓", "Python"],
        ["", "Build successful."],
      ];
  return (
    <div className={`terminal-window ${compact ? "terminal-compact" : ""}`}>
      <div className="window-bar">
        <span />
        <span />
        <span />
        <small>{compact ? "terminal" : "build.log"}</small>
      </div>
      <div className="terminal-content">
        {started ? (
          lines.map(([prefix, line], index) => (
            <motion.p
              key={`${prefix}-${line}`}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.18 }}
            >
              <span
                className={
                  prefix === "✓"
                    ? "success"
                    : prefix?.startsWith("$")
                      ? "command"
                      : ""
                }
              >
                {prefix}
              </span>{" "}
              {line}
            </motion.p>
          ))
        ) : (
          <p className="command">Waiting for viewport...</p>
        )}
      </div>
    </div>
  );
}

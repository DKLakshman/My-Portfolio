import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useTheme } from './hooks/useTheme';
import Reveal from './components/Reveal';
import CountUp from './components/CountUp';
import Projects from './components/Projects';
import ContactForm from './components/ContactForm';
import { activities, marquee, skills, stats, timeline } from './data';

function Hero() {
  // Hero copy and media are kept together so this section is easy to personalize.
  const content = {
    name: 'Daham, Kaushika',
    role: 'Software Engineer',
    description: 'Software Engineer crafting clear, reliable, and high-impact digital experiences.',
    photo: '/daham.png',
    cv: '/daham_kaushika.pdf',
  };
  const reduceMotion = useReducedMotion();
  const mx = useSpring(useMotionValue(0), { stiffness: 120, damping: 18 });
  const my = useSpring(useMotionValue(0), { stiffness: 120, damping: 18 });
  const titleX = useTransform(mx, (value) => value * -0.35);
  const titleY = useTransform(my, (value) => value * -0.2);
  const photoX = useTransform(mx, (value) => value * 0.18);
  const photoY = useTransform(my, (value) => value * 0.12);
  const buttonX = useSpring(useMotionValue(0), { stiffness: 260, damping: 16 });
  const buttonY = useSpring(useMotionValue(0), { stiffness: 260, damping: 16 });
  const move = (e) => {
    if (reduceMotion) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width - 0.5) * 22);
    my.set(((e.clientY - r.top) / r.height - 0.5) * 22);
  };
  const reset = () => { mx.set(0); my.set(0); };
  const moveButton = (e) => {
    if (reduceMotion) return;
    const r = e.currentTarget.getBoundingClientRect();
    buttonX.set((e.clientX - r.left - r.width / 2) * 0.18);
    buttonY.set((e.clientY - r.top - r.height / 2) * 0.18);
  };
  const resetButton = () => { buttonX.set(0); buttonY.set(0); };

  return (
    <header className="hero" id="top" onPointerMove={move} onPointerLeave={reset}>
      <motion.div className="hero-word" aria-hidden="true" style={reduceMotion ? undefined : { x: titleX, y: titleY }}>
        {'PORTFOLIO'.split('').map((letter, index) => (
          <motion.span key={`${letter}-${index}`} initial={reduceMotion ? false : { y: '110%', opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: index * 0.055, duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}>{letter}</motion.span>
        ))}
      </motion.div>
      <div className="hero-stage wrap">
        <motion.div className="hero-photo-layer" style={reduceMotion ? undefined : { x: photoX, y: photoY }}>
          <div className="hero-photo-glow" />
          <img src={content.photo} alt="P A Daham Kaushika Lakshman" width="700" height="900" fetchpriority="high" />
        </motion.div>
        <div className="hero-grid">
          <motion.div className="hero-copy" initial={reduceMotion ? false : { opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75, duration: 0.7 }}>
            <span className="hero-kicker">Hello, I&apos;m</span>
            <h1>{content.name}</h1>
            <p className="hero-role">{content.role}</p>
            <p className="hero-description">{content.description}</p>
            <div className="btns">
              <motion.a className="btn p hero-talk" href="#contact" onPointerMove={moveButton} onPointerLeave={resetButton} style={reduceMotion ? undefined : { x: buttonX, y: buttonY }}>Let&apos;s talk</motion.a>
              <a className="btn" href={content.cv} download="Daham-Kaushika-CV.pdf">Download CV</a>
            </div>
          </motion.div>
          <motion.aside className="hero-aside" initial={reduceMotion ? false : { opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.7 }}>
            <div className="hero-socials" aria-label="Social links">
              <a href="https://github.com/DKLakshman" target="_blank" rel="noopener noreferrer">GitHub <span>↗</span></a>
              <a href="https://www.linkedin.com/in/daham-kaushika-2563632b9/" target="_blank" rel="noopener noreferrer">LinkedIn <span>↗</span></a>
              <a href="mailto:kaushikadaham2002@gmail.com">Email <span>↗</span></a>
            </div>
          </motion.aside>
        </div>
        <div className="hero-bottom"><a href="#work">Scroll <i>↓</i></a></div>
      </div>
    </header>
  );
}

function Journey() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 70%'] });
  return (
    <section id="journey">
      <div className="wrap">
        <Reveal><div className="tag">Journey</div><h2>How I got here.</h2></Reveal>
        <motion.div className="tl" ref={ref} style={{ '--p': scrollYProgress }}>
          {timeline.map((s, i) => (
            <Reveal key={s.title} className="step">
              <span className="step-marker" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
              <small>{s.when}</small><h3>{s.title}</h3><p>{s.text}</p>
            </Reveal>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Activities() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % activities.length), 5000);
    return () => clearInterval(id);
  }, [i]);
  return (
    <section className="activities-section" style={{ paddingTop: 60 }}>
      <div className="wrap">
        <div className="tag" style={{ textAlign: 'center' }}>Beyond code</div>
        <div className="q">
          <AnimatePresence mode="wait">
            <motion.blockquote key={i} className="on" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }}>
              {activities[i].title}<small>{activities[i].when}</small>
            </motion.blockquote>
          </AnimatePresence>
        </div>
        <div className="dots">{activities.map((a, k) => <i key={a.title} className={k === i ? 'on' : ''} onClick={() => setI(k)} />)}</div>
      </div>
    </section>
  );
}

export default function App() {
  const [theme, toggle] = useTheme();
  const { scrollYProgress } = useScroll();
  const bar = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <div className="app-shell">
      <svg className="site-network" viewBox="0 0 1200 900" aria-hidden="true" focusable="false">
        <g className="network-lines">
          <path d="M70 150 250 80 430 180 620 60 800 160 1010 90 1140 220" />
          <path d="M30 520 210 390 390 500 570 350 760 480 950 330 1180 520" />
          <path d="M120 820 300 670 490 780 680 620 860 760 1050 610 1190 720" />
          <path d="M250 80 210 390M430 180 390 500M620 60 570 350M800 160 760 480M1010 90 950 330M210 390 300 670M390 500 490 780M570 350 680 620M760 480 860 760M950 330 1050 610" />
        </g>
        <g className="network-nodes">
          {[['n1',70,150],['n2',250,80],['n3',430,180],['n4',620,60],['n5',800,160],['n6',1010,90],['n7',1140,220],['n8',30,520],['n9',210,390],['n10',390,500],['n11',570,350],['n12',760,480],['n13',950,330],['n14',1180,520],['n15',120,820],['n16',300,670],['n17',490,780],['n18',680,620],['n19',860,760],['n20',1050,610],['n21',1190,720]].map(([id, cx, cy]) => <circle key={id} className={id} cx={cx} cy={cy} r="3" />)}
        </g>
      </svg>
      <motion.div id="bar" style={{ scaleX: bar, width: '100%', transformOrigin: '0 50%' }} />
      <nav>
        <div className="wrap">
          <a className="logo" href="#top">DK<i>.</i></a>
          <div className="links"><a href="#work">Work</a><a href="#services">Skills</a><a href="#journey">Journey</a><a href="#contact">Contact</a></div>
          <button className="tog" onClick={toggle} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}>◐</button>
        </div>
      </nav>

      <Hero />

      <div className="mq"><div>{[...marquee, ...marquee].map((m, i) => <span key={i}>{m}</span>)}</div></div>

      <section className="numbers-section"><Reveal className="numbers-reveal" variant="modern" repeat><div className="wrap">
        <Reveal><div className="tag">By the numbers</div></Reveal>
        <div className="stats ring-stats">
          {stats.map((s, i) => (
            <Reveal key={s.label} className="stat" delay={i * 0.08}>
              <span className="stat-index">0{i + 1}</span>
              <div className="stat-ring"><CountUp to={s.to} /><span>+</span></div>
              <span className="stat-label">{s.label}</span>
            </Reveal>
          ))}
        </div>
      </div></Reveal></section>

      <Projects />

      <section id="services" className="skills-section" style={{ paddingTop: 60 }}><div className="wrap">
        <Reveal variant="lift" repeat><div className="tag">What I use</div><h2>Skills.</h2></Reveal>
        <div className="grid skills-grid">
          {skills.map((s, i) => <Reveal key={s.title} className="svc" variant="lift" delay={i * 0.14} repeat><span className="n">0{i + 1}</span><h3>{s.title}</h3><p>{s.text}</p></Reveal>)}
        </div>
      </div></section>

      <Journey />
      <Activities />

      <section id="contact" className="contact-section" style={{ paddingTop: 20 }}><div className="wrap">
        <Reveal className="cta">
          <div className="tag">Contact</div>
          <h2>Got an idea?<br /><span className="grad">Let’s build it.</span></h2>
          <ContactForm />
          <div className="btns" style={{ justifyContent: 'center', marginTop: 18 }}>
            <a className="btn" href="https://github.com/DKLakshman" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a className="btn" href="https://www.linkedin.com/in/daham-kaushika-2563632b9/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a className="btn" href="mailto:kaushikadaham2002@gmail.com">Email</a>
          </div>
        </Reveal>
      </div></section>

      <footer><div className="wrap"><span>© {new Date().getFullYear()} P A Daham Kaushika Lakshman</span><span>Software Engineer · Sri Lanka</span></div></footer>
    </div>
  );
}

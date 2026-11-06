import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValue, useScroll, useSpring } from 'framer-motion';
import { useTheme } from './hooks/useTheme';
import Reveal from './components/Reveal';
import CountUp from './components/CountUp';
import Projects from './components/Projects';
import ContactForm from './components/ContactForm';
import { activities, marquee, skills, stats, timeline } from './data';

function Hero() {
  const mx = useSpring(useMotionValue(0), { stiffness: 120, damping: 18 });
  const my = useSpring(useMotionValue(0), { stiffness: 120, damping: 18 });
  const move = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width - 0.5) * 18);
    my.set(((e.clientY - r.top) / r.height - 0.5) * 18);
  };
  const reset = () => { mx.set(0); my.set(0); };

  return (
    <header className="hero" id="top">
      <div className="wrap">
        <div>
          <div className="pill"><b />Open to work &amp; collaborations</div>
          <h1>
            <span className="line"><span>I’m Daham,</span></span>
            <span className="line"><span className="grad">Software Engineer.</span></span>
          </h1>
          <p className="sub">Software Engineering graduate (BSc Hons, SLIIT) and Director at Algowrite. </p>
          <div className="btns"><a className="btn p" href="#contact">Let’s talk</a><a className="btn" href="/daham_kaushika.pdf" download="Daham-Kaushika-CV.pdf">Download CV</a></div>
        </div>
        <div className="orb" onPointerMove={move} onPointerLeave={reset}>
          <motion.div className="pw" style={{ x: mx, y: my }}>
            <img src="/daham.png" alt="P A Daham Kaushika Lakshman" width="250" height="300" fetchpriority="high" />
          </motion.div>
          <div className="chip">⚛️ React · Node · Mongo</div><div className="chip">🎓 SLIIT · 2026</div><div className="chip">🚀 Director, Algowrite</div>
        </div>
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
          {timeline.map((s) => (
            <Reveal key={s.title} className="step"><small>{s.when}</small><h3>{s.title}</h3><p>{s.text}</p></Reveal>
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
    <>
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
    </>
  );
}

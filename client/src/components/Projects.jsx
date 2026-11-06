import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { getProjects } from '../api';
import { fallbackProjects } from '../data';
import Reveal from './Reveal';

const shades = ['', 'b', 'c', 'd'];
const link = { color: 'var(--brand)' };

export default function Projects() {
  const [items, setItems] = useState(fallbackProjects);
  const [progress, setProgress] = useState(0);
  const track = useRef(null);

  useEffect(() => {
    const ctrl = new AbortController();
    getProjects(ctrl.signal).then((d) => d.length && setItems(d)).catch(() => {});
    return () => ctrl.abort();
  }, []);

  const scrollBy = (dir) => {
    const w = track.current.querySelector('.card')?.offsetWidth ?? 400;
    track.current.scrollBy({ left: dir * (w + 24), behavior: 'smooth' });
  };
  const onScroll = () => {
    const el = track.current;
    const max = el.scrollWidth - el.clientWidth;
    setProgress(max ? el.scrollLeft / max : 0);
  };

  return (
    <section id="work" className="projects-section" style={{ paddingTop: 20 }}>
      <div className="wrap sh">
        <Reveal><div className="tag">Selected work</div><h2>Things I’ve built.</h2></Reveal>
        <div className="arrows">
          <button onClick={() => scrollBy(-1)} aria-label="Previous project">←</button>
          <button onClick={() => scrollBy(1)} aria-label="Next project">→</button>
        </div>
      </div>
      <div className="wrap">
        <div className="track" ref={track} onScroll={onScroll} style={{ paddingInline: 0 }}>
          {items.map((p, i) => (
            <motion.article key={p._id ?? p.title} className="card" whileHover={{ y: -8 }}>
              <div className={`art ${shades[i % 4]}`}><span>{String(i + 1).padStart(2, '0')}</span></div>
              <div className="cb">
                <h3>{p.title}</h3>
                <p>
                  {p.description}{' '}
                  {p.liveUrl && <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" style={link}>Live ↗</a>}{' '}
                  {p.repoUrl && <a href={p.repoUrl} target="_blank" rel="noopener noreferrer" style={link}>Code ↗</a>}
                </p>
                <div className="tags">{p.tags?.map((t) => <i key={t}>{t}</i>)}</div>
              </div>
            </motion.article>
          ))}
        </div>
        <div className="prog"><div style={{ width: `${20 + 80 * progress}%` }} /></div>
      </div>
    </section>
  );
}

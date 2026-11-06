import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getProjects } from '../api';
import { fallbackProjects } from '../data';
import Reveal from './Reveal';

const shades = ['', 'b', 'c', 'd'];
const link = { color: 'var(--brand)' };

export default function Projects() {
  const [items, setItems] = useState(fallbackProjects);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const ctrl = new AbortController();
    getProjects(ctrl.signal).then((d) => d.length && setItems(d)).catch(() => {});
    return () => ctrl.abort();
  }, []);

  useEffect(() => {
    setActive((current) => Math.min(current, Math.max(items.length - 1, 0)));
  }, [items.length]);

  const move = (dir) => {
    setActive((current) => (current + dir + items.length) % items.length);
  };

  const distanceFromActive = (index) => {
    const distance = (index - active + items.length) % items.length;
    return distance > items.length / 2 ? distance - items.length : distance;
  };

  return (
    <section id="work" className="projects-section" style={{ paddingTop: 20 }}>
      <div className="wrap sh">
        <Reveal><div className="tag">Selected work</div><h2>Things I’ve built.</h2></Reveal>
        <div className="arrows project-controls">
          <button onClick={() => move(-1)} aria-label="Previous project">←</button>
          <button onClick={() => move(1)} aria-label="Next project">→</button>
        </div>
      </div>
      <div className="wrap deck-wrap">
        <div className="deck" aria-live="polite">
          {items.map((p, i) => {
            const distance = distanceFromActive(i);
            return (
              <motion.article
                key={p._id ?? p.title}
                className={`card deck-card ${distance === 0 ? 'is-active' : ''}`}
                animate={{
                  x: distance * 270,
                  y: Math.abs(distance) * 14,
                  scale: distance === 0 ? 1 : Math.max(0.76, 1 - Math.abs(distance) * 0.1),
                  rotateY: distance * -12,
                  rotate: distance * 1.5,
                  opacity: Math.abs(distance) > 2 ? 0 : 1,
                  zIndex: 10 - Math.abs(distance),
                }}
                transition={{ type: 'spring', stiffness: 220, damping: 24 }}
                onClick={() => setActive(i)}
                aria-hidden={distance !== 0}
              >
                <div className={`art ${shades[i % 4]}`}>
                  <span>{String(i + 1).padStart(2, '0')}</span>
                  <small>PROJECT {String(i + 1).padStart(2, '0')}</small>
                </div>
                <div className="cb">
                  <div className="card-meta"><span>Selected work</span><span>{String(i + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}</span></div>
                  <h3>{p.title}</h3>
                  <p>
                    {p.description}{' '}
                    {p.liveUrl && <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" style={link}>Live ↗</a>}{' '}
                    {p.repoUrl && <a href={p.repoUrl} target="_blank" rel="noopener noreferrer" style={link}>Code ↗</a>}
                  </p>
                  <div className="tags">{p.tags?.map((t) => <i key={t}>{t}</i>)}</div>
                </div>
              </motion.article>
            );
          })}
        </div>
        <div className="deck-footer">
          <div className="deck-dots">
            {items.map((p, i) => <button key={p._id ?? p.title} className={i === active ? 'active' : ''} onClick={() => setActive(i)} aria-label={`View ${p.title}`} />)}
          </div>
        </div>
      </div>
    </section>
  );
}

import { useState } from 'react';
import { sendMessage } from '../api';

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState({ type: 'idle', text: '' });
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  async function onSubmit(e) {
    e.preventDefault();
    setStatus({ type: 'loading', text: 'Sending…' });
    try {
      const res = await sendMessage(form);
      setForm({ name: '', email: '', message: '' });
      setStatus({ type: 'ok', text: res.message });
    } catch (err) {
      setStatus({ type: 'error', text: err.message });
    }
  }

  return (
    <form className="form" onSubmit={onSubmit}>
      <input placeholder="Your name" value={form.name} onChange={set('name')} required minLength={2} />
      <input type="email" placeholder="Your email" value={form.email} onChange={set('email')} required />
      <textarea placeholder="Tell me about your project" rows={4} value={form.message} onChange={set('message')} required minLength={10} />
      <button className="btn p" disabled={status.type === 'loading'}>Send message</button>
      <p role="status" className={`fs ${status.type}`}>{status.text}</p>
    </form>
  );
}

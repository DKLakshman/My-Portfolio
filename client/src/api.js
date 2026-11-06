const BASE = import.meta.env.VITE_API_URL ?? '';

async function request(path, options) {
  const res = await fetch(`${BASE}/api${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  const data = res.status === 204 ? null : await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data?.message || 'Something went wrong');
  return data;
}

export const getProjects = (signal) => request('/projects', { signal });
export const sendMessage = (body) => request('/contact', { method: 'POST', body: JSON.stringify(body) });

const BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000';

export const api = {
 async getFixed() {
    const r = await fetch(`${BASE}/fixed`, {
      method: 'GET',
      cache: 'no-store'  // 캐시 사용 금지
    });
    if (!r.ok) throw new Error('failed to load fixed list');
    return r.json();
  },
  async setFixed(ext, isBlocked) {
    const r = await fetch(`${BASE}/fixed`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ext, isBlocked }),
      cache: 'no-store'
    });
    if (!r.ok) throw new Error('failed to update');
    return r.json();
  },
  async listCustom() {
    const r = await fetch(`${BASE}/custom`);
    if (!r.ok) throw new Error('failed to load custom list');
    return r.json();
  },
  async addCustom(ext) {
    const r = await fetch(`${BASE}/custom`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ext }),
      cache: 'no-store'
    });
    if (!r.ok) {
      let msg = 'failed';
     try {
       const j = await r.json();
       msg = j?.message || msg;
     } catch {
       try { msg = await r.text(); } catch {}
     }
      const err = new Error(msg);
      err.status = r.status; // ← 반드시 상태 보존
      throw err;
     
    }
    return r.json();
  },
  async deleteCustom(id) {
    const r = await fetch(`${BASE}/custom/${id}`, { method: 'DELETE' });
    if (!r.ok) throw new Error('failed to delete');
  },
  async uploadDemo(file) {
    const fd = new FormData();
    fd.append('file', file);
    const r = await fetch(`${BASE}/files/upload`, { method: 'POST', body: fd });
    const txt = await r.text();
    try { return JSON.parse(txt); } catch { return { message: txt, status: r.status }; }
  }
};

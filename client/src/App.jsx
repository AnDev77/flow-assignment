import React, { useEffect, useState } from 'react';
import { api } from './api';
import FixedList from './components/FixedList.jsx';
import CustomAdder from './components/CustomAdder.jsx';
import CustomList from './components/CustomList.jsx';

export default function App() {
  const [fixed, setFixed] = useState([]);
  const [custom, setCustom] = useState([]);
  const [message, setMessage] = useState('');

  const refresh = async () => {
    const [f, c] = await Promise.all([api.getFixed(), api.listCustom()]);
    await setFixed(f); 
    await setCustom(c);
  };

  useEffect(() => { refresh() }, []);

  const toggleFixed = async (ext, next) => {
    const temp = await api.setFixed(ext, next);
    await refresh();
  };

  const addCustom = async (ext) => {
    await api.addCustom(ext);
    await refresh();
  };

  const delCustom = async (id) => {
    await api.deleteCustom(id);
    await refresh();
  };

  const onUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const res = await api.uploadDemo(file);
    setMessage(res.message || JSON.stringify(res));
  };

  return (
    <div className="container">
      <h1>파일 확장자 차단</h1>

      <section>
        <h2>고정 확장자</h2>
        <FixedList items={fixed} onToggle={toggleFixed} />
      </section>

      <section>
        <h2>커스텀 확장자 추가</h2>
        <CustomAdder onAdd={addCustom} />
        <CustomList items={custom} onDelete={delCustom} />
      </section>

      {/* <section>
        <h2>업로드 데모 (서버 검증)</h2>
        <input type="file" onChange={onUpload} />
        {message && <p className="msg">{message}</p>}
      </section> */}
    </div>
  );
}

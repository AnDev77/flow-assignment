import React, { useState , useEffect, useRef} from 'react';

export default function CustomAdder({ onAdd }) {
  const [ext, setExt] = useState('');
  const [error, setError] = useState('');
  const [pending, setPending] = useState(false);
  const timerRef = useRef(null);

  const onChange = (e) => {
    setExt(e.target.value);
    if (error) setError('');
  };

  const showError = (msg) => {
    setError(msg);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setError(''), 2500);
  };

  useEffect(() => {
    return () => timerRef.current && clearTimeout(timerRef.current);
  }, []);



  const submit = async (e) => {
    e.preventDefault();
    setError('');
    const v = ext.trim().replace(/^\./, '').toLowerCase();
    if (!v || v.length > 20) return alert('확장자명은 1~20자입니다.');
    if(pending) return;
    setPending(true);

    try{
      await onAdd(v);
      setExt('');
      setError('');
      } catch(err){
        console.log('[addCustom error]', err?.status, err?.message, err);
        if(err?.status === 409 || err?.message === 'duplicate'){
          showError('이미 추가된 확장자입니다.');
        } else if(err?.status === 400){
          showError(err?.message || "잘못된 확장자 명입니다.");
        } else{
          showError('추가에 실패했습니다. 다시 시도해주세요.');
        } 
      } finally{
          setPending(false);
      }
  };
  return (
    <form onSubmit={submit} className="row">
      <input value={ext} onChange={e => setExt(e.target.value)} 
        placeholder="예: sh" disabled = {pending}/>
      <button type="submit">추가</button>
      {error && (
        <div id="custom-add-error" className="error" role="alert">
          {error}
        </div>
      )}
    </form>
  );
}

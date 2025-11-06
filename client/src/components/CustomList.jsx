import React from 'react';

export default function CustomList({ items, onDelete }) {
  const count = items.length; 
  const max = 200;              

  if (!items.length) return <p className="muted">추가된 커스텀 확장자가 없습니다.</p>;
  return (
  <div className="custom-section">
    <div className="custom-header">
        <span>커스텀 확장자</span>
        <span className="count">{count} / {max}</span>
      </div>
    <div className="list">
      {items.map(it => (
        <li key={it.id}>
          <code>.{it.ext}</code>
          <button onClick={() => onDelete(it.id)} className="x">X</button>
        </li>
      ))}
    </div>
  </div>
  );
}

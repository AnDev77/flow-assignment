import React from 'react';

export default function FixedList({ items, onToggle }) {
  return (
    <div className="fixed-grid">
      {items.map(x => (
        <label key={x.ext} className="chip">
          <input
            type="checkbox"
            checked={x.isBlocked}
            onChange={e => onToggle(x.ext, e.target.checked)}
          />
          <span>.{x.ext}</span>
        </label>
      ))}
    </div>
  );
}

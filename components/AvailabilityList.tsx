import React from 'react';

export default function PlaceholderTable({ rows = 2, columns = 3 }) {
  return (
    <div
      style={{
        width: '100%',
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: '16px',
        padding: '16px',
      }}
    >
      {Array.from({ length: rows * columns }).map((_, index) => (
        <div
          key={index}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '8px 16px',
            border: '1px solid #444',
            borderRadius: '8px',
            height: '300px',
          }}
        >
        </div>
      ))}
    </div>
  );
}

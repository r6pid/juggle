import React from 'react';

export default function PlaceholderTable({ rows = 7, columns = 2 }) {
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
            height: '50px',
          }}
        >
          {/* Circle Placeholder */}
          <div
            style={{
              width: '16px',
              height: '16px',
              borderRadius: '50%',
              backgroundColor: '#444',
            }}
          ></div>

          {/* Text Placeholder */}
          <div
            style={{
              width: '60%',
              height: '16px',
              backgroundColor: '#444',
              borderRadius: '4px',
            }}
          ></div>
        </div>
      ))}
    </div>
  );
}

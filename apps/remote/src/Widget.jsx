import React, { useState } from 'react';

// 💥 Direct window call during component render
export default function Widget() {
  const [count, setCount] = useState(0);

  // This line works fine in browser, but crashes Node.js during SSR
  const userAgent = window.navigator.userAgent;

  return (
    <div style={{ border: '2px solid #0070f3', padding: '16px', borderRadius: '8px' }}>
      <h3>Remote MFE Widget</h3>
      <p style={{ fontSize: '12px', color: '#555' }}>
        <strong>User Agent:</strong> {userAgent}
      </p>
      <p>Local Counter: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment Counter
      </button>
    </div>
  );
}
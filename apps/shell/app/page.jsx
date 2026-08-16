'use client';

import React, { useState, useEffect, Suspense, use } from 'react';

// ============================================================================
// 1. STATIC SCOPE CONFIG
// ============================================================================
const SHARED_SCOPE = {
  react: {
    [React.version]: {
      get: () => Promise.resolve(() => React),
      loaded: true,
    },
  },
};

// ============================================================================
// 2. SINGLETON PROMISE CACHE
// ============================================================================
let remoteWidgetPromise = null;

function loadRemoteWidgetOnce() {
  if (!remoteWidgetPromise) {
    remoteWidgetPromise = (async () => {
      // During SSR / build time, return a safe fallback component
      if (typeof window === 'undefined') {
        return function FallbackRemote() {
          return null;
        };
      }

      const container = await import(
        /* webpackIgnore: true */ 'http://localhost:3001/assets/remoteEntry.js'
      );
      await container.init(SHARED_SCOPE);
      const factory = await container.get('./Widget');
      const Module = factory();
      return Module.default;
    })();
  }
  return remoteWidgetPromise;
}

// ============================================================================
// 3. REMOTE COMPONENT WRAPPER
// ============================================================================
function OptimizedRemoteComponent() {
  const [WidgetComponent, setWidgetComponent] = useState(null);

  useEffect(() => {
    loadRemoteWidgetOnce().then((Component) => {
      setWidgetComponent(() => Component);
    });
  }, []);

  if (!WidgetComponent) {
    return <div style={{ color: '#888' }}>Loading Remote...</div>;
  }

  return <WidgetComponent />;
}

// ============================================================================
// 4. PAGE DEFAULT EXPORT (Valid React Component)
// ============================================================================
export default function ManualOptimizedTest() {
  const [showComponent, setShowComponent] = useState(true);
  const [clickCount, setClickCount] = useState(0);

  const handleToggle = () => {
    setShowComponent((prev) => !prev);
    setClickCount((prev) => prev + 1);
  };

  return (
    <main style={{ padding: '24px', fontFamily: 'sans-serif' }}>
      <h1>🟢 Manual Optimized Test (No Interval)</h1>
      <p>Click the toggle button 10 times manually to verify that deltas drop to zero.</p>

      <div style={{ padding: '16px', background: '#f6ffed', border: '1px solid #b7eb8f', borderRadius: '8px', marginBottom: '20px' }}>
        <p>Manual Toggles: <strong>{clickCount}</strong></p>
        <button
          onClick={handleToggle}
          style={{
            padding: '10px 20px',
            background: '#52c41a',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          🔄 Toggle Remote Component
        </button>
      </div>

      <div style={{ minHeight: '120px', padding: '16px', border: '2px dashed #ccc' }}>
        {showComponent ? (
          <Suspense fallback={<div style={{ color: '#888' }}>Loading Remote...</div>}>
            <OptimizedRemoteComponent />
          </Suspense>
        ) : (
          <div style={{ color: '#aaa' }}>[Component Unmounted]</div>
        )}
      </div>
    </main>
  );
}
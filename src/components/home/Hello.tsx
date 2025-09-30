// ...existing code...

import React, { useEffect } from "react";


function Hello() {

    const [error, setError] = React.useState<string | null>(null);
  
    // advice (kept from previous behaviour)
    const [advice, setAdvice] = React.useState<string>("");

    useEffect(() => {
      let mounted = true;
      (async () => {
        try {
          const res = await fetch('https://api.adviceslip.com/advice');
          const j = await res.json();
          if (mounted) setAdvice(j.slip.advice);
        } catch (_) {
          setError('Failed to fetch random fact');
        }
      })();
      return () => { mounted = false; };
    }, []);

  return (
    <div className="hello" style={{ alignItems: 'center', display: 'flex', height: '100vh', flexDirection: 'column', textAlign: 'center', padding: 50 }}>
      <blockquote>
        {advice}
      </blockquote>
       {error && <div style={{ color: 'red' }}>Error: {error}</div>}
      {/* Embedded local HTML (sandboxed) */}
      <div style={{ width: '100%', maxWidth: 900 }}>
        <img
          src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExYTF2eHB2MGhiMTBmOXIzM3I0eXNtazJ2eDI2OHhpeDYzMzV0bWlsbyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/tR1ZZeJXR9RUDvaFVP/giphy.gif"
          alt="cat sticker"
          style={{ width: '100%', height: 'auto', borderRadius: 8 }}
        />
      </div>
    </div>
  );
}

export default Hello;



import React, { useEffect } from "react";
import BreedsRQ from "./BreedsTable";

/**
 * Paginated breeds viewer for https://catfact.ninja/breeds
 * - Fetches per-page data on demand
 * - Caches pages to avoid refetching
 * - Prefetches the next page after loading current page
 * - Optional: fetch all pages sequentially (use with care)
 */

function CatFacts() {

  const [error, setError] = React.useState<string | null>(null);

  // random fact (kept from previous behaviour)
  const [randomFact, setRandomFact] = React.useState<string>("");


  // fetch random fact on mount
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch('https://catfact.ninja/fact');
        const j = await res.json();
        if (mounted) setRandomFact(j.fact);
      } catch (_) {
        setError('Failed to fetch random fact');
      }
    })();
    return () => { mounted = false; };
  }, []);


  return (
    <div>
      <h1>Cat Facts</h1>

      <div style={{ marginBottom: 12 }}>
        {randomFact && <div>
          <blockquote>
-           {randomFact}
-         </blockquote>
        </div>}
      </div>

      {error && <div style={{ color: 'red' }}>Error: {error}</div>}

      <div>
        <h1>Cat Breeds</h1>
            <BreedsRQ />
      </div>
    </div>
  );
}

export default CatFacts;
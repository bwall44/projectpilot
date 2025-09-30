import { useState } from 'react';
import { useBreedsPage } from '../../hooks/useBreedsQuery';

export default function BreedsRQ() {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError, error } = useBreedsPage(page);

  if (isLoading) return <div>Loading breeds...</div>;
  if (isError) return <div>Error: {(error as Error).message}</div>;
  return (
    <div>

      <div style={{ marginBottom: 12 }}>
        <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1 || isLoading}>Previous</button>
        <span style={{ margin: '0 8px' }}>Page {data?.current_page ?? page}{data?.last_page ? ` / ${data.last_page}` : ''}</span>
        <button onClick={() => setPage((p) => (data ? Math.min(data.last_page, p + 1) : p + 1))} disabled={isLoading || (data ? page >= data.last_page : false)}>Next</button>
      </div>

      {isLoading && <div>Loading...</div>}
      {isError && <div style={{ color: 'red' }}>Error: {(error as Error).message}</div>}

      <div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left', borderBottom: '1px solid #ddd', padding: 6 }}>Breed</th>
              <th style={{ textAlign: 'left', borderBottom: '1px solid #ddd', padding: 6 }}>Country</th>
              <th style={{ textAlign: 'left', borderBottom: '1px solid #ddd', padding: 6 }}>Origin</th>
              <th style={{ textAlign: 'left', borderBottom: '1px solid #ddd', padding: 6 }}>Coat</th>
              <th style={{ textAlign: 'left', borderBottom: '1px solid #ddd', padding: 6 }}>Pattern</th>
            </tr>
          </thead>
          <tbody>
            {(data?.data ?? []).map((b) => (
              <tr key={b.breed}>
                <td style={{ padding: 6, borderBottom: '1px solid #f0f0f0' }}>{b.breed}</td>
                <td style={{ padding: 6, borderBottom: '1px solid #f0f0f0' }}>{b.country ?? ''}</td>
                <td style={{ padding: 6, borderBottom: '1px solid #f0f0f0' }}>{b.origin ?? ''}</td>
                <td style={{ padding: 6, borderBottom: '1px solid #f0f0f0' }}>{b.coat ?? ''}</td>
                <td style={{ padding: 6, borderBottom: '1px solid #f0f0f0' }}>{b.pattern ?? ''}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

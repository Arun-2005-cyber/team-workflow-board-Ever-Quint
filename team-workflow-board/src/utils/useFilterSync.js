import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

/**
 * useFilterSync()
 * - reads filters from URL search params
 * - returns { filters, setFilters }
 * - filters keys: status (comma list), priority, q (text), sort
 */
export default function useFilterSync() {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters = useMemo(() => {
    const status = searchParams.get('status');
    return {
      status: status ? status.split(',').filter(Boolean) : [],
      priority: searchParams.get('priority') || '',
      q: searchParams.get('q') || '',
      sort: searchParams.get('sort') || 'updated'
    };
  }, [searchParams]);

  function setFilters(next) {
    const p = new URLSearchParams();
    if (next.status && next.status.length) p.set('status', next.status.join(','));
    if (next.priority) p.set('priority', next.priority);
    if (next.q) p.set('q', next.q);
    if (next.sort) p.set('sort', next.sort);
    setSearchParams(p);
  }

  return { filters, setFilters };
}

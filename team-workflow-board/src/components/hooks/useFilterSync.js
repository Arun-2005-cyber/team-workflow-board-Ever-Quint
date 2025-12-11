import { useSearchParams } from 'react-router-dom';
import { useMemo } from 'react';

export default function useFilterSync() {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters = useMemo(() => {
    return {
      status: searchParams.get('status') ? searchParams.get('status').split(',') : null,
      priority: searchParams.get('priority') || null,
      q: searchParams.get('q') || '',
      sort: searchParams.get('sort') || 'updated'
    };
  }, [searchParams]);

  function setFilters(newFilters) {
    const params = new URLSearchParams();
    if (newFilters.status && newFilters.status.length) params.set('status', newFilters.status.join(','));
    if (newFilters.priority) params.set('priority', newFilters.priority);
    if (newFilters.q) params.set('q', newFilters.q);
    if (newFilters.sort) params.set('sort', newFilters.sort);
    setSearchParams(params);
  }

  return { filters, setFilters };
}

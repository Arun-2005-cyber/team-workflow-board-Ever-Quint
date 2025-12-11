import React, { useState, useEffect } from 'react';
import Select from '../../components/ui/Select';
import TextInput from '../../components/ui/TextInput';
import Button from '../../components/ui/Button';
import useFilterSync from '../../hooks/useFilterSync';

export default function TaskFilters() {
  const { filters, setFilters } = useFilterSync();
  const [local, setLocal] = useState(filters);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setLocal(filters), [filters]);

  function apply() {
    setFilters(local);
  }

  function clearAll() {
    const empty = { status: [], priority: '', q: '', sort: 'updated' };
    setLocal(empty);
    setFilters(empty);
  }

  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
      <Select
        id="filter-priority"
        label="Priority"
        value={local.priority}
        onChange={(v) => setLocal({ ...local, priority: v })}
        options={[{ value: 'High', label: 'High' }, { value: 'Medium', label: 'Medium' }, { value: 'Low', label: 'Low' }]}
      />
      <TextInput
        id="filter-q"
        label="Search"
        value={local.q}
        onChange={(v) => setLocal({ ...local, q: v })}
        placeholder="search title or description"
      />
      <Select
        id="filter-sort"
        label="Sort"
        value={local.sort}
        onChange={(v) => setLocal({ ...local, sort: v })}
        options={[
          { value: 'created', label: 'Created' },
          { value: 'updated', label: 'Updated' },
          { value: 'priority', label: 'Priority' }
        ]}
      />
      <div className="actions">
        <Button onClick={apply}>Apply</Button>
        <Button variant="secondary" onClick={clearAll}>Clear</Button>
      </div>
    </div>
  );
}

// storage schema versioning & simple migration functions
export const CURRENT_SCHEMA_VERSION = 2;

/**
 * migrateStorage(raw)
 * - raw: object read from localStorage (or null)
 * returns { data, migrated, from, to }
 */
export function migrateStorage(raw) {
  const stored = raw || {};
  const sv = stored.schemaVersion || 1;

  // if already current, nothing to do
  if (sv === CURRENT_SCHEMA_VERSION) {
    return { data: stored, migrated: false };
  }

  // Example migration: v1 -> v2
  // v1 shape assumed: { tasks: { id1: { title, ... }, id2: {...} } }
  // v2 shape: { schemaVersion: 2, tasks: [ {id, title, createdAt, updatedAt, tags } ] }
  if (sv === 1) {
    const tasksObj = stored.tasks || {};
    const tasksArray = Object.keys(tasksObj).map((k) => {
      const t = tasksObj[k] || {};
      return {
        id: k,
        title: t.title || '',
        description: t.description || '',
        status: t.status || 'Backlog',
        priority: t.priority || 'Medium',
        assignee: t.assignee || '',
        tags: t.tags || [],
        createdAt: t.createdAt || new Date().toISOString(),
        updatedAt: t.updatedAt || new Date().toISOString()
      };
    });
    const data = { schemaVersion: CURRENT_SCHEMA_VERSION, tasks: tasksArray };
    return { data, migrated: true, from: 1, to: CURRENT_SCHEMA_VERSION };
  }

  // fallback - no migration path known
  return { data: { schemaVersion: CURRENT_SCHEMA_VERSION, tasks: (stored.tasks || []) }, migrated: false };
}

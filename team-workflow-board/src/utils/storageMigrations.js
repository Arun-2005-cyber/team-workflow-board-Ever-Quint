export const CURRENT_SCHEMA_VERSION = 2;

export function migrateStorage(raw) {
  let data = raw || {};
  const sv = data.schemaVersion || 1;

  if (sv === CURRENT_SCHEMA_VERSION) return { data, migrated: false };

  // Example: v1 stored tasks as an object keyed by id; v2 wants an array with createdAt/updatedAt added
  if (sv === 1) {
    const tasksObj = data.tasks || {};
    const tasksArray = Object.values(tasksObj).map(t => ({
      ...t,
      createdAt: t.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      tags: t.tags || []
    }));
    data = { schemaVersion: 2, tasks: tasksArray };
    return { data, migrated: true, from: 1, to: 2 };
  }

  // Future migrations...
  return { data, migrated: false };
}

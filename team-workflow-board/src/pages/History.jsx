// src/pages/History.jsx

import React from "react";
import { useSelector } from "react-redux";

export default function History() {
  const migrated = useSelector((state) => state.tasks.migrated);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Migration History</h1>
      {migrated ? (
        <p className="text-green-600">
          Tasks were migrated to the latest schema successfully!
        </p>
      ) : (
        <p className="text-gray-600">No migrations performed yet.</p>
      )}
    </div>
  );
}

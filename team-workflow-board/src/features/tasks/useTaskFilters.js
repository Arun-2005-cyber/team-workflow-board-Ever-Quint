// src/features/tasks/useTaskFilters.js

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function useTaskFilters(tasks) {
  const [params, setParams] = useSearchParams();

  // -------------------------
  // Load initial filters from query
  // -------------------------
  const [statusFilter, setStatusFilter] = useState(
    params.get("status") ? params.get("status").split(",") : []
  );

  const [priorityFilter, setPriorityFilter] = useState(
    params.get("priority") || ""
  );

  const [searchText, setSearchText] = useState(
    params.get("search") || ""
  );

  const [sortBy, setSortBy] = useState(
    params.get("sort") || "createdAt"
  );

  // When filters change → update query string
  useEffect(() => {
    const newParams = {};

    if (statusFilter.length > 0)
      newParams.status = statusFilter.join(",");

    if (priorityFilter)
      newParams.priority = priorityFilter;

    if (searchText)
      newParams.search = searchText;

    if (sortBy)
      newParams.sort = sortBy;

    setParams(newParams);
  }, [statusFilter, priorityFilter, searchText, sortBy, setParams]);

  // -------------------------
  // Filtering
  // -------------------------
  const filteredTasks = useMemo(() => {
    return tasks
      .filter((t) => {
        // Status filter
        if (statusFilter.length > 0 && !statusFilter.includes(t.status)) {
          return false;
        }

        // Priority filter
        if (priorityFilter && t.priority !== priorityFilter) {
          return false;
        }

        // Text search
        const text = searchText.toLowerCase();
        if (
          text &&
          !t.title.toLowerCase().includes(text) &&
          !t.description.toLowerCase().includes(text)
        ) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "createdAt") {
          return b.createdAt - a.createdAt;
        }
        if (sortBy === "updatedAt") {
          return b.updatedAt - a.updatedAt;
        }
        if (sortBy === "priority") {
          const priorityOrder = { High: 3, Medium: 2, Low: 1 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        }
        return 0;
      });
  }, [tasks, statusFilter, priorityFilter, searchText, sortBy]);

  return {
    statusFilter,
    setStatusFilter,

    priorityFilter,
    setPriorityFilter,

    searchText,
    setSearchText,

    sortBy,
    setSortBy,

    filteredTasks,
  };
}

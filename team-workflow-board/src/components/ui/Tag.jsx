import React from "react";

export default function Tag({ children }) {
  return <span className="tag" style={{ background: "rgba(15,23,42,0.04)", padding: "6px 10px", borderRadius: 999 }}>{children}</span>;
}

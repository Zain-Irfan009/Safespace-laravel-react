import React from "react";

const StatusBadge = ({ status }) => {
  const badgeStyles =
    status === "Fail"
      ? "bg-red-100 text-red-800 border border-red-300"
      : "bg-green-100 text-green-800 border border-green-300";

  return (
    <span
      className={`inline-block px-2 py-1 text-xs font-semibold rounded-md ${badgeStyles}`}
    >
      {status}
    </span>
  );
};

export default StatusBadge;

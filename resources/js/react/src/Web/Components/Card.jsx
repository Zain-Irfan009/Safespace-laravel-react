import React from "react";
import clsx from "clsx";

const Card = ({ children, className }) => {
  return (
    <div
      className={clsx(
        "rounded-lg border border-[#E5E5E5] bg-white p-4",
        className
      )}
    >
      {children}
    </div>
  );
};

export default Card;

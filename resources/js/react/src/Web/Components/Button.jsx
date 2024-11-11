import React from "react";
import clsx from "clsx";

const Button = ({
  onClick,
  className,
  variant = "primary",
  children,
  ...props
}) => {
  const buttonStyles = clsx(
    "flex items-center px-6 py-2 rounded-full ",
    {
      "bg-black text-white": variant === "primary",
      "bg-[#E3EBFB] text-[#3D7EFF]": variant === "secondary",
    },
    className
  );

  return (
    <button onClick={onClick} className={buttonStyles} {...props}>
      {children}
    </button>
  );
};

export default Button;

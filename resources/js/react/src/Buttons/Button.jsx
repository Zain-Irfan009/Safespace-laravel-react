import React from "react";
import PropTypes from "prop-types";

const Button = ({
  label,
  onClick,
  type = "button",
  variant = "primary",
  size = "md",
  disabled = false,
  icon: Icon,
  className = "",
  ...props
}) => {
  const baseStyle =
    "inline-flex items-center justify-center font-medium focus:outline-none rounded transition";
  const sizeStyles = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };
  const variantStyles = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-500",
    secondary: "bg-gray-500 text-white hover:bg-gray-600",
    danger: "bg-red-500 text-white hover:bg-red-600",
    outline:
      "bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-100",
  };

  const combinedStyles = `${baseStyle} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={combinedStyles}
      {...props}
    >
      {Icon && <Icon className="mr-2 w-5 h-5" />}
      {label}
    </button>
  );
};

Button.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  variant: PropTypes.oneOf(["primary", "secondary", "danger", "outline"]),
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  disabled: PropTypes.bool,
  icon: PropTypes.elementType,
  className: PropTypes.string,
};

Button.defaultProps = {
  type: "button",
  variant: "primary",
  size: "md",
  disabled: false,
};

export default Button;

import { FC } from "react";

import styles from "../../styles/main.module.css";

type ButtonProps = {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  label?: string;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  children?: React.ReactNode;
};

const Button: FC<ButtonProps> = ({
  onClick,
  label,
  className,
  type = "button",
  disabled,
  children,
}) => {
  return (
    <button
      onClick={onClick}
      className={`${styles.btn} ${className}`}
      type={type}
      disabled={disabled}
    >
      {label && <span>{label}</span>}
      {children}
    </button>
  );
};

export default Button;

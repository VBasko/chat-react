import React from "react";
import clsx from "clsx";

type ButtonTypes = "submit" | "reset" | "button";

interface ButtonProps {
  children: React.ReactNode;
  type?: ButtonTypes;
  className?: string;
  onClick?: () => void;
}

const Button = ({
  children,
  type = "button",
  className,
  onClick,
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={clsx(
        "flex gap-x-2 px-6 py-2.5 bg-primary text-on-primary rounded-full relative overflow-hidden before:absolute before:inset-0 before:size-full before:bg-on-primary/[8%] before:opacity-0 before:rounded-[inherit] hover:before:opacity-100 focus:before:bg-on-primary/[12%] transition-all duration-500",
        className
      )}
    >
      {children}
    </button>
  );
};

export default Button;

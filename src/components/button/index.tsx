import React from "react";

type ButtonTypes = "submit" | "reset" | "button";

interface ButtonProps {
  children: React.ReactNode;
  type?: ButtonTypes;
}

const Button = ({ children, type = "button" }: ButtonProps) => {
  return (
    <button
      type={type}
      className="flex gap-x-2 px-6 py-2.5 bg-primary text-on-primary rounded-full relative overflow-hidden before:absolute before:inset-0 before:size-full before:bg-on-primary/[8%] before:opacity-0 before:rounded-[inherit] hover:before:opacity-100 focus:before:bg-on-primary/[12%] transition-all duration-500"
    >
      {children}
    </button>
  );
};

export default Button;

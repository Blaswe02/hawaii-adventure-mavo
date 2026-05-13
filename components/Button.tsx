import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', className = '', ...props }) => {
  const base = "px-6 py-3 rounded-lg font-bold transition-all duration-300 transform active:scale-95 shadow-md flex items-center justify-center gap-2";
  const variants = {
    primary: "bg-amber-600 hover:bg-amber-500 text-white border-2 border-amber-400",
    secondary: "bg-slate-700 hover:bg-slate-600 text-slate-200 border-2 border-slate-500",
    danger: "bg-red-800 hover:bg-red-700 text-red-100 border-2 border-red-600"
  };
  return (
    <button className={`${base} ${variants[variant]} ${className} disabled:opacity-50 disabled:cursor-not-allowed`} {...props}>
      {children}
    </button>
  );
};

export default Button;

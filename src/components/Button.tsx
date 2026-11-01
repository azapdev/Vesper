import type { ReactNode } from 'react';
import { Link, type LinkProps } from 'react-router-dom';

interface ButtonProps extends LinkProps {
  title: string;
  variant?: 'glass' | 'primary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  icon?: ReactNode;
}

const sizeClasses = {
  sm: 'px-4 py-2 text-xs',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
};

const variantClasses = {
  glass:
    'border-white/20 bg-white/10 text-white backdrop-blur-md hover:bg-white hover:text-black',
  primary: 'bg-white text-black hover:bg-white/80',
  outline: 'border-white/40 text-white hover:bg-white/10',
};

export const Button = ({
  to,
  title,
  variant = 'glass',
  size = 'md',
  icon,
  className = '',
  ...props
}: ButtonProps) => {
  return (
    <Link
      to={to}
      className={`inline-flex items-center justify-center gap-2 rounded-full border font-medium transition-all duration-300 active:scale-95 ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {title}
      {icon && (
        <span className="transition-transform group-hover:translate-x-1">
          {icon}
        </span>
      )}
    </Link>
  );
};

import { FC, ButtonHTMLAttributes } from 'react';
import styles from './Button.module.css';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  isAnimated?: boolean;
}

const Button: FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  isAnimated = true,
  className = '',
  ...props
}) => {
  const baseClasses = [
    styles.button,
    styles[variant],
    styles[size],
    isAnimated && 'button-hover button-animated',
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      className={baseClasses}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button; 
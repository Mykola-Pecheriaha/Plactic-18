import { FC, ButtonHTMLAttributes } from 'react';
import styles from './AnimatedButton.module.css';

interface AnimatedButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'hover' | 'pulse' | 'both';
}

const AnimatedButton: FC<AnimatedButtonProps> = ({
  children,
  variant = 'both',
  className = '',
  ...props
}) => {
  const getAnimationClasses = () => {
    switch (variant) {
      case 'hover':
        return 'button-hover';
      case 'pulse':
        return 'button-animated';
      case 'both':
        return 'button-hover button-animated';
      default:
        return '';
    }
  };

  return (
    <button
      className={`${getAnimationClasses()} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default AnimatedButton; 
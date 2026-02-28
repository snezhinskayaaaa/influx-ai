import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  hover?: boolean;
  gradient?: boolean;
  className?: string;
}

export default function Card({
  children,
  hover = false,
  gradient = false,
  className = ''
}: CardProps) {
  const baseStyles = 'card';
  const hoverStyles = hover ? 'card-hover' : '';
  const gradientStyles = gradient ? 'gradient-bg' : '';

  return (
    <div className={`${baseStyles} ${hoverStyles} ${gradientStyles} ${className}`}>
      {children}
    </div>
  );
}

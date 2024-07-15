import { ReactNode } from 'react';
import clsx from 'clsx';

interface ButtonProps {
   variant?: 'primary' | 'text';
   children?: ReactNode;
   onClick?: () => void;
   className?: string;
}

export const Button = ({ variant = 'primary', children, onClick, className }: ButtonProps) => (
   <button
      className={clsx(
         'inline-flex items-center rounded-full px-[25px] py-[10px] text-medium14 transition-colors duration-300 ease-in-out',
         {
            'bg-accent text-white hover:bg-accent-strong': variant === 'primary',
            'bg-transparent text-accent-strong hover:bg-white': variant === 'text',
         },
         className,
      )}
      onClick={onClick}
   >
      {children}
   </button>
);

import { ReactNode } from 'react';
import clsx from 'clsx';

interface ButtonProps {
   variant?: 'primary' | 'text';
   children?: ReactNode;
   onClick?: () => void;
}

export const Button = ({ variant = 'primary', children, onClick }: ButtonProps) => (
   <button
      className={clsx(
         'text-medium14 inline-flex items-center rounded-full px-[25px] py-[10px] transition-colors duration-300 ease-in-out',
         {
            'bg-accent hover:bg-accent-strong text-white': variant === 'primary',
            'text-accent-strong bg-transparent hover:bg-white': variant === 'text',
         },
      )}
      onClick={onClick}
   >
      {children}
   </button>
);

import { ReactNode } from 'react';
import { CheckboxMark } from '@/assets/icons/CheckboxMark';
import clsx from 'clsx';

interface CheckboxProps {
   name: string;
   children?: ReactNode;
   onClick?: () => void;
}

export const Checkbox = ({ name, children, onClick }: CheckboxProps) => {
   const id = name.toLowerCase();
   return (
      <div className="has-[:is(input:checked)]:signal relative ">
         <input type="checkbox" id={id} className="absolute hidden" />
         <label
            htmlFor={id}
            className="signal:text-gray-darkest flex items-center gap-[9px]  text-gray-dark"
         >
            <div className="signal:bg-transparent signal:shadow-checkbox flex h-[19px] w-[19px] items-center justify-center rounded-[5px] border border-accent bg-white">
               <div className="signal:block  hidden">
                  <CheckboxMark />
               </div>
            </div>
            {name}
         </label>
      </div>
   );
};

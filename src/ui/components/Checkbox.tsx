import { ReactNode } from 'react';
import { CheckboxMark } from '@/assets/icons/CheckboxMark';
import clsx from 'clsx';
import { ChangeEvent, MouseEvent } from 'react';

interface CheckboxProps {
   name: string;
   defaultChecked?: boolean;
   children?: ReactNode;
   onChange?: (e?: ChangeEvent<HTMLInputElement>) => void;
   onClick?: (e?: MouseEvent<HTMLInputElement>) => void;
}

export const Checkbox = ({ name, children, onChange, defaultChecked = false }: CheckboxProps) => {
   const id = name.toLowerCase();
   return (
      <div className="relative has-[:is(input:checked)]:signal">
         <input
            type="checkbox"
            id={id}
            className="absolute hidden"
            onChange={onChange}
            defaultChecked={defaultChecked}
            name={name.toLocaleLowerCase()}
         />
         <label
            htmlFor={id}
            className="flex items-center gap-[9px] text-regular14 text-gray-dark signal:text-gray-darkest"
         >
            <div className="flex h-[19px] w-[19px] items-center justify-center rounded-[5px] border border-accent signal:bg-transparent signal:shadow-checkbox">
               <div className="hidden signal:block">
                  <CheckboxMark />
               </div>
            </div>
            {name}
         </label>
      </div>
   );
};

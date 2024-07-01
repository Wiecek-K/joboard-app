import { CheckboxMark } from '@/assets/icons/CheckboxMark';

interface CheckboxProps {
   label: string;
   checked: boolean;
   onChange?: () => void;
}

export const Checkbox = ({ label, onChange, checked }: CheckboxProps) => {
   const id = label.toLowerCase();
   return (
      <div className="relative has-[:is(input:checked)]:signal">
         <input
            type="checkbox"
            id={id}
            className="absolute left-0 top-0 h-full w-full opacity-0"
            onChange={onChange}
            checked={checked}
            name={label.toLocaleLowerCase()}
         />
         <label
            htmlFor={id}
            className="flex items-center gap-[9px] py-[8.5px] text-regular14 text-gray-dark signal:text-gray-darkest md:py-0"
         >
            <div className="flex h-[19px] w-[19px] items-center justify-center rounded-[5px] border border-accent signal:bg-transparent signal:shadow-checkbox">
               <div className="hidden signal:block">
                  <CheckboxMark />
               </div>
            </div>
            {label}
         </label>
      </div>
   );
};

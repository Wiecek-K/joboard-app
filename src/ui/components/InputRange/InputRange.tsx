import React, { ChangeEvent, useEffect, useRef } from 'react';
import styles from './InputRange.module.css';

interface InputRangeProps {
   min: number;
   max: number;
   step: number;
   value: number;
   onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const InputRange = ({ min, max, value, step, onChange }: InputRangeProps) => {
   const inputRef = useRef<HTMLInputElement>(null);
   const inputValueRef = useRef<HTMLInputElement>(null);

   useEffect(() => {
      if (inputValueRef.current && inputRef.current) {
         inputValueRef.current.style.left =
            (value / max) * (inputRef.current.offsetWidth - 19) + 9.5 + 'px';
      }
   }, [value, max]);

   return (
      <div className={styles.sliderContainer}>
         <input
            type="range"
            value={value}
            min={min}
            max={max}
            step={step}
            onChange={(e) => {
               onChange(e);
            }}
            className={styles.slider}
            ref={inputRef}
         />

         <span ref={inputValueRef} className={`text-medium14 text-gray-dark ${styles.value}`}>
            {value}
         </span>
      </div>
   );
};

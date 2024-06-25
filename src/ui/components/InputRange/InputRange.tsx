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
   const inputValueRef = useRef<HTMLInputElement>(null);

   useEffect(() => {
      if (inputValueRef.current) {
         inputValueRef.current.style.left = (value / max) * 100 + '%';
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
         />

         <span ref={inputValueRef} className={`text-medium14 text-gray-dark ${styles.value}`}>
            {value}
         </span>
      </div>
   );
};

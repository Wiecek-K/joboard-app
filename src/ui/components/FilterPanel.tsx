'use client';
import { useState } from 'react';
import { OffersFilter } from './OffersFilter';
import clsx from 'clsx';
interface FilterPanelProps {}

export const FilterPanel = ({}: FilterPanelProps) => {
   const [showMobileOffersFilter, setShowMobileOffersFilter] = useState(false);

   return (
      <div className="relative flex items-center justify-between bg-white p-[16px] pb-[17px] md:flex-col md:items-start md:justify-start md:p-0 md:pt-[40px]">
         <div className="flex w-full items-center justify-between">
            <h1 className="text-logo text-center md:mb-[40px]">👾 JO–BOARD</h1>
            <div className="block md:hidden">
               <button
                  className={clsx(
                     'rounded-full px-[16px] py-[10px] text-semibold16 text-gray-darkest',
                     showMobileOffersFilter
                        ? 'border-transparent bg-gray-lightest'
                        : 'border border-accent bg-white',
                  )}
                  onClick={() => setShowMobileOffersFilter((prev) => !prev)}
               >
                  {showMobileOffersFilter ? 'Close' : 'Filter offers'}
               </button>
            </div>
         </div>
         {showMobileOffersFilter && (
            <div
               className={clsx(
                  'absolute bottom-0 left-0 top-full z-50 flex h-fit w-full justify-center bg-white pb-[15px] pt-[12px]',
                  'md:hidden',
               )}
            >
               <OffersFilter />
            </div>
         )}

         <div className="hidden md:block">
            <OffersFilter />
         </div>
      </div>
   );
};

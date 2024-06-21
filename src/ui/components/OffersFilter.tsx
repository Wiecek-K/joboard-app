'use client';

import { JobOfferI } from '@/lib/types';

import { useState, useRef } from 'react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

import { useDebouncedCallback } from 'use-debounce';
import { Checkbox } from './Checkbox';
import type { JobType } from '@/lib/types';

export const OffersFilter = () => {
   const searchParams = useSearchParams();
   const pathname = usePathname();
   const { replace } = useRouter();

   const handleJobTypeChange = (name: JobType, isChecked: boolean) => {
      const params = new URLSearchParams(searchParams);
      let jobTypeArray = params.get('jobType')?.split(',') || [];
      console.log(isChecked);

      if (isChecked) {
         jobTypeArray.push(name);
      } else {
         jobTypeArray = jobTypeArray.filter((type) => type !== name);
      }

      if (jobTypeArray.length === 0) {
         params.delete('jobType');
      } else {
         params.set('jobType', jobTypeArray.join(','));
      }
      replace(`${pathname}?${params.toString()}`);
   };

   const checkIsChecked = (arrayName: string, searchString: string) => {
      const params = new URLSearchParams(searchParams);
      const parameter = params.get(arrayName);

      if (!parameter) return false;

      return parameter.includes(searchString);
   };

   return (
      <div className="hidden h-[594px] w-[303px] rounded-[5px] border border-gray-light p-[24px] md:flex md:flex-col">
         <div className="border-b border-b-gray-light pb-[24px]">Filter offers</div>
         <div className="border-b border-b-gray-light py-[24px]">
            <p className="mb-[16px] text-semibold12 text-gray-darkest">Job type</p>
            <div className="grid grid-cols-[repeat(auto-fill,_minmax(115px,_1fr))] gap-x-[18px] gap-y-[12px]">
               <Checkbox
                  name="Full-time"
                  onChange={(e) =>
                     handleJobTypeChange(e?.target.name as JobType, e?.target.checked || false)
                  }
                  defaultChecked={checkIsChecked('jobType', 'full-time')}
               ></Checkbox>
               <Checkbox
                  name="Contract"
                  onChange={(e) =>
                     handleJobTypeChange(e?.target.name as JobType, e?.target.checked || false)
                  }
                  defaultChecked={checkIsChecked('jobType', 'contract')}
               ></Checkbox>
               <Checkbox
                  name="Part-time"
                  onChange={(e) =>
                     handleJobTypeChange(e?.target.name as JobType, e?.target.checked || false)
                  }
                  defaultChecked={checkIsChecked('jobType', 'part-time')}
               ></Checkbox>
               <Checkbox
                  name="Freelance"
                  onChange={(e) =>
                     handleJobTypeChange(e?.target.name as JobType, e?.target.checked || false)
                  }
                  defaultChecked={checkIsChecked('jobType', 'freelance')}
               ></Checkbox>
            </div>
         </div>
      </div>
   );
};

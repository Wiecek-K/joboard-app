'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { Checkbox } from './Checkbox';
import type { JobType, Seniority } from '@/lib/types';

function capitalizeFirstLetterAndAfterSlash(str: string) {
   return str.replace(/(\/|^)([a-z])/g, (_, slash, letter) => slash + letter.toUpperCase());
}

export const OffersFilter = () => {
   const searchParams = useSearchParams();
   const pathname = usePathname();
   const { replace } = useRouter();
   let params = new URLSearchParams(searchParams);

   const jobTypeFilterOptions: JobType[] = ['full-time', 'contract', 'part-time', 'freelance'];
   const seniorityFilterOptions: Seniority[] = [
      'lead',
      'expert',
      'senior',
      'mid/regular',
      'junior',
      'intern',
   ];

   const handleJobTypeChange = (name: JobType, isChecked: boolean) => {
      let jobTypeArray = params.get('jobType')?.split(',') || [];

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

   const handleSeniorityChange = (name: Seniority, isChecked: boolean) => {
      let seniorityArray = params.get('seniority')?.split(',') || [];

      if (isChecked) {
         seniorityArray.push(name);
      } else {
         seniorityArray = seniorityArray.filter((type) => type !== name);
      }

      if (seniorityArray.length === 0) {
         params.delete('seniority');
      } else {
         params.set('seniority', seniorityArray.join(','));
      }
      replace(`${pathname}?${params.toString()}`);
   };

   const checkIsChecked = (paramName: string, searchString: string) => {
      const parameter = params.get(paramName);

      if (!parameter) return false;

      return parameter.includes(searchString);
   };

   return (
      <div className="hidden h-[594px] w-[303px] rounded-[5px] border border-gray-light p-[24px] md:flex md:flex-col">
         <div className="border-b border-b-gray-light pb-[24px]">Filter offers</div>
         <div className="border-b border-b-gray-light py-[24px]">
            <p className="mb-[16px] text-semibold12 text-gray-darkest">Job type</p>
            <div className="grid grid-cols-[repeat(auto-fill,_minmax(115px,_1fr))] gap-x-[18px] gap-y-[12px]">
               {jobTypeFilterOptions.map((option) => (
                  <Checkbox
                     name={capitalizeFirstLetterAndAfterSlash(option)}
                     onChange={(e) =>
                        handleJobTypeChange(e?.target.name as JobType, e?.target.checked || false)
                     }
                     key={option + 'JobTypeCheckbox'}
                     defaultChecked={checkIsChecked('jobType', option)}
                  />
               ))}
            </div>
         </div>
         <div className="border-b border-b-gray-light py-[24px]">
            <p className="mb-[16px] text-semibold12 text-gray-darkest">Seniority</p>
            <div className="grid grid-cols-[repeat(auto-fill,_minmax(115px,_1fr))] gap-x-[18px] gap-y-[12px]">
               {seniorityFilterOptions.map((option) => (
                  <Checkbox
                     name={capitalizeFirstLetterAndAfterSlash(option)}
                     onChange={(e) =>
                        handleSeniorityChange(
                           e?.target.name as Seniority,
                           e?.target.checked || false,
                        )
                     }
                     key={option + 'SeniorityCheckbox'}
                     defaultChecked={checkIsChecked('seniority', option)}
                  />
               ))}
            </div>
         </div>
      </div>
   );
};

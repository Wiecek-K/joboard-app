'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { Checkbox } from './Checkbox';
import type { JobTypeT, WorkLocationT, SeniorityT } from '@/lib/types';

function capitalizeFirstLetterAndAfterSlash(str: string) {
   return str.replace(/(\/|^)([a-z])/g, (_, slash, letter) => slash + letter.toUpperCase());
}

export const OffersFilter = () => {
   const searchParams = useSearchParams();
   const pathname = usePathname();
   const { replace } = useRouter();
   let params = new URLSearchParams(searchParams);

   const jobTypeFilterOptions: JobTypeT[] = ['full-time', 'contract', 'part-time', 'freelance'];
   const seniorityFilterOptions: SeniorityT[] = [
      'lead',
      'expert',
      'senior',
      'mid/regular',
      'junior',
      'intern',
   ];
   const locationFilterOptions: WorkLocationT[] = ['remote', 'part-remote', 'on-site'];

   const handleFilterCheckboxChange = (
      paramName: string,
      paramValue: string,
      isChecked: boolean,
   ) => {
      let paramArray = params.get(paramName)?.split(',') || [];
      if (isChecked) {
         paramArray.push(paramValue);
      } else {
         paramArray = paramArray.filter((type) => type !== paramValue);
      }

      if (paramArray.length === 0) {
         params.delete(paramName);
      } else {
         params.set(paramName, paramArray.join(','));
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
                        handleFilterCheckboxChange('jobType', option, e?.target.checked || false)
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
                        handleFilterCheckboxChange('seniority', option, e?.target.checked || false)
                     }
                     key={option + 'SeniorityCheckbox'}
                     defaultChecked={checkIsChecked('seniority', option)}
                  />
               ))}
            </div>
         </div>
         <div className="border-b border-b-gray-light py-[24px]">
            <p className="mb-[16px] text-semibold12 text-gray-darkest">Location</p>
            <div className="grid grid-cols-[repeat(auto-fill,_minmax(115px,_1fr))] gap-x-[18px] gap-y-[12px]">
               {locationFilterOptions.map((option) => (
                  <Checkbox
                     name={capitalizeFirstLetterAndAfterSlash(option)}
                     onChange={(e) =>
                        handleFilterCheckboxChange(
                           'workLocation',
                           option,
                           e?.target.checked || false,
                        )
                     }
                     key={option + 'WorkLocationCheckbox'}
                     defaultChecked={checkIsChecked('workLocation', option)}
                  />
               ))}
            </div>
         </div>
      </div>
   );
};

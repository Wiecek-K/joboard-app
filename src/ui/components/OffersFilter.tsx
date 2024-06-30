'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { Checkbox } from './Checkbox';
import type { JobTypeT, WorkLocationT, SeniorityT } from '@/lib/types';
import { useDebouncedCallback } from 'use-debounce';
import { useEffect, useState } from 'react';
import { InputRange } from './InputRange/InputRange';
import { ClearFiltersBtn } from './ClearFiltersBtn';

function capitalizeFirstLetterAndAfterSlash(str: string) {
   return str.replace(/(\/|^)([a-z])/g, (_, slash, letter) => slash + letter.toUpperCase());
}

const DEFAULT_SALARY_MIN = 14000;

export const OffersFilter = () => {
   const searchParams = useSearchParams();
   const pathname = usePathname();
   const { replace } = useRouter();

   let params = new URLSearchParams(searchParams);

   const workLocationFromUrl = params.get('workLocation');
   const seniorityFromUrl = params.get('seniority');
   const jobTypeFromUrl = params.get('jobType');
   const salaryMinFromUrl = params.get('salaryMin');

   const [salaryMin, setSalaryMin] = useState<number>();
   const [selectedJobType, setSelectedJobType] = useState<string[]>([]);
   const [selectedWorkLocation, setSelectedWorkLocation] = useState<string[]>([]);

   const [selectedSeniority, setSelectedSeniority] = useState<string[]>([]);

   useEffect(() => {
      setSelectedWorkLocation(workLocationFromUrl?.split(',') || []);
      setSelectedSeniority(seniorityFromUrl?.split(',') || []);
      setSelectedJobType(jobTypeFromUrl?.split(',') || []);
      salaryMinFromUrl
         ? setSalaryMin(parseInt(salaryMinFromUrl))
         : setSalaryMin(DEFAULT_SALARY_MIN);
   }, [workLocationFromUrl, seniorityFromUrl, jobTypeFromUrl, salaryMinFromUrl]);

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

   const handleSalaryInputChange = useDebouncedCallback((newValue: number) => {
      if (newValue == 0) {
         params.delete('salaryMin');
      } else {
         params.set('salaryMin', newValue.toString());
      }

      replace(`${pathname}?${params.toString()}`);
   }, 300);

   const onFiltersChange = useDebouncedCallback(() => {
      !selectedJobType.length
         ? params.delete('jobType')
         : params.set('jobType', selectedJobType.join(','));
      !selectedSeniority.length
         ? params.delete('seniority')
         : params.set('seniority', selectedSeniority.join(','));
      !selectedWorkLocation.length
         ? params.delete('workLocation')
         : params.set('workLocation', selectedWorkLocation.join(','));

      replace(`${pathname}?${params.toString()}`);
   }, 300);

   const handleClearFilters = () => {
      params = new URLSearchParams();
      replace(`${pathname}?`);
   };

   const handleJobTitleChange = (option: string) => {
      selectedJobType.includes(option)
         ? setSelectedJobType((prev) => prev.filter((item) => item !== option))
         : setSelectedJobType((prev) => [...prev, option]);
   };

   const handleSeniorityChange = (option: string) => {
      selectedSeniority.includes(option)
         ? setSelectedSeniority((prev) => prev.filter((item) => item !== option))
         : setSelectedSeniority((prev) => [...prev, option]);
   };

   const handleWorkLocationChange = (option: string) => {
      selectedWorkLocation.includes(option)
         ? setSelectedWorkLocation((prev) => prev.filter((item) => item !== option))
         : setSelectedWorkLocation((prev) => [...prev, option]);
   };

   return (
      <div className="hidden w-[303px] rounded-[5px] border border-gray-light p-[24px] md:flex md:flex-col">
         <div className="flex items-center justify-between border-b border-b-gray-light pb-[16px] text-semibold16">
            <p>Filter offers</p> <ClearFiltersBtn onClick={handleClearFilters} />
         </div>
         <div className="border-b border-b-gray-light py-[24px]">
            <p className="mb-[16px] text-semibold12 text-gray-darkest">Job type</p>
            <div className="grid grid-cols-[repeat(auto-fill,_minmax(115px,_1fr))] gap-x-[18px] gap-y-[12px]">
               {jobTypeFilterOptions.map((option) => (
                  <Checkbox
                     label={capitalizeFirstLetterAndAfterSlash(option)}
                     onChange={() => {
                        handleJobTitleChange(option);
                        onFiltersChange();
                     }}
                     checked={selectedJobType.includes(option)}
                     key={option + 'JobTypeCheckbox'}
                  />
               ))}
            </div>
         </div>
         <div className="border-b border-b-gray-light py-[24px]">
            <p className="mb-[16px] text-semibold12 text-gray-darkest">Seniority</p>
            <div className="grid grid-cols-[repeat(auto-fill,_minmax(115px,_1fr))] gap-x-[18px] gap-y-[12px]">
               {seniorityFilterOptions.map((option) => (
                  <Checkbox
                     label={capitalizeFirstLetterAndAfterSlash(option)}
                     onChange={() => {
                        handleSeniorityChange(option);
                        onFiltersChange();
                     }}
                     checked={selectedSeniority.includes(option)}
                     key={option + 'SeniorityCheckbox'}
                  />
               ))}
            </div>
         </div>
         <div className="border-b border-b-gray-light py-[24px]">
            <p className="mb-[16px] text-semibold12 text-gray-darkest">Location</p>
            <div className="grid grid-cols-[repeat(auto-fill,_minmax(115px,_1fr))] gap-x-[18px] gap-y-[12px]">
               {locationFilterOptions.map((option) => (
                  <Checkbox
                     label={capitalizeFirstLetterAndAfterSlash(option)}
                     onChange={() => {
                        handleWorkLocationChange(option);
                        onFiltersChange();
                     }}
                     checked={selectedWorkLocation.includes(option)}
                     key={option + 'WorkLocationCheckbox'}
                  />
               ))}
            </div>
         </div>
         <div className="pt-[24px]">
            <p className="mb-[16px] text-semibold12 text-gray-darkest">{`Salary (min.)`}</p>
            <InputRange
               max={100000}
               min={0}
               onChange={(e) => {
                  setSalaryMin(parseInt(e.target.value));
                  handleSalaryInputChange(parseInt(e.target.value));
               }}
               step={500}
               value={salaryMin || DEFAULT_SALARY_MIN}
            />
         </div>
      </div>
   );
};

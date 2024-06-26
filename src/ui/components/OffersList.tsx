'use client';

import { JobOfferI } from '@/lib/types';
import { OfferCard } from './OfferCard';
import useSWR from 'swr';
import { fetchAllOffers } from '@/lib/actions';
import { useState, useRef, useEffect } from 'react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { Search } from '@/assets/icons/Search';
import { Place } from '@/assets/icons/Place';
import { useDebouncedCallback } from 'use-debounce';

export const OffersList = () => {
   const { data, error, isLoading } = useSWR<JobOfferI[]>('/joboard/offers', fetchAllOffers);

   const titleSearchBarRef = useRef<HTMLDivElement>(null);
   const locationSearchBarRef = useRef<HTMLDivElement>(null);

   const searchParams = useSearchParams();
   const pathname = usePathname();
   const { replace } = useRouter();

   const titleParam = searchParams.get('title') || '';
   const locationParam = searchParams.get('location') || '';
   const jobTypeParam = searchParams.get('jobType')?.split(',') || '';
   const seniorityParam = searchParams.get('seniority')?.split(',') || '';
   const workLocationParam = searchParams.get('workLocation')?.split(',') || '';
   const salaryMinParam = parseInt(searchParams.get('salaryMin') || '14000');

   const [wantedTitle, setWantedTitle] = useState('');
   const [wantedLocation, setWantedLocation] = useState('');

   useEffect(() => {
      setWantedTitle(titleParam);
      setWantedLocation(locationParam);
   }, [titleParam, locationParam]);

   const handleTitleSearch = useDebouncedCallback((term: string) => {
      const params = new URLSearchParams(searchParams);
      if (term) {
         params.set('title', term.toLocaleLowerCase());
      } else {
         params.delete('title');
      }
      replace(`${pathname}?${params.toString()}`);
      titleSearchBarRef.current?.blur();
   }, 350);

   const handleLocationSearch = useDebouncedCallback((term: string) => {
      const params = new URLSearchParams(searchParams);
      if (term) {
         params.set('location', term.toLocaleLowerCase());
      } else {
         params.delete('location');
      }
      replace(`${pathname}?${params.toString()}`);
      locationSearchBarRef.current?.blur();
   }, 350);

   const handleClearSearch = () => {
      const params = new URLSearchParams(searchParams);
      params.delete('location');
      params.delete('title');
      replace(`${pathname}?${params.toString()}`);
   };

   if (error) return <div>Wystąpił błąd</div>;
   if (isLoading)
      return (
         <div className="h-min-full w-full bg-gray-lightest p-[16px] pl-[15px] md:p-[40px]">
            <div className="mb-[24px] flex w-full flex-col gap-[12px] md:flex-row">
               <div
                  tabIndex={0}
                  className="relative w-full focus-within:signal"
                  ref={titleSearchBarRef}
               >
                  <input
                     disabled={true}
                     value={wantedTitle}
                     placeholder="Search for"
                     className="flex h-[50px] w-full items-center rounded-[4px] bg-white pl-[24px] pr-[50px] text-gray-dark shadow-checkbox"
                  ></input>
                  <div
                     className="absolute right-[10px] top-[50%] -translate-y-1/2 cursor-pointer"
                     onClick={() => handleTitleSearch(wantedTitle)}
                  >
                     <Search />
                  </div>
               </div>
               <div
                  tabIndex={0}
                  className="relative w-full focus-within:signal"
                  ref={locationSearchBarRef}
               >
                  <input
                     value={wantedLocation}
                     placeholder="Search location"
                     className="flex h-[50px] w-full items-center rounded-[4px] bg-white pl-[24px] pr-[50px] text-gray-dark shadow-checkbox"
                     disabled={true}
                  ></input>
                  <div
                     className="absolute right-[10px] top-[50%] -translate-y-1/2 cursor-pointer"
                     onClick={() => handleLocationSearch(wantedLocation)}
                  >
                     <Place />
                  </div>
               </div>
            </div>

            <div>Ładowanie...</div>
         </div>
      );

   if (!data) throw new Error();

   interface filterConditionsI {
      title?: string;
      location?: string;
      jobType?: string[];
      seniority?: string[];
      workLocation?: string[];
      salaryMin?: number;
   }

   const filterConditions: filterConditionsI = {};

   if (!!titleParam) filterConditions.title = titleParam;
   if (!!locationParam) filterConditions.location = locationParam;
   if (!!jobTypeParam) filterConditions.jobType = jobTypeParam;
   if (!!seniorityParam) filterConditions.seniority = seniorityParam;
   if (!!workLocationParam) filterConditions.workLocation = workLocationParam;
   if (!!salaryMinParam) filterConditions.salaryMin = salaryMinParam;

   const filteredData = data.filter((offer) => {
      return Object.entries(filterConditions).every(([key, value]) => {
         if (key === 'title') {
            return offer.title.toLocaleLowerCase().includes(value);
         }

         if (key === 'location') {
            return (
               offer.city.toLocaleLowerCase().includes(value) ||
               offer.country.toLocaleLowerCase().includes(value)
            );
         }

         if (key === 'jobType' && filterConditions.jobType) {
            return filterConditions.jobType.includes(offer.jobType.toLocaleLowerCase());
         }

         if (key === 'seniority' && filterConditions.seniority) {
            return filterConditions.seniority.includes(offer.seniority.toLocaleLowerCase());
         }

         if (key === 'workLocation' && filterConditions.workLocation) {
            return filterConditions.workLocation.includes(offer.workLocation.toLocaleLowerCase());
         }

         if (key === 'salaryMin' && filterConditions.salaryMin) {
            return offer.salaryTo >= value;
         }

         return false;
      });
   });

   return (
      <div className="min-h-full w-full bg-gray-lightest p-[16px] pl-[15px] md:p-[40px]">
         <div className="mb-[24px] flex w-full flex-col gap-[12px] md:flex-row">
            <div
               tabIndex={0}
               className="relative w-full focus-within:signal"
               ref={titleSearchBarRef}
            >
               <input
                  onChange={(e) => {
                     setWantedTitle(e.target.value);
                     handleTitleSearch(e.target.value);
                  }}
                  value={wantedTitle}
                  placeholder="Search for"
                  className="flex h-[50px] w-full items-center rounded-[4px] bg-white pl-[24px] pr-[50px] text-gray-dark shadow-checkbox"
                  onKeyDown={(e) => {
                     if (e.key === 'Enter') handleTitleSearch(wantedTitle);
                  }}
               ></input>
               <div className="bottom absolute z-10 mt-[2px] hidden w-full flex-col border border-b-0 border-gray-light bg-white text-regular14 shadow-checkbox signal:flex">
                  {wantedTitle &&
                     data
                        .filter((offer) =>
                           offer.title.toLocaleLowerCase().includes(wantedTitle.toLowerCase()),
                        )
                        .map((offer) => {
                           const titleParts = offer.title.split(
                              new RegExp(`(${wantedTitle})`, 'gi'),
                           );
                           return (
                              <div
                                 key={wantedTitle + offer._id}
                                 className="flex min-h-[30px] cursor-pointer items-center justify-between border-b border-gray-light px-[15px] py-[4px]"
                                 onClick={() => handleTitleSearch(offer.title)}
                              >
                                 <p className="max-w-[75%]t">
                                    {titleParts.map((part, index) =>
                                       part.toLowerCase() === wantedTitle.toLowerCase() ? (
                                          <span key={index} className="font-bold">
                                             {part}
                                          </span>
                                       ) : (
                                          <span key={index}>{part}</span>
                                       ),
                                    )}
                                 </p>
                                 <p className="text-right text-regular12">{offer.companyName}</p>
                              </div>
                           );
                        })}
               </div>
               <div
                  className="absolute right-[10px] top-[50%] -translate-y-1/2 cursor-pointer"
                  onClick={() => handleTitleSearch(wantedTitle)}
               >
                  <Search />
               </div>
            </div>
            <div
               tabIndex={0}
               className="relative w-full focus-within:signal"
               ref={locationSearchBarRef}
            >
               <input
                  onChange={(e) => {
                     setWantedLocation(e.target.value);
                     handleLocationSearch(e.target.value);
                  }}
                  value={wantedLocation}
                  placeholder="Search location"
                  className="flex h-[50px] w-full items-center rounded-[4px] bg-white pl-[24px] pr-[50px] text-gray-dark shadow-checkbox"
                  onKeyDown={(e) => {
                     if (e.key === 'Enter') handleLocationSearch(wantedLocation);
                  }}
               ></input>
               <div className="bottom absolute z-10 mt-[2px] hidden w-full flex-col border border-b-0 border-gray-light bg-white text-regular14 shadow-checkbox signal:flex">
                  {wantedLocation &&
                     Array.from(
                        new Set([
                           ...data.filter((offer) =>
                              offer.city.toLowerCase().includes(wantedLocation.toLowerCase()),
                           ),
                           ...data.filter((offer) =>
                              offer.country.toLowerCase().includes(wantedLocation.toLowerCase()),
                           ),
                        ]),
                     ).map((offer) => {
                        const cityParts = offer.city.split(new RegExp(`(${wantedLocation})`, 'gi'));
                        const countryParts = offer.country.split(
                           new RegExp(`(${wantedLocation})`, 'gi'),
                        );
                        return (
                           <div
                              key={wantedLocation + offer._id}
                              className="flex min-h-[30px] cursor-pointer items-center justify-between border-b border-gray-light px-[15px] py-[4px]"
                              onClick={() => handleLocationSearch(offer.city)}
                           >
                              <p className="max-w-[75%]t">
                                 {cityParts.map((part, index) =>
                                    part.toLowerCase() === wantedLocation.toLowerCase() ? (
                                       <span key={index} className="font-bold">
                                          {part}
                                       </span>
                                    ) : (
                                       <span key={index}>{part}</span>
                                    ),
                                 )}
                              </p>
                              <p className="text-right text-regular12">
                                 {countryParts.map((part, index) =>
                                    part.toLowerCase() === wantedLocation.toLowerCase() ? (
                                       <span key={index} className="font-bold">
                                          {part}
                                       </span>
                                    ) : (
                                       <span key={index}>{part}</span>
                                    ),
                                 )}
                              </p>
                           </div>
                        );
                     })}
               </div>
               <div
                  className="absolute right-[10px] top-[50%] -translate-y-1/2 cursor-pointer"
                  onClick={() => handleLocationSearch(wantedLocation)}
               >
                  <Place />
               </div>
            </div>
         </div>

         <div className="mb-[16px]">
            <span className="mr-[16px] text-semibold16 text-gray-darkest">{`${filteredData.length} offers found ${titleParam ? 'for "' + titleParam + '" ' : ''}${locationParam ? 'for "' + locationParam + '" ' : ''}`}</span>
            {titleParam || locationParam ? (
               <button
                  className="bg-transparent py-[10px] pl-0 pr-[17px] text-medium12 text-accent-strong"
                  onClick={handleClearSearch}
               >
                  Clear search
               </button>
            ) : null}
         </div>
         <div className="ml-[-1px] flex flex-col gap-[8px]">
            {filteredData.map((offer) => (
               <OfferCard {...offer} key={offer._id} />
            ))}
         </div>
      </div>
   );
};

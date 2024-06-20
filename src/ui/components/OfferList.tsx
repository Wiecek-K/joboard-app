'use client';

import { JobOfferI } from '@/lib/types';
import { OfferCard } from './OfferCard';
import useSWR from 'swr';
import { fetchAllOffers } from '@/lib/actions';
import { useState, useRef } from 'react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { Search } from '@/assets/icons/Search';
import { Place } from '@/assets/icons/Place';
import { useDebouncedCallback } from 'use-debounce';

export const OfferList = ({}) => {
   const { data, error, isLoading } = useSWR<JobOfferI[]>('/joboard/offers', fetchAllOffers);

   const [wantedTitle, setWantedTitle] = useState('');
   const [wantedLocation, setWantedLocation] = useState('');

   const titleSearchBarRef = useRef<HTMLDivElement>(null);
   const locationSearchBarRef = useRef<HTMLDivElement>(null);

   const searchParams = useSearchParams();
   const pathname = usePathname();
   const { replace } = useRouter();

   const titleParam = searchParams.get('title') || '';
   const locationParam = searchParams.get('location') || '';

   const handleTitleSearch = useDebouncedCallback((term: string) => {
      const params = new URLSearchParams(searchParams);
      if (term) {
         params.set('title', term);
      } else {
         params.delete('title');
      }
      replace(`${pathname}?${params.toString()}`);
      titleSearchBarRef.current?.blur();
   }, 350);

   const handleLocationSearch = useDebouncedCallback((term: string) => {
      const params = new URLSearchParams(searchParams);
      if (term) {
         params.set('location', term);
      } else {
         params.delete('location');
      }
      replace(`${pathname}?${params.toString()}`);
      locationSearchBarRef.current?.blur();
   }, 350);

   if (error) return <div>Wystąpił błąd</div>;
   if (isLoading) return <div>Ładowanie...</div>;
   if (!data) throw new Error();

   const filteredData = Array.from(
      new Set([
         ...data.filter((offer) => offer.city.toLowerCase().includes(locationParam.toLowerCase())),
         ...data.filter((offer) =>
            offer.country.toLowerCase().includes(locationParam.toLowerCase()),
         ),
      ]),
   ).filter((offer) => offer.title.toLocaleLowerCase().includes(titleParam.toLowerCase()));

   return (
      <div className="w-full bg-gray-lightest p-[16px] pl-[15px] md:p-[40px]">
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
            <p className="text-semibold16 text-gray-darkest">{filteredData.length} offers found</p>
         </div>
         <div className="ml-[-1px] flex flex-col gap-[8px]">
            {filteredData.map((offer) => (
               <OfferCard {...offer} key={offer._id} />
            ))}
         </div>
      </div>
   );
};

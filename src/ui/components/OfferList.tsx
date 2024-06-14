'use client';

import { JobOfferI } from '@/lib/types';
import { OfferCard } from './OfferCard';
import useSWR from 'swr';
import { fetchAllOffers } from '@/lib/data';
import { useState, useRef } from 'react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { Search } from '@/assets/icons/Search';

interface OfferListProps {}

export const OfferList = () => {
   const { data, error, isLoading } = useSWR<JobOfferI[]>('jobOffers', fetchAllOffers);
   const [wantedTitle, setWantedTitle] = useState('');

   const titleSerchBarRef = useRef<HTMLDivElement>(null);

   const searchParams = useSearchParams();
   const pathname = usePathname();
   const { replace } = useRouter();

   const titlePram = searchParams.get('title') || '';

   const handleTitleSearch = (term: string) => {
      const params = new URLSearchParams(searchParams);
      if (term) {
         params.set('title', term);
      } else {
         params.delete('title');
      }
      replace(`${pathname}?${params.toString()}`);
      setWantedTitle(term);
      titleSerchBarRef.current?.blur();
   };

   if (error) return <div>Wystąpił błąd</div>;
   if (isLoading) return <div>Ładowanie...</div>;
   if (!data) throw new Error();

   const filteredData = data.filter((offer) =>
      offer.title.toLocaleLowerCase().includes(titlePram.toLowerCase()),
   );

   return (
      <div className="w-full bg-gray-lightest p-[16px] md:p-[40px]">
         <div className="mb-[24px] flex w-full gap-[12px]">
            <div
               tabIndex={0}
               className="focus-within:signal relative w-full"
               ref={titleSerchBarRef}
            >
               <input
                  onChange={(e) => setWantedTitle(e.target.value)}
                  value={wantedTitle}
                  placeholder="Search for"
                  className="flex h-[50px] w-full items-center rounded-[4px] bg-white pl-[24px] pr-[50px]  text-gray-dark shadow-checkbox"
                  onKeyDown={(e) => {
                     if (e.key === 'Enter') handleTitleSearch(wantedTitle);
                  }}
               ></input>
               <div className="bottom signal:flex absolute z-10 mt-[2px]  w-full flex-col border border-b-0 border-gray-light bg-white text-regular14 shadow-checkbox ">
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
            <div className="relative w-full"></div>
         </div>

         <div className="mb-[16px]">
            <p className="text-semibold16 text-gray-darkest">{filteredData.length} offers found</p>
         </div>
         <div className="flex flex-col gap-[8px]">
            {filteredData.map((offer) => (
               <OfferCard {...offer} key={offer._id} />
            ))}
         </div>
      </div>
   );
};

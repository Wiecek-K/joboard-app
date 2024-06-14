'use client';

import { JobOfferI } from '@/lib/types';
import { OfferCard } from './OfferCard';
import useSWR from 'swr';
import { fetchAllOffers } from '@/lib/data';
import { useState } from 'react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
interface OfferListProps {
   offersArray: JobOfferI[];
}

export const OfferList = ({ offersArray }: OfferListProps) => {
   const { data, error } = useSWR<JobOfferI[]>('jobOffers', fetchAllOffers);
   const [wantedTitle, setWantedTitle] = useState('');

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
   };

   if (error) return <div>Wystąpił błąd</div>;
   if (!data) return <div>Ładowanie...</div>;

   const filteredData = data.filter((offer) =>
      offer.title.toLocaleLowerCase().includes(titlePram.toLowerCase()),
   );
   return (
      <div className="w-full bg-gray-lightest p-[16px] md:p-[40px]">
         <div className="mb-[24px] flex w-full gap-[12px]">
            <div className="relative w-full">
               <input
                  onChange={(e) => setWantedTitle(e.target.value)}
                  value={wantedTitle}
                  placeholder="Search for"
                  className="flex h-[50px] w-full items-center rounded-[4px] bg-white pl-[24px] pr-[50px]  text-gray-dark shadow-checkbox"
                  onKeyDown={(e) => {
                     if (e.key === 'Enter') handleTitleSearch(wantedTitle);
                  }}
               ></input>
               <div className="absolute bottom-[] z-10 flex w-full flex-col border border-b-0 border-gray-light bg-white text-regular14 shadow-checkbox">
                  {wantedTitle &&
                     wantedTitle !== titlePram &&
                     data
                        .filter((offer) =>
                           offer.title.toLocaleLowerCase().includes(wantedTitle.toLowerCase()),
                        )
                        .map((offer) => (
                           <div
                              key={wantedTitle + offer._id}
                              className="flex justify-between border-b border-gray-light px-[15px] py-[4px]"
                              onClick={() => handleTitleSearch(offer.title)}
                           >
                              <p>{offer.title}</p>
                              <p className="text-right text-regular12">{offer.companyName}</p>
                           </div>
                        ))}
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

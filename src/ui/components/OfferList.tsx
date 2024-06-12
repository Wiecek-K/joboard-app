import { JobOfferT } from '@/lib/types';
import { OfferCard } from './OfferCard';

interface OfferListProps {
   data: JobOfferT[];
}

export const OfferList = ({ data }: OfferListProps) => {
   return (
      <div className="w-full bg-gray-lightest p-[16px] md:p-[40px]">
         <div className="mb-[16px]">
            <p className="text-semibold16 text-gray-darkest">{data.length} offers found</p>
         </div>
         <div className="flex flex-col gap-[8px]">
            {data.map((offer) => (
               <OfferCard {...offer} key={offer._id} />
            ))}
         </div>
      </div>
   );
};

import { Container } from '@/ui/components/Container/Container';
import { OfferList } from '@/ui/components/OfferList';
import { placeholder } from '@/lib/placeholder-data';
import { fetchAllOffers } from '@/lib/data';
import { searchParamsI } from '@/lib/types';
import { filterOffers } from '@/lib/utils';

async function Page({ searchParams }: { searchParams?: searchParamsI }) {
   const offersArray = await fetchAllOffers();
   
   const filteredOffers = searchParams ? filterOffers(offersArray, searchParams) : [...offersArray];

   return (
      <Container>
         <h1 className="text-semibold28 font-bold">👾 JO–BOARD</h1>
         <div className="max-w-[800px]">
            <OfferList offersArray={filteredOffers} />
         </div>
      </Container>
   );
}

export default Page;

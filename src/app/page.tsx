import { Container } from '@/ui/components/Container/Container';
import { OffersList } from '@/ui/components/OffersList';
import { fetchAllOffers } from '@/lib/actions';
import { SWRProvider } from './swr-provider';
import { OffersFilter } from '@/ui/components/OffersFilter';

async function Page() {
   const offersData = await fetchAllOffers();

   return (
      <SWRProvider fallback={{ '/joboard/offers': offersData }}>
         <Container>
            <div className="flex items-center justify-between bg-white p-[16px] pb-[17px] md:flex-col md:items-start md:justify-start md:p-0 md:pt-[40px]">
               <h1 className="text-semibold28 font-bold md:mb-[40px]">👾 JO–BOARD</h1>
               <button className="block md:hidden">Filter offers</button>
               <OffersFilter />
            </div>
            <OffersList />
         </Container>
      </SWRProvider>
   );
}

export default Page;

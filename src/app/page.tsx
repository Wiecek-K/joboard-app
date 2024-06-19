import { Container } from '@/ui/components/Container/Container';
import { OfferList } from '@/ui/components/OfferList';
import { fetchAllOffers } from '@/lib/actions';
import { SWRProvider } from './swr-provider';

async function Page() {
   const offersData = await fetchAllOffers();

   return (
      <SWRProvider fallback={{ '/joboard/offers': offersData }}>
         <Container>
            <h1 className="text-semibold28 font-bold">👾 JO–BOARD</h1>
            <div className="max-w-[800px]">
               <OfferList />
            </div>
         </Container>
      </SWRProvider>
   );
}

export default Page;

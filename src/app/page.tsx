import { Container } from '@/ui/components/Container/Container';
import { OffersList } from '@/ui/components/OffersList';
import { fetchAllOffers } from '@/lib/actions';
import { SWRProvider } from './swr-provider';
import { FilterPanel } from '@/ui/components/FilterPanel';

async function Page() {
   const offersData = await fetchAllOffers();

   return (
      <SWRProvider fallback={{ '/joboard/offers': offersData }}>
         <Container>
            <FilterPanel />
            <OffersList />
         </Container>
      </SWRProvider>
   );
}

export default Page;

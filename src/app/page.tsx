import { Container } from '@/ui/components/Container/Container';
import { OfferList } from '@/ui/components/OfferList';
import { placeholder } from '@/lib/placeholder-data';
import { fetchAllOffers } from '@/lib/data';

async function Page() {
   const offersData = await fetchAllOffers();

   return (
      <Container>
         <h1 className="text-semibold28 font-bold">👾 JO–BOARD</h1>
         <div className="max-w-[800px]">
            <OfferList data={offersData} />
         </div>
      </Container>
   );
}

export default Page;

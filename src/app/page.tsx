import { Container } from '@/ui/components/Container/Container';
import { OfferList } from '@/ui/components/OfferList';
import { placeholder } from '@/lib/placeholder-data';

async function Page() {
   return (
      <Container>
         <h1 className="text-semibold28 font-bold">👾 JO–BOARD</h1>
         <div className="max-w-[800px]">
            <OfferList />
         </div>
      </Container>
   );
}

export default Page;

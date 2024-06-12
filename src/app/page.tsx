import { Container } from '@/ui/components/Container/Container';
import { Button } from '@/ui/components/Button';
import { Checkbox } from '@/ui/components/Checkbox';
import { OfferList } from '@/ui/components/OfferList';
import { placeholder } from '@/lib/placeholder-data';

function Page() {
   return (
      <Container>
         <h1 className="text-semibold28 font-bold">👾 JO–BOARD</h1>
         <div className="max-w-[800px]">
            <OfferList data={placeholder} />
         </div>
      </Container>
   );
}

export default Page;

import { Container } from '@/ui/components/Container/Container';
import { Button } from '@/ui/components/Button';
import { Checkbox } from '@/ui/components/Checkbox';
import { OfferCard } from '@/ui/components/OfferCard';
import { placeholder } from '@/lib/placeholder-data';
import { JobOfferT } from '@/lib/types';

function Page() {
   const offerData = placeholder[0] as JobOfferT;

   return (
      <Container>
         <h1 className="text-semibold28 font-bold">JoBoard 🛹</h1>
         <Button>Button primary</Button>
         <Button variant="text">Button text</Button>|
         <Checkbox name="Full-time" />
         <div className="max-w-[800px]">
            <OfferCard {...offerData} />
         </div>
      </Container>
   );
}

export default Page;

import { Container } from '@/ui/components/Container/Container';
import { Button } from '@/ui/components/Button';
import { Checkbox } from '@/ui/components/Checkbox';
function Page() {
   return (
      <Container>
         <h1 className="text-semibold28 font-bold">JoBoard 🛹</h1>
         <Button>Button primary</Button>
         <Button variant="text">Button text</Button>|
         <Checkbox name="Full-time" />
      </Container>
   );
}

export default Page;

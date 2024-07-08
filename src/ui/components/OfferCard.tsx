import Image from 'next/image';
import { JobOfferI } from '@/lib/types';
import { fetchJobOfferDetails } from '@/lib/actions';

interface OfferCardProps extends JobOfferI {}

export const OfferCard = ({
   title,
   companyName,
   image,
   salaryFrom,
   salaryTo,
   createdAt,
   currency,
   city,
   country,
   seniority,
   jobType,
   _id,
}: OfferCardProps) => {
   const formatSalary = (salary: number) => {
      return salary.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
   };

   function calculateDaysElapsed(data: string) {
      const now = new Date();
      const createdAt = new Date(data);
      const differenceInMilliseconds = now.getTime() - createdAt.getTime();

      return Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));
   }

   return (
      <div onClick={() => fetchJobOfferDetails(_id)}>
         <div className="flex w-full flex-col rounded-[5px] border border-gray-light bg-white p-[24px] md:hidden">
            <h3 className="mb-[16px] pr-[6px] text-semibold20 text-gray-darkest">{title}</h3>
            <div className="mb-[24px] flex">
               <Image
                  src={image}
                  width={32}
                  height={32}
                  className="mr-[12px]"
                  alt={`Logo of ${companyName}`}
               />
               <div className="flex flex-col justify-between text-regular12 text-gray-dark">
                  <div className="flex">
                     <h4 className="mr-[14px] border-r border-gray-light pr-[14px] text-medium12 text-gray-darkest">
                        {companyName}
                     </h4>
                     <p>
                        {city}, {country}
                     </p>
                  </div>
                  <div className="flex">
                     <p className="mr-[14px] border-r border-gray-light pr-[14px]">{seniority}</p>
                     <p>{jobType}</p>
                  </div>
               </div>
            </div>
            <div className="flex justify-between text-regular12">
               <p className="text-accent">
                  {formatSalary(salaryFrom)} - {formatSalary(salaryTo)} {currency}
               </p>
               <p className="text-gray-dark">{calculateDaysElapsed(createdAt)} days ago</p>
            </div>
         </div>
         <div className="relative hidden w-full rounded-[5px] border border-gray-light bg-white p-[24px] md:flex">
            <Image
               src={image}
               width={46}
               height={46}
               className="mr-[12px] h-[46px] w-[46px]"
               alt={`Logo of ${companyName}`}
               fill={false}
            />
            <div className="flex flex-col">
               <h3 className="mb-[8px] text-semibold20 text-gray-darkest md:pr-[75px]">{title}</h3>
               <div className="flex flex-wrap gap-[14px] text-medium12 text-gray-dark">
                  <h4 className="border-r border-gray-light pr-[14px] text-medium12 text-gray-darkest">
                     {companyName}
                  </h4>
                  <p className="border-r border-gray-light pr-[14px]">
                     {city}, {country}
                  </p>
                  <p className="border-r border-gray-light pr-[14px]">{jobType}</p>
                  <p className="border-r border-gray-light pr-[14px]">{seniority}</p>
                  <p className="text-accent">
                     {formatSalary(salaryFrom)} - {formatSalary(salaryTo)} {currency}
                  </p>
               </div>
               <p className="absolute right-[24px] top-[24px] text-medium12 text-gray-dark">
                  {calculateDaysElapsed(createdAt)} days ago
               </p>
            </div>
         </div>
      </div>
   );
};

'use Client';
import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { fetchJobOfferDetails } from '@/lib/actions';
import { JobOfferI } from '@/lib/types';
import Image from 'next/image';
import { Button } from '@/ui/components/Button';
import grid from './OfferDetailsModal.module.css';
import clsx from 'clsx';
import { calculateDaysElapsed, formatSalary } from '@/lib/utils';
import { Close } from '@/assets/icons/Close';
import exampleLogo from '@/assets/exampleCompanyLogo.jpg';

interface OfferDetailsModalProps {
   setShowModal: (newState: boolean) => void;
   offerId: string;
}

export const OfferDetailsModal = ({ setShowModal, offerId }: OfferDetailsModalProps) => {
   const [data, setData] = useState<JobOfferI | null>(null);

   useEffect(() => {
      const fetchAndSetData = async () => {
         const fetchedData = await fetchJobOfferDetails(offerId);
         setData(fetchedData);
      };
      const handleKeyDown = (event: KeyboardEvent) => {
         if (event.key === 'Escape' || event.key === 'Esc') {
            closeModal();
         }
      };
      fetchAndSetData();
      document.addEventListener('keydown', handleKeyDown);

      return () => {
         document.removeEventListener('keydown', handleKeyDown);
      };
   }, []);

   const modalRoot = document.getElementById('root');

   const closeModal = () => {
      setShowModal(false);
   };

   if (modalRoot) {
      return ReactDOM.createPortal(
         <div
            className="absolute left-0 top-0 flex w-full justify-center bg-white md:fixed md:bg-[#00000033] md:p-[40px] min-h-screen"
            onClick={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
               if (event.target !== event.currentTarget) {
                  return;
               }
               closeModal();
            }}
         >
            <div className="relative w-full max-w-[1094px] border-gray-light bg-white px-[16px] py-[30px] md:max-h-[800px] md:rounded-[5px] md:border md:pb-[48px] md:pl-[60px] md:pr-[74px] md:pt-[65px]">
               <div className={clsx(grid.container, 'flex flex-col gap-[16px] md:grid')}>
                  <div
                     className={clsx(
                        grid.title,
                        'mb-[6px] flex flex-col md:flex-row md:items-center',
                     )}
                  >
                     <Image
                        src={data?.image || exampleLogo}
                        width={80}
                        height={80}
                        className="mb-[28px] mr-[12px] h-[40px] w-[40px] md:mb-0 md:h-[80px] md:w-[80px]"
                        alt={`Logo of ${data?.companyName}`}
                     />
                     <div className="flex flex-col items-start gap-[12px] md:gap-[16px]">
                        <h3 className="text-semibold28">{data?.title}</h3>
                        <div className="text-regular14 text-gray-dark">
                           {data?.technologies.map((technology, index, array) =>
                              index === array.length - 1 ? technology : `${technology}・`,
                           )}
                        </div>
                     </div>
                  </div>

                  <div className={clsx(grid.details, 'md:overflow-y-auto')}>
                     <div className="flex flex-col gap-[12px] bg-gray-lightest px-[20px] py-[26px] md:gap-[20px] md:p-[30px]">
                        <div className="flex items-center justify-between border-b border-gray-light pb-[12px] md:pb-[20px]">
                           <p className="text-semibold12 text-gray-darkest">Added</p>
                           <p className="text-right text-regular14 text-gray-dark">
                              {calculateDaysElapsed(data?.createdAt || '0')} Days ago
                           </p>
                        </div>
                        <div className="flex items-center justify-between border-b border-gray-light pb-[12px] md:pb-[20px]">
                           <p className="text-semibold12 text-gray-darkest">Company</p>
                           <p className="text-right text-regular14 text-gray-dark">
                              {data?.companyName}
                           </p>
                        </div>

                        <div className="flex items-center justify-between border-b border-gray-light pb-[12px] md:pb-[20px]">
                           <p className="text-semibold12 text-gray-darkest">Seniority</p>
                           <p className="text-right text-regular14 text-gray-dark">
                              {data?.seniority}
                           </p>
                        </div>
                        <div className="flex items-center justify-between border-b border-gray-light pb-[12px] md:pb-[20px]">
                           <p className="text-semibold12 text-gray-darkest">Location</p>
                           <p className="text-right text-regular14 text-gray-dark">
                              {data?.city},<br />
                              {data?.country}
                           </p>
                        </div>
                        <div className="flex items-center justify-between border-b border-gray-light pb-[12px] md:pb-[20px]">
                           <p className="text-semibold12 text-gray-darkest">Job type</p>
                           <p className="text-right text-regular14 text-gray-dark">
                              {data?.jobType},<br />
                              {data?.workLocation}
                           </p>
                        </div>
                        <div className="flex items-center justify-between border-b border-gray-light pb-[12px] md:pb-[20px]">
                           <p className="text-semibold12 text-gray-darkest">Contract</p>
                           <p className="text-right text-regular14 text-gray-dark">
                              B2B,
                              <br />
                              Pernament
                           </p>
                        </div>
                        <div className="flex items-center justify-between border-gray-light">
                           <p className="text-semibold12 text-gray-darkest">Salary</p>
                           <p className="text-right text-regular14 text-gray-dark">
                              {`${formatSalary(data?.salaryFrom || 0)} -
                              ${formatSalary(data?.salaryTo || 0)} ${data?.currency}`}
                           </p>
                        </div>
                     </div>
                  </div>

                  <div
                     className={clsx(
                        grid.button,
                        'flex items-center bg-gray-lightest px-[30px] py-[16px] md:py-0',
                     )}
                  >
                     <a className="w-full" href={data?.offerUrl} target="_blank">
                        <Button className="w-full justify-center">Visit offer ➔</Button>
                     </a>
                  </div>
                  <div
                     className={clsx(
                        grid.description,
                        'bg-gray-lightest px-[40px] pt-[40px] text-regular14 md:overflow-auto',
                     )}
                  >
                     <p className="h-full whitespace-normal">{data?.description}</p>
                  </div>
               </div>

               <button
                  className="absolute right-[15px] top-[30px] flex h-[40px] w-[40px] items-center justify-center bg-transparent p-0 md:right-[20px] md:top-[20px]"
                  onClick={closeModal}
               >
                  <div className="relative h-full w-full">
                     <div className="absolute left-1/2 top-1/2 ml-[1.5px] mt-[1px] -translate-x-1/2 -translate-y-1/2">
                        <Close />
                     </div>
                  </div>
               </button>
            </div>
         </div>,
         modalRoot,
      );
   }
};

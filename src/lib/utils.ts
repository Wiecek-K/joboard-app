import { searchParamsI, JobOfferI } from './types';

const filterOffersByJobTitle = (data: JobOfferI[], jobTitle: string) => {
   return data.filter((offer) => offer.title.toLowerCase().includes(jobTitle.toLocaleLowerCase()));
};

export const filterOffers = (data: JobOfferI[], searchParams: searchParamsI): JobOfferI[] => {
   let filteredData = [...data];
   if (searchParams?.jobTitle) {
      filteredData = [...filterOffersByJobTitle(filteredData, searchParams.jobTitle)];
   }
   return filteredData;
};

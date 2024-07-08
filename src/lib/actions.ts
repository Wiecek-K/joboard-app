'use server';

import { JobOfferI } from './types';

export const fetchAllOffers = async () => {
   try {
      const response = await fetch('https://training.nerdbord.io/api/v1/joboard/offers', {
         next: {
            revalidate: 43200, // 12hours
         },
      });
      if (!response.ok) {
         throw new Error('Failed to fetch data');
      }

      const data = (await response.json()) as JobOfferI[];

      return data;
   } catch (error) {
      console.error('Database Connection Error:', error);
      throw new Error('Failed to fetch the offers.');
   }
};

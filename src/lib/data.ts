export const fetchAllOffers = async () => {
   try {
      const response = await fetch('https://training.nerdbord.io/api/v1/joboard/offers');
      if (!response.ok) {
         throw new Error('Failed to fetch data');
      }

      const data = await response.json();

      return data;
   } catch (error) {
      console.error('Database Connection Error:', error);
      throw new Error('Failed to fetch the offers.');
   }
};

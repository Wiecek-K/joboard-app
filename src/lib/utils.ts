export const formatSalary = (salary: number) => {
   return salary.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
};

export function calculateDaysElapsed(data: string) {
   const now = new Date();
   const createdAt = new Date(data);
   const differenceInMilliseconds = now.getTime() - createdAt.getTime();

   return Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));
}

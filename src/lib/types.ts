export interface JobOfferT {
   _id: string;
   title: string;
   companyName: string;
   city: string;
   country: string;
   workLocation: string;
   jobType: string;
   seniority: string;
   salaryFrom: number;
   salaryTo: number;
   currency: string;
   technologies: string[];
   description: string;
   offerUrl: string;
   __v: number;
   createdAt: string;
   updatedAt: string;
   image: string;
}

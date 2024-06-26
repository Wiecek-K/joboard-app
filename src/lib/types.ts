export interface JobOfferI {
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

export type JobTypeT = 'full-time' | 'contract' | 'part-time' | 'freelance';

export type SeniorityT = 'lead' | 'expert' | 'senior' | 'mid/regular' | 'junior' | 'intern';

export type WorkLocationT = 'remote' | 'part-remote' | 'on-site';

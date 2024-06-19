'use client';
import { SWRConfig } from 'swr';
import { ReactNode } from 'react';

type SWRProviderProps = {
   children: ReactNode;
   fallback: {
      [key: string]: any[];
   };
};

export const SWRProvider = ({ children, fallback }: SWRProviderProps) => {
   return <SWRConfig value={fallback}>{children}</SWRConfig>;
};

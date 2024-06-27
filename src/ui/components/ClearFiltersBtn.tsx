'use client';

interface ClearFiltersBtnProps {
   onClick: () => void;
}

export const ClearFiltersBtn = ({ onClick }: ClearFiltersBtnProps) => {
   return (
      <button
         onClick={onClick}
         className="bg-transparent py-[10px] pl-[26px] pr-0 text-medium12 text-accent-strong"
      >
         Clear filters
      </button>
   );
};

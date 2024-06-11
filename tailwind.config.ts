import type { Config } from 'tailwindcss';

const config: Config = {
   content: [
      './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
      './src/components/**/*.{js,ts,jsx,tsx,mdx}',
      './src/app/**/*.{js,ts,jsx,tsx,mdx}',
   ],
   theme: {
      extend: {
         backgroundImage: {
            'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
            'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
         },
         fontSize: {
            regular12: ['12px', { lineHeight: '100%', fontWeight: '400' }],
            medium12: ['12px', { lineHeight: '100%', fontWeight: '500' }],
            semibold12: ['12px', { lineHeight: '100%', fontWeight: '600' }],
            regular14: ['14px', { lineHeight: '18.2px', fontWeight: '400' }],
            medium14: ['14px', { lineHeight: '100%', fontWeight: '500' }],
            medium16: ['16px', { lineHeight: '24px', fontWeight: '500', letterSpacing: '-5%' }],
            semibold16: ['16px', { lineHeight: '100%', fontWeight: '600', letterSpacing: '-5%' }],
            semibold20: ['20px', { lineHeight: '26px', fontWeight: '600', letterSpacing: '-2%' }],
            semibold24: ['24px', { lineHeight: '100%', fontWeight: '600' }],
            semibold28: ['28px', { lineHeight: '100%', fontWeight: '600' }],
         },
      },
   },
   plugins: [],
};
export default config;

import type { Config } from 'tailwindcss';
import tailwindcssSignals from 'tailwindcss-signals';

const config: Config = {
   content: [
      './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
      './src/ui/components/**/*.{js,ts,jsx,tsx,mdx}',
      './src/app/**/*.{js,ts,jsx,tsx,mdx}',
   ],
   theme: {
      colors: {
         transparent: 'transparent',
         current: 'currentColor',
         white: '#ffffff',
         accent: {
            DEFAULT: '#9564D4',
            strong: '#552882',
         },
         gray: {
            outline: '#54545414',
            lightest: '#F8F8F8',
            light: '#DADADA',
            medium: '#BCBCBC',
            dark: '#545454',
            darkest: '#212121',
         },
      },
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
         boxShadow: {
            checkbox: '0px 0px 4px 0px hsla(266, 57%, 61%, 0.4)',
         },
      },
   },
   plugins: [tailwindcssSignals],
};
export default config;

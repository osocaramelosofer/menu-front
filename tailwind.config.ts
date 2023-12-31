import type { Config } from 'tailwindcss'
const { nextui } = require('@nextui-org/react')

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors:{
        customBrown: '#371E08',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
      }
    }
  },
  darkMode: 'class',
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            primary: '#371E08',
            secondary: '#CCB7A5',
            background: '#fcfcfc'
          }
        },
        dark: {
          colors: {
            primary: '#371E08',
            secondary: '#CCB7A5',
            background: '#fcfcfc'
          }
        },
        sweetDrink: {
          // extend: 'light',
          colors: {
            primary: '#371E08', // this change the header
            secondary: '#CCB7A5',
            content1: '#CCB7A5' // card background
            // foreground: '#371E08',  text color
          }
        }
      }
    })
  ]
}
export default config

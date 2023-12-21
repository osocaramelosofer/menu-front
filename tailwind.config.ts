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
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
      }
    },
    colors: {
      'sweet-brown': '#371E08'
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
          extend: 'light',
          colors: {
            background: '#371E08',
            foreground: '#371E08', // text color
            content1: '#CCB7A5', // card background
            primary: {
              DEFAULT: '#371E08', // this change the header
              foreground: '#f26485'
            },
            focus: '#F182F6'
          },
          layout: {
            disabledOpacity: '0.3',
            radius: {
              small: '4px',
              medium: '6px',
              large: '8px'
            },
            borderWidth: {
              small: '1px',
              medium: '2px',
              large: '3px'
            }
            // fontSize: {
            //   small: '40px',
            //   medium: '40px',
            //   large: '40px'
            // }
          }
        }
      }
    })
  ]
}
export default config

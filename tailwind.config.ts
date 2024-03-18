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
      colors: {
        customBrown: '#371E08'
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
      }
    }
  },
  // darkMode: 'class',
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            primary: '#2c2c2c',
            secondary: '#ebf4f5',
            background: '#fff'
          }
        },
        dark: {
          colors: {
            primary: '#2c2c2c',
            secondary: '#ebf4f5',
            background: '#fff'
          }
        },

        estudihambreTheme: {
          colors: {
            primary: '#CA4526'
          }
        },
        dulceTragoTheme: {
          colors: {
            primary: '#371E08'
          }
        }
      }
    })
  ]
}
export default config

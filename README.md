# 📚 README - Menu app

## Getting Started

First, run the development server:

```bash
npm i
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.


## 🌐 Environment Variables
We use an `.env` file to work with some libraries and services, so ask to developers to get it.
If you want to add a new value to the `.env` file, please share it with the team.

## 📦 Packages We Are Using

### For UI:
- **Next UI**: [Next UI Documentation](https://nextui.org/docs/guide/introduction)
- **Tailwind**: [Tailwind Documentation](https://tailwindcss.com/docs/installation)

### State Management:
- **Zustand**: [Zustand Documentation](https://docs.pmnd.rs/zustand/getting-started/introduction)
- **Next Auth**: [Next Auth Documentation](https://next-auth.js.org/getting-started/introduction)

### Styling Code:
- **eslint + typescript**

## 💻 About Installing Packages
Everything you need to install use `npm`. 
Also, avoid installing unnecessary packages to make the project as light as possible.
Also install exact (`npm install package-name -E`) packages to avoid incompatibilities in the future.

## 🚀 Deploy
We use Vercel to host the web app, and we have configured it to deploy to `dev` and `main` every time we merge or push changes to these branches.
Every time you need to deploy something, run `npm run build` first to check there are no issues with the code you want to deploy, and do it to `develop`, not `main`.

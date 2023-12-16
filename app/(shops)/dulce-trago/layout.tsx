import React from 'react';
import NavBar from '@/app/components/nav-bar';

export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <React.Fragment>
      <NavBar />
      <main className="flex flex-col items-center max-w-7xl mx-auto relative">
        {children}
      </main>
    </React.Fragment>
  );
}

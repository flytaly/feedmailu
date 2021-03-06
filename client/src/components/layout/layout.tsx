import Link from 'next/link';
import React from 'react';
import Meta from '../meta';
import Header from './header';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const currentYear = new Date().getFullYear();
  return (
    <>
      <Meta />
      <div className="flex justify-center max-w-screen min-h-screen bg-gradient-to-b from-gradFrom to-gradTo bg-fixed pt-2">
        <div className="flex flex-col flex-grow max-w-max">
          <Header />
          {children}
          <div className="mt-auto" />
          <footer className="text-center text-sm text-gray-400 mt-8 mb-3 space-x-2">
            <span>{currentYear}</span>
            <Link href="/help">
              <a className="hover:underline">Help</a>
            </Link>
            <Link href="/contacts">
              <a className="hover:underline">Contacts</a>
            </Link>
          </footer>
        </div>
      </div>
    </>
  );
};

export default Layout;

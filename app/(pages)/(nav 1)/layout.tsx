'use client'

import '@/app/ui/global.css'
import clsx from 'clsx'
import Nav from '@/app/ui/layout/nav/nav'
import Footer from '@/app/ui/layout/footer'
import { useAppSelector } from '@/redux/hooks'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const isOverlayVisible = useAppSelector(state => state.popup.isOverlayVisible)

  return (
      <body className={clsx(
        (isOverlayVisible) ? 'overflow-hidden' : '',
        'bg-mainColor'
      )}>
        <Nav />
        <div className="pt-16">
          {children}
        </div>
        <Footer />
      </body>
  );
}

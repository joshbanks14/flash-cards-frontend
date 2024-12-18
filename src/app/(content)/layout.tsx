"use client"
import { Header } from '../_components/header/header';
import { useAuth } from '../_contexts/authContext';

export default function ContentLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { currentUser } = useAuth();
  if (!currentUser) return;

  return (
    <div className='h-full w-full flex flex-row bg-[#0c331b]'>
        <div className='w-[400px] h-full'>
          <Header />
        </div>
        <div className='w-full h-full'>
          {children}
        </div>
    </div>
  );
}


import Sidebar from '@/components/layout/Sidebar'
import './globals.css'
import { Inter } from 'next/font/google'
import FollowBar from '@/components/layout/FollowBar'
import LoginModal from '@/components/modals/LoginModal'
import RegisterModal from '@/components/modals/RegisterModal'
import { Toaster } from 'react-hot-toast'
import AuthContext from '@/context/AuthContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'TunTuni',
  description: 'What is happening?',
}

export default function RootLayout({
  children, 
}: {
    children: React.ReactNode,
  }) {

  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContext>
          <Toaster/>
        <LoginModal />
        <RegisterModal/>
        <div className="h-screen bg-black">
          <div className="container h-full mx-auto xl-px-30 max-w-6xl">
            <div className='grid grid-cols-4 h-full'>
              <Sidebar/>
              <div className='col-span-3 lg:col-span-2 border-x-[1px] border-neutral-800'>
              {children}
              </div>
              <FollowBar/>
         </div>
        </div>
        </div>
        </AuthContext>
    
    
      
      </body>
    </html>
  )
}

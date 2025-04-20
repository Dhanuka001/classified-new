import './globals.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

export const metadata = {
  title: 'SriAdz | Sri Lanka’s Hottest Classifieds Platform',
  description: 'SriAdz is Sri Lanka’s trusted adult classifieds platform for verified spa services, live cam girls, personal ads, room rentals, and more. Post or explore ads with VIP, Super, and Normal options in Colombo and beyond.',

  keywords: [
    'spa colombo',
    'live cam girl',
    'whatsapp live cam',
    'sri lanka personals',
    'hela lanka ads',
    'sl ads',
    'girls personal'
  ],
  metadataBase: new URL('https://www.sriadz.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'SriAdz | Sri Lanka Classifieds',
    description: 'Spa, live cam, personals and more. Explore Sri Lanka’s spiciest verified ads.',
    url: 'https://www.sriadz.com',
    siteName: 'SriAdz',
    images: [
      {
        url: '/preview.png',
        width: 1200,
        height: 630,
        alt: 'SriAdz Banner',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SriAdz | Sri Lanka Classifieds',
    description: 'Spa, live cam, personals and more. Explore Sri Lanka’s spiciest verified ads.',
    images: ['/preview.png'],
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#0d0d0d] text-white min-h-screen">
        <Navbar />
        {children}
        <Footer />
        <ToastContainer position="top-center" autoClose={3000} />
      </body>
    </html>
  );
}

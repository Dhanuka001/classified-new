import Footer from './components/Footer';
import Navbar from './components/Navbar';
import './globals.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Head from 'next/head';

export const metadata = {
  title: 'SriAdz | Sri Lanka’s Hottest Classifieds Platform',
  description: 'Find verified live cam girls, personal ads, spas, rooms and more. Safe, sexy, and fast. Competing with Hela Lanka Ads and OK Ads.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content="spa colombo, live cam girl, whatsapp live cam, Sri Lanka personals, hela lanka ads, sl ads, girls personal" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="SriAdz" />

        {/* Open Graph (Facebook, etc.) */}
        <meta property="og:title" content="SriAdz | Sri Lanka Classifieds" />
        <meta property="og:description" content="Spa, live cam, personals and more. Explore Sri Lanka’s spiciest verified ads." />
        <meta property="og:image" content="/preview.png" />
        <meta property="og:url" content="https://www.sriadz.com" />
        <meta property="og:type" content="website" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="SriAdz | Sri Lanka Classifieds" />
        <meta name="twitter:description" content="Spa, live cam, personals and more. Explore Sri Lanka’s spiciest verified ads." />
        <meta name="twitter:image" content="/preview.png" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />

        {/* Mobile responsiveness */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <body className="bg-[#0d0d0d] text-white min-h-screen">
        <Navbar />
        {children}
        <Footer />
        <ToastContainer position="top-center" autoClose={3000} />
      </body>
    </html>
  );
}

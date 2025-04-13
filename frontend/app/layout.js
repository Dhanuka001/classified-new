import Footer from './components/Footer';
import Navbar from './components/Navbar';
import './globals.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const metadata = {
  title: 'SriAdz',
  description: 'Classified Ads Platform',
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
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-[#0d0d0d] border-t border-gray-800 text-gray-300 text-sm px-6 py-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left">
        
        {/* Company Info */}
        <div>
          <div className="flex justify-center md:justify-start mb-3">
            <Image
              src="/classified-03.png"
              alt="SriAdz Logo"
              width={140}
              height={140}
              className="object-contain"
            />
          </div>
          <p className="text-gray-400">
            Sri Lanka's hottest classified platform. Explore personal ads, spa, services, and more. We promote verified content with full user privacy.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link href="/terms" className="hover:text-white">Terms & Conditions</Link></li>
            <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
            <li><Link href="/contact" className="hover:text-white">Contact Us</Link></li>
            <li><Link href="/faq" className="hover:text-white">FAQs</Link></li>
            <li><Link href="/find-cam-girl" className="hover:text-white">Find Best Cam Girls</Link></li>
            <li><Link href="/find-spa-colombo" className="hover:text-white">Find Spa in Colombo</Link></li>
            <li><Link href="/find-VIP-full-service-in-colombo" className="hover:text-white">Find Best VIP Full Services</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Company Info</h3>
          <p className="text-gray-400">📧 support@sriadz.com</p>
          <p className="text-gray-400">📞 +94 77 123 4567</p>
          <p className="text-gray-500 mt-3">We operate 24/7 including holidays.</p>
        </div>
      </div>

      {/* Divider */}
      <div className="mt-10 border-t border-gray-700 pt-6 text-center text-gray-500">
        © {new Date().getFullYear()} <Image
          src="/classified-03.png"
          alt="SriAdz Footer Logo"
          width={80}
          height={25}
          className="inline-block align-middle mx-1"
        />. All rights reserved.
      </div>
    </footer>
  );
}

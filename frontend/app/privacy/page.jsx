'use client';
import Head from 'next/head';

export default function PrivacyPolicyPage() {
  return (
    <>
      <Head>
        <title>Privacy Policy | SriAdz Classifieds Sri Lanka</title>
        <meta name="description" content="Read the privacy policy of SriAdz, Sri Lanka’s top classified ads platform. Learn how we protect your personal data and ensure secure browsing." />
        <meta name="keywords" content="SriAdz Privacy Policy, Sri Lanka classifieds privacy, ad platform data protection, secure browsing Sri Lanka" />
      </Head>

      <div className="max-w-4xl mx-auto px-4 py-12 text-white">
        <h1 className="text-3xl font-bold mb-6 text-pink-500">Privacy Policy</h1>

        <p className="mb-4 text-gray-300">
          At <strong>SriAdz</strong>, we value your privacy. This Privacy Policy explains how we collect, use, and protect your personal information when you visit our platform or post classified ads.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2 text-white">1. Information We Collect</h2>
        <ul className="list-disc pl-5 text-gray-300 space-y-1">
          <li>Your name, phone number, and email when posting ads.</li>
          <li>Device and browser data (IP address, operating system).</li>
          <li>Usage information such as pages visited and ads clicked.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8 mb-2 text-white">2. How We Use Your Data</h2>
        <ul className="list-disc pl-5 text-gray-300 space-y-1">
          <li>To publish and manage your ads on our platform.</li>
          <li>To provide customer support and improve our service.</li>
          <li>To analyze traffic and optimize user experience.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8 mb-2 text-white">3. Cookies & Tracking</h2>
        <p className="text-gray-300 mb-2">
          We use cookies to remember user preferences, provide a smoother browsing experience, and track site performance via tools like Google Analytics.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2 text-white">4. Third-Party Sharing</h2>
        <p className="text-gray-300 mb-2">
          We do not sell or rent your personal data. However, we may share limited information with service providers for functionality and analytics purposes.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2 text-white">5. Your Privacy Rights</h2>
        <p className="text-gray-300 mb-2">
          You can request deletion of your data or opt out of certain features at any time. Contact us at <a href="mailto:support@sriadz.com" className="text-pink-400 underline">support@sriadz.com</a>.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2 text-white">6. Updates to This Policy</h2>
        <p className="text-gray-300 mb-2">
          We may update this Privacy Policy from time to time. Last updated: {new Date().toLocaleDateString()}
        </p>

        <p className="text-gray-400 text-sm mt-10">Thank you for trusting SriAdz - Sri Lanka’s trusted classifieds platform.</p>
      </div>
    </>
  );
}

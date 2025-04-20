'use client';
import Head from 'next/head';

export default function TermsPage() {
  return (
    <>
      <Head>
        <title>SriAdz Terms & Conditions | Verified Sri Lanka Classifieds</title>
        <meta name="description" content="Read the official terms and conditions of SriAdz, Sri Lanka’s top classified ads platform. Learn about user guidelines, safety, and responsibilities." />
        <meta name="robots" content="index, follow" />
      </Head>

      <div className="max-w-4xl mx-auto py-10 px-4 text-white">
        <h1 className="text-3xl font-bold text-pink-500 mb-6">Terms & Conditions</h1>

        <p className="mb-4 text-gray-300">
          Welcome to <strong>SriAdz</strong>. By using our platform, you agree to follow the terms below. These terms are designed to ensure the safety, trust, and privacy of all users who access our platform.
        </p>

        <h2 className="text-xl font-semibold text-pink-400 mt-6 mb-2">1. Acceptance of Terms</h2>
        <p className="text-gray-400 mb-4">
          By accessing or using SriAdz, you agree to comply with these Terms & Conditions, our Privacy Policy, and all applicable laws and regulations.
        </p>

        <h2 className="text-xl font-semibold text-pink-400 mt-6 mb-2">2. Content Guidelines</h2>
        <p className="text-gray-400 mb-4">
          All ads posted must be legal, truthful, and appropriate. We do not allow content that promotes violence, hate speech, fraud, or illegal services.
        </p>

        <h2 className="text-xl font-semibold text-pink-400 mt-6 mb-2">3. User Responsibilities</h2>
        <p className="text-gray-400 mb-4">
          Users are responsible for verifying the authenticity of listings before engaging. We recommend avoiding upfront payments unless verified and trusted.
        </p>

        <h2 className="text-xl font-semibold text-pink-400 mt-6 mb-2">4. Account & Security</h2>
        <p className="text-gray-400 mb-4">
          You are responsible for maintaining the confidentiality of your login credentials. SriAdz will never ask for your password via email or message.
        </p>

        <h2 className="text-xl font-semibold text-pink-400 mt-6 mb-2">5. Modifications</h2>
        <p className="text-gray-400 mb-4">
          We reserve the right to update these terms at any time. Changes will be notified via this page.
        </p>

        <p className="text-sm text-gray-500 mt-8">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </div>
    </>
  );
}

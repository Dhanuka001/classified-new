export default function FAQPage() {
    return (
      <div className="min-h-screen bg-[#0d0d0d] text-white px-6 py-10 max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-pink-500 mb-6">📚 Frequently Asked Questions (FAQs)</h1>
        <p className="text-gray-300 mb-6">
          Find answers about SriAdz, Sri Lanka’s fastest-growing adult and personal classified ads platform. From posting to safety – it’s all here!
        </p>
  
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-yellow-400">What is SriAdz?</h2>
            <p className="text-gray-300">
              SriAdz is a Sri Lankan classified ads platform designed for personal services, spa listings, live cam promotions, VIP services, and more.
            </p>
          </div>
  
          <div>
            <h2 className="text-xl font-semibold text-yellow-400">How do I post an ad?</h2>
            <p className="text-gray-300">
              Click the “Post Ad” button, fill in your details (title, image, contact info), choose promotion type (VIP, Super, Normal), and submit!
            </p>
          </div>
  
          <div>
            <h2 className="text-xl font-semibold text-yellow-400">Are the ads verified?</h2>
            <p className="text-gray-300">
              Yes, we manually review all ads. Ads with the “Cashback Guaranteed” badge are additionally backed by our support team.
            </p>
          </div>
  
          <div>
            <h2 className="text-xl font-semibold text-yellow-400">Can I promote my services on WhatsApp?</h2>
            <p className="text-gray-300">
              Absolutely. Most users add a WhatsApp number for faster communication. You can also feature your ad on the homepage or chatbox.
            </p>
          </div>
  
          <div>
            <h2 className="text-xl font-semibold text-yellow-400">How can I get my ad to the top?</h2>
            <p className="text-gray-300">
              Choose a VIP or Super promotion during posting. These ads appear at the top and get the highest visibility.
            </p>
          </div>
  
          <div>
            <h2 className="text-xl font-semibold text-yellow-400">Is SriAdz safe and anonymous?</h2>
            <p className="text-gray-300">
              Yes. We protect your privacy and do not display or store sensitive information without your consent.
            </p>
          </div>
        </div>
      </div>
    );
  }
  
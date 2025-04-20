export default function ContactPage() {
    return (
      <div className="min-h-screen bg-[#0d0d0d] text-white px-6 py-10 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-pink-500 mb-4">📞 Contact SriAdz</h1>
        <p className="text-gray-300 mb-6">
          Have questions about our listings, promotions, or site usage? Contact SriAdz for all support and advertising inquiries.
        </p>
  
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full bg-black border border-gray-700 text-white px-4 py-2 rounded"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full bg-black border border-gray-700 text-white px-4 py-2 rounded"
          />
          <textarea
            rows="5"
            placeholder="Your Message"
            className="w-full bg-black border border-gray-700 text-white px-4 py-2 rounded"
          />
          <button className="bg-pink-600 hover:bg-pink-500 px-6 py-2 rounded text-white font-semibold">
            Send Message
          </button>
        </form>
  
        <div className="mt-10 text-sm text-gray-400">
          <p>📧 Email: teamsriadz@gmail.com</p>
          <p>📞 Hotline: +94 77 123 XXXX</p>
          <p>🕒 We’re available 24/7 for urgent issues.</p>
        </div>
      </div>
    );
  }
  
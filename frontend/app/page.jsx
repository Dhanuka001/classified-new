'use client';

import { useEffect, useState } from 'react';
import AdCard from './components/AdCard';
import VipAdSlider from './components/VipAdSlider';
import Navbar from './components/Navbar';
import { SearchBar, FilterSidebar } from './components/SearchFilter';
import Pagination from './components/Pagination';
import FloatingChatBox from './components/FloatingChatBox';
import { toast } from 'react-toastify';
import { FiFilter } from 'react-icons/fi';
import Head from 'next/head';


export default function HomePage() {
  const [allAds, setAllAds] = useState([]);
  const [vipAds, setVipAds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);

  const adsPerPage = 12;

  const categories = [
    { display: 'Live Cam', slug: 'live-cam' },
    { display: 'Girls Personal', slug: 'girls-personal' },
    { display: 'Spa', slug: 'spa' },
    { display: 'Shemale', slug: 'shemale' },
  ];

  useEffect(() => {
    setLoading(true);
    const url = selectedCategory
      ? `${process.env.NEXT_PUBLIC_API_URL}/ads?category=${selectedCategory}`
      : `${process.env.NEXT_PUBLIC_API_URL}/ads`;

    fetch(url, {
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch ads');
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          const sortedAds = data.sort((a, b) => {
            if (a.promotion === 'super' && b.promotion !== 'super') return -1;
            if (b.promotion === 'super' && a.promotion !== 'super') return 1;
            if (a.promotion === 'vip' && b.promotion !== 'vip') return -1;
            if (b.promotion === 'vip' && a.promotion !== 'vip') return 1;
            return 0;
          });
          setAllAds(sortedAds);
          setVipAds(data.filter((ad) => ad.promotion === 'vip'));
        } else {
          throw new Error('Invalid data format');
        }
      })
      .catch((err) => {
        toast.error('Failed to load ads.', { position: 'top-center' });
        setAllAds([]);
        setVipAds([]);
      })
      .finally(() => setLoading(false));
  }, [selectedCategory]);

  const indexOfLastAd = currentPage * adsPerPage;
  const indexOfFirstAd = indexOfLastAd - adsPerPage;
  const currentAds = allAds.slice(indexOfFirstAd, indexOfLastAd);
  const totalPages = Math.ceil(allAds.length / adsPerPage);

  return (
    <>
    <Head>
        <title>SriAdz - Explore Ads | Live Cam, Girls Personal, Spa & More</title>
        <meta name="description" content="Discover verified Sri Lankan ads from live cam girls, personal spa services, and more. Updated daily. Browse VIP, Super, and Normal ads." />
        <meta name="keywords" content="SriAdz, spa colombo, live cam girl, whatsapp cam, sri lanka ads, girls personal, adult classified, sri lanka escort, sri lanka massage" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="SriAdz - Explore All Ads" />
        <meta property="og:description" content="Find trending classified ads for live cam, spa, and more across Sri Lanka. 100% verified." />
        <meta property="og:url" content="https://www.sriadz.com" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/og-preview.png" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "SriAdz - Explore Ads",
            "description": "Explore Sri Lankan classified ads like spa colombo, live cam girls, and more. VIP, Super, and Normal ads updated regularly.",
            "url": "https://www.sriadz.com",
          }),
        }}
      />

    <div className="min-h-screen w-full overflow-x-hidden">

    <div className="flex justify-between items-center px-4 sm:px-10 mt-4 z-40 lg:hidden">
      <h2 className="text-white font-bold text-lg">Filter Ads</h2>
      <button onClick={() => setShowSidebar(true)} className="text-pink-400 bg-[#1a1a1a] p-2 rounded">
        <FiFilter />
      </button>
    </div>

      {/* Category Tabs */}
      <div className="flex justify-center gap-2 sm:gap-4 pt-4 pb-2 px-4 overflow-x-auto">
        <button
          className={`text-white text-xs sm:text-sm font-semibold px-3 sm:px-4 py-1 sm:py-2 rounded-lg transition-colors whitespace-nowrap ${
            !selectedCategory
              ? 'bg-[#ff3399] text-white'
              : 'bg-[#1a1a1a] hover:bg-[#ff3399]'
          }`}
          onClick={() => {
            setSelectedCategory(null);
            setCurrentPage(1);
          }}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category.slug}
            className={`text-white text-xs sm:text-sm font-semibold px-3 sm:px-4 py-1 sm:py-2 rounded-lg transition-colors whitespace-nowrap ${
              selectedCategory === category.slug
                ? 'bg-[#ff3399] text-white'
                : 'bg-[#1a1a1a] hover:bg-[#ff3399]'
            }`}
            onClick={() => {
              setSelectedCategory(category.slug);
              setCurrentPage(1);
            }}
          >
            {category.display}
          </button>
        ))}
      </div>

      {/* Search Bar */}
      <div className="px-4 sm:px-10">
        <SearchBar />
      </div>

      <div className="px-4 sm:px-6 lg:px-10 pt-2 pb-10 max-w-[1600px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-10 md:px-32">
          {/* Sidebar */}
          <div className="w-full lg:w-1/5 border-r md:pr-6 border-gray-700">
          <FilterSidebar
            showSidebar={showSidebar}
            setShowSidebar={setShowSidebar}
            onSelectCategory={(slug) => {
              setSelectedCategory(slug);
              setCurrentPage(1);
            }}
          />
          </div>

          {/* Main Content */}
          <div className="w-full lg:w-4/5">
            <VipAdSlider vipAds={vipAds} />

            <h2 className="text-white text-xl font-semibold mb-6 mt-1 border-t pt-3 border-gray-800">
              💦 Explore All Ads
            </h2>

            {loading ? (
              <p className="text-gray-400 text-center text-lg">Loading ads...</p>
            ) : allAds.length === 0 ? (
              <p className="text-gray-400 text-center text-lg">No ads available.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-6 w-full">
                {currentAds.map((ad) => (
                  <AdCard key={ad._id} ad={ad} />
                ))}
              </div>
            )}

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </div>
        </div>
      </div>

      <FloatingChatBox />
    </div>

    </>
  );
}
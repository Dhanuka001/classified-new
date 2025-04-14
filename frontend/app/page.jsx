'use client';

import { useEffect, useState } from 'react';
import AdCard from './components/AdCard';
import VipAdSlider from './components/VipAdSlider';
import Navbar from './components/Navbar';
import { SearchBar, FilterSidebar } from './components/SearchFilter';
import Pagination from './components/Pagination';
import FloatingChatBox from './components/FloatingChatBox';
import { toast } from 'react-toastify';

export default function HomePage() {
  const [allAds, setAllAds] = useState([]);
  const [vipAds, setVipAds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const adsPerPage = 12;

  useEffect(() => {
    setLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/ads`, {
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
  }, []);

  const indexOfLastAd = currentPage * adsPerPage;
  const indexOfFirstAd = indexOfLastAd - adsPerPage;
  const currentAds = allAds.slice(indexOfFirstAd, indexOfLastAd);
  const totalPages = Math.ceil(allAds.length / adsPerPage);

  return (
    <div className="min-h-screen w-full overflow-x-hidden">

      {/* Category Tabs */}
      <div className="flex justify-center gap-4 sm:gap-6 pt-4 pb-4">
        {['Live Cam', 'Girls Personal', 'Spa','Shemale'].map((category) => (
          <button
            key={category}
            className="text-white text-sm sm:text-base font-semibold px-4 py-2 rounded-lg bg-[#1a1a1a] hover:bg-[#ff3399] hover:text-white transition-colors"
          >
            {category}
          </button>
        ))}
      </div>

      {/* Search Bar */}
      <div className="px-4 sm:px-10">
        <SearchBar />
      </div>

      <div className="px-4 sm:px-6 lg:px-10 pt-1 pb-10 max-w-[1600px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-10 md:px-32">
          {/* Sidebar */}
          <div className="w-full lg:w-1/5 border-r md:pr-6 border-gray-700">
            <FilterSidebar />
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
  );
}
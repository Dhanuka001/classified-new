'use client'
import { useEffect, useState } from 'react';
import AdCard from './components/AdCard';
import VipAdSlider from './components/VipAdSlider';
import Navbar from './components/Navbar';
import { SearchBar, FilterSidebar } from './components/SearchFilter';
import Pagination from './components/Pagination';
import FloatingChatBox from './components/FloatingChatBox';

export default function HomePage() {
  const [allAds, setAllAds] = useState([]);
  const [vipAds, setVipAds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  // Adjust per screen size if needed
  const adsPerPage = 12;

  useEffect(() => {
    fetch('http://172.20.10.4:3001/ads')
      .then(res => res.json())
      .then(data => {
        setAllAds(data);
        setVipAds(data.filter(ad => ad.promotion === 'vip'));
      });
  }, []);

  const indexOfLastAd = currentPage * adsPerPage;
  const indexOfFirstAd = indexOfLastAd - adsPerPage;
  const currentAds = allAds.slice(indexOfFirstAd, indexOfLastAd);
  const totalPages = Math.ceil(allAds.length / adsPerPage);

  return (
    <div className="bg-[#0d0d0d] min-h-screen w-full overflow-x-hidden">
      <Navbar />
      <SearchBar className="px-10"/>

      <div className="px-4 sm:px-6 lg:px-10 pt-10 pb-24 max-w-[1600px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-10 md:px-32">
          
          {/* Sidebar */}
          <div className="w-full lg:w-1/5 border-r md:pr-6 border-gray-700">
            <FilterSidebar />
          </div>

          {/* Main Content */}
          <div className="w-full lg:w-4/5">
            <VipAdSlider vipAds={vipAds} />

            <h2 className="text-white text-xl font-semibold mt-12 mb-4 border-t pt-3 border-gray-800">
              💦 Explore All Ads
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-6 w-full">
              {currentAds.map((ad, index) => (
                <AdCard key={index} ad={ad} />
              ))}
            </div>

            {/* Pagination */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </div>
        </div>
      </div>

      <FloatingChatBox/>
    </div>
  );
}

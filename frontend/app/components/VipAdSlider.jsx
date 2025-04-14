'use client';
import Image from 'next/image';
import { useRef, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export default function VipAdSlider({ vipAds = [] }) {
  const scrollRef = useRef();

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
  };

  // Inject dotlottie script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/@dotlottie/player-component@2.7.12/dist/dotlottie-player.mjs';
    script.type = 'module';
    document.body.appendChild(script);
  }, []);

  const getImageUrl = (url) => {
    if (!url) return '/no-image.jpg';
    if (url.startsWith('http')) return url;
    const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace('/api', '');
    return `${baseUrl}/${url}`;
  };

  return (
    <div className="relative px-4">
      {/* Title + animation */}
      <div className="flex items-center gap-2 mb-4">
        <h2 className="text-white text-lg font-semibold">VIP Ads</h2>
        <dotlottie-player
        className="pb-2"
          src="https://lottie.host/c6910638-ab7a-4a70-bbf7-1c7d0102ae2e/7f6l4G6W5j.lottie"
          background="transparent"
          speed="1"
          style={{ width: '50px', height: '50px' }}
          loop
          autoplay
        />
      </div>

      {/* Scroll Left */}
      <button
        onClick={scrollLeft}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-black/70 hover:bg-black text-white p-3 rounded-full shadow-md"
      >
        <FaChevronLeft size={18} />
      </button>

      {/* Slider Container */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto space-x-4 pb-4 scrollbar-hide cursor-grab"
      >
        {vipAds.map((ad, index) => (
          <div
            key={index}
            className="min-w-[160px] h-[240px] flex-shrink-0 rounded-xl border-[3px] border-yellow-500 bg-gradient-to-br from-black to-[#1a1a1a] shadow-lg hover:scale-105 transition overflow-hidden relative"
          >
            {/* Image */}
            <div className="relative w-full h-full">
              <Image
                src={getImageUrl(ad.image)}
                alt={ad.title}
                fill
                className="object-cover w-full h-full"
              />

              {/* Overlay Text */}
              <div className="absolute bottom-0 left-0 w-full px-2 py-2 bg-gradient-to-t from-black via-black/80 to-transparent text-white">
                <p className="text-sm font-semibold">
                  {/* <span className="text-green-400">{ad.username || 'Anonymous'}</span>{' '} */}
                </p>
                <p className="text-xs text-gray-300 line-clamp-1">{ad.title}</p>
                <span className="text-green-500 text-sm italic">is online now</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Scroll Right */}
      <button
        onClick={scrollRight}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-black/70 hover:bg-black text-white p-3 rounded-full shadow-md"
      >
        <FaChevronRight size={18} />
      </button>
    </div>
  );
}

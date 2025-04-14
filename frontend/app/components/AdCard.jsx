'use client';
import Image from 'next/image';
import Link from 'next/link';
import { createSlug } from '@/utils/slugify';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export default function AdCard({ ad }) {
  const isVIP = ad.promotion === 'vip';
  const isSuper = ad.promotion === 'super';

  const cardClasses = `flex w-full rounded-lg overflow-hidden transition duration-300 border relative
    ${
      isVIP
        ? 'bg-gradient-to-br from-black to-[#1a1a1a] border-yellow-500 border-2 shadow-xl hover:scale-[1.01]'
        : isSuper
        ? 'bg-[#1a1a1a] border-pink-500 border-[1.5px] shadow-lg hover:scale-[1.01]'
        : 'bg-[#101010] border-[#222] shadow-sm'
    }`;

  const badgeColor = {
    vip: 'bg-gradient-to-r from-yellow-400 to-red-500',
    super: 'bg-pink-500',
    normal: 'bg-gray-700'
  };

  // ✅ Fix URL using ENV without `/api`
  const getImageUrl = (url) => {
    if (!url) return '/no-image.jpg';
    if (url.startsWith('http')) return url;
    const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace('/api', '');
    return `${baseUrl}/${url}`;
  };

  // ✅ Generate fake view count based on ad type
  const getFakeViews = () => {
    const random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
    if (isVIP) return `${random(90, 250)}k+`;
    if (isSuper) return `${random(30, 90)}k+`;
    return `${random(5, 30)}k+`;
  };

  return (
    <Link
      href={`/ads/${createSlug(ad)}`}
      className="block hover:opacity-95 transition-transform"
    >
      <div className={cardClasses}>
        {/* Image */}
        <div className="relative w-[120px] sm:w-[140px] md:w-[150px] h-[120px] sm:h-[110px] md:h-[120px] flex-shrink-0">
          <Image
            src={getImageUrl(ad.image)}
            alt={ad.title}
            fill
            className="object-cover"
          />
          <span className={`absolute top-1 left-1 text-[10px] px-2 py-[2px] rounded text-white font-semibold ${badgeColor[ad.promotion]}`}>
            {ad.promotion.toUpperCase()}
          </span>
        </div>

        {/* Content */}
        <div className="flex flex-col justify-between p-3 w-full relative">
          {(isVIP || isSuper) && (
            <span className="absolute top-2 right-2 text-[10px] text-green-400 font-medium italic">
              🟢 Last Seen {ad.lastSeen}
            </span>
          )}
          <div className="pr-12">
            <h2 className="text-sm font-semibold text-white">{ad.title}</h2>
            <p className="text-xs text-gray-300 line-clamp-2 mt-1">{ad.description}</p>
          </div>
          <div className="text-[11px] text-gray-400 mt-2 flex flex-wrap gap-x-4">
            <span>📍 {ad.location}</span>
            <span className="font-semibold text-yellow-400">👁 {getFakeViews()} views</span>
            <span className="text-gray-500">⏱️ Uploaded 3h ago</span>
          </div>
        </div>

        {/* Super Ad animation */}
        {isSuper && (
          <div className="absolute bottom-2 right-2 w-[60px] h-[60px]">
            <DotLottieReact
              src="https://lottie.host/fb15e7d4-b448-4c3e-b502-9e8cedd718be/paBWKBkZK3.lottie"
              loop
              autoplay
            />
          </div>
        )}
      </div>
    </Link>
  );
}

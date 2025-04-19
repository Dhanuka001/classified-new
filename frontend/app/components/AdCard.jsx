'use client';
import Image from 'next/image';
import Link from 'next/link';
import { createSlug } from '@/utils/slugify';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { getFakeViewsByType } from '@/utils/fakeViews';

function timeAgo(date) {
  const now = new Date();
  const posted = new Date(date);
  const seconds = Math.floor((now - posted) / 1000);
  if (seconds < 60) return 'Just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
  return posted.toLocaleDateString();
}

export default function AdCard({ ad }) {
  const isVIP = ad.promotion === 'vip';
  const isSuper = ad.promotion === 'super';

  const cardClasses = `flex w-full h-[140px] sm:h-[130px] md:h-[140px] rounded-lg overflow-hidden transition duration-300 border relative
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
    normal: 'bg-gray-700',
  };

  return (
    <Link href={`/ads/${createSlug(ad)}`} className="block hover:opacity-95 transition-transform">
      <div className={cardClasses}>
        {/* Image */}
        <div className="relative w-[120px] sm:w-[140px] md:w-[150px] h-full flex-shrink-0">
          <img
            src={ad.image || '/no-image.jpg'}
            alt={`SriAdz - ${ad.title}`}
            className="object-cover w-full h-full"
          />
          <span
            className={`absolute top-1 left-1 text-[10px] px-2 py-[2px] rounded text-white font-semibold ${badgeColor[ad.promotion]}`}
          >
            {ad.promotion.toUpperCase()}
          </span>
        </div>

        {/* Content */}
        <div className="flex flex-col justify-between py-2 pl-3 pr-4 w-full relative overflow-hidden">
          {(isVIP || isSuper) && (
            <span className="absolute top-2 right-2 text-[10px] text-green-400 font-medium italic">
              🟢 Last Seen {ad.lastSeen}
            </span>
          )}

          {/* Cashback Badge */}
          {ad.cashbackGuarantee && (
            <div className="mb-1 w-fit bg-green-600 text-white text-[10px] sm:text-xs px-2 py-[2px] rounded-br-md font-semibold border border-white/10">
              💸 Cashback Guaranteed
            </div>
          )}

          <h2 className="text-sm font-semibold text-white truncate">{ad.title}</h2>
          <p className="text-xs text-gray-300 line-clamp-2 mt-1">{ad.description}</p>

          <div className="text-[11px] text-gray-400 mt-2 flex flex-wrap gap-x-4">
            <span className="font-semibold text-yellow-400">
              👁 {getFakeViewsByType(ad.promotion)} views
            </span>
            <span className="text-gray-500">⏱️ {timeAgo(ad.createdAt)}</span>
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

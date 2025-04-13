'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  FaWhatsapp,
  FaTelegramPlane,
  FaPhone,
  FaHeart,
  FaArrowLeft,
} from 'react-icons/fa';

// 🔢 Format views to 1.2k+, 5k+, etc.
function formatViews(views) {
  if (views >= 1000000) return (views / 1000000).toFixed(1) + 'M+';
  if (views >= 1000) return (views / 1000).toFixed(1) + 'k+';
  return views + '+';
}

export default function SingleAdPage() {
  const { slug } = useParams();
  const router = useRouter();
  const [ad, setAd] = useState(null);
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const generateParticles = () => {
      const numParticles = 50;
      const newParticles = Array.from({ length: numParticles }, () => ({
        size: Math.random() * 3 + 1,
        left: Math.random() * 100,
        top: Math.random() * 100,
        duration: Math.random() * 10 + 5,
        delay: Math.random() * 5,
      }));
      setParticles(newParticles);
    };
    generateParticles();
  }, []);

  useEffect(() => {
    if (!slug) return;
    const id = slug.split('-').pop();
    fetch(`http://172.20.10.4:3001/ads/${id}`)
      .then((res) => res.json())
      .then((data) => setAd(data))
      .catch((error) => console.error('Failed to fetch ad:', error));
  }, [slug]);

  if (!ad) {
    return <div className="text-white text-center py-20">Loading ad...</div>;
  }

  return (
    <>
      <style jsx global>{`
        .space-bg {
          background: radial-gradient(circle at center, #0d0d0d 0%, #1a1a1a 100%);
          position: relative;
          overflow: hidden;
          min-height: 100vh;
          padding: 24px 16px;
        }

        .particle {
          position: absolute;
          background: radial-gradient(circle, rgba(255, 255, 255, 0.8), transparent 70%);
          border-radius: 50%;
          pointer-events: none;
          animation: twinkleAndMove infinite linear;
          z-index: 0;
        }

        @keyframes twinkleAndMove {
          0% {
            opacity: 0.3;
            transform: translate(0, 0);
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 0.3;
            transform: translate(-50px, -50px);
          }
        }

        .content {
          position: relative;
          z-index: 10;
          max-width: 896px;
          margin: 0 auto;
        }

        .back-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          color: #d1d5db;
        }

        .back-btn:hover {
          color: #ffffff;
        }

        .save-btn {
          background-color: #ff3399;
          color: #ffffff;
          padding: 4px 12px;
          border-radius: 9999px;
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 14px;
        }

        .save-btn:hover {
          background-color: #db2777;
        }

        .warning-box {
          color: #fef9c3;
          font-size: 14px;
          font-weight: 500;
          padding: 12px;
          border-radius: 6px;
          border: 1px solid #854d0e;
          margin-bottom: 20px;
        }

        .notice-box {
          background-color: #1a1a1a;
          border: 1px solid #db2777;
          padding: 16px;
          font-size: 14px;
          color: #e5e7eb;
          border-radius: 6px;
          margin-bottom: 24px;
        }

        .notice-title {
          color: #facc15;
          font-weight: 700;
          margin-bottom: 8px;
          font-size: 15px;
        }

        .notice-text-pink {
          color: #f9a8d4;
          font-weight: 500;
          margin-bottom: 4px;
        }

        .notice-text-blue {
          color: #93c5fd;
          font-weight: 500;
        }

        .notice-text-italic {
          color: #9ca3af;
          font-style: italic;
          margin-top: 12px;
        }

        .ad-title {
          font-size: 24px;
          font-weight: 800;
          color: #ff3399;
          margin-bottom: 16px;
        }

        @media (min-width: 640px) {
          .ad-title {
            font-size: 30px;
          }
        }

        .ad-image-container {
          position: relative;
          width: 100%;
          height: 360px; /* Increased from 260px */
          overflow: hidden;
          border-radius: 8px;
          margin-bottom: 24px;
        }

        @media (min-width: 640px) {
          .ad-image-container {
            height: 500px; /* Increased from 400px */
          }
        }

        .ad-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 8px;
        }

        .promotion-badge {
          position: absolute;
          top: 12px;
          right: 12px;
          background: linear-gradient(to right, #facc15, #f59e0b);
          color: black;
          font-weight: 700;
          padding: 4px 10px;
          border-radius: 20px;
          font-size: 12px;
          text-transform: uppercase;
        }

        .cashback-badge {
          display: inline-block;
          margin-top: -8px;
          margin-bottom: 20px;
          background-color: #16a34a;
          color: white;
          font-size: 13px;
          font-weight: 600;
          padding: 6px 12px;
          border-radius: 999px;
        }

        .info-summary {
          font-size: 14px;
          color: #9ca3af;
          margin-bottom: 12px;
        }

        .view-count {
          font-weight: bold;
          color: #ff3399;
          font-size: 14px;
        }

        .contact-buttons {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-bottom: 24px;
        }

        .contact-btn {
          padding: 8px 16px;
          border-radius: 6px;
          color: #ffffff;
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
        }

        .phone-btn {
          background-color: #db2777;
        }

        .whatsapp-btn {
          background-color: #22c55e;
        }

        .telegram-btn {
          background-color: #3b82f6;
        }

        .description-box {
          background-color: #121212;
          border: 1px solid #333333;
          border-radius: 6px;
          padding: 16px;
          font-size: 15px;
          line-height: 1.625;
          color: #f3f4f6;
        }

        .description-title {
          color: #ff3399;
          font-weight: 600;
          margin-bottom: 8px;
        }
      `}</style>

      <div className="space-bg">
        {particles.map((particle, index) => (
          <div
            key={index}
            className="particle"
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              animationDuration: `${particle.duration}s`,
              animationDelay: `${particle.delay}s`,
            }}
          />
        ))}

        <div className="content">
          <div className="flex justify-between items-center mb-4">
            <button className="back-btn" onClick={() => router.back()}>
              <FaArrowLeft size={14} /> Back
            </button>
            <button className="save-btn">
              <FaHeart /> Save
            </button>
          </div>

          <div className="warning-box">
            💡 සිතන්න: Cashback Guarantee ඇත – Rs.3000 ට අඩු ගෙවීම් සඳහා පමණි. සමහර photos සැබෑය, සමහරක් ව්‍යාජ විය හැක. ඔබේ ආරක්ෂාව සඳහා සැලකිලිමත් වන්න!
          </div>

          <h1 className="ad-title">{ad.title}</h1>

          {ad.cashback && (
            <div className="cashback-badge">✅ Cashback Guaranteed</div>
          )}

          <div className="ad-image-container">
            <img src={ad.image} alt={ad.title} className="ad-image" />
            {ad.promotion && (
              <div className="promotion-badge">{ad.promotion.toUpperCase()}</div>
            )}
          </div>

          <div className="info-summary">
            📍 {ad.location} •{' '}
            <span className="view-count">👁 {formatViews(ad.views)} views</span> • ⏱️ Uploaded 3h ago
          </div>

          <div className="contact-buttons">
            {ad.phone && (
              <a href={`tel:${ad.phone}`} className="contact-btn phone-btn">
                <FaPhone /> Call
              </a>
            )}
            {ad.whatsapp && (
              <a
                href={`https://wa.me/${ad.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-btn whatsapp-btn"
              >
                <FaWhatsapp /> WhatsApp
              </a>
            )}
            {ad.telegram && (
              <a
                href={`https://t.me/${ad.telegram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-btn telegram-btn"
              >
                <FaTelegramPlane /> Telegram
              </a>
            )}
          </div>

          <div className="description-box">
            <h2 className="description-title">💋 Description</h2>
            {ad.description}
          </div>

          <div className="notice-box">
            <div className="notice-title">
              💖 Trust Notice by <span style={{ color: '#ff3399' }}>SriAdz</span>
            </div>
            <p className="notice-text-pink">
              💸 Cashback Guarantee සහිත දැන්වීම් සදහා පමණක් SriAdz වගකීම් සපයයි. එවැනි Badge එකක් නොමැති දැන්වීම් සදහා ඔබගේ පෞද්ගලික වගකීම යටතේ ක්‍රියා කරන්න.
            </p>
            <p className="notice-text-blue">
              📢 Cashback Guarantee உள்ள விளம்பரங்களுக்கு மட்டும் SriAdz பொறுப்பாக இருக்கும். மற்ற அனைத்தும் உங்களது பொறுப்பு.
            </p>
            <p className="notice-text-italic">
              🔐 Your safety is our priority. Always verify before making any payments.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
'use client';
import Image from "next/image";
import Head from "next/head";
import { FaWhatsapp } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const ads = [
    {
      id: 1,
      title: "💋 සැබෑ ලස්සනම ලයිව් කැම් කෙල්ල - ඔන්ලයින් දැන්ම! 💯",
      description: "මෙන්න ලස්සනම ගෑනු ලමයෙක් ලයිව් කැම් එකකින්! 💖 වයස 18ට වැඩි අයට විතරයි. සැබෑ පින්තූර එක්ක, බොරු නෑ! එන්න එකතු වෙන්න. ❤️",
      image: "/girl1.jpg",
      whatsapp: "94764745564",
    },
    {
      id: 2,
      title: "🔥 නිශාගේ ලයිව් කැම් එක - මුහුණත් එක්ක! 💖",
      description: "මම නිශා, වයස 25යි. 💋 WhatsApp හරහා ලයිව් කැම් එකක් කරන්න ආසද? එන්න මට මැසේජ් එකක් දාන්න! 💕",
      image: "/girl2.jpg",
      whatsapp: "94788540724",
    },
    {
      id: 3,
      title: "🌟 සිංහල කැම් රැජින - ඕනෑම වෙලාවක ලයිව්! ❤️",
      description: "ලස්සනම සිංහල ගෑනු ලමයෙක් එක්ක ලයිව් එකකට එන්න! 💃 ඕනෑම වෙලාවක ලේස්තියි. දැන්ම මට එකතු වෙන්න! 💖",
      image: "/girl3.jpg",
      whatsapp: "https://wa.me/94753571036",
    },
    {
      id: 4,
      title: "💃 ලංකාවේ ලස්සනම කැම් ගෑනු ලමයා - දැන් ලයිව්! 🔥",
      description: "මම දැන් ඔන්ලයින්! 💋 ලංකාවේ හොට්ම ලයිව් කැම් එකක් බලන්න එන්න. අමතක නොවෙන අත්දැකීමක් ලබාගන්න! 💕",
      image: "/girl4.jpg",
      whatsapp: "94728308441",
    },
    {
      id: 5,
      title: "💖 සිංහල ලස්සනාවියගේ 24/7 ලයිව් කැම් එක! 🔥",
      description: "රෝස පාට ලිංගරි එකකින්, හොට්ම ඩාන්ස් එකක් එක්ක! 💃 සිංහල ලයිව් කැම් ගෑනු ලමයෙක් එක්ක WhatsApp හරහා එන්න! ❤️",
      image: "/girl5.jpg",
      whatsapp: "94741615966",
    },
    {
      id: 6,
      title: "🌸 සිංහල හොට් ගෑනු ලමයෙක් - 24/7 ලයිව්! 💋",
      description: "රෝස පාට ලිංගරි එකකින් ලස්සන ඩාන්ස් එකක්! 💃 සිංහල ලයිව් කැම් එකක් WhatsApp හරහා දැන්ම බලන්න! 💕",
      image: "/girl6.jpg",
      whatsapp: "94752151491",
    },
  ];

export default function CamGirlsPage() {
  const [pulse, setPulse] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse((prev) => !prev);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Head>
        <title>ලංකාවේ Live Cam Girls | Sinhala Whatsapp Cam Girls - SriAdz</title>
        <meta
          name="description"
          content="මැකන් මෙතන ඉන්නෙ ලංකාවේ හොඳම cam girlsලා. අපි ගාරන්ටී කරනවා service එක. දැන්ම WhatsApp එකට msg එකක් දාලා බලන්න! 🔥"
        />
        <meta
          name="keywords"
          content="sl cam girls, whatsapp cam girls, hela ads cam girls, live cam srilanka, sinhala cam girl, cam girl lanka, sri lanka cam service, hot sinhala girl whatsapp, live cam show lanka"
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.sriadz.com/cam-girls" />
      </Head>

      <main className="min-h-screen bg-black text-white py-12 px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-pink-500 mb-6 tracking-wide">
          ලංකාවේ හොදම Whatsapp Cam Girls-SriAdz
        </h1>
        <p className="text-center text-lg text-gray-300 mb-10 max-w-3xl mx-auto">
          මෙන්න ඔබ උනන්දුවෙන් බලා සිටි හොඳම sinhala WhatsApp cam girlsලා! 100% guaranteed service. දැන්ම msg එකක් දාන්න ❤️
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {ads.map((ad) => (
            <div
              key={ad.id}
              className="bg-gray-900 rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition duration-300"
            >
              <Image
                src={ad.image}
                alt={ad.title}
                width={400}
                height={300}
                className="w-full h-60 object-cover"
              />
              <div className="p-5">
                <h2 className="text-2xl text-pink-500 font-semibold mb-2">{ad.title}</h2>
                <p className="text-gray-300 mb-4">{ad.description}</p>
                <a
                  href={`https://wa.me/${ad.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full transition-all"
                >
                  <FaWhatsapp className="mr-2 text-lg" />
                  WhatsApp කරන්න
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
        <button
            onClick={() => router.push("/")}
            className={`mt-10 px-8 py-3 rounded-full text-lg font-bold text-white bg-pink-600 hover:bg-pink-700 transition-all shadow-xl ${
              pulse ? "animate-pulse" : ""
            }`}
          >
            තවත් දැන්වීම් බලන්න 🔥
          </button>
        </div>
      </main>
    </>
  );
}

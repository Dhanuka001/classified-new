import { FaHeart } from 'react-icons/fa';

export function SearchBar() {
  return (
    <div className="flex justify-center  px-10">
      <div className="flex w-full max-w-xl">
        <input
          type="text"
          placeholder="Search by title or location..."
          className="flex-1 px-4 py-2 rounded-l-md bg-[#1a1a1a] text-white border border-[#ff3399] outline-none"
        />
        <button className="px-4 py-2 bg-[#ff3399] text-white font-semibold rounded-r-md hover:bg-pink-700 transition">
          Search
        </button>
      </div>
    </div>
  );
}

export function FilterSidebar() {
  const quickLinks = [
    'Girls Personal',
    'Live Cam',
    'Spa',
    'Boys Personal',
    'Shemale',
    'Rent',
    'Sale',
    'Marriage Proposal',
    'Toys & Accessories',
    'Rooms',
    'Lanka Ad',
    'Lanka Job\'s'
  ];

  return (
    <aside className="hidden lg:block w-full lg:w-[220px] bg-[#1a1a1a] p-4 rounded-md border border-pink-500 h-fit sticky top-6">
      {/* Location Filter */}
      <h3 className="text-white text-lg font-semibold mb-4">Filter</h3>
      <div className="mb-6">
        <label className="text-white text-sm block mb-1">Location</label>
        <select className="w-full bg-black text-white border border-pink-500 rounded-md px-3 py-2">
          <option value="">All</option>
          <option value="Colombo">Colombo</option>
          <option value="Kandy">Kandy</option>
          <option value="Galle">Galle</option>
        </select>
      </div>

      {/* Quick Links */}
      <div>
        <h3 className="text-white text-lg font-semibold mb-3">Quick Links</h3>
        <ul className="space-y-2">
          {quickLinks.map((link, index) => (
            <li key={index}>
              <a
                href="#"
                className="flex items-center gap-2 text-sm text-pink-400 hover:text-white transition"
              >
                <FaHeart className="text-[#ff3399] text-xs" />
                {link}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

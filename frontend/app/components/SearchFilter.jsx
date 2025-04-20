import { FaHeart, FaTimes, FaTimesCircle } from 'react-icons/fa';

export function SearchBar({ searchQuery, setSearchQuery, onSearch, onClear }) {
  return (
    <div className="flex justify-center px-10">
      <div className="flex w-full max-w-xl relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') onSearch();
          }}
          placeholder="Search by title or location..."
          className="flex-1 px-4 py-2 rounded-l-md bg-[#1a1a1a] text-white border border-[#ff3399] outline-none"
        />
        {searchQuery && (
          <button
            onClick={onClear}
            className="absolute right-20 top-1/2 transform -translate-y-1/2 p-2 text-gray-400 hover:text-white"
          >
            <FaTimesCircle size={18} />
          </button>
        )}
        <button
          onClick={onSearch}
          className="px-4 py-2 bg-[#ff3399] text-white font-semibold rounded-r-md hover:bg-pink-700 transition"
        >
          Search
        </button>
      </div>
    </div>
  );
}

export function FilterSidebar({ onSelectCategory, showSidebar, setShowSidebar }) {
  const quickLinks = [
    { name: 'Girls Personal', slug: 'girls-personal' },
    { name: 'Live Cam', slug: 'live-cam' },
    { name: 'Spa', slug: 'spa' },
    { name: 'Boys Personal', slug: 'boys-personal' },
    { name: 'Shemale', slug: 'shemale' },
    { name: 'Rent', slug: 'rent' },
    { name: 'Sale', slug: 'sale' },
    { name: 'Marriage Proposal', slug: 'marriage-proposal' },
    { name: 'Toys & Accessories', slug: 'toys-accessories' },
    { name: 'Rooms', slug: 'rooms' },
    { name: 'Jobs', slug: 'jobs' },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {showSidebar && (
        <div className="fixed inset-0 bg-black/70 z-40 lg:hidden" onClick={() => setShowSidebar(false)} />
      )}

      <aside className={`fixed top-0 left-0 w-[260px] h-full bg-[#1a1a1a] p-4 border-r border-pink-500 z-50 transform transition-transform lg:relative lg:translate-x-0 ${showSidebar ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-white text-lg font-semibold mt-32 lg:mt-0">Quick Links</h3>
          <button onClick={() => setShowSidebar(false)} className="lg:hidden text-white">
            <FaTimes />
          </button>
        </div>
        <ul className="space-y-2">
          {quickLinks.map((link, index) => (
            <li key={index}>
              <button
                onClick={() => {
                  onSelectCategory(link.slug);
                  setShowSidebar(false);
                }}
                className="flex items-center gap-2 text-sm text-pink-400 hover:text-white transition"
              >
                <FaHeart className="text-[#ff3399]" />
                {link.name}
              </button>
            </li>
          ))}
        </ul>
      </aside>
    </>
  );
}
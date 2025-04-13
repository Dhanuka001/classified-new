import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const getVisiblePages = () => {
    const pages = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }

    return pages;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="mt-10 flex justify-center items-center gap-1 flex-wrap text-sm sm:text-base">
      {/* Prev */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-3 py-2 rounded-md flex items-center gap-1 ${
          currentPage === 1
            ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
            : 'bg-[#1a1a1a] text-white border border-gray-600 hover:bg-[#ff3399] hover:text-white transition'
        }`}
      >
        <FaChevronLeft size={14} />
        Prev
      </button>

      {/* Page Numbers */}
      {visiblePages.map((page, index) =>
        page === '...' ? (
          <span key={index} className="px-2 text-gray-500">
            ...
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-3 py-2 rounded-md font-semibold ${
              currentPage === page
                ? 'bg-[#ff3399] text-white'
                : 'bg-[#1a1a1a] text-white border border-gray-600 hover:bg-[#ff3399] hover:text-white transition'
            }`}
          >
            {page}
          </button>
        )
      )}

      {/* Next */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-3 py-2 rounded-md flex items-center gap-1 ${
          currentPage === totalPages
            ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
            : 'bg-[#1a1a1a] text-white border border-gray-600 hover:bg-[#ff3399] hover:text-white transition'
        }`}
      >
        Next
        <FaChevronRight size={14} />
      </button>
    </div>
  );
}

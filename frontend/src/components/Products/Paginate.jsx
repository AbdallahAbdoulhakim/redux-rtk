import PaginatePage from "./paginatePage";

const Paginate = ({
  pagingCounter,
  page,
  hasNextPage,
  hasPrevPage,
  prevPage,
  nextPage,
  limit,
  postCount,
  pageCount,
}) => {
  const determinatePages = () => {
    let calc_pages = [];

    if (pageCount <= 7) {
      calc_pages = Array.from({ length: pageCount }, (_, i) => i + 1);
    } else if (pageCount > 7 && (page <= 3 || page >= pageCount - 2)) {
      calc_pages = [1, 2, 3, "...", pageCount - 2, pageCount - 1, pageCount];
    } else {
      calc_pages = [1, "...", page - 1, page, page + 1, "...", pageCount];
    }

    return calc_pages;
  };

  const pages = determinatePages();

  return (
    <nav
      className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4"
      aria-label="Table navigation"
    >
      <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
        Showing{" "}
        <span className="font-semibold text-gray-900 dark:text-white">
          {pagingCounter}-{page === pageCount ? postCount : limit * page}{" "}
        </span>
        of{" "}
        <span className="font-semibold text-gray-900 dark:text-white">
          {postCount}
        </span>
      </span>
      <ul className="inline-flex items-stretch -space-x-px">
        <li>
          <button className="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
            <span className="sr-only">Previous</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </li>
        {pages.map((curr, index) => (
          <PaginatePage
            key={index}
            pageNumber={String(curr)}
            isActive={curr === page}
          />
        ))}

        <li>
          <button className="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
            <span className="sr-only">Next</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </li>
      </ul>
    </nav>
  );
};
export default Paginate;

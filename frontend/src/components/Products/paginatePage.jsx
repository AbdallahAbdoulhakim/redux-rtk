const PaginatePage = ({ pageNumber, isActive }) => {
  return (
    <li>
      <button
        aria-current={isActive ? "page" : "false"}
        className={`flex items-center justify-center text-sm py-2 px-3 leading-tight dark:border-gray-700 border ${
          isActive
            ? "z-10  text-primary-600 bg-primary-50 border-primary-300 hover:bg-primary-100 hover:text-primary-700 dark:bg-gray-700 dark:text-white"
            : "text-gray-500 bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-700 dark:hover:text-white"
        }`}
      >
        {pageNumber}
      </button>
    </li>
  );
};
export default PaginatePage;

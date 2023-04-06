import React, { useEffect, useState } from "react";

type UserManagerProps = {};

function UserManager({}: UserManagerProps) {
  const [data, setData] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(5);

  useEffect(() => {
    const fetchData = async () => {
      // Mock API endpoint
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      const data = await response.json();
      setData(data);
    };
    fetchData();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const nextPage = () => {
    if (currentPage < Math.ceil(data.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Table</h1>
      <div className="shadow overflow-hidden rounded border-b border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                ID
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Title
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Body
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentItems.map((item) => (
              <tr key={item.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {item.id}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {item.title}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{item.body}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-4">
        <nav
          className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
          aria-label="Pagination"
        >
          <button
            className={`${
              currentPage === 1
                ? "bg-white border-gray-300 text-gray-500"
                : "bg-blue-500 text-white hover:bg-blue-50 "
            } border-r border-gray-300 px-4 py-2 text-sm font-medium`}
            onClick={prevPage}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {Array.from({ length: Math.ceil(data.length / itemsPerPage) }).map(
            (page, index) => (
              <a
                key={index}
                href="#"
                className={`${
                  currentPage === index + 1
                    ? "bg-blue-500 text-white"
                    : "bg-white border-gray-300 text-gray-500"
                } hover:bg-blue-50 border-r border-gray-300 px-4 py-2 text-sm font-medium`}
                onClick={() => paginate(index + 1)}
              >
                {index + 1}
              </a>
            )
          )}
          <button
            className={`${
              currentPage > Math.ceil(data.length / itemsPerPage)
                ? "bg-white border-gray-300 text-gray-500"
                : "bg-blue-500 text-white hover:bg-blue-50"
            } border-r border-gray-300 px-4 py-2 text-sm font-medium`}
            onClick={nextPage}
            disabled={currentPage > Math.ceil(data.length / itemsPerPage)}
          >
            Next
          </button>
        </nav>
      </div>
    </div>
  );
}

export default UserManager;

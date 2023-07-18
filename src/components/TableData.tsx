"use client"

import { TableDataProps } from "@/types/types";
import { useState } from "react";
import {BsArrowUp} from 'react-icons/bs'
import TableCell from "./TableCell";
import { useTableData } from "@/helpers/useTableData";

function TableData({ header, caption, rows, sortable = false, pagination = false }: TableDataProps) {
  const [perPage, setPerPage] = useState<number>(5);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const {
    sortedHeader,
    currentPage,
    pageCount,
    currentPageData,
    setSortedHeader,
    setCurrentPage,
  } = useTableData(rows, sortable, pagination, perPage, searchQuery);

  function handleHeaderClick(column: string) {
    if (!sortable) return;

    const isColumnString = typeof currentPageData[0][column] === 'string';
    if (!isColumnString) return;

    const sortOrder = sortedHeader[column] ? false : true;
    setSortedHeader({ [column]: sortOrder });
  }

  function handleNextPage() {
    if (currentPage >= pageCount) return;
    setCurrentPage((prevPage) => prevPage + 1);
  }

  function handlePrevPage() {
    if (currentPage <= 1) return;
    setCurrentPage((prevPage) => prevPage - 1);
  }

  function handlePerPageChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setPerPage(Number(event.target.value));
    setCurrentPage(1);
  }

  function handleSearchChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  }

  return (
    <div className="flex items-center justify-center min-h-screen min-w-screen  flex-col">
      <div className="w-full flex justify-between content-center">
        {caption && <div className="text-xl font-bold mb-4">{caption}</div>}
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search..."
          className="border border-gray-300 px-2 py-1 rounded mb-4"
        />
      </div>
      <table className="border-collapse border border-gray-300 table-fixed rounded-lg">
        <thead>
          <tr className="bg-gray-200">
            {header.map((column) => (
              <th
                key={column}
                className="py-4 px-4 uppercase text-slate-500 text-left"
                onClick={() => handleHeaderClick(column)}
              >
                {column} {sortable && sortedHeader[column] ? <BsArrowUp className="inline mx-2" /> : ""}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="h-11 bg-white">
          {currentPageData.map((row, index) => (
            <tr
              key={row.purchase_id}
              className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
            >
              {header.map((column) => (
                <TableCell key={column} column={column} value={row[column]} />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {pagination && (
        <div className="w-full">
          <button className="border-black-300 bg-slate-300 text-black px-4 py-2 m-2 rounded hover:bg-slate-600 hover:text-white" onClick={handlePrevPage}>Prev</button>
          <button className="border-black-300 bg-slate-300 text-black px-4 py-2 m-2 rounded hover:bg-slate-600 hover:text-white" onClick={handleNextPage}>Next</button>

          <select value={perPage} onChange={handlePerPageChange} className="border-black-300 bg-slate-300 text-black px-4 py-2 m-2 rounded">
            <option className="bg-white rounded" value={5}>5 per page</option>
            <option className="bg-white rounded" value={10}>10 per page</option>
            <option className="bg-white rounded" value={20}>20 per page</option>
            <option className="bg-white rounded" value={30}>30 per page</option>
            <option className="bg-white rounded" value={50}>50 per page</option>
          </select>
        </div>
      )}
    </div>
  );
}

export default TableData;
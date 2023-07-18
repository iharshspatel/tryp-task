import { SortedHeaderType, TableRow } from "@/types/types";
import { useState } from "react";

export function useTableData(
    rows: TableRow[],
    sortable: boolean,
    pagination: boolean,
    perPage: number,
    searchQuery: string
  ) {
    console.log("use table data is called")
    const [sortedHeader, setSortedHeader] = useState<SortedHeaderType>({});
    const [currentPage, setCurrentPage] = useState<number>(1);
  
    const filteredData = rows.filter((row) =>
      Object.values(row).some((value) =>
        String(value).toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  
    const sortedData = filteredData.slice().sort((a, b) => {
      if (!sortable) return 0;
  
      const sortProperty = Object.keys(sortedHeader)[0];
      const sortOrder = sortedHeader[sortProperty] ? 1 : -1;
  
      const valueA = String(a[sortProperty]).toLowerCase();
      const valueB = String(b[sortProperty]).toLowerCase();
  
      if (valueA < valueB) {
        return -1 * sortOrder;
      } else if (valueA > valueB) {
        return 1 * sortOrder;
      } else {
        return 0;
      }
    });
  
    const pageCount = pagination ? Math.ceil(filteredData.length / perPage) : 1;
    const currentPageData = pagination
      ? sortedData.slice((currentPage - 1) * perPage, currentPage * perPage)
      : sortedData;
  
    return {
      sortedHeader,
      currentPage,
      pageCount,
      currentPageData,
      setSortedHeader,
      setCurrentPage,
    };
  }
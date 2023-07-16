"use client"

import { sortedHeaderType, tableRow } from "@/types/tableRowTypes";
import { useEffect, useState } from "react";
import {BsArrowDownUp} from 'react-icons/bs'

export default function TableData({ header, caption, rows, sortable=false }:TableDataProps) {

  const [data, setData] = useState<tableRow[]>(rows);
  const [sortedHeader , setSortedHeader] = useState<sortedHeaderType>({});
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [perPageRow, setPerPageRow] = useState<number>(10);
  const [currentData, setCurrentData] = useState<tableRow[]>([])

  function headerClickHandler(column:string){
    if(sortable === false) return;

    if(sortedHeader[column]){
      setSortedHeader({...sortedHeader, [column]:false})
      sortData(column,false);
    }
    else{
      sortData(column,true);
      setSortedHeader({...sortedHeader, [column]:true})
    }
  }
  function sortData(property: string, isAscending:Boolean=true){
    let newData = [...data]; 
    newData = newData.sort((a, b) => {

      if(typeof a[property] !== "string" || typeof b[property] !== "string" ){
        return 0;
      }

      const valueA = a[property].toLowerCase();
      const valueB = b[property].toLowerCase();

      if(isAscending){
        if (valueA < valueB) {
          return -1;
        } else if (valueA > valueB) {
          return 1;
        } else {
          return 0;
        }
      }
      else{
        if (valueA < valueB) {
          return 1;
        } else if (valueA > valueB) {
          return -1;
        } else {
          return 0;
        }
      }

    });
    setData(newData)
  }

  function nextPageHandler(){
    setCurrentPage(currentPage+1);
  }

  function prevPageHandler(){
    if(currentPage <= 1) return;
    setCurrentPage(currentPage-1)
  }

  function handlePerPageChange(e:any){
    setPerPageRow(e.target.value)
  }

  useEffect(() => {
    const startIndex = (currentPage - 1) * perPageRow;
    const endIndex = startIndex + perPageRow;
    setCurrentData(data.slice(startIndex, endIndex));
  }, [currentPage, data, perPageRow]);

  return (
    <div className="flex items-center justify-center min-h-screen min-w-screen  flex-col">
      <table className="border-collapse border border-gray-300 table-fixed">
        <caption className="text-xl font-bold mb-4">{caption}</caption>
        <thead>
          <tr className="bg-gray-200">
            {header.map((column) => (
              <th key={column} className="py-2 px-4" onClick={()=>{headerClickHandler(column)}}>
                {column} {sortable ? <BsArrowDownUp className="inline mx-2"/> : ""}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {currentData.map((row, index) => (
            <tr
              key={row.purchase_id}
              className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
            >
              {header.map((column) => (
                <td
                  key={column}
                  className="py-2 px-4 border-b-2 border-gray-300"
                >
                  {row[column]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="w-full">
        <button className="border-black-300 bg-slate-300 text-black px-4 py-2 m-2 rounded hover:bg-slate-600 hover:text-white" onClick={prevPageHandler}>Prev</button>
        <button className="border-black-300 bg-slate-300 text-black px-4 py-2 m-2 rounded hover:bg-slate-600 hover:text-white" onClick={nextPageHandler}>Next</button>
        
        <select value={perPageRow} onChange={handlePerPageChange} className="border-black-300 bg-slate-300 text-black px-4 py-2 m-2 rounded">
          <option className="bg-white rounded" value={10}>10 per page</option>
          <option className="bg-white rounded" value={20}>20 per page</option>
          <option className="bg-white rounded" value={30}>30 per page</option>
          <option className="bg-white rounded" value={50}>50 per page</option>
        </select>
      </div>
    </div>
  );
}

type TableDataProps = {
  header:string[],
  caption:string,
  rows:tableRow[],
  sortable?:boolean
}
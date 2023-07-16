"use client"

import { sortedHeaderType, tableRow } from "@/types/tableRowTypes";
import { useState } from "react";
import {BsArrowDownUp} from 'react-icons/bs'

export default function TableData({ header, caption, rows, sortable=false }:TableDataProps) {
  const [data, setData] = useState(rows);
  const [sortedHeader , setSortedHeader] = useState<sortedHeaderType>({});

  function headerClickHandler(column:string){
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
    let newData = data.sort((a, b) => {

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

  return (
    <div className="flex items-center justify-center min-h-screen min-w-screen">
      <table className="border-collapse border border-gray-300 table-fixed">
        <caption className="text-xl font-bold mb-4">{caption}</caption>
        <thead>
          <tr className="bg-gray-200">
            {header.map((column) => (
              <th key={column} className="py-2 px-4" onClick={()=>{headerClickHandler(column)}}>
                {column} <BsArrowDownUp className="inline mx-2"/>
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {rows.map((row, index) => (
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
    </div>
  );
}

type TableDataProps = {
  header:string[],
  caption:string,
  rows:tableRow[],
  sortable?:boolean
}

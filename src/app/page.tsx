"use client"

import { useEffect, useState } from 'react';
import TableData from "@/components/TableData";
import axios from "axios";
export default function Home() {

  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [rows, setRows] = useState([]);

  async function getRows(){
    try{
      setIsLoading(true)
      const res = await axios.get("/api/bookings");
      console.log(res.data.rows)
      setRows(res.data.rows)

    }
    catch(e:any){
      console.log(e.message);
      setHasError(true);
    }
    finally{
      setIsLoading(false)
    }

  }

  useEffect(() => {
    getRows()
  }, [])
  const headers = ["timestamp" , "purchase_id", "mail", "name", "source", "status", "select"]
  const caption = "The Static Table"

  if(hasError) return <div>Error</div>

  if(isLoading) return <div>Loading</div>
  return (
    <div className='flex items-center justify-center min-h-screen min-w-screen'>
      <TableData
       header={headers}
       caption={caption}
       rows={rows}
       sortable={true}
       pagination={true}/>
    </div>
    )
}

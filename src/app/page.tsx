import TableData from "@/components/TableData";
import { rowsData } from '@/constants/data'
export default function Home() {
  const headers = ["timestamp" , "purchase_id", "mail", "name", "source", "status", "select"]
  const caption = "The Static Table"
  return (
    <div className='flex items-center justify-center min-h-screen min-w-screen'>
      <TableData
       header={headers}
       caption={caption}
       rows={rowsData}
       sortable={true}/>
    </div>
    )
}

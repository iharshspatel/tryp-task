import { ObjectType } from "typescript"

interface tableData {
  timestamp:number,
  purchase_id:number,
  name:string,
  mail:string,
  source:string,
  status: 'paid' | 'waiting' | 'failed',
  select:boolean
}

export default function Home() {
  const header = ["timestamp" , "purchase_id", "mail", "name", "source", "status", "select"]
  const caption = "The Static Table"
  const data: tableData[] = [
    {
      "timestamp":35,
      "purchase_id":1234,
      "mail":"abc@gmail.com",
      "name":"abc",
      "source":"",
      "status":"failed",
      "select":true
    },
    {
      "timestamp":36,
      "purchase_id":1235,
      "mail":"harsh@gmail.com",
      "name":"harsh",
      "source":"",
      "status":"paid",
      "select":true
    },
    {
      "timestamp":37,
      "purchase_id":1236,
      "mail":"def@gmail.com",
      "name":"def",
      "source":"",
      "status":"paid",
      "select":true
    },
    {
      "timestamp":38,
      "purchase_id":1237,
      "mail":"gih@gmail.com",
      "name":"gih",
      "source":"",
      "status":"paid",
      "select":true
    },
    {
      "timestamp":39,
      "purchase_id":1238,
      "mail":"jkl@gmail.com",
      "name":"jkl",
      "source":"",
      "status":"waiting",
      "select":true
    }

  ]
  return (
    <div className='flex items-center justify-center min-h-screen min-w-screen'>
      <table>
        <thead>
          <tr>
            {
              header.map((column)=>(
                <th key={column}>
                  {column}
                </th>
              ))
            }
          </tr>
        </thead>

        <tbody>
          {
            data.map((row)=>(
              <tr key={row.purchase_id}>
                {
                  header.map((column)=>(
                    <td key={column}>{row[column]}</td>
                  ))
                }
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
    )
}

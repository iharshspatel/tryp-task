export default function TableData({ header, caption, rows }) {
  return (
    <div className="flex items-center justify-center min-h-screen min-w-screen">
      <table className="border-collapse border border-gray-300 table-fixed">
        <caption className="text-xl font-bold mb-4">{caption}</caption>
        <thead>
          <tr className="bg-gray-200">
            {header.map((column) => (
              <th key={column} className="py-2 px-4">
                {column}
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

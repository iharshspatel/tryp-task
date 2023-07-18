import { TableCellProps } from "@/types/types";

function TableCell({ column, value }: TableCellProps) {
if (column === 'select') {
    return (
    <td className="py-4 px-4 border-b-1 border-gray-300">
        <button className="border-black-300 bg-slate-300 text-black px-4 py-2 m-2 rounded hover:bg-slate-600 hover:text-white">Select</button>
    </td>
    );
} else if (column === 'status') {
    return (
    <td className="py-4 px-4 border-b-1 border-gray-300">
        <p className={`border rounded-full text-center capitalize text-sm ${value === 'success' ? 'bg-green-400 text-green-900' : 'bg-red-400 text-red-900'}`}>{value}</p>
    </td>
    );
} else {
    return (
    <td className="py-4 px-4 border-b-1 border-gray-300">
        {value}
    </td>
    );
}
}

export default TableCell
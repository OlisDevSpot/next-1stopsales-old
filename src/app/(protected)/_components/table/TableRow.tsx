import { cn } from "@/lib/utils";

type Customer = {
  id: number;
  date: string;
  name: string;
  address: string;
  city: string;
  zipCode: string;
};

interface TableRowProps {
  tableColumns: { accessorKey: string; label: string; className: string }[];
  data: Customer;
}

export default function TableRow({ tableColumns, data }: TableRowProps) {
  return (
    <tr>
      {tableColumns.map((column) => {
        const header = column.accessorKey;
        return (
          <td key={column.accessorKey} className={cn("py-2", column.className)}>
            {data[header as keyof Customer]}
          </td>
        );
      })}
    </tr>
  );
}

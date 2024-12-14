import { tableHeaders } from "../../_data/table-headers";
import { cn } from "@/lib/utils";
import TableRow from "./TableRow";

const mockData = Array.from({ length: 100 }, (_, i) => i + 1).map(
  (id: number) => ({
    id,
    date: new Date().toDateString(),
    name: "John Doe",
    address: "123 Main St",
    city: "Encino",
    zipCode: "10001",
  })
);

export default function CustomersTable({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "bg-neutral-100 rounded-lg h-full overflow-y-scroll",
        className
      )}
    >
      <table className="w-full text-center">
        <thead className="sticky top-0 bg-neutral-100">
          <tr className="border-b">
            {tableHeaders.map((header) => (
              <th
                key={header.accessorKey}
                className={cn("p-4", header.className)}
              >
                {header.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {mockData.map((customer) => (
            <TableRow
              key={customer.id}
              tableColumns={tableHeaders}
              data={customer}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

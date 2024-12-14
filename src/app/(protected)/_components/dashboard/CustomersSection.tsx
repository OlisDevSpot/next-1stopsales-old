import CustomerForm from "./CustomerForm";
import CustomerTable from "../table/CustomersTable";

export default function CustomersSection() {
  return (
    <div className="grid grid-cols-3 rounded-lg gap-4 min-h-[calc(100%-160px-16px)]">
      <CustomerTable className="col-span-2" />
      <CustomerForm className="col-span-1" />
    </div>
  );
}

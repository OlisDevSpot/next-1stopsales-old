import CustomerForm from "./CustomerForm";
import CustomerList from "./CustomerList";

export default function CustomersSection() {
  return (
    <div className="flex-grow grid grid-cols-3 h-full rounded-lg gap-4">
      <CustomerList className="col-span-2" />
      <CustomerForm className="col-span-1" />
    </div>
  );
}

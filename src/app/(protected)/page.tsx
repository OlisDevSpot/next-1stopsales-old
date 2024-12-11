import CustomersSection from "./_components/dashboard/CustomersSection";
import Stats from "./_components/dashboard/Stats";

export default function DashboardPage() {
  return (
    <div className="w-full flex flex-col gap-4 h-full">
      <Stats />
      <CustomersSection />
    </div>
  );
}

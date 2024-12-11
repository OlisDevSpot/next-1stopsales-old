import { cn } from "@/lib/utils";

export default function CustomerForm({ className }: { className?: string }) {
  return (
    <div className={cn("bg-neutral-100 rounded-lg p-4", className)}>
      Customer Form
    </div>
  );
}

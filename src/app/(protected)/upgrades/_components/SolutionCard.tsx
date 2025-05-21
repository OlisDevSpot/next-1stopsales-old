import { Solution } from "@/models/solutions";

interface SolutionCardProps {
  solution: Solution;
  onClick: () => void;
}

export default function SolutionCard({ solution, onClick }: SolutionCardProps) {
  return (
    <div
      key={String(solution._id)}
      className={`h-full rounded-lg bg-center bg-cover`}
      style={{
        backgroundImage: `url('${solution.image_url}')`,
      }}
      onClick={onClick}
    >
      {/* OVERLAY */}
      <div className="group w-full h-full bg-black/70 rounded-lg p-4 cursor-pointer hover:bg-black/25 transition">
        <h3 className="text-neutral-300 group-hover:text-neutral-100 transition">
          {solution.label}
        </h3>
      </div>
    </div>
  );
}

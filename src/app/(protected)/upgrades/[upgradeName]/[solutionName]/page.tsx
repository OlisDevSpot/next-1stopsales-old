"use client";

import { Solution } from "@/models/solutions";
import { useEffect, useState } from "react";
import fetchSolution from "../../lib/fetchSolution";
import { ArrowLeftCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function SolutionPage({
  params,
}: {
  params: { upgradeName: string; solutionName: string };
}) {
  const [solution, setSolution] = useState<Solution | null>(null);
  const { solutionName } = params;
  const router = useRouter();
  useEffect(() => {
    fetchSolution(solutionName, { seconds: 20 }).then((data) => {
      setSolution(data);
    });
  });
  if (!solution) return <div></div>;
  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-full h-16 flex gap-4 items-center">
        <ArrowLeftCircle
          size={24}
          className="cursor-pointer"
          onClick={() => router.back()}
        />
        <h1>{solution.label}</h1>
      </div>
      <div className="grid grid-cols-3 gap-4 flex-grow">
        <Image src={solution.image_url} alt="" width={500} height={500} />
      </div>
    </div>
  );
}

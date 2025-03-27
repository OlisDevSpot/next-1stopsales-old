import { convertToDollars } from "@/lib/conversions";

export const PriceCalculator = ({ cost }: { cost: number }) => {
  return (
    <div className="rounded-lg flex flex-col gap-4">
      <div className="flex justify-between items-center rounded-lg bg-yellow-800 text-slate-200 p-2">
        <h4 className="text-lg font-semibold leading-loose">Cost</h4>
        <p>{convertToDollars(cost)}</p>
      </div>
      <div className="flex justify-between items-center rounded-lg bg-green-800 text-slate-200 p-2">
        <h4 className="text-lg font-semibold leading-loose">Price</h4>
        <p>{convertToDollars(cost * 2.5)}</p>
      </div>
    </div>
  );
};

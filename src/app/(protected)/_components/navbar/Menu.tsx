import Link from "next/link";

export default function Menu() {
  return (
    <ul className="flex gap-4">
      <li>
        <Link href="/upgrades">Upgrades</Link>
      </li>
    </ul>
  );
}

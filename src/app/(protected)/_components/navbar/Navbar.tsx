import Logo from "@/components/Logo";
import AuthControls from "./AuthControls";

export default function Navbar() {
  return (
    <nav className="w-full h-10 from-zinc-900 to-zinc-700 bg-gradient-to-l">
      <div className="max-w-[1200px] h-full mx-auto flex items-center justify-between px-4">
        <Logo />
        <AuthControls />
      </div>
    </nav>
  );
}

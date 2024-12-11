import Logo from "@/components/Logo";
import AuthControls from "./AuthControls";
import Menu from "./Menu";

export default function Navbar() {
  return (
    <nav className="w-full h-10 from-neutral-100 to-neutral-200 bg-gradient-to-l sticky top-0">
      <div className="max-w-[1200px] h-full mx-auto flex items-center justify-between px-4">
        <Logo />
        <Menu />
        <AuthControls />
      </div>
    </nav>
  );
}

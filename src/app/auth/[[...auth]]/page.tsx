import { SignInButton, SignUpButton } from "@clerk/nextjs";

export default function page() {
  return (
    <div className="w-full h-full flex items-center justify-center gap-8">
      <SignInButton mode="modal" />
      <SignUpButton mode="modal" />
    </div>
  );
}

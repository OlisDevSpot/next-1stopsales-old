"use client";

import Navbar from "./_components/navbar/Navbar";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <div className="max-w-[1200px] mx-auto p-4 h-[calc(100vh-40px)]">
        {children}
      </div>
    </>
  );
}

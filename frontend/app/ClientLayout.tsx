"use client";

import NavBar from "@/components/layout/NavBar";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavBar />
      {children}
    </>
  );
}
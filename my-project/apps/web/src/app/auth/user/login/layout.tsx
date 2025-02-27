import React from "react";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="overflow-x-hidden bg-main min-h-screen">
      {children}
    </main>
  );
}

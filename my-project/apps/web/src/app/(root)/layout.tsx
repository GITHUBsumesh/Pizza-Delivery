
import React from "react";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="overflow-x-hidden ">
      {children}
    </main>
  );
}

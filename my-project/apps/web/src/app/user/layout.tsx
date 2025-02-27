import AuthGuard from "@/components/AuthGuard";

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return <AuthGuard roleRequired="user"><main>{children}</main></AuthGuard>;
}

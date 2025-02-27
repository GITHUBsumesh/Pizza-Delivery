"use client";
import CustomButton from "@/components/Buttons/LoginButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLogin } from "@/hooks/useAuth";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowPassword((prev) => !prev);
  };

  const { mutate } = useLogin();
    const router = useRouter();
    const handleLogin = (e: React.FormEvent) => {
      e.preventDefault();
      mutate(
        {
          email,
          password,
          role: "admin",
        },
        {
          onSuccess: () => {
            router.push("/admin/dashboard");
          },
        }
      );
    };
  return (
    <div className="h-screen w-screen center-div center flex-row bg-black">
      <div className="flex flex-col justify-center items-center bg-main w-[30vw] h-[50vh] rounded-xl text-white p-1 ">
        <div className="flex flex-col relative w-[24rem] gap-6 justify-center items-center">
          <div className="flex flex-col items-center mb-5">
            <h1 className="text-[2rem] font-bold ">Admin Login</h1>
            <p>Use your admin credential to log in</p>
          </div>
          <form onSubmit={handleLogin} className="flex flex-col gap-4 w-full">
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="authcss"
              required
            />
            <div className="relative w-full">
              <Input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="authcss"
                required
              />
              <Button
                variant={"link"}
                className="absolute inset-y-0 right-0 text-white"
                onClick={handleShowPassword}
              >
                {showPassword ? <Eye /> : <EyeOff />}
              </Button>
            </div>
            <CustomButton
              className="yellow w-full h-9 text-[.95rem]"
              icon="🔐"
              type="submit"
            >
              Login In
            </CustomButton>
          </form>
          <div className="flex flex-row justify-between text-[.8rem] text-muted-foreground w-full">
            <Link href={"/"}>
              <span>Forgot Password?</span>
            </Link>
            <Link href={"/auth/admin/signup"}>
              <span>Create an Account</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;

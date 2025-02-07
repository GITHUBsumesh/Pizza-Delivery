"use client";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import React, {  useState } from "react";

import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import CustomButton from "@/components/Buttons/LoginButton";
import { useRouter } from "next/navigation";

const Page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowPassword((prev) => !prev);
  };

const router= useRouter()
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/user")
  };
  return (
    <div className="h-screen w-screen center-div center flex-row  bg-smallScreen-login md:bg-none bg-cover bg-center">
      <div className="left h-full w-[60vw] relative hidden md:block">
        <Image src={"/images/login-pizza.jpg"} alt="login-pizza" fill />
      </div>
      <div className="right flex flex-col justify-center items-center w-[40vw] text-white flex-shrink-0 flex-grow gap-4 p-1">
        <div className="flex flex-col relative max-w-[24rem] gap-4">
          <h1 className="text-[2rem] font-bold ">Slice, Customize, Enjoy!</h1>
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
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
            className="yellow w-full h-9 text-[.95rem]" icon='🍕'
            type="submit"
            >
            Slice In
            </CustomButton>
          </form>
          <div className="flex flex-row justify-between text-[.8rem] text-muted-foreground">
            <Link href={"/"}>
              <span>Forgot Password?</span>
            </Link>
            <Link href={"/auth/signup"}>
              <span>Create an Account</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;

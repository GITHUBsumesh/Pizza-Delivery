"use client";
import CustomButton from "@/components/Buttons/LoginButton";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Page = () => {
  const [email, setEmail] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleShowPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowPassword((prev) => !prev);
  };
  const handleShowConfirmPassword = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    setShowConfirmPassword((prev) => !prev);
  };
  const router = useRouter();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === confirmPassword) {
      router.push("/admin/dashboard");
    }
  };
  return (
    <div className="h-screen w-screen center-div center flex-row bg-black">
      <div className="flex flex-col justify-center items-center bg-main w-[30rem] h-[80vh] rounded-xl text-white p-1 ">
        <div className="flex flex-col relative w-full gap-6 justify-center items-center">
          <div className="flex flex-col items-center mb-5">
            <h1 className="text-[2rem] font-bold ">Admin SignUp</h1>
            <p>Fill in the details for your admin account</p>
          </div>
          <form
            onSubmit={handleSignup}
            className="flex flex-col gap-4 min-w-[20rem]"
          >
            <div className="space-y-1">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Email"
                className="authcss"
                required
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="authcss"
                required
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="Password">Create a Password</Label>
              <div className="relative w-full">
                <Input
                  id="password"
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
            </div>
            <div className="space-y-1">
              <Label htmlFor="confirmPassword">Confirm your Password</Label>
              <div className="relative w-full">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Password"
                  className="authcss "
                  required
                />
                <Button
                  variant={"link"}
                  className="absolute inset-y-0 right-0 text-white"
                  onClick={handleShowConfirmPassword}
                >
                  {showConfirmPassword ? <Eye /> : <EyeOff />}
                </Button>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-[.6rem]">
              <Checkbox
                id="terms"
                className="border border-white"
                checked={isChecked}
                required
                onCheckedChange={(checked: boolean) =>
                  setIsChecked(checked === true)
                }
              />
              <label
                htmlFor="terms"
                className="text-[.7rem] font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Accept terms and conditions
              </label>
            </div>

            <CustomButton
              className="yellow w-full h-9 text-[.95rem]"
              icon=" 🔥"
              type="submit"
            >
              Rule the Oven
            </CustomButton>
          </form>
          <div className="flex flex-row justify-center text-[.8rem] text-muted-foreground">
            <Link href={"/admin/auth/login"}>
              <span className="">Log In</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;

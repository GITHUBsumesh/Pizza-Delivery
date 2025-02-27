"use client";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import CustomButton from "@/components/Buttons/LoginButton";
import { useRouter } from "next/navigation";
import { useSignup } from "@/hooks/useAuth";

const Page = () => {
  const [email, setEmail] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
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
  const { mutate } = useSignup();
  const router = useRouter();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === confirmPassword) {
      mutate(
        {
          email,
          password,
          firstName,
          lastName,
          role: "user",
        },
        {
          onSuccess: () => {
            router.push("/user");
          },
        }
      );
    }
  };
  return (
    <div className="h-screen w-screen center-div center flex-row  bg-smallScreen-signup md:bg-none bg-cover bg-center">
      <div className="left flex flex-col justify-center items-center w-[60vw] text-white flex-shrink-0 flex-grow gap-4 ">
        <div className="flex flex-col justify-center items-center relative  gap-4 ">
          <div className="min-w-[30rem]">
            <h1 className="md:text-[2.3rem] text-[2rem]  font-bold  text-center">
              Sign up for deliciousness
            </h1>
            <p className="text-center">Fill your details to get started</p>
          </div>
          <div className="flex flex-col items-center gap-4 ">
            <form
              onSubmit={handleSignup}
              className="flex flex-col gap-4 min-w-[20rem]"
            >
              <div className="space-y-1">
                <Label htmlFor="name">FirstName</Label>
                <Input
                  id="name"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="FirstName"
                  className="authcss"
                  required
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="name">LastName</Label>
                <Input
                  id="name"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="LastName"
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
                icon="🍴"
                type="submit"
              >
                Join the Feast
              </CustomButton>
            </form>
            <div className="flex flex-row justify-center text-[.8rem] text-muted-foreground">
              <Link href={"/auth/user/login"}>
                <span className="">Log In</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="right h-full w-[40vw] relative hidden md:block">
        <Image src={"/images/signup-pizza.jpg"} alt="login-pizza" fill />
      </div>
    </div>
  );
};

export default Page;

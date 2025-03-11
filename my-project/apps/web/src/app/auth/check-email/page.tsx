/* eslint-disable react/no-unescaped-entities */
"use client";

import { MailCheck } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useProfile } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

export default function CheckEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const role = searchParams.get("role") || "user";
  const email = searchParams.get("email");
  const [countdown, setCountdown] = useState(5);
  const { data: user, isSuccess } = useProfile();
  const redirectPath = role === "admin" ? "/admin/dashboard" : "/user";

  useEffect(() => {
    if (isSuccess && user?.isVerified) {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            router.push(redirectPath);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isSuccess, user?.isVerified, router, redirectPath]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-main">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-components py-8 px-4 shadow sm:rounded-lg sm:px-10 text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 mb-4">
            <MailCheck className="h-6 w-6 text-blue-600" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Check Your Email
          </h3>
          <p className="text-gray-600">
            We've sent a verification link to{" "}
            {email ? (
              <span className="font-semibold">{email}</span>
            ) : (
              "your email address"
            )}
            .
          </p>

          {user?.isVerified ? (
            <p className="text-green-600 mt-4">
              Email verified successfully! Redirecting in {countdown}...
            </p>
          ) : (
            <p className="text-gray-600 mt-4">
              Please verify your email to continue. Check your spam folder if
              you don't see the email.
            </p>
          )}

          <div className="mt-6">
            {user?.isVerified ? (
              <Link
                href={redirectPath}
                className="text-indigo-600 hover:text-indigo-500 text-sm underline"
              >
                Click here if not redirected
              </Link>
            ) : (
              <Link
                href={role === "admin" ? "/auth/admin/login" : "/auth/user/login"}
                className="text-indigo-600 hover:text-indigo-500 text-sm underline"
              >
                Return to Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
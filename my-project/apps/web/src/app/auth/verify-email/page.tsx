"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Loader2,
  Check,
  AlertTriangle,
  MailCheck,
  ArrowRight,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { useResendVerificationEmail, useVerifyEmail } from "@/hooks/useAuth";
export default function EmailVerificationPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EmailVerificationPageLogic />
    </Suspense>
  );
}

 function EmailVerificationPageLogic() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const { data, isPending, isError, error,isSuccess } = useVerifyEmail(token);
  const [countdown, setCountdown] = useState(5);
  const redirectPath = data?.role === 'admin' ? '/admin/dashboard' : '/user';

  // Separate useEffect for handling redirect
  useEffect(() => {
    if (countdown === 0) {
      router.push(redirectPath);
    }
  }, [countdown, redirectPath, router]);

  // Countdown timer effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isSuccess) {
      timer = setInterval(() => {
        setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isSuccess]);


  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-main">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-components py-8 px-4 shadow sm:rounded-lg sm:px-10 text-center">
          {isPending ? (
            <>
              <Loader2 className="animate-spin w-12 h-12 text-indigo-600 mb-4 mx-auto" />
              <p className="text-gray-600">Verifying your email...</p>
            </>
          ) : isError ? (
            <>
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-lg font-medium text-red-600 mb-2">
                {error.message}
              </h3>
              <p className="text-gray-600">
                Please try again or request a new verification email
              </p>
              <div className="mt-6">
                <ResendVerificationForm />
              </div>
            </>
          ) : (
            <>
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                <Check className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-medium text-green-600 mb-2">
                Email Verified Successfully!
              </h3>
              <p className="text-gray-600">
                {data?.email && (
                  <>
                    Your email{" "}
                    <span className="font-semibold">{data.email}</span> has been
                    verified
                  </>
                )}
              </p>
              <p className="text-gray-600 mt-4">
                Redirecting in {countdown} seconds...
              </p>
              <div className="mt-6">
                <Link
                  href={redirectPath}
                  className="inline-flex items-center gap-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Continue to {data?.role === 'admin' ? 'Dashboard' : 'Profile'}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function ResendVerificationForm() {
  const [email, setEmail] = useState("");
  const {
    mutate: resendVerificationEmail,
    isPending,
    isError,
    error,
    isSuccess,
  } = useResendVerificationEmail();

  const handleResend = async (e: React.FormEvent) => {
    e.preventDefault();
    resendVerificationEmail(email);
  };

  return (
    <form onSubmit={handleResend} className="space-y-4">
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Enter your email to resend verification
        </label>
        <div className="mt-1">
          <Input
            id="email"
            name="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
      </div>

      {isError && (
        <div className="flex items-center gap-2 text-red-600 text-sm">
          <AlertTriangle className="h-4 w-4" />
          {error.message}
        </div>
      )}

      {isSuccess && (
        <div className="flex items-center gap-2 text-green-600 text-sm">
          <MailCheck className="h-4 w-4" />
          Verification email resent successfully!
        </div>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="w-full flex justify-center items-center gap-2 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
      >
        {isPending ? (
          <>
            <Loader2 className="animate-spin h-4 w-4" />
            Sending...
          </>
        ) : (
          <>
            <MailCheck className="h-4 w-4" />
            Resend Verification Email
          </>
        )}
      </button>
    </form>
  );
}

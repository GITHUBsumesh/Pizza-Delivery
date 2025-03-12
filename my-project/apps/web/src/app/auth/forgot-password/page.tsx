"use client";
import React, { useState, MouseEvent } from 'react';
import { useForgotPassword } from '@/hooks/useAuth';
import { Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';

const Page = () => {
  const [email, setEmail] = useState('');
  const { mutate: forgotPassword, isError, error, isSuccess, isPending } = useForgotPassword();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    forgotPassword(email);
    setEmail(''); // Clear email after submission
  };
  const router=useRouter();
  const goback = (e: MouseEvent) => {
    e.preventDefault();
router.back();
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-main">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-200">
          Forgot your password?
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Enter your email to reset your password
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className=" py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="text-white appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            {isError && (
              <div className="text-red-600 text-sm text-center p-2 bg-red-50 rounded-md">
                {error.message}
              </div>
            )}

            {isSuccess && (
              <div className="text-green-600 text-sm text-center p-2 bg-green-50 rounded-md">
                Password reset email sent! Check your inbox (including spam folder)
              </div>
            )}

            <div>
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
                  'Send Reset Link'
                )}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center text-sm">
            <button onClick={goback}
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Back To Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
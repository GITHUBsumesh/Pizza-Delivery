// pages/401.js or pages/unauthorized.js
import Head from "next/head";
import { useRouter } from "next/navigation";

export default function Unauthorized() {
  const router = useRouter();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-main">
      <Head>
        <title>Unauthorized Access</title>
      </Head>

      <div className="text-center space-y-4">
        <h1 className="text-6xl font-bold text-red-600">401</h1>
        <h2 className="text-3xl font-semibold text-gray-800">
          Unauthorized Access
        </h2>
        <p className="text-gray-600">
          You don&apos;t have permission to access this page.
        </p>
        <button
          onClick={() => router.back()}
          className="inline-block mt-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Go Back
        </button>
      </div>
    </div>
  );
}

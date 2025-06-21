'use client';

import { useRouter } from 'next/navigation';

export default function BlogPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-emerald-50 text-gray-800 flex flex-col items-center justify-center py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg border border-green-200">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center text-green-700 hover:text-green-900 transition-colors duration-200 mb-6"
        >
          ← Back
        </button>
        <h1 className="text-4xl font-bold text-green-800 mb-6">Our Blog</h1>
        <p className="text-lg text-center max-w-2xl mb-8">
          Coming soon! Check back here for articles and insights on climate change, sustainable living, and EcoSense updates.
        </p>
        <p className="text-md text-gray-600">Stay tuned for more! 🌱</p>
      </div>
    </div>
  );
} 
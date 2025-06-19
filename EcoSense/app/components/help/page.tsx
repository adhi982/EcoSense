'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function HelpCenterPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-emerald-50 text-gray-800 py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg border border-green-200 text-center">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center text-green-700 hover:text-green-900 transition-colors duration-200 mb-6"
        >
          ← Back
        </button>
        <h1 className="text-4xl font-bold text-green-800 mb-6">Help Center</h1>
        <p className="text-lg max-w-2xl mx-auto mb-8">
          Welcome to the EcoSense Help Center! Here you will find answers to frequently asked questions and support resources.
        </p>
        
        <h2 className="text-2xl font-semibold text-green-700 mt-10 mb-4">Contact Us</h2>
        <p className="text-lg mb-4">
          If you have any further questions or need assistance, feel free to reach out:
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
          <a href="YOUR_LINKEDIN_URL" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-green-600 hover:bg-green-700 transition-colors duration-300">
            Connect on LinkedIn
          </a>
          <a href="YOUR_GITHUB_URL" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-green-600 hover:bg-green-700 transition-colors duration-300">
            Visit GitHub
          </a>
        </div>
        <p className="text-lg mb-4">
          Email: <a href="mailto:adithyant982@gmail.com" className="text-green-600 hover:underline">adithyant982@gmail.com</a>
        </p>

        <p className="text-md text-gray-600 mt-8">We're here to help you on your sustainable journey! 🌍</p>
      </div>
    </div>
  );
} 
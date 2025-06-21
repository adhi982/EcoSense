'use client';

import ClimateMentor from '../components/ClimateMentor'
import { useRouter } from 'next/navigation';

export default function LearnPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 pt-8">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center text-green-700 hover:text-green-900 transition-colors duration-200 mb-6"
        >
          ← Back
        </button>
        <h1 className="text-3xl font-bold text-center mb-8">
          Learn About Climate Change
        </h1>
        <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
          Chat with our AI Climate Mentor to learn about climate change, carbon footprints,
          and sustainable living. Ask any questions you have!
        </p>
        
        <ClimateMentor />
      </div>
    </main>
  )
} 
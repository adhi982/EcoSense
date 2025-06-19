'use client';

import { useRouter } from 'next/navigation';
import CarbonCalculator from '../components/CarbonCalculator'

export default function CalculatorPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 py-12 md:py-16 font-sans">
      <div className="container mx-auto px-6 animate-fade-in-up">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center text-green-700 hover:text-green-900 transition-colors duration-200 mb-6"
        >
          ← Back
        </button>
        <h1 className="text-4xl md:text-5xl font-bold text-green-800 text-center mb-6">
          Carbon Footprint Calculator 📊
        </h1>
        <p className="text-lg text-green-700 text-center max-w-2xl mx-auto mb-12 leading-relaxed">
          Calculate your household's carbon footprint by entering your monthly consumption data.
          Get a detailed breakdown of your emissions and personalized tips to reduce your impact.
        </p>
        
        <CarbonCalculator />
      </div>
    </main>
  )
} 
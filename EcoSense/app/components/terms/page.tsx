'use client';

import { useRouter } from 'next/navigation';

export default function TermsPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-emerald-50 text-gray-800 py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg border border-green-200">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center text-green-700 hover:text-green-900 transition-colors duration-200 mb-6"
        >
          ← Back
        </button>
        <h1 className="text-4xl font-bold text-green-800 mb-6 text-center">Terms and Conditions</h1>
        <p className="text-sm text-gray-600 text-center mb-8">Last updated: May 29, 2025</p>

        <h2 className="text-2xl font-semibold text-green-700 mb-4">1. Welcome to EcoSense</h2>
        <p className="mb-6 leading-relaxed">EcoSense is a Progressive Web App (PWA) designed to help you calculate your carbon footprint and learn about sustainable living through an AI mentor. By using our app, you agree to these terms.</p>

        <h2 className="text-2xl font-semibold text-green-700 mb-4">2. Your Use of the App</h2>
        <ul className="list-disc list-inside space-y-2 mb-6 leading-relaxed">
          <li>You can use the carbon calculator to estimate your footprint based on your inputs.</li>
          <li>You can interact with the AI Climate Mentor for educational purposes.</li>
          <li>Please use the app responsibly and do not input false information or use it for harmful activities.</li>
          <li>The information provided by the AI is for educational guidance and not professional advice.</li>
        </ul>

        <h2 className="text-2xl font-semibold text-green-700 mb-4">3. Data and Privacy</h2>
        <p className="mb-6 leading-relaxed">We collect certain data to provide our services. Please see our Privacy Policy for full details on how we handle your information.</p>

        <h2 className="text-2xl font-semibold text-green-700 mb-4">4. Changes to Terms</h2>
        <p className="mb-6 leading-relaxed">We may update these terms from time to time. We will notify you of any significant changes. Your continued use of the app after changes means you accept the new terms.</p>

        <h2 className="text-2xl font-semibold text-green-700 mb-4">5. Contact Us</h2>
        <p className="leading-relaxed">If you have any questions about these terms, please contact us through our Help Center.</p>
      </div>
    </div>
  );
} 
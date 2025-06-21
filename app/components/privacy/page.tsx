'use client';

import { useRouter } from 'next/navigation';

export default function PrivacyPage() {
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
        <h1 className="text-4xl font-bold text-green-800 mb-6 text-center">Privacy Policy</h1>
        <p className="text-sm text-gray-600 text-center mb-8">Last updated: May 29, 2025</p>

        <h2 className="text-2xl font-semibold text-green-700 mb-4">1. Your Privacy at EcoSense</h2>
        <p className="mb-6 leading-relaxed">At EcoSense, we care about your privacy. This policy explains how we handle your information when you use our app.</p>

        <h2 className="text-2xl font-semibold text-green-700 mb-4">2. Information We Collect</h2>
        <ul className="list-disc list-inside space-y-2 mb-6 leading-relaxed">
          <li>Inputs for Calculator:We collect data you enter into the carbon footprint calculator (like electricity usage, miles driven) to provide you with footprint estimates and personalized tips. This data is used to calculate your footprint and is stored locally on your device for history.</li>
          <li>AI Mentor Interactions: Your conversations with the AI Climate Mentor are processed to provide relevant educational content. We do not store these conversations on our servers in a way that identifies you personally.</li>
          <li>No Personal Identifiable Information: We do not collect your name, email, or any other information that directly identifies you unless you choose to provide it for specific features (e.g., account creation, if available in future updates).</li>
        </ul>

        <h2 className="text-2xl font-semibold text-green-700 mb-4">3. How We Use Your Information</h2>
        <ul className="list-disc list-inside space-y-2 mb-6 leading-relaxed">
          <li>To calculate your carbon footprint and offer reduction recommendations.</li>
          <li>To provide personalized educational content through the AI Climate Mentor.</li>
          <li>To improve the functionality and accuracy of the EcoSense app.</li>
        </ul>

        <h2 className="text-2xl font-semibold text-green-700 mb-4">4. Data Security</h2>
        <p className="mb-6 leading-relaxed">We take reasonable steps to protect your information. Data stored locally on your device is subject to your device's security measures.</p>

        <h2 className="text-2xl font-semibold text-green-700 mb-4">5. Changes to This Policy</h2>
        <p className="mb-6 leading-relaxed">We may update this Privacy Policy from time to time. We will post the updated policy on this page with a new "Last updated" date. Please review it periodically.</p>

        <h2 className="text-2xl font-semibold text-green-700 mb-4">6. Contact Us</h2>
        <p className="leading-relaxed">If you have any questions about this Privacy Policy, please reach out to us through our Help Center.</p>
      </div>
    </div>
  );
} 
'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Home() {
  const [leafCount, setLeafCount] = useState(10);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [showProgressModal, setShowProgressModal] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setLeafCount(5);
      } else if (window.innerWidth < 1024) {
        setLeafCount(8);
      } else {
        setLeafCount(12);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getRandomLeafStyle = () => ({
    left: `${Math.random() * 100}vw`,
    top: `${Math.random() * 100}vh`,
    animationDuration: `${Math.random() * 8 + 7}s`,
    animationDelay: `${Math.random() * 4}s`,
    opacity: `${Math.random() * 0.4 + 0.3}`,
    transform: `scale(${Math.random() * 0.6 + 0.4})`,
  });

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const faqItems = [
    {
      question: "What is EcoSense?",
      answer: "EcoSense is a Web App designed to help individuals understand and reduce their environmental footprint through tools like a carbon footprint calculator and an AI-powered climate educator."
    },
    {
      question: "How does the Carbon Calculator work?",
      answer: "Our calculator estimates your household's carbon emissions based on your input regarding energy consumption, transportation, diet, and waste. It provides personalized tips for reduction."
    },
    {
      question: "What is the AI Climate Mentor?",
      answer: "The AI Climate Mentor is an interactive tool that uses the AI model to provide educational content and answer your questions about climate change, sustainability, and environmental topics."
    },
    {
      question: "Is my data safe?",
      answer: "We prioritize your privacy and data security. We only collect necessary information to provide our services and do not share your personal data with third parties without your consent."
    },
    {
      question: "How can I contribute to EcoSense?",
      answer: "EcoSense is an open-source project. You can contribute by providing feedback, reporting bugs, suggesting features, or contributing code on our GitHub repository."
    },
  ];

  const handleViewProgressClick = () => {
    setShowProgressModal(true);
  };

  const handleCloseProgressModal = () => {
    setShowProgressModal(false);
  };

  return (
    <main className="min-h-screen bg-emerald-50 font-sans relative overflow-hidden text-gray-800">
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-50">
        {Array.from({ length: leafCount }).map((_, index) => (
          <div
            key={index}
            className="absolute w-5 h-5 bg-green-600 rounded-full animate-float"
            style={{
              ...getRandomLeafStyle(),
              animationName: 'float, drift',
              animationIterationCount: 'infinite',
              animationTimingFunction: 'linear',
              animationDirection: index % 2 === 0 ? 'alternate' : 'alternate-reverse',
            }}
          />
        ))}
      </div>

      <section className="relative z-10 w-full bg-gradient-to-br from-emerald-100 to-teal-100 py-24 md:py-40 text-center overflow-hidden">
        <div className="container mx-auto px-6 relative z-20 pt-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-green-900 tracking-wider uppercase mb-4 animate-fade-in-up">
            ECOSENSE 🌱
          </h2>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-sans font-extrabold text-green-900 mb-6 leading-tight animate-fade-in-up transition-transform duration-300 ease-in-out hover:scale-105">
            Calculate. Learn. <br className="block sm:hidden" /> Act. <span className="text-green-600">For a Greener Future.</span> 🌍
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-green-800 mb-10 max-w-3xl mx-auto animate-fade-in-up animation-delay-200 transition-transform duration-300 ease-in-out hover:scale-105">
            Your personal carbon coach and climate tutor, providing insights and education
            to empower sustainable living.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center animate-fade-in-up animation-delay-400">
            <Link href="/calculator" className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-green-600 hover:bg-green-700 transition-colors duration-300 ease-in-out transform hover:-translate-y-1">
              Calculate Your Footprint
            </Link>
            <Link href="/learn" className="inline-flex items-center justify-center px-8 py-4 border border-green-600 text-base font-medium rounded-full shadow-sm text-green-800 bg-transparent hover:bg-green-50 transition-colors duration-300 ease-in-out transform hover:-translate-y-1">
              Start Learning
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32 bg-emerald-50 relative z-10">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-green-800 mb-12 animate-fade-in-up">
            Key Features ✨
            </h2>
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            <div className="card bg-white bg-opacity-90 border border-green-200 shadow-lg hover:shadow-xl hover:border-green-400 transform hover:scale-105 transition-all duration-300 ease-in-out animate-fade-in-up p-8 flex flex-col justify-between">
              <div>
                <h3 className="text-xl sm:text-2xl font-semibold text-green-700 mb-4">Carbon Calculator 📊</h3>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  Calculate your household's carbon footprint with our easy-to-use tool.
                  Understand your impact and get personalized reduction tips.
                </p>
              </div>
              <Link href="/calculator" className="text-teal-600 hover:text-teal-800 font-semibold transition-colors duration-200 flex items-center group mt-4 inline-block">
                Try Calculator <span className="ml-2 transition-transform duration-200 group-hover:translate-x-1">→</span>
              </Link>
            </div>

            <div className="card bg-white bg-opacity-90 border border-green-200 shadow-lg hover:shadow-xl hover:border-green-400 transform hover:scale-105 transition-all duration-300 ease-in-out animate-fade-in-up animation-delay-200 p-8 flex flex-col justify-between">
              <div>
                <h3 className="text-xl sm:text-2xl font-semibold text-green-700 mb-4">AI Climate Mentor 🤖</h3>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  Explore climate topics through engaging conversations with our AI tutor.
                  Deepen your understanding and test your knowledge.
                </p>
              </div>
              <Link href="/learn" className="text-teal-600 hover:text-teal-800 font-semibold transition-colors duration-200 flex items-center group mt-4 inline-block">
                Start Learning <span className="ml-2 transition-transform duration-200 group-hover:translate-x-1">→</span>
              </Link>
            </div>

            <div className="card bg-white bg-opacity-90 border border-green-200 shadow-lg hover:shadow-xl hover:border-green-400 transform hover:scale-105 transition-all duration-300 ease-in-out animate-fade-in-up animation-delay-400 p-8 flex flex-col justify-between">
              <div>
                <h3 className="text-xl sm:text-2xl font-semibold text-green-700 mb-4">Your Progress ✅</h3>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  Monitor your carbon reduction journey, celebrate milestones, and share
                  your positive impact.
                </p>
              </div>
              <button 
                onClick={handleViewProgressClick}
                className="text-teal-600 hover:text-teal-800 font-semibold transition-colors duration-200 flex items-center group mt-4 inline-block focus:outline-none"
              >
                View Progress <span className="ml-2 transition-transform duration-200 group-hover:translate-x-1">→</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32 bg-green-100 relative z-10">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-green-800 mb-8 animate-fade-in-up">Our Mission 🎯</h2>
          <p className="text-lg sm:text-xl text-green-700 leading-relaxed max-w-3xl mx-auto animate-fade-in-up animation-delay-200">
            At EcoSense, we believe in empowering individuals to make informed choices for a sustainable future.
            Our mission is to provide accessible tools and education that help you understand your environmental footprint
            and take meaningful action to reduce it.
          </p>
        </div>
      </section>

      <section className="py-20 md:py-32 bg-emerald-50 relative z-10">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-green-800 mb-12 animate-fade-in-up">What Our Users Say ✨</h2>
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            <div className="bg-white bg-opacity-90 border border-green-200 shadow-lg rounded-lg p-6 animate-fade-in-up">
              <p className="text-gray-700 mb-4 leading-relaxed">
                "EcoSense has made it so easy to track my carbon footprint. The calculator is simple,
                and the AI tutor is a great way to learn more about climate change!"
              </p>
              <p className="font-semibold text-green-700">- Sarah K.</p>
            </div>

            <div className="bg-white bg-opacity-90 border border-green-200 shadow-lg rounded-lg p-6 animate-fade-in-up animation-delay-200">
              <p className="text-gray-700 mb-4 leading-relaxed">
                "I love the recommendations I get from the calculator. They are practical and easy to implement.
                It's helping me make real changes in my daily life."
              </p>
              <p className="font-semibold text-green-700">- John P.</p>
            </div>

            <div className="bg-white bg-opacity-90 border border-green-200 shadow-lg rounded-lg p-6 animate-fade-in-up animation-delay-400">
              <p className="text-gray-700 mb-4 leading-relaxed">
                "The Climate Mentor is fantastic! It explains complex topics in a way that's easy to understand.
                Highly recommend this app to anyone wanting to learn about climate action."
              </p>
              <p className="font-semibold text-green-700">- Emily R.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32 bg-green-100 relative z-10">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-green-800 mb-12 animate-fade-in-up">Frequently Asked Questions 🤔</h2>
          <div className="max-w-3xl mx-auto">
            {faqItems.map((item, index) => (
              <div key={index} className="mb-6 bg-white bg-opacity-90 border border-green-200 shadow-lg rounded-lg p-6 cursor-pointer" onClick={() => toggleFAQ(index)}>
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold text-green-700">{item.question}</h3>
                  <span>{openFAQ === index ? '-' : '+'}</span>
                </div>
                {openFAQ === index && (
                  <p className="mt-4 text-gray-700 leading-relaxed">{item.answer}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-green-800 text-white py-24 md:py-32 text-center relative z-10">
        <div className="container mx-auto px-6 animate-fade-in-up">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 leading-tight">Ready to Make a Difference 🌱</h2>
          <p className="text-lg sm:text-xl mb-10 max-w-2xl mx-auto">
            Join thousands of individuals empowered to reduce their environmental footprint.
          </p>
          <Link href="https://www.niti.gov.in/sustainable-development-goal" className="inline-flex items-center justify-center px-10 py-4 border border-transparent text-lg font-medium rounded-full shadow-lg bg-white text-green-800 hover:bg-green-100 transition-colors duration-300 ease-in-out transform hover:-translate-y-1" target="_blank" rel="noopener noreferrer">
            Get Started Now
          </Link>
        </div>
      </section>

      {showProgressModal && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={handleCloseProgressModal}
        >
          <div 
            className="bg-white p-8 rounded-lg shadow-lg max-w-sm text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-semibold text-green-800 mb-4">Coming Soon!</h3>
            <p className="text-gray-700 mb-6">Progress tracking feature coming in a future update!</p>
            <button
              onClick={handleCloseProgressModal}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </main>
  )
} 
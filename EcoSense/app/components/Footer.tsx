import Link from 'next/link';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-green-900 text-white py-8 text-sm">
      <div className="container mx-auto px-6 flex flex-col sm:flex-row justify-between items-center">
        {/* Copyright */}
        <p className="mb-4 sm:mb-0">&copy; {currentYear} EcoSense. All rights reserved.</p>

        {/* Social Media Links (Centered) */}
        <div className="flex gap-4 mb-4 sm:mb-0">
          {/* Using simple divs as placeholders for icons */}
          <a href="https://github.com/adhi982" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors duration-200 text-xl">
            {/* Placeholder for GitHub Icon */}
            {/* Replace with an actual icon component (e.g., from react-icons) */}
            <span className="fab fa-github"></span> GitHub
          </a>
          <a href="https://www.linkedin.com/in/adithyant982/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors duration-200 text-xl">
            {/* Placeholder for LinkedIn Icon */}
            {/* Replace with an actual icon component (e.g., from react-icons) */}
            <span className="fab fa-linkedin"></span> LinkedIn
          </a>
        </div>

        {/* Navigation Links */}
        <div className="flex gap-4 flex-wrap justify-center sm:justify-end">
          <Link href="/components/blog" className="text-gray-300 hover:text-white transition-colors duration-200">Blog</Link>
          <Link href="/components/help" className="text-gray-300 hover:text-white transition-colors duration-200">Help Center</Link>
          <Link href="/components/terms" className="text-gray-300 hover:text-white transition-colors duration-200">Terms and Conditions</Link>
          <Link href="/components/privacy" className="text-gray-300 hover:text-white transition-colors duration-200">Privacy Policy</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 
export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-green-500">
            ReLoop<span className="text-white">X</span>
          </h2>
          <p className="mt-4 text-sm text-gray-400">
            Turning urban waste into valuable resources.  
            Building a cleaner, circular future.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Platform</h3>
          <ul className="space-y-2 text-sm">
            <li>Upload Waste</li>
            <li>NGO Dashboard</li>
            <li>Impact</li>
            <li>Marketplace</li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Support</h3>
          <ul className="space-y-2 text-sm">
            <li>FAQs</li>
            <li>Help Center</li>
            <li>Privacy Policy</li>
            <li>Terms & Conditions</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Contact</h3>
          <p className="text-sm">📍 India</p>
          <p className="text-sm">📧 support@reloopx.com</p>
          <p className="text-sm">📞 +91 98765 43210</p>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} ReLoopX. All rights reserved.
      </div>
    </footer>
  );
}

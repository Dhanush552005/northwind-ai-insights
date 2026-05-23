import { Link, useLocation } from "react-router-dom";
import { Zap } from "lucide-react";

function Navbar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { path: "/", label: "Dashboard" },
    { path: "/ai", label: "AI Assistant" },
    { path: "/add-data", label: "Add Data" }
  ];

  return (
    <nav className="bg-slate-900/95 backdrop-blur-sm border-b border-slate-800 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Branding */}
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity flex-shrink-0">
            <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-2 rounded-lg">
              <Zap className="w-5 h-5 text-white" strokeWidth={3} />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-white">Northwind</h1>
              <p className="text-xs text-slate-400">AI Insights</p>
            </div>
          </Link>

          {/* Navigation Links - Always Visible */}
          <div className="flex items-center gap-2 sm:gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 sm:px-4 py-2 rounded-lg font-medium text-sm sm:text-base transition-all duration-200 whitespace-nowrap ${
                  isActive(link.path)
                    ? "text-blue-400 bg-blue-500/10 border border-blue-500/30"
                    : "text-slate-300 hover:text-white hover:bg-slate-800/50"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
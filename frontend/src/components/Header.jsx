import { FileText, Brain, Zap, Menu, Bot, Sparkles } from 'lucide-react';
import ConnectionStatus from './ConnectionStatus';

/**
 * Clean and modern Header component
 */
const Header = () => {
  return (
    <header className="navbar bg-base-100 border-b border-base-300 shadow-sm sticky top-0 z-50 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between w-full">
          {/* Logo and Title - Left Side */}
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="w-15 md:w-20 rounded-lg">
                <img src="/icon.jpg" />
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <h1 className="text-lg md:text-xl font-bold text-base-content">
                  AI Summarizer
                </h1>
              </div>
              <div className="hidden sm:flex items-center gap-2 text-xs text-base-content/60">
                <span>Meeting notes made simple</span>
              </div>
            </div>
          </div>

          {/* Right Section - Status & Menu */}
          <div className="flex items-center gap-4">
            {/* Connection Status */}
            <ConnectionStatus />

            {/* Status Indicator */}
            <div className="flex items-center gap-2 bg-success/10 border border-success/20 px-3 py-1.5 rounded-full">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              <span className="text-xs font-medium text-success hidden sm:inline">
                Live
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

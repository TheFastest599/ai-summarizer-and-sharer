import { Heart, Code, Zap, Mail, Github, Twitter } from 'lucide-react';

/**
 * Enhanced responsive Footer component with DaisyUI styling
 */
const Footer = () => {
  const techStack = [
    { name: 'React', icon: Code, color: 'badge-primary' },
    { name: 'Groq AI', icon: Zap, color: 'badge-secondary' },
    { name: 'Resend', icon: Mail, color: 'badge-accent' },
  ];

  return (
    <footer className="bg-gradient-to-t from-base-300 to-base-200 mt-auto">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-bold mb-3 text-primary">
              AI Summarizer
            </h3>
            <p className="text-sm text-base-content/70 leading-relaxed">
              Transform your meeting notes with AI-powered summaries and instant
              sharing capabilities.
            </p>
          </div>

          {/* Tech Stack */}
          <div className="text-center">
            <h4 className="font-semibold mb-3 text-base-content">Built With</h4>
            <div className="flex flex-wrap justify-center gap-2">
              {techStack.map(({ name, icon: Icon, color }) => (
                <div
                  key={name}
                  className="tooltip"
                  data-tip={`Powered by ${name}`}
                >
                  <div className={`badge ${color} gap-2 py-2 px-3`}>
                    <Icon className="w-3 h-3" />
                    <span className="text-xs font-medium">{name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Social Links */}
          <div className="text-center md:text-right">
            <h4 className="font-semibold mb-3 text-base-content">Connect</h4>
            <div className="flex justify-center md:justify-end gap-3">
              <button className="btn btn-ghost btn-sm btn-circle">
                <Github className="w-4 h-4" />
              </button>
              <button className="btn btn-ghost btn-sm btn-circle">
                <Twitter className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="divider my-6"></div>

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 text-sm">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-red-500 animate-pulse" />
            <span>using modern web technologies</span>
          </div>

          <div className="text-xs text-base-content/60">
            <p>&copy; 2024 AI Meeting Summarizer. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

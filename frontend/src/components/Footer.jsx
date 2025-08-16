import { Heart, Code, Zap, Mail } from 'lucide-react';

/**
 * Enhanced Footer component with DaisyUI styling
 */
const Footer = () => {
  const techStack = [
    { name: 'React', icon: Code },
    { name: 'Groq AI', icon: Zap },
    { name: 'Resend', icon: Mail },
  ];

  return (
    <footer className="footer footer-center p-10 bg-base-200 text-base-content rounded-t-xl mt-12">
      <nav>
        <div className="grid grid-flow-col gap-4">
          {techStack.map(({ name, icon: Icon }) => (
            <div key={name} className="tooltip" data-tip={name}>
              <div className="badge badge-outline badge-lg gap-2">
                <Icon className="w-4 h-4" />
                {name}
              </div>
            </div>
          ))}
        </div>
      </nav>

      <aside className="flex items-center gap-2">
        <Heart className="w-5 h-5 text-red-500 animate-pulse" />
        <p className="text-sm">
          Built with passion using modern web technologies
        </p>
      </aside>

      <div className="text-xs opacity-70">
        <p>&copy; 2024 AI Meeting Summarizer & Sharer</p>
      </div>
    </footer>
  );
};

export default Footer;

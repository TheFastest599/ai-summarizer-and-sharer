import { FileText, Brain, Zap } from 'lucide-react';
import ConnectionStatus from './ConnectionStatus';

/**
 * Header component with clean DaisyUI styling
 */
const Header = () => {
  return (
    <div className="navbar bg-primary text-primary-content shadow-xl">
      <div className="container mx-auto">
        <div className="flex-1">
          <div className="avatar placeholder mr-3">
            <div className="bg-primary-focus text-primary-content rounded-full w-12 h-12">
              <FileText className="w-6 h-6" />
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              AI Meeting Summarizer
              <div className="badge badge-accent badge-sm">
                <Brain className="w-3 h-3 mr-1" />
                AI
              </div>
            </h1>
            <div className="hidden sm:block text-primary-content/80">
              <ConnectionStatus />
            </div>
          </div>
        </div>
        <div className="flex-none">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
            >
              <div className="indicator">
                <Zap className="w-5 h-5" />
                <span className="badge badge-xs badge-secondary indicator-item"></span>
              </div>
            </div>
            <div
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              <div className="menu-title">
                <span className="text-base-content">Powered by</span>
              </div>
              <ul>
                <li>
                  <a className="text-base-content">Groq AI - Fast Inference</a>
                </li>
                <li>
                  <a className="text-base-content">Resend - Email Delivery</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;

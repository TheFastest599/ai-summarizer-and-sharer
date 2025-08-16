import { useState, useEffect } from 'react';
import { Server, Wifi, WifiOff } from 'lucide-react';
import apiService from '../services/apiService';

/**
 * Component to check backend connection status
 */
const ConnectionStatus = () => {
  const [isConnected, setIsConnected] = useState(null);
  const [isChecking, setIsChecking] = useState(false);

  const checkConnection = async () => {
    setIsChecking(true);
    try {
      await apiService.healthCheck();
      setIsConnected(true);
    } catch (error) {
      setIsConnected(false);
    } finally {
      setIsChecking(false);
    }
  };

  useEffect(() => {
    checkConnection();

    // Check connection every 30 seconds
    const interval = setInterval(checkConnection, 30000);

    return () => clearInterval(interval);
  }, []);

  if (isConnected === null) {
    return (
      <div className="flex items-center gap-2 text-sm text-base-content/70">
        <Server className="w-4 h-4 animate-pulse" />
        <span>Checking connection...</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 text-sm">
      {isConnected ? (
        <>
          <Wifi className="w-4 h-4 text-success" />
          <span className="text-success">Backend Connected</span>
        </>
      ) : (
        <>
          <WifiOff className="w-4 h-4 text-error" />
          <span className="text-error">Backend Disconnected</span>
          <button
            className="btn btn-xs btn-ghost"
            onClick={checkConnection}
            disabled={isChecking}
          >
            {isChecking ? 'Checking...' : 'Retry'}
          </button>
        </>
      )}
    </div>
  );
};

export default ConnectionStatus;

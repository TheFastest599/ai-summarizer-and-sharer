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
      <div className="flex items-center gap-2 text-xs text-white/70">
        <Server className="w-3 h-3 animate-pulse" />
        <span>Checking...</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 text-xs">
      {isConnected ? (
        <>
          <Wifi className="w-3 h-3 text-green-300" />
          <span className="text-white/90">Connected</span>
        </>
      ) : (
        <>
          <WifiOff className="w-3 h-3 text-red-300" />
          <span className="text-red-200">Offline</span>
          <button
            className="btn btn-xs btn-ghost text-white/70 hover:text-white"
            onClick={checkConnection}
            disabled={isChecking}
          >
            {isChecking ? '...' : 'Retry'}
          </button>
        </>
      )}
    </div>
  );
};

export default ConnectionStatus;

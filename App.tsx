import React, { useState, useEffect } from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import Dashboard from './components/Dashboard';
import { I18nProvider } from './contexts/I18nContext';

function App(): React.ReactNode {
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const storedName = localStorage.getItem('zenflow_username');
    if (storedName) {
      setUserName(storedName);
    }
  }, []);

  const handleLogin = (name: string) => {
    const trimmedName = name.trim();
    if (trimmedName) {
      localStorage.setItem('zenflow_username', trimmedName);
      setUserName(trimmedName);
    }
  };

  const handleLogout = () => {
      localStorage.removeItem('zenflow_username');
      // Force a full page reload to clear any lingering in-memory state
      window.location.reload();
  }

  return (
    <I18nProvider>
        <div className="min-h-screen bg-cover bg-center bg-fixed transition-all duration-1000" style={{ backgroundImage: "url('https://picsum.photos/1920/1080?grayscale&blur=5')" }}>
          <div className="min-h-screen w-full bg-slate-900/70 backdrop-blur-md flex items-center justify-center p-4">
            {userName ? <Dashboard userName={userName} onLogout={handleLogout} /> : <WelcomeScreen onLogin={handleLogin} />}
          </div>
        </div>
    </I18nProvider>
  );
}

export default App;

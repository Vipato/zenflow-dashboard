import React, { useState } from 'react';
import { Sparkles, LogIn } from 'lucide-react';
import { useI18n } from '../contexts/I18nContext';

interface WelcomeScreenProps {
  onLogin: (name: string) => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onLogin }) => {
  const [name, setName] = useState('');
  const { t } = useI18n();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onLogin(name);
    }
  };

  return (
    <div className="text-center bg-slate-800/50 backdrop-blur-lg p-8 rounded-2xl shadow-2xl max-w-md w-full animate-fade-in">
      <div className="flex justify-center items-center mb-4">
        <Sparkles className="h-12 w-12 text-cyan-400" />
        <h1 className="text-5xl font-bold text-slate-100 ml-3">{t('welcomeTitle')}</h1>
      </div>
      <p className="text-slate-300 mb-8 text-lg">{t('welcomeSubtitle')}</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name-input" className="sr-only">{t('namePlaceholder')}</label>
          <input
            id="name-input"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t('namePlaceholder')}
            className="w-full px-4 py-3 bg-slate-700 border-2 border-slate-600 rounded-lg text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-all"
          />
        </div>
        <button
          id="login-btn"
          type="submit"
          disabled={!name.trim()}
          className="w-full mt-4 bg-cyan-500 hover:bg-cyan-400 disabled:bg-slate-600 disabled:cursor-not-allowed text-slate-900 font-bold py-3 px-4 rounded-lg flex items-center justify-center transition-all transform hover:scale-105"
        >
          <LogIn className="mr-2 h-5 w-5" />
          {t('enterDashboard')}
        </button>
      </form>
    </div>
  );
};

export default WelcomeScreen;

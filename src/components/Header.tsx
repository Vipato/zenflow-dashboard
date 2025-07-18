import React, { useState, useEffect } from 'react';
import { Settings, BookOpen, LogOut } from 'lucide-react';
import { getInspirationalQuote } from '../services/aiService';
import { useI18n } from '../contexts/I18nContext';

interface HeaderProps {
    userName: string;
    onOpenSettings: () => void;
    onOpenHistory: () => void;
    onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ userName, onOpenSettings, onOpenHistory, onLogout }) => {
    const { t, lang, setLang } = useI18n();
    const [greeting, setGreeting] = useState('');
    const [quote, setQuote] = useState<string>(t('loadingQuote'));

    useEffect(() => {
        const hours = new Date().getHours();
        if (hours < 12) setGreeting(t('goodMorning'));
        else if (hours < 18) setGreeting(t('goodAfternoon'));
        else setGreeting(t('goodEvening'));
    }, [lang, t]);

    useEffect(() => {
        setQuote(t('loadingQuote'));
        getInspirationalQuote(lang).then(setQuote);
    }, [lang, t]);

    return (
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div>
                <h1 className="text-4xl font-bold text-slate-100">{greeting}, {userName}.</h1>
                <p className="text-slate-300 italic mt-1">"{quote}"</p>
            </div>
            <div className="flex items-center space-x-2 mt-4 sm:mt-0">
                <div className="flex items-center bg-slate-800/70 rounded-full p-1 space-x-1">
                  <button 
                    onClick={() => setLang('pt')} 
                    className={`p-1 text-lg rounded-full transition-all transform ${lang === 'pt' ? 'bg-slate-600 scale-110' : 'hover:bg-slate-700 opacity-70'}`} 
                    title="Mudar para Português"
                  >
                    🇧🇷
                  </button>
                  <button 
                    onClick={() => setLang('en')} 
                    className={`p-1 text-lg rounded-full transition-all transform ${lang === 'en' ? 'bg-slate-600 scale-110' : 'hover:bg-slate-700 opacity-70'}`} 
                    title="Switch to English"
                  >
                    🇬🇧
                  </button>
                </div>
                <button onClick={onOpenSettings} className="p-2 bg-slate-800/70 hover:bg-slate-700 rounded-full transition-colors" aria-label={t('settings')}>
                    <Settings className="h-5 w-5 text-slate-300" />
                </button>
                <button onClick={onOpenHistory} className="p-2 bg-slate-800/70 hover:bg-slate-700 rounded-full transition-colors" aria-label={t('history')}>
                    <BookOpen className="h-5 w-5 text-slate-300" />
                </button>
                 <button onClick={onLogout} className="p-2 bg-slate-800/70 hover:bg-slate-700 rounded-full transition-colors" aria-label={t('logout')}>
                    <LogOut className="h-5 w-5 text-red-400" />
                </button>
            </div>
        </header>
    );
};

export default Header;

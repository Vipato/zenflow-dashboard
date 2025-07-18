import React, { useState, useEffect } from 'react';
import { BrainCircuit, Loader } from 'lucide-react';
import { organizeBrainDump } from '../services/aiService';
import { useI18n } from '../contexts/I18nContext';

interface BrainDumpWidgetProps {}

const WidgetCard: React.FC<{ title: string; children: React.ReactNode; className?: string }> = ({ title, children, className }) => (
    <div className={`bg-slate-800/50 backdrop-blur-lg p-6 rounded-2xl shadow-lg h-full flex flex-col ${className}`}>
        <h2 className="text-xl font-bold text-slate-200 mb-4">{title}</h2>
        {children}
    </div>
);

const BrainDumpWidget: React.FC<BrainDumpWidgetProps> = () => {
    const [text, setText] = useState(() => localStorage.getItem('zenflow_braindump') || '');
    const [isOrganizing, setIsOrganizing] = useState(false);
    const { t, lang } = useI18n();

    useEffect(() => {
        const handler = setTimeout(() => {
            localStorage.setItem('zenflow_braindump', text);
        }, 500);
        return () => clearTimeout(handler);
    }, [text]);

    const handleOrganize = async () => {
        setIsOrganizing(true);
        const organizedText = await organizeBrainDump(text, lang);
        setText(organizedText);
        setIsOrganizing(false);
    };

    return (
        <WidgetCard title={t('brainDumpWidgetTitle')}>
            <textarea
                id="brain-dump-area"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder={t('brainDumpPlaceholder')}
                className="w-full h-40 flex-grow bg-slate-900/70 p-3 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all text-sm resize-none"
            />
            <button
                onClick={handleOrganize}
                disabled={isOrganizing || !text.trim()}
                className="mt-4 w-full bg-fuchsia-500 hover:bg-fuchsia-400 text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center transition-all disabled:bg-slate-600"
            >
                {isOrganizing ? <Loader className="animate-spin mr-2 h-5 w-5" /> : <BrainCircuit className="mr-2 h-5 w-5" />}
                {isOrganizing ? t('organizing') : t('organizeWithAI')}
            </button>
        </WidgetCard>
    );
};

export default BrainDumpWidget;
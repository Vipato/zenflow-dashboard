import React from 'react';
import { Settings } from '../types';
import { X } from 'lucide-react';
import { useI18n } from '../contexts/I18nContext';

interface SettingsModalProps {
    settings: Settings;
    setSettings: React.Dispatch<React.SetStateAction<Settings>>;
    onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ settings, setSettings, onClose }) => {
    const { t } = useI18n();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSettings(prev => ({ ...prev, [name]: Number(value) }));
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in-fast">
            <div className="bg-slate-800 p-8 rounded-2xl shadow-2xl w-full max-w-md relative">
                <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white">
                    <X />
                </button>
                <h2 className="text-2xl font-bold mb-6 text-slate-100">{t('settingsModalTitle')}</h2>
                <div className="space-y-4">
                    <div>
                        <label htmlFor="focusDuration" className="block text-sm font-medium text-slate-300">{t('focusDurationLabel')}</label>
                        <input
                            type="number"
                            id="focusDuration"
                            name="focusDuration"
                            value={settings.focusDuration}
                            onChange={handleInputChange}
                            className="mt-1 block w-full bg-slate-700 border-slate-600 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="shortBreakDuration" className="block text-sm font-medium text-slate-300">{t('shortBreakLabel')}</label>
                        <input
                            type="number"
                            id="shortBreakDuration"
                            name="shortBreakDuration"
                            value={settings.shortBreakDuration}
                            onChange={handleInputChange}
                            className="mt-1 block w-full bg-slate-700 border-slate-600 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="longBreakDuration" className="block text-sm font-medium text-slate-300">{t('longBreakLabel')}</label>
                        <input
                            type="number"
                            id="longBreakDuration"
                            name="longBreakDuration"
                            value={settings.longBreakDuration}
                            onChange={handleInputChange}
                            className="mt-1 block w-full bg-slate-700 border-slate-600 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        />
                    </div>
                </div>
                <button onClick={onClose} className="mt-6 w-full bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold py-2 px-4 rounded-lg">
                    {t('close')}
                </button>
            </div>
        </div>
    );
};

export default SettingsModal;

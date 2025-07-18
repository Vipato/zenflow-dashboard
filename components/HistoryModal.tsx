import React from 'react';
import { HistoryEntry } from '../types';
import { X, Trash2 } from 'lucide-react';
import { useI18n } from '../contexts/I18nContext';

interface HistoryModalProps {
    history: HistoryEntry[];
    onClose: () => void;
    onClear: () => void;
}

const HistoryModal: React.FC<HistoryModalProps> = ({ history, onClose, onClear }) => {
    const { t } = useI18n();

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in-fast">
            <div className="bg-slate-800 p-8 rounded-2xl shadow-2xl w-full max-w-2xl relative flex flex-col" style={{height: '80vh'}}>
                <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white">
                    <X />
                </button>
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-slate-100">{t('historyModalTitle')}</h2>
                    {history.length > 0 && (
                        <button onClick={onClear} className="text-sm text-red-400 hover:text-red-300 flex items-center gap-1">
                            <Trash2 size={16} /> {t('clearAll')}
                        </button>
                    )}
                </div>

                <div className="flex-grow overflow-y-auto pr-4">
                    {history.length > 0 ? (
                        <ul className="space-y-3">
                            {history.map(entry => (
                                <li key={entry.id} className="bg-slate-700/50 p-4 rounded-lg">
                                    <div className="flex justify-between items-center">
                                        <p className="font-semibold text-slate-200">{new Date(entry.date).toLocaleDateString()}</p>
                                        <p className="text-sm text-cyan-400">{entry.duration} {t('historyEntryFocus')}</p>
                                    </div>
                                    <p className="text-sm text-slate-400 mt-1">{t('historyEntryTasks')}: {entry.taskSummary}</p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="text-center py-10">
                            <p className="text-slate-400">{t('historyEmpty')}</p>
                            <p className="text-sm text-slate-500">{t('historyEmptySub')}</p>
                        </div>
                    )}
                </div>
                 <button onClick={onClose} className="mt-6 w-full bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold py-2 px-4 rounded-lg">
                    {t('close')}
                </button>
            </div>
        </div>
    );
};

export default HistoryModal;

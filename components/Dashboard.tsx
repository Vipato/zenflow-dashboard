import React, { useState, useEffect, useCallback } from 'react';
import Header from './Header';
import TimerWidget from './TimerWidget';
import FocusListWidget from './FocusListWidget';
import BrainDumpWidget from './BrainDumpWidget';
import SettingsModal from './SettingsModal';
import HistoryModal from './HistoryModal';
import { Settings, HistoryEntry, FocusTask, TimerMode } from '../types';
import { useI18n } from '../contexts/I18nContext';

interface DashboardProps {
    userName: string;
    onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ userName, onLogout }) => {
    const [settings, setSettings] = useState<Settings>(() => {
        const saved = localStorage.getItem('zenflow_settings');
        const parsed = saved ? JSON.parse(saved) : {};
        return { 
            focusDuration: parsed.focusDuration || 25, 
            shortBreakDuration: parsed.shortBreakDuration || 5, 
            longBreakDuration: parsed.longBreakDuration || 15,
        };
    });

    const [history, setHistory] = useState<HistoryEntry[]>(() => {
        const saved = localStorage.getItem('zenflow_history');
        return saved ? JSON.parse(saved) : [];
    });
    
    const [focusTasks, setFocusTasks] = useState<FocusTask[]>(() => {
        const saved = localStorage.getItem('zenflow_focustasks');
        return saved ? JSON.parse(saved) : [];
    });

    const [isSettingsModalOpen, setSettingsModalOpen] = useState(false);
    const [isHistoryModalOpen, setHistoryModalOpen] = useState(false);
    
    const { t } = useI18n();

    useEffect(() => {
        localStorage.setItem('zenflow_settings', JSON.stringify(settings));
    }, [settings]);

    useEffect(() => {
        localStorage.setItem('zenflow_history', JSON.stringify(history));
    }, [history]);

    useEffect(() => {
        localStorage.setItem('zenflow_focustasks', JSON.stringify(focusTasks));
    }, [focusTasks]);


    const addHistoryEntry = useCallback((duration: number, mode: TimerMode) => {
        if (mode !== TimerMode.Focus) return;

        const completedTasks = focusTasks.filter(t => t.completed).map(t => t.text).join(', ');
        const summary = completedTasks || t('generalFocusSession');

        const newEntry: HistoryEntry = {
            id: Date.now(),
            date: new Date().toISOString(),
            duration,
            taskSummary: summary,
        };
        setHistory(prev => [newEntry, ...prev]);
        setFocusTasks(prev => prev.filter(t => !t.completed));
    }, [focusTasks, t]);

    return (
        <div className="w-full max-w-7xl mx-auto animate-fade-in">
            <Header 
                userName={userName}
                onOpenSettings={() => setSettingsModalOpen(true)}
                onOpenHistory={() => setHistoryModalOpen(true)}
                onLogout={onLogout}
            />
            <main className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                <TimerWidget settings={settings} addHistoryEntry={addHistoryEntry} />
                <FocusListWidget tasks={focusTasks} setTasks={setFocusTasks} />
                <div className="lg:col-span-2">
                    <BrainDumpWidget />
                </div>
            </main>
            
            {isSettingsModalOpen && (
                <SettingsModal 
                    settings={settings}
                    setSettings={setSettings}
                    onClose={() => setSettingsModalOpen(false)}
                />
            )}

            {isHistoryModalOpen && (
                <HistoryModal 
                    history={history}
                    onClose={() => setHistoryModalOpen(false)}
                    onClear={() => setHistory([])}
                />
            )}
        </div>
    );
};

export default Dashboard;

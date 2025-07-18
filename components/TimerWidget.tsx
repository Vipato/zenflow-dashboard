import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Settings, TimerMode } from '../types';
import { Play, Pause, RefreshCw } from 'lucide-react';
import { useI18n } from '../contexts/I18nContext';

interface TimerWidgetProps {
    settings: Settings;
    addHistoryEntry: (duration: number, mode: TimerMode) => void;
}

const WidgetCard: React.FC<{ title: string; children: React.ReactNode; className?: string }> = ({ title, children, className }) => (
    <div className={`bg-slate-800/50 backdrop-blur-lg p-6 rounded-2xl shadow-lg h-full ${className}`}>
        <h2 className="text-xl font-bold text-slate-200 mb-4">{title}</h2>
        {children}
    </div>
);

const TimerWidget: React.FC<TimerWidgetProps> = ({ settings, addHistoryEntry }) => {
    const { t } = useI18n();
    const [mode, setMode] = useState<TimerMode>(TimerMode.Focus);
    const [timeLeft, setTimeLeft] = useState(settings.focusDuration * 60);
    const [isActive, setIsActive] = useState(false);
    const [cycles, setCycles] = useState(0);

    const timerEndSoundRef = useRef<HTMLAudioElement | null>(null);

    const getModeName = (m: TimerMode) => {
        switch(m) {
            case TimerMode.Focus: return t('timerModeFocus');
            case TimerMode.ShortBreak: return t('timerModeShortBreak');
            case TimerMode.LongBreak: return t('timerModeLongBreak');
            default: return m;
        }
    }

    useEffect(() => {
        timerEndSoundRef.current = document.getElementById('timer-end-sound') as HTMLAudioElement;
    }, []);

    const getDuration = useCallback((m: TimerMode) => {
        switch (m) {
            case TimerMode.Focus: return settings.focusDuration * 60;
            case TimerMode.ShortBreak: return settings.shortBreakDuration * 60;
            case TimerMode.LongBreak: return settings.longBreakDuration * 60;
            default: return settings.focusDuration * 60;
        }
    }, [settings]);

    const switchMode = useCallback((nextMode: TimerMode) => {
        if (mode === TimerMode.Focus) {
             addHistoryEntry(settings.focusDuration, mode);
        }
        setMode(nextMode);
        setTimeLeft(getDuration(nextMode));
        setIsActive(false);
        if(nextMode === TimerMode.Focus){
            setCycles(prev => prev + 1);
        }
    }, [addHistoryEntry, getDuration, mode, settings.focusDuration]);

    useEffect(() => {
        setTimeLeft(getDuration(mode));
    }, [settings, mode, getDuration]);

    useEffect(() => {
        let interval: ReturnType<typeof setTimeout> | null = null;
        if (isActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft(prev => prev - 1);
            }, 1000);
        } else if (isActive && timeLeft === 0) {
            if (timerEndSoundRef.current) {
                timerEndSoundRef.current.play();
            }
            if (mode === TimerMode.Focus) {
                const nextBreak = (cycles + 1) % 4 === 0 ? TimerMode.LongBreak : TimerMode.ShortBreak;
                switchMode(nextBreak);
            } else {
                switchMode(TimerMode.Focus);
            }
        }
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isActive, timeLeft, mode, cycles, switchMode]);

    useEffect(() => {
        document.title = `${Math.floor(timeLeft / 60).toString().padStart(2, '0')}:${(timeLeft % 60).toString().padStart(2, '0')} | ZenFlow`;
    }, [timeLeft]);

    const toggleTimer = () => setIsActive(!isActive);
    
    const resetTimer = () => {
        setIsActive(false);
        setTimeLeft(getDuration(mode));
    };

    const handleModeChange = (newMode: TimerMode) => {
        setMode(newMode);
        setTimeLeft(getDuration(newMode));
        setIsActive(false);
    };

    const progress = (getDuration(mode) - timeLeft) / getDuration(mode);

    return (
        <WidgetCard title={t('timerWidgetTitle')} className="flex flex-col">
            <div className="flex justify-center space-x-2 mb-6">
                {Object.values(TimerMode).map(m => (
                    <button key={m} onClick={() => handleModeChange(m)} className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${mode === m ? 'bg-cyan-500 text-slate-900' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}>{getModeName(m)}</button>
                ))}
            </div>
            <div className="relative flex-grow flex items-center justify-center">
                <svg className="w-64 h-64 transform -rotate-90">
                    <circle cx="128" cy="128" r="110" strokeWidth="12" className="text-slate-700" fill="transparent" />
                    <circle cx="128" cy="128" r="110" strokeWidth="12" className="text-cyan-400" fill="transparent" strokeLinecap="round" style={{ strokeDasharray: 2 * Math.PI * 110, strokeDashoffset: (2 * Math.PI * 110) * (1 - progress) }} />
                </svg>
                <div className="absolute text-6xl font-mono font-bold text-slate-100">
                    {Math.floor(timeLeft / 60).toString().padStart(2, '0')}:{(timeLeft % 60).toString().padStart(2, '0')}
                </div>
            </div>
            <div className="flex justify-center space-x-4 mt-6">
                <button onClick={toggleTimer} className="w-28 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold py-3 px-4 rounded-lg flex items-center justify-center transition-all transform hover:scale-105">
                    {isActive ? <Pause className="mr-2"/> : <Play className="mr-2" />}
                    {isActive ? t('timerPause') : t('timerStart')}
                </button>
                <button onClick={resetTimer} className="w-28 bg-slate-600 hover:bg-slate-500 text-slate-100 font-bold py-3 px-4 rounded-lg flex items-center justify-center transition-all">
                    <RefreshCw className="mr-2" />
                    {t('timerReset')}
                </button>
            </div>
        </WidgetCard>
    );
};

export default TimerWidget;
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

type Lang = 'en' | 'pt';

const translations = {
  en: {
    // Welcome Screen
    welcomeTitle: "ZenFlow",
    welcomeSubtitle: "Your personal dashboard for focus and productivity.",
    namePlaceholder: "What should we call you?",
    enterDashboard: "Enter Dashboard",
    
    // Header
    goodMorning: "Good morning",
    goodAfternoon: "Good afternoon",
    goodEvening: "Good evening",
    loadingQuote: "Loading quote...",
    settings: "Settings",
    history: "History",
    logout: "Logout",
    
    // Timer Widget
    timerWidgetTitle: "Pomodoro Timer",
    timerModeFocus: "Focus",
    timerModeShortBreak: "Short Break",
    timerModeLongBreak: "Long Break",
    timerStart: "Start",
    timerPause: "Pause",
    timerReset: "Reset",
    
    // Focus List Widget
    focusListWidgetTitle: "Focus List",
    goalPlaceholder: "Enter a goal...",
    suggestTasks: "Suggest tasks with AI",
    addTaskPlaceholder: "Add a new task...",
    
    // Brain Dump Widget
    brainDumpWidgetTitle: "Brain Dump",
    brainDumpPlaceholder: "Clear your mind. Jot down anything here...",
    organizeWithAI: "Organize with AI",
    organizing: "Organizing...",
    
    // Settings Modal
    settingsModalTitle: "Settings",
    focusDurationLabel: "Focus Duration (minutes)",
    shortBreakLabel: "Short Break (minutes)",
    longBreakLabel: "Long Break (minutes)",
    close: "Close",
    
    // History Modal
    historyModalTitle: "Session History",
    clearAll: "Clear All",
    historyEmpty: "No completed focus sessions yet.",
    historyEmptySub: "Finish a focus timer to see it here.",
    historyEntryFocus: "min focus",
    historyEntryTasks: "Tasks",
    generalFocusSession: "General focus session",
  },
  pt: {
    // Welcome Screen
    welcomeTitle: "ZenFlow",
    welcomeSubtitle: "Seu painel pessoal para foco e produtividade.",
    namePlaceholder: "Como devemos chamar você?",
    enterDashboard: "Entrar no Painel",

    // Header
    goodMorning: "Bom dia",
    goodAfternoon: "Boa tarde",
    goodEvening: "Boa noite",
    loadingQuote: "Carregando citação...",
    settings: "Configurações",
    history: "Histórico",
    logout: "Sair",
    
    // Timer Widget
    timerWidgetTitle: "Cronômetro Pomodoro",
    timerModeFocus: "Foco",
    timerModeShortBreak: "Pausa Curta",
    timerModeLongBreak: "Pausa Longa",
    timerStart: "Iniciar",
    timerPause: "Pausar",
    timerReset: "Resetar",
    
    // Focus List Widget
    focusListWidgetTitle: "Lista de Foco",
    goalPlaceholder: "Digite um objetivo...",
    suggestTasks: "Sugerir tarefas com IA",
    addTaskPlaceholder: "Adicionar nova tarefa...",
    
    // Brain Dump Widget
    brainDumpWidgetTitle: "Despejo de Ideias",
    brainDumpPlaceholder: "Limpe sua mente. Anote qualquer coisa aqui...",
    organizeWithAI: "Organizar com IA",
    organizing: "Organizando...",

    // Settings Modal
    settingsModalTitle: "Configurações",
    focusDurationLabel: "Duração do Foco (minutos)",
    shortBreakLabel: "Pausa Curta (minutos)",
    longBreakLabel: "Pausa Longa (minutos)",
    close: "Fechar",
    
    // History Modal
    historyModalTitle: "Histórico de Sessões",
    clearAll: "Limpar Tudo",
    historyEmpty: "Nenhuma sessão de foco completada ainda.",
    historyEmptySub: "Termine um cronômetro de foco para vê-lo aqui.",
    historyEntryFocus: "min de foco",
    historyEntryTasks: "Tarefas",
    generalFocusSession: "Sessão de foco geral",
  }
};

type TranslationKey = keyof typeof translations.en;

interface I18nContextType {
    lang: Lang;
    setLang: (lang: Lang) => void;
    t: (key: TranslationKey) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export const I18nProvider = ({ children }: { children: ReactNode }) => {
    const [lang, setLangState] = useState<Lang>(() => (localStorage.getItem('zenflow_lang') as Lang) || 'pt');

    useEffect(() => {
        localStorage.setItem('zenflow_lang', lang);
        document.documentElement.lang = lang;
    }, [lang]);

    const setLang = (newLang: Lang) => {
        setLangState(newLang);
    };

    const t = (key: TranslationKey): string => {
        return translations[lang][key] || translations.en[key];
    };

    return (
        <I18nContext.Provider value={{ lang, setLang, t }}>
            {children}
        </I18nContext.Provider>
    );
};

export const useI18n = (): I18nContextType => {
    const context = useContext(I18nContext);
    if (!context) {
        throw new Error('useI18n must be used within an I18nProvider');
    }
    return context;
};

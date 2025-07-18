import React, { useState } from 'react';
import { FocusTask } from '../types';
import { Plus, Trash2, Sparkles, Loader } from 'lucide-react';
import { suggestFocusTasks } from '../services/aiService';
import { useI18n } from '../contexts/I18nContext';

interface FocusListWidgetProps {
    tasks: FocusTask[];
    setTasks: React.Dispatch<React.SetStateAction<FocusTask[]>>;
}

const WidgetCard: React.FC<{ title: string; children: React.ReactNode; className?: string }> = ({ title, children, className }) => (
    <div className={`bg-slate-800/50 backdrop-blur-lg p-6 rounded-2xl shadow-lg h-full flex flex-col ${className}`}>
        <h2 className="text-xl font-bold text-slate-200 mb-4">{title}</h2>
        {children}
    </div>
);

const FocusListWidget: React.FC<FocusListWidgetProps> = ({ tasks, setTasks }) => {
    const [newTask, setNewTask] = useState('');
    const [goal, setGoal] = useState('');
    const [isSuggesting, setIsSuggesting] = useState(false);
    const { t, lang } = useI18n();

    const handleAddTask = (e: React.FormEvent) => {
        e.preventDefault();
        if (newTask.trim()) {
            setTasks(prev => [...prev, { id: Date.now(), text: newTask.trim(), completed: false }]);
            setNewTask('');
        }
    };

    const toggleTask = (id: number) => {
        setTasks(prev => prev.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
    };

    const deleteTask = (id: number) => {
        setTasks(prev => prev.filter(task => task.id !== id));
    };
    
    const handleSuggestTasks = async () => {
        if (!goal.trim()) return;
        setIsSuggesting(true);
        const suggested = await suggestFocusTasks(goal, lang);
        const newTasks: FocusTask[] = suggested.map(text => ({ id: Date.now() + Math.random(), text, completed: false }));
        setTasks(prev => [...prev, ...newTasks]);
        setIsSuggesting(false);
        setGoal('');
    };

    return (
        <WidgetCard title={t('focusListWidgetTitle')}>
            <div className="flex gap-2 mb-4">
                <input
                    type="text"
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
                    placeholder={t('goalPlaceholder')}
                    className="flex-grow bg-slate-700 border-slate-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
                <button 
                    onClick={handleSuggestTasks} 
                    disabled={isSuggesting || !goal.trim()} 
                    className="bg-fuchsia-500 hover:bg-fuchsia-400 text-white font-bold px-3 py-2 rounded-lg flex items-center disabled:bg-slate-600"
                    title={t('suggestTasks')}
                >
                    {isSuggesting ? <Loader className="animate-spin h-5 w-5" /> : <Sparkles className="h-5 w-5" />}
                </button>
            </div>

            <form onSubmit={handleAddTask} className="flex gap-2 mb-4">
                <input
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder={t('addTaskPlaceholder')}
                    className="flex-grow bg-slate-700 border-slate-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
                <button type="submit" className="bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold px-3 py-2 rounded-lg flex items-center">
                    <Plus className="h-5 w-5" />
                </button>
            </form>
            <ul className="space-y-2 overflow-y-auto flex-grow pr-2">
                {tasks.map(task => (
                    <li key={task.id} className="flex items-center bg-slate-700/50 p-3 rounded-lg group">
                        <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => toggleTask(task.id)}
                            className="h-5 w-5 rounded bg-slate-600 border-slate-500 text-cyan-500 focus:ring-cyan-500 cursor-pointer"
                        />
                        <span className={`ml-3 flex-grow ${task.completed ? 'line-through text-slate-500' : 'text-slate-200'}`}>{task.text}</span>
                        <button onClick={() => deleteTask(task.id)} className="ml-2 text-slate-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Trash2 className="h-4 w-4" />
                        </button>
                    </li>
                ))}
            </ul>
        </WidgetCard>
    );
};

export default FocusListWidget;

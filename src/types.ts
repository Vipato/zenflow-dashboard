export interface FocusTask {
  id: number;
  text: string;
  completed: boolean;
}

export enum TimerMode {
  Focus = 'Focus',
  ShortBreak = 'ShortBreak',
  LongBreak = 'LongBreak',
}

export interface Settings {
  focusDuration: number;
  shortBreakDuration: number;
  longBreakDuration: number;
}

export interface HistoryEntry {
  id: number;
  date: string;
  duration: number;
  taskSummary: string;
}

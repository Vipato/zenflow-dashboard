type Language = 'en' | 'pt';

const quotes = {
  en: [
    "The secret of getting ahead is getting started.",
    "The best way to predict the future is to create it.",
    "Don't watch the clock; do what it does. Keep going.",
    "The only way to do great work is to love what you do.",
    "Either you run the day, or the day runs you.",
  ],
  pt: [
    "O segredo para progredir é começar.",
    "A melhor forma de prever o futuro é criá-lo.",
    "Não observe o relógio; faça o que ele faz. Continue em frente.",
    "A única maneira de fazer um ótimo trabalho é amar o que você faz.",
    "Ou você corre o dia, ou o dia corre você.",
  ]
};

export const getInspirationalQuote = async (lang: Language): Promise<string> => {
  const langQuotes = quotes[lang];
  const randomIndex = Math.floor(Math.random() * langQuotes.length);
  // Simulate network delay for a better user experience
  await new Promise(resolve => setTimeout(resolve, 200));
  return langQuotes[randomIndex];
};

const suggestedTasks = {
    en: [
        "Break the main goal into smaller, manageable steps.",
        "Identify the single most important task to do first.",
        "Allocate a specific time block for this goal.",
        "Eliminate distractions during your work session.",
        "Review your progress at the end of the session."
    ],
    pt: [
        "Divida o objetivo principal em passos menores e gerenciáveis.",
        "Identifique a tarefa mais importante para fazer primeiro.",
        "Aloque um bloco de tempo específico para este objetivo.",
        "Elimine as distrações durante sua sessão de trabalho.",
        "Revise seu progresso no final da sessão."
    ]
}

export const suggestFocusTasks = async (goal: string, lang: Language): Promise<string[]> => {
  if (!goal) return [];
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  // Return generic tasks, ignoring the specific goal
  return suggestedTasks[lang];
};

export const organizeBrainDump = async (text: string, lang: Language): Promise<string> => {
  if (!text.trim()) return "";
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const lines = text.trim().split('\n').filter(line => line.trim() !== '');
  
  const header = lang === 'pt' ? 'Itens Organizados:' : 'Organized Items:';

  const organizedText = lines.map(line => `• ${line.trim()}`).join('\n');
  
  return `${header}\n${organizedText}`;
};
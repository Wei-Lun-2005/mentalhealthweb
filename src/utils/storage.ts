export const storage = {
  getMoodEntries: (): any[] => {
    const data = localStorage.getItem('moodEntries');
    return data ? JSON.parse(data) : [];
  },
  
  saveMoodEntry: (entry: any) => {
    const entries = storage.getMoodEntries();
    entries.unshift(entry);
    localStorage.setItem('moodEntries', JSON.stringify(entries));
  },
  
  getJournalEntries: (): any[] => {
    const data = localStorage.getItem('journalEntries');
    return data ? JSON.parse(data) : [];
  },
  
  saveJournalEntry: (entry: any) => {
    const entries = storage.getJournalEntries();
    entries.unshift(entry);
    localStorage.setItem('journalEntries', JSON.stringify(entries));
  },
  
  deleteJournalEntry: (id: string) => {
    const entries = storage.getJournalEntries();
    const filtered = entries.filter(e => e.id !== id);
    localStorage.setItem('journalEntries', JSON.stringify(filtered));
  }
};

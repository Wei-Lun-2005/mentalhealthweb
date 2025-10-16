export interface MoodEntry {
  id: string;
  mood: 'great' | 'good' | 'okay' | 'bad' | 'terrible';
  note: string;
  timestamp: number;
}

export interface JournalEntry {
  id: string;
  title: string;
  content: string;
  timestamp: number;
  tags: string[];
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  category: 'crisis' | 'therapy' | 'meditation' | 'exercise' | 'reading';
  link: string;
}

import React, { useState, useEffect } from 'react';
import { Smile, Meh, Frown, TrendingUp } from 'lucide-react';
import { storage } from '../utils/storage';
import { MoodEntry } from '../types';

const MoodTracker: React.FC = () => {
  const [selectedMood, setSelectedMood] = useState<string>('');
  const [note, setNote] = useState('');
  const [entries, setEntries] = useState<MoodEntry[]>([]);

  useEffect(() => {
    setEntries(storage.getMoodEntries());
  }, []);

  const moods = [
    { value: 'great', label: 'GREAT', emoji: '😄', color: 'bg-neo-green' },
    { value: 'good', label: 'GOOD', emoji: '🙂', color: 'bg-neo-cyan' },
    { value: 'okay', label: 'OKAY', emoji: '😐', color: 'bg-neo-yellow' },
    { value: 'bad', label: 'BAD', emoji: '😟', color: 'bg-neo-purple' },
    { value: 'terrible', label: 'TERRIBLE', emoji: '😢', color: 'bg-neo-pink' }
  ];

  const handleSubmit = () => {
    if (!selectedMood) return;

    const entry: MoodEntry = {
      id: Date.now().toString(),
      mood: selectedMood as any,
      note,
      timestamp: Date.now()
    };

    storage.saveMoodEntry(entry);
    setEntries([entry, ...entries]);
    setSelectedMood('');
    setNote('');
  };

  const getMoodStats = () => {
    const last7Days = entries.slice(0, 7);
    const moodCounts = last7Days.reduce((acc, entry) => {
      acc[entry.mood] = (acc[entry.mood] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return moodCounts;
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-neo-cyan neo-border-thick neo-shadow-lg p-6 mb-6">
        <h2 className="text-3xl font-bold mb-2 flex items-center gap-3">
          <TrendingUp className="w-8 h-8" />
          HOW ARE YOU FEELING TODAY?
        </h2>
      </div>

      <div className="bg-white neo-border-thick neo-shadow p-6 mb-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          {moods.map(mood => (
            <button
              key={mood.value}
              onClick={() => setSelectedMood(mood.value)}
              className={`${mood.color} neo-border-thick p-4 transition-all ${
                selectedMood === mood.value
                  ? 'neo-shadow-lg scale-105'
                  : 'neo-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none'
              }`}
            >
              <div className="text-4xl mb-2">{mood.emoji}</div>
              <div className="font-bold">{mood.label}</div>
            </button>
          ))}
        </div>

        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="ADD A NOTE (OPTIONAL)..."
          className="w-full p-4 neo-border-thick mb-4 resize-none h-24 font-mono"
        />

        <button
          onClick={handleSubmit}
          disabled={!selectedMood}
          className={`w-full py-4 font-bold neo-border-thick transition-all ${
            selectedMood
              ? 'bg-black text-neo-green neo-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          LOG MOOD
        </button>
      </div>

      {entries.length > 0 && (
        <div className="bg-white neo-border-thick neo-shadow p-6">
          <h3 className="text-2xl font-bold mb-4">MOOD HISTORY</h3>
          <div className="space-y-3">
            {entries.slice(0, 10).map(entry => {
              const mood = moods.find(m => m.value === entry.mood);
              return (
                <div key={entry.id} className={`${mood?.color} neo-border p-4`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{mood?.emoji}</span>
                      <span className="font-bold">{mood?.label}</span>
                    </div>
                    <span className="text-sm">
                      {new Date(entry.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                  {entry.note && (
                    <p className="text-sm mt-2 bg-white neo-border p-2">{entry.note}</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default MoodTracker;

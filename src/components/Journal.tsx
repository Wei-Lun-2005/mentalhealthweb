import React, { useState, useEffect } from 'react';
import { BookOpen, Plus, Trash2, Calendar } from 'lucide-react';
import { storage } from '../utils/storage';
import { JournalEntry } from '../types';

const Journal: React.FC = () => {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [isWriting, setIsWriting] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedEntry, setSelectedEntry] = useState<JournalEntry | null>(null);

  useEffect(() => {
    setEntries(storage.getJournalEntries());
  }, []);

  const handleSave = () => {
    if (!title.trim() || !content.trim()) return;

    const entry: JournalEntry = {
      id: Date.now().toString(),
      title: title.trim(),
      content: content.trim(),
      timestamp: Date.now(),
      tags: []
    };

    storage.saveJournalEntry(entry);
    setEntries([entry, ...entries]);
    setTitle('');
    setContent('');
    setIsWriting(false);
  };

  const handleDelete = (id: string) => {
    storage.deleteJournalEntry(id);
    setEntries(entries.filter(e => e.id !== id));
    setSelectedEntry(null);
  };

  if (selectedEntry) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <button
          onClick={() => setSelectedEntry(null)}
          className="bg-black text-neo-cyan neo-border-thick neo-shadow px-6 py-3 font-bold mb-6 hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
        >
          ← BACK TO ENTRIES
        </button>

        <div className="bg-white neo-border-thick neo-shadow-lg p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h2 className="text-3xl font-bold mb-2">{selectedEntry.title}</h2>
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="w-4 h-4" />
                {new Date(selectedEntry.timestamp).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
            </div>
            <button
              onClick={() => handleDelete(selectedEntry.id)}
              className="bg-neo-pink text-white neo-border p-3 hover:bg-black transition-colors"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
          <div className="bg-neo-yellow neo-border p-4 whitespace-pre-wrap">
            {selectedEntry.content}
          </div>
        </div>
      </div>
    );
  }

  if (isWriting) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <button
          onClick={() => setIsWriting(false)}
          className="bg-black text-neo-cyan neo-border-thick neo-shadow px-6 py-3 font-bold mb-6 hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
        >
          ← CANCEL
        </button>

        <div className="bg-white neo-border-thick neo-shadow-lg p-6">
          <h2 className="text-3xl font-bold mb-6">NEW JOURNAL ENTRY</h2>
          
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="ENTRY TITLE..."
            className="w-full p-4 neo-border-thick mb-4 font-mono text-xl font-bold"
          />

          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="WRITE YOUR THOUGHTS..."
            className="w-full p-4 neo-border-thick mb-4 resize-none h-96 font-mono"
          />

          <button
            onClick={handleSave}
            disabled={!title.trim() || !content.trim()}
            className={`w-full py-4 font-bold neo-border-thick transition-all ${
              title.trim() && content.trim()
                ? 'bg-neo-green text-black neo-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            SAVE ENTRY
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-neo-purple neo-border-thick neo-shadow-lg p-6 mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <BookOpen className="w-8 h-8 text-white" />
          <h2 className="text-3xl font-bold text-white">YOUR JOURNAL</h2>
        </div>
        <button
          onClick={() => setIsWriting(true)}
          className="bg-neo-yellow text-black neo-border-thick neo-shadow px-6 py-3 font-bold flex items-center gap-2 hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
        >
          <Plus className="w-5 h-5" />
          NEW ENTRY
        </button>
      </div>

      {entries.length === 0 ? (
        <div className="bg-white neo-border-thick neo-shadow p-12 text-center">
          <BookOpen className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <h3 className="text-2xl font-bold mb-2">NO ENTRIES YET</h3>
          <p className="mb-6">Start journaling to track your thoughts and feelings</p>
          <button
            onClick={() => setIsWriting(true)}
            className="bg-black text-neo-cyan neo-border-thick neo-shadow px-8 py-4 font-bold hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
          >
            WRITE YOUR FIRST ENTRY
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {entries.map(entry => (
            <button
              key={entry.id}
              onClick={() => setSelectedEntry(entry)}
              className="bg-white neo-border-thick neo-shadow p-6 text-left hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
            >
              <h3 className="text-xl font-bold mb-2 line-clamp-1">{entry.title}</h3>
              <p className="text-sm mb-3 line-clamp-3">{entry.content}</p>
              <div className="flex items-center gap-2 text-xs bg-neo-cyan neo-border px-3 py-1 inline-block">
                <Calendar className="w-3 h-3" />
                {new Date(entry.timestamp).toLocaleDateString()}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Journal;

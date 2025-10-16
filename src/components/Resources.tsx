import React, { useState } from 'react';
import { ExternalLink, Phone, MessageSquare, Book, Heart, Sparkles } from 'lucide-react';
import { resources } from '../data/resources';

const Resources: React.FC = () => {
  const [filter, setFilter] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'ALL', icon: Sparkles },
    { id: 'crisis', label: 'CRISIS', icon: Phone },
    { id: 'therapy', label: 'THERAPY', icon: Heart },
    { id: 'meditation', label: 'MEDITATION', icon: MessageSquare },
    { id: 'exercise', label: 'EXERCISE', icon: Heart },
    { id: 'reading', label: 'READING', icon: Book }
  ];

  const filteredResources = filter === 'all' 
    ? resources 
    : resources.filter(r => r.category === filter);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'crisis': return 'bg-neo-pink';
      case 'therapy': return 'bg-neo-cyan';
      case 'meditation': return 'bg-neo-green';
      case 'exercise': return 'bg-neo-yellow';
      case 'reading': return 'bg-neo-purple';
      default: return 'bg-white';
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-neo-cyan neo-border-thick neo-shadow-lg p-6 mb-6">
        <h2 className="text-3xl font-bold">MENTAL HEALTH RESOURCES</h2>
        <p className="text-lg mt-2">Professional help and support when you need it</p>
      </div>

      <div className="bg-white neo-border-thick neo-shadow p-6 mb-6">
        <h3 className="text-xl font-bold mb-4">FILTER BY CATEGORY</h3>
        <div className="flex gap-3 flex-wrap">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              className={`px-4 py-2 font-bold neo-border-thick transition-all flex items-center gap-2 ${
                filter === cat.id
                  ? 'bg-black text-neo-green neo-shadow'
                  : 'bg-white hover:bg-neo-yellow'
              }`}
            >
              <cat.icon className="w-4 h-4" />
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredResources.map(resource => (
          <a
            key={resource.id}
            href={resource.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`${getCategoryColor(resource.category)} neo-border-thick neo-shadow p-6 block hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all`}
          >
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-xl font-bold flex-1">{resource.title}</h3>
              <ExternalLink className="w-5 h-5 flex-shrink-0" />
            </div>
            <p className="mb-4">{resource.description}</p>
            <div className="bg-black neo-border px-3 py-1 inline-block">
              <span className="text-neo-cyan font-bold text-sm uppercase">
                {resource.category}
              </span>
            </div>
          </a>
        ))}
      </div>

      <div className="mt-8 bg-neo-pink neo-border-thick neo-shadow-lg p-6 text-white">
        <h3 className="text-2xl font-bold mb-4">EMERGENCY CONTACTS</h3>
        <div className="space-y-3">
          <div className="bg-black neo-border p-4">
            <p className="font-bold text-lg mb-1">NATIONAL SUICIDE PREVENTION LIFELINE</p>
            <p className="text-neo-cyan text-2xl font-bold">988</p>
          </div>
          <div className="bg-black neo-border p-4">
            <p className="font-bold text-lg mb-1">CRISIS TEXT LINE</p>
            <p className="text-neo-cyan text-2xl font-bold">Text HOME to 741741</p>
          </div>
          <div className="bg-black neo-border p-4">
            <p className="font-bold text-lg mb-1">NAMI HELPLINE</p>
            <p className="text-neo-cyan text-2xl font-bold">1-800-950-6264</p>
          </div>
        </div>
        <p className="mt-4 text-sm">
          If you're in immediate danger, call 911 or go to your nearest emergency room.
        </p>
      </div>
    </div>
  );
};

export default Resources;

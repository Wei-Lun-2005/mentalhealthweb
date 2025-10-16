import React from 'react';
import { Heart, BookOpen, Wind, Sparkles } from 'lucide-react';

interface HomeProps {
  onViewChange: (view: string) => void;
}

const Home: React.FC<HomeProps> = ({ onViewChange }) => {
  const features = [
    {
      icon: Heart,
      title: 'TRACK YOUR MOOD',
      description: 'Log how you feel daily and identify patterns',
      color: 'bg-neo-pink',
      view: 'mood'
    },
    {
      icon: BookOpen,
      title: 'JOURNAL',
      description: 'Express your thoughts and feelings freely',
      color: 'bg-neo-cyan',
      view: 'journal'
    },
    {
      icon: Wind,
      title: 'BREATHING EXERCISES',
      description: 'Calm your mind with guided breathing',
      color: 'bg-neo-green',
      view: 'breathe'
    },
    {
      icon: Sparkles,
      title: 'RESOURCES',
      description: 'Access professional help and support',
      color: 'bg-neo-purple',
      view: 'resources'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="bg-neo-yellow neo-border-thick neo-shadow-lg p-8 mb-8">
        <h2 className="text-4xl font-bold mb-4">WELCOME TO YOUR MENTAL HEALTH COMPANION</h2>
        <p className="text-xl">
          Take control of your mental wellness journey. Track, reflect, and grow.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {features.map((feature, index) => (
          <button
            key={index}
            onClick={() => onViewChange(feature.view)}
            className={`${feature.color} neo-border-thick neo-shadow p-6 text-left hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all`}
          >
            <feature.icon className="w-12 h-12 mb-4" />
            <h3 className="text-2xl font-bold mb-2">{feature.title}</h3>
            <p className="text-lg">{feature.description}</p>
          </button>
        ))}
      </div>

      <div className="bg-white neo-border-thick neo-shadow p-6">
        <h3 className="text-2xl font-bold mb-4">CRISIS SUPPORT</h3>
        <div className="space-y-3">
          <div className="bg-neo-pink neo-border p-4">
            <p className="font-bold text-white text-lg">SUICIDE & CRISIS LIFELINE: 988</p>
          </div>
          <div className="bg-black neo-border p-4">
            <p className="font-bold text-neo-cyan text-lg">CRISIS TEXT LINE: Text HOME to 741741</p>
          </div>
          <p className="text-sm mt-4">
            If you're experiencing a mental health crisis, please reach out immediately. You're not alone.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;

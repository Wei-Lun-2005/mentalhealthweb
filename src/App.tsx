import React, { useState } from 'react';
import Header from './components/Header';
import Home from './components/Home';
import MoodTracker from './components/MoodTracker';
import Journal from './components/Journal';
import BreathingExercise from './components/BreathingExercise';
import Resources from './components/Resources';

function App() {
  const [currentView, setCurrentView] = useState('home');

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return <Home onViewChange={setCurrentView} />;
      case 'mood':
        return <MoodTracker />;
      case 'journal':
        return <Journal />;
      case 'breathe':
        return <BreathingExercise />;
      case 'resources':
        return <Resources />;
      default:
        return <Home onViewChange={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header currentView={currentView} onViewChange={setCurrentView} />
      <main className="py-6">
        {renderView()}
      </main>
      <footer className="bg-black neo-border-thick border-b-0 p-6 mt-12">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-neo-cyan font-bold">
            MINDSPACE © 2024 - YOUR MENTAL HEALTH MATTERS
          </p>
          <p className="text-white text-sm mt-2">
            This app is not a substitute for professional medical advice, diagnosis, or treatment.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;

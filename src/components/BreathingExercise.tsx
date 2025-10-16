import React, { useState, useEffect } from 'react';
import { Wind, Play, Pause, RotateCcw } from 'lucide-react';

const BreathingExercise: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [count, setCount] = useState(4);
  const [cycles, setCycles] = useState(0);

  useEffect(() => {
    if (!isActive) return;

    const timer = setInterval(() => {
      setCount(prev => {
        if (prev > 1) return prev - 1;

        // Move to next phase
        if (phase === 'inhale') {
          setPhase('hold');
          return 4;
        } else if (phase === 'hold') {
          setPhase('exhale');
          return 4;
        } else {
          setPhase('inhale');
          setCycles(c => c + 1);
          return 4;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive, phase]);

  const handleReset = () => {
    setIsActive(false);
    setPhase('inhale');
    setCount(4);
    setCycles(0);
  };

  const getPhaseColor = () => {
    switch (phase) {
      case 'inhale': return 'bg-neo-cyan';
      case 'hold': return 'bg-neo-yellow';
      case 'exhale': return 'bg-neo-pink';
    }
  };

  const getPhaseText = () => {
    switch (phase) {
      case 'inhale': return 'BREATHE IN';
      case 'hold': return 'HOLD';
      case 'exhale': return 'BREATHE OUT';
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-neo-green neo-border-thick neo-shadow-lg p-6 mb-6">
        <div className="flex items-center gap-3">
          <Wind className="w-8 h-8" />
          <h2 className="text-3xl font-bold">BREATHING EXERCISES</h2>
        </div>
      </div>

      <div className="bg-white neo-border-thick neo-shadow-lg p-8 mb-6">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold mb-4">4-4-4 BREATHING TECHNIQUE</h3>
          <p className="text-lg">
            Inhale for 4 seconds, hold for 4 seconds, exhale for 4 seconds
          </p>
        </div>

        <div className={`${getPhaseColor()} neo-border-thick neo-shadow-lg p-12 mb-8 transition-all duration-500`}>
          <div className="text-center">
            <div className="text-8xl font-bold mb-4">{count}</div>
            <div className="text-3xl font-bold">{getPhaseText()}</div>
          </div>
        </div>

        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setIsActive(!isActive)}
            className={`flex-1 py-4 font-bold neo-border-thick neo-shadow flex items-center justify-center gap-3 transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none ${
              isActive ? 'bg-neo-pink text-white' : 'bg-black text-neo-green'
            }`}
          >
            {isActive ? (
              <>
                <Pause className="w-6 h-6" />
                PAUSE
              </>
            ) : (
              <>
                <Play className="w-6 h-6" />
                START
              </>
            )}
          </button>

          <button
            onClick={handleReset}
            className="px-8 py-4 font-bold neo-border-thick neo-shadow bg-white hover:bg-neo-yellow transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
          >
            <RotateCcw className="w-6 h-6" />
          </button>
        </div>

        <div className="bg-neo-purple neo-border p-4 text-center">
          <div className="text-white font-bold text-xl">
            COMPLETED CYCLES: {cycles}
          </div>
        </div>
      </div>

      <div className="bg-white neo-border-thick neo-shadow p-6">
        <h3 className="text-2xl font-bold mb-4">BENEFITS OF BREATHING EXERCISES</h3>
        <ul className="space-y-3">
          {[
            'Reduces stress and anxiety',
            'Lowers blood pressure',
            'Improves focus and concentration',
            'Promotes better sleep',
            'Increases energy levels',
            'Enhances emotional regulation'
          ].map((benefit, index) => (
            <li key={index} className="bg-neo-cyan neo-border p-3 font-bold">
              • {benefit}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BreathingExercise;

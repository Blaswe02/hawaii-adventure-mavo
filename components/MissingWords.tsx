import React, { useState } from 'react';
import { MissingWordsTask } from '../types';
import Button from './Button';
import { Check, ArrowRight, TextCursorInput } from 'lucide-react';

interface Props { tasks: MissingWordsTask[]; onComplete: () => void; }

const MissingWords: React.FC<Props> = ({ tasks, onComplete }) => {
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<'none' | 'correct' | 'incorrect'>('none');
  const task = tasks[idx];

  const handleClick = (opt: string) => {
    if (feedback === 'correct') return;
    setSelected(opt);
    if (opt === task.correctOption) { setFeedback('correct'); }
    else { setFeedback('incorrect'); setTimeout(() => { setFeedback('none'); setSelected(null); }, 1500); }
  };

  const next = () => { if (idx < tasks.length - 1) { setIdx(p => p + 1); setFeedback('none'); setSelected(null); } else onComplete(); };

  return (
    <div className="min-h-screen bg-slate-900 pt-16 px-4 flex flex-col items-center">
      <div className="max-w-2xl w-full bg-slate-800 p-6 sm:p-10 rounded-xl shadow-xl border border-slate-600 mt-4">
        <div className="flex items-center justify-between mb-6 border-b border-slate-700 pb-4">
          <h2 className="text-xl font-serif text-amber-400 flex items-center gap-2"><TextCursorInput className="w-5 h-5" /> Missing Words</h2>
          <span className="text-slate-400 text-sm">Task {idx + 1} / {tasks.length}</span>
        </div>
        <p className="text-slate-300 mb-6 text-center italic text-sm">Click the correct word to fill the gap.</p>
        <div className="bg-black/40 rounded-lg p-6 mb-8 border border-slate-700 text-center">
          <p className="text-xl leading-relaxed text-slate-200">
            {task.sentenceParts[0]}
            <span className={`inline-block mx-2 px-3 py-1 rounded min-w-[80px] border-b-2 font-bold transition-all ${feedback === 'correct' ? 'text-green-300 border-green-500 bg-green-900/20' : feedback === 'incorrect' ? 'text-red-300 border-red-500 bg-red-900/20' : 'text-amber-400 border-amber-500/50 bg-slate-800'}`}>
              {selected ?? '_____'}
            </span>
            {task.sentenceParts[1]}
          </p>
        </div>
        <div className="grid grid-cols-3 gap-4 mb-8">
          {task.options.map((opt, i) => (
            <button key={i} onClick={() => handleClick(opt)} disabled={feedback === 'correct'}
              className={`py-3 px-4 rounded-lg font-bold shadow-md transition-all active:scale-95 ${selected === opt && feedback === 'correct' ? 'bg-green-600 text-white border-2 border-green-400' : selected === opt && feedback === 'incorrect' ? 'bg-red-800 text-red-100 border-2 border-red-600' : 'bg-slate-700 hover:bg-slate-600 text-slate-100 border-2 border-slate-500 hover:border-amber-400'}`}>
              {opt}
            </button>
          ))}
        </div>
        <div className="min-h-[4rem] flex flex-col items-center justify-center">
          {feedback === 'incorrect' && <div className="text-red-400 font-bold animate-pulse">That word does not fit. Try again.</div>}
          {feedback === 'correct' && (
            <div className="w-full flex flex-col items-center gap-4">
              <div className="text-green-400 font-bold flex items-center gap-2"><Check className="w-5 h-5" /> Well done!</div>
              <Button onClick={next} className="w-full max-w-xs">{idx < tasks.length - 1 ? 'Next Sentence' : 'Complete Task'} <ArrowRight className="w-4 h-4" /></Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MissingWords;

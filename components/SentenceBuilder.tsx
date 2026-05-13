import React, { useState, useEffect } from 'react';
import { SentenceBuilderTask } from '../types';
import Button from './Button';
import { Check, RotateCcw, ArrowRight, LayoutGrid } from 'lucide-react';

interface Props { tasks: SentenceBuilderTask[]; onComplete: () => void; }

const SentenceBuilder: React.FC<Props> = ({ tasks, onComplete }) => {
  const [idx, setIdx] = useState(0);
  const [bank, setBank] = useState<string[]>([]);
  const [answer, setAnswer] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<'none' | 'correct' | 'incorrect'>('none');
  const task = tasks[idx];

  useEffect(() => {
    if (task) { setBank([...task.blocks].sort(() => Math.random() - 0.5)); setAnswer([]); setFeedback('none'); }
  }, [task]);

  const move = (block: string, from: 'bank' | 'answer') => {
    if (feedback === 'correct') return;
    if (from === 'bank') { setBank(p => p.filter(b => b !== block)); setAnswer(p => [...p, block]); }
    else { setAnswer(p => p.filter(b => b !== block)); setBank(p => [...p, block]); }
    setFeedback('none');
  };

  const check = () => setFeedback(answer.join(' ') === task.blocks.join(' ') ? 'correct' : 'incorrect');
  const reset = () => { setBank([...answer, ...bank].sort(() => Math.random() - 0.5)); setAnswer([]); setFeedback('none'); };
  const next = () => idx < tasks.length - 1 ? (setIdx(p => p + 1)) : onComplete();

  return (
    <div className="min-h-screen bg-slate-900 pt-16 px-4 flex flex-col items-center">
      <div className="max-w-2xl w-full bg-slate-800 p-6 sm:p-8 rounded-xl shadow-xl border border-slate-600 mt-4">
        <div className="flex items-center justify-between mb-6 border-b border-slate-700 pb-4">
          <h2 className="text-xl font-serif text-amber-400 flex items-center gap-2"><LayoutGrid className="w-5 h-5" /> Sentence Builder</h2>
          <span className="text-slate-400 text-sm">Task {idx + 1} / {tasks.length}</span>
        </div>
        <p className="text-slate-300 mb-6 text-center italic text-sm">Build the correct sentence by clicking the words in order.</p>
        <div className={`min-h-[4rem] bg-black/40 rounded-lg p-4 mb-6 border-2 border-dashed flex flex-wrap gap-2 items-center justify-center transition-colors ${feedback === 'correct' ? 'border-green-500' : feedback === 'incorrect' ? 'border-red-500' : 'border-slate-600'}`}>
          {answer.length === 0 && <span className="text-slate-600 text-sm">Click words below to place them here...</span>}
          {answer.map((b, i) => <button key={`${b}-${i}`} onClick={() => move(b, 'answer')} className="bg-amber-100 text-amber-900 px-3 py-2 rounded font-bold shadow-md hover:bg-white transition-transform active:scale-95">{b}</button>)}
        </div>
        <div className="flex flex-wrap gap-3 justify-center mb-8 min-h-[3rem]">
          {bank.map((b, i) => <button key={`${b}-${i}`} onClick={() => move(b, 'bank')} className="bg-slate-700 text-slate-200 px-3 py-2 rounded shadow border border-slate-600 hover:bg-slate-600 transition-colors">{b}</button>)}
        </div>
        <div className="flex flex-col items-center gap-4">
          {feedback === 'incorrect' && <div className="text-red-400 font-bold animate-pulse">This sentence is not correct. Read the text again.</div>}
          {feedback === 'correct' && <div className="text-green-400 font-bold flex items-center gap-2"><Check className="w-5 h-5" /> Well done!</div>}
          <div className="flex gap-4 w-full justify-center">
            {feedback !== 'correct' && (<><Button variant="secondary" onClick={reset}><RotateCcw className="w-4 h-4" /></Button><Button onClick={check} disabled={bank.length > 0}>Check</Button></>)}
            {feedback === 'correct' && <Button onClick={next} className="w-full max-w-xs">{idx < tasks.length - 1 ? 'Next Sentence' : 'Complete Task'} <ArrowRight className="w-4 h-4" /></Button>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SentenceBuilder;

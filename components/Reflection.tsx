import React, { useState } from 'react';
import Button from './Button';
import { ArrowRight } from 'lucide-react';

interface Props { onComplete: () => void; }
type Check = 'yes' | 'maybe' | 'no' | null;

const GOALS = [
  "I can explain why Japan attacked Pearl Harbor and what the consequences were.",
  "I can describe the overthrow of Queen Liliuokalani and why it matters today.",
  "I can explain what the Aloha spirit means in Hawaiian culture.",
  "I can name at least two endangered species or plants found only in Hawaii.",
  "I can understand and use the main vocabulary from this chapter.",
];

const Reflection: React.FC<Props> = ({ onComplete }) => {
  const [checks, setChecks] = useState<Check[]>(new Array(GOALS.length).fill(null));
  const [text, setText] = useState('');
  const [rating, setRating] = useState<number | null>(null);
  const allDone = checks.every(c => c !== null) && text.trim().length >= 5 && rating !== null;

  const setCheck = (i: number, v: Check) => { const u = [...checks]; u[i] = v; setChecks(u); };
  const opt = (cur: Check, val: Check, color: string) =>
    `w-9 h-9 rounded-lg border-2 font-bold text-sm transition-all ${cur === val ? `${color} text-white scale-110` : 'bg-slate-700 border-slate-600 text-slate-400 hover:border-slate-400'}`;

  return (
    <div className="min-h-screen bg-slate-900 pt-16 px-4 pb-10 flex justify-center">
      <div className="max-w-2xl w-full mt-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-serif text-amber-400 mb-1">Evaluation & Reflection</h2>
          <p className="text-slate-500 text-sm">Honu's Quest — Hawaii (3 Mavo)</p>
        </div>

        <div className="bg-slate-800 rounded-xl border border-slate-700 p-6 mb-5">
          <h3 className="text-lg font-bold text-white mb-1">Evaluation Checklist</h3>
          <p className="text-slate-400 text-sm mb-5">Tick the box that applies to you.</p>
          <div className="flex items-center gap-2 mb-3">
            <div className="flex-1 text-slate-500 text-xs font-semibold uppercase tracking-wide">Learning Goal</div>
            <div className="w-9 text-center text-green-400 text-lg font-bold">✓</div>
            <div className="w-9 text-center text-yellow-400 text-lg font-bold">~</div>
            <div className="w-9 text-center text-red-400 text-lg font-bold">✗</div>
          </div>
          <div className="space-y-3">
            {GOALS.map((g, i) => (
              <div key={i} className="flex items-center gap-2 bg-slate-700/40 rounded-lg px-3 py-2">
                <p className="flex-1 text-slate-200 text-sm">{g}</p>
                <button onClick={() => setCheck(i, 'yes')}   className={opt(checks[i], 'yes',   'bg-green-700 border-green-500')}>✓</button>
                <button onClick={() => setCheck(i, 'maybe')} className={opt(checks[i], 'maybe', 'bg-yellow-600 border-yellow-400')}>~</button>
                <button onClick={() => setCheck(i, 'no')}    className={opt(checks[i], 'no',    'bg-red-700 border-red-500')}>✗</button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-800 rounded-xl border border-slate-700 p-6 mb-5">
          <h3 className="text-lg font-bold text-white mb-1">Reflection</h3>
          <p className="text-slate-400 text-sm mb-4">What am I afraid I might forget for the test?</p>
          <textarea value={text} onChange={e => setText(e.target.value)} rows={4}
            placeholder="Write your answer here..."
            className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 text-slate-200 placeholder-slate-600 focus:border-amber-500 focus:outline-none resize-none text-sm leading-relaxed" />
        </div>

        <div className="bg-slate-800 rounded-xl border border-slate-700 p-6 mb-8">
          <h3 className="text-lg font-bold text-white mb-1">Self-Rating</h3>
          <p className="text-slate-400 text-sm mb-4">How well did you understand this chapter? (1 = not at all, 10 = very well)</p>
          <div className="flex gap-2 flex-wrap">
            {Array.from({ length: 10 }, (_, i) => i + 1).map(n => (
              <button key={n} onClick={() => setRating(n)}
                className={`w-11 h-11 rounded-lg border-2 font-bold text-sm transition-all ${rating === n ? 'bg-amber-600 border-amber-400 text-white scale-110 shadow-lg' : 'bg-slate-700 border-slate-600 text-slate-300 hover:border-amber-500'}`}>
                {n}
              </button>
            ))}
          </div>
        </div>

        <Button onClick={onComplete} disabled={!allDone} className="w-full py-4 text-lg">
          Submit & See Results <ArrowRight className="w-5 h-5" />
        </Button>
        {!allDone && <p className="text-slate-500 text-xs text-center mt-3">Fill in all boxes, write a reflection, and choose your rating to continue.</p>}
      </div>
    </div>
  );
};

export default Reflection;

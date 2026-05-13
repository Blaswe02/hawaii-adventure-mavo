import React, { useState } from 'react';
import { SymbolType } from '../types';
import Button from './Button';
import { getIcon } from './Inventory';
import { Waves } from 'lucide-react';

interface Props { onComplete: (wish: string) => void; }

const SLOTS: { meaning: string; correct: SymbolType; hint: string }[] = [
  { meaning: 'Memory & Sacrifice',   correct: 'Anchor',   hint: '"Japan attacked here in 1941 to weaken US power in the Pacific. Oil — called black tears — still rises from the sunken Arizona."' },
  { meaning: 'Fire & Creation',      correct: 'Flame',    hint: '"Pele lives in my craters. In 2018, I destroyed over 700 homes but also created new land from my lava."' },
  { meaning: 'Surf & Spirit',        correct: 'Waves',    hint: '"Duke Kahanamoku — the Father of Modern Surfing — rode my waves. Ancient Hawaiians called surfing a spiritual practice."' },
  { meaning: 'Royalty & Resistance', correct: 'Landmark', hint: '"I am the only royal palace in the USA. Queen Liliuokalani was placed under house arrest here in 1893. In 1993, an apology was made."' },
  { meaning: 'Ocean & Life',         correct: 'Droplets', hint: '"Honu turtles and endangered Hawaiian Monk Seals swim in my volcanic crater waters. The seals are guardians of souls."' },
  { meaning: 'Wild & Wonder',        correct: 'Leaf',     hint: '"Jurassic Park was filmed along my 1,200-meter cliffs. The rare Silversword plant — the Crown Jewel — blooms once then dies."' },
];

const ALL: SymbolType[] = ['Anchor', 'Flame', 'Waves', 'Landmark', 'Droplets', 'Leaf'];

const OracleChamber: React.FC<Props> = ({ onComplete }) => {
  const [step, setStep] = useState<'puzzle' | 'ending' | 'wish'>('puzzle');
  const [placed, setPlaced] = useState<(SymbolType | null)[]>(new Array(SLOTS.length).fill(null));
  const [selectedSym, setSelectedSym] = useState<SymbolType | null>(null);
  const [error, setError] = useState('');
  const [wish, setWish] = useState('');

  const handleSlot = (i: number) => {
    if (!selectedSym) return;
    const upd = [...placed]; upd[i] = selectedSym; setPlaced(upd);
    setSelectedSym(null); setError('');
  };

  const check = () => {
    if (SLOTS.every((s, i) => placed[i] === s.correct)) setStep('ending');
    else setError('The symbols are not in the right place. Read the hints carefully!');
  };

  if (step === 'puzzle') return (
    <div className="min-h-screen bg-emerald-950 pt-16 px-4 flex flex-col items-center pb-8">
      <h2 className="text-3xl font-serif text-amber-400 mb-2 mt-4">Honu's Final Challenge</h2>
      <p className="text-emerald-200 mb-6 text-center text-sm">Return the right symbol to each place memory.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6 max-w-4xl w-full">
        {SLOTS.map((slot, i) => (
          <div key={slot.meaning} onClick={() => handleSlot(i)}
            className={`p-4 bg-emerald-900 border-2 rounded-xl flex flex-col items-center justify-between cursor-pointer transition-all min-h-[12rem] ${placed[i] ? 'border-amber-500' : 'border-emerald-700 hover:border-emerald-500'}`}>
            <div className="flex flex-col items-center gap-2 w-full">
              <div className="text-emerald-300 text-xs uppercase tracking-widest text-center border-b border-emerald-800 w-full pb-2">{slot.meaning}</div>
              <div className="text-xs text-amber-300/90 italic text-center px-1 leading-relaxed">{slot.hint}</div>
            </div>
            <div className="w-14 h-14 mt-3 rounded-full bg-black/50 flex items-center justify-center shadow-inner shrink-0">
              {placed[i] && getIcon(placed[i]!, 'w-7 h-7')}
            </div>
          </div>
        ))}
      </div>
      {error && <div className="text-red-300 mb-4 animate-pulse bg-red-900/40 px-4 py-2 rounded border border-red-800">{error}</div>}
      <div className="bg-emerald-900 p-5 rounded-xl border border-emerald-700 mb-6 shadow-lg w-full max-w-md">
        <p className="text-emerald-200 text-center mb-3 text-sm">Select a symbol to place:</p>
        <div className="flex gap-3 justify-center flex-wrap">
          {ALL.map(sym => (
            <button key={sym} onClick={() => setSelectedSym(sym)}
              className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-transform hover:scale-110 ${selectedSym === sym ? 'bg-amber-900 border-amber-400 ring-2 ring-amber-400 ring-offset-2 ring-offset-emerald-900' : 'bg-slate-800 border-slate-600'}`}>
              {getIcon(sym, 'w-6 h-6')}
            </button>
          ))}
        </div>
      </div>
      <Button onClick={check} disabled={placed.some(v => v === null)} className="w-full max-w-xs">Present to Honu</Button>
    </div>
  );

  if (step === 'ending') return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-900 to-amber-900 pt-16 px-4 flex flex-col items-center justify-center text-center">
      <div className="w-32 h-32 mx-auto bg-amber-500 rounded-full flex items-center justify-center shadow-[0_0_60px_rgba(245,158,11,0.8)] animate-pulse border-4 border-yellow-300 mb-8">
        <Waves className="w-16 h-16 text-white" />
      </div>
      <h1 className="text-4xl md:text-5xl font-serif text-amber-200 mb-6 drop-shadow-xl">The Aloha Spirit is Restored!</h1>
      <div className="max-w-md bg-black/40 p-6 rounded-lg border border-amber-500/30 backdrop-blur-sm mb-8">
        <p className="text-xl text-emerald-100 italic mb-4">"Mahalo! You have journeyed through the stories of Hawaiʻi and understood their depth. The Aloha Spirit lives on through you!"</p>
        <p className="text-lg text-amber-400">Honu grants you one Aloha Wish.</p>
      </div>
      <Button onClick={() => setStep('wish')}>Make an Aloha Wish</Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-emerald-950 pt-16 px-4 flex flex-col items-center">
      <h2 className="text-3xl font-serif text-amber-400 mb-6 mt-4">Your Aloha Wish</h2>
      <div className="max-w-md w-full bg-emerald-900 p-6 rounded-xl border border-emerald-700 shadow-xl">
        <label className="block text-emerald-200 mb-2 text-sm">My Aloha Wish (2-3 sentences):</label>
        <textarea className="w-full h-32 bg-emerald-950 border border-emerald-800 rounded-lg p-4 text-slate-200 focus:border-amber-500 outline-none resize-none mb-4"
          placeholder="If I visited Hawaiʻi, I would... Because..."
          value={wish} onChange={e => setWish(e.target.value)} />
        <Button onClick={() => onComplete(wish)} disabled={wish.length < 10} className="w-full">
          Seal My Wish <Waves className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default OracleChamber;

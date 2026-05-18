import React from 'react';
import { SymbolType } from '../types';
import { Anchor, Flame, Waves, Landmark, Droplets, Leaf, Star } from 'lucide-react';

interface InventoryProps {
  symbols: SymbolType[];
  onSymbolsClick: () => void;
}

const getIcon = (type: SymbolType, size = 'w-4 h-4') => {
  switch (type) {
    case 'Anchor':   return <Anchor   className={`${size} text-blue-300`} />;
    case 'Flame':    return <Flame    className={`${size} text-orange-400`} />;
    case 'Waves':    return <Waves    className={`${size} text-cyan-300`} />;
    case 'Landmark': return <Landmark className={`${size} text-amber-300`} />;
    case 'Droplets': return <Droplets className={`${size} text-teal-300`} />;
    case 'Leaf':     return <Leaf     className={`${size} text-green-400`} />;
    case 'Star':     return <Star     className={`${size} text-yellow-300`} />;
  }
};

const ALL: SymbolType[] = ['Anchor', 'Flame', 'Waves', 'Landmark', 'Droplets', 'Leaf', 'Star'];

const Inventory: React.FC<InventoryProps> = ({ symbols, onSymbolsClick }) => (
  <div className="fixed top-0 left-0 right-0 bg-emerald-950/90 border-b border-emerald-800 p-2 z-50 flex justify-between items-center backdrop-blur-sm shadow-lg">
    <div className="text-emerald-100 font-serif font-bold text-base hidden sm:block pl-2">
      Honu's Quest — Mavo
    </div>
    <div className="flex gap-1.5 items-center">
      <span
        className="text-emerald-200/70 text-sm mr-1 flex items-center cursor-default select-none"
        onClick={onSymbolsClick}
      >
        Symbols:
      </span>
      {ALL.map(s => (
        <div
          key={s}
          className={`w-7 h-7 rounded-full border flex items-center justify-center transition-all ${
            symbols.includes(s)
              ? 'bg-emerald-900 border-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.5)]'
              : 'bg-slate-900 border-slate-700 opacity-30'
          }`}
          title={symbols.includes(s) ? s : 'Unknown'}
        >
          {getIcon(s)}
        </div>
      ))}
    </div>
  </div>
);

export { getIcon };
export default Inventory;

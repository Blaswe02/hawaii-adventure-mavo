import React, { useState } from 'react';
import { SpiritAnimal } from '../types';
import { SPIRIT_ANIMALS } from '../spiritAnimals';
import Button from './Button';
import { ArrowRight, Sparkles } from 'lucide-react';

interface Props {
  onSelect: (animal: SpiritAnimal) => void;
}

const SpiritAnimalSelect: React.FC<Props> = ({ onSelect }) => {
  const [selected, setSelected] = useState<SpiritAnimal | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  const chosen = SPIRIT_ANIMALS.find(a => a.id === selected);

  if (confirmed && chosen) {
    return (
      <div className="min-h-screen bg-emerald-950 flex flex-col items-center justify-center p-6 text-center">
        <div
          className="w-52 h-52 sm:w-64 sm:h-64 mx-auto mb-6 animate-in zoom-in duration-700 rounded-full flex items-center justify-center"
          style={{ filter: `drop-shadow(0 0 40px ${chosen.glowColor})` }}
        >
          <img
            src={chosen.image}
            alt={chosen.name}
            className="w-full h-full object-contain"
          />
        </div>
        <h2 className="text-3xl font-serif text-amber-400 mb-2">{chosen.name}</h2>
        <p className="text-emerald-200 italic mb-8 max-w-xs">{chosen.description}</p>
        <Button onClick={() => onSelect(selected!)} className="text-lg px-8 py-4">
          Begin the Journey <ArrowRight className="w-5 h-5" />
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-emerald-950 flex flex-col items-center px-4 py-10">
      {/* Header */}
      <div className="text-center mb-8 max-w-xl">
        <div className="flex items-center justify-center gap-2 mb-3">
          <Sparkles className="w-5 h-5 text-amber-400" />
          <span className="text-amber-400/70 text-xs font-semibold uppercase tracking-[0.2em]">Kāu ʻĀumākua</span>
          <Sparkles className="w-5 h-5 text-amber-400" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif text-amber-300 mb-3 drop-shadow-lg">
          Choose Your Spirit Animal
        </h1>
        <p className="text-emerald-200/70 text-sm leading-relaxed">
          Your ʻaumākua will guide you through the Hawaiian islands and stand by your side during every challenge.
        </p>
      </div>

      {/* Animal cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 w-full max-w-4xl mb-8">
        {SPIRIT_ANIMALS.map(animal => {
          const isSelected = selected === animal.id;
          return (
            <button
              key={animal.id}
              onClick={() => setSelected(animal.id)}
              className={`
                relative flex flex-col items-center rounded-2xl p-4 border-2 transition-all duration-300
                bg-emerald-900/40 backdrop-blur-sm cursor-pointer
                ${isSelected
                  ? 'border-amber-400 scale-105'
                  : 'border-emerald-700/50 hover:border-emerald-500 hover:scale-[1.02]'
                }
              `}
              style={isSelected ? { boxShadow: `0 0 30px ${animal.glowColor}` } : {}}
            >
              {/* Animal image */}
              <div
                className="w-24 h-24 sm:w-28 sm:h-28 mb-3 flex items-center justify-center"
                style={isSelected ? { filter: `drop-shadow(0 0 16px ${animal.glowColor})` } : {}}
              >
                <img
                  src={animal.image}
                  alt={animal.name}
                  className="w-full h-full object-contain"
                  onError={e => {
                    // Fallback: show emoji if image not yet uploaded
                    const parent = (e.target as HTMLImageElement).parentElement;
                    if (parent) {
                      (e.target as HTMLImageElement).style.display = 'none';
                      const fallbacks: Record<string, string> = { deer: '🦌', gecko: '🦎', owl: '🦉', turtle: '🐢', fox: '🦊' };
                      parent.innerHTML = `<span style="font-size:64px;line-height:1">${fallbacks[animal.id] || '✨'}</span>`;
                    }
                  }}
                />
              </div>

              {/* Name */}
              <span className={`font-serif text-base font-bold mb-1 ${isSelected ? 'text-amber-300' : 'text-emerald-100'}`}>
                {animal.name}
              </span>

              {/* Trait badge */}
              <span
                className={`text-xs px-2 py-0.5 rounded-full font-semibold mb-2 ${isSelected ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'bg-emerald-800/60 text-emerald-400 border border-emerald-700/40'}`}
              >
                {animal.trait}
              </span>

              {/* Description */}
              <p className="text-emerald-300/70 text-xs text-center leading-relaxed">
                {animal.description}
              </p>

              {/* Selected checkmark */}
              {isSelected && (
                <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center">
                  <span className="text-white text-xs font-bold">✓</span>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Confirm button */}
      <Button
        onClick={() => setConfirmed(true)}
        disabled={!selected}
        className="px-10 py-4 text-lg"
      >
        {selected
          ? `Choose ${SPIRIT_ANIMALS.find(a => a.id === selected)?.name}`
          : 'Select your guide'}
        {selected && <Sparkles className="w-5 h-5" />}
      </Button>

      {!selected && (
        <p className="text-emerald-600 text-xs mt-4">Click an animal to select your guide</p>
      )}
    </div>
  );
};

export default SpiritAnimalSelect;

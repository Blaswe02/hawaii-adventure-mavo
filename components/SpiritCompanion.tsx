import React, { useState, useEffect, useCallback } from 'react';
import { SpiritAnimalInfo } from '../types';

interface Props {
  spiritInfo: SpiritAnimalInfo;
  view: string; // triggers tip on map return
}

type BubbleState = 'idle' | 'mood-ask' | 'mood-response' | 'tip';

const MOOD_QUESTION = "How are you feeling today? 🌺";

const MOOD_RESPONSES = {
  bad: "I'm sorry to hear that. Let's go slowly today. 🌿",
  normal: "That's okay. We'll keep going together. 💛",
  well: "Nice! Then keep your eyes open for clues. ✨",
};

const ANIMAL_LINES: Record<string, string[]> = {
  owl: [
    "Look carefully. Quiet details matter.",
    "Wisdom begins when you slow down.",
    "Every question has an answer — look closely.",
    "The night is full of knowledge. So is this text.",
    "Pueo sees what others miss. You can too.",
  ],
  fox: [
    "Come on — brave step first! 🦊",
    "Adventure likes curious people.",
    "Don't wait too long. Dive in!",
    "Quick paws, quick answers!",
    "I can smell a good answer. Can you?",
  ],
  turtle: [
    "No need to hurry. Strong journeys take time.",
    "Slow and steady is still strong. 🐢",
    "I've crossed oceans. You can cross this quiz.",
    "Breathe. Read again. You've got this.",
    "The ocean is deep. So is this subject.",
  ],
  gecko: [
    "Hey! Stay sharp — this one is fun! 🦎",
    "Quick eyes catch good clues.",
    "I can stick to walls. You stick to the text!",
    "Blink and you'll miss it. Don't blink.",
    "Ancient tip: re-read that last sentence.",
  ],
  deer: [
    "Walk gently. Some stories need respect. 🌺",
    "Soft attention can notice a lot.",
    "Take your time. Flowers bloom slowly too.",
    "Every place here has a story worth hearing.",
    "Be still, and the answer will come to you.",
  ],
};

const GENERAL_TIPS: string[] = [
  "Honolulu is the capital of Hawaiʻi. 🏙️",
  "The Hawaiian flag includes the Union Jack. Think about why...",
  "Aloha means more than just hello. 🌊",
  "Mauna Kea: tallest mountain on Earth from base to peak.",
  "Pearl Harbor changed the course of World War II.",
  "King Kamehameha united all the Hawaiian islands.",
  "Some places are beautiful. Some are important. Some are both.",
];

const SpiritCompanion: React.FC<Props> = ({ spiritInfo, view }) => {
  const [bubble, setBubble] = useState<BubbleState>('idle');
  const [bubbleText, setBubbleText] = useState('');
  const [lastView, setLastView] = useState(view);

  const closeBubble = useCallback(() => {
    setBubble('idle');
    setBubbleText('');
  }, []);

  // Show a random tip when returning to map
  useEffect(() => {
    if (view === 'map' && lastView !== 'map' && bubble === 'idle') {
      const chance = Math.random();
      if (chance < 0.55) { // 55% chance on each map return
        const animalLines = ANIMAL_LINES[spiritInfo.id] ?? [];
        const allLines = [...animalLines, ...GENERAL_TIPS];
        const tip = allLines[Math.floor(Math.random() * allLines.length)];
        setBubbleText(tip);
        setBubble('tip');
        const timer = setTimeout(closeBubble, 4500);
        return () => clearTimeout(timer);
      }
    }
    setLastView(view);
  }, [view]);

  const handleAnimalClick = () => {
    if (bubble === 'idle' || bubble === 'tip') {
      setBubbleText(MOOD_QUESTION);
      setBubble('mood-ask');
    } else {
      closeBubble();
    }
  };

  const handleMood = (mood: 'bad' | 'normal' | 'well') => {
    setBubbleText(MOOD_RESPONSES[mood]);
    setBubble('mood-response');
    setTimeout(closeBubble, 3500);
  };

  const glowStyle = { filter: `drop-shadow(0 0 12px ${spiritInfo.glowColor})` };
  const nameColor = spiritInfo.glowColor.replace('0.6)', '1)');

  return (
    <div className="fixed bottom-20 right-3 z-40 flex flex-col items-end pointer-events-none select-none">

      {/* Speech bubble */}
      {bubble !== 'idle' && (
        <div
          className="pointer-events-auto mb-2 mr-1 max-w-[200px] relative animate-in fade-in zoom-in duration-200"
          style={{ transformOrigin: 'bottom right' }}
        >
          <div className="bg-white text-slate-800 rounded-2xl rounded-br-sm px-3 py-2.5 shadow-xl border border-slate-200 text-xs leading-relaxed">
            <p className="font-semibold mb-1" style={{ color: nameColor.replace('1)','0.85)') }}>
              {spiritInfo.name}
            </p>
            <p>{bubbleText}</p>

            {/* Mood buttons */}
            {bubble === 'mood-ask' && (
              <div className="flex gap-1.5 mt-2.5">
                {(['bad', 'normal', 'well'] as const).map(m => (
                  <button
                    key={m}
                    onClick={() => handleMood(m)}
                    className={`flex-1 py-1 rounded-lg text-xs font-bold transition-all active:scale-95 border ${
                      m === 'bad'    ? 'bg-red-100 border-red-300 text-red-700 hover:bg-red-200' :
                      m === 'normal' ? 'bg-amber-100 border-amber-300 text-amber-700 hover:bg-amber-200' :
                                       'bg-green-100 border-green-300 text-green-700 hover:bg-green-200'
                    }`}
                  >
                    {m === 'bad' ? '😔 Bad' : m === 'normal' ? '😐 OK' : '😊 Well'}
                  </button>
                ))}
              </div>
            )}

            {/* Close tap hint for tips/responses */}
            {bubble !== 'mood-ask' && (
              <button onClick={closeBubble}
                className="absolute top-1 right-1.5 text-slate-400 hover:text-slate-600 text-xs leading-none">
                ✕
              </button>
            )}
          </div>
          {/* Bubble tail */}
          <div className="absolute bottom-0 right-3 w-3 h-3 bg-white border-r border-b border-slate-200 rotate-45 translate-y-1.5" />
        </div>
      )}

      {/* Animal image — clickable */}
      <div
        className="pointer-events-auto cursor-pointer flex flex-col items-center"
        onClick={handleAnimalClick}
        title={`Click to talk to ${spiritInfo.name}`}
      >
        <div
          className="w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center transition-transform hover:scale-110 active:scale-95"
          style={glowStyle}
        >
          <img
            src={spiritInfo.image}
            alt={spiritInfo.name}
            className="w-full h-full object-contain"
            onError={e => {
              const fb: Record<string, string> = { deer: '🦌', gecko: '🦎', owl: '🦉', turtle: '🐢', fox: '🦊' };
              const el = e.target as HTMLImageElement;
              el.style.display = 'none';
              const s = document.createElement('span'); s.style.fontSize = '48px'; s.textContent = fb[spiritInfo.id] || '✨';
              el.parentElement?.appendChild(s);
            }}
          />
        </div>
        <span className="text-xs font-serif font-semibold mt-0.5" style={{ color: nameColor }}>
          {spiritInfo.name}
        </span>
      </div>
    </div>
  );
};

export default SpiritCompanion;

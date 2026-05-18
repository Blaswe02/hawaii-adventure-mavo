import React, { useState, useEffect, useCallback } from 'react';
import { SpiritAnimalInfo } from '../types';

interface Props {
  spiritInfo: SpiritAnimalInfo;
  view: string;
  companionTrigger?: CompanionTrigger | null;
  onTriggerHandled?: () => void;
}

export type CompanionTrigger =
  | { type: 'entered-location'; locationId: string }
  | { type: 'wrong-answer' }
  | { type: 'location-complete' }
  | { type: 'quiz-passed' };

type BubbleState = 'idle' | 'mood-ask' | 'mood-response' | 'tip';

// ── Mood dialog ──────────────────────────────────────
const MOOD_QUESTION = "How are you feeling today? 🌺";
const MOOD_RESPONSES = {
  bad:    "I'm sorry to hear that. Let's go slowly today. 🌿",
  normal: "That's okay. We'll keep going together. 💛",
  well:   "Nice! Then keep your eyes open for clues. ✨",
};

// ── Random map tips (per animal) ─────────────────────
const MAP_LINES: Record<string, string[]> = {
  owl:    ["Look carefully. Quiet details matter.", "Wisdom begins when you slow down.", "Every question has an answer — look closely.", "The night is full of knowledge. So is this text.", "Pueo sees what others miss. You can too."],
  fox:    ["Come on — brave step first! 🦊", "Adventure likes curious people.", "Don't wait too long. Dive in!", "Quick paws, quick answers!", "I can smell a good answer. Can you?"],
  turtle: ["No need to hurry. Strong journeys take time.", "Slow and steady is still strong. 🐢", "I've crossed oceans. You can cross this quiz.", "Breathe. Read again. You've got this.", "The ocean is deep. So is this subject."],
  gecko:  ["Hey! Stay sharp — this one is fun! 🦎", "Quick eyes catch good clues.", "I can stick to walls. You stick to the text!", "Blink and you'll miss it. Don't blink.", "Ancient tip: re-read that last sentence."],
  deer:   ["Walk gently. Some stories need respect. 🌺", "Soft attention can notice a lot.", "Take your time. Flowers bloom slowly too.", "Every place here has a story worth hearing.", "Be still, and the answer will come to you."],
};

const HAWAII_TIPS = [
  "Honolulu is the capital of Hawaiʻi. 🏙️",
  "The Hawaiian flag includes the Union Jack. Think about why...",
  "Aloha means more than just hello. 🌊",
  "Mauna Kea: tallest mountain on Earth from base to peak.",
  "Pearl Harbor changed the course of World War II.",
  "King Kamehameha united all the Hawaiian islands.",
  "Some places are beautiful. Some are important. Some are both.",
];

// ── Location-specific tips ────────────────────────────
const LOCATION_TIPS: Record<string, string> = {
  pearlharbor:  "Pearl Harbor: remember — Japan attacked to weaken US power in the Pacific. 🚢",
  volcanoes:    "Pele lives in Kilauea. Erupting almost every year since 1983! 🌋",
  waikiki:      "Surfing was invented by the ancient Hawaiians — not just a modern sport. 🏄",
  maunakea:     "Mauna Kea means 'white mountain'. Sacred AND home to world-class telescopes. 🔭",
  iolani:       "Iolani Palace: the ONLY royal palace in the United States. 👑",
  hanauma:      "Honu = Hawaiian green sea turtle. Touching one is illegal here! 🐢",
  haunauma:     "Honu = Hawaiian green sea turtle. Touching one is illegal here! 🐢",
  napali:       "Na Pali means 'the cliffs'. No roads — only boat, helicopter or hiking. 🌿",
};

// ── Wrong answer encouragements (per animal) ─────────
const WRONG_LINES: Record<string, string[]> = {
  owl:    ["Hm. Look at the text again more carefully.", "Read the clues slowly. The answer is in there.", "Wisdom takes patience. Try again. 🦉"],
  fox:    ["Oops! Good try — go back and sniff out the right answer! 🦊", "Wrong trail. Double back and look again!", "Almost! A fox never gives up. Try once more."],
  turtle: ["That's okay. Slow down and re-read. You've got this. 🐢", "No rush. Read it again and trust yourself.", "Every answer is found in time. Look again."],
  gecko:  ["Bzzt! Wrong one — but you're close! 🦎", "Sticky fingers, not sticky answers this time. Try again!", "Quick re-read and you'll nail it!"],
  deer:   ["Take a breath. Read again, gently. 🌺", "The answer is there — approach it softly.", "No hurry. Step back and look once more."],
};

// ── Completion celebrations (per animal) ─────────────
const COMPLETE_LINES: Record<string, string[]> = {
  owl:    ["Well observed! The symbol is yours. 🦉", "Exactly right. You've earned it.", "That was sharp thinking. Onwards!"],
  fox:    ["Yes!! That's the spirit! 🦊", "Nailed it — now on to the next one!", "Boom! Got it. Let's go!"],
  turtle: ["Steady and sure — well done. 🐢", "I knew you'd get there. One more down!", "Strong work. The ocean is proud of you."],
  gecko:  ["Yesss! Spot on! 🦎", "Zap! Got it in one. You're on fire!", "Sharp eyes, sharp answers!"],
  deer:   ["Beautiful. You listened and it paid off. 🌺", "Gently done. Well earned.", "Graceful work. The symbol is yours."],
};

// ── Helpers ───────────────────────────────────────────
const pick = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

const SpiritCompanion: React.FC<Props> = ({
  spiritInfo,
  view,
  companionTrigger,
  onTriggerHandled,
}) => {
  const [bubble, setBubble] = useState<BubbleState>('idle');
  const [bubbleText, setBubbleText] = useState('');
  const [lastView, setLastView] = useState(view);

  const show = useCallback((text: string, state: BubbleState = 'tip', duration = 4500) => {
    setBubbleText(text);
    setBubble(state);
    if (state !== 'mood-ask') {
      const t = setTimeout(() => { setBubble('idle'); setBubbleText(''); }, duration);
      return () => clearTimeout(t);
    }
  }, []);

  // Handle external triggers (wrong answer, complete, entered location)
  useEffect(() => {
    if (!companionTrigger) return;

    const animalId = spiritInfo.id;

    if (companionTrigger.type === 'wrong-answer') {
      show(pick(WRONG_LINES[animalId] ?? WRONG_LINES.owl), 'tip', 3500);
    } else if (companionTrigger.type === 'location-complete' || companionTrigger.type === 'quiz-passed') {
      show(pick(COMPLETE_LINES[animalId] ?? COMPLETE_LINES.owl), 'tip', 3500);
    } else if (companionTrigger.type === 'entered-location') {
      const locTip = LOCATION_TIPS[companionTrigger.locationId];
      if (locTip) show(locTip, 'tip', 5000);
    }

    onTriggerHandled?.();
  }, [companionTrigger]);

  // Random tip on map return
  useEffect(() => {
    if (view === 'map' && lastView !== 'map' && bubble === 'idle') {
      if (Math.random() < 0.55) {
        const pool = [...(MAP_LINES[spiritInfo.id] ?? []), ...HAWAII_TIPS];
        show(pick(pool), 'tip', 4500);
      }
    }
    setLastView(view);
  }, [view]);

  const handleClick = () => {
    if (bubble === 'idle' || bubble === 'tip') {
      setBubbleText(MOOD_QUESTION);
      setBubble('mood-ask');
    } else {
      setBubble('idle');
      setBubbleText('');
    }
  };

  const handleMood = (mood: 'bad' | 'normal' | 'well') => {
    show(MOOD_RESPONSES[mood], 'mood-response', 3500);
  };

  const glowStyle = { filter: `drop-shadow(0 0 12px ${spiritInfo.glowColor})` };
  const nameColor = spiritInfo.glowColor.replace('0.6)', '1)');

  return (
    <div className="fixed bottom-20 right-3 z-40 flex flex-col items-end pointer-events-none select-none">

      {/* Speech bubble */}
      {bubble !== 'idle' && (
        <div className="pointer-events-auto mb-2 mr-1 max-w-[210px] relative animate-in fade-in zoom-in duration-200"
          style={{ transformOrigin: 'bottom right' }}>
          <div className="bg-white text-slate-800 rounded-2xl rounded-br-sm px-3 py-2.5 shadow-xl border border-slate-200 text-xs leading-relaxed">
            <p className="font-semibold mb-1 text-[11px]" style={{ color: nameColor.replace('1)','0.85)') }}>
              {spiritInfo.name}
            </p>
            <p>{bubbleText}</p>

            {/* Mood buttons */}
            {bubble === 'mood-ask' && (
              <div className="flex gap-1.5 mt-2.5">
                {(['bad','normal','well'] as const).map(m => (
                  <button key={m} onClick={() => handleMood(m)}
                    className={`flex-1 py-1 rounded-lg text-xs font-bold transition-all active:scale-95 border ${
                      m === 'bad'    ? 'bg-red-100 border-red-300 text-red-700 hover:bg-red-200' :
                      m === 'normal' ? 'bg-amber-100 border-amber-300 text-amber-700 hover:bg-amber-200' :
                                       'bg-green-100 border-green-300 text-green-700 hover:bg-green-200'
                    }`}>
                    {m === 'bad' ? '😔 Bad' : m === 'normal' ? '😐 OK' : '😊 Well'}
                  </button>
                ))}
              </div>
            )}

            {bubble !== 'mood-ask' && (
              <button onClick={() => { setBubble('idle'); setBubbleText(''); }}
                className="absolute top-1 right-1.5 text-slate-400 hover:text-slate-600 text-xs leading-none">✕</button>
            )}
          </div>
          {/* Bubble tail */}
          <div className="absolute bottom-0 right-3 w-3 h-3 bg-white border-r border-b border-slate-200 rotate-45 translate-y-1.5" />
        </div>
      )}

      {/* Animal — clickable */}
      <div className="pointer-events-auto cursor-pointer flex flex-col items-center"
        onClick={handleClick} title={`Click to talk to ${spiritInfo.name}`}>
        <div className="w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center transition-transform hover:scale-110 active:scale-95"
          style={glowStyle}>
          <img src={spiritInfo.image} alt={spiritInfo.name} className="w-full h-full object-contain"
            onError={e => {
              const fb: Record<string,string> = { deer:'🦌', gecko:'🦎', owl:'🦉', turtle:'🐢', fox:'🦊' };
              const el = e.target as HTMLImageElement;
              el.style.display='none';
              const s = document.createElement('span'); s.style.fontSize='48px'; s.textContent = fb[spiritInfo.id]||'✨';
              el.parentElement?.appendChild(s);
            }} />
        </div>
        <span className="text-xs font-serif font-semibold mt-0.5" style={{ color: nameColor }}>
          {spiritInfo.name}
        </span>
      </div>
    </div>
  );
};

export default SpiritCompanion;

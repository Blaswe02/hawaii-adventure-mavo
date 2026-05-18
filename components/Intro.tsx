import React, { useState } from 'react';
import Button from './Button';
import { Waves, ArrowRight, Sparkles } from 'lucide-react';

interface IntroProps {
  onComplete: () => void;
  spiritName: string;
}

const Intro: React.FC<IntroProps> = ({ onComplete, spiritName }) => {
  const [step, setStep] = useState(1);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-emerald-950 text-slate-100 p-6 text-center relative overflow-hidden">

      {step === 1 && (
        <div className="max-w-md animate-in fade-in slide-in-from-bottom duration-1000 flex flex-col items-center z-10">
          <h1 className="text-4xl md:text-6xl font-serif text-amber-400 mb-6 drop-shadow-lg">
            {spiritName}'s Quest
          </h1>
          <div className="w-full mb-8 rounded-xl overflow-hidden border-4 border-amber-500 shadow-2xl group bg-black">
            <img
              src="https://picsum.photos/seed/sea-turtle-hawaii-honu/800/500"
              alt="Sea turtle Honu"
              className="w-full h-64 object-cover transform transition duration-700 group-hover:scale-105"
            />
          </div>
          <div className="bg-emerald-900/80 p-6 rounded-lg border border-emerald-700 shadow-xl mb-8 w-full backdrop-blur-sm">
            <p className="text-lg mb-4 text-emerald-100">
              You have just landed on the beautiful islands of Hawaii. The sky is blue and the ocean sparkles in the sun.
            </p>
            <p className="text-lg text-emerald-100">
              Suddenly, an ancient sea turtle slowly rises from the water and looks right at you!
            </p>
          </div>
          <Button onClick={() => setStep(2)}>
            <Waves className="w-5 h-5" /> Listen to Honu
          </Button>
        </div>
      )}

      {step === 2 && (
        <div className="max-w-md animate-in zoom-in duration-700">
          <div className="w-40 h-40 mx-auto mb-6 rounded-full overflow-hidden border-4 border-amber-500 shadow-[0_0_40px_rgba(245,158,11,0.5)]">
            <img
              src="https://picsum.photos/seed/sea-turtle-hawaii-honu/400/400"
              alt="Honu the turtle"
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-3xl font-serif text-amber-400 mb-4">Honu Speaks</h2>
          <p className="text-xl italic text-emerald-200 mb-6 font-serif">
            "Aloha! I am Honu, guardian of the Hawaiian islands. A great storm has scattered my six sacred symbols across the islands!"
          </p>
          <Button variant="secondary" onClick={() => setStep(3)}>
            How can I help?
          </Button>
        </div>
      )}

      {step === 3 && (
        <div className="max-w-md animate-in fade-in duration-1000">
          <h2 className="text-2xl font-serif text-amber-400 mb-4">{spiritName}'s Quest</h2>
          <div className="bg-emerald-900 p-6 rounded-lg border border-amber-600 shadow-xl mb-8 space-y-4">
            <p className="text-lg">
              "Travel to the seven most special places in Hawaii. Find the <strong>Anchor</strong>, the <strong>Flame</strong>, the <strong>Waves</strong>, the <strong>Landmark</strong>, the <strong>Droplets</strong>, the <strong>Leaf</strong>, and the <strong>Star</strong>."
            </p>
            <div className="flex items-center gap-3 text-left bg-black/40 p-4 rounded border border-emerald-700">
              <Sparkles className="w-8 h-8 text-amber-400 shrink-0" />
              <span className="text-sm">Return them all and you will discover the true spirit of Aloha!</span>
            </div>
          </div>
          <Button onClick={onComplete}>
            Start the Journey <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default Intro;

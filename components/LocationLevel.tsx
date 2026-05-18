import React, { useState } from 'react';
import { LocationData } from '../types';
import Button from './Button';
import SentenceBuilder from './SentenceBuilder';
import MissingWords from './MissingWords';
import { getIcon } from './Inventory';
import { BookOpen, Check, X, ArrowLeft, ArrowRight, AlertTriangle } from 'lucide-react';
import { CompanionTrigger } from './SpiritCompanion';

interface Props {
  location: LocationData;
  onBack: () => void;
  onComplete: () => void;
  onCompanionTrigger?: (t: CompanionTrigger) => void;
}
type Step = 'intro' | 'reading' | 'quiz' | 'quiz-results' | 'reading-retry' | 'sentence-builder' | 'missing-words' | 'success';
const PASS_SCORE = 4;

const LocationLevel: React.FC<Props> = ({ location, onBack, onComplete, onCompanionTrigger }) => {
  const [step, setStep] = useState<Step>('intro');
  const [qIdx, setQIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(location.questions.length).fill(null));
  const total = location.questions.length;

  const score = answers.filter((a, i) => a === location.questions[i].correctIndex).length;

  const resetQuiz = () => { setQIdx(0); setSelected(null); setAnswers(new Array(total).fill(null)); };
  const trigger = (t: CompanionTrigger) => onCompanionTrigger?.(t);

  if (step === 'intro') return (
    <div className="min-h-screen bg-slate-900 pt-16 px-4 flex flex-col items-center">
      <div className="max-w-3xl w-full mt-4">
        <Button variant="secondary" onClick={onBack} className="mb-6"><ArrowLeft className="w-4 h-4" /> Back to Map</Button>
        <div className="relative rounded-2xl overflow-hidden shadow-2xl mb-8 border border-slate-600">
          <img src={location.introImage} alt={location.name} className="w-full h-64 sm:h-80 object-cover" />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6 pt-24">
            <h1 className="text-4xl font-serif text-white mb-2">{location.name}</h1>
          </div>
        </div>
        <p className="text-xl text-slate-300 italic mb-8 border-l-4 border-amber-500 pl-4 bg-slate-800/50 p-4 rounded-r">{location.shortDescription}</p>
        <Button onClick={() => setStep('reading')} className="w-full sm:w-auto"><BookOpen className="w-5 h-5" /> Read the Story</Button>
      </div>
    </div>
  );

  const ReadingContent = ({ onStart, retryScore }: { onStart: () => void; retryScore?: number }) => (
    <div className="min-h-screen bg-slate-900 pt-16 px-4 flex justify-center">
      <div className="max-w-2xl w-full bg-slate-800 p-6 sm:p-10 rounded-xl shadow-xl border border-slate-600 mt-4">
        {retryScore !== undefined && (
          <div className="flex items-start gap-3 bg-red-900/30 border border-red-700 rounded-lg p-4 mb-6">
            <AlertTriangle className="w-6 h-6 text-red-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-red-300 font-bold">Not enough correct answers</p>
              <p className="text-red-200 text-sm mt-1">You got <strong>{retryScore} out of {total}</strong> correct. You need at least <strong>{PASS_SCORE}</strong>. Read carefully again.</p>
            </div>
          </div>
        )}
        <h2 className="text-2xl font-serif text-amber-400 mb-6 border-b border-slate-600 pb-2">History & Culture: {location.name}</h2>
        <div className="space-y-4 text-lg text-slate-200 leading-relaxed mb-8">
          {location.readingText.map((p, i) => <p key={i}>{p}</p>)}
        </div>
        <Button onClick={() => { resetQuiz(); onStart(); trigger({ type: 'entered-location', locationId: location.id }); }} className="w-full">
          {retryScore !== undefined ? 'I read the text' : 'Start Quiz'} <ArrowRight className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );

  if (step === 'reading') return <ReadingContent onStart={() => setStep('quiz')} />;
  if (step === 'reading-retry') return <ReadingContent onStart={() => setStep('quiz')} retryScore={score} />;

  if (step === 'quiz') {
    const q = location.questions[qIdx];
    const isLast = qIdx === total - 1;
    const handleNext = () => {
      const upd = [...answers]; upd[qIdx] = selected; setAnswers(upd);
      if (isLast) {
        setStep('quiz-results');
        const finalScore = upd.filter((a, i) => a === location.questions[i].correctIndex).length;
        trigger(finalScore >= PASS_SCORE ? { type: 'quiz-passed' } : { type: 'wrong-answer' });
      }
      else { setQIdx(p => p + 1); setSelected(null); }
    };
    return (
      <div className="min-h-screen bg-slate-900 pt-16 px-4 flex justify-center items-center">
        <div className="max-w-2xl w-full bg-slate-800 p-6 sm:p-10 rounded-xl shadow-xl border border-slate-600">
          <div className="mb-6">
            <div className="flex justify-between text-slate-400 text-sm mb-2">
              <span>Question {qIdx + 1} of {total}</span>
              <span className="text-amber-400 cursor-pointer hover:underline" onClick={() => setStep('reading')}>Read Text Again</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-1.5">
              <div className="bg-amber-500 h-1.5 rounded-full transition-all" style={{ width: `${(qIdx / total) * 100}%` }} />
            </div>
          </div>
          <h3 className="text-xl font-bold text-white mb-6">{q.text}</h3>
          <div className="space-y-3 mb-8">
            {q.options.map((opt, i) => (
              <button key={i} onClick={() => setSelected(i)}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all ${selected === i ? 'border-amber-500 bg-amber-900/30 text-white' : 'border-slate-600 bg-slate-700 text-slate-300 hover:bg-slate-600'}`}>
                {opt}
              </button>
            ))}
          </div>
          <div className="flex justify-end">
            <Button onClick={handleNext} disabled={selected === null}>
              {isLast ? 'See Results' : 'Next Question'} <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'quiz-results') {
    const passed = score >= PASS_SCORE;
    return (
      <div className="min-h-screen bg-slate-900 pt-16 px-4 flex justify-center">
        <div className="max-w-2xl w-full bg-slate-800 p-6 sm:p-10 rounded-xl shadow-xl border border-slate-600 mt-4 mb-4">
          <div className={`rounded-xl p-5 mb-8 text-center border-2 ${passed ? 'bg-green-900/30 border-green-600' : 'bg-red-900/30 border-red-700'}`}>
            <p className={`text-4xl font-bold mb-1 ${passed ? 'text-green-300' : 'text-red-300'}`}>{score} / {total}</p>
            <p className={`text-sm font-semibold ${passed ? 'text-green-400' : 'text-red-400'}`}>
              {passed ? 'Well done! You can continue.' : `You need at least ${PASS_SCORE} correct.`}
            </p>
          </div>
          {passed && (
            <div className="space-y-3 mb-8">
              {location.questions.map((q, i) => {
                const ok = answers[i] === q.correctIndex;
                return (
                  <div key={q.id} className={`flex items-center gap-3 p-4 rounded-lg border ${ok ? 'bg-green-900/20 border-green-800/60' : 'bg-red-900/20 border-red-800/60'}`}>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${ok ? 'bg-green-700' : 'bg-red-700'}`}>
                      {ok ? <Check className="w-3.5 h-3.5 text-white" /> : <X className="w-3.5 h-3.5 text-white" />}
                    </div>
                    <p className={`text-sm font-semibold ${ok ? 'text-green-200' : 'text-red-200'}`}>{i + 1}. {q.text}</p>
                  </div>
                );
              })}
            </div>
          )}
          {passed
            ? <Button onClick={() => setStep('sentence-builder')} className="w-full">Continue <ArrowRight className="w-4 h-4" /></Button>
            : <Button onClick={() => setStep('reading-retry')} className="w-full bg-slate-700 hover:bg-slate-600 border-slate-500"><BookOpen className="w-4 h-4" /> Read the text again</Button>
          }
        </div>
      </div>
    );
  }

  if (step === 'sentence-builder') return <SentenceBuilder tasks={location.sentenceBuilderTasks} onComplete={() => setStep('missing-words')} />;
  if (step === 'missing-words') return <MissingWords tasks={location.missingWordsTasks} onComplete={() => { setStep('success'); trigger({ type: 'location-complete' }); }} />;

  if (step === 'success') return (
    <div className="min-h-screen bg-slate-900 pt-16 px-4 flex justify-center items-center text-center">
      <div className="max-w-md w-full bg-slate-800 p-8 rounded-2xl border-2 border-amber-500 shadow-[0_0_30px_rgba(245,158,11,0.2)]">
        <h2 className="text-3xl font-serif text-amber-400 mb-4">Symbol Found!</h2>
        <p className="text-slate-300 mb-8">"You have learned the story. Honu's symbol appears before you."</p>
        <div className="bg-black/40 p-6 rounded-full w-40 h-40 mx-auto mb-6 flex items-center justify-center border-4 border-amber-500 shadow-inner">
          <div className="animate-bounce">{getIcon(location.symbol, 'w-20 h-20')}</div>
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">{location.symbol}</h3>
        <p className="text-amber-300 italic mb-8">{location.symbolMeaning}</p>
        <Button onClick={onComplete} className="w-full">Add to Collection & Return</Button>
      </div>
    </div>
  );

  return null;
};

export default LocationLevel;

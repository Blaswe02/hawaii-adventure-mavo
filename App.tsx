import React, { useState, useRef } from 'react';
import { ViewState, PlayerState } from './types';
import { LOCATIONS } from './data';
import Intro from './components/Intro';
import MapHub from './components/MapHub';
import LocationLevel from './components/LocationLevel';
import OracleChamber from './components/OracleChamber';
import MysteryGate from './components/MysteryGate';
import Inventory from './components/Inventory';
import Reflection from './components/Reflection';
import TeacherPreview from './components/TeacherPreview';
import Button from './components/Button';
import { Waves, RotateCcw, X } from 'lucide-react';

const TEACHER_PASSCODE = 'HAWAII';
const SECRET_CLICKS = 5;

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('intro');
  const [player, setPlayer] = useState<PlayerState>({ inventory: [], completedLocations: [], wish: '' });
  const [activeId, setActiveId] = useState<string | null>(null);
  const [clickCount, setClickCount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [passcodeError, setPasscodeError] = useState(false);
  const [showTeacher, setShowTeacher] = useState(false);
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const activeLocation = LOCATIONS.find(l => l.id === activeId);

  const handleSymbolsClick = () => {
    if (resetTimer.current) clearTimeout(resetTimer.current);
    resetTimer.current = setTimeout(() => setClickCount(0), 3000);
    const next = clickCount + 1;
    if (next >= SECRET_CLICKS) { setClickCount(0); setPasscode(''); setPasscodeError(false); setShowModal(true); }
    else setClickCount(next);
  };

  const handlePasscode = () => {
    if (passcode.toUpperCase() === TEACHER_PASSCODE) { setShowModal(false); setPasscode(''); setPasscodeError(false); setShowTeacher(true); }
    else { setPasscodeError(true); setPasscode(''); }
  };

  if (showTeacher) return <TeacherPreview locations={LOCATIONS} onClose={() => setShowTeacher(false)} />;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-amber-500 selection:text-white">
      {view !== 'intro' && view !== 'ending' && (
        <Inventory symbols={player.inventory} onSymbolsClick={handleSymbolsClick} />
      )}

      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-8 w-full max-w-sm shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-serif text-yellow-400">Teacher Access</h2>
              <button onClick={() => { setShowModal(false); setPasscodeError(false); }} className="text-slate-500 hover:text-slate-300"><X className="w-5 h-5" /></button>
            </div>
            <p className="text-slate-400 text-sm mb-4">Enter the passcode to view all content and answer keys.</p>
            <input type="password" value={passcode} onChange={e => { setPasscode(e.target.value); setPasscodeError(false); }}
              onKeyDown={e => e.key === 'Enter' && handlePasscode()} placeholder="Passcode" autoFocus
              className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-yellow-500 mb-3 font-mono tracking-widest text-center text-lg" />
            {passcodeError && <p className="text-red-400 text-sm text-center mb-3 animate-pulse">Incorrect passcode.</p>}
            <Button onClick={handlePasscode} className="w-full bg-yellow-600 hover:bg-yellow-500 border-yellow-400">Enter</Button>
          </div>
        </div>
      )}

      {view === 'intro' && <Intro onComplete={() => setView('map')} />}

      {view === 'map' && (
        <MapHub locations={LOCATIONS} completedLocations={player.completedLocations}
          onSelectLocation={id => { setActiveId(id); setView('location'); }}
          onEnterOracle={() => setView('mystery_gate')} />
      )}

      {view === 'location' && activeLocation && (
        <LocationLevel location={activeLocation}
          onBack={() => { setActiveId(null); setView('map'); }}
          onComplete={() => {
            setPlayer(p => ({ ...p, completedLocations: [...p.completedLocations, activeLocation.id], inventory: [...p.inventory, activeLocation.symbol] }));
            setActiveId(null); setView('map');
          }} />
      )}

      {view === 'mystery_gate' && <MysteryGate locations={LOCATIONS} onComplete={() => setView('oracle')} />}
      {view === 'oracle' && <OracleChamber onComplete={wish => { setPlayer(p => ({ ...p, wish })); setView('reflection'); }} />}
      {view === 'reflection' && <Reflection onComplete={() => setView('ending')} />}

      {view === 'ending' && (
        <div className="min-h-screen bg-emerald-950 flex flex-col items-center justify-center p-6 text-center">
          <h1 className="text-4xl font-serif text-amber-400 mb-6">Mahalo! Adventure Complete</h1>
          <div className="bg-slate-900 p-8 rounded-xl shadow-2xl border border-amber-700 max-w-lg w-full">
            <h2 className="text-xl text-slate-400 mb-4">Your Aloha Wish:</h2>
            <p className="text-2xl font-serif text-white italic mb-8">"{player.wish}"</p>
            <div className="flex justify-center gap-3 mb-4">
              <Waves className="w-6 h-6 text-cyan-400" />
              <Waves className="w-6 h-6 text-cyan-400" />
              <Waves className="w-6 h-6 text-cyan-400" />
            </div>
            <button onClick={() => window.location.reload()} className="text-amber-400 hover:text-amber-300 underline flex items-center justify-center gap-2 mx-auto">
              <RotateCcw className="w-4 h-4" /> Start New Adventure
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;

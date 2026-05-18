import React from 'react';
import { LocationData } from '../types';
import { Lock, MapPin, CheckCircle, Waves } from 'lucide-react';
import Button from './Button';

interface MapHubProps {
  locations: LocationData[];
  completedLocations: string[];
  onSelectLocation: (id: string) => void;
  onEnterOracle: () => void;
}

const MapHub: React.FC<MapHubProps> = ({ locations, completedLocations, onSelectLocation, onEnterOracle }) => {
  const allCompleted = locations.every(loc => completedLocations.includes(loc.id));

  return (
    <div className="min-h-screen bg-emerald-950 p-4 pt-16 flex flex-col items-center">
      <h2 className="text-3xl font-serif text-amber-400 mb-2 text-center mt-4">Map of Hawaiʻi</h2>
      <p className="text-emerald-200/80 mb-6 text-center max-w-lg text-sm">
        Explore the islands. Help Honu find the six sacred symbols of Aloha.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl w-full mb-24">
        {locations.map((loc) => {
          const isCompleted = completedLocations.includes(loc.id);
          return (
            <div
              key={loc.id}
              onClick={() => !isCompleted && onSelectLocation(loc.id)}
              className={`relative group rounded-xl overflow-hidden border-2 transition-all cursor-pointer h-44 ${
                isCompleted
                  ? 'border-emerald-600 opacity-70'
                  : 'border-slate-600 hover:border-amber-500 hover:scale-[1.02]'
              }`}
            >
              <img
                src={loc.introImage}
                alt={loc.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 grayscale group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors p-4 flex flex-col justify-end">
                <h3 className="text-lg font-serif text-white mb-1 flex items-center gap-2">
                  {loc.name}
                  {isCompleted && <CheckCircle className="text-amber-400 w-5 h-5" />}
                </h3>
                <p className="text-slate-300 text-xs">{loc.shortDescription}</p>
                {!isCompleted && (
                  <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity text-amber-400 font-bold flex items-center gap-1 text-sm">
                    <MapPin className="w-3 h-3" /> Visit
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-emerald-950/90 border-t border-emerald-800 flex justify-center backdrop-blur">
        <Button
          variant={allCompleted ? 'primary' : 'secondary'}
          onClick={onEnterOracle}
          disabled={!allCompleted}
          className="w-full max-w-md py-4 text-lg"
        >
          {allCompleted ? 'Restore the Aloha Spirit' : `Collect all Symbols (${completedLocations.length}/${locations.length})`}
          {allCompleted ? <Waves className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
        </Button>
      </div>
    </div>
  );
};

export default MapHub;

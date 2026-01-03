import React, { useState } from 'react';
import { AlertTriangle, Navigation, CheckCircle2 } from 'lucide-react';
import { CodeBlock } from '../ui/CodeBlock';

export const LSPGame: React.FC = () => {
  const [selected, setSelected] = useState<'Cruiser' | 'Snowplow'>('Cruiser');
  const [isSummer, setIsSummer] = useState(true);

  const cruiserCode = `class Cruiser implements AllTerrain {\n    public function move() {\n        // Reliable across all contexts!\n    }\n}`;
  const snowplowCode = `class Snowplow extends Vehicle {\n    public function drive() {\n        if ($temp > 0) {\n            throw new Exception("Needs Snow!");\n        }\n    }\n}`;

  const isViolation = isSummer && selected === 'Snowplow';

  return (
    <div className="bg-white p-6 rounded-[2rem] shadow-xl border border-purple-100">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2.5 bg-purple-100 rounded-xl text-purple-600">
          <Navigation className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-xl font-extrabold text-gray-800 tracking-tight">Fleet Substitution (LSP)</h3>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Liskov Substitution Principle</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-gray-50/50 p-5 rounded-3xl space-y-5 border border-gray-100">
            <div>
              <label className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest block mb-3 px-1">Current Mission Context</label>
              <button 
                onClick={() => setIsSummer(!isSummer)}
                className={`w-full py-3 px-4 rounded-xl font-extrabold text-xs transition-all flex items-center justify-center gap-3 shadow-md ${isSummer ? 'bg-orange-500 text-white shadow-orange-500/20' : 'bg-blue-600 text-white shadow-blue-500/20'}`}
              >
                {isSummer ? '☀️ Summer (25°C)' : '❄️ Winter (-10°C)'}
                <span className="bg-black/10 px-2 py-0.5 rounded-full text-[9px] uppercase tracking-tighter">Toggle Weather</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={() => setSelected('Cruiser')}
                className={`py-3 rounded-xl font-extrabold text-[11px] transition-all border-2 uppercase tracking-wide ${selected === 'Cruiser' ? 'border-purple-600 bg-white text-purple-600 shadow-lg scale-105' : 'border-transparent bg-gray-100 text-gray-400 hover:bg-gray-200'}`}
              >
                Cruiser
              </button>
              <button 
                onClick={() => setSelected('Snowplow')}
                className={`py-3 rounded-xl font-extrabold text-[11px] transition-all border-2 uppercase tracking-wide ${selected === 'Snowplow' ? 'border-purple-600 bg-white text-purple-600 shadow-lg scale-105' : 'border-transparent bg-gray-100 text-gray-400 hover:bg-gray-200'}`}
              >
                Snowplow
              </button>
            </div>
          </div>

          <div className={`p-6 rounded-[1.5rem] border-2 transition-all duration-500 ${isViolation ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'}`}>
            <div className="flex items-start gap-4">
              <div className={`p-2 rounded-xl ${isViolation ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`}>
                {isViolation ? <AlertTriangle className="w-5 h-5 shrink-0" /> : <CheckCircle2 className="w-5 h-5 shrink-0" />}
              </div>
              <div>
                <p className={`font-extrabold text-sm ${isViolation ? 'text-red-700' : 'text-green-700'}`}>
                  {isViolation ? 'CONTRACT BROKEN!' : 'SUBSTITUTION VALID'}
                </p>
                <p className={`text-[12px] mt-2 leading-relaxed font-bold ${isViolation ? 'text-red-600' : 'text-green-600'}`}>
                  {isViolation 
                    ? "Subclass Snowplow added a temperature precondition. Ryder can't use it where a generic Vehicle is expected!" 
                    : "The vehicle matches the generic FleetVehicle contract. Ryder can call it safely."}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <CodeBlock 
            compact 
            isGood={!isViolation} 
            title={selected === 'Cruiser' ? 'Cruiser.php' : 'Snowplow.php'} 
            code={selected === 'Cruiser' ? cruiserCode : snowplowCode} 
          />
        </div>
      </div>
    </div>
  );
};
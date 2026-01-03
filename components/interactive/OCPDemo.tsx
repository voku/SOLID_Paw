import React, { useState } from 'react';
import { Plus, Settings, ChevronDown } from 'lucide-react';
import { CodeBlock } from '../ui/CodeBlock';

interface Pup {
  id: string;
  name: string;
  gear: string;
  color: string;
}

export const OCPDemo: React.FC = () => {
  const [activePups, setActivePups] = useState<Pup[]>([
    { id: 'p1', name: 'Chase', gear: 'Police Gear', color: 'bg-blue-600' },
    { id: 'p2', name: 'Marshall', gear: 'Fire Gear', color: 'bg-red-600' },
  ]);

  const [logs, setLogs] = useState<string[]>([]);

  const launch = () => {
    const newLogs = activePups.map(p => `Slide: Launching ${p.name} with generic RescueVehicle interface...`);
    setLogs(newLogs);
  };

  const addSkye = () => {
    if (activePups.find(p => p.name === 'Skye')) return;
    setActivePups(prev => [...prev, { id: 'p3', name: 'Skye', gear: 'Flight Gear', color: 'bg-pink-500' }]);
    setLogs([]);
  };

  const slideCode = `class Slide {\n    // Closed to modification!\n    public function launch(RescueVehicle $v) {\n        $v->launch();\n    }\n}`;

  return (
    <div className="bg-white p-6 rounded-[2rem] shadow-xl border border-green-100">
       <div className="flex items-center gap-3 mb-2">
        <div className="p-2.5 bg-green-100 rounded-xl text-green-600">
          <ChevronDown className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-xl font-extrabold text-gray-800 tracking-tight">The Lookout Slide (OCP)</h3>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Open-Closed Principle</p>
        </div>
      </div>
      
      <p className="text-gray-600 mb-8 text-sm font-bold mt-2">
        The Slide is <span className="text-red-500 underline decoration-2 underline-offset-4">Closed</span> to modification, but <span className="text-green-600 underline decoration-2 underline-offset-4">Open</span> to new pups!
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-slate-50/50 p-5 rounded-2xl border border-gray-100">
            <h4 className="text-[10px] font-extrabold text-gray-400 uppercase tracking-[0.2em] mb-4 flex justify-between items-center">
              Active Fleet
              {!activePups.find(p => p.name === 'Skye') && (
                <button 
                  onClick={addSkye}
                  className="bg-green-600 text-white px-3 py-1.5 rounded-lg text-[9px] font-extrabold hover:bg-green-700 transition-all shadow-md active:scale-95"
                >
                  + Add Skye
                </button>
              )}
            </h4>
            <div className="space-y-2">
              {activePups.map(p => (
                <div key={p.id} className="flex items-center gap-3 bg-white p-3 rounded-xl shadow-sm border border-gray-100 transform hover:scale-[1.02] transition-transform">
                  <div className={`w-2.5 h-2.5 rounded-full ${p.color}`}></div>
                  <span className="font-extrabold text-[12px] text-gray-700">{p.name}</span>
                  <span className="text-[9px] text-gray-400 ml-auto font-extrabold uppercase tracking-widest bg-gray-50 px-2 py-0.5 rounded-full">{p.gear}</span>
                </div>
              ))}
            </div>
          </div>

          <CodeBlock 
            compact 
            isGood={true} 
            title="Slide.php" 
            code={slideCode} 
          />
        </div>

        <div className="flex flex-col justify-center gap-4">
          <div className="bg-slate-900 rounded-2xl p-6 font-mono text-[11px] min-h-[180px] shadow-2xl relative overflow-hidden group border border-slate-800">
            <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 rounded-full blur-3xl group-hover:bg-green-500/10 transition-colors"></div>
            <div className="text-slate-500 mb-4 border-b border-slate-800 pb-2 flex justify-between font-bold uppercase tracking-widest text-[9px]">
              <span>Tower Output</span>
              <span className="animate-pulse flex items-center gap-1"><span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span> Ready</span>
            </div>
            {logs.length === 0 ? (
              <span className="text-slate-600 italic">Slide is clear for launch...</span>
            ) : (
              logs.map((log, i) => <div key={i} className="text-green-400 mb-2 leading-relaxed">&gt; {log}</div>)
            )}
          </div>
          
          <button 
            onClick={launch}
            className="bg-green-600 text-white font-extrabold py-4 px-6 rounded-2xl hover:bg-green-700 active:scale-95 transition-all shadow-xl shadow-green-500/20 flex items-center justify-center gap-3 text-sm uppercase tracking-widest"
          >
            <Settings className="w-5 h-5" />
            Launch All Vehicles
          </button>
        </div>
      </div>
    </div>
  );
};
import React, { useState } from 'react';
import { Radio, Signal, Info } from 'lucide-react';
import { CodeBlock } from '../ui/CodeBlock';

export const DIPGame: React.FC = () => {
  const [isDecoupled, setIsDecoupled] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);

  const callForHelp = () => {
    if (!isDecoupled) {
      setLogs(prev => [`Tablet -> Direct Dependency: Marshall (Concrete Class)`, ...prev].slice(0, 3));
    } else {
      setLogs(prev => [`Tablet -> Broadcast: Firefighter (Abstraction)`, `Found Responder: Marshall tuned in!`, ...prev].slice(0, 3));
    }
  };

  const tabletCode = isDecoupled 
    ? `class RyderTablet {\n    public function alert(Firefighter $f) {\n        // Depends on concept, not the pup!\n        $f->extinguish();\n    }\n}` 
    : `class RyderTablet {\n    public function alert() {\n        // Error: Depends on concrete Marshall\n        $responder = new Marshall();\n        $responder->spray();\n    }\n}`;

  return (
    <div className="bg-white p-6 rounded-[2rem] shadow-xl border border-orange-100">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2.5 bg-orange-100 rounded-xl text-orange-600">
          <Radio className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-xl font-extrabold text-gray-800 tracking-tight">The Rescue Frequency (DIP)</h3>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Dependency Inversion Principle</p>
        </div>
      </div>
      
      <p className="text-gray-600 mb-8 text-sm font-bold mt-2">
        Ryder depends on the <span className="text-orange-600">Firefighter</span> abstraction, not the specific wire to Marshall's radio.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <div className="space-y-6">
          <div className="bg-gray-100/80 p-1.5 rounded-2xl flex gap-1 shadow-inner">
            <button
              onClick={() => setIsDecoupled(false)}
              className={`flex-1 py-3 rounded-xl text-[10px] font-extrabold uppercase transition-all tracking-wider ${!isDecoupled ? 'bg-white shadow text-orange-600' : 'text-gray-400 hover:text-gray-600'}`}
            >
              Tight Coupling
            </button>
            <button
              onClick={() => setIsDecoupled(true)}
              className={`flex-1 py-3 rounded-xl text-[10px] font-extrabold uppercase transition-all tracking-wider ${isDecoupled ? 'bg-white shadow text-orange-600' : 'text-gray-400 hover:text-gray-600'}`}
            >
              Inverted (DIP)
            </button>
          </div>
          
          <CodeBlock 
            compact 
            isGood={isDecoupled} 
            title="RyderTablet.php" 
            code={tabletCode} 
          />
        </div>

        <div className="bg-slate-50/50 p-8 rounded-[2.5rem] border border-dashed border-gray-200 flex flex-col items-center">
           <div className="flex items-center gap-2 mb-6">
             <Signal className={`w-4 h-4 ${isDecoupled ? 'text-green-500 animate-pulse' : 'text-red-400'}`} />
             <h4 className="text-[10px] font-extrabold text-gray-400 uppercase tracking-[0.3em]">Command Center</h4>
           </div>
           
           <button 
            onClick={callForHelp}
            className={`font-extrabold py-5 px-10 rounded-2xl shadow-xl transform active:scale-95 transition-all flex items-center gap-3 text-xs uppercase tracking-[0.2em] ${isDecoupled ? 'bg-orange-500 text-white hover:bg-orange-600' : 'bg-gray-800 text-white hover:bg-gray-900'}`}
           >
             <Radio className="w-5 h-5" /> Dispatch Alert
           </button>

           <div className="w-full mt-8 bg-slate-900 rounded-2xl p-5 font-mono text-[11px] min-h-[140px] shadow-2xl border border-slate-800">
            <div className="flex justify-between items-center mb-3 border-b border-slate-800 pb-2">
              <span className="text-slate-600 text-[9px] font-bold uppercase tracking-widest">Frequency Logs</span>
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-ping"></span>
            </div>
            {logs.length === 0 ? (
              <span className="text-slate-600 italic">Waiting for Ryder's command...</span>
            ) : (
              logs.map((l, i) => <div key={i} className="text-orange-400 mb-2 leading-relaxed">&gt; {l}</div>)
            )}
          </div>
        </div>
      </div>
      
      <div className="mt-8 p-5 bg-orange-50 rounded-2xl border border-orange-100 flex gap-4 items-start shadow-sm transform hover:scale-[1.01] transition-transform">
        <div className="bg-orange-500 p-2 rounded-xl text-white mt-1 shrink-0">
          <Info className="w-4 h-4" />
        </div>
        <p className="text-[12px] text-orange-900 font-bold leading-relaxed">
          <strong>Mission Insight:</strong> By depending on the <code className="bg-orange-200/50 px-1 rounded">Firefighter</code> abstraction, Ryder's Tablet works even if Marshall is out! We can plug in <em>any</em> pup who implements the firefighter role.
        </p>
      </div>
    </div>
  );
};
import React, { useState } from 'react';
import { CheckSquare, AlertTriangle, Wind } from 'lucide-react';
import { CodeBlock } from '../ui/CodeBlock';

export const ISPGame: React.FC = () => {
  const [segregated, setSegregated] = useState(false);

  const skyeCode = segregated 
    ? `class Skye implements FlightPack {\n    public function fly() {\n        // Lightweight and efficient!\n    }\n}`
    : `class Skye implements UniversalPack {\n    public function fly() { ... }\n    public function sprayWater() {\n        throw new Error("Too heavy!");\n    }\n}`;

  return (
    <div className="bg-white p-6 rounded-[2rem] shadow-xl border border-pink-100">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2.5 bg-pink-100 rounded-xl text-pink-600">
          <Wind className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-xl font-extrabold text-gray-800 tracking-tight">Pup Pack Specs (ISP)</h3>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Interface Segregation Principle</p>
        </div>
      </div>
      
      <p className="text-gray-600 mb-8 text-sm font-bold mt-2">
        Don't force Pups to implement gear they don't carry!
      </p>

      <div className="flex justify-center mb-8">
        <div className="bg-gray-100/80 p-1.5 rounded-2xl flex gap-1 shadow-inner backdrop-blur-sm">
          <button 
            onClick={() => setSegregated(false)}
            className={`px-8 py-2.5 rounded-xl text-xs font-extrabold transition-all tracking-tight ${!segregated ? 'bg-white shadow-md text-pink-600 scale-105' : 'text-gray-400 hover:text-gray-600'}`}
          >
            Universal Interface
          </button>
          <button 
             onClick={() => setSegregated(true)}
             className={`px-8 py-2.5 rounded-xl text-xs font-extrabold transition-all tracking-tight ${segregated ? 'bg-white shadow-md text-pink-600 scale-105' : 'text-gray-400 hover:text-gray-600'}`}
          >
            Segregated Interfaces
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h4 className="text-[10px] font-extrabold uppercase text-gray-400 tracking-[0.2em] px-2 mb-4">Contract Definition</h4>
          {segregated ? (
            <div className="space-y-4">
              <CodeBlock 
                compact 
                isGood={true} 
                title="FlightPack.php" 
                code={`interface FlightPack {\n    public function fly();\n}`} 
              />
              <CodeBlock 
                compact 
                isGood={true} 
                title="FirePack.php" 
                code={`interface FirePack {\n    public function spray();\n}`} 
              />
            </div>
          ) : (
            <CodeBlock 
              compact 
              isGood={false} 
              title="UniversalPack.php" 
              code={`interface UniversalPack {\n    public function fly();\n    public function sprayWater();\n    public function digHoles();\n}`} 
            />
          )}
        </div>

        <div className="space-y-4">
          <h4 className="text-[10px] font-extrabold uppercase text-gray-400 tracking-[0.2em] px-2 mb-4">Pup Implementation</h4>
          <div className="space-y-5">
            <CodeBlock 
              compact 
              isGood={segregated} 
              title="Skye.php" 
              code={skyeCode} 
            />
            
            <div className="space-y-2">
               <div className="flex items-center gap-3 text-[11px] font-extrabold text-green-600 bg-green-50 p-3 rounded-xl border border-green-100 shadow-sm">
                  <CheckSquare className="w-4 h-4 shrink-0" /> fly() - Validated
               </div>
               
               {!segregated && (
                  <div className="flex items-start gap-3 text-[11px] font-extrabold text-red-600 bg-red-50 p-4 rounded-xl border border-red-100 animate-in slide-in-from-top-1 duration-300">
                     <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" /> 
                     <span>ISP Violation! Skye implements sprayWater() but throws an Error because she doesn't carry a pump.</span>
                  </div>
               )}
            </div>
          </div>
        </div>
      </div>

      <div className={`mt-10 p-5 rounded-3xl border-2 text-center transition-all duration-500 shadow-lg ${segregated ? 'bg-green-50 border-green-200 text-green-700 shadow-green-500/5' : 'bg-red-50 border-red-200 text-red-700 shadow-red-500/5'}`}>
        <p className="font-extrabold text-xs uppercase tracking-[0.2em]">
          {segregated ? '✨ Mission Ready: Skye is light and agile!' : '🚨 Polluted Pack: Excessive Weight Detected!'}
        </p>
      </div>
    </div>
  );
};
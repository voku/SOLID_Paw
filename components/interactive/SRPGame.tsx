import React, { useState } from 'react';
import { Pup, Task } from '../../types';
import { Shield, AlertCircle, CheckCircle } from 'lucide-react';
import { CodeBlock } from '../ui/CodeBlock';

const TASKS: Task[] = [
  { id: 't1', description: 'Sniff out clues', requiredRole: 'Police' },
  { id: 't2', description: 'Extinguish fire', requiredRole: 'Fire' },
];

const PUPS: Pup[] = [
  { name: 'Chase', role: 'Police', color: 'bg-blue-600' },
  { name: 'Marshall', role: 'Fire', color: 'bg-red-600' },
];

export const SRPGame: React.FC = () => {
  const [assignments, setAssignments] = useState<Record<string, string | null>>({});
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleAssign = (taskId: string, pupName: string, pupRole: string, requiredRole: string) => {
    if (pupRole !== requiredRole) {
      setFeedback(`🚨 SRP Violation! ${pupName} is specialized for ${pupRole}. MissionHandler shouldn't mix roles!`);
      setTimeout(() => setFeedback(null), 3000);
      return;
    }
    setAssignments(prev => ({ ...prev, [taskId]: pupName }));
  };

  const isComplete = TASKS.every(t => assignments[t.id]);

  const dynamicCode = isComplete 
    ? `// GOOD: Responsibility is Decoupled\nclass FireService {\n    public function sprayWater() { ... }\n}\n\nclass PoliceService {\n    public function track() { ... }\n}`
    : `class MissionHandler {\n    public function run() {\n        // Mixing multiple responsibilities!\n        ${assignments['t2'] ? 'Marshall->spray();' : '// Waiting...'} \n        ${assignments['t1'] ? 'Chase->track();' : '// Waiting...'}\n    }\n}`;

  return (
    <div className="bg-white p-6 rounded-[2rem] shadow-xl border border-blue-100">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2.5 bg-blue-100 rounded-xl text-blue-600">
          <Shield className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-xl font-extrabold text-gray-800 tracking-tight">Mission Delegation (SRP)</h3>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Single Responsibility Principle</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          {feedback && (
            <div className="p-4 bg-red-50 text-red-600 rounded-2xl flex items-center gap-2 border border-red-100 text-xs font-bold animate-in fade-in zoom-in duration-200">
              <AlertCircle className="w-4 h-4 shrink-0" /> {feedback}
            </div>
          )}
          
          <div className="space-y-3">
            {TASKS.map(task => (
              <div key={task.id} className="p-5 bg-gray-50/50 rounded-2xl border border-gray-100 flex flex-col gap-4">
                <span className="text-[11px] font-extrabold text-gray-400 uppercase tracking-wider">{task.description}</span>
                <div className="flex gap-2">
                  {PUPS.map(pup => (
                    <button
                      key={pup.name}
                      onClick={() => handleAssign(task.id, pup.name, pup.role, task.requiredRole)}
                      disabled={!!assignments[task.id]}
                      className={`flex-1 py-3 rounded-xl text-[10px] font-extrabold transition-all ${
                        assignments[task.id] === pup.name 
                          ? `${pup.color} text-white shadow-lg scale-95` 
                          : assignments[task.id] ? 'bg-gray-100 text-gray-300 opacity-50' : `${pup.color} text-white hover:shadow-md hover:-translate-y-0.5 active:scale-95`
                      }`}
                    >
                      {pup.name}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {isComplete && (
            <div className="p-5 bg-green-50 text-green-700 rounded-2xl border border-green-100 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-2 duration-500">
              <CheckCircle className="w-5 h-5" />
              <p className="text-[11px] font-extrabold uppercase tracking-widest">Cohesion Maintained! No Bloat Detected.</p>
            </div>
          )}
        </div>

        <CodeBlock 
          compact 
          isGood={isComplete} 
          title={isComplete ? "DecoupledServices.php" : "MissionHandler.php"} 
          code={dynamicCode} 
        />
      </div>
    </div>
  );
};
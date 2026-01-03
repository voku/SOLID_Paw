import React, { useState, useEffect } from 'react';
import { PRINCIPLES } from './constants';
import { PrincipleType } from './types';
import { CodeBlock } from './components/ui/CodeBlock';
import { SRPGame } from './components/interactive/SRPGame';
import { OCPDemo } from './components/interactive/OCPDemo';
import { LSPGame } from './components/interactive/LSPGame';
import { ISPGame } from './components/interactive/ISPGame';
import { DIPGame } from './components/interactive/DIPGame';
import { 
  PawPrint, 
  ExternalLink, 
  Zap, 
  Shield, 
  Plus, 
  Minus,
  AlertTriangle, 
  List, 
  Share, 
  Lightbulb, 
  Info, 
  AlertCircle, 
  Layout,
  ChevronRight,
  Target,
  FlaskConical,
  Dog,
  ArrowRight,
  Quote,
  Radar,
  Bone,
  Footprints,
  Medal,
  TriangleAlert,
  Binoculars,
  Gamepad2,
  Terminal,
  BellRing,
  Construction,
  Search,
  Star,
  Trophy,
  Award
} from 'lucide-react';

interface InfoCardProps {
  title: string;
  icon: React.ReactNode;
  content: string | React.ReactNode;
  accentBg: string;
  isLarge?: boolean;
  isQuote?: boolean;
}

const InfoCard: React.FC<InfoCardProps> = ({ title, icon, content, accentBg, isLarge = false, isQuote = false }) => (
  <div className="bg-white p-5 rounded-2xl shadow-sm border border-black/5 mb-3 relative overflow-hidden group transition-all hover:shadow-md hover:-translate-y-0.5">
    <div className={`absolute top-0 left-0 w-1.5 h-full ${accentBg}`}></div>
    <div className="flex items-center justify-between mb-2">
      <span className="text-[10px] font-extrabold uppercase tracking-widest text-gray-400 flex items-center gap-2">
        <span className="opacity-70">{icon}</span> {title}
      </span>
      {isQuote && <Quote className="w-3 h-3 text-gray-200" />}
    </div>
    <div className="flex flex-col gap-1">
      <div className={`text-gray-900 leading-relaxed transition-transform group-hover:translate-x-0.5 ${
        isLarge ? 'font-extrabold text-lg tracking-tight' : 'font-bold text-sm'
      } ${isQuote ? 'italic text-gray-800' : ''}`}>
        {content}
      </div>
    </div>
  </div>
);

function App() {
  const [activeTab, setActiveTab] = useState<PrincipleType>(PrincipleType.SRP);
  const [activeSection, setActiveSection] = useState<string>('overview');
  const [showFailures, setShowFailures] = useState(false);
  const [mastered, setMastered] = useState<Set<string>>(new Set());

  const currentPrinciple = PRINCIPLES.find(p => p.id === activeTab)!;

  const onMastered = (id: string) => {
    if (!mastered.has(id)) {
      setMastered(prev => new Set(prev).add(id));
    }
  };

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-140px 0px -40% 0px',
      threshold: 0
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.getAttribute('id') || 'overview');
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    const sections = ['overview', 'playground', 'code'];
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [activeTab]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 140; 
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const renderInteractiveComponent = (id: PrincipleType) => {
    switch (id) {
      case PrincipleType.SRP: return <div onClick={() => onMastered(id)}><SRPGame /></div>;
      case PrincipleType.OCP: return <div onClick={() => onMastered(id)}><OCPDemo /></div>;
      case PrincipleType.LSP: return <div onClick={() => onMastered(id)}><LSPGame /></div>;
      case PrincipleType.ISP: return <div onClick={() => onMastered(id)}><ISPGame /></div>;
      case PrincipleType.DIP: return <div onClick={() => onMastered(id)}><DIPGame /></div>;
      default: return null;
    }
  };

  const getPrincipleIcon = (iconName: string, className: string) => {
    switch (iconName) {
      case 'shield': return <Shield className={className} />;
      case 'plus': return <Plus className={className} />;
      case 'alert': return <AlertTriangle className={className} />;
      case 'list': return <List className={className} />;
      case 'share': return <Share className={className} />;
      default: return <Zap className={className} />;
    }
  };

  const renderCodeExample = (id: PrincipleType) => {
    switch (id) {
        case PrincipleType.SRP:
            return (
                <div className="grid md:grid-cols-2 gap-6">
                    <CodeBlock 
                        title="BAD: Bloated Mission Class" 
                        isGood={false}
                        code={`class MissionHandler {\n    // Violation: Handles fire, tracking, AND database\n    public function extinguishFire() {\n        // Logic for Marshall\n    }\n    public function trackScent() {\n        // Logic for Chase\n    }\n    public function saveToDatabase() {\n        // Infrastructure logic\n    }\n}`} 
                    />
                    <CodeBlock 
                        title="GOOD: Decoupled Responsibility" 
                        isGood={true}
                        code={`class FireService {\n    public function sprayWater() {\n        // Strictly Marshall's responsibility\n    }\n}\n\nclass PoliceService {\n    public function track() {\n        // Strictly Chase's responsibility\n    }\n}`} 
                    />
                </div>
            );
        case PrincipleType.OCP:
             return (
                <div className="grid md:grid-cols-2 gap-6">
                    <CodeBlock 
                        title="BAD: Hard-coded Logic" 
                        isGood={false}
                        code={`class Slide {\n    public function launch($pup) {\n        if ($pup == 'Chase') {\n            $this->startPoliceVehicle();\n        } else if ($pup == 'Marshall') {\n            $this->startFireTruck();\n        }\n        // Adding Everest requires editing this file!\n    }\n}`} 
                    />
                    <CodeBlock 
                        title="GOOD: Open for Extensions" 
                        isGood={true}
                        code={`interface RescueVehicle {\n    public function launch();\n}\n\nclass Slide {\n    // This class is closed to modification.\n    public function launch(RescueVehicle $v) {\n        $v->launch();\n    }\n}`} 
                    />
                </div>
            );
        case PrincipleType.LSP:
            return (
                 <div className="grid md:grid-cols-2 gap-6">
                    <CodeBlock 
                        title="BAD: Contract Violation" 
                        isGood={false}
                        code={`class Snowplow extends Vehicle {\n    public function drive() {\n        if ($temp > 0) {\n            throw new Exception("Needs Snow!");\n        }\n        // Breaks the generic 'drive' promise!\n    }\n}`} 
                    />
                    <CodeBlock 
                        title="GOOD: Reliable Subtypes" 
                        isGood={true}
                        code={`interface AllTerrain {\n    public function move();\n}\n\nclass Cruiser implements AllTerrain {\n    public function move() {\n        // Works anywhere, anytime.\n    }\n}`} 
                    />
                </div>
            );
        case PrincipleType.ISP:
             return (
                 <div className="grid md:grid-cols-2 gap-6">
                    <CodeBlock 
                        title="BAD: Fat Interface" 
                        isGood={false}
                        code={`interface UniversalPack {\n    public function fly();\n    public function sprayWater();\n    public function digHoles();\n}\n\nclass Skye implements UniversalPack {\n    public function sprayWater() {\n        throw new Error("I don't have water!");\n    }\n}`} 
                    />
                    <CodeBlock 
                        title="GOOD: Split Interfaces" 
                        isGood={true}
                        code={`interface FlightPack { public function fly(); }\ninterface FirePack { public function spray(); }\n\nclass Skye implements FlightPack {\n    public function fly() {\n        // Skye only needs FlightGear!\n    }\n}`} 
                    />
                </div>
            );
        case PrincipleType.DIP:
             return (
                 <div className="grid md:grid-cols-2 gap-6">
                    <CodeBlock 
                        title="BAD: Direct Dependence" 
                        isGood={false}
                        code={`class RyderTablet {\n    public function alert() {\n        // Error: Depends on concrete Marshall\n        $responder = new Marshall();\n        $responder->spray();\n    }\n}`} 
                    />
                    <CodeBlock 
                        title="GOOD: Depending on Abstraction" 
                        isGood={true}
                        code={`interface Firefighter { public function extinguish(); }\n\nclass RyderTablet {\n    public function alert(Firefighter $f) {\n        // Ryder depends on the concept, not the pup!\n        $f->extinguish();\n    }\n}`} 
                    />
                </div>
            );
    }
  }

  const accentBgColor = currentPrinciple.color.replace('text', 'bg');
  const masteryProgress = (mastered.size / PRINCIPLES.length) * 100;
  const radius = 20;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="min-h-screen pb-12 pt-0 selection:bg-blue-100 selection:text-blue-900 bg-slate-50">
      
      {/* Top Header */}
      <div className="max-w-6xl mx-auto px-4 pt-8 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-6 overflow-visible">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-blue-600 rounded-2xl shadow-xl shadow-blue-500/20 text-white transform hover:rotate-6 transition-all shrink-0">
            <PawPrint className="w-8 h-8 md:w-10 md:h-10" aria-hidden="true" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-3xl md:text-4xl font-black text-gray-900 leading-none tracking-tight">SOLID Pups</h1>
            <span className="text-[10px] md:text-[12px] uppercase tracking-[0.3em] md:tracking-[0.4em] text-blue-500 font-extrabold mt-1 md:mt-1.5 flex items-center gap-2">
              <Medal className="w-3 h-3 md:w-4 md:h-4" /> Adventure Bay Academy
            </span>
          </div>
        </div>

        {/* Improved Mastery Tracker */}
        <div className="bg-white px-5 py-3 md:px-7 md:py-4 rounded-[1.5rem] md:rounded-[2.5rem] shadow-sm border border-blue-100 flex items-center gap-4 md:gap-6 group transition-all hover:shadow-md">
          <div className="relative w-12 h-12 md:w-14 md:h-14 flex items-center justify-center shrink-0">
            <svg className="w-full h-full transform -rotate-90 overflow-visible" viewBox="0 0 48 48">
              <circle cx="24" cy="24" r={radius} fill="transparent" stroke="#f1f5f9" strokeWidth="5" />
              <circle cx="24" cy="24" r={radius} fill="transparent" stroke="#3b82f6" strokeWidth="5" 
                strokeDasharray={circumference} 
                strokeDashoffset={circumference * (1 - masteryProgress / 100)}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <Trophy className={`absolute w-5 h-5 md:w-6 md:h-6 transition-all duration-500 ${masteryProgress === 100 ? 'text-yellow-500 animate-bounce' : 'text-blue-200 group-hover:text-blue-400'}`} />
          </div>
          <div className="flex flex-col min-w-0">
            <div className="text-[9px] font-black uppercase text-gray-400 tracking-[0.15em] mb-0.5 flex items-center gap-1.5">
              <Award className="w-2.5 h-2.5 text-blue-400" /> Mastery
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xl md:text-2xl font-black text-gray-900 tracking-tight">{mastered.size}/{PRINCIPLES.length}</span>
              <span className="text-[9px] font-black px-2 py-0.5 bg-yellow-400 text-yellow-900 rounded-full shadow-sm uppercase tracking-widest truncate">Badges</span>
            </div>
          </div>
        </div>
      </div>

      {/* Primary Sticky Nav: Optimized for Mobile */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-y border-blue-100/50 shadow-sm">
        <div className="max-w-6xl mx-auto flex flex-col">
            {/* Mission Selector Roster - Horizontal Scroll on Mobile */}
            <div className="py-2.5 px-2 flex items-center overflow-x-auto no-scrollbar mask-gradient-x">
               <div className="flex gap-2 min-w-max px-2" aria-label="Mission selection">
                  {PRINCIPLES.map((p) => (
                      <button
                          key={p.id}
                          onClick={() => {
                            setActiveTab(p.id);
                            setShowFailures(false);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className={`group relative px-4 py-2 rounded-xl font-black text-[10px] md:text-[11px] transition-all duration-300 flex items-center gap-2
                              ${activeTab === p.id 
                                  ? `${p.color} bg-white shadow-md ring-1 ring-black/5 scale-105 z-10` 
                                  : 'text-gray-400 hover:text-gray-600 hover:bg-white/60'
                              }`}
                      >
                          <span className={`w-1.5 h-1.5 rounded-full ${activeTab === p.id ? 'bg-current animate-pulse' : 'bg-gray-200 group-hover:bg-gray-300'}`}></span>
                          {p.id}
                          {mastered.has(p.id) && (
                            <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                          )}
                      </button>
                  ))}
               </div>
            </div>

            {/* Content Jump Links - Compact on Mobile with always visible short text */}
            <div className="py-1.5 px-2 flex items-center justify-center gap-2 md:gap-8 border-t border-blue-50 bg-blue-50/20">
               {[
                 { id: 'overview', label: 'Brief', icon: <Binoculars className="w-3.5 h-3.5" /> },
                 { id: 'playground', label: 'Play', icon: <Gamepad2 className="w-3.5 h-3.5" /> },
                 { id: 'code', label: 'Code', icon: <Terminal className="w-3.5 h-3.5" /> }
               ].map((section) => (
                 <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`flex items-center gap-1.5 md:gap-2 px-2.5 py-1 md:px-4 md:py-1.5 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-widest transition-all
                      ${activeSection === section.id 
                        ? `${currentPrinciple.color} bg-white shadow-sm ring-1 ring-black/5` 
                        : 'text-gray-400 hover:text-blue-600'}`}
                 >
                   {section.icon}
                   <span>{section.label}</span>
                 </button>
               ))}
            </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 pt-8 md:pt-12">
        <div className="grid lg:grid-cols-3 gap-8 md:gap-10 animate-in fade-in duration-700">
            
            {/* Left Column: Briefing */}
            <aside id="overview" className="lg:col-span-1 space-y-6 md:space-y-8 scroll-mt-32">
                <div className={`rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-8 ${currentPrinciple.bgLight} border ${currentPrinciple.borderColor} shadow-xl shadow-black/5 overflow-hidden relative`}>
                    <div className="absolute top-[-5%] right-[-5%] opacity-[0.03] pointer-events-none">
                      {getPrincipleIcon(currentPrinciple.pupIcon, 'w-48 h-48 md:w-64 md:h-64')}
                    </div>

                    <div className="flex items-center justify-between mb-6 md:mb-8">
                        <div className="flex flex-col">
                          <h2 className={`text-5xl md:text-6xl font-extrabold ${currentPrinciple.color} tracking-tighter leading-none`}>{currentPrinciple.id}</h2>
                          <span className="text-[9px] md:text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mt-1.5 md:mt-2 bg-white/50 px-2 py-0.5 rounded-full inline-block">Chief: {currentPrinciple.pupName}</span>
                        </div>
                        <div className={`p-3 md:p-4 rounded-[1rem] md:rounded-[1.25rem] bg-white shadow-sm ${currentPrinciple.color}`}>
                          {getPrincipleIcon(currentPrinciple.pupIcon, 'w-6 h-6 md:w-8 md:h-8')}
                        </div>
                    </div>

                    <div className="mb-6 md:mb-8">
                      <h3 className="text-xl md:text-2xl font-extrabold text-gray-800 leading-tight mb-1">{currentPrinciple.title}</h3>
                      <p className="font-bold text-gray-400 italic text-xs md:text-sm flex items-center gap-2">
                        <ArrowRight className="w-3.5 h-3.5 shrink-0" aria-hidden="true" /> {currentPrinciple.subtitle}
                      </p>
                    </div>
                    
                    <div className="space-y-3 md:space-y-4">
                      <InfoCard 
                        title="Mission Summary" 
                        icon={<Search className="w-3 h-3" />} 
                        content={currentPrinciple.visualSummary} 
                        accentBg={accentBgColor}
                        isLarge
                      />

                      <InfoCard 
                        title="Objective" 
                        icon={<Target className="w-3 h-3 text-orange-500" />} 
                        content={currentPrinciple.whyItMatters} 
                        accentBg="bg-orange-500"
                      />

                      <InfoCard 
                        title="The manual" 
                        icon={<BookOpenIcon />} 
                        content={currentPrinciple.officialDef} 
                        accentBg="bg-blue-500"
                        isQuote
                      />

                      <InfoCard 
                        title="Pup Analogy" 
                        icon={<Dog className="w-3 h-3 text-purple-500" />} 
                        content={currentPrinciple.pupAnalogy} 
                        accentBg="bg-purple-500"
                      />
                    </div>

                    <div className="mt-6 md:mt-8 bg-yellow-400/10 p-4 md:p-5 rounded-2xl md:rounded-3xl border border-yellow-400/20 shadow-sm flex gap-3 md:gap-4 transform hover:scale-[1.01] transition-transform">
                        <div className="p-2 bg-yellow-400 rounded-xl md:rounded-2xl flex-shrink-0 h-fit">
                          <Lightbulb className="w-4 h-4 md:w-5 md:h-5 text-yellow-900" aria-hidden="true" />
                        </div>
                        <div className="min-w-0">
                            <span className="text-[9px] md:text-[10px] font-extrabold uppercase tracking-widest text-yellow-700">Ryder's Pro Tip</span>
                            <p className="text-yellow-900 font-bold mt-1 text-[12px] md:text-[13px] leading-relaxed">{currentPrinciple.pragmaticHint}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-[1.5rem] md:rounded-[2rem] shadow-lg shadow-black/5 border border-gray-100 overflow-hidden transition-all duration-300">
                    <button 
                      onClick={() => setShowFailures(!showFailures)}
                      className="w-full p-5 md:p-6 flex items-center justify-between text-left group hover:bg-red-50/50 transition-colors focus:outline-none"
                    >
                      <div className="flex items-center gap-3 md:gap-4 min-w-0">
                        <div className={`p-2.5 md:p-3 rounded-xl md:rounded-2xl transition-all duration-500 shadow-sm shrink-0 ${showFailures ? 'bg-red-600 text-white rotate-[15deg]' : 'bg-red-50 text-red-600'}`}>
                          <BellRing className="w-5 h-5 md:w-6 md:h-6" aria-hidden="true" />
                        </div>
                        <div className="flex flex-col min-w-0">
                          <h4 className="font-extrabold text-gray-800 text-[10px] md:text-[12px] uppercase tracking-[0.1em] md:tracking-[0.2em] leading-none truncate">Trouble at the Tower</h4>
                          <span className={`text-[8px] md:text-[9px] font-bold mt-1 md:mt-1.5 uppercase tracking-widest transition-colors truncate ${showFailures ? 'text-red-600' : 'text-gray-400'}`}>
                            {showFailures ? "Trouble Identified!" : "Detect Bad Smells"}
                          </span>
                        </div>
                      </div>
                      <div className={`w-8 h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center border border-gray-100 transition-all duration-500 shrink-0 ${showFailures ? 'bg-red-600 border-red-600 rotate-180 text-white' : 'bg-white text-gray-400 group-hover:border-red-200'}`}>
                        {showFailures ? <Minus className="w-4 h-4 md:w-5 md:h-5" /> : <Plus className="w-4 h-4 md:w-5 md:h-5" />}
                      </div>
                    </button>
                    
                    <div 
                      className={`grid transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${showFailures ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
                    >
                      <div className="overflow-hidden">
                        <div className="px-5 md:px-6 pb-6 md:pb-8 pt-2 space-y-3 md:space-y-4">
                          {currentPrinciple.signsOfFailure.map((sign, idx) => (
                            <div 
                              key={idx} 
                              className="text-[12px] md:text-[13px] text-gray-700 font-bold flex gap-3 md:gap-4 p-4 md:p-5 bg-red-50/40 rounded-[1.25rem] md:rounded-[1.5rem] border border-red-100/50 transform transition-all duration-300 hover:translate-x-1 hover:bg-red-50"
                            >
                              <div className="w-5 h-5 md:w-6 md:h-6 shrink-0 bg-red-600 text-white rounded-lg md:rounded-xl flex items-center justify-center text-[9px] md:text-[10px] font-black shadow-lg shadow-red-500/20">
                                {idx + 1}
                              </div>
                              <span className="leading-relaxed">{sign}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                </div>
            </aside>

            {/* Right Column: Training & Blueprints */}
            <div className="lg:col-span-2 space-y-12 md:space-y-16">
                
                {/* Interactive Training */}
                <section id="playground" aria-label="Interactive Training Area" className="scroll-mt-32">
                    <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-8 px-1 md:px-2">
                        <div className="p-2.5 md:p-3 bg-gray-900 rounded-xl md:rounded-2xl shadow-xl shadow-black/10 text-white shrink-0">
                          <Gamepad2 className="w-5 h-5 md:w-6 md:h-6" aria-hidden="true" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <h3 className="text-2xl md:text-3xl font-extrabold text-gray-800 tracking-tight">Mission Training</h3>
                            {mastered.has(currentPrinciple.id) && (
                              <div className="w-fit flex items-center gap-1.5 bg-yellow-400/20 text-yellow-700 px-2.5 py-1 rounded-full text-[8px] md:text-[10px] font-black uppercase tracking-widest border border-yellow-400/30 animate-in zoom-in">
                                <Star className="w-2.5 h-2.5 fill-yellow-500" /> Mastery Earned
                              </div>
                            )}
                          </div>
                          <p className="text-[9px] md:text-[10px] font-black uppercase text-gray-400 tracking-widest mt-0.5">Interact to earn your badge</p>
                        </div>
                    </div>
                    <div className="overflow-x-auto no-scrollbar pb-4 md:pb-0">
                      {renderInteractiveComponent(activeTab)}
                    </div>
                </section>

                {/* Code Blueprints */}
                <section id="code" aria-label="Code Blueprints Area" className="scroll-mt-32 pb-8 md:pb-12">
                     <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-8 px-1 md:px-2">
                        <div className="p-2.5 md:p-3 bg-gray-900 rounded-xl md:rounded-2xl shadow-xl shadow-black/10 text-white shrink-0">
                          <Terminal className="w-5 h-5 md:w-6 md:h-6" aria-hidden="true" />
                        </div>
                        <div className="min-w-0">
                          <h3 className="text-2xl md:text-3xl font-extrabold text-gray-800 tracking-tight">Mission Blueprints</h3>
                          <p className="text-[9px] md:text-[10px] font-black uppercase text-gray-400 tracking-widest mt-0.5">Developer Implementation (PHP)</p>
                        </div>
                    </div>
                    {renderCodeExample(activeTab)}
                </section>
            </div>
        </div>

        {/* Summary Table Section */}
        <section className="mt-16 md:mt-24 pt-12 md:pt-16 border-t border-gray-200" aria-label="Debriefing Summary">
          <div className="flex items-center gap-4 md:gap-5 mb-8 md:mb-12">
            <div className="p-3 md:p-4 bg-white rounded-2xl md:rounded-3xl shadow-md border border-gray-100 text-blue-600 shrink-0">
              <Layout className="w-6 h-6 md:w-8 md:h-8" aria-hidden="true" />
            </div>
            <div>
              <h3 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tighter">Mission Debriefing</h3>
              <p className="text-[10px] md:text-[11px] text-gray-400 font-black mt-1 uppercase tracking-[0.15em] md:tracking-[0.25em]">Comparison of specialized units</p>
            </div>
          </div>
          <div className="overflow-hidden rounded-[1.5rem] md:rounded-[2.5rem] border border-gray-200 shadow-2xl shadow-black/5 bg-white mb-16 md:mb-20">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[700px]">
                <thead>
                  <tr className="bg-gray-50/50 border-b border-gray-200">
                    <th className="px-8 md:px-10 py-6 md:py-8 text-[10px] md:text-[11px] font-black text-gray-400 uppercase tracking-widest">Unit ID</th>
                    <th className="px-8 md:px-10 py-6 md:py-8 text-[10px] md:text-[11px] font-black text-gray-400 uppercase tracking-widest">Specialization</th>
                    <th className="px-8 md:px-10 py-6 md:py-8 text-[10px] md:text-[11px] font-black text-gray-400 uppercase tracking-widest">Deployment</th>
                    <th className="px-8 md:px-10 py-6 md:py-8 text-[10px] md:text-[11px] font-black text-gray-400 uppercase tracking-widest">Risk</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {PRINCIPLES.map((row, i) => (
                    <tr key={i} className="hover:bg-blue-50/30 transition-all group">
                      <td className="px-8 md:px-10 py-5 md:py-7 text-[14px] md:text-[15px] font-black text-blue-600 group-hover:translate-x-2 transition-transform flex items-center gap-3">
                        {row.id}
                        {mastered.has(row.id) && <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />}
                      </td>
                      <td className="px-8 md:px-10 py-5 md:py-7 text-[13px] md:text-[14px] font-bold text-gray-800">{row.visualSummary}</td>
                      <td className="px-8 md:px-10 py-5 md:py-7 text-[13px] md:text-[14px] text-gray-500 font-bold italic">{row.title}</td>
                      <td className="px-8 md:px-10 py-5 md:py-7 text-[13px] md:text-[14px] text-gray-400 font-bold">See Signs of Failure</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-16 md:py-20 bg-gray-900 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-red-500 to-yellow-500"></div>
        <div className="max-w-4xl mx-auto px-4">
          <p className="text-gray-400 text-[12px] md:text-sm font-bold leading-relaxed px-4">
              Mission inspired by <a href="https://dev.to/suckup_de/solid-principles-from-paw-patrol-to-the-neighborhood-1008" className="text-blue-400 hover:text-blue-300 underline underline-offset-8 decoration-2 decoration-blue-400/30 transition-all inline-flex items-center gap-1" target="_blank" rel="noopener noreferrer">Lars Moelleken's Debriefing <ExternalLink className="w-3 h-3" /></a>
          </p>
          <div className="mt-8 md:mt-10 flex flex-col items-center gap-3 md:gap-4">
              <div className="p-2.5 md:p-3 bg-gray-800 rounded-xl md:rounded-2xl shadow-inner">
                <PawPrint className="w-6 h-6 md:w-8 md:h-8 text-gray-600" />
              </div>
              <p className="text-[9px] md:text-[11px] text-gray-600 uppercase tracking-[0.4em] md:tracking-[0.5em] font-black">
                  No Job is too Big • No Pup is too Small
              </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

const BookOpenIcon = () => (
  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
  </svg>
);

export default App;
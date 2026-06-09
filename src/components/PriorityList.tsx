import React from "react";
import * as LucideIcons from "lucide-react";
import { PrioritySector } from "../data";

interface PriorityListProps {
  sectors: PrioritySector[];
  activeId: number;
  onSelectSector: (id: number) => void;
}

export function PriorityList({ sectors, activeId, onSelectSector }: PriorityListProps) {
  return (
    <div className="glass-panel rounded-[2rem] p-5 select-none text-slate-900 h-full flex flex-col border border-white/60 shadow-[0_8px_30px_rgba(0,0,0,0.03)] bg-white/50 backdrop-blur-2xl">
      {/* Title block */}
      <div className="flex items-center gap-3 pb-5 mb-2 border-b border-white/50">
        <div className="w-10 h-10 rounded-[12px] bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-600/20">
          <LucideIcons.Layers className="text-white w-5 h-5 flex-shrink-0" />
        </div>
        <div>
          <h3 className="font-serif italic text-base font-black bg-gradient-to-r from-slate-800 to-slate-900 bg-clip-text text-transparent tracking-wide leading-none">
            10 राष्ट्रीय प्राथमिकता क्षेत्र
          </h3>
          <span className="text-[9px] text-slate-500 font-extrabold block uppercase mt-1 tracking-wider">
            National Priority Matrix
          </span>
        </div>
      </div>

      {/* List items wrapper */}
      <div className="flex-1 overflow-y-auto space-y-1.5 pr-2 custom-scrollbar max-h-[calc(100vh-180px)]">
        {sectors.map((sector) => {
          const totalActions = sector.defaultActions.length;
          const completedActions = sector.defaultActions.filter(a => a.completed).length;
          const progressPercent = totalActions > 0 ? Math.round((completedActions / totalActions) * 100) : 0;
          const isActive = sector.id === activeId;

          // Dynamically fetch matching icon
          const IconComponent = (LucideIcons as any)[sector.icon] || LucideIcons.ShieldAlert;

          return (
            <button
              key={sector.id}
              onClick={() => onSelectSector(sector.id)}
              className={`w-full text-left px-4 py-3.5 rounded-2xl transition-all duration-300 flex items-center gap-3.5 relative group cursor-pointer focus:outline-none focus:ring-0 outline-none border-none ${
                isActive 
                  ? "bg-white shadow-[0_8px_30px_rgba(0,0,0,0.06)] text-slate-900 transform scale-[1.02] z-10" 
                  : "bg-transparent text-slate-600 hover:bg-white/50 hover:text-slate-800"
              }`}
            >
              {/* Active Indicator Strip */}
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 h-8 w-1 bg-gradient-to-b from-indigo-600 to-purple-500 rounded-r-md shadow-[0_0_8px_rgba(79,70,229,0.6)]" />
              )}

              {/* Icon layout */}
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                isActive 
                  ? "bg-gradient-to-br from-indigo-100 to-purple-50 text-indigo-700 shadow-sm" 
                  : "bg-slate-100/50 text-slate-400 group-hover:bg-white group-hover:text-indigo-500 group-hover:shadow-sm"
              }`}>
                <IconComponent className={`w-4 h-4 ${isActive ? 'drop-shadow-sm' : ''}`} />
              </div>

              {/* Title and stats layout */}
              <div className="flex-1 space-y-1.5 overflow-hidden">
                <div className="flex items-center justify-between gap-1">
                  <span className={`text-[9px] uppercase font-black tracking-widest transition-colors ${
                    isActive ? "text-indigo-600" : "text-slate-400 group-hover:text-indigo-500"
                  }`}>
                    विषय #{sector.id}
                  </span>
                  <span className={`text-[10px] font-black font-mono tracking-wider transition-colors ${
                    progressPercent === 100 
                      ? "text-emerald-500" 
                      : completedActions > 0 
                      ? "text-indigo-600" 
                      : "text-slate-400 group-hover:text-slate-500"
                  }`}>
                    {progressPercent}%
                  </span>
                </div>
                
                <h4 className={`text-[13px] font-bold leading-tight truncate transition-colors ${isActive ? "text-slate-900" : "text-slate-600 group-hover:text-slate-900"}`}>
                  {sector.title}
                </h4>

                {/* Progress bar line */}
                <div className={`w-full h-1 rounded-full overflow-hidden mt-1 max-w-[90%] transition-colors ${isActive ? 'bg-slate-100' : 'bg-slate-200/50'}`}>
                  <div 
                    className={`h-full rounded-full transition-all duration-500 relative ${
                      progressPercent === 100 ? "bg-gradient-to-r from-emerald-400 to-emerald-500" : "bg-gradient-to-r from-indigo-500 to-purple-500"
                    }`}
                    style={{ width: `${progressPercent}%` }}
                  >
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

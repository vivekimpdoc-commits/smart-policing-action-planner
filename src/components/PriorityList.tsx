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
    <div className="glass-panel rounded-2xl p-4 space-y-4 select-none text-slate-100 h-full flex flex-col">
      {/* Title block */}
      <div className="flex items-center gap-2 pb-3 border-b border-slate-800/60">
        <LucideIcons.Layers className="text-amber-500 w-5 h-5 flex-shrink-0" />
        <div>
          <h3 className="font-serif italic text-sm text-white tracking-wide leading-none">
            10 राष्ट्रीय प्राथमिकता क्षेत्र
          </h3>
          <span className="text-[9px] text-slate-450 font-extrabold block uppercase mt-1 tracking-wider">
            National Priority Matrix
          </span>
        </div>
      </div>

      {/* List items wrapper */}
      <div className="flex-1 overflow-y-auto space-y-2 pr-1 custom-scrollbar max-h-[calc(100vh-180px)]">
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
              className={`w-full text-left p-3 rounded-xl border transition-all flex items-start gap-3 relative group cursor-pointer glass-card-interactive ${
                isActive 
                  ? "bg-amber-500/10 border-amber-500/40 shadow-[0_0_15px_rgba(245,158,11,0.05)] text-white" 
                  : "bg-slate-900/30 border-slate-800/80 text-slate-400 hover:bg-slate-800/50 hover:border-slate-700 hover:text-white"
              }`}
            >
              {/* Active Indicator Strip */}
              {isActive && (
                <div className="absolute left-0 top-3 bottom-3 w-0.5 bg-amber-500 rounded-r-md" />
              )}

              {/* Icon layout */}
              <div className={`w-8.5 h-8.5 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${
                isActive 
                  ? "bg-amber-500/10 text-amber-500 border border-amber-500/20" 
                  : "bg-slate-800/55 border border-slate-800 text-slate-450 group-hover:bg-slate-800 group-hover:text-slate-300"
              }`}>
                <IconComponent className="w-4 h-4" />
              </div>

              {/* Title and stats layout */}
              <div className="flex-1 space-y-1 overflow-hidden">
                <div className="flex items-center justify-between gap-1">
                  <span className={`text-[9px] uppercase font-bold tracking-wider ${
                    isActive ? "text-amber-500" : "text-slate-500"
                  }`}>
                    विषय #{sector.id}
                  </span>
                  <span className={`text-[10px] font-black font-mono ${
                    progressPercent === 100 
                      ? "text-emerald-500" 
                      : completedActions > 0 
                      ? "text-amber-500" 
                      : "text-slate-500"
                  }`}>
                    {progressPercent}%
                  </span>
                </div>
                
                <h4 className={`text-xs font-bold leading-tight truncate ${isActive ? "text-white" : "text-slate-300"}`}>
                  {sector.title}
                </h4>

                {/* Progress bar line */}
                <div className="w-full bg-slate-800/80 h-1 rounded-full overflow-hidden mt-1 max-w-[95%]">
                  <div 
                    className={`h-full rounded-full transition-all duration-300 ${
                      progressPercent === 100 ? "bg-emerald-500" : "bg-amber-500"
                    }`}
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

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
    <div className="bg-white border border-slate-200/80 rounded-2xl p-4 space-y-4 select-none text-slate-800 shadow-[0_2px_12px_rgba(0,0,0,0.02)] h-full flex flex-col">
      {/* Title block */}
      <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
        <LucideIcons.Layers className="text-amber-500 w-5 h-5 flex-shrink-0" />
        <div>
          <h3 className="font-serif italic text-sm text-slate-900 tracking-wide leading-none">
            10 राष्ट्रीय प्राथमिकता क्षेत्र
          </h3>
          <span className="text-[9px] text-slate-400 font-extrabold block uppercase mt-1 tracking-wider">
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
              className={`w-full text-left p-3 rounded-xl border transition-all flex items-start gap-3 relative group cursor-pointer ${
                isActive 
                  ? "bg-amber-50/50 border-amber-500/30 shadow-sm text-slate-900" 
                  : "bg-white border-slate-100 text-slate-600 hover:bg-slate-50/70 hover:border-slate-250/50 hover:text-slate-900"
              }`}
            >
              {/* Active Indicator Strip */}
              {isActive && (
                <div className="absolute left-0 top-3 bottom-3 w-0.5 bg-amber-500 rounded-r-md" />
              )}

              {/* Icon layout */}
              <div className={`w-8.5 h-8.5 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${
                isActive 
                  ? "bg-amber-500/10 text-amber-600 border border-amber-500/20" 
                  : "bg-slate-100/60 border border-slate-200/50 text-slate-500 group-hover:bg-slate-200/40 group-hover:text-slate-700"
              }`}>
                <IconComponent className="w-4 h-4" />
              </div>

              {/* Title and stats layout */}
              <div className="flex-1 space-y-1 overflow-hidden">
                <div className="flex items-center justify-between gap-1">
                  <span className={`text-[9px] uppercase font-bold tracking-wider ${
                    isActive ? "text-amber-600" : "text-slate-400"
                  }`}>
                    विषय #{sector.id}
                  </span>
                  <span className={`text-[10px] font-black font-mono ${
                    progressPercent === 100 
                      ? "text-emerald-600" 
                      : completedActions > 0 
                      ? "text-amber-600" 
                      : "text-slate-400"
                  }`}>
                    {progressPercent}%
                  </span>
                </div>
                
                <h4 className={`text-xs font-bold leading-tight truncate ${isActive ? "text-slate-900" : "text-slate-700"}`}>
                  {sector.title}
                </h4>

                {/* Progress bar line */}
                <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden mt-1 max-w-[95%]">
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

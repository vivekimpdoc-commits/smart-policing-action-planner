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
    <div className="bg-white rounded-2xl p-5 select-none text-slate-900 h-full flex flex-col shadow-sm border border-slate-200">
      {/* Title block */}
      <div className="flex items-center gap-3 pb-5 mb-2 border-b border-slate-100">
        <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100">
          <LucideIcons.Layers className="w-5 h-5 flex-shrink-0" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-slate-900 tracking-wide leading-tight py-1 -my-1">
            10 राष्ट्रीय प्राथमिकता क्षेत्र
          </h3>
          <span className="text-[10px] text-slate-500 font-semibold block uppercase mt-1">
            National Priority Matrix
          </span>
        </div>
      </div>

      {/* List items wrapper */}
      <div className="flex-1 overflow-y-auto space-y-2 pr-2 custom-scrollbar max-h-[calc(100vh-180px)]">
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
              className={`w-full text-left px-4 py-3.5 rounded-xl transition-all duration-300 flex items-center gap-3.5 relative group cursor-pointer focus:outline-none focus:ring-0 outline-none border ${
                isActive 
                  ? "bg-white text-indigo-900 border-indigo-100 shadow-[0_4px_20px_-4px_rgba(79,70,229,0.15)] ring-1 ring-indigo-50 transform scale-[1.02] z-10" 
                  : "bg-transparent border-transparent text-slate-600 hover:bg-slate-50 hover:text-slate-800 hover:scale-[1.01]"
              }`}
            >
              {/* Active Indicator Strip */}
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 h-10 w-1.5 bg-indigo-600 rounded-r-lg shadow-sm" />
              )}

              {/* Icon layout */}
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                isActive 
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20 transform scale-110" 
                  : "bg-slate-100 text-slate-400 group-hover:bg-white group-hover:text-indigo-500 border border-slate-100 group-hover:border-slate-200 group-hover:shadow-sm"
              }`}>
                <IconComponent className="w-4.5 h-4.5" />
              </div>

              {/* Title layout */}
              <div className="flex-1 overflow-hidden flex items-center justify-between">
                <h4 className={`text-sm font-semibold truncate transition-colors ${isActive ? "text-indigo-950 font-bold" : "text-slate-600 group-hover:text-slate-900"}`}>
                  {sector.title}
                </h4>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

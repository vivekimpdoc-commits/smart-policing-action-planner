import React from "react";
import * as LucideIcons from "lucide-react";
import { PrioritySector } from "../data";

interface OverviewReportProps {
  sectors: PrioritySector[];
  onSelectSector: (sectorId: number) => void;
  overallProgress: number;
}

export function OverviewReport({ sectors, onSelectSector, overallProgress }: OverviewReportProps) {
  return (
    <div className="space-y-6 select-none bg-[#111114] p-4 sm:p-6 lg:p-8 rounded-2xl border border-slate-800/80 text-white relative overflow-hidden animate-fadeIn">
      {/* Decorative Golden Corner lines */}
      <div className="absolute top-0 right-0 p-4 pointer-events-none select-none z-10">
        <div className="w-16 h-16 border-r border-t border-amber-500/15"></div>
      </div>

      {/* Grand Title Info */}
      <div className="bg-[#09090b]/80 border border-slate-800/80 p-5 sm:p-6 rounded-2xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 relative z-20">
        <div className="space-y-2 max-w-2xl">
          <h2 className="text-xl sm:text-2xl font-serif italic text-white tracking-tight flex items-center gap-2">
            <LucideIcons.FileSpreadsheet className="w-6 h-6 text-amber-500 animate-pulse" />
            समग्र पुलिस प्रशासनिक रिपोर्ट कार्ड <span className="text-amber-500 font-sans not-italic font-light text-sm sm:text-base ml-1 select-text">(Status Executive Summary)</span>
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
            यह डै‍शबोर्ड राज्य पुलिस की 10 महत्वपूर्ण प्राथमिकताओं के विरुद्ध जारी क्रियान्वयन प्रगति का एक संकलित प्रिफेक्टर प्रस्तुत करता है। नीचे प्रत्येक विषय के अंतर्गत निहित 5 बुनियादी सरकारी दिशानिर्देशों (कुल 50 योजनाएं) की वर्तमान स्थिति और किए गए कार्यों की प्रतिशत ऑडिट दर्ज है।
          </p>
        </div>

        <div className="bg-slate-950 border border-slate-900 p-4 rounded-xl flex items-center gap-4 flex-shrink-0">
          <div className="space-y-0.5">
            <span className="text-[9px] text-slate-500 block uppercase font-bold tracking-wider">
              कुल स्वीकृत लक्ष्य
            </span>
            <span className="text-xl font-bold font-mono text-emerald-500">50 बुनियादी SOPs</span>
          </div>
          <div className="w-px h-10 bg-slate-800/80" />
          <div className="space-y-0.5">
            <span className="text-[9px] text-slate-500 block uppercase font-bold tracking-wider">
              समस्त राज्य रेटिंग
            </span>
            <span className="text-sm sm:text-base font-bold text-amber-500 font-serif italic">
              {overallProgress >= 75 ? "उत्कृष्ट (A+)" : overallProgress >= 40 ? "संतोषजनक (B)" : "विशेष सुदृढीकरण क्षेत्र (C)"}
            </span>
          </div>
        </div>
      </div>

      {/* Grid of 10 Priorities */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sectors.map((sector) => {
          // Calculate individual statistics
          const totalActions = sector.defaultActions.length;
          const completedActions = sector.defaultActions.filter(a => a.completed).length;
          const progressPercent = totalActions > 0 ? Math.round((completedActions / totalActions) * 100) : 0;

          // Resolve Icon Dynamically
          const IconComponent = (LucideIcons as any)[sector.icon] || LucideIcons.ShieldAlert;

          return (
            <div 
              key={sector.id}
              className="bg-slate-950/40 hover:bg-[#0c0c0e]/80 border border-slate-900/85 hover:border-amber-500/20 rounded-2xl p-5 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                {/* Micro Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/15 flex items-center justify-center text-amber-500 group-hover:bg-amber-500/20 transition-all">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[9px] uppercase font-bold text-slate-500 tracking-wider font-mono">
                        प्राथमिकता क्षेत्र #{sector.id}
                      </div>
                      <h3 className="text-sm sm:text-base font-serif italic text-slate-200 group-hover:text-amber-400 transition-colors mt-0.5">
                        {sector.title}
                      </h3>
                    </div>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    progressPercent === 100 
                      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" 
                      : completedActions > 0 
                      ? "bg-amber-500/10 text-amber-400 border border-amber-500/20" 
                      : "bg-slate-900 text-slate-500 border border-slate-800"
                  }`}>
                    {progressPercent}% पूर्ण
                  </span>
                </div>

                {/* Short info */}
                <p className="text-slate-400 text-xs line-clamp-2 leading-relaxed">
                  {sector.description}
                </p>

                {/* Miniature Action Completed list */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex items-center justify-between text-[9px] font-bold uppercase tracking-wider text-slate-500">
                    <span>कार्रवाई प्रगति</span>
                    <span className="font-mono">{completedActions}/{totalActions}</span>
                  </div>
                  <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden border border-slate-900">
                    <div 
                      className={`h-full rounded-full transition-all duration-505 ${
                        progressPercent === 100 
                          ? "bg-gradient-to-r from-emerald-600 to-emerald-500" 
                          : "bg-gradient-to-r from-amber-600 to-amber-500"
                      }`}
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Enter console action */}
              <button
                onClick={() => onSelectSector(sector.id)}
                className="mt-5 w-full py-2 rounded-xl border border-slate-900 bg-slate-950 hover:bg-slate-900 hover:border-amber-500/30 text-amber-500 hover:text-amber-400 font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>विस्तृत रणनीति एवं कंसोल खोलें</span>
                <LucideIcons.ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

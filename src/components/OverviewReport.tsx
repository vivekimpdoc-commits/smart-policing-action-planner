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
    <div className="space-y-8 select-none p-2 sm:p-4 lg:p-6 text-slate-900 relative overflow-hidden animate-fadeIn">
      {/* Grand Title Info - Premium Banner */}
      <div className="relative bg-gradient-to-br from-white via-indigo-50/40 to-white backdrop-blur-xl border border-indigo-100 shadow-[0_8px_30px_rgba(79,70,229,0.06)] p-6 sm:p-8 rounded-3xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-8 z-20 overflow-hidden">
        
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-400/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-400/5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

        <div className="space-y-3 max-w-2xl relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-[10px] font-black uppercase tracking-widest shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            लाइव मॉनिटरिंग सिस्टम
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif italic bg-gradient-to-r from-slate-900 to-indigo-900 bg-clip-text text-transparent tracking-tight flex items-center gap-3 drop-shadow-sm pr-2 py-1">
            <LucideIcons.LayoutDashboard className="w-8 h-8 text-indigo-600 drop-shadow-sm" />
            समग्र प्रशासनिक रिपोर्ट कार्ड 
          </h2>
          <p className="text-slate-600 text-sm leading-relaxed font-medium">
            यह डै‍शबोर्ड राज्य पुलिस की 10 महत्वपूर्ण प्राथमिकताओं के विरुद्ध जारी क्रियान्वयन प्रगति का एक लाइव संकलित प्रिफेक्टर प्रस्तुत करता है। नीचे प्रत्येक विषय के अंतर्गत निहित 5 बुनियादी सरकारी दिशानिर्देशों (कुल 50 योजनाएं) की वर्तमान स्थिति दर्ज है।
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-md border border-slate-200/60 p-5 rounded-2xl flex items-center gap-6 flex-shrink-0 shadow-sm relative z-10">
          <div className="space-y-1 text-center">
            <span className="text-[10px] text-slate-500 block uppercase font-extrabold tracking-wider">
              कुल स्वीकृत लक्ष्य
            </span>
            <span className="text-2xl font-black font-mono bg-gradient-to-br from-emerald-500 to-emerald-600 bg-clip-text text-transparent">50 SOPs</span>
          </div>
          <div className="w-px h-12 bg-slate-200" />
          <div className="space-y-1 text-center">
            <span className="text-[10px] text-slate-500 block uppercase font-extrabold tracking-wider">
              राज्य पुलिस रेटिंग
            </span>
            <span className="text-lg sm:text-xl font-bold bg-gradient-to-br from-indigo-600 to-blue-600 bg-clip-text text-transparent font-serif italic">
              {overallProgress >= 75 ? "उत्कृष्ट (A+)" : overallProgress >= 40 ? "संतोषजनक (B)" : "विशेष सुदृढीकरण क्षेत्र"}
            </span>
          </div>
        </div>
      </div>

      {/* Grid of 10 Priorities */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
        {sectors.map((sector) => {
          const totalActions = sector.defaultActions.length;
          const completedActions = sector.defaultActions.filter(a => a.completed).length;
          const progressPercent = totalActions > 0 ? Math.round((completedActions / totalActions) * 100) : 0;
          const isComplete = progressPercent === 100;

          const IconComponent = (LucideIcons as any)[sector.icon] || LucideIcons.ShieldAlert;

          return (
            <div 
              key={sector.id}
              className="relative bg-white border border-slate-200/80 rounded-[24px] p-6 sm:p-7 hover:shadow-[0_20px_40px_-15px_rgba(79,70,229,0.15)] hover:border-indigo-300 transition-all duration-500 hover:-translate-y-1.5 group flex flex-col justify-between overflow-hidden cursor-pointer"
              onClick={() => onSelectSector(sector.id)}
            >
              {/* Glowing Orb inside card */}
              <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-indigo-600/5 rounded-full blur-3xl group-hover:bg-indigo-600/10 transition-colors duration-500"></div>

              <div className="space-y-5 relative z-10">
                {/* Micro Header */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:shadow-md ${
                      isComplete 
                        ? "bg-gradient-to-br from-emerald-50 to-emerald-100/50 border border-emerald-200 text-emerald-600" 
                        : "bg-gradient-to-br from-indigo-50 to-slate-50 border border-indigo-100 text-indigo-600"
                    }`}>
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-[10px] uppercase font-black text-indigo-500 tracking-wider font-mono mb-1">
                        सेक्टर #{sector.id}
                      </div>
                      <h3 className="text-base sm:text-lg font-serif italic text-slate-800 group-hover:text-indigo-700 transition-colors leading-tight">
                        {sector.title}
                      </h3>
                    </div>
                  </div>
                  <span className={`text-[10px] font-black px-2.5 py-1 rounded-lg flex-shrink-0 shadow-sm border ${
                    isComplete 
                      ? "bg-emerald-500 text-white border-emerald-600" 
                      : completedActions > 0 
                      ? "bg-indigo-50 text-indigo-700 border-indigo-200" 
                      : "bg-slate-50 text-slate-500 border-slate-200"
                  }`}>
                    {progressPercent}%
                  </span>
                </div>

                {/* Short info */}
                <p className="text-slate-600 text-sm line-clamp-2 leading-relaxed font-medium">
                  {sector.description}
                </p>

                {/* Miniature Action Completed list */}
                <div className="space-y-2 pt-2">
                  <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-wider text-slate-500">
                    <span>प्रगति (Progress)</span>
                    <span className="font-mono text-indigo-600">{completedActions} / {totalActions}</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden border border-slate-200/80">
                    <div 
                      className={`h-full rounded-full transition-all duration-700 ease-out ${
                        isComplete 
                          ? "bg-gradient-to-r from-emerald-500 to-emerald-400" 
                          : "bg-gradient-to-r from-indigo-600 to-blue-500 relative overflow-hidden"
                      }`}
                      style={{ width: `${progressPercent}%` }}
                    >
                      {/* Shine effect on progress bar */}
                      {!isComplete && progressPercent > 0 && (
                        <div className="absolute top-0 left-0 bottom-0 w-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-[shimmer_2s_infinite]"></div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Enter console action */}
              <div
                className="mt-6 w-full py-3 rounded-xl border border-indigo-100 bg-slate-50/50 group-hover:bg-indigo-600 text-slate-600 group-hover:text-white font-black text-xs flex items-center justify-center gap-2 transition-all duration-300 shadow-sm group-hover:shadow-md group-hover:border-indigo-600"
              >
                <span>विस्तृत रणनीति खोलें</span>
                <LucideIcons.ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

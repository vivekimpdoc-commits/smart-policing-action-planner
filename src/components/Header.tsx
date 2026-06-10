import React from "react";
import { ShieldAlert, Landmark, Printer, BarChart3, RotateCcw, Database } from "lucide-react";

interface HeaderProps {
  overallProgress: number;
  viewMode: "dashboard" | "report";
  setViewMode: (mode: "dashboard" | "report") => void;
  onPrint: () => void;
  onReset: () => void;
  isSupabaseConnected: boolean;
}

export function Header({ 
  overallProgress, 
  viewMode, 
  setViewMode, 
  onPrint, 
  onReset,
  isSupabaseConnected
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 text-slate-900 select-none shadow-sm">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Emblem Badge and Title */}
        <div className="flex items-center gap-3.5">
          <div className="relative flex items-center justify-center w-12 h-12 rounded-full bg-slate-100/80 border border-slate-300 shadow-sm flex-shrink-0">
            <Landmark className="text-indigo-600 w-5.5 h-5.5 animate-pulse" />
            <ShieldAlert className="absolute -top-1 -right-1 text-indigo-600 w-4 h-4 bg-white rounded-full border border-slate-300" />
          </div>

          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 leading-tight tracking-tight">
              स्मार्ट पुलिसिंग कार्ययोजना <span className="text-indigo-600 font-extrabold ml-1 text-base sm:text-lg">व नीति योजनाकार</span>
            </h1>
          </div>
        </div>

        {/* Global Progress Index and Navigation Control */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-4 justify-start md:justify-end">
          {/* Progress gauge */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 flex items-center gap-3.5 shadow-sm">
            <div className="text-right">
              <div className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">
                कुल क्रियान्वयन इंडेक्स
              </div>
              <div className="text-sm font-black font-mono text-indigo-600">{overallProgress}%</div>
            </div>
            <div className="w-16 sm:w-20 bg-slate-700/60 h-2 rounded-full overflow-hidden border border-slate-200">
              <div 
                className="bg-gradient-to-r from-indigo-600 to-indigo-700 h-full rounded-full transition-all duration-500 ease-out"
                style={{ width: `${overallProgress}%` }}
              ></div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode(viewMode === "dashboard" ? "report" : "dashboard")}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold border transition-all cursor-pointer ${
                viewMode === "report"
                  ? "bg-indigo-600 text-white border-indigo-600 shadow-md hover:bg-indigo-700"
                  : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:text-slate-900 shadow-sm"
              }`}
              title={viewMode === "dashboard" ? "सभी 10 योजनाओं का ओवरव्यू देखें" : "दैनिक कंसोल पर लौटें"}
            >
              <BarChart3 className="w-4 h-4" />
              <span>{viewMode === "dashboard" ? "प्रगति डैशबोर्ड" : "प्रशासनिक कंसोल"}</span>
            </button>

            <button
              onClick={onPrint}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 hover:text-slate-900 transition-all cursor-pointer shadow-sm"
              title="कार्ययोजना प्रिंट करें या पीडीएफ सहेजें"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">प्रिंट / PDF</span>
            </button>

            <button
              onClick={onReset}
              className="p-2 rounded-xl text-slate-500 border border-slate-200 bg-white hover:text-red-500 hover:bg-red-50 hover:border-red-200 transition-all cursor-pointer shadow-sm"
              title="सभी बदलाव रीसेट करें"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}


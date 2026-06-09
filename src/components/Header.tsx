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
    <header className="relative bg-white/90 backdrop-blur-md border-b border-slate-200/85 text-slate-900 select-none shadow-[0_4px_30px_rgba(0,0,0,0.2)]">
      {/* Tricolor Border Accent on Top */}
      <div className="h-1 w-full flex">
        <div className="bg-[#f39c12] h-full flex-1"></div>
        <div className="bg-white h-full flex-1"></div>
        <div className="bg-[#27ae60] h-full flex-1"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Emblem Badge and Title */}
        <div className="flex items-center gap-3.5">
          <div className="relative flex items-center justify-center w-12 h-12 rounded-full bg-slate-100/80 border border-slate-300 shadow-sm flex-shrink-0">
            <Landmark className="text-indigo-600 w-5.5 h-5.5 animate-pulse" />
            <ShieldAlert className="absolute -top-1 -right-1 text-indigo-600 w-4 h-4 bg-white rounded-full border border-slate-300" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-[9px] uppercase tracking-widest text-indigo-700 font-extrabold bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-200 shadow-sm">
                राजकीय पुलिस प्रशासनिक सेवा
              </span>
              <span className="text-[9px] uppercase tracking-widest text-emerald-700 font-extrabold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 shadow-sm animate-pulse">
                AI समर्थित
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-serif italic text-slate-900 mt-1.5 leading-tight tracking-tight drop-shadow-sm">
              स्मार्ट पुलिसिंग कार्ययोजना <span className="bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent font-sans not-italic font-extrabold ml-1 pr-1 py-1 text-base sm:text-lg select-text">व नीति योजनाकार</span>
            </h1>
            <p className="text-slate-500 text-[10px] uppercase tracking-widest mt-1 font-bold">
              10 मुख्य प्रशासनिक प्राथमिकता क्षेत्रों की विस्तृत राजकीय रणनीति एवं क्रियान्वयन प्रणाली
            </p>
          </div>
        </div>

        {/* Global Progress Index and Navigation Control */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-4 justify-start md:justify-end">
          {/* Command center info labels */}
          <div className="hidden lg:flex gap-5 text-right border-r border-slate-200 pr-5">
            <div>
              <p className="text-[9px] text-slate-600 font-bold uppercase tracking-wider">Command Center</p>
              <p className="text-xs text-slate-350 font-mono font-medium">ZONE-07 SUPABASE</p>
            </div>
            <div>
              <p className="text-[9px] text-slate-600 font-bold uppercase tracking-wider">Database</p>
              <p className={`text-xs font-mono font-bold flex items-center gap-1.5 justify-end ${isSupabaseConnected ? "text-emerald-450" : "text-indigo-600"}`}>
                <span className={`w-1.5 h-1.5 rounded-full inline-block animate-pulse ${isSupabaseConnected ? "bg-emerald-500" : "bg-indigo-600"}`} />
                {isSupabaseConnected ? "CLOUD SYNC" : "LOCAL ONLY"}
              </p>
            </div>
          </div>

          {/* Progress gauge */}
          <div className="bg-slate-100/40 border border-slate-200 rounded-xl px-4 py-2 flex items-center gap-3.5 shadow-sm">
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
                  : "bg-slate-100/40 text-slate-250 border-slate-300 hover:bg-slate-100 hover:text-slate-900 shadow-sm"
              }`}
              title={viewMode === "dashboard" ? "सभी 10 योजनाओं का ओवरव्यू देखें" : "दैनिक कंसोल पर लौटें"}
            >
              <BarChart3 className="w-4 h-4" />
              <span>{viewMode === "dashboard" ? "समग्र रिपोर्ट" : "प्रशासनिक कंसोल"}</span>
            </button>

            <button
              onClick={onPrint}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-slate-100/40 text-slate-250 border-slate-300 hover:bg-slate-100 hover:text-slate-900 transition-all cursor-pointer shadow-sm"
              title="कार्ययोजना प्रिंट करें या पीडीएफ सहेजें"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">प्रिंट / PDF</span>
            </button>

            <button
              onClick={onReset}
              className="p-2 rounded-xl text-slate-600 border border-slate-300 bg-slate-100/40 hover:text-red-400 hover:bg-red-50 hover:border-red-200 transition-all cursor-pointer shadow-sm"
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


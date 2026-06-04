import React, { useState, useEffect } from "react";
import { ShieldAlert, Scale, Landmark, Printer, BarChart3, RotateCcw, Database } from "lucide-react";
import { getSupabaseConfig } from "../lib/supabase";

interface HeaderProps {
  overallProgress: number;
  viewMode: "dashboard" | "report";
  setViewMode: (mode: "dashboard" | "report") => void;
  onPrint: () => void;
  onReset: () => void;
  isSupabaseConnected: boolean;
  onSupabaseConfigChange: (url: string, key: string) => void;
}

export function Header({ 
  overallProgress, 
  viewMode, 
  setViewMode, 
  onPrint, 
  onReset,
  isSupabaseConnected,
  onSupabaseConfigChange
}: HeaderProps) {
  const [showDbModal, setShowDbModal] = useState(false);
  const [dbUrl, setDbUrl] = useState("");
  const [dbKey, setDbKey] = useState("");

  // Load existing credentials when modal opens
  useEffect(() => {
    const config = getSupabaseConfig();
    if (config) {
      setDbUrl(config.url);
      setDbKey(config.anonKey);
    }
  }, [showDbModal]);

  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault();
    onSupabaseConfigChange(dbUrl, dbKey);
    setShowDbModal(false);
  };

  return (
    <header className="relative bg-white/95 backdrop-blur-md border-b border-slate-200/80 text-slate-900 select-none shadow-[0_1px_4px_rgba(0,0,0,0.02)]">
      {/* Tricolor Border Accent on Top */}
      <div className="h-1 w-full flex">
        <div className="bg-[#f39c12] h-full flex-1"></div>
        <div className="bg-white h-full flex-1"></div>
        <div className="bg-[#27ae60] h-full flex-1"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Emblem Badge and Title */}
        <div className="flex items-center gap-3.5">
          <div className="relative flex items-center justify-center w-12 h-12 rounded-full bg-slate-50 border border-slate-200 shadow-sm flex-shrink-0">
            <Landmark className="text-amber-600 w-5.5 h-5.5 animate-pulse" />
            <ShieldAlert className="absolute -top-1 -right-1 text-amber-500 w-4 h-4 bg-white rounded-full border border-amber-200" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-[9px] uppercase tracking-widest text-amber-600 font-extrabold bg-amber-50 px-2 py-0.5 rounded border border-amber-500/20">
                राजकीय पुलिस प्रशासनिक सेवा
              </span>
              <span className="text-[9px] uppercase tracking-widest text-emerald-700 font-extrabold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-550/20 animate-pulse">
                AI समर्थित
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-serif italic text-slate-900 mt-1 leading-tight tracking-tight">
              स्मार्ट पुलिसिंग कार्ययोजना <span className="text-amber-600 font-sans not-italic font-light ml-1 text-base sm:text-lg select-text">व नीति योजनाकार</span>
            </h1>
            <p className="text-slate-400 text-[10px] uppercase tracking-widest mt-0.5 font-bold">
              10 मुख्य प्रशासनिक प्राथमिकता क्षेत्रों की विस्तृत राजकीय रणनीति एवं क्रियान्वयन प्रणाली
            </p>
          </div>
        </div>

        {/* Global Progress Index and Navigation Control */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-4 justify-start md:justify-end">
          {/* Command center info labels */}
          <div className="hidden lg:flex gap-5 text-right border-r border-slate-200 pr-5">
            <div>
              <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Command Center</p>
              <p className="text-xs text-slate-700 font-mono font-medium">ZONE-07 SUPABASE</p>
            </div>
            <div>
              <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Database</p>
              <p className={`text-xs font-mono font-bold flex items-center gap-1.5 justify-end ${isSupabaseConnected ? "text-emerald-600" : "text-amber-600"}`}>
                <span className={`w-1.5 h-1.5 rounded-full inline-block animate-pulse ${isSupabaseConnected ? "bg-emerald-500" : "bg-amber-500"}`} />
                {isSupabaseConnected ? "CLOUD SYNC" : "LOCAL ONLY"}
              </p>
            </div>
          </div>

          {/* Progress gauge */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 flex items-center gap-3.5 shadow-sm">
            <div className="text-right">
              <div className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">
                कुल क्रियान्वयन इंडेक्स
              </div>
              <div className="text-sm font-black font-mono text-amber-600">{overallProgress}%</div>
            </div>
            <div className="w-16 sm:w-20 bg-slate-200/60 h-2 rounded-full overflow-hidden border border-slate-200">
              <div 
                className="bg-gradient-to-r from-amber-500 to-amber-600 h-full rounded-full transition-all duration-500 ease-out"
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
                  ? "bg-amber-500 text-slate-950 border-amber-500 shadow-md hover:bg-amber-400"
                  : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:text-slate-900 shadow-sm"
              }`}
              title={viewMode === "dashboard" ? "सभी 10 योजनाओं का ओवरव्यू देखें" : "दैनिक कंसोल पर लौटें"}
            >
              <BarChart3 className="w-4 h-4" />
              <span>{viewMode === "dashboard" ? "समग्र रिपोर्ट" : "प्रशासनिक कंसोल"}</span>
            </button>

            <button
              onClick={onPrint}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100 hover:text-slate-900 transition-all cursor-pointer shadow-sm"
              title="कार्ययोजना प्रिंट करें या पीडीएफ सहेजें"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">प्रिंट / PDF</span>
            </button>

            {/* Supabase Button */}
            <button
              onClick={() => setShowDbModal(true)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold border transition-all cursor-pointer shadow-sm ${
                isSupabaseConnected 
                  ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100" 
                  : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:text-slate-900"
              }`}
              title="Supabase डेटाबेस सेटअप करें"
            >
              <Database className="w-4 h-4" />
              <span className="hidden sm:inline">Supabase Db</span>
            </button>

            <button
              onClick={onReset}
              className="p-2 rounded-xl text-slate-400 border border-slate-200 bg-slate-50 hover:text-red-600 hover:bg-red-50 hover:border-red-200 transition-all cursor-pointer shadow-sm"
              title="सभी बदलाव रीसेट करें"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Supabase Connection Setup Modal */}
      {showDbModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full border border-slate-100 overflow-hidden animate-fadeIn">
            <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Database className="text-amber-500 w-5 h-5" />
                <h3 className="font-serif italic text-lg font-bold">Supabase क्लाउड डेटाबेस सेटअप</h3>
              </div>
              <button 
                onClick={() => setShowDbModal(false)}
                className="text-slate-400 hover:text-white transition-colors cursor-pointer text-xl font-bold"
              >
                &times;
              </button>
            </div>
            
            <form onSubmit={handleSaveConfig} className="p-6 space-y-4">
              <div className="bg-amber-50 border border-amber-200/60 rounded-xl p-4 text-xs text-amber-800 space-y-2">
                <p className="font-bold">⚠️ महत्वपूर्ण सूचना:</p>
                <p>डेटाबेस सिंक शुरू करने के लिए अपने Supabase प्रोजेक्ट के **Settings &gt; API** से URL और anon key यहाँ दर्ज करें।</p>
                <p>यदि आप इसे खाली छोड़कर सहेजते हैं, तो डेटा केवल आपके कंप्यूटर (LocalStorage) में सहेजा जाएगा।</p>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Supabase URL</label>
                <input 
                  type="url" 
                  value={dbUrl}
                  onChange={(e) => setDbUrl(e.target.value)}
                  placeholder="https://your-project.supabase.co"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-amber-500 focus:bg-white transition-all text-slate-800"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Supabase Anon Key</label>
                <textarea 
                  value={dbKey}
                  onChange={(e) => setDbKey(e.target.value)}
                  placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                  rows={4}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-amber-500 focus:bg-white transition-all text-slate-800 font-mono resize-none"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setDbUrl("");
                    setDbKey("");
                  }}
                  className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-2.5 rounded-xl text-sm transition-colors cursor-pointer text-center"
                >
                  साफ़ करें
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold py-2.5 rounded-xl text-sm shadow-md transition-all cursor-pointer text-center"
                >
                  डेटाबेस कनेक्ट करें
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </header>
  );
}


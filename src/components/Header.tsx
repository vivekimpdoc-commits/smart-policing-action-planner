import React, { useState } from "react";
import { ShieldAlert, Landmark, Printer, BarChart3, RotateCcw, Database, Info, X, Target, CheckCircle2, Zap, Languages } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

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
  const [showAboutModal, setShowAboutModal] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  return (
    <>
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
                {t('appTitlePart1')} <span className="text-indigo-600 font-extrabold ml-1 text-base sm:text-lg">{t('appTitlePart2')}</span>
              </h1>
            </div>
          </div>

          {/* Global Progress Index and Navigation Control */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 justify-start md:justify-end">
            {/* Progress gauge */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 flex items-center gap-3.5 shadow-sm">
              <div className="text-right">
                <div className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">
                  {t('totalIndex')}
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
                onClick={() => setLanguage(language === 'hi' ? 'en' : 'hi')}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-bold bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 hover:text-indigo-600 transition-all cursor-pointer shadow-sm"
                title={language === 'hi' ? "Switch to English" : "हिंदी में बदलें"}
              >
                <Languages className="w-4 h-4" />
                <span className="hidden sm:inline">{language === 'hi' ? 'EN' : 'HI'}</span>
              </button>

              <button
                onClick={() => setShowAboutModal(true)}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold bg-indigo-50 text-indigo-700 border border-indigo-100 hover:bg-indigo-100 transition-all cursor-pointer shadow-sm"
                title={t('projectInfoTooltip')}
              >
                <Info className="w-4 h-4" />
                <span className="hidden sm:inline">{t('projectInfoBtn')}</span>
              </button>

              <button
                onClick={() => setViewMode(viewMode === "dashboard" ? "report" : "dashboard")}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold border transition-all cursor-pointer ${
                  viewMode === "report"
                    ? "bg-indigo-600 text-white border-indigo-600 shadow-md hover:bg-indigo-700"
                    : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:text-slate-900 shadow-sm"
                }`}
                title={viewMode === "dashboard" ? t('dashboardTooltip') : t('consoleTooltip')}
              >
                <BarChart3 className="w-4 h-4" />
                <span className="hidden sm:inline">{viewMode === "dashboard" ? t('progressDashboardBtn') : t('adminConsoleBtn')}</span>
              </button>

              <button
                onClick={onPrint}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 hover:text-slate-900 transition-all cursor-pointer shadow-sm"
                title={t('printTooltip')}
              >
                <Printer className="w-4 h-4" />
                <span className="hidden sm:inline">{t('printBtn')}</span>
              </button>

              <button
                onClick={onReset}
                className="p-2 rounded-xl text-slate-500 border border-slate-200 bg-white hover:text-red-500 hover:bg-red-50 hover:border-red-200 transition-all cursor-pointer shadow-sm"
                title={t('resetTooltip')}
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* About Modal */}
      {showAboutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 flex flex-col animate-scaleUp">
            
            {/* Modal Header */}
            <div className="relative overflow-hidden p-6 sm:p-8 bg-gradient-to-br from-indigo-900 via-blue-900 to-indigo-800 text-white shrink-0">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-500 rounded-full blur-3xl opacity-20" />
              <div className="absolute top-0 left-0 w-1.5 bg-gradient-to-b from-cyan-400 to-blue-500 h-full"></div>
              
              <button 
                onClick={() => setShowAboutModal(false)}
                className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-sm transition-all cursor-pointer text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative z-10 flex items-start gap-4">
                <div className="p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
                  <Target className="w-8 h-8 text-indigo-100" />
                </div>
                <div className="space-y-1 mt-1">
                  <h2 className="text-xl sm:text-2xl font-bold tracking-tight">{t('modalTitle')}</h2>
                  <p className="text-sm text-indigo-100/90 font-medium tracking-wide uppercase">{t('modalSubtitle')}</p>
                </div>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-8 text-slate-700 bg-slate-50/50">
              
              <div className="space-y-3 text-sm sm:text-base leading-relaxed">
                <p>{t('modalP1')}</p>
              </div>

              <div className="space-y-5">
                <h3 className="text-sm font-black text-indigo-800 uppercase tracking-widest border-b border-indigo-100 pb-2">{t('modalQ')}</h3>
                
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:border-indigo-200 transition-colors">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="bg-blue-50 p-2 rounded-lg"><Zap className="w-5 h-5 text-blue-600" /></div>
                      <h4 className="font-bold text-slate-900">{t('modalR1T')}</h4>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">{t('modalR1D')}</p>
                  </div>

                  <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:border-indigo-200 transition-colors">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="bg-emerald-50 p-2 rounded-lg"><CheckCircle2 className="w-5 h-5 text-emerald-600" /></div>
                      <h4 className="font-bold text-slate-900">{t('modalR2T')}</h4>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">{t('modalR2D')}</p>
                  </div>

                  <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:border-indigo-200 transition-colors">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="bg-purple-50 p-2 rounded-lg"><ShieldAlert className="w-5 h-5 text-purple-600" /></div>
                      <h4 className="font-bold text-slate-900">{t('modalR3T')}</h4>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">{t('modalR3D')}</p>
                  </div>

                  <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:border-indigo-200 transition-colors">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="bg-orange-50 p-2 rounded-lg"><BarChart3 className="w-5 h-5 text-orange-600" /></div>
                      <h4 className="font-bold text-slate-900">{t('modalR4T')}</h4>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">{t('modalR4D')}</p>
                  </div>
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-slate-100 bg-white flex justify-end shrink-0 rounded-b-3xl">
              <button 
                onClick={() => setShowAboutModal(false)}
                className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-sm transition-all shadow-md hover:shadow-lg cursor-pointer"
              >
                {t('closeBtn')}
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}


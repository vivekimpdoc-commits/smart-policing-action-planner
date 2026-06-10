import React, { useState } from "react";
import { ShieldAlert, Landmark, Printer, BarChart3, RotateCcw, Database, Info, X, Target, CheckCircle2, Zap } from "lucide-react";

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
                onClick={() => setShowAboutModal(true)}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold bg-indigo-50 text-indigo-700 border border-indigo-100 hover:bg-indigo-100 transition-all cursor-pointer shadow-sm"
                title="प्रोजेक्ट के बारे में जानें"
              >
                <Info className="w-4 h-4" />
                <span className="hidden sm:inline">प्रोजेक्ट इन्फो</span>
              </button>

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
                  <h2 className="text-xl sm:text-2xl font-bold tracking-tight">स्मार्ट पुलिसिंग एक्शन प्लानर</h2>
                  <p className="text-sm text-indigo-100/90 font-medium tracking-wide uppercase">परियोजना का उद्देश्य एवं आवश्यकता</p>
                </div>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-8 text-slate-700 bg-slate-50/50">
              
              <div className="space-y-3 text-sm sm:text-base leading-relaxed">
                <p>
                  यह ऐप्लीकेशन <strong className="text-slate-900">राष्ट्रीय पुलिसिंग प्राथमिकताओं (National Policing Priorities)</strong> को ध्यान में रखकर बनाया गया एक आधुनिक प्रशासनिक उपकरण है। इसका मुख्य उद्देश्य पुलिस बलों की कार्यक्षमता (Efficiency) और जवाबदेही (Accountability) को डिजिटल और AI तकनीक के माध्यम से बढ़ाना है।
                </p>
              </div>

              <div className="space-y-5">
                <h3 className="text-sm font-black text-indigo-800 uppercase tracking-widest border-b border-indigo-100 pb-2">इस सिस्टम की आवश्यकता क्यों है?</h3>
                
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:border-indigo-200 transition-colors">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="bg-blue-50 p-2 rounded-lg"><Zap className="w-5 h-5 text-blue-600" /></div>
                      <h4 className="font-bold text-slate-900">त्वरित एवं डेटा-आधारित निर्णय</h4>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      आपातकालीन स्थितियों या रूटीन गश्त में, AI रणनीति सलाहकार के माध्यम से अधिकारी तुरंत एक कस्टमाइज़्ड SOP (Standard Operating Procedure) प्राप्त कर सकते हैं, जिससे फैसले लेने में देरी नहीं होती।
                    </p>
                  </div>

                  <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:border-indigo-200 transition-colors">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="bg-emerald-50 p-2 rounded-lg"><CheckCircle2 className="w-5 h-5 text-emerald-600" /></div>
                      <h4 className="font-bold text-slate-900">स्पष्ट जवाबदेही (Accountability)</h4>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      हर कार्य (Task) किसी विशिष्ट अधिकारी (SHO, SP आदि) को असाइन किया जाता है। चेकलिस्ट सिस्टम से यह सुनिश्चित होता है कि कोई भी महत्वपूर्ण प्रशासनिक कदम छूटे नहीं।
                    </p>
                  </div>

                  <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:border-indigo-200 transition-colors">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="bg-purple-50 p-2 rounded-lg"><ShieldAlert className="w-5 h-5 text-purple-600" /></div>
                      <h4 className="font-bold text-slate-900">नागरिक सुरक्षा एवं भरोसा</h4>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      10 मुख्य राष्ट्रीय प्राथमिकता क्षेत्रों (जैसे महिला सुरक्षा, साइबर अपराध, आदि) पर विशेष ध्यान केंद्रित करके, यह सिस्टम पुलिस को अधिक जन-केंद्रित और प्रभावी बनाता है।
                    </p>
                  </div>

                  <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:border-indigo-200 transition-colors">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="bg-orange-50 p-2 rounded-lg"><BarChart3 className="w-5 h-5 text-orange-600" /></div>
                      <h4 className="font-bold text-slate-900">केंद्रीकृत मॉनिटरिंग (Dashboard)</h4>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      "कुल क्रियान्वयन इंडेक्स" और प्रोग्रेस रिपोर्ट के ज़रिए उच्च अधिकारी (DGP, IG) एक ही नज़र में पूरे जिले या ज़ोन की कानून-व्यवस्था की स्थिति को ट्रैक कर सकते हैं।
                    </p>
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
                समझ गया (Close)
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}


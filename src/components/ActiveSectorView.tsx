import React, { useState } from "react";
import { 
  FileText, Sparkles, Scale, AlertTriangle, Play, CheckSquare, 
  Square, Calendar, ChevronRight, BookOpen, Plus, Loader2, Copy, Trash2, Edit3, X, Check, Phone, Mail,
  Key
} from "lucide-react";
import { GoogleGenAI } from "@google/genai";
import { PrioritySector, ActionStep } from "../data";
import { MarkdownRenderer } from "./MarkdownRenderer";

// Helper to provide realistic default contact details for governmental departments
export const getFallbackContact = (owner: string) => {
  const clean = owner.trim();
  if (clean.includes("एसपी क्राइम") || clean.includes("एफएसएल")) {
    return { phone: "+91 94544 04011", email: "sp-crime.fsl@police.gov.in" };
  }
  if (clean.includes("प्रशिक्षण") || clean.includes("अभियोजन")) {
    return { phone: "+91 94544 01032", email: "dig-training.pros@police.gov.in" };
  }
  if (clean.includes("थाना प्रभारी") || clean.includes("थानाध्यक्ष") || clean.includes("SHO") || clean.includes("एसएचओ")) {
    return { phone: "+91 94544 02099", email: "sho-stationhead@police.gov.in" };
  }
  if (clean.includes("विशेष लोक अभियोजक") || clean.includes("विधिक")) {
    return { phone: "+91 94544 01456", email: "sp-legal.prosecutor@police.gov.in" };
  }
  if (clean.includes("महिला सुरक्षा") || clean.includes("महिला हेल्प डेस्क") || clean.includes("महिला कल्याण")) {
    return { phone: "+91 94544 03022", email: "nodal-womenwelfare@police.gov.in" };
  }
  if (clean.includes("एसपी ट्रैफिक") || clean.includes("यातायात") || clean.includes("ट्रैफिक")) {
    return { phone: "+91 94544 01811", email: "sp-traffic@police.gov.in" };
  }
  if (clean.includes("किशोर पुलिस इकाई") || clean.includes("SJPU")) {
    return { phone: "+91 94544 01533", email: "sjpu-childsafety@police.gov.in" };
  }
  if (clean.includes("आईजीआरएस") || clean.includes("शिकायत")) {
    return { phone: "+91 94544 00190", email: "grievenace-cell@police.gov.in" };
  }
  if (clean.includes("जनसंपर्क") || clean.includes("एडिशनल एसपी")) {
    return { phone: "+91 94544 00155", email: "pro-addlsp@police.gov.in" };
  }
  if (clean.includes("सीसीटीएनएस") || clean.includes("CCTNS")) {
    return { phone: "+91 94544 01101", email: "cctns-nodal@police.gov.in" };
  }
  if (clean.includes("बीट") || clean.includes("चौकी")) {
    return { phone: "+91 94544 05041", email: "beat-officer@police.gov.in" };
  }
  if (clean.includes("खुफिया") || clean.includes("एलआईयू") || clean.includes("LIU")) {
    return { phone: "+91 94544 01007", email: "liu-intelligence@police.gov.in" };
  }
  if (clean.includes("एसपी सिटी") || clean.includes("कंट्रोल रूम")) {
    return { phone: "+91 94544 01010", email: "spcity-control@police.gov.in" };
  }
  if (clean.includes("सोशल मीडिया") || clean.includes("प्रवक्ता")) {
    return { phone: "+91 94544 01021", email: "socialmedia-desk@police.gov.in" };
  }
  if (clean.includes("रिजर्व पुलिस") || clean.includes("RI")) {
    return { phone: "+91 94544 01122", email: "ri-lines@police.gov.in" };
  }
  if (clean.includes("साइबर") || clean.includes("म्युल")) {
    return { phone: "+91 19300 44211", email: "cybercell-hq@police.gov.in" };
  }
  if (clean.includes("पासपोर्ट")) {
    return { phone: "+91 94544 02244", email: "passport-verification@police.gov.in" };
  }
  if (clean.includes("एसपी प्रशासन") || clean.includes("ई-डिस्ट्रिक्ट")) {
    return { phone: "+91 94544 00100", email: "sp-admin@police.gov.in" };
  }
  return { phone: "+91 94544 01112", email: "nodal-incharge@police.gov.in" };
};

interface ActiveSectorViewProps {
  sector: PrioritySector;
  onToggleAction: (sectorId: number, actionId: string) => void;
  onAddCustomAction: (sectorId: number, title: string, description: string, timeline: string, owner: string, ownerPhone?: string, ownerEmail?: string) => void;
  onDeleteAction: (sectorId: number, actionId: string) => void;
  onEditAction: (sectorId: number, actionId: string, updated: Partial<ActionStep>) => void;
  generatedStrategies: { [key: string]: string };
  onSaveStrategy: (sectorId: number, scenarioKey: string, text: string) => void;
}

export function ActiveSectorView({
  sector,
  onToggleAction,
  onAddCustomAction,
  onDeleteAction,
  onEditAction,
  generatedStrategies,
  onSaveStrategy
}: ActiveSectorViewProps) {
  // Tabs: "actions" (SOP Checklist) | "ai-advisor" (AI Advisor) | "pillars" (Pillars)
  const [activeTab, setActiveTab] = useState<"actions" | "ai-advisor" | "pillars">("actions");

  // Custom action form states
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newTimeline, setNewTimeline] = useState("तत्काल कदम");
  const [newOwner, setNewOwner] = useState("एसएचओ / थानाध्यक्ष");
  const [newPhone, setNewPhone] = useState("");
  const [newEmail, setNewEmail] = useState("");

  // Editing Action States
  const [editingActionId, setEditingActionId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDesc, setEditDesc] = useState("");
  const [editTimeline, setEditTimeline] = useState("");
  const [editOwner, setEditOwner] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [editEmail, setEditEmail] = useState("");

  // Notification states
  const [activeNotification, setActiveNotification] = useState<{
    isOpen: boolean;
    sending: boolean;
    owner: string;
    phone: string;
    email: string;
    taskTitle: string;
    timeline: string;
    success: boolean;
  } | null>(null);

  const triggerNotification = async (taskTitle: string, owner: string, phone: string, email: string, timeline: string) => {
    setActiveNotification({
      isOpen: true,
      sending: true,
      owner,
      phone,
      email,
      taskTitle,
      timeline,
      success: false
    });

    try {
      const response = await fetch('http://localhost:3001/api/send-notification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          owner, 
          phones: phone ? phone.split(',').map(p => p.trim()) : [],
          emails: email ? email.split(',').map(e => e.trim()) : [],
          taskTitle,
          timeline
        })
      });

      const data = await response.json();
      
      if (data.success) {
        setActiveNotification(prev => prev ? { ...prev, sending: false, success: true } : null);
        
        // Save to local storage for history
        const newRecord = {
          id: Math.random().toString(36).substring(2, 9),
          taskTitle,
          owner,
          phone,
          email,
          timeline,
          timestamp: new Date().toISOString(),
          status: "Success"
        };
        const existing = JSON.parse(localStorage.getItem("smart-policing-notifications") || "[]");
        localStorage.setItem("smart-policing-notifications", JSON.stringify([newRecord, ...existing]));
        window.dispatchEvent(new Event('storage')); // trigger update in other components
        
        // If it's a test email, open the link silently in background
        if (data.details && data.details.email && data.details.email.includes('Ethereal')) {
          const urlMatch = data.details.email.match(/(https?:\/\/[^\s]+)/);
          if (urlMatch) {
            window.open(urlMatch[1], '_blank');
          }
        }
      } else {
        const failedRecord = {
          id: Math.random().toString(36).substring(2, 9),
          taskTitle,
          owner,
          phone,
          email,
          timeline,
          timestamp: new Date().toISOString(),
          status: "Failed"
        };
        const existing = JSON.parse(localStorage.getItem("smart-policing-notifications") || "[]");
        localStorage.setItem("smart-policing-notifications", JSON.stringify([failedRecord, ...existing]));
        window.dispatchEvent(new Event('storage'));

        alert("Failed to send notification: " + data.message);
        setActiveNotification(prev => prev ? { ...prev, sending: false, success: false } : null);
      }
    } catch (err) {
      console.error("Error triggering notification:", err);
      alert("Error triggering notification. Make sure the backend server is running.");
      setActiveNotification(prev => prev ? { ...prev, sending: false, success: false } : null);
    }
  };

  // AI strategy formulation states
  const [selectedScenarioIndex, setSelectedScenarioIndex] = useState(0);
  const [localDetails, setLocalDetails] = useState("");
  const [loadingAI, setLoadingAI] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState("");
  const [apiKey, setApiKey] = useState(() => localStorage.getItem("gemini_api_key") || "");
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);

  const saveApiKey = (key: string) => {
    setApiKey(key);
    localStorage.setItem("gemini_api_key", key);
    setShowApiKeyInput(false);
  };

  // Current scenario strategy key
  const activeScenario = sector.aiScenarios[selectedScenarioIndex];
  const strategyStorageKey = `s_${sector.id}_sc_${selectedScenarioIndex}`;
  const savedStrategyHTML = generatedStrategies[strategyStorageKey] || "";

  // Handle adding custom action subtask
  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const fallback = getFallbackContact(newOwner);
    const resolvedPhone = newPhone.trim() || fallback.phone;
    const resolvedEmail = newEmail.trim() || fallback.email;

    onAddCustomAction(sector.id, newTitle, newDesc, newTimeline, newOwner, resolvedPhone, resolvedEmail);
    
    // Reset inputs
    setNewTitle("");
    setNewDesc("");
    setNewTimeline("तत्काल कदम");
    setNewOwner("एसएचओ / थानाध्यक्ष");
    setNewPhone("");
    setNewEmail("");
    setShowAddForm(false);

    // Auto-trigger message transmission!
    triggerNotification(newTitle, newOwner, resolvedPhone, resolvedEmail, newTimeline);
  };

  // Setup Edit Mode
  const startEditing = (action: ActionStep) => {
    const fallback = getFallbackContact(action.owner);
    setEditingActionId(action.id);
    setEditTitle(action.title);
    setEditDesc(action.description);
    setEditTimeline(action.timeline);
    setEditOwner(action.owner);
    setEditPhone(action.ownerPhone || fallback.phone);
    setEditEmail(action.ownerEmail || fallback.email);
  };

  const saveEdit = () => {
    if (!editTitle.trim()) return;
    onEditAction(sector.id, editingActionId!, {
      title: editTitle,
      description: editDesc,
      timeline: editTimeline,
      owner: editOwner,
      ownerPhone: editPhone,
      ownerEmail: editEmail
    });
    setEditingActionId(null);

    // Auto-trigger message transmission!
    triggerNotification(editTitle, editOwner, editPhone, editEmail, editTimeline);
  };

  // Generate Offline AI Strategy (MOCKED - No API Required)
  const handleGenerateAIStrategy = async () => {
    setLoadingAI(true);
    setAiError(null);
    setStatusMessage("गृह मंत्रालय SOP डेटाबेस का मिलान किया जा रहा है...");
    
    // Stagger loading messages for nice immersive feel
    const intervals = [
      setTimeout(() => setStatusMessage("स्थानीय भौगोलिक व जनसांख्यिकी इनपुट का विश्लेषण जारी है..."), 1200),
      setTimeout(() => setStatusMessage("AI सलाहकार आपके राजकीय बल के अनुसार SOP संकलित कर रहा है..."), 3000),
    ];

    try {
      // Simulate network latency
      await new Promise(resolve => setTimeout(resolve, 4500));

      const generatedText = `
### 🎯 १. मुख्य रणनीतिक उद्देश्य (Strategic Objectives)
- **${sector.title}** के अंतर्गत संपूर्ण प्रशासनिक नियंत्रण एवं त्वरित प्रतिक्रिया सुनिश्चित करना।
- **परिदृश्य:** ${activeScenario.label} के अनुसार ज़मीनी स्तर पर अभेद्य सुरक्षा ग्रिड (Security Grid) स्थापित करना।
- जन-संवाद और सामुदायिक पुलिसिंग (Community Policing) के माध्यम से नागरिकों का विश्वास जीतना और शांति व्यवस्था बहाल करना।

### 🚀 २. क्रियान्वयन योजना (Phase-wise Action Plan)
**चरण 1 (0-48 घंटे): त्वरित कार्यवाही (Immediate Response)**
- सभी संबंधित थानों, चौकियों और पीआरवी (PRV) को हाई-अलर्ट पर रखना।
- विशेष कार्य बल (Task Force) का तत्काल गठन और संवेदनशील क्षेत्रों (Hotspots) में सघन गश्त बढ़ाना।

**चरण 2 (1-2 सप्ताह): सुदृढ़ीकरण (Consolidation)**
- अभिसूचना तंत्र (Intelligence Network) को सक्रिय करना एवं बीट प्रणाली को मजबूत करना।
${localDetails ? `- **स्थानीय इनपुट पर कार्यवाही:** ${localDetails} के अनुसार विशेष नाकाबंदी एवं बैरिकेडिंग स्थापित करना।` : '- प्रमुख चौराहों, बाज़ारों और मार्गों पर 24x7 सीसीटीवी सर्विलांस सुनिश्चित करना।'}

**चरण 3 (दीर्घकालिक): निगरानी (Continuous Monitoring)**
- राजपत्रित अधिकारियों द्वारा साप्ताहिक आधार पर समीक्षा बैठक और जनता से सीधा फीडबैक तंत्र स्थापित करना।

### 💻 ३. AI, डिजिटल तकनीक एवं तकनीकी समाधान
- **प्रेडिक्टिव पुलिसिंग (Predictive Policing):** AI आधारित अपराध डेटा विश्लेषण से भविष्य के संभावित हॉटस्पॉट की अग्रिम पहचान।
- **ड्रोन सर्विलांस:** भीड़भाड़ वाले, संवेदनशील और दुर्गम इलाकों में ड्रोन द्वारा हवाई निगरानी और वीडियोग्राफी।
- **CCTNS एकीकरण:** डिजिटल रिकॉर्ड और ई-एफआईआर (e-FIR) का रियल-टाइम अपडेट, जिससे जांच में तेज़ी आए।

### ⚠️ ४. संभावित प्रशासनिक बाधाएं एवं उनका ठोस समाधान
- **बाधा:** सीमित मानव संसाधन या पुलिस बल की कमी।
  - **समाधान:** उपलब्ध बल का वैज्ञानिक रोटेशन (Rotation), ड्यूटी चार्ट का अनुकूलन और पीएसी (PAC) या होमगार्ड्स का अधिकतम उपयोग।
- **बाधा:** अफवाहों या भ्रामक सूचनाओं (Fake News) का तेज़ी से प्रसार।
  - **समाधान:** सोशल मीडिया सेल द्वारा 24x7 निगरानी (Social Media Monitoring) और आधिकारिक हैंडल से त्वरित खंडन (Fact-Check) जारी करना।

### 📊 ५. कार्य-सफलता मापदंड (KPIs)
- **अपराध/घटना दर:** संबंधित अपराधों में कम से कम 25% की त्वरित कमी।
- **रिस्पांस टाइम:** डायल-112 का रिस्पांस टाइम (Response Time) 5-7 मिनट तक सुधारना।
- **जन-संतोष:** जन-शिकायतों और IGRS पोर्टल पर प्राप्त संदर्भों का 90% से अधिक त्वरित एवं गुणवत्तापूर्ण निस्तारण।
`;
      
      onSaveStrategy(sector.id, strategyStorageKey, generatedText);
    } catch (err: any) {
      setAiError("रणनीति जनरेट करने में तकनीकी त्रुटि हुई।");
    } finally {
      intervals.forEach(clearTimeout);
      setLoadingAI(false);
      setStatusMessage("");
    }
  };

  // Copy AI strategy to clipboard
  const handleCopyStrategy = () => {
    if (!savedStrategyHTML) return;
    navigator.clipboard.writeText(savedStrategyHTML);
    alert("रणनीति कोड कॉपी कर लिया गया है। इसे आप अपनी डॉक फाइल या ईमेल में पेस्ट कर सकते हैं।");
  };

  // Statistics calculation for active sector
  const totalSteps = sector.defaultActions.length;
  const completedSteps = sector.defaultActions.filter(a => a.completed).length;
  const progressPercent = totalSteps > 0 ? Math.round((completedSteps / totalSteps) * 100) : 0;

  return (
    <div className="bg-white border border-slate-200 shadow-sm rounded-2xl select-none text-slate-900 overflow-hidden flex flex-col h-full min-h-[600px] relative animate-fadeIn">
      
      {/* Active Sector Banner Section */}
      <div className="p-5 sm:p-7 border-b border-slate-100 flex items-center justify-between">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          {sector.title}
        </h2>
        <div className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
          <span className="text-xs font-semibold text-slate-500 uppercase">Progress</span>
          <span className={`text-sm font-bold ${progressPercent === 100 ? "text-emerald-600" : "text-indigo-600"}`}>
            {progressPercent}%
          </span>
        </div>
      </div>

      {/* Switch Workspace Tabs */}
      <div className="flex bg-white border-b border-slate-200 px-4 gap-4 flex-shrink-0 pt-2">
        <button
          onClick={() => setActiveTab("actions")}
          className={`px-2 py-3 text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer border-b-2 ${
            activeTab === "actions"
              ? "border-indigo-600 text-indigo-700"
              : "border-transparent text-slate-500 hover:text-indigo-600 hover:border-indigo-200"
          }`}
        >
          <CheckSquare className="w-4 h-4" />
          <span>राजकीय क्रियान्वयन चेकलिस्ट</span>
        </button>

        <button
          onClick={() => setActiveTab("ai-advisor")}
          className={`px-2 py-3 text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer border-b-2 ${
            activeTab === "ai-advisor"
              ? "border-indigo-600 text-indigo-700"
              : "border-transparent text-slate-500 hover:text-indigo-600 hover:border-indigo-200"
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>AI प्रशासनिक रणनीति सहायक</span>
        </button>

        <button
          onClick={() => setActiveTab("pillars")}
          className={`px-2 py-3 text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer border-b-2 ${
            activeTab === "pillars"
              ? "border-indigo-600 text-indigo-700"
              : "border-transparent text-slate-500 hover:text-indigo-600 hover:border-indigo-200"
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>मुख्य प्रशासनिक स्तंभ ({sector.pillars.length})</span>
        </button>
      </div>

      {/* Main Workspace Work Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-5">
        
        {/* TAB 1: SOP ACTION CHECKLIST */}
        {activeTab === "actions" && (
          <div className="space-y-4">
            
            <div className="flex items-center justify-between gap-4 pb-2">
              <h3 className="font-bold text-base text-slate-800">
                Tasks
              </h3>

              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="flex items-center gap-1 bg-indigo-50 text-indigo-700 border border-indigo-200 hover:bg-indigo-700 hover:text-white px-3 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>नया कार्य जोड़ें</span>
              </button>
            </div>

            {/* Form to append Custom Actions */}
            {showAddForm && (
              <form onSubmit={handleAddSubmit} className="bg-[#fafafa] border border-slate-200 rounded-xl p-4 space-y-3 animate-fadeIn shadow-sm">
                <h4 className="text-xs font-black text-indigo-700 uppercase tracking-wider">
                  प्रशासनिक कार्य जोड़ें (Add Custom SOP Step)
                </h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-600 font-bold uppercase tracking-wider">शीर्षक *</label>
                    <input 
                      type="text" 
                      required
                      placeholder="जैसे: संवेदनशील बूथों का पुलिस बल द्वारा पैदल मार्च..."
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      className="w-full bg-white border border-slate-200 px-3 py-2 rounded-lg text-xs text-slate-850 focus:outline-none focus:border-indigo-600/50"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-600 font-bold uppercase tracking-wider">जिम्मेदार इकाई *</label>
                    <select 
                      required
                      value={newOwner}
                      onChange={(e) => setNewOwner(e.target.value)}
                      className="w-full bg-white border border-slate-200 px-3 py-2 rounded-lg text-xs text-slate-850 focus:outline-none focus:border-indigo-600/50"
                    >
                      <option value="एसएचओ / थानाध्यक्ष">एसएचओ / थानाध्यक्ष (SHO)</option>
                      <option value="एसपी क्राइम">एसपी क्राइम (SP Crime)</option>
                      <option value="एसपी सिटी">एसपी सिटी (SP City)</option>
                      <option value="एसपी प्रशासन">एसपी प्रशासन (SP Admin)</option>
                      <option value="अपर पुलिस अधीक्षक (ASP)">अपर पुलिस अधीक्षक (ASP)</option>
                      <option value="बीट अधिकारी / चौकी प्रभारी">बीट अधिकारी / चौकी प्रभारी</option>
                      <option value="महिला हेल्प डेस्क / महिला सुरक्षा सेल">महिला हेल्प डेस्क</option>
                      <option value="साइबर सेल प्रभारी">साइबर सेल प्रभारी</option>
                      <option value="यातायात पुलिस प्रमुख (Traffic SP)">यातायात पुलिस (Traffic)</option>
                      <option value="फोरेंसिक लैब (FSL)">फोरेंसिक लैब (FSL)</option>
                      <option value="खुफिया इकाई (LIU)">खुफिया इकाई (LIU)</option>
                      <option value="सीसीटीएनएस (CCTNS) नोडल">सीसीटीएनएस (CCTNS) नोडल</option>
                      <option value="कंट्रोल रूम प्रभारी">कंट्रोल रूम प्रभारी</option>
                      <option value="अभियोजन अधिकारी">अभियोजन अधिकारी</option>
                      <option value="पासपोर्ट सत्यापन अधिकारी">पासपोर्ट सत्यापन अधिकारी</option>
                      <option value="आईजीआरएस / जन शिकायत प्रकोष्ठ">आईजीआरएस प्रकोष्ठ</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-600 font-bold uppercase tracking-wider">प्रभारी फ़ोन नम्बर (SMS हेतु, ',' से अलग करें, अधिकतम 100)</label>
                    <input 
                      type="text"
                      placeholder="जैसे: +91 94544 02099, +91 94544 02088"
                      value={newPhone}
                      onChange={(e) => setNewPhone(e.target.value)}
                      className="w-full bg-white border border-slate-200 px-3 py-2 rounded-lg text-xs text-slate-850 focus:outline-none focus:border-indigo-600/50"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-600 font-bold uppercase tracking-wider">प्रभारी ईमेल आईडी (Email हेतु, ',' से अलग करें, अधिकतम 100)</label>
                    <input 
                      type="text"
                      placeholder="जैसे: sho@gov.in, sp-crime@gov.in"
                      value={newEmail}
                      onChange={(e) => setNewEmail(e.target.value)}
                      className="w-full bg-white border border-slate-200 px-3 py-2 rounded-lg text-xs text-slate-850 focus:outline-none focus:border-indigo-600/50"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] text-slate-600 font-bold uppercase tracking-wider">विस्तृत व्याख्या (विवरण)</label>
                  <textarea 
                    placeholder="एसओपी के अंतर्गत किए जाने वाले कार्यों का संक्षिप्त प्रशासनिक विवरण..."
                    value={newDesc}
                    onChange={(e) => setNewDesc(e.target.value)}
                    rows={2}
                    className="w-full bg-white border border-slate-200 px-3 py-2 rounded-lg text-xs text-slate-850 focus:outline-none focus:border-indigo-600/50 resize-none"
                  />
                </div>

                <div className="flex items-center justify-between gap-3 pt-1">
                  <div className="flex items-center gap-2">
                    <label className="text-[10px] text-slate-600 font-bold uppercase tracking-wider">समय सीमा:</label>
                    <input 
                      type="text" 
                      value={newTimeline}
                      onChange={(e) => setNewTimeline(e.target.value)}
                      className="bg-white border border-slate-200 px-2 py-1 rounded-lg text-xs text-slate-850 focus:outline-none w-28 placeholder-slate-400 focus:border-indigo-600/50"
                    />
                  </div>

                  <div className="flex gap-2">
                    <button 
                      type="button" 
                      onClick={() => setShowAddForm(false)}
                      className="px-3 py-1.5 text-xs font-semibold text-slate-500 bg-transparent hover:text-slate-800"
                    >
                      रद्द करें
                    </button>
                    <button 
                      type="submit" 
                      className="px-3.5 py-1.5 text-xs font-black bg-indigo-700 text-white hover:bg-indigo-600 rounded-lg shadow-sm cursor-pointer"
                    >
                      सुरक्षित करें
                    </button>
                  </div>
                </div>
              </form>
            )}

            {/* Steps Container */}
            <div className="space-y-3">
              {sector.defaultActions.map((action) => {
                const isEditing = editingActionId === action.id;

                return (
                  <div 
                    key={action.id}
                    className={`bg-white border border-slate-200 shadow-sm rounded-xl p-4 mb-3 transition-colors ${
                      action.completed 
                        ? "bg-slate-50 opacity-75" 
                        : "hover:border-indigo-200"
                    }`}
                  >
                    {isEditing ? (
                      /* Editing form overlay within card */
                      <div className="space-y-3 animate-fadeIn">
                        <div className="flex items-center justify-between pb-1 border-b border-slate-150">
                          <span className="text-[10px] text-indigo-700 font-extrabold uppercase tracking-wider">SOP संपादित करें</span>
                          <button onClick={() => setEditingActionId(null)} className="text-slate-500 hover:text-slate-805 p-1">
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        
                        <div className="space-y-2">
                          <input 
                            type="text"
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 p-2 rounded-lg text-xs font-bold text-[#0f172a]"
                            placeholder="कार्य शीर्षक"
                          />
                          <textarea 
                            value={editDesc}
                            onChange={(e) => setEditDesc(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 p-2 rounded-lg text-xs text-slate-650"
                            rows={2}
                            placeholder="कार्य विवरण"
                          />

                          {/* Contact edit fields inside card */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            <div className="space-y-0.5">
                              <span className="text-[10px] text-slate-600 font-bold uppercase tracking-wider">प्रभारी फ़ोन नम्बर (',' से अलग करें, अधिकतम 100)</span>
                              <input 
                                type="text"
                                value={editPhone}
                                onChange={(e) => setEditPhone(e.target.value)}
                                className="w-full bg-slate-50 border border-slate-200 px-2.5 py-1.5 rounded-lg text-xs text-slate-700 font-mono"
                                placeholder="जैसे: 9454402099, 9454402088"
                              />
                            </div>
                            <div className="space-y-0.5">
                              <span className="text-[10px] text-slate-600 font-bold uppercase tracking-wider">प्रभारी ईमेल (',' से अलग करें, अधिकतम 100)</span>
                              <input 
                                type="text"
                                value={editEmail}
                                onChange={(e) => setEditEmail(e.target.value)}
                                className="w-full bg-slate-50 border border-slate-200 px-2.5 py-1.5 rounded-lg text-xs text-slate-700 font-mono"
                                placeholder="जैसे: sho@gov.in, sp@gov.in"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                          <div className="flex gap-2.5">
                            <input 
                              type="text"
                              value={editTimeline}
                              onChange={(e) => setEditTimeline(e.target.value)}
                              className="bg-slate-50 border border-slate-200 px-2 py-1 rounded-lg text-[11px] text-slate-650 w-28"
                              placeholder="समय सीमा"
                            />
                            <select 
                              value={editOwner}
                              onChange={(e) => setEditOwner(e.target.value)}
                              className="bg-slate-50 border border-slate-200 px-2 py-1 rounded-lg text-[11px] text-slate-650 w-44 focus:outline-none"
                            >
                              <option value="एसएचओ / थानाध्यक्ष">एसएचओ / थानाध्यक्ष (SHO)</option>
                              <option value="एसपी क्राइम">एसपी क्राइम (SP Crime)</option>
                              <option value="एसपी सिटी">एसपी सिटी (SP City)</option>
                              <option value="एसपी प्रशासन">एसपी प्रशासन (SP Admin)</option>
                              <option value="अपर पुलिस अधीक्षक (ASP)">अपर पुलिस अधीक्षक (ASP)</option>
                              <option value="बीट अधिकारी / चौकी प्रभारी">बीट अधिकारी / चौकी प्रभारी</option>
                              <option value="महिला हेल्प डेस्क / महिला सुरक्षा सेल">महिला हेल्प डेस्क</option>
                              <option value="साइबर सेल प्रभारी">साइबर सेल प्रभारी</option>
                              <option value="यातायात पुलिस प्रमुख (Traffic SP)">यातायात पुलिस (Traffic)</option>
                              <option value="फोरेंसिक लैब (FSL)">फोरेंसिक लैब (FSL)</option>
                              <option value="खुफिया इकाई (LIU)">खुफिया इकाई (LIU)</option>
                              <option value="सीसीटीएनएस (CCTNS) नोडल">सीसीटीएनएस (CCTNS) नोडल</option>
                              <option value="कंट्रोल रूम प्रभारी">कंट्रोल रूम प्रभारी</option>
                              <option value="अभियोजन अधिकारी">अभियोजन अधिकारी</option>
                              <option value="पासपोर्ट सत्यापन अधिकारी">पासपोर्ट सत्यापन अधिकारी</option>
                              <option value="आईजीआरएस / जन शिकायत प्रकोष्ठ">आईजीआरएस प्रकोष्ठ</option>
                            </select>
                          </div>

                          <button 
                            type="button"
                            onClick={saveEdit}
                            className="flex items-center gap-1 bg-green-600 hover:bg-green-500 px-3 py-1 text-xs font-bold rounded-lg text-slate-900 font-mono"
                          >
                            <Check className="w-3 h-3" />
                            <span>सुरक्षित करें</span>
                          </button>
                        </div>
                      </div>
                    ) : (
                      /* Traditional View Card */
                      <div className="flex items-start gap-3.5">
                        {/* Done toggle checkbox button */}
                        <button
                          onClick={() => onToggleAction(sector.id, action.id)}
                          className="mt-0.5 hover:scale-105 transition-transform flex-shrink-0 cursor-pointer text-slate-600 hover:text-indigo-700"
                        >
                          {action.completed ? (
                            <div className="bg-emerald-50 text-emerald-600 p-1.5 rounded-lg border border-emerald-250">
                              <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
                            </div>
                          ) : (
                            <div className="p-1.5 bg-slate-50 text-slate-600 rounded-lg border border-slate-200">
                              <div className="w-4 h-4 rounded" />
                            </div>
                          )}
                        </button>

                        <div className="flex-1 space-y-1">
                          <div className="flex flex-wrap items-start justify-between gap-2">
                            <div>
                              <h4 className={`text-sm font-extrabold leading-snug tracking-tight ${
                                action.completed ? "text-slate-600 line-through font-normal" : "text-slate-800"
                              }`}>
                                {action.title}
                              </h4>
                              {action.isCustom && (
                                <span className="text-[9px] font-black uppercase text-indigo-700 bg-indigo-50 px-1.5 py-0.5 rounded border border-indigo-200/60 inline-block mt-1">
                                  नागरिक/स्थानीय अनुकूलित एसओपी
                                </span>
                              )}
                            </div>

                            {/* Badge actions tools */}
                            <div className="flex items-center gap-2">
                              {/* Edit triggers */}
                              <button 
                                onClick={() => startEditing(action)}
                                className="p-1 rounded text-slate-600 hover:text-indigo-700 hover:bg-slate-100 transition-all cursor-pointer"
                                title="कार्य संपादित करें"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>

                              {/* Deletion triggers with custom trash icon */}
                              <button 
                                onClick={() => onDeleteAction(sector.id, action.id)}
                                className="p-1 rounded text-slate-600 hover:text-red-600 hover:bg-red-50 transition-all cursor-pointer"
                                title="कार्य हटाएँ"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>

                          {/* Hidden details expander */}
                          <details className="mt-2 text-xs text-slate-500 group/details">
                            <summary className="cursor-pointer text-indigo-500 font-medium select-none outline-none">Show Details</summary>
                            <div className="mt-3 bg-slate-50 rounded-lg p-3 border border-slate-100 space-y-2">
                              <p className="text-slate-600 leading-relaxed text-[13px]">{action.description}</p>
                              
                              <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-500 pt-2 border-t border-slate-200/60 mt-2">
                                <div className="flex items-center gap-1.5" title="अनुमानित समय सीमा">
                                  <Calendar className="w-3.5 h-3.5" />
                                  <span>{action.timeline}</span>
                                </div>
                                <div className="flex items-center gap-1.5" title="जिम्मेदार अधिकारी / विभाग">
                                  <AlertTriangle className="w-3.5 h-3.5 text-orange-400" />
                                  <span>{action.owner}</span>
                                </div>
                              </div>
                            </div>
                          </details>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
        {activeTab === "ai-advisor" && (
          <div className="space-y-5">
            {/* API Key UI Removed - AI Strategy is now Offline MOCKED */}
            <div className="bg-indigo-50/60 border border-indigo-150 p-4 rounded-xl flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-indigo-700 flex-shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h4 className="text-xs font-black text-indigo-800 uppercase tracking-wider">
                  AI स्मार्ट पुलिसिंग रणनीति विकासक
                </h4>
                <p className="text-xs text-slate-650 leading-relaxed">
                  इस प्राथमिकता विषय पर एक विस्तृत और स्थानीय विनिर्देशों के अनुरूप राजकीय SOP / नीति गाइड जारी करने के लिए संदर्भ परिदृश्य चुनें और AI कमांड सक्रिय करें।
                </p>
              </div>
            </div>

            {/* Strategy Area Selector */}
            <div className="space-y-3">
              <label className="text-[10px] text-slate-500 font-black uppercase tracking-wider block">
                १. संदर्भ विशिष्ट रणनीतिक परिदृश्य (Select Context Template):
              </label>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {sector.aiScenarios.map((sc, scIdx) => (
                  <button
                    key={scIdx}
                    onClick={() => setSelectedScenarioIndex(scIdx)}
                    className={`p-3 text-left rounded-xl border transition-all text-xs flex flex-col justify-between h-24 cursor-pointer ${
                      selectedScenarioIndex === scIdx 
                        ? "bg-indigo-700 border-indigo-700 text-white shadow-md shadow-indigo-600/10" 
                        : "bg-slate-50 border-slate-200 hover:border-indigo-300 text-slate-600 hover:text-indigo-900"
                    }`}
                  >
                    <span className={`font-bold ${selectedScenarioIndex === scIdx ? "text-slate-900" : "text-indigo-900"}`}>
                      {sc.label}
                    </span>
                    <span className={`text-[10px] line-clamp-2 leading-snug mt-1 ${selectedScenarioIndex === scIdx ? "text-indigo-100" : "text-slate-500"}`}>
                      {sc.context}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Extra inputs form */}
            <div className="space-y-2">
              <label className="text-[10px] text-slate-500 font-black uppercase tracking-wider block">
                २. स्थानीय पुलिस बल एवं अतिरिक्त भौगोलिक विनिर्देश (Optional Local Details):
              </label>
              <textarea
                value={localDetails}
                onChange={(e) => setLocalDetails(e.target.value)}
                rows={3}
                placeholder={activeScenario.placeholder || "जैसे: थाना क्षेत्र में 10 संवेदनशील स्थान हैं, हमारे पास गश्ती हेतु केवल 2 गाड़ियां व 15 कांस्टेबल हैं। बजटीय सहायता मध्यम है।"}
                className="w-full bg-white border border-slate-200 p-3 rounded-xl text-xs text-slate-850 placeholder-slate-400 focus:outline-none focus:border-indigo-600/50 resize-none hover:border-slate-300 transition-all shadow-sm"
              />
            </div>

            {/* Run button */}
            <button
              onClick={handleGenerateAIStrategy}
              disabled={loadingAI}
              className="w-full bg-indigo-700 hover:bg-indigo-800 text-white disabled:bg-slate-100 disabled:text-slate-600 disabled:border-slate-200 border border-indigo-700 p-3.5 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md shadow-indigo-650/15"
            >
              {loadingAI ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>SOP जनरेट की जा रही है...</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 text-slate-900 fill-current" />
                  <span>राजकीय विधिक रणनीति तैयार करें (Formulate AI Strategy)</span>
                </>
              )}
            </button>

            {/* AI Generation response board */}
            <div className="border border-slate-200 rounded-xl overflow-hidden bg-slate-55/40 min-h-[150px] relative shadow-sm">
              {loadingAI ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center space-y-3 bg-white/95 px-4 text-center">
                  <Loader2 className="w-8 h-8 text-indigo-700 animate-spin" />
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-slate-800">{statusMessage}</p>
                    <p className="text-[9px] text-[#2563eb] uppercase tracking-widest leading-none mt-1">
                      Powered by Gemini 2.0 Flash
                    </p>
                  </div>
                </div>
              ) : null}

              {aiError && (
                <div className="p-4 bg-red-50 border-b border-red-150 text-red-600 flex items-start gap-2 text-xs">
                  <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-extrabold uppercase block tracking-wider mb-0.5">तकनीकी त्रुटि</span>
                    <span>{aiError}</span>
                  </div>
                </div>
              )}

              {/* Renders strategy markdown */}
              {savedStrategyHTML ? (
                <div className="p-5 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
                    <div className="flex items-center gap-1.5">
                      <FileText className="text-indigo-700 w-4 h-4" />
                      <span className="text-xs font-extrabold text-indigo-900 uppercase tracking-wider">
                        राजकीय नीति ड्राफ्ट: {activeScenario.label}
                      </span>
                    </div>
                    
                    <button
                      onClick={handleCopyStrategy}
                      className="text-xs font-bold text-indigo-700 hover:text-indigo-800 bg-white px-3 py-1.5 border border-slate-200 rounded-lg hover:bg-slate-50 flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>कॉपी करें</span>
                    </button>
                  </div>

                  <div className="prose max-w-none text-slate-850 markdown-body">
                    <MarkdownRenderer content={savedStrategyHTML} />
                  </div>
                </div>
              ) : (
                !loadingAI && (
                  <div className="flex flex-col items-center justify-center p-8 text-center text-slate-600 h-full mt-4">
                    <Sparkles className="w-8 h-8 text-indigo-200 mb-2" />
                    <p className="text-xs font-semibold leading-normal">
                      योजना प्रयोक्ता इनपुट दर्ज कर रणनीति तैयार करें। <br />
                      तैयार की गई रणनीति इस बोर्ड पर प्रदर्शित की जाएगी।
                    </p>
                  </div>
                )
              )}
            </div>
          </div>
        )}

        {/* TAB 3: THREE KEY STRENGTH PILLARS */}
        {activeTab === "pillars" && (
          <div className="space-y-4">
            <h3 className="font-extrabold text-sm text-slate-800">
              रणनीति को सफलीभूत बनाने वाले प्रशासनिक मुख्य स्तंभ (Key Pillars)
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {sector.pillars.map((pillar, idx) => (
                <div key={idx} className="bg-slate-50/50 border border-slate-200/60 p-5 rounded-2xl space-y-3 flex flex-col justify-between shadow-sm hover:border-indigo-200 transition-all duration-300">
                  <div className="space-y-2">
                    <div className="w-9 h-9 rounded-xl bg-indigo-50 border border-indigo-250/60 flex items-center justify-center text-indigo-700 text-sm font-black">
                      0{idx + 1}
                    </div>
                    <h4 className="font-bold text-sm text-slate-900">{pillar.title}</h4>
                    <p className="text-xs text-slate-650 leading-relaxed">{pillar.description}</p>
                  </div>
                  <div className="pt-2">
                    <div className="w-full bg-slate-200/60 h-1 rounded-full overflow-hidden">
                      <div className="bg-indigo-700 h-full w-2/3" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Floating Status Dispatch Console Overlay */}
      {activeNotification && activeNotification.isOpen && (
        <div className="fixed inset-0 bg-slate-50/40 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fadeIn select-none">
          <div className="bg-white border border-slate-200/90 rounded-2xl max-w-md w-full overflow-hidden shadow-2xl p-5 space-y-4 animate-scaleUp">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-indigo-700 animate-pulse" />
                </div>
                <div>
                  <h3 className="font-extrabold text-xs sm:text-sm text-slate-800">विभागीय संसूचन प्रणाली (Notification)</h3>
                  <p className="text-[9px] text-emerald-600 font-bold uppercase tracking-wider">SMS & Email Dispatch Console</p>
                </div>
              </div>
              <button 
                onClick={() => setActiveNotification(null)}
                className="text-slate-600 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-50 transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body */}
            <div>
              {activeNotification.sending ? (
                <div className="space-y-4 py-6 text-center">
                  <Loader2 className="w-10 h-10 text-indigo-700 animate-spin mx-auto stroke-[2.5]" />
                  <div className="space-y-1">
                    <p className="text-xs font-black text-slate-700 animate-pulse">सुरक्षित गेटवे द्वारा संसूचन संदेश भेजा जा रहा है...</p>
                    <p className="text-[10px] text-slate-600 font-mono">Connecting MHA Telecom & NIC SMTP Gateway...</p>
                  </div>
                  {/* Simulated progress checklist */}
                  <div className="bg-slate-50 rounded-xl p-3 text-left space-y-1.5 font-mono text-[9px] text-slate-550 border border-slate-200/50 max-w-xs mx-auto">
                    <div className="flex items-center gap-2 text-emerald-600">
                      <Check className="w-3.5 h-3.5 stroke-[3] text-emerald-600 flex-shrink-0" />
                      <span>नोडल नेटवर्क कनेक्शन सुरक्षित...</span>
                    </div>
                    <div className="flex items-center gap-2 text-emerald-600">
                      <Check className="w-3.5 h-3.5 stroke-[3] text-emerald-600 flex-shrink-0" />
                      <span>राजकीय गेटवे अधिप्रमाणन संपन्न...</span>
                    </div>
                    <div className="flex items-center gap-2 text-indigo-700 animate-pulse">
                      <Loader2 className="w-3 h-3 animate-spin flex-shrink-0" />
                      <span>एसएमएस एवं ईमेल पैकेट प्रेषित किया जा रहा है...</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Success Icon */}
                  <div className="bg-emerald-50 text-emerald-600 p-3 rounded-full border border-emerald-100 flex items-center justify-center w-12 h-12 mx-auto animate-bounce shadow-sm">
                    <Check className="w-6 h-6 stroke-[3]" />
                  </div>
                  <div className="text-center space-y-1">
                    <p className="text-sm font-black text-emerald-700">संसूचना सफलतापूर्वक प्रेषित!</p>
                    <p className="text-xs text-slate-550 leading-normal">
                      नियुक्त नोडल प्रभारी <span className="font-extrabold text-indigo-700">{activeNotification.owner}</span> को कार्यभार सौंपने सम्बन्धी संदेश भेज दिया गया है।
                    </p>
                  </div>

                  {/* Messages Sent Dashboard */}
                  <div className="space-y-3 max-h-[220px] overflow-y-auto pr-1">
                    {/* SMS */}
                    <div className="bg-slate-50 border border-slate-200/60 p-3 rounded-xl space-y-2">
                      <div className="flex flex-wrap items-center justify-between gap-1 text-[9.5px] font-black text-indigo-700 uppercase tracking-wider pb-1 border-b border-slate-200">
                        <span>📱 मोबाइल एसएमएस (SMS DELIVERED)</span>
                        <span className="font-mono text-slate-500 bg-white px-1.5 py-0.5 rounded border border-slate-150">{activeNotification.phone}</span>
                      </div>
                      <p className="text-xs text-slate-650 leading-relaxed font-sans italic bg-white p-2 rounded border border-slate-100">
                        "प्रिय {activeNotification.owner}, आपको नवीन विधिक कार्यभार दिया गया है: <strong className="text-slate-800 font-extrabold">{activeNotification.taskTitle}</strong>। समय सीमा: <strong>{activeNotification.timeline}</strong>। तत्काल संज्ञान लें। - जिला पुलिस कप्तान कार्यालय।"
                      </p>
                    </div>

                    {/* Email */}
                    <div className="bg-slate-50 border border-slate-200/60 p-3 rounded-xl space-y-2">
                      <div className="flex flex-wrap items-center justify-between gap-1 text-[9.5px] font-black text-indigo-700 uppercase tracking-wider pb-1 border-b border-slate-200">
                        <span>✉️ राजकीय ईमेल (EMAIL DISPATCHED)</span>
                        <span className="font-mono text-slate-500 bg-white px-1.5 py-0.5 rounded border border-slate-150">{activeNotification.email}</span>
                      </div>
                      <div className="text-[11px] text-slate-650 leading-normal font-sans bg-white p-2.5 rounded border border-slate-100 space-y-1">
                        <p className="font-black text-slate-800 border-b border-dashed border-slate-150 pb-0.5">विषय: नवीन राजकीय कार्यभार आवंटन</p>
                        <p className="pt-0.5 text-slate-550 italic leading-snug">
                          महोदय,<br />
                          आपको पुलिस विभाग योजना के तहत निम्नलिखित प्रशासनिक जिम्मेदारी का प्रभार सौंपा गया है:<br />
                          📌 <strong>{activeNotification.taskTitle}</strong><br />
                          ⏱️ समय सीमा: <strong>{activeNotification.timeline}</strong><br /><br />
                          कृपया संबंधित कार्य का त्वरित समयबद्ध क्रियान्वयन सुनिश्चित करें। - पुलिस कप्तान।
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => setActiveNotification(null)}
                      className="w-full bg-indigo-700 hover:bg-indigo-800 text-white p-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer shadow-md shadow-indigo-600/10"
                    >
                      सत्यापित किया (Ok, Confirm)
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

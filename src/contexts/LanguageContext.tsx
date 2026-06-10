import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'hi' | 'en';

interface Dictionary {
  [key: string]: {
    hi: string;
    en: string;
  };
}

export const translations: Dictionary = {
  // Header
  appTitlePart1: { hi: "स्मार्ट पुलिसिंग कार्ययोजना", en: "Smart Policing Action" },
  appTitlePart2: { hi: "व नीति योजनाकार", en: "Planner & Strategist" },
  totalIndex: { hi: "कुल क्रियान्वयन इंडेक्स", en: "Total Implementation Index" },
  projectInfoBtn: { hi: "प्रोजेक्ट इन्फो", en: "Project Info" },
  projectInfoTooltip: { hi: "प्रोजेक्ट के बारे में जानें", en: "Learn about the project" },
  progressDashboardBtn: { hi: "प्रगति डैशबोर्ड", en: "Progress Dashboard" },
  adminConsoleBtn: { hi: "प्रशासनिक कंसोल", en: "Admin Console" },
  dashboardTooltip: { hi: "सभी 10 योजनाओं का ओवरव्यू देखें", en: "View overview of all 10 priorities" },
  consoleTooltip: { hi: "दैनिक कंसोल पर लौटें", en: "Return to Daily Console" },
  printBtn: { hi: "प्रिंट / PDF", en: "Print / PDF" },
  printTooltip: { hi: "कार्ययोजना प्रिंट करें या पीडीएफ सहेजें", en: "Print action plan or save as PDF" },
  resetTooltip: { hi: "सभी बदलाव रीसेट करें", en: "Reset all changes" },

  // Header Modal
  modalTitle: { hi: "स्मार्ट पुलिसिंग एक्शन प्लानर", en: "Smart Policing Action Planner" },
  modalSubtitle: { hi: "परियोजना का उद्देश्य एवं आवश्यकता", en: "Project Objective and Necessity" },
  modalP1: { 
    hi: "यह ऐप्लीकेशन राष्ट्रीय पुलिसिंग प्राथमिकताओं (National Policing Priorities) को ध्यान में रखकर बनाया गया एक आधुनिक प्रशासनिक उपकरण है। इसका मुख्य उद्देश्य पुलिस बलों की कार्यक्षमता (Efficiency) और जवाबदेही (Accountability) को डिजिटल और AI तकनीक के माध्यम से बढ़ाना है।", 
    en: "This application is a modern administrative tool built keeping National Policing Priorities in mind. Its main objective is to enhance the efficiency and accountability of police forces through digital and AI technologies." 
  },
  modalQ: { hi: "इस सिस्टम की आवश्यकता क्यों है?", en: "Why is this system necessary?" },
  modalR1T: { hi: "त्वरित एवं डेटा-आधारित निर्णय", en: "Quick & Data-Driven Decisions" },
  modalR1D: { hi: "आपातकालीन स्थितियों या रूटीन गश्त में, AI रणनीति सलाहकार के माध्यम से अधिकारी तुरंत एक कस्टमाइज़्ड SOP (Standard Operating Procedure) प्राप्त कर सकते हैं, जिससे फैसले लेने में देरी नहीं होती।", en: "In emergency situations or routine patrols, officers can instantly generate customized SOPs via the AI Strategy Advisor, eliminating delays in decision making." },
  modalR2T: { hi: "स्पष्ट जवाबदेही (Accountability)", en: "Clear Accountability" },
  modalR2D: { hi: "हर कार्य (Task) किसी विशिष्ट अधिकारी (SHO, SP आदि) को असाइन किया जाता है। चेकलिस्ट सिस्टम से यह सुनिश्चित होता है कि कोई भी महत्वपूर्ण प्रशासनिक कदम छूटे नहीं।", en: "Every task is assigned to a specific officer (SHO, SP, etc.). The checklist system ensures that no critical administrative step is missed." },
  modalR3T: { hi: "नागरिक सुरक्षा एवं भरोसा", en: "Citizen Safety & Trust" },
  modalR3D: { hi: "10 मुख्य राष्ट्रीय प्राथमिकता क्षेत्रों (जैसे महिला सुरक्षा, साइबर अपराध, आदि) पर विशेष ध्यान केंद्रित करके, यह सिस्टम पुलिस को अधिक जन-केंद्रित और प्रभावी बनाता है।", en: "By focusing specifically on 10 national priority areas (like women's safety, cybercrime, etc.), this system makes the police more citizen-centric and effective." },
  modalR4T: { hi: "केंद्रीकृत मॉनिटरिंग (Dashboard)", en: "Centralized Monitoring (Dashboard)" },
  modalR4D: { hi: "कुल क्रियान्वयन इंडेक्स और प्रोग्रेस रिपोर्ट के ज़रिए उच्च अधिकारी (DGP, IG) एक ही नज़र में पूरे जिले या ज़ोन की कानून-व्यवस्था की स्थिति को ट्रैक कर सकते हैं।", en: "Through the total implementation index and progress reports, senior officers (DGP, IG) can track the law & order status of the entire district or zone at a glance." },
  closeBtn: { hi: "समझ गया (Close)", en: "Understood (Close)" },

  // Priority List
  nationalPriorities: { hi: "राष्ट्रीय प्राथमिकता क्षेत्र", en: "National Priority Sectors" },
  totalSteps: { hi: "कुल", en: "Total" },
  steps: { hi: "कदम", en: "Steps" },

  // Active Sector View
  progress: { hi: "Progress", en: "Progress" },
  tabChecklist: { hi: "राजकीय क्रियान्वयन चेकलिस्ट", en: "Implementation Checklist" },
  tabAiAdvisor: { hi: "AI प्रशासनिक रणनीति सहायक", en: "AI Strategy Advisor" },
  tabPillars: { hi: "मुख्य प्रशासनिक स्तंभ", en: "Core Administrative Pillars" },
  tasks: { hi: "Tasks", en: "Tasks" },
  markComplete: { hi: "पूर्ण के रूप में चिह्नित करें", en: "Mark as complete" },
  markIncomplete: { hi: "अपूर्ण चिह्नित करें", en: "Mark incomplete" },
  owner: { hi: "नोडल/प्रभारी:", en: "Owner/In-charge:" },
  timeline: { hi: "समय सीमा:", en: "Timeline:" },
  
  // AI Advisor
  aiAdvisorTitle: { hi: "AI स्मार्ट पुलिसिंग रणनीति विकासक", en: "AI Smart Policing Strategy Developer" },
  aiAdvisorDesc: { hi: "इस प्राथमिकता विषय पर एक विस्तृत और स्थानीय विनिर्देशों के अनुरूप राजकीय SOP / नीति गाइड जारी करने के लिए संदर्भ परिदृश्य चुनें और AI कमांड सक्रिय करें।", en: "Select a context scenario and activate the AI command to issue a detailed SOP / policy guide customized to local specifications for this priority subject." },
  scenarioSelectLabel: { hi: "संदर्भ विशिष्ट रणनीतिक परिदृश्य", en: "Context-Specific Strategy Scenario" },
  scenarioSelectSub: { hi: "(Select Context Template)", en: "(Select Context Template)" },
  localDetailsLabel: { hi: "स्थानीय पुलिस बल एवं अतिरिक्त भौगोलिक विनिर्देश", en: "Local Police Force & Additional Geographical Details" },
  localDetailsSub: { hi: "(Optional Details)", en: "(Optional Details)" },
  runAiBtn: { hi: "राजकीय विधिक रणनीति तैयार करें (Formulate AI Strategy)", en: "Formulate Legal Strategy (Formulate AI Strategy)" },
  generatingSop: { hi: "SOP जनरेट की जा रही है...", en: "Generating SOP..." },
  technicalError: { hi: "तकनीकी त्रुटि", en: "Technical Error" },
  
  // Overview Report
  overviewTitle: { hi: "पुलिस आधुनिकीकरण एवं प्राथमिकता ओवरव्यू", en: "Police Modernization & Priorities Overview" },
  reportGeneratedOn: { hi: "रिपोर्ट जनरेट की गई:", en: "Report Generated On:" },
  sectorCol: { hi: "प्राथमिकता क्षेत्र", en: "Priority Sector" },
  completionCol: { hi: "पूर्णता %", en: "Completion %" },
  tasksCol: { hi: "पूर्ण कार्य / कुल कार्य", en: "Completed / Total Tasks" },
  statusCol: { hi: "स्थिति", en: "Status" },
  statusCritical: { hi: "गंभीर", en: "Critical" },
  statusInProgress: { hi: "प्रगति पर", en: "In Progress" },
  statusOnTrack: { hi: "सही दिशा में", en: "On Track" },
  statusCompleted: { hi: "पूर्ण", en: "Completed" },
  
  // Notification History
  historyTitle: { hi: "गतिविधि एवं सूचना लॉग", en: "Activity & Notification Log" },
  emptyLog: { hi: "अभी तक कोई गतिविधि नहीं हुई है।", en: "No activity has occurred yet." },
  actionCompleted: { hi: "कार्य पूर्ण किया गया", en: "Task Completed" },
  actionUncompleted: { hi: "कार्य अपूर्ण किया गया", en: "Task marked Incomplete" },
  aiSopGenerated: { hi: "AI SOP जनरेट की गई", en: "AI SOP Generated" },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('hi');

  const t = (key: string) => {
    if (!translations[key]) {
      console.warn(`Missing translation key: ${key}`);
      return key;
    }
    return translations[key][language];
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

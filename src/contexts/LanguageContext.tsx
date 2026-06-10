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
  
  // Newly Added Translations
  addCustomSopTitle: { hi: "प्रशासनिक कार्य जोड़ें (Add Custom SOP Step)", en: "Add Custom SOP Step" },
  addCustomTaskBtn: { hi: "नया कार्य जोड़ें", en: "Add New Task" },
  aiAdvisorSubtitle: { hi: "इस प्राथमिकता विषय पर एक विस्तृत और स्थानीय विनिर्देशों के अनुरूप राजकीय SOP / नीति गाइड जारी करने के लिए संदर्भ परिदृश्य चुनें और AI कमांड सक्रिय करें।", en: "Select a context scenario and activate the AI command to issue a detailed SOP / policy guide customized to local specifications for this priority subject." },
  aiEmptyState: { hi: "योजना प्रयोक्ता इनपुट दर्ज कर रणनीति तैयार करें। तैयार की गई रणनीति इस बोर्ड पर प्रदर्शित की जाएगी।", en: "Enter user inputs to prepare the strategy. The generated strategy will be displayed on this board." },
  authSuccess: { hi: "राजकीय गेटवे अधिप्रमाणन संपन्न...", en: "Official Gateway Authentication Complete..." },
  cancelBtn: { hi: "रद्द करें", en: "Cancel" },
  confirmOkBtn: { hi: "सत्यापित किया (Ok, Confirm)", en: "Confirmed (Ok, Confirm)" },
  connSecured: { hi: "नोडल नेटवर्क कनेक्शन सुरक्षित...", en: "Nodal Network Connection Secured..." },
  copyBtn: { hi: "कॉपी करें", en: "Copy" },
  copySuccess: { hi: "रणनीति कोड कॉपी कर लिया गया है। इसे आप अपनी डॉक फाइल या ईमेल में पेस्ट कर सकते हैं।", en: "Strategy code copied. You can paste it in your document or email." },
  customSopBadge: { hi: "नागरिक/स्थानीय अनुकूलित एसओपी", en: "Citizen/Local Custom SOP" },
  descriptionLabel: { hi: "विस्तृत व्याख्या (विवरण)", en: "Detailed Explanation (Description)" },
  descriptionPlaceholder: { hi: "एसओपी के अंतर्गत किए जाने वाले कार्यों का संक्षिप्त प्रशासनिक विवरण...", en: "Brief administrative details of tasks under SOP..." },
  dispatchingPackets: { hi: "एसएमएस एवं ईमेल पैकेट प्रेषित किया जा रहा है...", en: "Transmitting SMS & Email packets..." },
  dispatchSuccess: { hi: "संसूचना सफलतापूर्वक प्रेषित!", en: "Notification Dispatched Successfully!" },
  downloadExcelBtn: { hi: "एक्सेल में डाउनलोड करें", en: "Download to Excel" },
  draftPolicy: { hi: "राजकीय नीति ड्राफ्ट", en: "Official Policy Draft" },
  editSopTitle: { hi: "SOP संपादित करें", en: "Edit SOP" },
  emailLabel: { hi: "प्रभारी ईमेल आईडी (Email हेतु, ',' से अलग करें, अधिकतम 100)", en: "Incharge Email ID (Comma separated, max 100)" },
  emailPlaceholder: { hi: "जैसे: sho@gov.in, sp-crime@gov.in", en: "e.g.: sho@gov.in, sp-crime@gov.in" },
  generateAiBtn: { hi: "राजकीय विधिक रणनीति तैयार करें (Formulate AI Strategy)", en: "Formulate AI Strategy" },
  generatingAi: { hi: "SOP जनरेट की जा रही है...", en: "Generating SOP..." },
  keyPillarsTitle: { hi: "रणनीति को सफलीभूत बनाने वाले प्रशासनिक मुख्य स्तंभ (Key Pillars)", en: "Key Administrative Pillars for Strategy Success" },
  liveMonitoringSystem: { hi: "लाइव मॉनिटरिंग सिस्टम", en: "Live Monitoring System" },
  noDataAlert: { hi: "कोई डेटा उपलब्ध नहीं है!", en: "No data available!" },
  notificationHistorySubtitle: { hi: "अब तक भेजे गए सभी प्रशासनिक आदेशों और संदेशों का विवरण।", en: "Details of all administrative orders and messages sent so far." },
  notificationHistoryTitle: { hi: "संसूचना प्रेषण इतिहास", en: "Notification Dispatch History" },
  notificationTitle: { hi: "विभागीय संसूचन प्रणाली (Notification)", en: "Departmental Notification System" },
  openStrategyBtn: { hi: "विस्तृत रणनीति खोलें", en: "Open Detailed Strategy" },
  optionalDetailsLabel: { hi: "स्थानीय पुलिस बल एवं अतिरिक्त भौगोलिक विनिर्देश", en: "Local Police Force & Additional Geographical Details" },
  phoneLabel: { hi: "प्रभारी फ़ोन नम्बर (SMS हेतु, ',' से अलग करें, अधिकतम 100)", en: "Incharge Phone Number (Comma separated, max 100)" },
  phonePlaceholder: { hi: "जैसे: +91 94544 02099, +91 94544 02088", en: "e.g.: +91 94544 02099" },
  priorityListSubtitle: { hi: "National Priority Matrix", en: "National Priority Matrix" },
  priorityListTitle: { hi: "10 राष्ट्रीय प्राथमिकता क्षेत्र", en: "10 National Priority Sectors" },
  ratingExcellent: { hi: "उत्कृष्ट (A+)", en: "Excellent (A+)" },
  ratingNeedsImprovement: { hi: "विशेष सुदृढीकरण क्षेत्र", en: "Needs Special Reinforcement" },
  ratingSatisfactory: { hi: "संतोषजनक (B)", en: "Satisfactory (B)" },
  reportSubtitle: { hi: "यह डै‍शबोर्ड राज्य पुलिस की 10 महत्वपूर्ण प्राथमिकताओं के विरुद्ध जारी क्रियान्वयन प्रगति का एक लाइव संकलित प्रिफेक्टर प्रस्तुत करता है। नीचे प्रत्येक विषय के अंतर्गत निहित 5 बुनियादी सरकारी दिशानिर्देशों (कुल 50 योजनाएं) की वर्तमान स्थिति दर्ज है।", en: "This dashboard presents a live compiled prefecture of implementation progress against 10 critical state police priorities. The current status of 5 basic government guidelines (total 50 schemes) under each subject is recorded below." },
  reportTitle: { hi: "समग्र प्रशासनिक रिपोर्ट कार्ड", en: "Comprehensive Administrative Report Card" },
  responsibleUnitLabel: { hi: "जिम्मेदार इकाई *", en: "Responsible Unit *" },
  saveBtn: { hi: "सुरक्षित करें", en: "Save" },
  scenarioLabel: { hi: "संदर्भ विशिष्ट रणनीतिक परिदृश्य", en: "Context-Specific Strategic Scenario" },
  sectorId: { hi: "सेक्टर", en: "Sector" },
  sendingNotification: { hi: "सुरक्षित गेटवे द्वारा संसूचन संदेश भेजा जा रहा है...", en: "Sending notification message via secure gateway..." },
  showDetailsBtn: { hi: "विवरण दिखाएं", en: "Show Details" },
  statePoliceRating: { hi: "राज्य पुलिस रेटिंग", en: "State Police Rating" },
  tabActions: { hi: "राजकीय क्रियान्वयन चेकलिस्ट", en: "Implementation Checklist" },
  taskDescPlaceholder: { hi: "कार्य विवरण", en: "Task Description" },
  taskTitlePlaceholder: { hi: "कार्य शीर्षक", en: "Task Title" },
  timelineLabel: { hi: "समय सीमा:", en: "Timeline:" },
  titleLabel: { hi: "शीर्षक *", en: "Title *" },
  titlePlaceholder: { hi: "जैसे: संवेदनशील बूथों का पुलिस बल द्वारा पैदल मार्च...", en: "e.g.: Foot march by police force at sensitive booths..." },
  totalApprovedTargets: { hi: "कुल स्वीकृत लक्ष्य", en: "Total Approved Targets" }
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

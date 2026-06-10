import { PrioritySector } from "./data";

export const PRIORITY_SECTORS_EN: PrioritySector[] = [
  {
    id: 1,
    title: "Crime Prevention, Quality Investigation & Justice",
    englishTitle: "Crime Prevention & Quality Investigation",
    icon: "ShieldAlert",
    description: "Improving conviction rates through scientific evidence, forensic tools, and swift legal procedures to create a fear-free society.",
    objective: "Curbing crimes through 'precision patrolling' and improving the quality of investigation to make legal proceedings impenetrable.",
    pillars: [
      { title: "Scientific & Digital Investigation", description: "100% utilization of forensic vans, Call Data Records (CDR), and digital evidence." },
      { title: "Hotspot-Driven Patrolling", description: "Determining patrolling routes based on crime pattern matching." },
      { title: "Court Process Coordination", description: "Ensuring timely presentation of evidence and witnesses to increase conviction rates." }
    ],
    defaultActions: [
      {
        id: "1_1",
        title: "Strengthening Mobile Forensic Teams (MFT)",
        description: "Deploying 24/7 active forensic vans equipped with PPE kits, fingerprint lifters, and digital evidence extractors at every sub-division/circle level.",
        timeline: "Next 30 days",
        owner: "SP Crime / FSL Wing",
        completed: false
      },
      {
        id: "1_2",
        title: "Implementation of New Criminal Codes (BNSS, BNS, BSA)",
        description: "Issuing codified guidelines for storing videography and electronic evidence in accordance with legal validations under the new criminal laws.",
        timeline: "Next 45 days",
        owner: "DIG Training / Prosecution Directorate",
        completed: false
      },
      {
        id: "1_3",
        title: "Crime Hotspot and Predictive Patrolling Initiative",
        description: "Rescheduling night patrol routes by GIS mapping of theft, robbery, and violent crime data from the last 3 years.",
        timeline: "Next 15 days",
        owner: "All SHOs / IT Cell",
        completed: false
      },
      {
        id: "1_4",
        title: "Complete Digitization of Summons and Warrant Serving",
        description: "Coordinating with courts to send digital summons via the Interoperable Criminal Justice System (ICJS) and issuing alerts to police officers' mobiles.",
        timeline: "Next 60 days",
        owner: "Court Moharrir / SP HQ",
        completed: false
      },
      {
        id: "1_5",
        title: "SOP for Witness Protection & Video Statements",
        description: "Recording statements of witnesses in sensitive cases via video conferencing directly from police stations or safe locations and securing them on a cloud database.",
        timeline: "Next 30 days",
        owner: "Special Public Prosecutor / SP Legal",
        completed: false
      }
    ],
    aiScenarios: [
      {
        label: "Urban Area Night Patrol",
        context: "Create an action plan to prevent theft and chain-snatching incidents between 11 PM and 4 AM in a densely populated urban metro area.",
        placeholder: "e.g., Precision patrol action plan in Civil Lines..."
      },
      {
        label: "Highway Robbery Prevention",
        context: "Plan to completely control incidents of truck looting and robbery at night on isolated and deserted patches of National Highways (NH).",
        placeholder: "e.g., Formation of anti-highway loot patrol team on NH-98..."
      },
      {
        label: "Serious Financial Fraud Investigation",
        context: "Legal investigation SOP for evidence collection in cases of embezzlement of public funds and issuance of large loans on forged documents in a local cooperative bank.",
        placeholder: "e.g., Forensic and audit matching in bank fraud..."
      }
    ]
  },
  {
    id: 2,
    title: "Women & Child Safety",
    englishTitle: "Women & Child Safety",
    icon: "HeartHandshake",
    description: "Establishing a zero-tolerance policy against various crimes and domestic abuse, creating a swift, sensitive, and safe environment.",
    objective: "Ensuring the safe and unhindered movement of women in public spaces and launching swift legal strikes against child labor/child sexual offenses (POCSO).",
    pillars: [
      { title: "Pink Policing", description: "24/7 accessibility of female patrol teams (Pink Beat) and women's help desks in all police stations." },
      { title: "Fast Track Investigation", description: "Filing charge sheets within a strict 60-day timeframe in POCSO and severe women harassment cases." },
      { title: "Awareness & Self-Defense", description: "Organizing intensive security campaigns and self-defense training in educational institutions." }
    ],
    defaultActions: [
      {
        id: "2_1",
        title: "Strengthening Pink Patrol and Pink Beat",
        description: "Reducing the response time to under 5 minutes and increasing the visibility of GPS-equipped female police two-wheelers (Pink Patrol) in urban areas and near colleges.",
        timeline: "Next 15 days",
        owner: "Nodal Officer Women Safety / Traffic Police",
        completed: false
      },
      {
        id: "2_2",
        title: "Air-Conditioned Women Help Desks (WHD) in all Stations",
        description: "Deploying sensitized trained female police personnel 24/7 with a separate room to ensure seating and privacy for female victims.",
        timeline: "Next 30 days",
        owner: "SHO / District Police Chief",
        completed: false
      },
      {
        id: "2_3",
        title: "Streetlight & CCTV Hotspot Audit",
        description: "Immediately installing streetlights and surveillance cameras near dark alleys, public toilets, and bus stops in collaboration with civic bodies.",
        timeline: "Next 30 days",
        owner: "Civic Body Nodal / Traffic Wing",
        completed: false
      },
      {
        id: "2_4",
        title: "Child-Friendly Police Stations and POCSO Rooms",
        description: "Establishing a non-threatening 'child-friendly' corner with toys and cartoon paintings on walls in police stations for recording children's statements and counseling.",
        timeline: "Next 60 days",
        owner: "Special Juvenile Police Unit (SJPU)",
        completed: false
      },
      {
        id: "2_5",
        title: "Domestic Violence Crisis SOS Support",
        description: "Establishing on-call rescue teams in collaboration with One-Stop Centers and NGOs for counseling and legal protection of domestic violence victims.",
        timeline: "Next 15 days",
        owner: "Women Welfare Branch",
        completed: false
      }
    ],
    aiScenarios: [
      {
        label: "Coaching Hub Security Plan",
        context: "Action plan to prevent harassment of female students between 5 PM and 9 PM in a coaching institute hub with a large student population.",
        placeholder: "Deployment plan of Pink Beats for student safety..."
      },
      {
        label: "Domestic Violence Hotline Response",
        context: "Strategy to make local police outposts sensitive and responsive for quick action based on increasing domestic violence complaints in rural settings.",
        placeholder: "Social counseling and legal aid in rural areas..."
      },
      {
        label: "POCSO Case Swift Investigation",
        context: "Phased 30-day SOP for medical examination, videography of witness statements, and evidence collection in a case registered under the POCSO Act.",
        placeholder: "Medical evidence and psychological counseling process..."
      }
    ]
  },
  {
    id: 3,
    title: "Swift & Effective Grievance Redressal",
    englishTitle: "Grievance Redressal Mechanism",
    icon: "CheckCircle2",
    description: "Restoring public trust in the police by assessing the speed and quality of citizen grievance resolution.",
    objective: "Disposing of IGRS, public hearings (Jansunwai), and police station complaints within a time-bound limit and checking quality via a feedback loop.",
    pillars: [
      { title: "Daily Senior Review", description: "Online monitoring of pending public hearing lists of police stations by SP and senior officers daily from 11 AM to 1 PM." },
      { title: "Digital Tracking & SMS", description: "Instant mobile updates to the complainant with a receipt upon registration and upon resolution of each stage." },
      { title: "Random Feedback Audit", description: "Impartially assessing the behavior of the investigating officer and satisfaction by speaking directly to the victim in disposed cases." }
    ],
    defaultActions: [
      {
        id: "3_1",
        title: "IGRS & Public Hearing (Jansunwai) Campaign",
        description: "Creating a special list of all pending cases in the district, fixing accountability according to the delay period, and ensuring their disposal within 10 days.",
        timeline: "Next 10 days",
        owner: "SP HQ / Grievance Cell",
        completed: false
      },
      {
        id: "3_2",
        title: "Establishment of Feedback Cell",
        description: "Deploying an independent calling-based receptionist team at the headquarters to call 20% random applicants from closed complaints to verify authenticity.",
        timeline: "Next 20 days",
        owner: "PRO / Additional SP",
        completed: false
      },
      {
        id: "3_3",
        title: "Revamping of Police-Citizen Day (Thana Diwas)",
        description: "On-the-spot settlement of land/family disputes in police stations along with Revenue Department officials on the first and third Saturday of every month.",
        timeline: "Next 15 days",
        owner: "SDM / All SHOs",
        completed: false
      },
      {
        id: "3_4",
        title: "Establishing Online e-FIR Desk",
        description: "Expanding the automatically approved e-FIR system via mobile app and email for cases of theft, vehicle theft, and missing persons without calling them to the station.",
        timeline: "Next 30 days",
        owner: "CCTNS Nodal",
        completed: false
      },
      {
        id: "3_5",
        title: "Home-Visits for Senior Citizens/Differently-Abled",
        description: "Implementing a system where the Beat Constable personally visits the victim's house to collect the application for complaints from elderly people who are unable to walk or living alone.",
        timeline: "Next 15 days",
        owner: "Beat Police Officer / Outpost In-charge",
        completed: false
      }
    ],
    aiScenarios: [
      {
        label: "Swift Settlement of Land Disputes",
        context: "SOP for resolving potential violent clashes arising due to farming and boundary land disputes in rural areas through the Police Station Solution Day.",
        placeholder: "Joint demarcation and resolution with the land revenue team..."
      },
      {
        label: "Disposal of Repeated False Complaints",
        context: "Roadmap for impartial investigation of malicious complaints repeatedly given against a single person out of enmity, and punitive legal action against the complainant.",
        placeholder: "Legal probe and action under Section 182 BNS/IPC..."
      },
      {
        label: "Senior Citizen Complaint Monitoring",
        context: "Quick relief plan in cases of mental harassment of single pensioner senior citizens by neighbors or tenants.",
        placeholder: "Weekly security visits and counseling work at the beat level..."
      }
    ]
  },
  {
    id: 4,
    title: "Law & Order Management",
    englishTitle: "Law & Order Management",
    icon: "Users",
    description: "Being proactive in maintaining peace and keeping communal harmony intact during riots, protests, public gatherings, and festivals.",
    objective: "Strengthening the intelligence network to face any emergency challenge of law and order professionally and with minimum use of force.",
    pillars: [
      { title: "Proactive Risk Mapping", description: "Advance identification of sensitive festivals and hotspots leading to preventive action." },
      { title: "Digital and Drone Surveillance", description: "Real-time analysis of drone feeds to check crowd sizes and locate stones placed on rooftops." },
      { title: "Peace Committee Coordination", description: "Active dialogue with respectable citizens of all religions, youth leaders, and social media volunteers." }
    ],
    defaultActions: [
      {
        id: "4_1",
        title: "Sensitization of Local Intelligence Unit (LIU)",
        description: "Providing input 12 hours in advance by daily analysis of dissatisfaction and rumors breeding at tea stalls, chaupals, and social groups at the local beat level.",
        timeline: "Next 15 days",
        owner: "Regional Intelligence Chief / LIU Inspector",
        completed: false
      },
      {
        id: "4_2",
        title: "Drone and Tactical Surveillance Cell",
        description: "Forming 5 drone squads equipped with modern thermal and high-definition night vision cameras to monitor crowded sensitive areas.",
        timeline: "Next 30 days",
        owner: "SP City / RI Police Lines",
        completed: false
      },
      {
        id: "4_3",
        title: "Social Media Monitoring & Rebuttal Desk",
        description: "Monitoring handles spreading rumors and, in case of fake news, posting the official truth of the police with videos/data within 30 minutes.",
        timeline: "Next 7 days",
        owner: "Social Media Cell / Police Spokesperson",
        completed: false
      },
      {
        id: "4_4",
        title: "Anti-Riot Equipment & Mock Drills",
        description: "Physical inspection of body protectors, helmets, tear gas, anti-riot Vajra vehicles, and intensive riot control drills in police lines every Saturday.",
        timeline: "Next 15 days",
        owner: "Reserve Inspector (RI) / Reserve Police Line",
        completed: false
      },
      {
        id: "4_5",
        title: "Anti-Antisocial Bonds Campaign (Preventive Action)",
        description: "Enforcing strict bailable bonds and mandatory police station attendance against identified elements causing communal or organized disturbance before elections or major festivals.",
        timeline: "Next 30 days",
        owner: "Additional District Magistrate (ADM) / All COs",
        completed: false
      }
    ],
    aiScenarios: [
      {
        label: "Massive Protest Control",
        context: "SOP for managing a potential crowd of 10,000 people gathering to gherao the collectorate and block traffic by a political or civic organization.",
        placeholder: "Route diversion, barricading, and water cannon positioning..."
      },
      {
        label: "Sensitive Festival Procession Security",
        context: "Plan for communal peace and rooftop drone surveillance during a traditional religious procession passing through a narrow old city route with a mixed population.",
        placeholder: "Peace meetings, volunteer deployment, and CCTV grid..."
      },
      {
        label: "Natural Disaster or Arson Rescue",
        context: "Swift cordon strategy to prevent law and order issues and looting in the event of a sudden fire due to a short circuit in a large commercial complex or a flood situation.",
        placeholder: "Emergency cordon, route diversion, and rescue team pathways..."
      }
    ]
  },
  {
    id: 5,
    title: "Cybercrime Prevention & Control",
    englishTitle: "Cybercrime Prevention & Control",
    icon: "Cpu",
    description: "Protecting citizens against financial cyber fraud, identity theft, and online harassment, and destroying the digital footprints of criminals.",
    objective: "Ensuring a safe life in the digital world, freezing accounts of cyber thugs, and empowering investigators with advanced technical tools.",
    pillars: [
      { title: "Rapid Golden Hour Rescue", description: "Instantly pausing bank accounts within 2 hours of fraud via Helpline 1930 and the National Cyber Portal." },
      { title: "Cyber Forensic Lab", description: "Establishment of a technical investigation unit equipped with the latest analysis software (UFED Cellebrite, EnCase)." },
      { title: "Digital Financial Literacy", description: "Continuously making citizens aware about not sharing OTPs and verifying the authenticity of online apps." }
    ],
    defaultActions: [
      {
        id: "5_1",
        title: "Upgradation of Cyber Helpline '1930' Response Center",
        description: "Taking the freeze rate of stolen money in the 'Golden Hour' beyond 80% by increasing coordination with representatives of telecom operators and banks at the desk.",
        timeline: "Next 15 days",
        owner: "SP Cyber Crime / Nodal Bank Coordination",
        completed: false
      },
      {
        id: "5_2",
        title: "Starting 'Cyber Help Desk' at Every Police Station",
        description: "Deployment of at least two highly trained police constables at all police stations in the district to help cybercrime victims immediately register an FIR.",
        timeline: "Next 30 days",
        owner: "CO Cyber Crime / DSP HQ",
        completed: false
      },
      {
        id: "5_3",
        title: "Procurement of Cyber Forensic Tools and Software",
        description: "Ensuring the purchase and training for mobile cloning, call details analysis, dark web monitoring, and social media sentiment analysis software.",
        timeline: "Next 60 days",
        owner: "IT and Technical Procurement Branch",
        completed: false
      },
      {
        id: "5_4",
        title: "Cyber Security Awareness Campaign (Muhim)",
        description: "Putting up posters at local banks, ATM booths, petrol pumps, and digital payment counters, and organizing workshops in schools.",
        timeline: "Next 45 days",
        owner: "Public Relations & Community Policing Unit",
        completed: false
      },
      {
        id: "5_5",
        title: "Crackdown on Fake SIMs and Mule Accounts",
        description: "Physical verification of KYC documents and blocking SIMs operated on fake addresses in collaboration with telecom companies and local post offices.",
        timeline: "Next 30 days",
        owner: "Special Cyber Crime Cell",
        completed: false
      }
    ],
    aiScenarios: [
      {
        label: "Phishing Link / SMS Scam",
        context: "Action strategy against organized rackets deceiving people out of lakhs of rupees under the pretext of unpaid electricity bills or blocked bank accounts.",
        placeholder: "Tracking calling locations, bank mule accounts, and raids..."
      },
      {
        label: "Female Sextortion",
        context: "Cutting the web of cybercriminals who force women and youth into suicide by recording video calls after sending friend requests on social media.",
        placeholder: "IP address tracing, UPI merchant account analysis..."
      },
      {
        label: "Dark Web Drug Cartel Operation",
        context: "Technical exposure of the network delivering narcotics locally via couriers using encrypted dark web websites.",
        placeholder: "Crypto wallet address and courier trail investigation..."
      }
    ]
  },
  {
    id: 6,
    title: "Making Citizen Services More Accessible & Effective",
    englishTitle: "Accessible Citizen Services",
    icon: "HelpCircle",
    description: "Making police permissions like passports, character certificates, and missing receipts completely digital and corruption-free.",
    objective: "Paving the way for Doorstep Governance by relieving citizens from the hassle of making repeated trips to the police lines or stations.",
    pillars: [
      { title: "Paperless Citizen Portal", description: "Application via mobile app, online fee payment, digitally signed certificates." },
      { title: "Time-Bound Guarantee Service", description: "Mandatory disposal of service within a fixed time limit (e.g., character verification 7 days, passport 14 days)." },
      { title: "Helpline Accessibility", description: "Physical assistance of Police PRV within 10 minutes on all emergency calls (112)." }
    ],
    defaultActions: [
      {
        id: "6_1",
        title: "Single Window Citizen Certification",
        description: "Launching an integrated district single-window portal by combining the processes of character verification, arms license renewal, and event permissions.",
        timeline: "Next 30 days",
        owner: "SP Administration / e-District Manager",
        completed: false
      },
      {
        id: "6_2",
        title: "Reducing Passport Verification Time",
        description: "Ensuring verification directly through the integrated GPS-enabled 'mPassport' mobile app by field beat police instead of manual registers.",
        timeline: "Next 15 days",
        owner: "Passport Cell / All SHOs",
        completed: false
      },
      {
        id: "6_3",
        title: "Digital Registration of Tenants and Domestic Helpers",
        description: "Implementing an easy system for landlords to upload details of tenants and domestic helpers from home via mobile app for verification.",
        timeline: "Next 20 days",
        owner: "Regional Beat Constable / Outpost In-charge",
        completed: false
      },
      {
        id: "6_4",
        title: "Instant 'Lost and Found Receipt' for Lost Items",
        description: "Massive digital promotion of the system to automatically download online receipts in case of loss of ID cards, mobiles, or important documents.",
        timeline: "Next 10 days",
        owner: "IT Wing / PR Wing",
        completed: false
      },
      {
        id: "6_5",
        title: "Grievance Redressal Desk for NRIs & Remote Citizens",
        description: "Video calling redressal desk for the security of properties and cases of local native senior citizens residing abroad or in other states.",
        timeline: "Next 30 days",
        owner: "SP Public Grievance / Foreigner Registration Nodal (FRO)",
        completed: false
      }
    ],
    aiScenarios: [
      {
        label: "Hassle-Free Digital Character Certificate",
        context: "Automated SOP to handle the massive rush of background character verifications of 5000+ youths selected for private companies and government jobs within 5 days.",
        placeholder: "Criminal database syncing and mobile verification app..."
      },
      {
        label: "Intensive Tenant Verification Campaign",
        context: "Tenant GPS verification strategy for landlords to prevent suspicious persons from hiding in sensitive industrial/border areas.",
        placeholder: "Intensive checking, QR code-based biometric receipt..."
      },
      {
        label: "Ease of Permission for Public Events",
        context: "A single portal policy for pandal security, fire brigade, electricity, and police clearance for organizing Durga Puja, Ramleela, or sports tournaments on festivals.",
        placeholder: "Digital issuance of No-Objection Certificate (NOC)..."
      }
    ]
  },
  {
    id: 7,
    title: "Welfare of Police Personnel",
    englishTitle: "Police Force Welfare",
    icon: "Heart",
    description: "Improving the physical and mental health of police personnel struggling with extreme mental stress, long duties, and uncertain lifestyles.",
    objective: "Providing medical, housing, and stress-relief schemes to the families of police personnel to increase their work efficiency.",
    pillars: [
      { title: "Stress Relief & Meditation Sessions", description: "Mandatory yoga/meditation class every Sunday at each police station/battalion level." },
      { title: "Health Checkup Camps", description: "Annual comprehensive medical testing for personnel above 40 years of age." },
      { title: "Better Barracks & Mess", description: "Upgradation of living standards through RO water, hygienic canteens, and clean toilets in police lines." }
    ],
    defaultActions: [
      {
        id: "7_1",
        title: "Health & Lifestyle Checkup Camps",
        description: "Organizing medical camps in collaboration with the District Hospital/CMO to investigate blood pressure, diabetes, and heart diseases for officers doing duty for more than 12 hours.",
        timeline: "Next 30 days",
        owner: "Reserve Inspector (RI) / Nodal Health",
        completed: false
      },
      {
        id: "7_2",
        title: "Duty Rotation and Weekly Rest System",
        description: "Implementing an automated transparent roster to guarantee at least one day off per week for constables and head constables to improve work-life balance.",
        timeline: "Next 15 days",
        owner: "Additional SP / All SHOs",
        completed: false
      },
      {
        id: "7_3",
        title: "Police Modernization (Barracks and Mess)",
        description: "Providing modern modular kitchens, clean dining halls, and washing machines in all major police stations and police lines using government grants.",
        timeline: "Next 60 days",
        owner: "SP Headquarters / Accountant",
        completed: false
      },
      {
        id: "7_4",
        title: "Mental Counseling & Support Helpline",
        description: "Providing psychological counseling facilities while keeping the identity completely confidential for policemen struggling with depression or family disputes.",
        timeline: "Next 30 days",
        owner: "Police Hospital / Welfare Cell",
        completed: false
      },
      {
        id: "7_5",
        title: "Police Family Welfare Activities (Vama Sarathi)",
        description: "Operating skill development centers (computer training, stitching) and libraries in the police lines to secure the future of the wives and children of policemen.",
        timeline: "Next 45 days",
        owner: "President Police Families Welfare Association",
        completed: false
      }
    ],
    aiScenarios: [
      {
        label: "Preventing Police Suicides",
        context: "SOP to identify symptoms of depression in police personnel due to work pressure or family discord and provide immediate confidential psychiatric help.",
        placeholder: "Buddy system, behavioral monitoring, and clinical therapy..."
      },
      {
        label: "Emergency Duty Management",
        context: "Action plan for shifting shifts, providing nutritious food packets, and arranging mobile bio-toilets for personnel deployed on continuous 24-48 hour duty during major elections or riots.",
        placeholder: "Logistics supply chain and shift relief strategy..."
      },
      {
        label: "Reward & Recognition Program",
        context: "Transparent criteria policy for boosting morale by selecting 'Policeman of the Month' based on solving good cases and good behavior with the public.",
        placeholder: "Performance metrics and public feedback evaluation..."
      }
    ]
  },
  {
    id: 8,
    title: "Human Resource & Work Efficiency",
    englishTitle: "Human Resource & Work Efficiency",
    icon: "TrendingUp",
    description: "Rationally distributing available manpower by reducing unnecessary VIP protocols and clerical work to increase the number of field patrol forces.",
    objective: "Creating a database of core skills of officers and constables to assign accurate merit-based postings and responsibilities.",
    pillars: [
      { title: "Duty Rationalization", description: "Scientific allocation of personnel based on crime rate and area of the police station (Workforce Balancing)." },
      { title: "Non-Core Work Outsourcing", description: "Utilizing civil staff or digital tools for paperwork, delivering mail, and record room maintenance." },
      { title: "KPI-Based Performance Evaluation", description: "Transparent promotions/excellent entries based on arrests, successful investigations, and public feedback instead of recommendations." }
    ],
    defaultActions: [
      {
        id: "8_1",
        title: "Clerical Coordination of Qualified Retired or Civil Personnel",
        description: "Preparing a blueprint to deploy trained IT assistants instead of police personnel for computer work and data entries.",
        timeline: "Next 45 days",
        owner: "SP Administration / Finance Controller",
        completed: false
      },
      {
        id: "8_2",
        title: "VIP Duty Manpower Audit",
        description: "Reviewing and recalling police security guards and orderly forces deployed without authorization or despite the absence of a security threat, and appointing them to police stations.",
        timeline: "Next 15 days",
        owner: "SP Security / District Intelligence Bureau",
        completed: false
      },
      {
        id: "8_3",
        title: "Police Skill Inventory Matrix System",
        description: "Digital profiling of IT skills, legal knowledge, vehicle driving, and physical sports records of all constables and sub-inspectors in the district.",
        timeline: "Next 30 days",
        owner: "Systems Analyst / SP Headquarters",
        completed: false
      },
      {
        id: "8_4",
        title: "Quick Response Team (QRT) Reorganization",
        description: "Selecting physically highly efficient youths under 30 capable of dealing with young criminals to form state-of-the-art patrol QRTs.",
        timeline: "Next 20 days",
        owner: "CO Police Lines / RI",
        completed: false
      },
      {
        id: "8_5",
        title: "Strict Performance Index (KPI) for Station House Officers",
        description: "Creating a scoreboard for all SOs/SHOs in the monthly review based on public hearing disposal rating, night crime prevention percentage, and investigation completion rate.",
        timeline: "Every month",
        owner: "All COs / District Police Superintendent",
        completed: false
      }
    ],
    aiScenarios: [
      {
        label: "VIP Duty Security Force Rationalization",
        context: "SOP for rationalizing the inconvenience caused to the public and the extreme wastage of police VIP arrangement human resources during a VIP visit.",
        placeholder: "Minimum security cordon and quick rotation force..."
      },
      {
        label: "Swift Digitization of Paper Files",
        context: "Roadmap to convert 20-year-old dusty case documents and malkhana inventory lists lying in police stations into a paperless cloud search engine.",
        placeholder: "Scanning, indexing, and CCTNS integration..."
      },
      {
        label: "Merit-Based Beat Allocation",
        context: "System of allotting beat in-charges to sub-inspectors having language knowledge, local communication skills, and patience in a sensitive communal area.",
        placeholder: "Efficiency test and social security beat dialogue..."
      }
    ]
  },
  {
    id: 9,
    title: "AI & Tech-Based Smart Policing",
    englishTitle: "AI & Tech-Based Smart Policing",
    icon: "Fingerprint",
    description: "Predicting crime automatically through deep-learning of CCTV camcorders, facial recognition of criminals, and data trends.",
    objective: "Adopting computer vision, network forensics, and predictive analytics tools to stay two steps ahead of the digital cunning of modern criminals.",
    pillars: [
      { title: "AI Facial Recognition (FRS)", description: "Linking cameras installed at public places and railway stations with the database of missing persons and wanted criminals." },
      { title: "ANPR Traffic Challan", description: "Automatic vehicle challan and alert by ANPR for riding without a helmet, over-speeding, and jumping red lights." },
      { title: "Social Media Radar Sensor", description: "Online automatic scanning and early warning system for keywords spreading toxic riots and communal hatred." }
    ],
    defaultActions: [
      {
        id: "9_1",
        title: "Trinetra (Integrated CCTV Surveillance System) Initiative",
        description: "Synchronizing all main intersections, ATM booths, and toll gates of the district from a centralized ICCC monitoring room via AI-enabled software.",
        timeline: "Next 60 days",
        owner: "Nodal Officer CCTV / SP City",
        completed: false
      },
      {
        id: "9_2",
        title: "AI Chatbot Citizen Service System",
        description: "Deploying a multilingual AI virtual assistant on the official police website to automatically inform citizens about service status and character verification progress without having to confront the police.",
        timeline: "Next 30 days",
        owner: "IT Cell / SP Administration",
        completed: false
      },
      {
        id: "9_3",
        title: "Smart Checkposts & ANPR Checking",
        description: "Installing Automatic Number Plate Recognition cameras on border limits that send a siren beep to the police control room as soon as stolen vehicles pass.",
        timeline: "Next 45 days",
        owner: "Traffic Police / SP Security",
        completed: false
      },
      {
        id: "9_4",
        title: "Crime Patterns AI Predictive Tool",
        description: "Testing a simple machine learning tool that predicts the most sensitive areas for the coming week based on data of every season, festival, and past crime scenes.",
        timeline: "Next 30 days",
        owner: "IT Experts / SP Crime",
        completed: false
      },
      {
        id: "9_5",
        title: "Handheld e-Challan and Verification Devices for Investigators",
        description: "Providing mobile devices to personnel on duty in the field that match the criminal history of suspects on the spot using fingerprints and faces.",
        timeline: "Next 60 days",
        owner: "CCTNS Branch / Technical Department",
        completed: false
      }
    ],
    aiScenarios: [
      {
        label: "CCTV-FRS Suspect Search",
        context: "Plan to install facial recognition cameras to protect missing children from criminals and child traffickers in a crowded Maha Kumbh or a large religious fair.",
        placeholder: "CCTV grid architecture, wanted criminals photo syncing..."
      },
      {
        label: "AI-Based VIP Convoy Route Facilitation",
        context: "SOP for providing a green corridor by automatic AI signals to ambulances and fire brigade vehicles without stopping the traffic of common citizens for hours.",
        placeholder: "Traffic signal modulation and alarm notification..."
      },
      {
        label: "Social Media Provocative Keyword Sensor",
        context: "Automatic toxic keyword search system in social media platforms Twitter, Facebook, and Telegram groups during the rise of communal tension in border districts.",
        placeholder: "Keyword hunting, IP geolocation estimation..."
      }
    ]
  },
  {
    id: 10,
    title: "Continuous Training & Capacity Building",
    englishTitle: "Continuous Training & Capacity Building",
    icon: "BookOpen",
    description: "Freeing policing from the traditional punitive image and building a highly modern, polite, and technically impenetrable workforce.",
    objective: "Lifelong education on the nuances of Indian Judicial Codes, preservation of forensic evidence, acquisition of cyber evidence, and strict compliance with human rights.",
    pillars: [
      { title: "Mandatory Annual Refresher Sessions", description: "Intensive practical refresher training on latest police techniques for 15 days a year for every constable to senior inspector." },
      { title: "Soft Skills & Sensitive Public Dealing", description: "Learning empathy such as treating citizens respectfully, stress management, and applying balm to the wounds of the victim's family." },
      { title: "Weapons & Simulator Training", description: "Practice on modern simulator gun ranges to aim accurately with minimum use of force and during self-defense." }
    ],
    defaultActions: [
      {
        id: "10_1",
        title: "Indian Judicial Codes (BNS/BNSS/BSA) 100% Practical Training",
        description: "Running workshops by law and judicial officers on the exact changes of new sections of case diary writing for all investigators and sub-inspectors.",
        timeline: "Next 15 days",
        owner: "Directorate of Training / SP Legal",
        completed: false
      },
      {
        id: "10_2",
        title: "Empathy and Soft Skills Training Program",
        description: "Conversation and politeness training sessions for frontdesk personnel of police stations with occupational psychologists and human rights activists.",
        timeline: "Next 30 days",
        owner: "DIG Training / Police Training College",
        completed: false
      },
      {
        id: "10_3",
        title: "Digital Forensics and e-Evidence Certification",
        description: "Providing a course on mobile phone data dumping and hash-value certification from National Defense University or NICFS to 50 selected sub-inspectors.",
        timeline: "Next 45 days",
        owner: "DSP Cyber Crime / SP Training",
        completed: false
      },
      {
        id: "10_4",
        title: "Installation of Modern Firing Simulators",
        description: "Setting up firing simulators of realistic emergency scenarios (Hostage Rescue, terrorist encounter) without wasting cartridges for cheap and highly practical training.",
        timeline: "Next 60 days",
        owner: "RI Police Lines / SP Financial Planning",
        completed: false
      },
      {
        id: "10_5",
        title: "First Aid and CPR Life Saving Training",
        description: "Intensive Red Cross training for personnel deployed on all highway patrol vehicles and PRVs to give CPR and stop bleeding to the injured at the accident site in critical moments.",
        timeline: "Next 15 days",
        owner: "SP Traffic / Red Cross Nodal Doctor",
        completed: false
      }
    ],
    aiScenarios: [
      {
        label: "New Legal Evidence Collection Practice",
        context: "SOP of strict security standards to make cloud data and WhatsApp chats admissible as evidence in court under the new format of the New Indian Evidence Act (BSA).",
        placeholder: "Hash value calculator, digital panchnama certification..."
      },
      {
        label: "Anti-Riot Peace Talks Against Mob",
        context: "Module on leadership skills, peace talk negotiation techniques, and staying calm in tense conversations for police officers standing in front of a violent, agitated mob.",
        placeholder: "Dialogue strategies, tension diffusion, and crowd diversion..."
      },
      {
        label: "Victim Sensitization (Victim-First Support)",
        context: "Sensitized Gender Judicial SOP for interrogating a female survivor of rape or severe kidnapping without hurting her already terrified mental health.",
        placeholder: "Psychological counselor presence and secret videography..."
      }
    ]
  }
];

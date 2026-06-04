import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Gemini Client
  const apiKey = process.env.GEMINI_API_KEY;
  const ai = apiKey ? new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  }) : null;

  // AI strategy generator API
  app.post("/api/generate-strategy", async (req, res) => {
    try {
      const { sectorId, title, scenario, userInput } = req.body;

      if (!ai) {
        return res.status(400).json({
          error: "GEMINI_API_KEY उपलब्ध नहीं है। कृपया AI Studio के 'Settings > Secrets' पैनल में अपना API Key दर्ज करें। तभी AI रणनीति जनरेटर कार्य कर सकेगा।"
        });
      }

      // Strict, elite-level Indian Police DGP / Smart Policing expert prompt
      const prompt = `आप भारत के सर्वोच्च पुलिस प्रशासन अधिकारी (Director General of Police - DGP) और स्मार्ट पुलिसिंग मामलों के मुख्य नीति रणनीतिकार हैं।

आपको निम्नलिखित पुलिसिंग/सुरक्षा प्राथमिक क्षेत्र पर एक अत्यंत व्यापक, व्यावहारिक, संहिताबद्ध, और जमीनी स्तर पर क्रियान्वयन योग्य कार्ययोजना (SOP) तथा रणनीति रोडमैप तैयार करना है:

प्राथमिकता क्षेत्र: "${title}" (क्रम संख्या: ${sectorId})
चयनित संदर्भ/परिदृश्य: "${scenario}"
उपयोगकर्ता द्वारा विशेष स्थानीय विवरण (Constraints/Context): "${userInput || "कोई अतिरिक्त विवरण नहीं दिया गया।"}"

कृपया निम्नलिखित संरचित शीर्षकों के अंतर्गत पूरी गंभीरता और आधिकारिक भाषा में कार्ययोजना तैयार करें (प्रतिक्रिया केवल हिंदी भाषा में हो, और सुंदर व स्पष्ट मार्कडाउन संरचना का उपयोग करें):

### 🎯 १. मुख्य रणनीतिक उद्देश्य (Strategic Objectives)
(इस परिदृश्य में पुलिस प्रशासन के तात्कालिक और दीर्घकालिक उद्देश्यों का निर्धारण करें - ३ सटीक बिंदु)

### 🚀 २. क्रियान्वयन योजना (Phase-wise Action Plan)
* **चरण क: तात्कालिक सुरक्षा हस्तक (Short-Term Action - अगले ७-१५ दिन):** (फोर्स डिप्लॉयमेंट, गश्त बढ़ाने, खुफिया जानकारी जुटाने सम्बन्धी तात्कालिक कदम)
* **चरण ख: मध्यम-अवधि संरचनात्मक रणनीति (Medium-Term Strategy - १५-४५ दिन):** (थाना स्तर पर तकनीकी सुधार, प्रशिक्षण, संसाधन सुदृढ़ीकरण)
* **चरण ग: दीर्घकालिक संस्थागत ढांचा (Long-Term Action - ४५-९० दिन):** (सतत तकनीकी समाधान, नीतिगत सुधार, जन-सहभागिता ढांचा)

### 💻 ३. AI, डिजिटल तकनीक एवं तकनीकी समाधान (Tech & AI Integration)
(इस परिदृश्य को सुलझाने के लिए AI, डेटा एनालिटिक्स, सीसीटीवी FRS, प्रिडिक्टिव पेट्रोलिंग, या विशिष्ट विभागीय सॉफ्टवेयर का कैसे स्मार्ट उपयोग होगा)

### ⚠️ ४. संभावित प्रशासनिक बाधाएं एवं उनका ठोस समाधान (Challenges & Mitigations)
(जमीनी स्तर पर क्या कठिनाइयाँ आ सकती हैं - जैसे जनशक्ति अभाव, जन-विरोध, बजट संकट - और उनके व्यावहारिक प्रशासकीय समाधान)

### 📊 ५. कार्य-सफलता मापदंड (Key Performance Indicators)
(४ स्पष्ट और मापने योग्य कारक जिससे इस योजना की सफलता को आंका जा सके - जैसे प्रतिक्रिया समय कम होना, शिकायतों का निवारण स्तर आदि)

नोट: प्रतिक्रिया सीधे कार्ययोजना शीर्षक से शुरू करें। कोई अनाधिकृत बातचीत या अतिरिक्त ग्रीटिंग्स न लिखें। केवल शुद्ध, प्रशासनिक, और व्यावहारिक रूप से मान्य सरकारी ड्राफ्ट होनी चाहिए।`;

      console.log(`[POLICE_AID] Querying Gemini model gemini-3.5-flash for Sector ${sectorId}...`);

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
      });

      const generatedText = response.text;
      res.json({ strategy: generatedText });
    } catch (error: any) {
      console.error("Gemini API Error:", error);
      res.status(500).json({ error: error.message || "रणनीति जनरेट करने में कोई अज्ञात तकनीकी त्रुटि हुई।" });
    }
  });

  // Vite integration
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running at http://0.0.0.0:${PORT}`);
  });
}

startServer();

import React, { useState } from "react";
import * as LucideIcons from "lucide-react";

export interface UserCredentials {
  name: string;
  email: string;
  phone: string;
}

interface LoginProps {
  onLogin: (user: UserCredentials) => void;
}

export function Login({ onLogin }: LoginProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !phone.trim()) {
      setError("कृपया सभी जानकारी भरें। (Please fill all fields)");
      return;
    }
    
    // Basic validation
    if (!email.includes("@")) {
      setError("कृपया सही ईमेल दर्ज करें। (Enter a valid email)");
      return;
    }

    if (phone.length < 10) {
      setError("कृपया सही मोबाइल नंबर दर्ज करें। (Enter a valid mobile number)");
      return;
    }

    setError("");
    onLogin({ name, email, phone });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-4 relative overflow-hidden">
      {/* Background glowing orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-600/20 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-emerald-600/20 blur-[100px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white shadow-xl shadow-indigo-200/50 mb-6">
            <LucideIcons.ShieldAlert className="w-10 h-10 text-indigo-600" />
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Smart Policing</h1>
          <p className="text-slate-500 font-medium mt-2">लॉगिन करें और प्रशासनिक डैशबोर्ड एक्सेस करें</p>
        </div>

        <div className="bg-white/60 backdrop-blur-xl border border-white p-8 rounded-3xl shadow-2xl shadow-indigo-100/50">
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="bg-red-50 text-red-600 text-sm font-bold p-3 rounded-xl border border-red-100 flex items-center gap-2">
                <LucideIcons.AlertCircle className="w-4 h-4" />
                {error}
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider ml-1">आपका नाम (Name)</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <LucideIcons.User className="h-4 w-4 text-slate-400" />
                </div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="अधिकारी का नाम दर्ज करें"
                  className="w-full pl-10 pr-4 py-3 bg-white/50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 outline-none transition-all text-sm font-medium placeholder:text-slate-400"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider ml-1">ईमेल (Email ID)</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <LucideIcons.Mail className="h-4 w-4 text-slate-400" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="अपना ईमेल आईडी दर्ज करें"
                  className="w-full pl-10 pr-4 py-3 bg-white/50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 outline-none transition-all text-sm font-medium placeholder:text-slate-400"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider ml-1">मोबाइल नंबर (Mobile No.)</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <LucideIcons.Phone className="h-4 w-4 text-slate-400" />
                </div>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="अपना मोबाइल नंबर दर्ज करें"
                  className="w-full pl-10 pr-4 py-3 bg-white/50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 outline-none transition-all text-sm font-medium placeholder:text-slate-400"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-indigo-600/30 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
            >
              लॉगिन करें (Enter Dashboard)
              <LucideIcons.ArrowRight className="w-4 h-4" />
            </button>
          </form>
          
          <div className="mt-6 text-center">
             <p className="text-[10px] text-slate-400 font-medium">
               आप जो ईमेल और मोबाइल नंबर डालेंगे, डैसबोर्ड की सभी संसूचनाएं (Notifications) उसी पर भेजी जाएंगी।
             </p>
          </div>
        </div>
      </div>
    </div>
  );
}

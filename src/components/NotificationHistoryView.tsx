import React, { useEffect, useState } from "react";
import * as LucideIcons from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

export interface NotificationRecord {
  id: string;
  taskTitle: string;
  owner: string;
  phone: string;
  email: string;
  timeline: string;
  timestamp: string;
  status: string;
}

export function NotificationHistoryView() {
  const [history, setHistory] = useState<NotificationRecord[]>([]);
  const { language, t } = useLanguage();

  useEffect(() => {
    // Load history from local storage
    const loadHistory = () => {
      try {
        const stored = localStorage.getItem("smart-policing-notifications");
        if (stored) {
          const parsed = JSON.parse(stored);
          // Sort by timestamp descending (newest first)
          parsed.sort((a: NotificationRecord, b: NotificationRecord) => {
            return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
          });
          setHistory(parsed);
        }
      } catch (error) {
        console.error("Failed to load notification history:", error);
      }
    };

    loadHistory();

    // Listen for storage changes if updated from other tabs/components
    window.addEventListener("storage", loadHistory);
    return () => window.removeEventListener("storage", loadHistory);
  }, []);

  const handleDownloadCSV = () => {
    if (history.length === 0) {
      alert(t('noDataAlert'));
      return;
    }

    // Prepare CSV headers
    const headers = ["ID", "Date & Time", "Task Title", "Assigned Owner", "Phone", "Email", "Deadline", "Status"];
    
    // Prepare CSV rows
    const rows = history.map(rec => [
      rec.id,
      new Date(rec.timestamp).toLocaleString("en-IN"),
      `"${rec.taskTitle.replace(/"/g, '""')}"`, // escape quotes in CSV
      `"${rec.owner.replace(/"/g, '""')}"`,
      rec.phone,
      rec.email,
      `"${rec.timeline.replace(/"/g, '""')}"`,
      rec.status
    ]);

    // Combine headers and rows
    const csvContent = [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    
    // Create Blob and trigger download
    const blob = new Blob(["\ufeff", csvContent], { type: "text/csv;charset=utf-8;" }); // \ufeff is BOM for Excel UTF-8
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `notification_history_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (history.length === 0) {
    return null; // Don't show the section if there's no history
  }

  return (
    <div className="mt-10 glass-panel p-6 sm:p-8 rounded-3xl relative overflow-hidden">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 relative z-10">
        <div>
          <h2 className="text-xl sm:text-2xl font-serif font-black italic bg-gradient-to-r from-indigo-900 to-purple-800 bg-clip-text text-transparent flex items-center gap-2 tracking-tight">
            <LucideIcons.History className="w-6 h-6 text-indigo-600" />
            {t('notificationHistoryTitle')} <span className="text-slate-500 font-sans not-italic text-sm font-medium ml-2">(Notification Logs)</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1 font-bold tracking-wide">{t('notificationHistorySubtitle')}</p>
        </div>
        
        <button
          onClick={handleDownloadCSV}
          className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-emerald-400 text-white px-5 py-2.5 rounded-xl text-sm font-extrabold shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/40 hover:-translate-y-0.5 transition-all"
        >
          <LucideIcons.Download className="w-4 h-4" />
          {t('downloadExcelBtn')} 📊
        </button>
      </div>

      <div className="overflow-x-auto relative z-10 rounded-2xl border border-white/60 bg-white/40 shadow-sm backdrop-blur-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-100/80 text-slate-600 text-[10px] uppercase tracking-wider font-black">
              <th className="p-4 border-b border-slate-200">Date & Time</th>
              <th className="p-4 border-b border-slate-200">Task Title</th>
              <th className="p-4 border-b border-slate-200">Assigned To</th>
              <th className="p-4 border-b border-slate-200">Contact</th>
              <th className="p-4 border-b border-slate-200">Status</th>
            </tr>
          </thead>
          <tbody className="text-xs sm:text-sm text-slate-700 font-medium">
            {history.map((record, idx) => (
              <tr key={record.id} className={`border-b border-slate-100 hover:bg-indigo-50/50 transition-colors ${idx % 2 === 0 ? 'bg-white/40' : 'bg-slate-50/40'}`}>
                <td className="p-4 whitespace-nowrap text-slate-500 font-mono text-xs">
                  {new Date(record.timestamp).toLocaleString("en-IN", { 
                    year: 'numeric', month: 'short', day: 'numeric', 
                    hour: '2-digit', minute: '2-digit'
                  })}
                </td>
                <td className="p-4 max-w-[200px] truncate" title={record.taskTitle}>
                  {record.taskTitle}
                </td>
                <td className="p-4 whitespace-nowrap">
                  {record.owner}
                </td>
                <td className="p-4 text-xs">
                  {record.phone && <div className="text-slate-600 font-mono flex items-center gap-1"><LucideIcons.Phone className="w-3 h-3 text-indigo-400"/>{record.phone}</div>}
                  {record.email && <div className="text-slate-600 flex items-center gap-1 mt-0.5"><LucideIcons.Mail className="w-3 h-3 text-indigo-400"/>{record.email}</div>}
                </td>
                <td className="p-4 whitespace-nowrap">
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                    record.status === "Success" 
                      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                      : "bg-red-50 text-red-700 border-red-200"
                  }`}>
                    {record.status === "Success" ? <LucideIcons.CheckCircle2 className="w-3 h-3"/> : <LucideIcons.XCircle className="w-3 h-3"/>}
                    {record.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

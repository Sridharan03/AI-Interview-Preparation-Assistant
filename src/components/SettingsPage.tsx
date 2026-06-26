import React, { useState, useEffect } from "react";
import { 
  Sliders, 
  Sparkles, 
  Cpu, 
  Volume2, 
  CheckCircle, 
  AlertCircle,
  Clock,
  Languages,
  Shield,
  BellRing,
  Bookmark
} from "lucide-react";

export default function SettingsPage() {
  const [model, setModel] = useState("models/gemini-2.5-flash");
  const [temperature, setTemperature] = useState(0.4);
  const [language, setLanguage] = useState("English (US)");
  const [voice, setVoice] = useState("Female Professional");
  const [autoSave, setAutoSave] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [showSavedToast, setShowSavedToast] = useState(false);

  // Load from local storage
  useEffect(() => {
    const savedModel = localStorage.getItem("settings_model");
    const savedTemp = localStorage.getItem("settings_temp");
    const savedLang = localStorage.getItem("settings_lang");
    const savedVoice = localStorage.getItem("settings_voice");
    if (savedModel) setModel(savedModel);
    if (savedTemp) setTemperature(parseFloat(savedTemp));
    if (savedLang) setLanguage(savedLang);
    if (savedVoice) setVoice(savedVoice);
  }, []);

  const handleSave = () => {
    localStorage.setItem("settings_model", model);
    localStorage.setItem("settings_temp", temperature.toString());
    localStorage.setItem("settings_lang", language);
    localStorage.setItem("settings_voice", voice);
    
    setShowSavedToast(true);
    setTimeout(() => {
      setShowSavedToast(false);
    }, 2500);
  };

  return (
    <div className="space-y-6 animate-fade-in text-slate-800 dark:text-slate-100" id="settings-page">
      
      {/* Banner */}
      <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-black p-6 md:p-8 rounded-3xl text-white relative overflow-hidden shadow-md border border-slate-800">
        <div className="max-w-2xl relative z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
            <Sliders className="w-3.5 h-3.5 animate-pulse" /> Developer Settings
          </span>
          <h2 className="text-2xl md:text-3xl font-black font-sans tracking-tight text-white">
            Platform Settings & Tuning
          </h2>
          <p className="text-slate-400 text-xs md:text-sm mt-1.5 leading-relaxed">
            Customize and optimize your secure server-side Gemini LLM evaluation settings. Adjust response parameters, temperature thresholds, and dictation accents instantly.
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        
        {/* Core Settings Form (Takes 7 columns) */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 md:p-8 rounded-2xl shadow-sm space-y-6">
          <h3 className="text-sm font-extrabold text-slate-800 dark:text-slate-100 uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
            <Cpu className="w-4.5 h-4.5 text-indigo-600" /> Model Configuration
          </h3>

          <div className="space-y-5 text-xs">
            
            {/* Gemini Model */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Gemini Model Core</label>
                <select
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:bg-white dark:focus:bg-slate-900 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl transition text-slate-800 dark:text-slate-200 cursor-pointer font-mono"
                >
                  <option value="models/gemini-2.5-flash">models/gemini-2.5-flash (Standard Low-Latency)</option>
                  <option value="models/gemini-2.5-pro">models/gemini-2.5-pro (Complex Architecture)</option>
                  <option value="models/gemini-1.5-flash">models/gemini-1.5-flash (Legacy)</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">LLM Generation Temperature</label>
                <div className="flex items-center gap-3 mt-1.5">
                  <input
                    type="range"
                    min="0.1"
                    max="1.0"
                    step="0.1"
                    value={temperature}
                    onChange={(e) => setTemperature(parseFloat(e.target.value))}
                    className="w-full accent-indigo-600 cursor-pointer"
                  />
                  <span className="font-mono font-bold text-slate-800 dark:text-slate-200 text-xs shrink-0">{temperature}</span>
                </div>
              </div>
            </div>

            {/* Language and Voice */}
            <h3 className="text-sm font-extrabold text-slate-800 dark:text-slate-100 uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3 pt-4">
              <Volume2 className="w-4.5 h-4.5 text-indigo-600" /> Dictation Accent settings
            </h3>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1">
                  <Languages className="w-3.5 h-3.5 text-indigo-500" /> Native Accent Language
                </label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:bg-white dark:focus:bg-slate-900 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl transition text-slate-800 dark:text-slate-200 cursor-pointer"
                >
                  <option value="English (US)">English (United States)</option>
                  <option value="English (UK)">English (United Kingdom)</option>
                  <option value="Spanish (ES)">Spanish (Spain)</option>
                  <option value="French (FR)">French (France)</option>
                  <option value="German (DE)">German (Germany)</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1">
                  <Volume2 className="w-3.5 h-3.5 text-indigo-500" /> Synthesis Accent Voice
                </label>
                <select
                  value={voice}
                  onChange={(e) => setVoice(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:bg-white dark:focus:bg-slate-900 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl transition text-slate-800 dark:text-slate-200 cursor-pointer"
                >
                  <option value="Female Professional">Female Executive Natural</option>
                  <option value="Male Technical">Male Technical Professional</option>
                  <option value="Robotic Guide">SaaS Robotic Assistant</option>
                </select>
              </div>
            </div>

            {/* Sync Toggles */}
            <h3 className="text-sm font-extrabold text-slate-800 dark:text-slate-100 uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3 pt-4">
              <Shield className="w-4.5 h-4.5 text-indigo-600" /> Platform Privacy rules
            </h3>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800">
                <div>
                  <h5 className="font-bold text-slate-800 dark:text-slate-200">Auto-save session logs</h5>
                  <p className="text-[10px] text-slate-400 mt-0.5">Persist analytical score trends inside Local Storage buffers securely.</p>
                </div>
                <input
                  type="checkbox"
                  checked={autoSave}
                  onChange={(e) => setAutoSave(e.target.checked)}
                  className="w-4 h-4 accent-indigo-600 cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800">
                <div>
                  <h5 className="font-bold text-slate-800 dark:text-slate-200">Receive notification audio alerts</h5>
                  <p className="text-[10px] text-slate-400 mt-0.5">Sound indicator pulses upon completing Gemini speech analysis steps.</p>
                </div>
                <input
                  type="checkbox"
                  checked={notifications}
                  onChange={(e) => setNotifications(e.target.checked)}
                  className="w-4 h-4 accent-indigo-600 cursor-pointer"
                />
              </div>
            </div>

            {showSavedToast && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-600 rounded-xl text-xs flex items-center gap-1.5 animate-fade-in shadow-xs">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                <span>Configuration changes successfully persistent inside browser cache!</span>
              </div>
            )}

            <button
              type="button"
              onClick={handleSave}
              className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs uppercase tracking-wider transition cursor-pointer text-center"
            >
              Apply Settings
            </button>
          </div>
        </div>

        {/* Right documentation sidebar (Takes 5 columns) */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 rounded-2xl shadow-sm space-y-4">
          <h4 className="text-xs font-black text-slate-800 dark:text-slate-100 uppercase tracking-widest flex items-center gap-1.5 border-b border-slate-100 dark:border-slate-800 pb-2">
            <Shield className="w-4 h-4 text-indigo-600" /> Secure Proxy Architecture
          </h4>

          <div className="text-xs text-slate-600 dark:text-slate-400 space-y-3.5 leading-relaxed">
            <div className="flex items-start gap-2.5">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <p><strong className="text-slate-800 dark:text-slate-200">Zero API exposure:</strong> Secret keys like `GEMINI_API_KEY` are safely loaded and mediated exclusively inside our Express backend endpoint. The browser never accesses secret credentials.</p>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <p><strong className="text-slate-800 dark:text-slate-200">Structured Schema constraints:</strong> By enforcing strict JSON formatting, parse failures are completely negated, providing smooth grading outputs.</p>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <p><strong className="text-slate-800 dark:text-slate-200">Privacy compliance:</strong> Audio waveforms are processed natively inside browser WebSpeech buffers. No transcripts are cached on third-party analytical pipelines.</p>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-[9px] text-slate-400 font-bold uppercase tracking-wider">
            <span>Secure compliance block</span>
            <span>Ref: SEC-CFG-99</span>
          </div>
        </div>

      </div>

    </div>
  );
}

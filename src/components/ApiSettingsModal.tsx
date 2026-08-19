import React, { useState } from 'react';
import { X, Sparkles, Key, AlertTriangle, ShieldCheck, Zap } from 'lucide-react';
import { ApiSettings } from '../services/aiService';

interface ApiSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: ApiSettings;
  onSaveSettings: (newSettings: ApiSettings) => void;
}

export const ApiSettingsModal: React.FC<ApiSettingsModalProps> = ({
  isOpen,
  onClose,
  settings,
  onSaveSettings,
}) => {
  const [provider, setProvider] = useState<'gemini' | 'openai' | 'simulation'>(settings.provider);
  const [apiKey, setApiKey] = useState<string>(settings.apiKey);
  const [model, setModel] = useState<string>(settings.model);

  if (!isOpen) return null;

  const handleSave = () => {
    onSaveSettings({ provider, apiKey: apiKey.trim(), model });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/50">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 bg-indigo-500/10 border border-indigo-500/20 rounded-xl text-indigo-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-100">AI Engine & Live API Configuration</h3>
              <p className="text-xs text-slate-400">Select AI Provider or switch to Live Gemini / OpenAI APIs</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-200 rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          {/* Provider Selection */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Select Execution Mode
            </label>
            <div className="grid grid-cols-3 gap-2.5">
              <button
                type="button"
                onClick={() => setProvider('simulation')}
                className={`p-3 rounded-xl border text-left transition flex flex-col justify-between ${
                  provider === 'simulation'
                    ? 'border-indigo-500 bg-indigo-500/10 text-indigo-300'
                    : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center space-x-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-semibold text-slate-200">Simulation</span>
                </div>
                <span className="text-[10px] text-slate-400 mt-2">Deterministic Legal Engine (No API key required)</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setProvider('gemini');
                  setModel('gemini-1.5-flash');
                }}
                className={`p-3 rounded-xl border text-left transition flex flex-col justify-between ${
                  provider === 'gemini'
                    ? 'border-indigo-500 bg-indigo-500/10 text-indigo-300'
                    : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center space-x-1.5">
                  <Zap className="w-4 h-4 text-amber-400" />
                  <span className="text-xs font-semibold text-slate-200">Google Gemini</span>
                </div>
                <span className="text-[10px] text-emerald-400 font-medium mt-2">Free Tier API</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setProvider('openai');
                  setModel('gpt-4o-mini');
                }}
                className={`p-3 rounded-xl border text-left transition flex flex-col justify-between ${
                  provider === 'openai'
                    ? 'border-indigo-500 bg-indigo-500/10 text-indigo-300'
                    : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center space-x-1.5">
                  <Sparkles className="w-4 h-4 text-sky-400" />
                  <span className="text-xs font-semibold text-slate-200">OpenAI</span>
                </div>
                <span className="text-[10px] text-slate-400 mt-2">GPT-4o / GPT-4o-mini</span>
              </button>
            </div>
          </div>

          {/* API Key Input */}
          {provider !== 'simulation' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  {provider === 'gemini' ? 'Google Gemini API Key' : 'OpenAI API Key'}
                </label>
                <div className="relative">
                  <Key className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="password"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder={provider === 'gemini' ? 'AIzaSy...' : 'sk-proj-...'}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2.5 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition"
                  />
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  {provider === 'gemini' ? (
                    <>Get a 100% free Gemini API key from <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noreferrer" className="text-indigo-400 underline">Google AI Studio</a>.</>
                  ) : (
                    <>Get your key from <a href="https://platform.openai.com/api-keys" target="_blank" rel="noreferrer" className="text-indigo-400 underline">OpenAI Platform</a>.</>
                  )}
                </p>
              </div>

              {/* Free Tier Warning Note */}
              <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-start space-x-2.5 text-amber-300">
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div className="text-[11px] leading-relaxed">
                  <span className="font-semibold text-amber-200">Free Tier Limit & Auto-Fallback:</span> If the free tier API quota (15 requests/min) is reached or network fails, iLumos will display a rate-limit warning banner and automatically fall back to the legal simulation engine so your workflow is never interrupted.
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-800 bg-slate-900/60 flex items-center justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold shadow-lg shadow-indigo-600/20 transition"
          >
            Save Configuration
          </button>
        </div>
      </div>
    </div>
  );
};

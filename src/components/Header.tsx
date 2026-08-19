import React from 'react';
import { Shield, RotateCcw, FileSpreadsheet, Settings, History, Sparkles, Download, Cpu } from 'lucide-react';
import { SystemPromptConfig } from '../types';
import { ApiSettings } from '../services/aiService';

interface HeaderProps {
  currentVersion: number;
  totalVersions: number;
  onUndo: () => void;
  onOpenHistory: () => void;
  onOpenPromptModal: () => void;
  onOpenExportModal: () => void;
  onOpenApiSettings: () => void;
  onResetSetup: () => void;
  systemPrompt: SystemPromptConfig;
  apiSettings: ApiSettings;
}

export const Header: React.FC<HeaderProps> = ({
  currentVersion,
  totalVersions,
  onUndo,
  onOpenHistory,
  onOpenPromptModal,
  onOpenExportModal,
  onOpenApiSettings,
  onResetSetup,
  apiSettings,
}) => {
  const getEngineLabel = () => {
    if (apiSettings.provider === 'gemini') return 'Gemini Live AI (Free)';
    if (apiSettings.provider === 'openai') return 'OpenAI Live';
    return 'Simulation AI';
  };

  return (
    <header className="app-header">
      <div className="brand-section">
        <div className="brand-logo">
          <Shield size={20} />
        </div>
        <div className="brand-title">
          iLumos
          <span className="brand-tag">PATENT AI</span>
        </div>
      </div>

      <div className="header-meta">
        <div className="patent-badge">
          <FileSpreadsheet size={15} style={{ color: '#3b82f6' }} />
          <span>Patent: <strong>US123456</strong></span>
          <span style={{ opacity: 0.4 }}>|</span>
          <span>Target: <strong>Acme Corp Thermostat</strong></span>
        </div>

        <button
          className="btn btn-secondary btn-sm"
          onClick={onOpenHistory}
          title="View full version timeline"
        >
          <History size={14} />
          <span>v{currentVersion}.0</span>
          <span style={{ fontSize: '11px', color: '#94a3b8', marginLeft: '2px' }}>
            ({totalVersions} saved)
          </span>
        </button>

        <button
          className="btn btn-secondary btn-sm"
          onClick={onOpenApiSettings}
          title="Configure Live Gemini / OpenAI APIs or Simulation Engine"
          style={{ borderColor: apiSettings.provider !== 'simulation' ? 'rgba(99, 102, 241, 0.4)' : undefined }}
        >
          <Cpu size={14} style={{ color: apiSettings.provider !== 'simulation' ? '#818cf8' : '#94a3b8' }} />
          <span>{getEngineLabel()}</span>
        </button>
      </div>

      <div className="header-actions">
        <button
          className="btn btn-secondary btn-sm"
          onClick={onUndo}
          disabled={currentVersion <= 1}
          style={{ opacity: currentVersion <= 1 ? 0.5 : 1 }}
          title="Undo last accepted refinement"
        >
          <RotateCcw size={14} />
          <span>Undo Refinement</span>
        </button>

        <button
          className="btn btn-secondary btn-sm"
          onClick={onOpenPromptModal}
          title="Configure System Prompt & Legal Rules"
        >
          <Settings size={14} />
          <span>System Prompt</span>
        </button>

        <button
          className="btn btn-primary btn-sm"
          onClick={onOpenExportModal}
        >
          <Download size={14} />
          <span>Export to Word</span>
        </button>

        <button
          className="btn btn-ghost btn-sm"
          onClick={onResetSetup}
          title="Re-open Initial Setup Screen"
        >
          <Sparkles size={14} />
          <span>Re-Upload</span>
        </button>
      </div>
    </header>
  );
};

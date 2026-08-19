import React, { useState } from 'react';
import { Shield, Upload, FileText, Settings, ArrowRight, CheckCircle2, Sparkles, FileSpreadsheet } from 'lucide-react';
import { SystemPromptConfig } from '../types';
import { DEFAULT_SYSTEM_PROMPT } from '../mockData';

interface InitialSetupProps {
  onComplete: (config: SystemPromptConfig) => void;
}

export const InitialSetup: React.FC<InitialSetupProps> = ({ onComplete }) => {
  const [claimChartUploaded, setClaimChartUploaded] = useState(true);
  const [docsUploaded, setDocsUploaded] = useState(true);
  const [systemPrompt, setSystemPrompt] = useState<SystemPromptConfig>(DEFAULT_SYSTEM_PROMPT);

  return (
    <div className="modal-overlay" style={{ background: '#090d16' }}>
      <div className="modal-content" style={{ maxWidth: '780px', borderRadius: '20px', border: '1px solid #334155' }}>
        <div className="modal-header" style={{ padding: '24px 30px', background: 'rgba(15, 23, 42, 0.9)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div className="brand-logo" style={{ width: '42px', height: '42px' }}>
              <Shield size={24} />
            </div>
            <div>
              <h2 className="modal-title" style={{ fontSize: '20px' }}>iLumos Patent Refinement Workspace</h2>
              <p style={{ fontSize: '13px', color: '#94a3b8', marginTop: '2px' }}>
                AI-Powered Claim Chart Analysis & Evidence Grounding Platform
              </p>
            </div>
          </div>
          <span className="brand-tag" style={{ fontSize: '11px', padding: '4px 8px' }}>Assessment Demo</span>
        </div>

        <div className="modal-body" style={{ padding: '28px 30px', gap: '24px' }}>
          {/* Step 1: Upload Claim Chart */}
          <div style={{ background: '#182234', border: '1px solid #334155', borderRadius: '14px', padding: '18px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#2563eb', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '13px' }}>1</div>
                <h3 style={{ fontSize: '14px', fontWeight: '700', color: '#f8fafc' }}>Upload Claim Chart</h3>
              </div>
              {claimChartUploaded && (
                <span style={{ fontSize: '12px', color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: '600' }}>
                  <CheckCircle2 size={15} /> Loaded
                </span>
              )}
            </div>

            <div 
              style={{
                border: '2px dashed #3b82f6',
                borderRadius: '10px',
                padding: '16px',
                background: 'rgba(59, 130, 246, 0.05)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <FileSpreadsheet size={28} style={{ color: '#3b82f6' }} />
                <div>
                  <div style={{ fontSize: '13px', fontWeight: '600', color: '#f8fafc' }}>US123456_Claim_Chart.xlsx</div>
                  <div style={{ fontSize: '11px', color: '#94a3b8' }}>Patent: US123456 vs Acme Corp Thermostat (3 Claim Elements)</div>
                </div>
              </div>
              <button className="btn btn-secondary btn-sm" onClick={() => setClaimChartUploaded(true)}>
                <Upload size={13} /> Replace File
              </button>
            </div>
          </div>

          {/* Step 2: Upload Product Docs */}
          <div style={{ background: '#182234', border: '1px solid #334155', borderRadius: '14px', padding: '18px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#2563eb', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '13px' }}>2</div>
                <h3 style={{ fontSize: '14px', fontWeight: '700', color: '#f8fafc' }}>Upload Supporting Product Documentation</h3>
              </div>
              {docsUploaded && (
                <span style={{ fontSize: '12px', color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: '600' }}>
                  <CheckCircle2 size={15} /> 2 Files Indexed
                </span>
              )}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', background: '#0f172a', border: '1px solid #334155', borderRadius: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <FileText size={18} style={{ color: '#06b6d4' }} />
                  <span style={{ fontSize: '12px', color: '#f8fafc' }}>Acme_Thermostat_v3_TechSpecs.pdf (2.4 MB)</span>
                </div>
                <span style={{ fontSize: '11px', color: '#10b981', background: 'rgba(16,185,129,0.1)', padding: '2px 8px', borderRadius: '4px' }}>Indexed</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', background: '#0f172a', border: '1px solid #334155', borderRadius: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <FileText size={18} style={{ color: '#8b5cf6' }} />
                  <span style={{ fontSize: '12px', color: '#f8fafc' }}>Acme_AutoSchedule_Whitepaper.pdf (1.1 MB)</span>
                </div>
                <span style={{ fontSize: '11px', color: '#10b981', background: 'rgba(16,185,129,0.1)', padding: '2px 8px', borderRadius: '4px' }}>Indexed</span>
              </div>
            </div>
          </div>

          {/* Step 3: Configure System Prompt Instructions */}
          <div style={{ background: '#182234', border: '1px solid #334155', borderRadius: '14px', padding: '18px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#2563eb', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '13px' }}>3</div>
              <h3 style={{ fontSize: '14px', fontWeight: '700', color: '#f8fafc' }}>System Prompt & Grounding Rules</h3>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div className="form-group">
                <label className="form-label">Evidence Grounding Strictness</label>
                <select
                  className="form-select"
                  value={systemPrompt.evidenceRequirement}
                  onChange={(e) => setSystemPrompt({ ...systemPrompt, evidenceRequirement: e.target.value as any })}
                >
                  <option value="strict_quotes">Strict: Require Exact Document Quotes</option>
                  <option value="allow_technical_inference">Balanced: Allow Technical Inferences</option>
                  <option value="broad_mapping">Broad: General Feature Mapping</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Claim Construction Standard</label>
                <select
                  className="form-select"
                  value={systemPrompt.claimConstructionStandard}
                  onChange={(e) => setSystemPrompt({ ...systemPrompt, claimConstructionStandard: e.target.value as any })}
                >
                  <option value="phillips">Phillips Standard (Ordinary Meaning)</option>
                  <option value="bri">Broadest Reasonable Interpretation (BRI)</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="modal-footer" style={{ padding: '20px 30px', background: 'rgba(15, 23, 42, 0.95)' }}>
          <div style={{ flex: 1, fontSize: '12px', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Sparkles size={14} style={{ color: '#3b82f6' }} />
            Ready to load Acme Thermostat demo analysis dataset
          </div>
          <button
            className="btn btn-primary"
            style={{ padding: '10px 24px', fontSize: '14px', boxShadow: '0 0 15px rgba(59, 130, 246, 0.4)' }}
            onClick={() => onComplete(systemPrompt)}
          >
            <span>Open iLumos Workspace</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

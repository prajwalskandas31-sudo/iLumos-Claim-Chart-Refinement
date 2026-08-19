import React, { useState } from 'react';
import { X, Settings, ShieldCheck, Check } from 'lucide-react';
import { SystemPromptConfig } from '../types';

interface SystemPromptModalProps {
  config: SystemPromptConfig;
  isOpen: boolean;
  onClose: () => void;
  onSave: (newConfig: SystemPromptConfig) => void;
}

export const SystemPromptModal: React.FC<SystemPromptModalProps> = ({
  config,
  isOpen,
  onClose,
  onSave
}) => {
  const [formData, setFormData] = useState<SystemPromptConfig>(config);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Settings size={18} style={{ color: '#3b82f6' }} />
            <h3 className="modal-title">Configure System Prompt & Grounding Rules</h3>
          </div>
          <button className="btn btn-ghost btn-sm" onClick={onClose}><X size={16} /></button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group">
              <label className="form-label">AI Persona / Role Definition</label>
              <input
                type="text"
                className="form-input"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div className="form-group">
                <label className="form-label">Evidence Grounding Strictness</label>
                <select
                  className="form-select"
                  value={formData.evidenceRequirement}
                  onChange={(e) => setFormData({ ...formData, evidenceRequirement: e.target.value as any })}
                >
                  <option value="strict_quotes">Strict Quotes (Zero Hallucination)</option>
                  <option value="allow_technical_inference">Allow Technical Inferences</option>
                  <option value="broad_mapping">Broad Feature Mapping</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Legal Claim Construction</label>
                <select
                  className="form-select"
                  value={formData.claimConstructionStandard}
                  onChange={(e) => setFormData({ ...formData, claimConstructionStandard: e.target.value as any })}
                >
                  <option value="phillips">Phillips Standard (Ordinary Meaning)</option>
                  <option value="bri">Broadest Reasonable Interpretation (BRI)</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Custom Analyst Instructions</label>
              <textarea
                className="form-textarea"
                rows={4}
                value={formData.customInstructions}
                onChange={(e) => setFormData({ ...formData, customInstructions: e.target.value })}
                placeholder="Add specific legal or engineering rules..."
              />
            </div>

            <div style={{ background: 'rgba(59, 130, 246, 0.08)', border: '1px solid rgba(59, 130, 246, 0.3)', padding: '12px', borderRadius: '8px', fontSize: '12px', color: '#94a3b8' }}>
              <ShieldCheck size={16} style={{ color: '#3b82f6', marginBottom: '4px' }} />
              These rules dynamically govern how iLumos evaluates evidence strength and labels AI inferences in refinement suggestions.
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary btn-sm" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary btn-sm"><Check size={14} /> Save System Prompt</button>
          </div>
        </form>
      </div>
    </div>
  );
};

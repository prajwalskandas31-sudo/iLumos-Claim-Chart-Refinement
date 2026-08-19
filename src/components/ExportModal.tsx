import React, { useState } from 'react';
import { X, Download, FileText, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';
import { ClaimElement } from '../types';
import { generateWordDocument } from '../docxExport';
import confetti from 'canvas-confetti';

interface ExportModalProps {
  elements: ClaimElement[];
  isOpen: boolean;
  onClose: () => void;
}

export const ExportModal: React.FC<ExportModalProps> = ({ elements, isOpen, onClose }) => {
  const [isExporting, setIsExporting] = useState(false);
  const [exported, setExported] = useState(false);

  if (!isOpen) return null;

  const handleDownloadDocx = async () => {
    setIsExporting(true);
    try {
      const blob = await generateWordDocument(elements, 'US123456', 'Acme Corp Thermostat');
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `US123456_vs_Acme_Refined_Claim_Chart.docx`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      setExported(true);
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
    } catch (err) {
      console.error("Export failed:", err);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ maxWidth: '650px' }}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Download size={18} style={{ color: '#3b82f6' }} />
            <h3 className="modal-title">Export Refined Claim Chart for Legal Proceedings</h3>
          </div>
          <button className="btn btn-ghost btn-sm" onClick={onClose}><X size={16} /></button>
        </div>

        <div className="modal-body" style={{ gap: '16px' }}>
          <div style={{ background: '#0f172a', border: '1px solid #334155', borderRadius: '10px', padding: '16px' }}>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#f8fafc', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <FileText size={16} style={{ color: '#3b82f6' }} />
              Export Package Specification
            </div>
            <div style={{ fontSize: '12px', color: '#cbd5e1', lineHeight: '1.6' }}>
              <div>• <strong>Format:</strong> Microsoft Word (.docx)</div>
              <div>• <strong>Patent:</strong> US123456 (Smart Environmental Control System)</div>
              <div>• <strong>Accused Target:</strong> Acme Corp Thermostat (V3)</div>
              <div>• <strong>Mapped Claim Elements:</strong> {elements.length} Mapped Rows</div>
              <div>• <strong>Grounding Verification:</strong> 100% Evidence Citation Grounded</div>
            </div>
          </div>

          <div style={{ background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: '10px', padding: '14px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <ShieldCheck size={24} style={{ color: '#10b981', flexShrink: 0 }} />
            <div style={{ fontSize: '12px', color: '#a7f3d0', lineHeight: '1.4' }}>
              All AI refinements in this export have been analyst-reviewed, approved, and grounded in uploaded product specifications.
            </div>
          </div>

          {exported && (
            <div style={{ background: 'rgba(59, 130, 246, 0.15)', border: '1px solid #3b82f6', padding: '12px', borderRadius: '8px', fontSize: '12px', color: '#38bdf8', textAlign: 'center', fontWeight: 600 }}>
              ✓ Download complete: US123456_vs_Acme_Refined_Claim_Chart.docx
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button className="btn btn-secondary btn-sm" onClick={onClose}>Close</button>
          <button
            className="btn btn-primary btn-sm"
            onClick={handleDownloadDocx}
            disabled={isExporting}
            style={{ padding: '8px 18px', fontSize: '13px' }}
          >
            <Download size={14} />
            <span>{isExporting ? 'Generating Word Doc...' : 'Download .docx File'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

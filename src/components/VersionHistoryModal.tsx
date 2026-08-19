import React from 'react';
import { X, History, RotateCcw, Check, Sparkles, FileText } from 'lucide-react';
import { ClaimChartVersion } from '../types';

interface VersionHistoryModalProps {
  history: ClaimChartVersion[];
  currentVersion: number;
  isOpen: boolean;
  onClose: () => void;
  onRestoreVersion: (versionId: number) => void;
}

export const VersionHistoryModal: React.FC<VersionHistoryModalProps> = ({
  history,
  currentVersion,
  isOpen,
  onClose,
  onRestoreVersion
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ maxWidth: '680px' }}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <History size={18} style={{ color: '#3b82f6' }} />
            <h3 className="modal-title">Claim Chart Version History & Timeline</h3>
          </div>
          <button className="btn btn-ghost btn-sm" onClick={onClose}><X size={16} /></button>
        </div>

        <div className="modal-body" style={{ gap: '12px' }}>
          <div style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '8px' }}>
            Every accepted AI refinement creates a reversible snapshot. Click restore to revert the chart to any prior version.
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {history.map((ver) => {
              const isCurrent = ver.versionId === currentVersion;
              return (
                <div
                  key={ver.versionId}
                  style={{
                    background: isCurrent ? 'rgba(59, 130, 246, 0.12)' : '#0f172a',
                    border: `1px solid ${isCurrent ? '#3b82f6' : '#334155'}`,
                    borderRadius: '10px',
                    padding: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: isCurrent ? '#2563eb' : '#1e293b',
                      color: isCurrent ? 'white' : '#94a3b8',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 'bold',
                      fontSize: '12px',
                      flexShrink: 0
                    }}>
                      v{ver.versionId}
                    </div>

                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 600, color: '#f8fafc', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        {ver.description}
                        {isCurrent && (
                          <span style={{ fontSize: '10px', background: '#10b981', color: 'white', padding: '2px 6px', borderRadius: '4px', textTransform: 'uppercase' }}>
                            ACTIVE VERSION
                          </span>
                        )}
                      </div>
                      <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>
                        Created: {ver.timestamp} • {ver.elements.length} Claim Elements
                      </div>
                    </div>
                  </div>

                  {!isCurrent && (
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => {
                        onRestoreVersion(ver.versionId);
                        onClose();
                      }}
                    >
                      <RotateCcw size={13} /> Revert to v{ver.versionId}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn btn-secondary btn-sm" onClick={onClose}>Close Timeline</button>
        </div>
      </div>
    </div>
  );
};

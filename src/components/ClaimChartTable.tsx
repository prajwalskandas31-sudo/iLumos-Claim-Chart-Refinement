import React from 'react';
import { ClaimElement } from '../types';
import { CheckCircle2, AlertTriangle, Sparkles, MessageSquare } from 'lucide-react';

interface ClaimChartTableProps {
  elements: ClaimElement[];
  selectedElementId: string | null;
  onSelectElement: (id: string) => void;
  modifiedElementIds: string[];
}

export const ClaimChartTable: React.FC<ClaimChartTableProps> = ({
  elements,
  selectedElementId,
  onSelectElement,
  modifiedElementIds,
}) => {
  return (
    <div className="center-pane">
      {/* Chart Toolbar */}
      <div className="chart-toolbar">
        <div className="chart-title-area">
          <span className="chart-title">Infringement Claim Chart</span>
          <span style={{ fontSize: '12px', color: '#94a3b8', background: '#1e293b', padding: '2px 8px', borderRadius: '4px', border: '1px solid #334155' }}>
            3 Elements Mapped
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '12px', color: '#94a3b8' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }}></span> Grounded
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#f59e0b' }}></span> Weak Evidence
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#3b82f6' }}></span> Refined
          </span>
        </div>
      </div>

      {/* Main Table */}
      <div className="chart-container">
        <table className="claim-table">
          <thead>
            <tr>
              <th style={{ width: '28%' }}>1. Patent Claim Element</th>
              <th style={{ width: '28%' }}>2. Accused Product Feature</th>
              <th style={{ width: '44%' }}>3. AI Reasoning / Evidence</th>
            </tr>
          </thead>
          <tbody>
            {elements.map((element) => {
              const isSelected = selectedElementId === element.id;
              const isModified = modifiedElementIds.includes(element.id);

              return (
                <tr
                  key={element.id}
                  className={`${isModified ? 'row-modified' : ''}`}
                  style={{
                    backgroundColor: isSelected ? 'rgba(59, 130, 246, 0.12)' : undefined,
                    outline: isSelected ? '1px solid #3b82f6' : 'none',
                    cursor: 'pointer'
                  }}
                  onClick={() => onSelectElement(element.id)}
                >
                  {/* Column 1: Patent Claim Element */}
                  <td>
                    <div className="claim-num">{element.claimNumber}</div>
                    <div style={{ fontWeight: 600, color: '#f8fafc', marginBottom: '4px' }}>
                      {element.elementText}
                    </div>
                  </td>

                  {/* Column 2: Accused Product Feature */}
                  <td>
                    <div style={{ color: '#cbd5e1' }}>{element.accusedFeature}</div>
                  </td>

                  {/* Column 3: AI Reasoning / Evidence */}
                  <td>
                    <div style={{ color: '#f8fafc', whiteSpace: 'pre-line' }}>
                      {element.evidence}
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '12px' }}>
                      <div className={`status-badge ${element.status}`}>
                        {element.status === 'verified' && <CheckCircle2 size={12} />}
                        {element.status === 'weak_evidence' && <AlertTriangle size={12} />}
                        {element.status === 'modified' && <Sparkles size={12} />}
                        <span>
                          {element.status === 'verified' && 'Verified Grounding'}
                          {element.status === 'weak_evidence' && 'Weak Technical Evidence'}
                          {element.status === 'modified' && 'Analyst Refined'}
                        </span>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '11px', color: '#64748b' }}>
                          Confidence: {(element.confidenceScore * 100).toFixed(0)}%
                        </span>
                        <button
                          className="btn btn-ghost btn-sm"
                          style={{ padding: '2px 6px', fontSize: '11px', color: '#3b82f6' }}
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectElement(element.id);
                          }}
                        >
                          <MessageSquare size={12} /> Refine
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

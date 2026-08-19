import React, { useState } from 'react';
import { Files, Plus, Link, FileText, CheckCircle2, ShieldCheck, Search, Info } from 'lucide-react';
import { DocumentFile, SystemPromptConfig } from '../types';

interface DocumentContextPanelProps {
  documents: DocumentFile[];
  onAddDocument: (doc: DocumentFile) => void;
  systemPrompt: SystemPromptConfig;
  onOpenPromptModal: () => void;
}

export const DocumentContextPanel: React.FC<DocumentContextPanelProps> = ({
  documents,
  onAddDocument,
  systemPrompt,
  onOpenPromptModal
}) => {
  const [showAddUrlInput, setShowAddUrlInput] = useState(false);
  const [urlInput, setUrlInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleAddUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlInput.trim()) return;

    const newDoc: DocumentFile = {
      id: `doc-${Date.now()}`,
      name: urlInput.replace(/^https?:\/\//, ''),
      type: 'url',
      size: 'Web Scraping',
      uploadDate: 'Just now',
      status: 'indexed',
      excerpt: `Scraped content from ${urlInput}: Technical specifications & component disclosure indexed for grounding.`
    };

    onAddDocument(newDoc);
    setUrlInput('');
    setShowAddUrlInput(false);
  };

  const filteredDocs = documents.filter(d => 
    d.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    (d.excerpt && d.excerpt.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="left-pane">
      <div className="pane-header">
        <div className="pane-title">
          <Files size={16} style={{ color: '#3b82f6' }} />
          <span>Evidence Sources</span>
        </div>
        <span style={{ fontSize: '11px', color: '#94a3b8', background: '#0f172a', padding: '2px 8px', borderRadius: '10px' }}>
          {documents.length} Files
        </span>
      </div>

      <div className="pane-content">
        {/* Search Bar */}
        <div style={{ position: 'relative' }}>
          <Search size={14} style={{ position: 'absolute', left: '10px', top: '10px', color: '#64748b' }} />
          <input
            type="text"
            className="form-input"
            placeholder="Search context excerpts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ width: '100%', paddingLeft: '32px', fontSize: '12px' }}
          />
        </div>

        {/* Add Source Quick Buttons */}
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            className="btn btn-secondary btn-sm"
            style={{ flex: 1, fontSize: '11px' }}
            onClick={() => {
              const fileDoc: DocumentFile = {
                id: `doc-${Date.now()}`,
                name: `Acme_Circuit_Schematics_v2.pdf`,
                type: 'product_doc',
                size: '4.8 MB',
                uploadDate: 'Just now',
                status: 'indexed',
                excerpt: 'Section 5.4: PCB Layout & Circuit schematics confirming dual-band WiFi antenna controller and IR motion sensor pins.'
              };
              onAddDocument(fileDoc);
            }}
          >
            <Plus size={13} /> Upload Doc
          </button>

          <button
            className="btn btn-secondary btn-sm"
            style={{ flex: 1, fontSize: '11px' }}
            onClick={() => setShowAddUrlInput(!showAddUrlInput)}
          >
            <Link size={13} /> Add URL
          </button>
        </div>

        {showAddUrlInput && (
          <form onSubmit={handleAddUrl} style={{ background: '#0f172a', padding: '10px', borderRadius: '8px', border: '1px solid #334155' }}>
            <div style={{ fontSize: '11px', color: '#94a3b8', marginBottom: '6px' }}>Provide Technical Product URL:</div>
            <div style={{ display: 'flex', gap: '6px' }}>
              <input
                type="url"
                className="form-input"
                placeholder="https://acme.com/tech-specs"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                style={{ flex: 1, fontSize: '12px', padding: '4px 8px' }}
                required
              />
              <button type="submit" className="btn btn-primary btn-sm">Add</button>
            </div>
          </form>
        )}

        {/* Document List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {filteredDocs.map((doc) => (
            <div key={doc.id} className="doc-card">
              <div className="doc-header">
                <FileText className="doc-icon" size={18} />
                <div className="doc-info">
                  <div className="doc-name" title={doc.name}>{doc.name}</div>
                  <div className="doc-meta">
                    {doc.size} • {doc.uploadDate}
                  </div>
                </div>
                <CheckCircle2 size={14} style={{ color: '#10b981', flexShrink: 0 }} />
              </div>
              {doc.excerpt && (
                <div className="doc-excerpt">
                  "{doc.excerpt}"
                </div>
              )}
            </div>
          ))}
        </div>

        {/* System Rules Summary Box */}
        <div style={{ marginTop: 'auto', background: 'rgba(15, 23, 42, 0.7)', border: '1px solid #334155', borderRadius: '10px', padding: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <div style={{ fontSize: '11px', fontWeight: '700', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <ShieldCheck size={14} style={{ color: '#3b82f6' }} />
              AI GROUNDING RULES
            </div>
            <button
              onClick={onOpenPromptModal}
              style={{ background: 'none', border: 'none', color: '#3b82f6', fontSize: '11px', cursor: 'pointer' }}
            >
              Edit
            </button>
          </div>
          <div style={{ fontSize: '11px', color: '#cbd5e1', lineHeight: '1.4' }}>
            <div>Strictness: <strong style={{ color: '#38bdf8' }}>{systemPrompt.evidenceRequirement.replace('_', ' ')}</strong></div>
            <div>Standard: <strong style={{ color: '#38bdf8' }}>{systemPrompt.claimConstructionStandard.toUpperCase()}</strong></div>
          </div>
        </div>
      </div>
    </div>
  );
};

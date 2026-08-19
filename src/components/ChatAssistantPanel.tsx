import React, { useState } from 'react';
import { Bot, Send, Sparkles, Check, X, ShieldAlert, FileText, ArrowRight, RotateCcw, Link } from 'lucide-react';
import { ChatMessage, RefinementSuggestion } from '../types';
import { DEMO_PRESETS } from '../mockData';

interface ChatAssistantPanelProps {
  messages: ChatMessage[];
  onSendMessage: (text: string) => void;
  onAcceptSuggestion: (messageId: string, suggestion: RefinementSuggestion) => void;
  onRejectSuggestion: (messageId: string) => void;
  onUploadSourceClick: () => void;
}

export const ChatAssistantPanel: React.FC<ChatAssistantPanelProps> = ({
  messages,
  onSendMessage,
  onAcceptSuggestion,
  onRejectSuggestion,
  onUploadSourceClick
}) => {
  const [inputText, setInputText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    onSendMessage(inputText);
    setInputText('');
  };

  const handleChipClick = (prompt: string) => {
    onSendMessage(prompt);
  };

  return (
    <div className="right-pane">
      {/* Header */}
      <div className="chat-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Bot size={18} style={{ color: '#3b82f6' }} />
          <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '14px', color: '#f8fafc' }}>
            Refinement Assistant
          </span>
        </div>
        <span style={{ fontSize: '11px', color: '#10b981', background: 'rgba(16,185,129,0.1)', padding: '2px 8px', borderRadius: '10px' }}>
          Grounded Engine
        </span>
      </div>

      {/* Messages Feed */}
      <div className="chat-messages">
        {messages.map((msg) => (
          <div key={msg.id} className={`message-bubble ${msg.sender}`}>
            <div className="msg-header">
              <span>{msg.sender === 'user' ? 'Analyst' : msg.sender === 'ai' ? 'iLumos AI' : 'System'}</span>
              <span>•</span>
              <span>{msg.timestamp}</span>
            </div>

            <div className="msg-content">
              <div>{msg.text}</div>

              {/* Refinement Suggestion Card */}
              {msg.suggestion && (
                <div className="suggestion-card">
                  <div className="suggestion-header">
                    <span style={{ fontWeight: 700, fontSize: '12px', color: '#38bdf8' }}>
                      Refinement: {msg.suggestion.elementTitle}
                    </span>
                    <span className={`grounding-tag ${
                      msg.suggestion.groundingType === 'Direct Evidence' ? 'direct' :
                      msg.suggestion.groundingType === 'Technical Inference' ? 'inference' : 'insufficient'
                    }`}>
                      {msg.suggestion.groundingType}
                    </span>
                  </div>

                  <div style={{ fontSize: '12px', color: '#cbd5e1', lineHeight: '1.4' }}>
                    <strong>Reasoning:</strong> {msg.suggestion.reasoning}
                  </div>

                  {/* Diff Box */}
                  <div className="diff-box">
                    <div className="diff-title">ORIGINAL EVIDENCE:</div>
                    <div className="diff-removed">{msg.suggestion.originalText}</div>
                    <div className="diff-title" style={{ marginTop: '8px' }}>PROPOSED REFINEMENT:</div>
                    <div className="diff-added">{msg.suggestion.proposedText}</div>
                  </div>

                  {/* Sources */}
                  {msg.suggestion.sources && msg.suggestion.sources.length > 0 && (
                    <div style={{ fontSize: '11px', color: '#64748b', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <FileText size={12} />
                      Sources: {msg.suggestion.sources.join(', ')}
                    </div>
                  )}

                  {/* Action Buttons */}
                  {msg.suggestion.status === 'pending' ? (
                    <div className="action-bar">
                      <button
                        className="btn btn-success btn-sm"
                        style={{ flex: 1 }}
                        onClick={() => onAcceptSuggestion(msg.id, msg.suggestion!)}
                      >
                        <Check size={14} /> Apply to Chart
                      </button>
                      <button
                        className="btn btn-secondary btn-sm"
                        style={{ flex: 1 }}
                        onClick={() => onRejectSuggestion(msg.id)}
                      >
                        <X size={14} /> Reject
                      </button>
                    </div>
                  ) : (
                    <div style={{
                      fontSize: '11px',
                      fontWeight: 600,
                      color: msg.suggestion.status === 'accepted' ? '#10b981' : '#ef4444',
                      background: msg.suggestion.status === 'accepted' ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)',
                      padding: '6px 10px',
                      borderRadius: '6px',
                      textAlign: 'center'
                    }}>
                      {msg.suggestion.status === 'accepted' ? '✓ APPLIED TO CLAIM CHART' : '✕ REJECTED BY ANALYST'}
                    </div>
                  )}
                </div>
              )}

              {/* Missing Evidence / Source Upload Callout (Edge Case 3) */}
              {msg.requiresSourceUpload && (
                <div style={{
                  marginTop: '10px',
                  background: 'rgba(239, 68, 68, 0.1)',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  borderRadius: '10px',
                  padding: '12px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px'
                }}>
                  <div style={{ fontSize: '12px', fontWeight: 600, color: '#fca5a5', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <ShieldAlert size={15} /> Grounding Notice: Missing Technical Specs
                  </div>
                  <div style={{ fontSize: '11px', color: '#cbd5e1' }}>
                    iLumos strictly avoids hallucinating internal engineering details. Please upload additional documentation or provide a product web link.
                  </div>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={onUploadSourceClick}
                    style={{ marginTop: '4px', background: '#dc2626' }}
                  >
                    <Link size={13} /> Provide Technical Source / URL
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Preset Action Chips for Fast Assessment Demo */}
      <div className="presets-section">
        <div className="presets-title">
          <Sparkles size={12} style={{ color: '#3b82f6' }} /> Quick Refinement Prompts (Assessment Flow)
        </div>
        <div className="chips-wrapper">
          {DEMO_PRESETS.map((preset) => (
            <button
              key={preset.id}
              className="preset-chip"
              onClick={() => handleChipClick(preset.prompt)}
              title={preset.category}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Input Bar */}
      <div className="chat-input-container">
        <form className="chat-form" onSubmit={handleSubmit}>
          <input
            type="text"
            className="chat-input"
            placeholder="Type refinement request (e.g. 'Strengthen ML evidence')..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <button type="submit" className="btn btn-primary btn-sm" style={{ borderRadius: '8px' }}>
            <Send size={14} />
          </button>
        </form>
      </div>
    </div>
  );
};

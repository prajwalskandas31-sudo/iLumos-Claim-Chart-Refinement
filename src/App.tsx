import React, { useState } from 'react';
import { ClaimElement, ClaimChartVersion, ChatMessage, DocumentFile, SystemPromptConfig, RefinementSuggestion } from './types';
import { INITIAL_CLAIM_ELEMENTS, MOCK_DOCUMENTS, DEFAULT_SYSTEM_PROMPT } from './mockData';
import { Header } from './components/Header';
import { InitialSetup } from './components/InitialSetup';
import { DocumentContextPanel } from './components/DocumentContextPanel';
import { ClaimChartTable } from './components/ClaimChartTable';
import { ChatAssistantPanel } from './components/ChatAssistantPanel';
import { SystemPromptModal } from './components/SystemPromptModal';
import { VersionHistoryModal } from './components/VersionHistoryModal';
import { ExportModal } from './components/ExportModal';
import { ApiSettingsModal } from './components/ApiSettingsModal';
import { ApiSettings, DEFAULT_API_SETTINGS, generateAiRefinement } from './services/aiService';

export const App: React.FC = () => {
  // App State
  const [elements, setElements] = useState<ClaimElement[]>(INITIAL_CLAIM_ELEMENTS);
  const [documents, setDocuments] = useState<DocumentFile[]>(MOCK_DOCUMENTS);
  const [systemPrompt, setSystemPrompt] = useState<SystemPromptConfig>(DEFAULT_SYSTEM_PROMPT);
  const [apiSettings, setApiSettings] = useState<ApiSettings>(DEFAULT_API_SETTINGS);

  // Modals & Panels State
  const [isInitialSetupOpen, setIsInitialSetupOpen] = useState<boolean>(true);
  const [isPromptModalOpen, setIsPromptModalOpen] = useState<boolean>(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState<boolean>(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState<boolean>(false);
  const [isApiSettingsOpen, setIsApiSettingsOpen] = useState<boolean>(false);

  // Selection & Highlight State
  const [selectedElementId, setSelectedElementId] = useState<string | null>(null);
  const [modifiedElementIds, setModifiedElementIds] = useState<string[]>([]);

  // Version Timeline Stack
  const [versionHistory, setVersionHistory] = useState<ClaimChartVersion[]>([
    {
      versionId: 1,
      timestamp: '07:46 AM',
      description: 'Initial Claim Chart Ingestion',
      elements: INITIAL_CLAIM_ELEMENTS
    }
  ]);
  const [currentVersionId, setCurrentVersionId] = useState<number>(1);

  // Chat History
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'ai',
      text: 'Welcome Analyst. Claim Chart for Patent US123456 vs Acme Corp Thermostat loaded. 3 claim elements parsed. Element 1[c] (Machine Learning Algorithm) currently has weak public evidence. How would you like to refine the chart?',
      timestamp: '07:46 AM'
    }
  ]);

  // Handle Initial Setup Complete
  const handleSetupComplete = (config: SystemPromptConfig) => {
    setSystemPrompt(config);
    setIsInitialSetupOpen(false);
  };

  // Helper: Save New Claim Chart Version
  const saveNewVersion = (newElements: ClaimElement[], changeDescription: string) => {
    const nextVerId = currentVersionId + 1;
    const newVer: ClaimChartVersion = {
      versionId: nextVerId,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      description: changeDescription,
      elements: newElements
    };
    setVersionHistory(prev => [...prev, newVer]);
    setCurrentVersionId(nextVerId);
    setElements(newElements);
  };

  // Handle Undo / Version Revert
  const handleUndo = () => {
    if (currentVersionId <= 1) return;
    const previousVerId = currentVersionId - 1;
    const prevVer = versionHistory.find(v => v.versionId === previousVerId);
    if (prevVer) {
      setElements(prevVer.elements);
      setCurrentVersionId(previousVerId);
      setModifiedElementIds([]);

      // Add AI Undo Message
      const undoMsg: ChatMessage = {
        id: `msg-${Date.now()}`,
        sender: 'ai',
        text: `✓ Reverted previous refinement. Claim Chart restored to v${previousVerId}.0 (${prevVer.description}).`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, undoMsg]);
    }
  };

  // Handle Restore Specific Version from Modal Timeline
  const handleRestoreVersion = (versionId: number) => {
    const targetVer = versionHistory.find(v => v.versionId === versionId);
    if (targetVer) {
      setElements(targetVer.elements);
      setCurrentVersionId(versionId);
      setModifiedElementIds([]);

      const restoreMsg: ChatMessage = {
        id: `msg-${Date.now()}`,
        sender: 'ai',
        text: `Restored Claim Chart to v${versionId}.0 (${targetVer.description}).`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, restoreMsg]);
    }
  };

  // Handle Add Document or URL
  const handleAddDocument = (doc: DocumentFile) => {
    setDocuments(prev => [doc, ...prev]);
    const sysMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'ai',
      text: `Added new evidence source: ${doc.name}. Context updated and indexed for refinement grounding.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, sysMsg]);
  };

  // Accept Refinement Suggestion
  const handleAcceptSuggestion = (messageId: string, suggestion: RefinementSuggestion) => {
    const updatedElements = elements.map(elem => {
      if (elem.id === suggestion.targetElementId) {
        return {
          ...elem,
          evidence: suggestion.proposedText,
          accusedFeature: suggestion.featureText || elem.accusedFeature,
          status: 'modified' as const,
          confidenceScore: suggestion.confidenceScore,
          lastUpdated: `Refined via AI Suggestion (v${currentVersionId + 1})`
        };
      }
      return elem;
    });

    saveNewVersion(updatedElements, `Refined ${suggestion.elementTitle}`);
    setModifiedElementIds([suggestion.targetElementId]);

    // Update message status
    setMessages(prev => prev.map(m => {
      if (m.id === messageId && m.suggestion) {
        return { ...m, suggestion: { ...m.suggestion, status: 'accepted' } };
      }
      return m;
    }));
  };

  // Reject Refinement Suggestion
  const handleRejectSuggestion = (messageId: string) => {
    setMessages(prev => prev.map(m => {
      if (m.id === messageId && m.suggestion) {
        return { ...m, suggestion: { ...m.suggestion, status: 'rejected' } };
      }
      return m;
    }));

    const rejectMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'ai',
      text: 'Suggestion rejected. The claim chart remains unchanged.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, rejectMsg]);
  };

  // Main Conversational Simulation & Live AI API Logic
  const handleSendMessage = async (userText: string) => {
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: userText,
      timestamp: timeStr
    };

    setMessages(prev => [...prev, userMsg]);

    // IF Live API Mode is selected (Gemini / OpenAI)
    if (apiSettings.provider !== 'simulation' && apiSettings.apiKey) {
      const result = await generateAiRefinement(userText, elements, systemPrompt, apiSettings);
      
      const aiResponse: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'ai',
        text: result.errorNotice 
          ? `${result.errorNotice}\n\nGenerated Refinement Proposal:` 
          : `Generated live claim chart refinement proposal using ${apiSettings.provider === 'gemini' ? 'Google Gemini AI' : 'OpenAI GPT-4o'}:`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        affectedElementId: result.suggestion.targetElementId,
        suggestion: result.suggestion
      };
      setMessages(prev => [...prev, aiResponse]);
      setSelectedElementId(result.suggestion.targetElementId);
      return;
    }

    const lower = userText.toLowerCase();

    // SCENARIO 1: Undo Request
    if (lower.includes('undo') || lower.includes('revert') || lower.includes('restore state')) {
      setTimeout(() => {
        handleUndo();
      }, 500);
      return;
    }

    // SCENARIO 2: Fix ML Reasoning (Element 3)
    if (lower.includes('ml') || lower.includes('machine learning') || lower.includes('element 3') || lower.includes('weak')) {
      setTimeout(() => {
        const elem3 = elements.find(e => e.id === 'elem-3');
        const aiResponse: ChatMessage = {
          id: `msg-${Date.now() + 1}`,
          sender: 'ai',
          text: 'I analyzed Claim 1[c] against uploaded Acme marketing materials and technical specifications. Public documentation confirms user preference learning ("Auto-Schedule"), but omits proprietary algorithm hyperparameters. Here is a grounded refinement proposal distinguishing documented evidence from technical inference:',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          affectedElementId: 'elem-3',
          suggestion: {
            targetElementId: 'elem-3',
            elementTitle: 'Claim 1[c] (Machine Learning)',
            originalText: elem3?.evidence || '',
            proposedText: 'Acme marketing materials & whitepaper state: "Auto-Schedule learns your preferred temperatures over time." While public documentation confirms automated preference learning, internal ML model architecture and training hyperparameters are not disclosed. Evidence maps to functional learning behavior; discovery requested for proprietary code implementation.',
            featureText: 'Acme Auto-Schedule & User Preference Learning Engine',
            reasoning: 'Distinguishes public feature capability from proprietary technical source code details under Phillips construction rules.',
            groundingType: 'Technical Inference',
            confidenceScore: 0.85,
            sources: ['Acme_AutoSchedule_Whitepaper.pdf', 'Acme_Thermostat_v3_TechSpecs.pdf, p.12'],
            status: 'pending'
          }
        };
        setMessages(prev => [...prev, aiResponse]);
        setSelectedElementId('elem-3');
      }, 600);
      return;
    }

    // SCENARIO 3: Strengthen Motion Sensor Evidence (Element 2)
    if (lower.includes('motion sensor') || lower.includes('occupancy') || lower.includes('element 2') || lower.includes('strengthen')) {
      setTimeout(() => {
        const elem2 = elements.find(e => e.id === 'elem-2');
        const aiResponse: ChatMessage = {
          id: `msg-${Date.now() + 1}`,
          sender: 'ai',
          text: 'Citing Acme Technical Specifications (Doc ACME-TS-902, Section 4.1): I have located direct hardware specification quotes for occupancy detection.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          affectedElementId: 'elem-2',
          suggestion: {
            targetElementId: 'elem-2',
            elementTitle: 'Claim 1[b] (Motion Sensor)',
            originalText: elem2?.evidence || '',
            proposedText: 'Acme Technical Specifications (Doc ACME-TS-902, Section 4.1) state: "Built-in Passive Infrared (PIR) Motion Sensor with 120° field of view detects occupancy to trigger state transitions." This provides direct hardware specification evidence mapping to Claim 1[b].',
            featureText: 'PIR Motion Sensor (Model ACME-MS-120)',
            reasoning: 'Strengthens evidence by replacing general marketing text with exact hardware specification parameters.',
            groundingType: 'Direct Evidence',
            confidenceScore: 0.98,
            sources: ['Acme_Thermostat_v3_TechSpecs.pdf, Section 4.1'],
            status: 'pending'
          }
        };
        setMessages(prev => [...prev, aiResponse]);
        setSelectedElementId('elem-2');
      }, 600);
      return;
    }

    // SCENARIO 4: Wrong Evidence Correction (Edge Case 1)
    if (lower.includes('incorrect') || lower.includes('wrong') || lower.includes('does not say') || lower.includes('correct')) {
      setTimeout(() => {
        const aiResponse: ChatMessage = {
          id: `msg-${Date.now() + 1}`,
          sender: 'ai',
          text: 'Thank you for the correction, Analyst. Re-analyzing "Acme_Thermostat_v3_TechSpecs.pdf". You are correct—the spec sheet specifies 2.4GHz WiFi 802.11 b/g/n, not dual-band 5GHz. Here is the corrected claim chart mapping:',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          affectedElementId: 'elem-1',
          suggestion: {
            targetElementId: 'elem-1',
            elementTitle: 'Claim 1[a] (Wireless Module)',
            originalText: elements[0].evidence,
            proposedText: 'Page 4 of Acme Technical Specifications states: "WiFi-enabled smart thermostat connects to 2.4GHz home network (802.11 b/g/n)." Corrected quote removes unverified 5GHz reference.',
            reasoning: 'Analyst-guided evidence correction overriding previous AI output.',
            groundingType: 'Direct Evidence',
            confidenceScore: 0.96,
            sources: ['Acme_Thermostat_v3_TechSpecs.pdf, Page 4'],
            status: 'pending'
          }
        };
        setMessages(prev => [...prev, aiResponse]);
        setSelectedElementId('elem-1');
      }, 600);
      return;
    }

    // SCENARIO 5: Missing Evidence (Edge Case 3)
    if (lower.includes('schematic') || lower.includes('circuit') || lower.includes('missing') || lower.includes('antenna') || lower.includes('source code')) {
      setTimeout(() => {
        const aiResponse: ChatMessage = {
          id: `msg-${Date.now() + 1}`,
          sender: 'ai',
          text: 'I searched all 3 uploaded documents (Claim Chart, TechSpecs PDF, Whitepaper PDF), but could not find internal PCB circuit schematics or dual-band antenna trace diagrams.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          requiresSourceUpload: true
        };
        setMessages(prev => [...prev, aiResponse]);
      }, 600);
      return;
    }

    // Default Conversational Fallback
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'ai',
        text: `I have analyzed your request: "${userText}". Under current grounding rules (${systemPrompt.evidenceRequirement}), I am reviewing the 3 claim elements against uploaded product context. Select an element or use a quick prompt chip to refine further.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 600);
  };

  return (
    <div className="app-container">
      {/* Top Navbar Header */}
      <Header
        currentVersion={currentVersionId}
        totalVersions={versionHistory.length}
        onUndo={handleUndo}
        onOpenHistory={() => setIsHistoryModalOpen(true)}
        onOpenPromptModal={() => setIsPromptModalOpen(true)}
        onOpenExportModal={() => setIsExportModalOpen(true)}
        onOpenApiSettings={() => setIsApiSettingsOpen(true)}
        onResetSetup={() => setIsInitialSetupOpen(true)}
        systemPrompt={systemPrompt}
        apiSettings={apiSettings}
      />

      {/* Main 3-Pane Workspace */}
      <div className="main-workspace">
        {/* Left Pane: Evidence Context */}
        <DocumentContextPanel
          documents={documents}
          onAddDocument={handleAddDocument}
          systemPrompt={systemPrompt}
          onOpenPromptModal={() => setIsPromptModalOpen(true)}
        />

        {/* Center Pane: Claim Chart Table */}
        <ClaimChartTable
          elements={elements}
          selectedElementId={selectedElementId}
          onSelectElement={setSelectedElementId}
          modifiedElementIds={modifiedElementIds}
        />

        {/* Right Pane: AI Chat Refinement */}
        <ChatAssistantPanel
          messages={messages}
          onSendMessage={handleSendMessage}
          onAcceptSuggestion={handleAcceptSuggestion}
          onRejectSuggestion={handleRejectSuggestion}
          onUploadSourceClick={() => {
            const fileDoc: DocumentFile = {
              id: `doc-${Date.now()}`,
              name: 'Acme_Circuit_Schematic_RevB.pdf',
              type: 'product_doc',
              size: '3.2 MB',
              uploadDate: 'Just now',
              status: 'indexed',
              excerpt: 'Internal PCB Layout: Page 3 shows antenna impedance matching network and WiFi IC pinout.'
            };
            handleAddDocument(fileDoc);
          }}
        />
      </div>

      {/* Modals */}
      {isInitialSetupOpen && (
        <InitialSetup onComplete={handleSetupComplete} />
      )}

      <SystemPromptModal
        config={systemPrompt}
        isOpen={isPromptModalOpen}
        onClose={() => setIsPromptModalOpen(false)}
        onSave={setSystemPrompt}
      />

      <VersionHistoryModal
        history={versionHistory}
        currentVersion={currentVersionId}
        isOpen={isHistoryModalOpen}
        onClose={() => setIsHistoryModalOpen(false)}
        onRestoreVersion={handleRestoreVersion}
      />

      <ExportModal
        elements={elements}
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
      />

      <ApiSettingsModal
        isOpen={isApiSettingsOpen}
        onClose={() => setIsApiSettingsOpen(false)}
        settings={apiSettings}
        onSaveSettings={setApiSettings}
      />
    </div>
  );
};

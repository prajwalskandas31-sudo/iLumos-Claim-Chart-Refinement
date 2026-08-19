export interface ClaimElement {
  id: string;
  claimNumber: string;
  elementText: string;
  accusedFeature: string;
  evidence: string;
  status: 'original' | 'modified' | 'weak_evidence' | 'verified';
  confidenceScore: number;
  lastUpdated: string;
  history?: Array<{
    timestamp: string;
    evidence: string;
    feature: string;
    note: string;
  }>;
}

export interface ClaimChartVersion {
  versionId: number;
  timestamp: string;
  description: string;
  elements: ClaimElement[];
}

export interface RefinementSuggestion {
  targetElementId: string;
  elementTitle: string;
  originalText: string;
  proposedText: string;
  featureText?: string;
  reasoning: string;
  groundingType: 'Direct Evidence' | 'Technical Inference' | 'Insufficient Evidence' | 'Legal Refinement';
  confidenceScore: number;
  sources: string[];
  status: 'pending' | 'accepted' | 'rejected' | 'modified';
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai' | 'system';
  text: string;
  timestamp: string;
  affectedElementId?: string;
  suggestion?: RefinementSuggestion;
  requiresSourceUpload?: boolean;
  isCorrectionFlow?: boolean;
}

export interface DocumentFile {
  id: string;
  name: string;
  type: 'claim_chart' | 'product_doc' | 'url';
  size: string;
  uploadDate: string;
  status: 'indexed' | 'processing';
  excerpt?: string;
}

export interface SystemPromptConfig {
  role: string;
  strictness: 'conservative' | 'balanced' | 'aggressive';
  evidenceRequirement: 'strict_quotes' | 'allow_technical_inference' | 'broad_mapping';
  claimConstructionStandard: 'phillips' | 'bri';
  customInstructions: string;
}

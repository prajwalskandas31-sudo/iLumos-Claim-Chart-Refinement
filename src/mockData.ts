import { ClaimElement, DocumentFile, SystemPromptConfig } from './types';

export const INITIAL_CLAIM_ELEMENTS: ClaimElement[] = [
  {
    id: 'elem-1',
    claimNumber: 'Claim 1[a]',
    elementText: 'A temperature control device with a wireless communication module',
    accusedFeature: 'Acme Thermostat product page & hardware overview',
    evidence: 'The Acme device has WiFi 802.11 b/g/n capability which directly satisfies the wireless communication module requirement as stated on page 4 of product sheet: "WiFi-enabled smart thermostat connects to your 2.4GHz home network."',
    status: 'verified',
    confidenceScore: 0.95,
    lastUpdated: 'Initial Mapping'
  },
  {
    id: 'elem-2',
    claimNumber: 'Claim 1[b]',
    elementText: 'A motion sensor for detecting occupancy',
    accusedFeature: 'Acme technical specifications document (Doc Ref: ACME-TS-902)',
    evidence: 'Acme technical specifications document shows: "Built-in motion sensor detects when people are home." Motion sensor explicitly mentioned in specs directly maps to the claim element for occupancy detection.',
    status: 'verified',
    confidenceScore: 0.92,
    lastUpdated: 'Initial Mapping'
  },
  {
    id: 'elem-3',
    claimNumber: 'Claim 1[c]',
    elementText: 'Machine learning algorithm that learns user temperature preferences over time',
    accusedFeature: 'Acme marketing materials claim: "Auto-Schedule learns your preferred temperatures"',
    evidence: 'The learning behavior described suggests ML algorithm, though technical implementation details (neural network architecture, parameter tuning, training schedule) are not disclosed in public marketing materials. May need stronger technical evidence.',
    status: 'weak_evidence',
    confidenceScore: 0.45,
    lastUpdated: 'Initial Mapping'
  }
];

export const MOCK_DOCUMENTS: DocumentFile[] = [
  {
    id: 'doc-1',
    name: 'US123456_Patent_Claims.xlsx',
    type: 'claim_chart',
    size: '142 KB',
    uploadDate: 'Today, 07:45 AM',
    status: 'indexed',
    excerpt: 'Patent Claim 1: A temperature control device comprising: a wireless communication module; a motion sensor for detecting occupancy; and a machine learning algorithm...'
  },
  {
    id: 'doc-2',
    name: 'Acme_Thermostat_v3_TechSpecs.pdf',
    type: 'product_doc',
    size: '2.4 MB',
    uploadDate: 'Today, 07:46 AM',
    status: 'indexed',
    excerpt: 'Acme Smart Thermostat V3 Technical Specifications. Section 3.2 Wireless Interfaces: WiFi 802.11 b/g/n. Section 4.1 Sensors: Passive Infrared Motion Sensor with 120-degree field of view.'
  },
  {
    id: 'doc-3',
    name: 'Acme_AutoSchedule_Whitepaper.pdf',
    type: 'product_doc',
    size: '1.1 MB',
    uploadDate: 'Today, 07:46 AM',
    status: 'indexed',
    excerpt: 'Acme Auto-Schedule Feature Overview. Marketing highlights algorithm behavior but omits proprietary model parameters and source code routines.'
  }
];

export const DEFAULT_SYSTEM_PROMPT: SystemPromptConfig = {
  role: 'Senior Patent Analyst AI',
  strictness: 'conservative',
  evidenceRequirement: 'strict_quotes',
  claimConstructionStandard: 'phillips',
  customInstructions: 'Always ground evidence in uploaded product documentation. Differentiate documented features from technical inferences. Clearly indicate when additional technical documentation or circuit schematics are required.'
};

export const DEMO_PRESETS = [
  {
    id: 'preset-1',
    label: 'Fix ML Reasoning (Element 3)',
    prompt: 'The AI reasoning for the ML algorithm element is weak - add more technical details.',
    category: 'Strengthen Evidence'
  },
  {
    id: 'preset-2',
    label: 'Undo Previous Refinement',
    prompt: 'Undo that refinement.',
    category: 'Reversibility'
  },
  {
    id: 'preset-3',
    label: 'Strengthen Motion Sensor Evidence (Element 2)',
    prompt: 'Find stronger technical documentation for the motion sensor claim.',
    category: 'Evidence Search'
  },
  {
    id: 'preset-4',
    label: 'Correct Wrong Evidence (Edge Case 1)',
    prompt: 'This evidence is incorrect. The product documentation does not say that.',
    category: 'Human Correction'
  },
  {
    id: 'preset-5',
    label: 'Request Missing Schematics (Edge Case 3)',
    prompt: 'Find internal circuit schematics for the dual-band antenna system.',
    category: 'Missing Evidence'
  },
  {
    id: 'preset-6',
    label: 'Clarify Claim Construction (Legal)',
    prompt: 'Rewrite the reasoning to address potential claim construction arguments under Phillips standard.',
    category: 'Legal Language'
  }
];

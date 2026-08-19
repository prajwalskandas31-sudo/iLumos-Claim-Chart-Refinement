import { ClaimElement, RefinementSuggestion, SystemPromptConfig } from '../types';

export interface ApiSettings {
  provider: 'gemini' | 'openai' | 'simulation';
  apiKey: string;
  model: string;
}

export const DEFAULT_API_SETTINGS: ApiSettings = {
  provider: 'simulation',
  apiKey: '',
  model: 'gemini-1.5-flash'
};

export async function generateAiRefinement(
  userQuery: string,
  claimElements: ClaimElement[],
  systemPrompt: SystemPromptConfig,
  settings: ApiSettings
): Promise<{ suggestion: RefinementSuggestion; errorNotice?: string }> {
  if (settings.provider === 'simulation' || !settings.apiKey) {
    return {
      suggestion: getSimulatedSuggestion(userQuery, claimElements),
      errorNotice: !settings.apiKey && settings.provider !== 'simulation' 
        ? '⚠️ No API key provided for selected live provider. Used simulated high-precision legal engine.' 
        : undefined
    };
  }

  try {
    if (settings.provider === 'gemini') {
      return await callGeminiApi(userQuery, claimElements, systemPrompt, settings);
    } else if (settings.provider === 'openai') {
      return await callOpenAiApi(userQuery, claimElements, systemPrompt, settings);
    }
  } catch (err: any) {
    console.warn('AI API Call Error:', err);
    
    const isRateLimit = err?.message?.includes('429') || err?.message?.includes('quota') || err?.message?.includes('RESOURCE_EXHAUSTED');
    const warningMsg = isRateLimit
      ? '⚠️ Free Tier Rate Limit Exceeded (15 Requests/Min quota reached). Automatically fallback to high-precision legal simulation engine.'
      : `⚠️ API Connection Error (${err?.message || 'Unknown'}). Fallback to legal simulation engine.`;

    return {
      suggestion: getSimulatedSuggestion(userQuery, claimElements),
      errorNotice: warningMsg
    };
  }

  return {
    suggestion: getSimulatedSuggestion(userQuery, claimElements)
  };
}

async function callGeminiApi(
  userQuery: string,
  claimElements: ClaimElement[],
  systemPrompt: SystemPromptConfig,
  settings: ApiSettings
): Promise<{ suggestion: RefinementSuggestion; errorNotice?: string }> {
  const modelName = settings.model || 'gemini-1.5-flash';
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${settings.apiKey}`;

  const promptText = `
You are iLumos AI, an expert patent litigation analyst assistant.
Legal Claim Construction Standard: ${systemPrompt.claimConstructionStandard}
Evidence Requirement: ${systemPrompt.evidenceRequirement}
Strictness Rule: ${systemPrompt.strictness}

Current Claim Chart Elements:
${JSON.stringify(claimElements, null, 2)}

User Refinement Request: "${userQuery}"

Task: Respond ONLY with a valid JSON object matching this schema:
{
  "targetElementId": "e3",
  "elementTitle": "Element 3 (ML Motion Algorithm)",
  "originalText": "Original Evidence Text",
  "proposedText": "Refined Grounded Evidence Text",
  "reasoning": "Explanation of legal/technical refinement and evidence grounding.",
  "groundingType": "Direct Evidence" | "Technical Inference" | "Insufficient Evidence",
  "confidenceScore": 92,
  "sources": ["Acme_Thermostat_Spec.pdf § 4.2"]
}
`;

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: promptText }] }]
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Gemini API Error ${response.status}: ${errorText}`);
  }

  const data = await response.json();
  const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
  
  const jsonMatch = rawText.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error('AI response was not valid JSON format.');
  }

  const parsed = JSON.parse(jsonMatch[0]);

  const suggestion: RefinementSuggestion = {
    targetElementId: parsed.targetElementId || 'e3',
    elementTitle: parsed.elementTitle || 'Element 3 (ML Motion Algorithm)',
    originalText: parsed.originalText || claimElements[2]?.evidence || '',
    proposedText: parsed.proposedText || 'Refined text via Live Gemini AI',
    reasoning: parsed.reasoning || 'Live AI refinement generated using Google Gemini API.',
    groundingType: parsed.groundingType || 'Technical Inference',
    confidenceScore: parsed.confidenceScore || 92,
    sources: parsed.sources || ['Acme_Thermostat_Spec.pdf § 4.2'],
    status: 'pending'
  };

  return { suggestion };
}

async function callOpenAiApi(
  userQuery: string,
  claimElements: ClaimElement[],
  systemPrompt: SystemPromptConfig,
  settings: ApiSettings
): Promise<{ suggestion: RefinementSuggestion; errorNotice?: string }> {
  const modelName = settings.model || 'gpt-4o-mini';
  const url = 'https://api.openai.com/v1/chat/completions';

  const systemMessage = `You are iLumos AI, an expert patent litigation analyst assistant.
Legal Claim Construction Standard: ${systemPrompt.claimConstructionStandard}
Strictness: ${systemPrompt.strictness}
Always output valid JSON only.`;

  const userMessage = `Current Claim Chart: ${JSON.stringify(claimElements)}
User Request: "${userQuery}"
Return JSON schema:
{
  "targetElementId": "e3",
  "elementTitle": "Element 3",
  "originalText": "...",
  "proposedText": "...",
  "reasoning": "...",
  "groundingType": "Direct Evidence" | "Technical Inference" | "Insufficient Evidence",
  "confidenceScore": 95,
  "sources": ["Acme_Thermostat_Spec.pdf"]
}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${settings.apiKey}`
    },
    body: JSON.stringify({
      model: modelName,
      messages: [
        { role: 'system', content: systemMessage },
        { role: 'user', content: userMessage }
      ],
      response_format: { type: 'json_object' }
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`OpenAI API Error ${response.status}: ${errorText}`);
  }

  const data = await response.json();
  const parsed = JSON.parse(data.choices[0].message.content);

  const suggestion: RefinementSuggestion = {
    targetElementId: parsed.targetElementId || 'e3',
    elementTitle: parsed.elementTitle || 'Element 3',
    originalText: parsed.originalText || claimElements[2]?.evidence || '',
    proposedText: parsed.proposedText || 'Refined text via Live OpenAI',
    reasoning: parsed.reasoning || 'Live AI refinement generated using OpenAI API.',
    groundingType: parsed.groundingType || 'Direct Evidence',
    confidenceScore: parsed.confidenceScore || 95,
    sources: parsed.sources || ['Acme_Thermostat_Spec.pdf § 4.2'],
    status: 'pending'
  };

  return { suggestion };
}

function getSimulatedSuggestion(userQuery: string, claimElements: ClaimElement[]): RefinementSuggestion {
  const lower = userQuery.toLowerCase();
  
  if (lower.includes('wrong') || lower.includes('incorrect') || lower.includes('mistake')) {
    return {
      targetElementId: 'e2',
      elementTitle: 'Element 2 (Motion Detector)',
      originalText: 'Acme Thermostat includes passive infrared (PIR) motion sensor model PIR-200 mapped to Claim Element 2.',
      proposedText: 'Acme Thermostat includes radar-based mmWave motion sensor model RAD-400 (per Rev 3.1 schematic § 2.1), correcting previous PIR-200 reference.',
      reasoning: 'Analyst requested evidence correction. Updated PIR-200 citation to RAD-400 mmWave sensor based on verified Rev 3.1 technical specifications.',
      groundingType: 'Direct Evidence',
      confidenceScore: 98,
      sources: ['Acme_Thermostat_Spec_Rev3.pdf § 2.1'],
      status: 'pending'
    };
  }

  return {
    targetElementId: 'e3',
    elementTitle: 'Element 3 (Adaptive ML Motion Algorithm)',
    originalText: 'Marketing Brochure states "Smart Learning occupancy detection automatically adjusts room temperature based on user presence habits."',
    proposedText: 'Firmware binary dumps (fw_v4.2.bin) confirm local execution of a 2-layer decision tree classifier taking PIR raw voltage spikes as input to trigger state transitions without cloud dependency.',
    reasoning: 'Replaced high-level marketing brochure text with grounded technical inference from firmware disassembly, establishing structural equivalence under Phillips Construction Standard.',
    groundingType: 'Technical Inference',
    confidenceScore: 92,
    sources: ['Acme_Thermostat_Spec.pdf § 4.2', 'fw_v4.2.bin'],
    status: 'pending'
  };
}

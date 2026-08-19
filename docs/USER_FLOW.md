# iLumos User Flow Diagram & Dual Architecture Specification

**Product**: iLumos (Lumenci AI Patent Refinement Platform)  
**Author**: Prajwal Skanda  
**Role Target**: Product Manager  

---

## 📸 Architectural Visual Diagrams

### 1. Baseline Architecture: Deterministic Simulation Engine (Mode 1)
![Deterministic Simulation Engine Architecture Userflow](assets/simulation_architecture_userflow.jpg)

### 2. Live API Architecture: Dual Engine with Auto-Fallback (Mode 2)
![Live API Integrated Architecture Userflow](assets/live_api_architecture_userflow.jpg)

---

## 1. End-to-End User Flow Diagram (Mermaid)

```mermaid
flowchart TD
    Start([1. Analyst Opens iLumos]) --> Ingest[2. Upload Claim Chart .xlsx]
    Ingest --> Docs[3. Upload Product Documentation .pdf]
    Docs --> Config[4. Configure System Prompt & AI Engine]
    Config --> SelectEngine{4a. Select AI Execution Mode}
    
    SelectEngine -- Simulation Mode --> Process[5. Index Documents locally]
    SelectEngine -- Live Gemini API --> Process
    SelectEngine -- Live OpenAI API --> Process

    Process --> Display[6. Display 3-Column Working Claim Chart]
    Display --> Review[7. Analyst Reviews Initial Claim Chart]
    
    Review --> ChatInput[8. Analyst Enters Refinement Request in Chat]
    ChatInput --> EngineCheck{8a. API Quota Check}

    EngineCheck -- Success --> AIAnalysis[9. AI Analyzes Request against Evidence Context]
    EngineCheck -- 429 Rate Limit Exceeded --> FallbackNotice[Display Amber Rate Limit Warning Toast]
    FallbackNotice --> SimulationFallback[Auto-Fallback to Legal Simulation Engine]
    SimulationFallback --> AIAnalysis

    AIAnalysis --> AISuggestion[10. AI Responds with Grounded Suggestion Card]
    AISuggestion --> Indicate[11. AI Indicates Affected Element & Grounding Level]
    
    Indicate --> AnalystReview[12. Analyst Reviews Suggestion Card]
    
    AnalystReview --> Choice{13. Analyst Action}
    
    Choice -- Accept --> AcceptBranch[14. Analyst Accepts Suggestion]
    AcceptBranch --> UpdateChart[15. Update Claim Chart Row + Highlight Diff]
    UpdateChart --> IncrementVersion[16. Save New Version v+1 in Timeline]
    IncrementVersion --> Iterate[17. Analyst Continues Iterating]
    
    Choice -- Reject --> RejectBranch[Keep Original Chart Unchanged]
    RejectBranch --> Iterate
    
    Choice -- Modify --> ModifyBranch[Conversational Follow-up in Chat]
    ModifyBranch --> ChatInput

    Iterate --> Export([18. Analyst Exports Final Claim Chart to Word .docx])

    %% EDGE CASE BRANCHES
    subgraph Edge_Cases [Key Exceptional Workflows]
        direction TB
        
        %% Edge Case 1: Wrong Evidence
        WrongEvidence[Edge Case 1: Wrong Evidence] --> EC1_Flag[Analyst Flags Incorrect Citation in Chat]
        EC1_Flag --> EC1_AI[AI Re-analyzes Source & Admits Correction]
        EC1_AI --> EC1_Update[AI Outputs Corrected Citation Card]
        EC1_Update --> Choice
        
        %% Edge Case 2: Reversibility & Undo
        Reversibility[Edge Case 2: Reversibility] --> EC2_Undo[Analyst Clicks 'Undo Refinement' or Types 'Undo']
        EC2_Undo --> EC2_Stack[Revert Claim Chart State from v2.0 to v1.0]
        EC2_Stack --> EC2_Notice[Display AI Reversion Message in Chat]
        
        %% Edge Case 3: Missing Evidence Handling
        MissingEvidence[Edge Case 3: Missing Evidence] --> EC3_Query[Analyst Requests Refinement on Missing Schematic]
        EC3_Query --> EC3_Refusal[AI Checks Vector Context & Refuses Hallucination]
        EC3_Refusal --> EC3_Notice[Display Grounding Notice & Highlight Upload Button]
        EC3_Notice --> EC3_Upload[Analyst Uploads Missing Document/URL]
        EC3_Upload --> Process
    end
```

---

## 2. Comprehensive 19-Step User Journey & Edge Case Specs

### Step-by-Step Breakdown:

1. **Analyst Workspace Initialization**: Analyst accesses iLumos via live browser URL (`https://prajwalskandas31-sudo.github.io/iLumos-Claim-Chart-Refinement/`).
2. **Claim Chart Upload**: Drag-and-drop ingestion of original `.xlsx` 3-column claim chart (*Patent Claim Element* | *Accused Product Feature* | *Evidence*).
3. **Product Context Ingestion**: Ingestion of supporting PDF datasheets (`Acme_Thermostat_v3_TechSpecs.pdf`, marketing brochures).
4. **System Prompt & AI Engine Config**:
   - **Legal Rule Selection**: Analyst configures Claim Construction Standard (*Phillips Standard* vs *Broadest Reasonable Interpretation*).
   - **AI Engine Selection**: Toggle between **Deterministic Simulation Mode** (default for offline/interview evaluation), **Google Gemini 1.5 Flash Free Tier**, or **OpenAI GPT-4o**.
5. **Document Vector Indexing**: Backend parses PDF/Docx text into chunked embeddings.
6. **3-Pane Legal Workspace Presentation**:
   - *Left Pane*: Source Document Index & Grounding Rules.
   - *Center Pane*: Active 3-column claim chart with row status badges (*Original*, *Weak Evidence*, *Modified*, *Verified*).
   - *Right Pane*: Conversational AI Assistant & Suggestion Cards.
7. **Initial Analyst Review**: Analyst identifies weak evidence in Claim 1[c] (Machine Learning algorithm relying on vague marketing brochure text).
8. **Conversational Refinement Request**: Analyst enters prompt: *"Refine element 3 to distinguish public Auto-Schedule claims from proprietary source code details."*
9. **AI Analysis & Grounding Search**: System searches indexed documents for algorithm specifications.
10. **Structured Suggestion Card Generation**: AI responds with a structured card featuring green diff previews and explicit action buttons (`Apply`, `Reject`, `Modify`).
11. **Grounding Badge Assignment**: AI tags the proposal with a **Technical Inference** or **Direct Evidence** badge and lists exact document page citations.
12. **Human-in-the-Loop Review**: Analyst reviews diff preview before applying changes.
13. **Analyst Action Decision**:
    - **Accept**: Applies changes to the chart.
    - **Reject**: Retains original chart text.
    - **Modify**: Continues conversational dialogue.
14. **Chart Row Update**: Target row is updated with green highlight animations.
15. **Version Timeline Save**: System increments state version stack ($v1.0 \rightarrow v2.0$).
16. **Continued Iteration**: Analyst refines remaining claim elements.
17. **Formatted Word Export**: Analyst clicks "Export to Word" to generate court-ready `.docx` document.

---

## 3. Rate Limit (HTTP 429) & Auto-Fallback Strategy

When evaluators test the live Google Gemini API (Free Tier):
- **Quota Limit**: 15 Requests/Min (RPM).
- **Auto-Monitoring**: If an API call receives a `429 Too Many Requests` or `RESOURCE_EXHAUSTED` status code, iLumos captures the error silently.
- **Amber Warning Toast**: Renders an alert toast explaining that the free quota limit was reached.
- **Seamless Engine Fallback**: Switches execution to the legal simulation engine so the analyst's workflow is never interrupted or blocked.

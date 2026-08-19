# iLumos User Flow Diagram & Architecture Specification

**Product**: iLumos (Lumenci AI Patent Refinement Platform)  
**Candidate**: Prajwal Skanda  

---

## 1. End-to-End User Flow Diagram (Mermaid)

```mermaid
flowchart TD
    Start([1. Analyst Opens iLumos]) --> Ingest[2. Upload Claim Chart .xlsx]
    Ingest --> Docs[3. Upload Product Documentation .pdf]
    Docs --> Config[4. Configure System Prompt & Grounding Rules]
    Config --> Process[5. System Processes & Indexes Documents]
    Process --> Display[6. Display 3-Column Working Claim Chart]
    Display --> Review[7. Analyst Reviews Initial Claim Chart]
    
    Review --> ChatInput[8. Analyst Enters Refinement Request in Chat]
    ChatInput --> AIAnalysis[9. AI Analyzes Request against Evidence Context]
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
        
        %% Edge Case 2: Undo Refinement
        UndoRequest[Edge Case 2: Undo Refinement] --> EC2_Chat[Analyst Types 'Undo that refinement']
        EC2_Chat --> EC2_Restore[System Restores Previous Version v-1]
        EC2_Restore --> EC2_Confirm[Chat Confirms Restored State]
        EC2_Confirm --> Display
        
        %% Edge Case 3: Missing Evidence
        MissingEvidence[Edge Case 3: Missing Evidence] --> EC3_Search[AI Searches Ingested Docs - No Match]
        EC3_Search --> EC3_Refuse[AI Refuses to Invent Technical Details]
        EC3_Search --> EC3_Prompt[AI Prompts Analyst for Doc / URL]
        EC3_Prompt --> EC3_Supply[Analyst Uploads Schematic / Supplies URL]
        EC3_Supply --> EC3_Index[New Source Indexed]
        EC3_Index --> AIAnalysis
    end
```

---

## 2. Structured Step-by-Step Breakdown

| Step | User Action / System Event | Description & State Change |
|:---|:---|:---|
| **1** | Open Application | Analyst arrives at iLumos workspace onboarding screen. |
| **2** | Upload Claim Chart | Ingests `US123456_Claim_Chart.xlsx` (3 claim elements parsed). |
| **3** | Upload Product Docs | Ingests `Acme_Thermostat_v3_TechSpecs.pdf` & Whitepapers. |
| **4** | System Prompt Setup | Analyst defines grounding strictness (*Strict Quotes*) & legal standard (*Phillips*). |
| **5-7**| Display & Review Chart | 3-column table renders with Element 1[c] marked as `Weak Technical Evidence`. |
| **8-11**| Chat Request & AI Card | Analyst sends *"Add technical details for ML element"*. AI generates suggestion card. |
| **12-16**| Accept & State Update | Analyst clicks `Apply to Chart`. Row updates, diff highlights, version advances to `v2.0`. |
| **17-18**| Export Final Artifact | Analyst clicks `Export to Word`. Formatted `.docx` file downloads for litigation. |

---

## 3. Detailed Edge Case Analysis

### Edge Case 1: AI Gives Wrong Evidence
- **Scenario**: AI attributes 5GHz WiFi support to Acme Thermostat when documentation specifies 2.4GHz only.
- **Handling**: Analyst states *"This evidence is incorrect. The product doc does not say 5GHz."* AI re-reads `TechSpecs.pdf`, admits correction in chat, and presents updated citation card. Analyst remains final reviewer.

### Edge Case 2: User Wants to Undo a Refinement
- **Scenario**: Analyst wants to revert an accepted refinement on Claim 1[c].
- **Handling**: Analyst requests *"Undo that refinement"*. System pops top state from version stack, restores claim chart to `v1.0`, and notifies analyst in chat.

### Edge Case 3: AI Cannot Find Sufficient Evidence
- **Scenario**: Analyst asks for internal circuit schematics of dual-band antenna system.
- **Handling**: AI refuses to hallucinate or invent engineering details. AI displays a red **Grounding Notice** card stating missing evidence and provides direct buttons for `Upload Document` or `Add URL`.

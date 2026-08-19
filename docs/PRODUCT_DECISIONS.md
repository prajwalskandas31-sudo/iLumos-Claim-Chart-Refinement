# Product Architectural Decisions & Rationale: iLumos

**Product**: iLumos (Lumenci)  
**Author**: Prajwal Skanda  

---

## 1. UX Layout Decision: 3-Pane Split Screen vs. Single Chat Canvas

### Decision
Adopt a **3-Pane Split Screen** layout:
- **Left**: Evidence Sources & Prompt Context
- **Center**: Primary Working Artifact (3-Column Claim Chart)
- **Right**: AI Refinement Assistant (Conversational Interface)

### UX Rationale
- **Working Artifact Priority**: In legal-tech, the 3-column claim chart is the legal work product. Placing it front-and-center ensures the analyst remains focused on the output artifact rather than scrolling through chat transcript history.
- **Context Visibility**: Having evidence documents visible on the left allows instant verification when the AI cites specific page numbers or spec sheets.
- **Conversational Sidecar**: Chat acts as an interactive assistant operating *upon* the center artifact rather than replacing it.

---

## 2. AI UX Decision: Suggestion Cards vs. Direct Canvas Auto-Mutation

### Decision
AI responses generate structured **Suggestion Cards** containing explicit **Diff previews** (Added text in green, removed in red), **Grounding Badges**, and **Action Buttons** (`Apply`, `Reject`, `Modify`). The claim chart is never auto-mutated silently.

### UX Rationale
- **Legal Exposure & Liability**: Patent claims involve high-stakes litigation. Silent automated mutations risk inserting subtle legal errors that invalidate patent coverage.
- **Human-in-the-Loop Control**: The analyst is the expert decision maker; AI acts solely as a draft proposal engine.

---

## 3. Evidence Grounding Taxonomy: Strict vs. Inferred Data

### Decision
Every AI suggestion is labeled with one of three explicit **Grounding Badges**:
1. **Direct Evidence**: Verbatim quote or exact spec sheet parameter from uploaded docs.
2. **Technical Inference**: Logical engineering conclusion based on feature behavior (e.g. inferring ML from automated temperature scheduling).
3. **Insufficient Evidence**: Explicit declaration that uploaded documents lack technical disclosures.

### Rationale
- **Hallucination Control**: Eliminates the danger of LLMs fabricating non-existent circuit schematics or patent claims.
- **Transparency**: Gives analysts instant clarity on which claim elements will withstand court cross-examination versus those requiring formal subpoena/discovery.

---

## 4. Reversibility & Version History Stack

### Decision
Every accepted refinement pushes a snapshot onto an immutable **Version History Stack**, exposed via a top timeline modal and conversational **Undo** commands.

### Rationale
- **Exploratory Workspace**: Analysts test multiple legal construction theories. Knowing any path can be rolled back instantly reduces cognitive load and fear of error.

---

## 5. Dual AI Execution Architecture & Rate Limit Fallback Strategy

### Decision
Implement a **Dual AI Execution Engine**:
- **Mode 1 (Deterministic Legal Simulation Engine)**: Default execution for offline evaluation and deterministic reviewer testing without requiring API keys or credit card billing.
- **Mode 2 (Live API Integration Engine)**: Direct REST API integration supporting **Google Gemini 1.5 Flash (Free Tier)** and **OpenAI GPT-4o**.
- **Rate Limit Monitor (HTTP 429)**: Captures free-tier quota limits (15 RPM) silently, renders an amber alert toast, and automatically falls back to the deterministic legal engine.

### Rationale
- **Zero-Friction Evaluator Testing**: Ensures Lumenci evaluators can test all 3 edge cases deterministically without needing paid API keys or hitting network rate limits during interviews.
- **Production Legitimacy**: Demonstrates real production AI capabilities with live Google Gemini and OpenAI REST APIs while protecting analyst workflows against quota disruptions.

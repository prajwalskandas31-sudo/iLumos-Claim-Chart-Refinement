# Product Requirements Document (PRD): iLumos AI Claim Chart Refinement

**Product Name**: iLumos (Lumenci)  
**Candidate Name**: Prajwal Skanda  
**Role Target**: Product Manager / AI Product Architect  
**Version**: 1.0 (MVP Scope)  

---

## 1. Problem Statement
Patent infringement analysis requires mapping patent claim elements against accused product features with grounded technical evidence. Today, patent analysts spend dozens of hours manually assembling and refining 3-column claim charts. While LLMs offer speed, standard conversational AI generates ungrounded inferences ("hallucinations"), lacks version control, and alters legal work silently. 

**iLumos** bridges this gap by providing a conversational AI refinement layer where the claim chart remains the controlled source of truth, suggestions are grounded in uploaded technical evidence, and the analyst retains 100% human-in-the-loop decision authority.

---

## 2. User Stories
1. **As a patent analyst**, I want to upload claim charts and supporting technical documentation so that the AI can contextualize patent elements against verified product specs.
2. **As a patent analyst**, I want to conversationally ask the AI to strengthen weak reasoning or find technical evidence so that I can refine claim charts iteratively.
3. **As a patent analyst**, I want explicit diff previews and grounding badges (*Direct Evidence* vs. *Technical Inference*) so that I can distinguish documented facts from AI inferences.
4. **As a patent analyst**, I want to accept, reject, or undo any AI suggestion so that I retain full control over legal work product before exporting to Word.
5. **As a patent analyst**, I want the AI to explicitly notify me when evidence is missing and prompt for additional source files rather than inventing technical details.

---

## 3. Core Features & Scope Boundary

### In Scope (MVP)
- **Document Ingestion & Setup**: Drag-and-drop claim charts (`.xlsx`/`.csv`) and product specs (`.pdf`), plus system prompt configuration.
- **Interactive 3-Column Working Artifact**: Live rendering of *Patent Claim Element*, *Accused Product Feature*, and *AI Reasoning / Evidence*.
- **Conversational Refinement Assistant**: Context-aware AI chat producing structured suggestion cards with diff previews and action buttons (`Apply`, `Reject`, `Modify`).
- **Evidence Grounding & Uncertainty Handling**: Explicit distinction between direct quotes, technical inferences, and missing documentation.
- **Reversibility & Version History**: Step-by-step state stack with conversational "Undo" and version timeline restore.
- **Edge Case Workflows**: Wrong evidence correction, missing evidence source prompt, and undo revert.
- **Legal Export**: One-click formatted Word (`.docx`) export for court proceedings.

### Out of Scope (MVP)
- Multi-tenant enterprise permissions & authentication.
- Real-time multi-user live co-editing.
- Production web-crawling infrastructure.
- Automated legal outcome prediction / litigation scoring.

---

## 4. Key Architectural Decisions

### Decision 1: Human-in-the-Loop Approval Before Final Chart Modification
- **Why**: Patent infringement litigation is high-stakes ($10M+ exposure). AI suggestions must act as draft recommendations that require explicit analyst review rather than silently altering legal artifacts.

### Decision 2: Grounding-First & Anti-Hallucination Fallback
- **Why**: An ungrounded claim element can invalidate an entire infringement case. The AI is programmed to explicitly declare missing evidence and request additional documentation rather than inventing circuit details.

### Decision 3: Reversible Version Stack with Conversational Undo
- **Why**: Patent analysis is exploratory. Analysts must feel safe testing experimental reasoning changes knowing every accepted refinement can be undone immediately via chat or history timeline.

---

## 5. Acceptance Criteria
1. **Given** an ingested claim chart, **when** an analyst requests ML reasoning refinement, **then** the AI presents a suggestion card highlighting affected Element 1[c], displaying a diff preview, and tagging the inference level.
2. **Given** a pending suggestion card, **when** the analyst clicks `Apply to Chart`, **then** the chart row updates visually, confidence badge updates, and version counter increments from v1.0 to v2.0.
3. **Given** a refined claim chart, **when** the analyst types "Undo that refinement", **then** the system restores the exact previous state and confirms the version revert in chat.
4. **Given** a request for non-existent circuit schematics, **when** evidence cannot be found, **then** the AI refuses to invent details and renders a source upload trigger.

---

## 6. Success Metrics (Target KPIs)
- **Refinement Acceptance Rate**: Target $\ge 75\%$ of AI suggestions accepted without full rewrite.
- **Chart Preparation Time**: Target $60\%$ reduction in analyst hours per claim chart (from 8 hrs $\rightarrow$ 3.2 hrs).
- **Evidence Citation Precision**: $100\%$ of accepted evidence grounded in verified source document page numbers.
- **Undo / Reversion Rate**: Tracked to optimize AI suggestion strictness ($<15\%$ target undo rate).

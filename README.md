# iLumos | AI Claim Chart Refinement Workspace

**Company / Product**: Lumenci — iLumos  
**Candidate Name**: Prajwal Skanda  
**Role Target**: Senior Product Manager / AI Product Architect  
**Assessment**: Lumenci AI - Product Manager Hiring Assessment  

---

## 📌 Executive Overview

**iLumos** is an AI-powered conversational workspace for patent infringement analysis. It enables patent analysts to upload claim charts and supporting product documentation, then conversationally refine claim elements, strengthen evidence, fix weak reasoning, and clarify legal language—all while maintaining 100% human-in-the-loop decision authority and evidence grounding.

---

## 🚀 Quick Start & Local Execution

### Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)

### Setup & Run
```bash
# 1. Clone or navigate to the project workspace
cd "c:\Users\skand\OneDrive\Desktop\Assignment\Lumenci\Apps\V1 - Antigravity - Lumenci"

# 2. Install dependencies
npm install

# 3. Launch local development server
npm run dev
```

The application will start live at **`http://localhost:3000/`** (or `http://localhost:5173/`).

---

## 🎨 System Architecture & UX Design

iLumos adopts a **3-Pane Split Screen Layout** designed specifically for high-stakes legal technology workflows:

1. **Left Pane (Evidence Context)**: Displays indexed source files (`.xlsx` claim charts, `.pdf` technical specs, web URLs) and live system prompt grounding rules.
2. **Center Pane (Working Artifact)**: Renders the primary 3-column claim chart (*Patent Claim Element*, *Accused Product Feature*, *AI Reasoning / Evidence*) with row status badges and green diff highlights.
3. **Right Pane (AI Refinement Assistant)**: Interactive conversational interface producing structured **Suggestion Cards** with diff previews, grounding level badges (*Direct Evidence*, *Technical Inference*, *Insufficient Evidence*), and explicit action buttons (`Apply`, `Reject`, `Modify`).

---

## 🌟 Key Capabilities & Assessment Scenarios Demonstrated

- **Initial Document Ingestion & Setup**: Drag-and-drop file loading and system prompt rule configuration (*Strict Quotes* under *Phillips Standard*).
- **ML Reasoning Refinement (Element 3)**: Identifies weak evidence in marketing text and proposes grounded technical inferences distinguishing public features from proprietary source code details.
- **Human-in-the-Loop Approval**: Analyst explicitly reviews diff previews before applying changes to the chart.
- **Reversibility & Version History Stack**: State stack allowing instant conversational `"Undo that refinement"` or manual timeline revert from v2.0 back to v1.0.
- **Wrong Evidence Correction (Edge Case 1)**: Analyst flags incorrect citation $\rightarrow$ AI acknowledges correction and updates source mapping.
- **Missing Evidence Handling (Edge Case 3)**: AI refuses to hallucinate missing circuit schematics, displays a Grounding Notice, and prompts for document/URL uploads.
- **Legal Export Engine**: One-click generation of formatted Microsoft Word (`.docx`) files ready for court proceedings.

---

## 📁 Repository Structure & Deliverables

```
├── docs/
│   ├── PRD.md                         # 1-Page Product Requirements Document
│   ├── USER_FLOW.md                   # User Flow Diagram (Mermaid) & Step Breakdown
│   ├── VIDEO_WALKTHROUGH.md           # Script for Video Walkthrough (< 3 mins)
│   ├── PRODUCT_DECISIONS.md           # Architectural Decisions & UX Rationale
│   ├── ASSUMPTIONS.md                 # Product & Technical Scope Assumptions
│   └── EXPLANATION_AND_SUMMARY.md     # Detailed Audio Request Breakdown & PM Answers
├── submission/
│   ├── PRD_Lumenci_Prajwal_Skanda.md
│   ├── UserFlow_Lumenci_Prajwal_Skanda.md
│   ├── VIDEO_SCRIPT_Lumenci_Prajwal_Skanda.md
│   └── EXPLANATION_AND_SUMMARY_Lumenci_Prajwal_Skanda.md
├── src/
│   ├── components/                    # React UI Components (Header, Setup, Table, Chat, Modals)
│   ├── docxExport.ts                  # Formatted Word Document Generator
│   ├── mockData.ts                    # US123456 vs Acme Thermostat Dataset & Demo Presets
│   ├── types.ts                       # TypeScript Interfaces
│   ├── index.css                      # Legal-Tech Design System & Styling
│   └── App.tsx                        # Main Workspace Application Component
├── index.html                         # Entry HTML with Typography
├── package.json                       # Dependencies & Scripts
├── tsconfig.json                      # TypeScript Configuration
└── vite.config.ts                     # Vite Configuration
```

---

## 📊 Product Metrics & Success Targets
- **Refinement Acceptance Rate**: Target $\ge 75\%$ without full analyst rewrite.
- **Chart Preparation Time**: $60\%$ reduction in analyst drafting time (8 hrs $\rightarrow$ 3.2 hrs).
- **Citation Precision**: $100\%$ of accepted evidence grounded in verified source documents.
- **Undo / Reversion Rate**: Tracked to optimize AI strictness ($<15\%$ target).

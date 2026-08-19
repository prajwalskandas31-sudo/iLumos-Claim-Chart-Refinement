You are acting as a senior Product Manager, UX/Product Designer, AI Product Architect, and Full-Stack Prototype Engineer.

I am completing a Product Manager hiring assessment for Lumenci.

IMPORTANT:
Do not blindly start coding.

First understand the complete assignment below, identify the product problem, derive the intended user journey, make reasonable assumptions where the assessment is silent, and then build the prototype and supporting deliverables.

The goal is NOT to build a production-ready application.

The goal is to demonstrate:
1. Strong product thinking
2. Clear understanding of conversational AI UX
3. Sensible handling of AI uncertainty and human review
4. Good user-flow design
5. A convincing working prototype
6. Ability to make reasonable product decisions under ambiguity
7. Good execution within a short assessment window

==================================================
1. ORIGINAL ASSIGNMENT
==================================================

Company: Lumenci

Product: iLumos

iLumos is an AI-powered chat interface for patent infringement analysis.

Patent analysts upload claim charts — tables that map patent claims to accused product features with supporting evidence.

The analyst then uses conversational AI to refine the claim chart by:
- improving accuracy
- strengthening evidence
- improving reasoning
- identifying missing features
- clarifying legal language

The refined claim chart can ultimately be exported to Word for legal proceedings.

The task is:

DESIGN AND PROTOTYPE THE AI CHAT-BASED CLAIM CHART REFINEMENT EXPERIENCE.

==================================================
2. DOMAIN CONTEXT
==================================================

A patent claim is a legal statement defining what a patent protects.

Each claim consists of claim elements.

In infringement analysis, analysts create claim charts mapping each claim element to:
1. The corresponding accused product feature
2. Supporting evidence / AI reasoning

Example:

Patent:
US123456

Accused product:
Acme Corp Thermostat

Example claim chart columns:

COLUMN 1:
Patent Claim Element

COLUMN 2:
Accused Product Feature

COLUMN 3:
AI Reasoning / Evidence

Example rows include:

1.
Claim element:
A temperature control device with a wireless communication module

Accused feature:
Acme Thermostat product

Evidence:
The Acme device has WiFi capability and the product page states:
"WiFi-enabled smart thermostat connects to your home network."

2.
Claim element:
A motion sensor for detecting occupancy

Accused feature:
Acme technical specifications

Evidence:
The specifications state that the built-in motion sensor detects when people are home.

3.
Claim element:
Machine learning algorithm that learns user temperature preferences

Accused feature:
Acme marketing materials

Evidence:
The marketing material says:
"Auto-Schedule learns your preferred temperatures."

However, the technical implementation details of the machine learning system are not disclosed.

This third example is intentionally weaker and should be useful for demonstrating AI refinement.

==================================================
3. COMMON USER SCENARIOS
==================================================

The assessment explicitly gives these refinement scenarios:

A. Strengthen evidence

Example:
"Add technical documentation for the motion sensor claim."

B. Fix weak reasoning

Example:
"The AI reasoning for element 3 is vague, need more specific technical analysis."

C. Add missing features

Example:
"AI missed that Acme also has a temperature sensor array."

D. Clarify legal language

Example:
"Rewrite the reasoning to address potential claim construction arguments."

==================================================
4. REQUIRED USER FLOW
==================================================

Create a complete end-to-end flow showing:

1. Analyst opens iLumos
2. Analyst starts a new claim-chart analysis
3. Analyst uploads the claim chart
4. Analyst uploads supporting product documentation
5. System processes the documents
6. Analyst can configure system instructions/prompts
7. System displays the 3-column claim chart
8. Analyst reviews the existing chart
9. Analyst enters a conversational refinement request
10. AI analyses the request and relevant chart/document context
11. AI responds with specific suggested improvements
12. AI clearly indicates which claim element is affected
13. Analyst reviews the suggestion
14. Analyst can accept the refinement
15. Analyst can reject the refinement
16. Analyst can modify/refine it through further chat
17. Updated claim chart is displayed
18. Analyst can continue iterating
19. Analyst exports the final refined chart to Word

The flow MUST also include the following three edge cases required by Lumenci:

EDGE CASE 1:
AI gives wrong evidence.

Expected behavior:
- Analyst identifies that evidence is incorrect
- Analyst tells AI through chat
- AI acknowledges/corrects the evidence
- Updated evidence is shown
- Analyst remains the final reviewer

EDGE CASE 2:
User wants to undo a previous refinement.

Expected behavior:
- Analyst asks to undo/revert the previous refinement
- System identifies the relevant previous change
- System restores the previous version
- Chat confirms what was reverted

EDGE CASE 3:
AI cannot find sufficient evidence.

Expected behavior:
- AI does NOT invent evidence
- AI tells analyst that sufficient evidence could not be found
- AI asks the analyst for guidance
- Analyst can upload technical documentation OR provide a URL
- The system indicates that the new source will be used for further analysis

This edge case is particularly important because it demonstrates responsible AI behavior.

==================================================
5. PROTOTYPE REQUIREMENTS
==================================================

Build a functional browser-based prototype.

The prototype MUST demonstrate the complete core interaction.

Required capabilities:

A. Initial setup

Show a clean starting screen for iLumos.

Allow the user to:
- upload a claim chart
- upload product documentation
- configure system instructions/prompts

Authentication is NOT required.

B. Claim chart

After setup, show a 3-column claim chart:

Patent Claim Element
Accused Product Feature
AI Reasoning / Evidence

Use the Acme thermostat example data above.

C. Chat interface

Provide a prominent chat interface.

The analyst should be able to type a request such as:

"The AI reasoning for the ML algorithm element is weak - add more technical details."

The AI should respond with a realistic product-style response.

The response should:
- identify the affected claim element
- explain the suggested refinement
- distinguish evidence from inference
- indicate confidence/limitations where appropriate
- provide an action such as Apply / Reject / Modify

D. Refinement

When the analyst accepts a refinement:
- update the relevant row in the claim chart
- visibly indicate that the row changed
- preserve the previous state internally so it can be undone

When the analyst rejects:
- keep the original chart unchanged

When the analyst modifies:
- allow another chat turn

E. Version / Undo

Implement a simple version history mechanism.

The UI should allow:
- viewing recent changes
- undoing the latest refinement
- showing what was changed

F. Evidence handling

The prototype should NEVER pretend that unsupported evidence is factual.

For demonstration purposes, use clearly labelled mock/sample evidence.

When the AI lacks evidence:
show something similar to:

"I couldn't find sufficient technical evidence in the uploaded materials to support this claim. I don't want to infer implementation details that aren't documented. You can upload additional technical documentation or provide a product URL for further analysis."

Then provide:
- Upload documentation
- Add URL

G. Wrong evidence correction

Create a demonstration path where the analyst says:

"This evidence is incorrect. The product documentation does not say that."

The AI should respond appropriately and allow the analyst to provide/correct the evidence.

H. Export

Provide an "Export to Word" button.

It does not need to implement a production-quality Word export engine.

A realistic prototype interaction is sufficient.

If actual .docx generation is practical, implement it.

Otherwise provide a convincing simulated export interaction and clearly document the prototype limitation.

==================================================
6. PRODUCT UX
==================================================

Design the interface as a professional B2B/legal-tech product.

Avoid:
- flashy gradients
- unnecessary animations
- gaming-style UI
- excessive AI gimmicks
- overly futuristic design
- irrelevant dashboards

Prioritize:
- readability
- information hierarchy
- trust
- evidence visibility
- clear distinction between AI suggestions and analyst-approved content
- efficient review
- professional enterprise UX

The analyst is an expert user.

Do not design the product as if the user needs basic explanations of patents.

The product should feel like a productivity tool for an experienced patent analyst.

Suggested layout:

LEFT:
Analysis / document context

CENTER:
Claim chart

RIGHT:
AI chat / refinement assistant

OR another layout if your UX reasoning shows something better.

Choose the layout deliberately and explain why.

==================================================
7. AI UX PRINCIPLES
==================================================

This is an AI product, not just a chatbot.

The UX should demonstrate:

1. Human-in-the-loop review
2. Evidence-grounded suggestions
3. Clear uncertainty
4. No unsupported claims
5. Reversible changes
6. Traceability of refinements
7. Conversational iteration
8. Analyst remains the final decision maker

Do NOT display hidden chain-of-thought.

Instead provide concise, user-facing reasoning such as:

"Based on the uploaded Acme technical documentation, the motion sensor claim can be strengthened by citing the documented occupancy-detection behavior."

Use source/evidence references where possible.

==================================================
8. PRODUCT ASSUMPTIONS
==================================================

Where the assignment does not specify implementation details, make reasonable assumptions.

Document these assumptions.

Potential assumptions:

- One analyst works on one claim chart at a time.
- Uploaded documents are associated with the current analysis.
- The AI operates only on uploaded/source material for the prototype.
- Claim-chart edits are versioned.
- Analyst approval is required before a refinement becomes part of the final chart.
- Evidence can be added through uploaded documents or URLs.
- Authentication is outside MVP scope.
- Complex legal validation is outside MVP scope.
- Full production document parsing is outside MVP scope.

Do not invent unnecessary features.

==================================================
9. MVP SCOPE
==================================================

Keep the MVP tightly scoped.

IN SCOPE:

- Upload claim chart
- Upload product documentation
- System instructions
- 3-column claim chart
- Conversational refinement
- AI suggestions
- Accept/reject/modify
- Version history
- Undo
- Evidence correction
- Missing-evidence workflow
- Export interaction

OUT OF SCOPE:

- Authentication
- Multi-user collaboration
- Production-grade document processing
- Full legal research
- Automated legal conclusions
- Complete patent database integration
- Production web scraping infrastructure
- Billing
- Admin management
- Advanced analytics
- Enterprise permissions

Do not waste time building these.

==================================================
10. TECHNICAL IMPLEMENTATION
==================================================

Use the simplest reliable stack available in the environment.

Prefer:

React / Next.js
TypeScript
Tailwind CSS

Use local mock state/data unless a real backend is genuinely necessary.

Do NOT introduce unnecessary infrastructure.

The prototype must be:
- easy to run
- easy to deploy
- stable
- understandable
- visually convincing

If an LLM API is available, it may be integrated.

However, the prototype MUST still work without an external LLM API.

Therefore build deterministic fallback/mock AI responses for the required demo scenarios.

This is important because the assessment evaluates product thinking rather than production LLM infrastructure.

==================================================
11. DEMO DATA
==================================================

Create realistic demo data based on:

Patent:
US123456

Accused product:
Acme Corp Thermostat

Claim elements:

ELEMENT 1:
"A temperature control device with a wireless communication module"

Feature:
"Acme Thermostat wireless connectivity"

Evidence:
"WiFi-enabled smart thermostat connects to your home network."

ELEMENT 2:
"A motion sensor for detecting occupancy"

Feature:
"Built-in occupancy detection"

Evidence:
"Acme technical specifications state that the built-in motion sensor detects when people are home."

ELEMENT 3:
"Machine learning algorithm that learns user temperature preferences"

Feature:
"Auto-Schedule"

Evidence:
"Acme marketing materials state that Auto-Schedule learns your preferred temperatures."

IMPORTANT:
The third element has weaker evidence because technical implementation details are not disclosed.

Use this weakness to demonstrate refinement.

==================================================
12. REQUIRED DEMO SCENARIO
==================================================

The prototype must make this scenario extremely easy to demonstrate:

STEP 1
User uploads claim chart.

STEP 2
User uploads product documentation.

STEP 3
Claim chart appears.

STEP 4
User opens chat.

STEP 5
User sends:

"The AI reasoning for the ML algorithm element is weak - add more technical details."

STEP 6
AI responds with a useful refinement suggestion.

STEP 7
AI clearly states that the uploaded material supports the learning behavior but does not disclose the underlying ML implementation.

STEP 8
User accepts the suggestion.

STEP 9
Claim chart updates.

STEP 10
User asks:

"Undo that refinement."

STEP 11
The previous state is restored.

STEP 12
User asks:

"Find stronger evidence for the motion sensor claim."

STEP 13
System demonstrates evidence refinement.

STEP 14
Demonstrate the missing-evidence scenario.

STEP 15
Export final chart.

This sequence should be smooth enough to record in a 2-minute prototype walkthrough.

==================================================
13. USER FLOW DIAGRAM
==================================================

Create a vertical user-flow diagram.

It MUST include:

Start
↓
Upload claim chart
↓
Upload product documentation
↓
Configure instructions
↓
Process documents
↓
Display claim chart
↓
Chat refinement request
↓
AI analyses context
↓
AI suggestion
↓
Analyst review
↓
Accept / Reject / Modify
↓
Updated chart
↓
Iterate
↓
Export

Include explicit branches for:

Wrong evidence
→ Analyst corrects
→ AI updates

Undo refinement
→ Restore previous version

Evidence unavailable
→ AI asks for documentation/URL
→ Analyst provides source
→ Continue analysis

Make the diagram clean and readable when exported as a PDF/image.

Use Mermaid if useful, but also generate a final visual/exportable version.

==================================================
14. PRD
==================================================

Create a ONE-PAGE PRD.

It must contain exactly the categories requested by the assessment:

1. Problem Statement

2. User Stories

Use format:

"As a patent analyst, I want to..."

Include 3-5 strong user stories.

3. Core Features

Clearly separate:
MVP / In Scope
Out of Scope

4. Key Decisions

Include 2-3 important product decisions.

Examples:

Decision 1:
Human approval before chart changes become final.

Why:
Patent analysis is high-stakes and AI suggestions should remain reviewable rather than silently modifying legal work.

Decision 2:
Evidence-first AI responses.

Why:
The system should distinguish documented evidence from inference and avoid fabricating technical details.

Decision 3:
Versioned refinements with undo.

Why:
Conversational iteration should be reversible and reduce the risk of losing a previously valid analysis.

5. Acceptance Criteria

Make every criterion testable.

Example:

"Given a claim chart and product documentation, when the analyst submits a refinement request, the system displays an AI suggestion referencing the affected claim element."

6. Success Metrics

Use product metrics, not vanity metrics.

Possible examples:

- Refinement acceptance rate
- Time required to refine a claim chart
- Percentage of AI suggestions with supporting evidence
- Analyst correction rate
- Undo/reversion rate
- Evidence retrieval success rate

Do NOT fabricate actual performance numbers.

These are target metrics, not achieved results.

The PRD must fit on one page.

==================================================
15. PRODUCT THINKING
==================================================

Do not make the product merely:

"ChatGPT + table."

The central product insight should be:

Conversational AI is useful because patent analysts refine reasoning iteratively, but the final claim chart must remain controlled, traceable and reviewable.

Therefore:

CHAT = interaction layer

AI = suggestion/refinement layer

EVIDENCE = grounding layer

CLAIM CHART = source-of-truth working artifact

ANALYST = final decision maker

VERSION HISTORY = safety/reversibility layer

Make this architecture apparent in the UX.

==================================================
16. DOCUMENTATION
==================================================

Create:

/docs/PRD.md
/docs/USER_FLOW.md
/docs/VIDEO_WALKTHROUGH.md
/docs/PRODUCT_DECISIONS.md
/docs/ASSUMPTIONS.md

Also create the final submission artifacts where practical:

/submission/
    PRD_Lumenci_Prajwal_Skanda.pdf
    UserFlow_Lumenci_Prajwal_Skanda.pdf
    VIDEO_SCRIPT_Lumenci_Prajwal_Skanda.md

If generating PDF files directly is difficult, create print-ready Markdown/HTML source and explain how to export them.

==================================================
17. VIDEO WALKTHROUGH REFERENCE
==================================================

Create a concise video walkthrough script under 3 minutes.

Target:

~45-60 seconds:
User flow

~90-120 seconds:
Prototype demo

The script should sound like a real candidate explaining their product.

Do NOT make it sound like marketing copy.

Suggested structure:

"iLumos is designed around a simple idea: patent analysts should be able to refine claim charts conversationally without losing control over the final evidence."

Then:

1. Show upload
2. Show chart
3. Show refinement request
4. Show AI response
5. Accept change
6. Show updated chart
7. Demonstrate undo
8. Briefly demonstrate missing evidence
9. Show export

Also explain the key product decision:

"The AI proposes changes, but the analyst remains the final reviewer."

Create a natural speaking script that I can use as reference rather than something I must read word-for-word.

==================================================
18. FINAL QA
==================================================

Before declaring the task complete, perform a full QA pass.

Check:

[ ] Application runs
[ ] No broken buttons
[ ] Upload flow works
[ ] Claim chart displays correctly
[ ] Three columns are visible
[ ] Chat works
[ ] Refinement scenario works
[ ] Accept works
[ ] Reject works
[ ] Modify works
[ ] Undo works
[ ] Wrong evidence scenario works
[ ] Missing evidence scenario works
[ ] Upload-document/URL recovery path exists
[ ] Export interaction works
[ ] UI looks professional
[ ] No unnecessary features
[ ] No authentication
[ ] No fake production claims
[ ] No unsupported evidence presented as fact
[ ] User flow contains all required branches
[ ] PRD contains all required sections
[ ] PRD fits one page
[ ] Video script is under 3 minutes
[ ] All submission artifacts are clearly named

==================================================
19. VERY IMPORTANT: DO NOT OVERBUILD
==================================================

This is a hiring assessment.

Do not spend time building:
- complex backend infrastructure
- authentication
- database systems
- production document parsing
- real patent search engines
- complicated web scraping
- elaborate AI orchestration
- unnecessary animations
- huge design systems

Prioritize the experience that the reviewer will actually see.

The reviewer should immediately understand:

"Ah, this candidate understands how conversational AI should work in a high-stakes professional workflow."

==================================================
20. OUTPUT FROM YOU
==================================================

At the end, provide me with:

1. Working prototype
2. Exact run/deployment instructions
3. Public deployment instructions/link if deployment is available
4. Final PRD
5. Final user-flow diagram
6. Video walkthrough script
7. Product assumptions
8. Product decisions and rationale
9. MVP vs out-of-scope list
10. QA report
11. A 5-minute explanation for me covering:
    - Why this UX?
    - Why chat?
    - Why human-in-the-loop?
    - How did you handle hallucination/evidence?
    - How does undo work?
    - What would you build next?
    - What are the biggest limitations?
    - What questions might a Product Manager interviewer ask?

IMPORTANT:
Do not merely tell me what I should build.

Actually create the prototype and files in the workspace.

Work iteratively:
1. Analyse
2. Plan
3. Build
4. Test
5. Fix
6. Generate deliverables
7. Perform final QA

Do not stop after creating a plan.

Start now.
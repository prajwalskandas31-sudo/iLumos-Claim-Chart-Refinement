# Video Walkthrough Script: iLumos AI Claim Chart Refinement

**Product**: iLumos (Lumenci)  
**Target Duration**: Under 3 minutes (~2 min 45 sec)  
**Speaker**: Prajwal Skanda (Product Manager Candidate)  

---

## Part 1: Product Philosophy & User Flow (~50 seconds)

**[SCENE: Presenter on camera or showing User Flow Diagram]**

> *"Hi everyone, I’m Prajwal Skanda, and today I’m presenting iLumos—an AI-powered claim chart refinement workspace designed for Lumenci.*
> 
> *When patent analysts prepare infringement claim charts for litigation, they face a fundamental problem with traditional LLMs: standard chatbots generate ungrounded inferences, lack version control, and alter legal work silently.*
> 
> *Our central product insight is that **conversational AI should act as an interactive refinement layer**, while the **3-column claim chart remains the controlled source of truth**, with the **analyst as the final decision maker**.*
> 
> *Here is the core user flow: The analyst ingests the claim chart and product documentation, configures system grounding rules, and reviews the initial 3-column table. Through conversational chat, the analyst requests specific refinements. The AI responds with structured suggestion cards distinguishing direct quotes from technical inferences. The analyst can accept, reject, or modify every change, with a complete version stack supporting instant undo. Finally, the refined chart is exported to Word for legal proceedings."*

---

## Part 2: Prototype Walkthrough (~120 seconds)

**[SCENE: Screen recording of iLumos Browser Prototype]**

> *"Let’s look at the working prototype.*
> 
> **[0:50 - 1:10 | Setup & Initial Chart]**  
> *Here on the starting screen, the analyst uploads the claim chart and supporting technical documentation—in this case, Patent US123456 versus the Acme Corp Thermostat. We also set our system prompt strictness to require strict document quotes under Phillips claim construction.*
> 
> *Upon entering the workspace, we see a clean 3-pane split layout:*  
> *- On the **Left**, our indexed evidence sources and grounding rules.*  
> *- In the **Center**, the 3-column working claim chart.*  
> *- On the **Right**, the AI Refinement Assistant.*
> 
> *Notice Element 1[c]—the Machine Learning claim—is flagged with 'Weak Technical Evidence' because public marketing text doesn't disclose algorithm implementation.*
> 
> **[1:10 - 1:45 | Refinement Request & Accept]**  
> *I’ll click our quick prompt chip: **'The AI reasoning for the ML algorithm element is weak - add more technical details.'***  
> 
> *The AI analyzes our context and outputs a structured suggestion card. Notice the clear **Grounding Tag: Technical Inference**. It explicitly states that while public whitepapers confirm Auto-Schedule learning behavior, underlying model hyperparameters remain undisclosed, and suggests requesting source code discovery. I click **'Apply to Chart'**—the row highlights in green, confidence updates, and version advances to v2.0.*
> 
> **[1:45 - 2:15 | Undo & Edge Cases]**  
> *Now, what if the analyst wants to reverse this change? I simply type **'Undo that refinement.'** Instantly, the state stack reverts the chart back to v1.0, restoring our original evidence.*
> 
> *Let's test responsible AI behavior under Edge Case 3: I ask for internal PCB circuit schematics. Notice the AI does not invent fake circuit diagrams—it presents an explicit **Grounding Notice** refusing to hallucinate and prompts me to upload additional technical documents or supply a URL.*
> 
> **[2:15 - 2:40 | Export to Word]**  
> *Finally, once the analyst is satisfied, clicking **'Export to Word'** generates a fully formatted, publication-ready Microsoft Word `.docx` document ready for litigation proceedings."*

---

## Part 3: Wrap-Up & Key Takeaways (~15 seconds)

**[SCENE: Presenter on camera]**

> *"To summarize: iLumos combines conversational iteration with legal-grade evidence grounding and total analyst control. Thank you for your time!"*

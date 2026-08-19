# Product & Technical Assumptions: iLumos MVP

**Product**: iLumos (Lumenci)  
**Author**: Prajwal Skanda  
**Role Target**: Product Manager  

---

## 1. Domain & Operational Assumptions
1. **Single-Analyst Workflow**: A single patent analyst works on one claim chart at a time during a refinement session. Multi-user concurrent editing is reserved for v2.0 enterprise scope.
2. **Target Audience Expertise**: The analyst is an experienced legal engineer or patent professional. The UI avoids elementary patent tutorials and focuses on high-efficiency legal productivity tools.
3. **Legal Work Product Target**: The final target artifact is a publication-ready Microsoft Word (`.docx`) claim chart intended for internal legal counsel review or official court filings in patent litigation.

---

## 2. Technical & Data Assumptions
1. **Document Grounding Boundary**: The AI operates exclusively on ingested claim charts (`.xlsx`/`.csv`), technical specification PDFs, whitepapers, and user-provided URLs for web scraping.
2. **Anti-Hallucination Policy**: If requested technical components (e.g., internal PCB circuit schematics) are absent from ingested sources, the AI explicitly declaration refusal and prompts the analyst for file upload rather than fabricating engineering details.
3. **Dual AI Execution Architecture**: 
   - **Simulation Mode (Default)**: Provides 100% deterministic, zero-dependency testing for assessment reviewers without requiring API keys or incurring credit card costs.
   - **Live API Integration**: Supports Google Gemini 1.5 Flash (Free Tier) and OpenAI GPT-4o via user-configured REST API keys.
4. **Rate Limit (HTTP 429) & Auto-Fallback Handling**: Evaluators testing free tier APIs (e.g., Gemini's 15 Requests/Min quota) are protected by a rate limit monitor that displays an amber quota warning and automatically falls back to the deterministic legal engine.
5. **Authentication & Enterprise Security**: Enterprise SSO, role-based access control (RBAC), and persistent cloud backend database storage are excluded from the initial browser prototype scope.

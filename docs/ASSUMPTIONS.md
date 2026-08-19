# Product & Technical Assumptions: iLumos MVP

**Product**: iLumos (Lumenci)  
**Author**: Prajwal Skanda  

---

## 1. Domain & Operational Assumptions
1. **Single-Analyst Workflow**: A single patent analyst works on one claim chart at a time during a refinement session. Multi-user concurrent editing is reserved for v2.0.
2. **Target Audience Expertise**: The analyst is an experienced legal engineer or patent professional. The UI avoids elementary patent tutorials and focuses on high-efficiency productivity tools.
3. **Legal Proceedings Scope**: The final target artifact is a formatted Word (`.docx`) claim chart intended for internal legal review or official court filings.

---

## 2. Technical & Data Assumptions
1. **Document Grounding Boundary**: The AI operates exclusively on uploaded claim charts, specification PDFs, and user-provided URLs for the current session.
2. **Local Mock State for Assessment Stability**: To ensure 100% deterministic test execution for assessment reviewers without external API rate-limit dependencies, the prototype uses stateful local simulation alongside direct `.docx` document generation.
3. **Authentication & Security Out of Scope**: Enterprise SSO, role-based access control (RBAC), and persistent database storage are omitted from the initial MVP prototype scope.

# Why Portotify?

**Updated:** 25 April 2026

---

## The Problem

Every company adopting AI faces the same question:

> "How do we know this AI output is safe to act on?"

Current solutions either:
- Trust the model blindly (dangerous)
- Add monitoring after the fact (too late)
- Build custom guardrails per use case (expensive and fragile)

None of these solve the fundamental problem: **there is no governance layer between the AI decision and the business action.**

---

## What Portotify Does

Portotify sits at the **decision boundary**. It evaluates every AI-generated output before it propagates.

The protocol decides: **allow**, **block**, or **require human review**.

This is not post-hoc monitoring. This is **pre-propagation governance**.

---

## How It Works

```
AI System generates output
    ↓
Portotify evaluates:
    → Is the input sufficient? (Decision Readiness Gate)
    → Is the output safe? (Manipulation + Opinion Language Guard)
    → Does the output stay in scope? (Domain Output Guard)
    → Is the risk acceptable? (Risk Tier + Admissibility Boundary)
    ↓
Verdict: ALLOW / BLOCK / REVIEW_REQUIRED
    ↓
Immutable decision record written (audit trail)
    ↓
Controlled response returned to consumer
```

Every step is **deterministic**. No probabilistic safety. No "best effort." No silent failures.

---

## What Makes Portotify Different

### 1. Fail-Closed by Default

If the system cannot determine safety with certainty, it blocks. Not "degrades gracefully." Blocks.

### 2. Deterministic, Not Probabilistic

Every governance decision is reproducible from code and inputs. No model-generated policy. No "AI safety by AI."

### 3. Decision Readiness Gate

Before analysis even begins, the system checks: **is there enough data to produce a meaningful result?**

- 9 domains, each with enum-constrained gap codes
- Missing critical data → BLOCK with specific guidance on what's needed
- Unknown gap codes → BLOCK (contract violation)
- LLM does not decide sufficiency — the backend rule engine does

### 4. Immutable Decision Evidence

Every decision is:
- Append-only (never updated)
- Versioned with explicit lineage
- Traceable from input to output to verdict

Override creates a new decision version — the original is never mutated.

### 5. EU AI Act Ready

Framework mapping for high-risk AI systems:
- Annex III.4 — Employment (HR Tech, Career)
- Annex III.5 — Essential Services (Finance, Insurance)
- Annex III.5a — Insurance Context (Health)
- Annex III.5c — Insurance Claims

EU AI Act full enforcement: **August 2026**.

### 6. Multi-Layer Output Safety

- **Manipulation detection:** 15 compound patterns (EN + TR)
- **Opinion language guard:** Portotify does not express opinions — subjective qualifiers are blocked
- **Domain output guards:** Finance (investment advice blocked), Credit (score assertions blocked), HR Tech (bias proxy blocked), Insurance (payout verdicts blocked), Legal (legal conclusions blocked)
- **Assertive claim guard:** Speculative language without evidence anchoring is blocked

### 7. Not Single-Shot — Journey Governed

Portotify enforces multi-step execution journeys:
- Each step chains to the next via `parent_execution_id`
- Wrong next step → blocked
- Terminal step continuation → blocked
- Cross-domain transitions only through approved catalog

---

## 9 Active Domains

| Domain | Use Case | EU AI Act |
|---|---|---|
| Credit | Applicant profile analysis, risk detection | Annex III.5b |
| HR Tech | Candidate evaluation, employment risk | Annex III.4 |
| Insurance Claims | Claim profile extraction, coverage risk | Annex III.5c |
| Finance | Financial summary, risk exposure | Annex III.5 |
| Health | Health summary, risk detection | Annex III.5a |
| Insurance | Policy analysis, coverage gaps | Annex III.5 |
| Legal | Contract analysis, risk detection, clause gaps | — |
| Career | CV analysis, skill gaps, interview prep | — |
| Decision | Situation analysis, risk detection, context gaps | — |

---

## Who Is This For?

**Primary buyer:** CFO / CTO of companies deploying AI in regulated or high-stakes contexts.

**Use cases:**
- Financial institutions using AI for credit decisions
- Insurance companies using AI for claims processing
- HR departments using AI for candidate screening
- Healthcare organizations using AI for patient data analysis
- Any organization that needs to prove their AI decisions are governed, auditable, and compliant

---

## The Portotify Manifesto

> "Portotify does not promise perfection. It makes imperfection visible."

We do not make AI smarter. We ensure that imperfect AI cannot produce uncontrolled outcomes.

---

## Learn More

🌐 [portotify.com](https://portotify.com)
📧 info@portotify.com

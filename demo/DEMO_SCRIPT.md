# PORTOTIFY — Demo Script (5 Minutes)

**Updated:** 25 April 2026

**Audience:** CTO, CFO, Founder, Technical Decision Maker

**Environment:** Local or controlled staging with `ENGINE_PROVIDER=mock`

---

## STEP 1 — What Is Portotify? (30s)

**Narration:**

"Portotify is not a chatbot wrapper. It is a governance protocol that decides whether AI output is allowed, blocked, or controlled — before it reaches anyone.

The model is not the authority. The governance boundary is the authority. If the system cannot determine safety, it stops."

**Key message:** Fail-closed. Deterministic. Auditable.

---

## STEP 2 — Governed Execution: Credit Domain (60s)

**Scenario:** Credit applicant profile analysis with sufficient data.

**Request:**
```json
{
  "domain": "credit",
  "intent": "credit_profile_analysis",
  "version": "v1",
  "inputs": {
    "applicant_text": "Applicant reports annual income of 85,000 EUR from employment at a technology company. Monthly mortgage payment of 1,200 EUR. Credit card balance of 3,500 EUR across two cards. Savings account with 15,000 EUR. No outstanding loans reported. Employment tenure of 4 years."
  },
  "controls": {
    "has_external_write": false
  }
}
```

**Show:**
- Response succeeds with `status: completed`
- Output contains structured analysis with `profile_data_gaps` (enum codes, not free text)
- `governance_verdict: allow`
- `decision_capsules_v2` record created (immutable)
- `suggested_next_intent` points to next step in journey

**Narration:** "The system analyzed the input, found sufficient data, and allowed the execution. Every field in the output is schema-bound. The decision is now an immutable audit record."

---

## STEP 3 — Decision Readiness Gate: Insufficient Data (60s)

**Scenario:** Same domain, but input is missing critical information.

**Request:**
```json
{
  "domain": "credit",
  "intent": "credit_profile_analysis",
  "version": "v1",
  "inputs": {
    "applicant_text": "Applicant wants a loan."
  },
  "controls": {
    "has_external_write": false
  }
}
```

**Show:**
- Response blocked: `reason_code: INSUFFICIENT_DATA_CRITICAL_GAPS`
- `profile_data_gaps` lists exactly what's missing (enum codes)
- Block guidance tells the user what to provide
- No LLM involvement in the block decision — pure backend rule

**Narration:** "This is the Decision Readiness Gate. The system checked: is there enough data to produce a meaningful result? The answer was no. It blocked — not with a vague error, but with specific guidance on exactly what's missing. The LLM never ran. The backend decided."

---

## STEP 4 — External Action Invariant (45s)

**Scenario:** Valid request, but external write flag is set.

**Request:**
```json
{
  "domain": "career",
  "intent": "cv_analysis",
  "version": "v1",
  "inputs": {
    "cv_text": "Backend engineer with Python and REST API experience. 5 years at major tech companies."
  },
  "controls": {
    "has_external_write": true
  }
}
```

**Show:**
- Deterministic BLOCK
- `reason_code: POLICY_BLOCK`
- `controls.blocked: true`
- No execution, no LLM call

**Narration:** "If external action is requested, the system blocks. Always. The model cannot override this. This is a governance invariant, not a suggestion."

---

## STEP 5 — Opinion Language Guard (45s)

**Scenario:** LLM tries to express an opinion in the output.

**Show** (use recorded evidence or mock output):
- LLM output contains "the profile is quite strong" or "this is a solid financial position"
- `PB1_OPINION_LANGUAGE` guard triggers
- Response blocked with `reason_code` indicating opinion language violation

**Narration:** "Portotify does not express opinions. If the LLM uses subjective qualifiers — strong, solid, excellent, promising — the output is blocked. This is enforced across all 9 domains, deterministically."

---

## STEP 6 — Multi-Domain Coverage (45s)

**Show** (quick fire — one request each, show domain diversity):

| Domain | Intent | Input Field |
|---|---|---|
| Finance | financial_summary_analysis | financial_text |
| Health | health_summary_analysis | health_text |
| Legal | contract_analysis | contract_text |
| Insurance Claims | claim_profile_extraction | claim_text |

**Narration:** "Portotify is not a single-use tool. It governs AI decisions across 9 industry domains — each with its own gap codes, output guards, and compliance mapping. Same governance protocol, different domain expertise."

---

## STEP 7 — Immutable Evidence (45s)

**Show:**
- Decision capsule record (decision_id, governance_verdict, risk_tier)
- No raw LLM output stored — only hash
- Override creates new version with `parent_decision_id` lineage
- Human review (accept/reject) creates new decision, never mutates original

**Narration:** "Every governance decision is immutable. If someone overrides it, the original stays. A new version is created with explicit lineage. This is not a log — it is audit-grade evidence."

---

## STEP 8 — EU AI Act Readiness (30s)

**Show:**
- `framework_mapping` in execute response
- Annex III.4 (HR Tech), Annex III.5 (Finance, Insurance), Annex III.5c (Insurance Claims)

**Narration:** "EU AI Act full enforcement begins August 2026. Portotify already maps every execution to the relevant regulatory framework. This is not documentation — it is runtime compliance evidence."

---

## CLOSE (30s)

**Core message:**

"Portotify does not make AI smarter. It ensures that imperfect AI cannot produce uncontrolled outcomes.

It is:
- Fail-closed — unknown states block, not pass
- Deterministic — every decision is reproducible
- Auditable — every decision is immutable evidence
- Compliant — EU AI Act framework mapping built in

The model changes. The governance boundary does not."

---

## Post-Demo Resources

- `examples/` — request payloads for all 9 domains
- `evidence/` — recorded governance responses
- `WHY_PORTOTIFY.md` — product overview
- [portotify.com](https://portotify.com) — website

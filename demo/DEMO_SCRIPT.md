# PORTOTIFY Demo Script (5 Minutes)

**Updated:** 18 June 2026

**Audience:** CTO, CFO, Founder, Technical Decision Maker

**Environment:** Local or controlled staging with `ENGINE_PROVIDER=mock`

---

## STEP 1: What Is Portotify? (30s)

**Narration:**

"Portotify is not a chatbot wrapper. It is a governance protocol that decides
whether a decision is allowed, blocked, or controlled, before it reaches
anyone. It does not matter whether a model, a rule engine, or a human produced
the decision.

The producer is not the authority. The governance boundary is the authority.
If the system cannot determine safety, it stops."

**Key message:** Fail-closed. Deterministic. Auditable.

---

## STEP 2: Governed Execution, Credit Domain (60s)

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
- Output contains structured analysis with enum-coded gaps, not free text
- `governance_verdict: allow`
- An immutable decision record is created
- A suggested next step points to the next intent in the journey

**Narration:** "The system analyzed the input, found sufficient data, and
allowed the execution. Every field in the output is schema-bound. The decision
is now an immutable audit record."

---

## STEP 3: Sufficiency Check, Insufficient Data (60s)

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
- Response blocked: insufficient data, with enum-coded gaps
- The block guidance tells the user exactly what to provide
- No engine involvement in the block decision, it is a pure backend rule

**Narration:** "Before analysis, the system checked whether there was enough
data to produce a meaningful result. The answer was no, so it blocked, not with
a vague error, but with specific guidance on exactly what is missing. The engine
never ran. The backend rule decided."

---

## STEP 4: External Action Invariant (45s)

**Scenario:** Valid request, but the external write flag is set.

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
- No execution, no engine call

**Narration:** "If external action is requested, the system blocks. Always. The
producer cannot override this. This is a governance invariant, not a
suggestion."

---

## STEP 5: Subjective Language Rejected (45s)

**Scenario:** The output tries to express an opinion.

**Show** (use recorded evidence or mock output):
- The output contains "the profile is quite strong" or "this is a solid
  financial position"
- The output is blocked for opinion language

**Narration:** "Portotify does not express opinions. If the output uses
subjective qualifiers, strong, solid, excellent, promising, it is blocked. This
is enforced across all 11 domains, deterministically."

---

## STEP 6: Multi-Domain Coverage (60s)

**Show** (quick fire, one request each, show domain diversity):

| Domain | Intent | Input Field | Demonstrates |
|---|---|---|---|
| Finance | financial_summary_analysis | financial_text | Investment advice boundary |
| Health | health_summary_analysis | health_text | Risk detection, gap codes |
| Legal | contract_analysis | contract_text | Clause gap analysis |
| Insurance Claims | claim_profile_extraction | claim_text | Coverage risk classification |
| Education | learning_gap_analysis | student_text | EU AI Act Annex III.3 scope |
| Courier / Last-Mile Delivery | account_suspension | rider_text | Automatic suspension blocked, human review enforced |

**Narration for Courier:** "This request flags a rider account for a policy
violation and asks the system to suspend it automatically. Portotify blocks the
automatic action and requires human review before any account-level decision is
executed. Platform Work Directive 2024/2831 mandates exactly this, no automated
account decisions without human oversight."

**Narration:** "Portotify is not a single-use tool. It governs decisions across
11 industry domains, each with its own gap codes, output boundaries, and
compliance mapping. Same governance protocol, different domain expertise."

---

## STEP 7: Immutable Evidence (45s)

**Show:**
- A decision record (decision_id, governance_verdict, risk_tier)
- No raw output stored, only a hash
- An override creates a new version with `parent_decision_id` lineage
- Human review (accept or reject) creates a new decision, never mutates the
  original

**Narration:** "Every governance decision is immutable. If someone overrides
it, the original stays. A new version is created with explicit lineage. This is
not a log, it is audit-grade evidence."

---

## STEP 8: EU AI Act Readiness (30s)

**Show:**
- `framework_mapping` in the execute response
- Annex III.3 (Education)
- Annex III.4 (HR Tech, Career, Courier / Last-Mile Delivery)
- Annex III.5 (Finance, Insurance)
- Annex III.5c (Insurance Claims)
- Platform Work Directive 2024/2831 (Courier)

**Narration:** "EU AI Act full enforcement begins August 2026. Portotify
already maps every execution to the relevant regulatory framework. This is not
documentation, it is runtime compliance evidence."

---

## CLOSE (30s)

**Core message:**

"Portotify does not make the decision smarter. It ensures that an imperfect
decision cannot produce an uncontrolled outcome.

It is:
- Fail-closed, unknown states block, not pass
- Deterministic, every decision is reproducible
- Auditable, every decision is immutable evidence
- Compliant, EU AI Act framework mapping built in

The producer changes. The governance boundary does not."

---

## Post-Demo Resources

- `examples/` — request payloads for all 11 domains
- `evidence/` — recorded governance responses
- `WHY_PORTOTIFY.md` — product overview
- [portotify.com](https://portotify.com) — website

---

## Evidence Notes

> `finance_execute.json`, `health_execute.json`, `insurance_execute.json`
> intentionally return BLOCKED. This is not an error: domain-specific output
> boundaries are active, and even mock output that violates the contract is
> blocked. This is proof that Portotify is not governance theater.
>
> `credit_02_drg_block.json`: demonstrates the sufficiency block. A
> production-engine block sample should be generated separately.

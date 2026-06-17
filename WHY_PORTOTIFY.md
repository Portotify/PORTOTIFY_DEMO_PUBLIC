# Why Portotify?

**Updated:** 18 June 2026

---

## The Problem

Every organization deploying automated decisions faces the same question:

> "How do we know this decision is safe to act on?"

It does not matter whether the decision came from an AI model, a statistical
model, a rule engine, or a human analyst. Current approaches either:
- Trust the producer blindly (dangerous)
- Add monitoring after the fact (too late)
- Build custom guardrails per use case (expensive and fragile)

None of these solve the fundamental problem: **there is no governance layer
between the decision and the business action.**

---

## What Portotify Does

Portotify sits at the **decision boundary**. It evaluates every decision
before it propagates, regardless of what produced it.

The protocol decides: **allow**, **block**, or **require human review**.

This is not post-hoc monitoring. This is **pre-propagation governance**.

---

## How It Works

```
A decision is produced (by a model, a rule engine, or a human)
    ↓
Portotify evaluates it at the boundary:
    → Is there enough information to decide?
    → Is the content within policy?
    → Does it stay in scope?
    → Is the risk acceptable?
    ↓
Verdict: ALLOW / BLOCK / REVIEW_REQUIRED
    ↓
Immutable decision record written (audit trail)
    ↓
Controlled response returned to the consumer
```

Every step is **deterministic**. No probabilistic safety. No "best effort."
No silent failures.

---

## What Makes Portotify Different

### 1. Fail-Closed by Default

If the system cannot determine safety with certainty, it blocks. Not "degrades
gracefully." Blocks.

### 2. Deterministic, Not Probabilistic

Every governance verdict is reproducible from rules and inputs. No
model-generated policy. No "AI safety by AI."

### 3. Independent of Vendor and Source

Vendor independent: the verdict does not depend on who supplies the decision
engine. OpenAI, Google, Anthropic, or an in-house model, the same governance
runs over each, with no vendor-specific branch in the verdict path.

Source independent: the decision being governed can come from a machine or a
human. The verdict is formed inside Portotify either way, and is never
delegated to the thing being governed.

We govern the decision, not the decision-maker.

### 4. Sufficiency Before Analysis

Before analysis begins, Portotify checks whether there is enough information to
produce a meaningful result. If not, it blocks with specific guidance on what
is missing, rather than returning a degraded answer. This check is a
deterministic backend rule, not a model judgment.

### 5. Immutable Decision Evidence

Every decision is:
- Append-only (never updated)
- Versioned with explicit lineage
- Traceable from input to output to verdict

An override creates a new decision version; the original is never mutated.
When a human reviews an escalated decision, accept or reject is recorded as a
new linked record through `parent_decision_id`, never an edit. This produces
evidence that human oversight was required and that it actually happened (EU AI
Act Article 14).

### 6. Output Safety

Multiple deterministic checks run on the output before it can propagate:
- Manipulation and override attempts are blocked.
- Subjective and opinion language is rejected. Portotify does not express
  opinions.
- Each domain enforces its own output boundaries: no investment advice, no
  credit-score assertions, no insurance payout verdicts, no legal conclusions.

The outcomes are public; the detection internals are not.

### 7. Journey Governed, Not Single-Shot

Portotify enforces multi-step decision journeys. Each step chains to the next;
an out-of-order or out-of-scope step is blocked. Cross-domain transitions are
allowed only through an approved catalog.

---

## 11 Active Domains

| Domain | Use Case | EU AI Act |
|---|---|---|
| Credit | Applicant profile analysis, risk detection | Annex III.5b |
| HR Tech | Candidate evaluation, employment risk | Annex III.4 |
| Insurance Claims | Claim profile extraction, coverage risk | Annex III.5c |
| Finance | Financial summary, risk exposure | Annex III.5 |
| Health | Health summary, risk detection | Annex III.5a |
| Insurance | Policy analysis, coverage gaps | Annex III.5 |
| Legal | Contract analysis, risk detection, clause gaps | — |
| Career | CV analysis, skill gaps, interview prep | Annex III.4 |
| Decision | Situation analysis, risk detection, context gaps | — |
| Education | Student assessment, learning gap analysis | Annex III.3 |
| Courier / Last-Mile Delivery | Rider assignment, performance evaluation, account suspension, platform deactivation | Annex III.4, Platform Work Directive 2024/2831 |

EU AI Act full enforcement: **2 August 2026**.

---

## Who Is This For?

**Primary buyer:** CFO / CTO of organizations deploying automated decisions in
regulated or high-stakes contexts.

**Use cases:**
- Financial institutions using automated credit decisions
- Insurance companies processing claims
- HR departments screening candidates
- Healthcare organizations analyzing patient data
- Gig economy platforms managing rider/driver and account decisions
- Any organization that needs to prove its decisions are governed, auditable,
  and compliant

---

## The Portotify Manifesto

> "Portotify does not promise perfection. It makes imperfection traceable."

We do not make the decision better. We ensure that an imperfect decision
cannot produce an uncontrolled outcome.

---

## Learn More

[portotify.com](https://portotify.com)
info@portotify.com

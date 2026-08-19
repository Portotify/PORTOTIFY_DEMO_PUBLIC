# PORTOTIFY Demo Script

**Updated:** 19 August 2026

**Audience:** CTO, CFO, Founder, Technical Decision Maker

**Environment:** Local or controlled staging with `ENGINE_PROVIDER=mock`

> This script demonstrates selected public-safe governance properties.  
> It does not represent every Portotify capability or every production path.

---

## STEP 1: What Is Portotify?

Portotify is runtime decision governance for consequential decision systems.

The producer may be an LLM, an ML model, an algorithm, a rule engine, a hybrid pipeline, or a human-supported system.

The producer can produce a result.

It does not grant itself governance authority.

Portotify evaluates whether that candidate result is admissible within the governed path and issues a governance verdict:

**ALLOW / BLOCK / REVIEW_REQUIRED**

Key message:

Capability is not authority.  
The producer is not the governance authority.

---

## STEP 2: Governed Execution

Use a public-safe example with sufficient context.

Show:

- structured execution output
- governance verdict
- decision state
- execution reference
- governance metadata

Narration:

"This candidate result passed the governance conditions represented by this intent and execution context.

ALLOW means this execution was admitted within this governed path.

It does not mean the result has universal authority outside that context."

---

## STEP 3: Insufficient Context

Use the recorded insufficient-data example.

Show:

- BLOCK outcome
- explicit gap information
- reason code
- no silent conversion of uncertainty into permission

Narration:

"The system did not turn missing critical context into an apparently authoritative answer.

Within this represented path, insufficient decision context produced a fail-closed governance outcome."

---

## STEP 4: Authority Boundary

Use the static external-write boundary artifact:

`data/boundary_critical_result.json`

This artifact represents a specific condition:

- external write present
- human review absent
- required controls unsatisfied
- verdict: BLOCK

Narration:

"This does not mean every external action is universally blocked.

It demonstrates a narrower rule: in this recorded boundary case, the required authority and controls were not established, so the proposed consequence was rejected fail-closed.

An external-action signal is not itself a governance verdict."

---

## STEP 5: Output and Scope Boundaries

Use selected recorded examples.

Show cases where governed output attempts to exceed the represented intent's permitted scope.

Narration:

"Different governed intents carry different boundaries.

Analysis does not automatically become recommendation.  
Recommendation does not automatically become decision.  
Decision does not automatically become execution.

These examples demonstrate selected boundaries.
They do not claim that every domain uses the same rule set."

---

## STEP 6: Decision-System and Domain Diversity

Show selected public-safe examples from several represented domains.

Explain that the repository contains examples or evidence material across:

- Career
- Courier / Last-Mile Delivery
- Credit
- Decision
- Education
- Finance
- Health
- HR Tech
- Insurance
- Insurance Claims
- Legal

Narration:

"The governance object is the decision, not the technology that produced it.

The producer may be an LLM, ML model, algorithm, rule engine, hybrid pipeline, or human-assisted system.

The governance requirements can differ by intent, domain, authority, and deployment context."

---

## STEP 7: Governed Evidence

Show a public-safe decision record or capsule artifact.

Show:

- verdict metadata
- risk metadata
- execution reference
- decision state
- available lineage information

Narration:

"Governance should leave evidence.

These artifacts make selected governance outcomes and lineage inspectable.

The public repository exposes only the evidence that is safe and appropriate to disclose. It is not the complete production record."

---

## STEP 8: Regulatory Mapping

Show regulatory metadata only where it exists in the selected artifact.

Narration:

"Portotify can associate governed use cases with regulatory concepts and framework mappings.

A mapping is not certification.

It is not legal advice and it does not prove that a deployment is compliant.

Regulatory classification depends on the actual use case and deployment context."

For the platform-work example:

"Directive (EU) 2024/2831 includes human-oversight requirements for automated management systems and requires certain decisions restricting, suspending, or terminating a platform-work relationship or account to be taken by a human.

This demo illustrates a governance boundary relevant to that requirement.
It does not constitute a legal conformity assessment."

---

## CLOSE

"Portotify does not make the producer authoritative merely because it produced a plausible result.

It governs whether a candidate decision may continue within a controlled path.

The producer can change.

LLM. ML. Algorithm. Rules. Hybrid. Human-assisted.

The governance question remains:

What was decided?  
Under which authority?  
Under which rules?  
Using what evidence?  
And was that decision allowed to continue?"

---

## Evidence Discipline

Demo claims must follow `PUBLIC_DISCLOSURE_POLICY.md`.

Recorded production evidence, mock evidence, static artifacts, benchmarks, and research findings are different evidence classes and must remain visibly distinguished.

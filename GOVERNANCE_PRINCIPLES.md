# Portotify Governance Principles

**Status:** Public Governance Principles  
**Updated:** 19 August 2026

## Purpose

This document describes the public governance principles that guide Portotify.

It is not a complete technical specification.

It does not disclose proprietary detection logic, internal prompts, enforcement mechanisms, security-sensitive implementation details, or the complete current research surface.

These principles describe governance boundaries and design commitments.

They must not be read as evidence that every principle has been independently demonstrated across every Portotify domain, intent, producer, or deployment.

For public claim rules, see `PUBLIC_DISCLOSURE_POLICY.md`.

---

## 1. The Decision Is the Governance Object

Portotify governs the consequential decision.

The producer may be:

- an LLM
- an ML model
- a statistical model
- an algorithm
- a rule engine
- a hybrid decision system
- a human-supported process

Changing the producer does not remove the governance question.

The source of a decision does not determine its authority.

---

## 2. Output Is a Candidate, Not Authority

A system can produce an answer, score, classification, recommendation, or decision.

Production alone does not make that result authoritative.

A plausible output is still a candidate until the applicable governance conditions have been evaluated within the governed path.

Correctness and authority are different properties.

---

## 3. Authority Requires Provenance

Authority must have an appropriate source.

A claim of authority is not sufficient evidence that authority exists.

In particular:

- model output does not create governance authority
- client input does not create governance authority
- an operator assertion does not automatically create governance authority
- an external system's conclusion does not automatically become Portotify authority
- a previous execution does not automatically provide authority for a later one

Portotify distinguishes the existence of information from the provenance of authority.

---

## 4. Authority Does Not Silently Escalate

Different activities can require different authority.

For example:

```text
ANALYZE
   ↓
RECOMMEND
   ↓
DECIDE
   ↓
EXECUTE
```

Authority at one level does not automatically grant authority at the next.

Permission to analyze does not imply permission to recommend.

Permission to recommend does not imply permission to decide.

Permission to decide does not automatically imply permission to execute an external effect.

Governed authority must remain within its permitted scope.

---

## 5. Client Assertions Cannot Manufacture Authority

A client may provide facts, evidence, context, preferences, or claimed permissions.

Those inputs may be relevant to governance.

They do not become governance authority merely because the client labels them as:

- approved
- authorized
- mandated
- reviewed
- compliant
- permitted

The claimed authority must be supported by the appropriate provenance for the governed purpose.

---

## 6. External Conclusions Are Not Portotify Attestations

Portotify may receive information or conclusions produced by external systems.

Passing that information through Portotify does not transform it into a Portotify certification, approval, validation, or attestation.

Examples include external claims that something is:

- compliant
- safe
- approved
- verified
- cleared
- legally valid
- authorized

Portotify authority must not be inferred merely from transit through the governance system.

---

## 7. Evidence Is Not Authority

Evidence can show that something happened.

That does not automatically establish authority for what should happen next.

For example:

- evidence that a review occurred is not permission for an unrelated action
- evidence that a previous decision was allowed is not permission for another decision
- evidence that an external system approved something is not automatically Portotify approval
- evidence describing an event does not itself establish authority for a different consequence

Evidence and authority may be related.

They are not interchangeable.

---

## 8. ALLOW Is Context-Bound

An ALLOW verdict belongs to the governance context in which it was formed.

It must not silently become permanent, transferable, or universally reusable permission.

A previous ALLOW does not automatically authorize:

- a different decision
- a different payload
- a different purpose
- a different external effect
- a later materially changed context

Authority used for a governed consequence must remain valid for the consequence it is intended to authorize.

This principle does not require one specific implementation mechanism.

Freshness may be established differently by different governed architectures.

---

## 9. Re-Evaluation Is Not Verdict Copying

A previous governance outcome is evidence about a previous governed execution.

Re-evaluation should not simply copy the authority of that earlier outcome into a new decision.

Where a decision is re-evaluated, the new governance outcome must be formed under the applicable conditions for that re-evaluation.

A prior result is context.

It is not a substitute for a new governance judgment where one is required.

---

## 10. Uncertainty Does Not Become Permission

When a required governance condition cannot be established, the governed path must not silently convert that uncertainty into authority.

Depending on the applicable intent and context, unresolved conditions may include:

- insufficient critical information
- unresolved authority provenance
- invalid governance state
- unsupported escalation of scope
- unsatisfied required controls
- incompatible policy conditions

Fail-closed governance does not mean perfect knowledge.

It means uncertainty does not automatically become permission.

---

## 11. Human Oversight Is a Governance Event

Human involvement must not be treated as an invisible escape hatch around governance.

Where human review or human authority is required, that involvement should remain distinguishable from automated authority.

The relevant governance evidence may include:

- that review was required
- who or what role performed the review
- the relationship to the governed decision
- the resulting governance outcome

Human review and persisted decision lifecycle are separate concepts.

---

## 12. Governance Outcomes Have an Enforcement Scope

A Portotify governance verdict is authoritative within the governed integration that applies it.

A BLOCK does not mean Portotify controls every unrelated system or every possible downstream route.

An ALLOW does not grant universal authority outside the governed context.

The scope of an enforcement claim must not exceed the scope of the governed integration.

---

## 13. Governance Should Leave Evidence

Consequential governance should be inspectable after the fact.

Governance evidence can include:

- the governed decision
- the governance verdict
- relevant reason information
- policy or authority context
- decision state
- execution reference
- available lineage

Evidence makes a governance event inspectable.

It does not make every interpretation of that evidence valid.

---

## 14. Public Evidence Must Preserve Its Limitations

Public evidence is only useful when its limitations remain visible.

Recorded production evidence, synthetic production evidence, mock responses, static artifacts, benchmarks, research findings, and regulatory mappings are different forms of evidence.

They must not be presented as equivalent.

A public artifact must not silently become proof of a broader claim than it supports.

---

## 15. Outcomes Can Be Public Without Publishing Mechanisms

Governance can be inspectable without disclosing proprietary implementation details.

Portotify may publish:

- outcomes
- boundaries
- invariants
- evidence classifications
- limitations
- negative findings

without publishing the internal mechanisms used to enforce those boundaries.

Public transparency does not require exposing controls in a way that weakens them.

---

## Core Principle

> A system may produce the decision.  
> It must not manufacture the authority that governs that decision.

Portotify separates production from authority, evidence from permission, and governance outcomes from the systems whose decisions are being governed.

# Portotify Public Evidence

**Runtime decision governance across AI, LLM, ML, algorithmic, and hybrid decision systems.**

> A correct output is not an authorized action.

[Launch the live public evidence replay](https://portotify.github.io/PORTOTIFY_DEMO_PUBLIC/)

**Updated:** 21 August 2026

---

## What This Repository Is

This repository is a **public evidence window into Portotify**.

It is deliberately limited.

It does not publish the Portotify core system, proprietary governance mechanisms, or the complete current research surface.

Instead, it exposes selected public-safe artifacts that make governance outcomes, boundaries, and limitations inspectable.

For the rules governing public claims in this repository, see [PUBLIC_DISCLOSURE_POLICY.md](PUBLIC_DISCLOSURE_POLICY.md).

---

## The Governance Problem

LLMs, ML models, algorithmic systems, rule engines, and hybrid decision pipelines can analyze, classify, score, recommend, decide, and increasingly act.

But capability is not authority.

Portotify treats a produced decision as something that must cross an independent governance boundary before it can be accepted within a governed execution path.

Several distinctions matter:

- an AI or model output is not authorization
- a score, recommendation, or algorithmic conclusion is not authority
- a client assertion is not authority
- an external conclusion is not a Portotify attestation
- a prior governance outcome is not automatically reusable permission
- evidence that something happened is not authority for a different action

Portotify governs the decision, not the decision-maker.

---

## Live Public Evidence

The interactive demo replays nine **public-safe recorded execution cards from synthetic production-environment executions** across four domains:

| Recorded execution | Domain | Observed outcome | Stage / state | Reason |
|---|---|---|---|---|
| A | Decision | ALLOW / COMPLETED | COMMITTED | OK |
| B | Decision | BLOCK / BLOCKED | REJECTED / post-execution | INSUFFICIENT_DATA_CRITICAL_GAPS |
| C | HRTech | BLOCKED | pre-execution | INPUT_MISSING_RUBRIC_CRITERIA |
| D | HRTech | COMPLETED / blocked: false | completed | OK |
| E | Health | COMPLETED / blocked: false | completed | OK |
| F | Health | BLOCKED | post-execution | HEALTH_OUTPUT_VIOLATION |
| G1 | Legal | COMPLETED / blocked: false | completed | OK |
| G2 | Legal | BLOCKED | post-execution | UNVERIFIABLE_GAP_ABSENCE |
| G3 | Legal | BLOCKED | post-execution | LEGAL_EVIDENCE_MISMATCH |

Execution B reached post-execution governance checks, was rejected for critical context gaps, and its public projection records `result_delivered: false`.

Execution C failed closed before provider execution because `rubric_criteria` was absent. Its observed response records `engine: none` and `provider_output_used: false`.

Execution D used the same synthetic candidate response with rubric criteria supplied and completed the represented rubric-based assessment path. The observed response returned criterion observations, an assessment score, and explicit limitations.

Execution E used an externally supplied interaction snapshot with `interaction_status: NOT_PRESENT` and `interaction_severity: NOT_APPLICABLE`. The represented Health governance path completed with `blocked: false`.

Execution F used the same synthetic drug pair and external interaction status, but the externally supplied severity was `MODERATE`. The represented path rejected the internally inconsistent status/severity combination at post-execution governance after provider execution.

The Health evidence does not establish whether the synthetic drug pair clinically interacts. Portotify did not compute or replace the external interaction conclusion in these recorded executions; the public evidence shows governance of the supplied snapshot's internal consistency.

Execution G1 is the first execution in a separate fixed five-run batch specified before execution, repeating one fixed synthetic contract payload against `legal.contract_analysis`, with no retries and no outcome-dependent stopping. All five attempts completed with `blocked: false`; no Legal authority block was observed across that batch. The full batch (5/5 completed, 0 blocked) is recorded in the Legal projection, not only in the single featured card.

Executions G2 and G3 each used their own separate synthetic contract, evaluated independently. G2 was blocked post-execution with `UNVERIFIABLE_GAP_ABSENCE`; the recorded governance outcome did not accept an unverified absence-of-gaps result. G3 was blocked post-execution with `LEGAL_EVIDENCE_MISMATCH`; the recorded evidence-integrity reason states that a quoted evidence snippet could not be matched to the authorized source document. G1, G2, and G3 are not a same-input, single-variable comparison with each other; for G2 and G3, the rejected pre-block provider output was not preserved in the public-facing response.

Signed capsule metadata is preserved in the public Decision projection for executions A and B. The observed HRTech responses C and D, Health responses E and F, and Legal responses G1, G2, and G3 did not expose explicit verdict or capsule metadata, so this repository does not infer either for those records.

### Evidence boundary

The live page is:

- a frozen replay
- based on synthetic inputs executed in the production environment
- not a live production API call
- not real customer data
- redacted to public-safe execution references
- not an independent audit
- not a public signature-verification service

[Inspect the Decision public-safe evidence projection](docs/data/recorded-production-executions.json)

[Inspect the HRTech public-safe evidence projection](docs/data/hrtech-recorded-production-executions.json)

[Inspect the Health public-safe evidence projection](docs/data/health-recorded-production-executions.json)

[Inspect the Legal public-safe evidence projection](docs/data/legal-recorded-production-executions.json)

---

## Evidence Map

Different artifacts in this repository carry different evidentiary weight.

| Evidence class | Location | What it demonstrates |
|---|---|---|
| **Recorded synthetic production evidence** | `docs/` | Selected production-environment governance outcomes presented as a frozen public-safe replay |
| **Recorded mock responses** | `evidence/` | Reproducible ALLOW, BLOCK, and REVIEW behavior under deterministic mock execution |
| **Static governance artifacts** | `data/` | Boundary results, state invariants, and governance signal examples |
| **Request examples** | `examples/` | Public-safe request shapes across represented governance domains |
| **Benchmark evidence** | `evidence/latency/` | Dated engine and governance latency measurements with integrity metadata |
| **Governance findings** | `evidence/FINDING_OPENAI_NONDETERMINISM.md` | Preserved observations about model-output variability under runtime governance |

These classes are intentionally not presented as equivalent forms of proof.

---

## Governance Properties Represented Here

The public materials demonstrate or illustrate the following properties within their stated scopes:

### Fail-closed outcomes

Governed paths can reject an execution instead of silently passing an unresolved or inadmissible result.

### Deterministic governance rules

Governance verdicts are formed by rules outside the model, algorithm, client, or other producer whose output is being governed.

The producer does not become the governance authority merely by producing an answer, score, recommendation, or decision.

### Sufficiency enforcement

Selected examples show execution being blocked when required decision context is insufficient.

### Human oversight evidence

Public artifacts include examples of governance outcomes requiring attributed human review and linked decision lineage.

### Immutable decision evidence

Published artifacts illustrate append-only decision records, linked lineage, verdict metadata, and recorded governance state.

### Output and scope boundaries

Domain-specific examples show selected outputs being rejected when they exceed the authority or output boundary represented by that governed intent.

### Producer independence

Portotify's governance model is designed around the governed decision rather than a specific model, algorithm, architecture, or vendor.

An LLM, ML model, rule engine, algorithmic system, hybrid pipeline, or human-originated decision does not become authoritative merely because of its source.

---

## Domain Coverage Represented in This Repository

The repository contains public-safe examples or evidence material covering these 11 domains:

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

Presence in this repository does not mean that every property demonstrated in one domain has been independently evidenced across every other domain.

---

## Regulatory Mapping

Some public artifacts map governed use cases to regulatory frameworks including relevant EU AI Act Annex III categories and human-oversight concepts.

These mappings are governance metadata and implementation evidence.

They are **not regulatory certification, legal advice, or an independent conformity assessment**.

---

## What This Repository Does Not Prove

This repository should not be read as evidence that:

- every Portotify capability is public
- every governance property has been independently demonstrated across every domain
- one recorded execution proves universal system behavior
- one model, algorithm, architecture, or provider result establishes universal behavior
- a framework mapping constitutes regulatory certification
- a recorded signed capsule has been independently verified by a public verifier
- the absence of a published mechanism means no such mechanism exists
- research or future architecture is already implemented

The scope and limitations of each artifact are part of the evidence.

---

## What's Inside

- **`docs/`** → live frozen public evidence replay
- **`evidence/`** → recorded governance responses, findings, and benchmark evidence
- **`data/`** → static governance artifacts
- **`examples/`** → public-safe request examples
- **`demo/`** → presentation and technical demo material
- **`WHY_PORTOTIFY.md`** → product thesis
- **`GOVERNANCE_PRINCIPLES.md`** → public governance doctrine and authority boundaries
- **`PUBLIC_DISCLOSURE_POLICY.md`** → rules for public claims and disclosure

---

## Start Here

1. [Launch the live public evidence replay](https://portotify.github.io/PORTOTIFY_DEMO_PUBLIC/)
2. Inspect `docs/data/recorded-production-executions.json`
3. Inspect `docs/data/hrtech-recorded-production-executions.json`
4. Inspect `docs/data/health-recorded-production-executions.json`
5. Inspect `docs/data/legal-recorded-production-executions.json`
6. Read `evidence/README.md`
7. Read [WHY_PORTOTIFY.md](WHY_PORTOTIFY.md)
8. Read [GOVERNANCE_PRINCIPLES.md](GOVERNANCE_PRINCIPLES.md)
9. Read [PUBLIC_DISCLOSURE_POLICY.md](PUBLIC_DISCLOSURE_POLICY.md)

---

## Architecture Boundary

This repository intentionally does not contain the Portotify core implementation.

Public materials describe selected outcomes, invariants, boundaries, and evidence.

Proprietary detection logic, enforcement mechanisms, internal prompts, security-sensitive implementation details, and other protected system internals are not published merely to strengthen a public claim.

**Outcomes can be public without making mechanisms public.**

---

## Contact

[portotify.com](https://portotify.com)

info@portotify.com

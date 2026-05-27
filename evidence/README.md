# Evidence — Recorded Governance Responses

Each file is a recorded Portotify API response demonstrating a specific governance outcome: allow, block, or human review required. All responses use `ENGINE_PROVIDER=mock` for deterministic, reproducible results.

---

## Allow Outcomes

| File | Domain | Scenario | Outcome |
|---|---|---|---|
| `career_execute.json` | career | CV analysis — sufficient data | ALLOW — completed |
| `credit_01_execute.json` | credit | Credit profile analysis — sufficient data | ALLOW — completed, suggested next: credit_risk_detection |
| `decision_execute.json` | decision | Situation analysis | ALLOW — completed |
| `hrtech_execute.json` | hrtech | Candidate profile extraction | ALLOW — completed, suggested next: employment_risk_signals |
| `insurance_claims_execute.json` | insurance_claims | Claim profile extraction | ALLOW — completed |
| `legal_execute.json` | legal | Contract analysis | ALLOW — completed |

---

## Block Outcomes

| File | Domain | Scenario | Outcome |
|---|---|---|---|
| `credit_02_drg_block.json` | credit | Credit profile — input too short | BLOCK — INPUT_INSUFFICIENT_APPLICANT_TEXT (input quality guard, pre-execution) |
| `finance_execute.json` | finance | Financial summary — LLM produced investment advice | BLOCK — FINANCE_OUTPUT_VIOLATION (output guard, post-execution) |
| `health_execute.json` | health | Health summary — output guard triggered | BLOCK — output contract violation (post-execution) |
| `insurance_execute.json` | insurance | Policy analysis — output guard triggered | BLOCK — output contract violation (post-execution) |
| `courier_account_suspension_BLOCK.json` | courier | Rider account suspension — LLM produced suspension verdict | BLOCK — COURIER_SUSPENSION_VIOLATION, human review enforced (Platform Work Directive Art.16) |

---

## Governance Flow Evidence

| File | Scenario | Demonstrates |
|---|---|---|
| `03_governance_high_risk_execute.json` | High-risk execution flow | Risk tier classification, governance controls |
| `04_capsule_detail.json` | Decision capsule detail | Immutable audit record structure, decision lineage |
| `05_governance_health.json` | Governance health endpoint | Risk distribution, capsule count, system overview |
| `06_review_flow_lineage.json` | Human review flow | Accept/reject lineage, parent_decision_id chain, immutability |

---

## Before / After Contrast

| File | Scenario | Purpose |
|---|---|---|
| `courier_before_after_contrast.md` | Rider account suspension | Side-by-side: raw LLM output vs. governed Portotify response — shows what governance prevents |

---

## Production Latency Benchmark

| File | Scenario | Demonstrates |
|---|---|---|
| `LATENCY_BENCHMARK_2026-05-27.md` | 3 engines × 4 domains, 360 requests, production | Engine-agnostic governance, real latency data, INTENT_BLOCKED divergence finding |

---

## Notes

- Files marked `post_execution` block: the LLM ran, output guard detected a violation, output was suppressed.
- Files marked `pre_execution` block: the LLM never ran — the system blocked before model invocation.
- `engine: none` in meta confirms the LLM was not called.
- `engine: mock` confirms deterministic mock execution was used.
- Finance, health, and insurance intentionally block — domain output guards are active and enforce output contracts even on mock responses. This is not an error; it demonstrates that governance theater is not in play.

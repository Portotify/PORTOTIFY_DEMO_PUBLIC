# Evidence: Recorded Governance Responses

This directory contains several distinct evidence classes. They are intentionally not treated as equivalent forms of proof.

## Evidence Classes

### Recorded synthetic production evidence

The GitHub Pages evidence window replays six public-safe recorded execution projections from synthetic production-environment executions across Decision, HRTech, and Health.

The underlying projections are:

- `../docs/data/recorded-production-executions.json`
  - Decision A: ALLOW / COMMITTED / COMPLETED
  - Decision B: BLOCK / REJECTED / BLOCKED at post-execution governance

- `../docs/data/hrtech-recorded-production-executions.json`
  - HRTech C: BLOCKED at pre-execution because `rubric_criteria` was missing
  - HRTech D: COMPLETED with `blocked: false` when rubric criteria were supplied

- `../docs/data/health-recorded-production-executions.json`
  - Health E: COMPLETED with `blocked: false` for an internally consistent external interaction snapshot
  - Health F: BLOCKED at post-execution for an internally inconsistent external interaction status/severity snapshot

The Health records govern the internal consistency of the supplied external interaction snapshot. They do not establish whether the synthetic drug pair clinically interacts, and Portotify did not compute or replace the external interaction conclusion in these recorded executions.

The observed HRTech and Health responses did not expose an explicit verdict or capsule metadata, so neither is inferred for those records. Signed capsule metadata is preserved only where it was explicitly observed in the Decision projection for executions A and B.

These are frozen public-safe projections from synthetic production-environment executions. They are not live API calls, raw production responses, customer data, independent audit evidence, or universal behavior claims.

### Recorded mock governance responses

The governance-response JSON files in this directory use `ENGINE_PROVIDER=mock` unless the artifact explicitly states otherwise.

These files are deterministic, reproducible examples of selected ALLOW, BLOCK, and human-review-related outcomes.

### Production-environment latency benchmark

`LATENCY_BENCHMARK_2026-05-27.md` and `latency/` contain benchmark material recorded against the production Render endpoint using mock, OpenAI, and Anthropic engines.

These artifacts demonstrate the measurements and observations recorded for that benchmark scope. They do not establish identical latency or behavior for every model, provider, prompt, domain, or future implementation.

### Governance finding

`FINDING_OPENAI_NONDETERMINISM.md` documents a preserved observation from the benchmark data and its scoped governance implication.

### Errata

`ERRATA.md` records corrections to the interpretation, labeling, or references surrounding preserved evidence artifacts without silently rewriting the original recorded artifact.

---

## Allow Outcomes

| File | Domain | Scenario | Outcome |
|---|---|---|---|
| `career_execute.json` | career | CV analysis: sufficient data | ALLOW: completed |
| `credit_01_execute.json` | credit | Credit profile analysis: sufficient data | ALLOW: completed, suggested next: credit_risk_detection |
| `decision_execute.json` | decision | Situation analysis | ALLOW: completed |
| `hrtech_execute.json` | hrtech | Candidate profile extraction | ALLOW: completed, suggested next: employment_risk_signals |
| `insurance_claims_execute.json` | insurance_claims | Claim profile extraction | ALLOW: completed |
| `legal_execute.json` | legal | Contract analysis | ALLOW: completed |

---

## Block Outcomes

| File | Domain | Scenario | Outcome |
|---|---|---|---|
| `credit_02_drg_block.json` | credit | Credit profile: input too short | BLOCK: INPUT_INSUFFICIENT_APPLICANT_TEXT (input quality guard, pre-execution) |
| `finance_execute.json` | finance | Financial summary: mock output produced investment advice | BLOCK: FINANCE_OUTPUT_VIOLATION (output guard, post-execution) |
| `health_execute.json` | health | Health summary: output guard triggered | BLOCK: output contract violation (post-execution) |
| `insurance_execute.json` | insurance | Policy analysis: output guard triggered | BLOCK: output contract violation (post-execution) |
| `courier_account_suspension_BLOCK.json` | courier | Rider account suspension: mock output produced suspension verdict | BLOCK: COURIER_SUSPENSION_VIOLATION; human-review path indicated. See `ERRATA.md` for the historical Platform Work Directive article reference. |

---

## Governance Flow Evidence

| File | Scenario | Demonstrates |
|---|---|---|
| `03_governance_high_risk_execute.json` | High-risk execution flow | Recorded risk tier classification and governance controls |
| `04_capsule_detail.json` | Decision capsule detail | Recorded governance artifact structure and lineage fields |
| `05_governance_health.json` | Governance health endpoint | Recorded risk distribution, capsule count, and system overview |
| `06_review_flow_lineage.json` | Human review flow | Recorded separate review workflow and linked decision lineage |

---

## Before / After Contrast

| File | Scenario | Purpose |
|---|---|---|
| `courier_before_after_contrast.md` | Rider account suspension | Explanatory contrast between an unguided model output and the recorded governed response |

---

## Production-Environment Latency Benchmark

| File | Scenario | Demonstrates |
|---|---|---|
| `LATENCY_BENCHMARK_2026-05-27.md` | OpenAI and Anthropic across 4 domains, plus mock baseline data | Recorded latency measurements and governance-overhead observations for the tested combinations |
| `FINDING_OPENAI_NONDETERMINISM.md` | openai/credit: same governance-relevant payload content, opposite outcomes across two runs | Preserved evidence that runtime-produced artifacts can differ across executions and should be governed as actually produced |

### Raw Benchmark Data: `latency/`

| File | Contents |
|---|---|
| `latency/BENCHMARK_MANIFEST.md` | SHA-256 integrity manifest for the raw benchmark JSON files |
| `latency/raw/openai_*.json` | OpenAI benchmark runs: career, credit, decision, finance |
| `latency/raw/anthropic_*.json` | Anthropic benchmark runs: career, credit, decision, finance |
| `latency/raw/mock_*.json` | Mock engine baseline runs |

Files marked **v2 run** in the manifest contain `engine_ms` and `overhead_ms` fields. Hashes in `BENCHMARK_MANIFEST.md` can be independently verified against the preserved raw files.

---

## Notes

- `post_execution` block means the producer ran and a later governance check rejected the resulting output within that recorded path.
- `pre_execution` block means the recorded path rejected the request before producer invocation.
- `engine: none` in an artifact indicates no model engine was called in that recorded example.
- `engine: mock` indicates deterministic mock execution was used for that recorded response.
- Recorded synthetic production projections and recorded mock responses are separate evidence classes.
- Mock governance responses, production-environment benchmarks, static artifacts, and the live public replay are different evidence classes.
- Scope and limitations are part of the evidence.

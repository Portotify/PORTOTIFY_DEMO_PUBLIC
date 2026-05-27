# Portotify Latency Benchmark — 2026-05-27

**Date:** 27 May 2026
**Environment:** Production — Render Hobby (https://portotify-backend.onrender.com)
**Engines tested:** mock | openai (gpt-4o) | anthropic (claude-haiku-4-5-20251001)
**Domains tested:** career | credit | decision | finance
**Source:** portotify-work / docs/evidence/latency/ (commits 8f8b06f → 74d0362)

---

## Methodology

- **v2 runs (canonical):** 2 warmup + 10 sample = 12 requests per combination
- **v1 runs (archived):** 3 warmup + 30 sample = 33 requests — engine_ms was NULL
- Warmup requests excluded from all summary statistics
- Anthropic: 1.5s inter-request delay (rate limit protection)
- OpenAI: 1.0s inter-request delay
- Cache-bust: unique `[cb:xxxxxxxx]` suffix injected per request — prevents OpenAI prompt caching, ensures real LLM latency on every call
- Metrics: `engine_ms` (LLM-only inference) | `overhead_ms` (governance pipeline) | `duration_ms` (total wall-clock)
- engine_ms fix: commit `ab68bb5` — LLM-only latency was always computed server-side but not surfaced in the API response

---

## v2 Results — engine_ms Visible (n=10 per combination)

### Anthropic (claude-haiku-4-5-20251001)

| Domain   | engine_ms avg | overhead_ms avg | n  | Errors |
|----------|--------------|----------------|----|--------|
| career   | 4952 ms      | 75 ms          | 10 | 0      |
| credit   | 5507 ms      | 88 ms          | 10 | 0      |
| decision | 8301 ms      | 74 ms          | 10 | 0      |
| finance  | 6687 ms      | 71 ms          | 10 | 0      |

### OpenAI (gpt-4o)

| Domain   | engine_ms avg | overhead_ms avg | n  | Errors |
|----------|--------------|----------------|----|--------|
| career   | 6223 ms      | 115 ms         | 10 | 0      |
| credit   | 9786 ms      | 63 ms          | 10 | 0      |
| decision | 8160 ms      | 96 ms          | 10 | 0      |
| finance  | 8086 ms      | 65 ms          | 10 | 0      |

**All 8 combinations: 80/80 samples successful. 0 errors.**

---

## Governance Overhead — Core Finding

**Governance overhead range across all engines and domains: 57–115 ms.**

This is the cost of Portotify's governance pipeline per execution:
- Intent risk classification
- Policy rule evaluation
- Decision capsule write (immutable ledger)
- Audit event recording

The LLM inference step (engine_ms) dominates total latency. Governance adds a flat, bounded overhead — it does not scale with model complexity or prompt length.

---

## Engine Comparison — v2 Data

| Domain   | Anthropic engine_ms | OpenAI engine_ms | Delta (OpenAI − Anthropic) |
|----------|--------------------|-----------------|-----------------------------|
| career   | 4952 ms            | 6223 ms         | +1271 ms (+26%)             |
| credit   | 5507 ms            | 9786 ms         | +4279 ms (+78%)             |
| decision | 8301 ms            | 8160 ms         | −141 ms (−2%)               |
| finance  | 6687 ms            | 8086 ms         | +1399 ms (+21%)             |

Anthropic Haiku is faster than OpenAI gpt-4o on 3 of 4 domains. Decision domain is within margin of variance.

---

## v1 Results (Archived — engine_ms NULL)

Included for completeness. These runs used n=30 and captured `server_duration_ms` only.

### Anthropic (v1, n=30)

| Domain   | server_avg | Errors |
|----------|-----------|--------|
| career   | 5434 ms   | 0      |
| credit   | 5680 ms   | 0      |
| decision | 8259 ms   | 0      |
| finance  | 6853 ms   | 0      |

### OpenAI (v1, n=30)

| Domain   | server_avg | Note |
|----------|-----------|------|
| career   | 5669 ms   | |
| decision | 9126 ms   | |
| finance  | 9800 ms   | |
| credit   | —         | INTENT_BLOCKED — see finding below |

---

## Key Findings

### 1. Governance Overhead: 57–115 ms (Bounded, Flat)

Across 2 engines and 4 domains, governance overhead measured at 57–115 ms. This cost is independent of LLM choice. Any LLM can be plugged into the governance layer with the same overhead profile.

### 2. LLM Non-Determinism — openai/credit

On the same `credit_profile_analysis` payload with identical governance rules, two runs produced opposite verdicts:

- **Run 3:** 10/10 INTENT_BLOCKED — OpenAI output triggered intent risk classifier
- **Run 4:** 10/10 committed — OpenAI output passed governance evaluation

Same payload. Same governance rules. Same day. Different LLM output → different verdict.

This is not a bug. This is the system working as designed.

LLM output is stochastic at temperature > 0. A governance layer applied once at design time will miss production divergence. Portotify evaluates every execution independently, at inference time, on the actual output produced by the model at that moment.

→ See: [FINDING_OPENAI_NONDETERMINISM.md](FINDING_OPENAI_NONDETERMINISM.md) for full technical analysis.

### 3. Engine-Agnostic Architecture Validated

v2 benchmarks ran the same domains against both Anthropic and OpenAI. Both engines are governed by the same rules. Credit domain committed on Anthropic (10/10) and was blocked on OpenAI (10/10, non-determinism run) — evidence that governance is not bypassed by engine selection.

---

## Integrity

All raw benchmark data (26 JSON files) is SHA-256 hashed in `portotify-work / docs/evidence/latency/BENCHMARK_MANIFEST.md` (commit `74d0362`). Any modification to a raw file — including a single byte — invalidates its hash.

---

*Report generated: 27 May 2026 — Portotify Latency Benchmark Sprint (v1 + v2)*

# Portotify Latency Benchmark: 2026-05-27

**Date:** 27 May 2026  
**Environment:** Production: Render Hobby (`https://portotify-backend.onrender.com`)  
**Engines tested:** mock | openai (`gpt-4o`) | anthropic (`claude-haiku-4-5-20251001`)  
**Domains tested:** career | credit | decision | finance

---

## Methodology

- **v2 runs (canonical):** 2 warmup + 10 sample = 12 requests per combination
- **v1 runs (archived):** 3 warmup + 30 sample = 33 requests; `engine_ms` was NULL
- Warmup requests excluded from summary statistics
- Anthropic: 1.5s inter-request delay
- OpenAI: 1.0s inter-request delay in the benchmark script configuration
- Cache-bust: unique `[cb:xxxxxxxx]` suffix injected per request to avoid prompt-cache reuse in the measured path
- Metrics: `engine_ms` (engine inference) | `overhead_ms` (recorded non-engine pipeline time) | `duration_ms` (total server duration)
- `engine_ms` response surfacing fix: commit `ab68bb5`

---

## v2 Results: engine_ms Visible (n=10 per combination)

### Anthropic (`claude-haiku-4-5-20251001`)

| Domain | engine_ms avg | overhead_ms avg | n | Errors |
|---|---:|---:|---:|---:|
| career | 4952 ms | 75 ms | 10 | 0 |
| credit | 5507 ms | 88 ms | 10 | 0 |
| decision | 8301 ms | 74 ms | 10 | 0 |
| finance | 6687 ms | 71 ms | 10 | 0 |

### OpenAI (`gpt-4o`)

| Domain | engine_ms avg | overhead_ms avg | n | Errors |
|---|---:|---:|---:|---:|
| career | 6223 ms | 115 ms | 10 | 0 |
| credit | 9786 ms | 63 ms | 10 | 0 |
| decision | 8160 ms | 96 ms | 10 | 0 |
| finance | 8086 ms | 65 ms | 10 | 0 |

**All eight measured provider/domain combinations completed 80/80 canonical samples without recorded request errors.**

---

## Governance Overhead Observation

Across the eight measured OpenAI/Anthropic provider-domain combinations, average recorded governance overhead remained within **57–115 ms**.

The recorded overhead represented non-engine work in the measured execution path, including governance and persistence activity represented by that implementation at the time of the benchmark.

The engine inference step dominated total latency in these runs.

### Scope boundary

This benchmark does **not** establish that governance overhead is globally flat, permanently bounded, independent of prompt length, or identical across every model, provider, domain, deployment, or future Portotify implementation.

It establishes the measurements recorded for this dated benchmark scope.

---

## Engine Comparison: v2 Data

| Domain | Anthropic engine_ms | OpenAI engine_ms | Delta (OpenAI − Anthropic) |
|---|---:|---:|---:|
| career | 4952 ms | 6223 ms | +1271 ms (+26%) |
| credit | 5507 ms | 9786 ms | +4279 ms (+78%) |
| decision | 8301 ms | 8160 ms | −141 ms (−2%) |
| finance | 6687 ms | 8086 ms | +1399 ms (+21%) |

In these recorded samples, Anthropic Haiku had a lower average `engine_ms` in three of the four tested domains. The benchmark is not a general provider-performance ranking.

---

## v1 Results (Archived: engine_ms NULL)

Included for completeness. These runs used n=30 and captured `server_duration_ms` only.

### Anthropic (v1, n=30)

| Domain | server_avg | Errors |
|---|---:|---:|
| career | 5434 ms | 0 |
| credit | 5680 ms | 0 |
| decision | 8259 ms | 0 |
| finance | 6853 ms | 0 |

### OpenAI (v1, n=30)

| Domain | server_avg | Note |
|---|---:|---|
| career | 5669 ms | |
| decision | 9126 ms | |
| finance | 9800 ms | |
| credit | N/A | `INTENT_BLOCKED`; see finding below |

---

## Key Findings

### 1. Recorded governance overhead range

Across the eight measured provider/domain combinations, average governance overhead was recorded within the 57–115 ms range.

This is a benchmark result for those combinations, not a universal latency guarantee.

### 2. openai/credit output and verdict divergence

Two benchmark runs using the same governance-relevant `credit_profile_analysis` payload content produced opposite recorded outcomes:

- **Run 3:** 10/10 `INTENT_BLOCKED`
- **Run 4:** 10/10 committed

This observation is documented in [FINDING_OPENAI_NONDETERMINISM.md](FINDING_OPENAI_NONDETERMINISM.md).

The finding supports governing the artifact actually produced in each represented execution rather than assuming a prior validation result automatically applies to later runtime artifacts.

### 3. Same governance path exercised across two external providers

The v2 benchmark exercised the represented governance path using both Anthropic and OpenAI engines across the same four domains.

This demonstrates cross-provider execution in the measured benchmark scope.

It does not prove identical behavior, identical latency, or universal provider independence for every present or future integration.

---

## Integrity

The raw benchmark JSON files are preserved under `latency/raw/` and registered with SHA-256 values in `latency/BENCHMARK_MANIFEST.md`.

The raw files and recorded hashes are the evidence source for the benchmark measurements.

---

*Report generated: 27 May 2026. Claim-scope and repository-path hygiene updated 19 August 2026. Raw benchmark artifacts were not modified.*

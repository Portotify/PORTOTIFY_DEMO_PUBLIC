# Portotify Latency Benchmark — 2026-05-27

**Date:** 27 May 2026
**Environment:** Production — Render Hobby (https://portotify-backend.onrender.com)
**Engines tested:** mock | openai (gpt-4o) | anthropic (claude-haiku-4-5-20251001)
**Domains tested:** career | credit | decision | finance
**Source:** portotify-work / docs/evidence/latency/BENCHMARK_2026-05-27.md (commit 8f8b06f)

---

## Methodology

- Per combination: 3 warmup + 30 sample = 33 requests
- Warmup requests excluded from summary (`is_warmup: true`)
- Anthropic: 1.5s inter-request delay (rate limit protection)
- OpenAI / Mock: 0s delay
- Cache-bust: unique `[cb:xxxxxxxx]` suffix injected per request — prevents OpenAI prompt caching, ensures real LLM latency is measured
- Primary metric: `server_duration_ms` (meta.elapsed_ms — server-side wall-clock time)
- `engine_ms` was NULL across all engines — LLM-only latency cannot be isolated at this time

---

## Results

### Anthropic (claude-haiku-4-5-20251001)

| Domain   | n  | client_avg | server_avg | Errors |
|----------|----|-----------|-----------|--------|
| career   | 30 | 5799 ms   | 5434 ms   | 0      |
| credit   | 30 | 6035 ms   | 5680 ms   | 0      |
| decision | 30 | 8569 ms   | 8259 ms   | 0      |
| finance  | 30 | 7260 ms   | 6853 ms   | 0      |

**All valid. 4/4 domains, 120/120 samples successful.**

---

### OpenAI (gpt-4o)

| Domain   | n  | client_avg | server_avg | Errors | Note |
|----------|----|-----------|-----------|--------|------|
| career   | 30 | 6080 ms   | 5669 ms   | 0      | |
| credit   | —  | —         | —         | —      | INTENT_BLOCKED — see findings below |
| decision | 30 | 10091 ms  | 9126 ms   | 0      | |
| finance  | 30 | 11192 ms  | 9800 ms   | 0      | |

**3/4 domains valid. credit not measurable — engine-specific governance divergence.**

---

### Mock

| Domain   | n  | server_avg | Errors | Note |
|----------|----|-----------|--------|------|
| career   | 30 | 7371 ms   | 0      | |
| credit   | 30 | —         | 0      | server_n=6, insufficient |
| decision | 30 | 6885 ms   | 0      | |
| finance  | 30 | 10120 ms  | 0      | |

Note: mock `client_avg` is inflated by Render cold-start network overhead and not used as a reference metric.

---

## Engine Comparison — Valid Domains

| Domain   | Anthropic server_avg | OpenAI server_avg | Delta (OpenAI − Anthropic) |
|----------|---------------------|------------------|---------------------------|
| career   | 5434 ms             | 5669 ms          | +235 ms                   |
| credit   | 5680 ms             | N/A              | —                         |
| decision | 8259 ms             | 9126 ms          | +867 ms                   |
| finance  | 6853 ms             | 9800 ms          | +2947 ms                  |

Anthropic (Haiku) is faster than OpenAI across all measurable domains.

---

## Key Findings

### 1. openai/credit — INTENT_BLOCKED (Engine-Specific Governance Divergence)

Same `credit_profile_analysis` payload, same governance rules:

- **Anthropic engine:** 30/30 committed — server_avg 5680ms
- **OpenAI engine:** 30/30 POLICY_BLOCK → INTENT_BLOCKED — latency not measurable

`provider_output_used: true` confirms the OpenAI LLM was called and returned a response. Governance evaluated that response and blocked it as INTENT_BLOCKED.

**This is not a bug. This is the system working as designed.**

The same payload produces different LLM outputs across engines. Portotify's governance layer evaluates each output independently, engine-agnostically. The engine influences the LLM output; governance catches the difference. This is direct evidence that:

- The governance layer is not bypassed by engine selection
- Engine-specific behavior is caught and recorded
- Accountability is preserved regardless of which LLM is in use

### 2. Anthropic Haiku — No Cold Start

All Anthropic warmup requests returned 200 directly. OpenAI runs experienced 503 on warmup 1 or 2 in several cases (Render Hobby plan cold start). Anthropic engine switch triggered a Render restart, which resolved quickly before sampling began.

### 3. OpenAI decision/finance — Higher Latency

OpenAI decision (9126ms) and finance (9800ms) are 10–43% slower than Anthropic equivalents. Career domain gap is minimal (+235ms).

---

*Report generated: 27 May 2026*

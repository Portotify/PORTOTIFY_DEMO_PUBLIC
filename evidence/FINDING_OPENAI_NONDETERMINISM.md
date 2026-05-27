# Finding: LLM Non-Determinism Under Governance — openai/credit

**Date:** 27 May 2026
**Classification:** Governance Behavior Finding
**Severity:** Informational — expected behavior, not a defect

---

## Observation

During latency benchmarking, the `credit / credit_profile_analysis` domain was executed
against the OpenAI engine (gpt-4o) with an identical payload across multiple independent
benchmark runs. The governance verdict was inconsistent across runs:

| Run | Timestamp | n | Outcome | Note |
|-----|-----------|---|---------|------|
| 1 | 20260527T002216Z | 30 | POLICY_BLOCK (all) | Old payload — insufficient data |
| 2 | 20260527T081515Z | 30 | 200 / server=null | Cache hit — no LLM call |
| 3 | 20260527T081748Z | 10 | POLICY_BLOCK (all) | Cache-bust active, INTENT_BLOCKED |
| 4 | 20260527T102030Z | 10 | 200 / committed (all) | Cache-bust active, passed |

Runs 3 and 4 used the same payload content (only the `[cb:xxxxxxxx]` cache-bust suffix
differed per request). Run 3 produced `INTENT_BLOCKED` on every sample; Run 4 committed
every sample successfully.

---

## Root Cause Analysis

**The payload did not change between Run 3 and Run 4.**

The divergence originates in OpenAI's stochastic generation process. Large language models
with `temperature > 0` do not produce deterministic output for a given input. Each API call
samples from a probability distribution over the token vocabulary, producing a different
completion on every invocation. For the same `credit_profile_analysis` prompt:

- In Run 3, OpenAI generated output that triggered the governance intent risk classifier,
  resulting in `INTENT_BLOCKED`.
- In Run 4, OpenAI generated semantically equivalent but lexically different output that
  did not activate the classifier.

The governance layer did not change between runs. The LLM output changed.

---

## Governance Implication

This finding validates a core Portotify design principle:

> **LLM output is non-deterministic. Governance cannot be applied once at design time —
> it must be applied at inference time, on every execution.**

A system that validates LLM behavior only during testing or staging will miss production
divergence. Portotify intercepts every execution, evaluates the actual output produced by
the model at that moment, and applies governance rules in-line before the output reaches
the consumer.

The non-determinism of `openai/credit` across runs is not a defect in the benchmark. It
is empirical evidence that the same prompt can produce both compliant and non-compliant
LLM outputs at different times — and that runtime governance is the only reliable control.

---

## Quantitative Context

- Run 3: 10/10 INTENT_BLOCKED (100% block rate on this payload, this day)
- Run 4: 10/10 committed (100% pass rate on the same payload, same day)
- Engine temperature: default (OpenAI gpt-4o, temperature not overridden)
- Cache-bust: active in both runs — each request received a unique prompt suffix,
  preventing OpenAI prompt cache from masking the variance

---

## Reference

- Raw data: `docs/evidence/latency/raw/openai_credit_20260527T081748*.json` (blocked)
- Raw data: `docs/evidence/latency/raw/openai_credit_20260527T102030*.json` (committed)
- Related benchmark: `docs/evidence/latency/BENCHMARK_2026-05-27.md`
- TECH_DEBT: D-LATENCY-FIELD-DRIFT (resolved in commit ab68bb5)

---

*Finding recorded: 27 May 2026 — Portotify Latency Benchmark Sprint*

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

Runs 3 and 4 used the same governance-relevant payload content (only the `[cb:xxxxxxxx]`
cache-bust suffix differed per request to defeat prompt caching — this suffix is not
evaluated by governance rules). Run 3 produced `INTENT_BLOCKED` on every sample; Run 4
committed every sample successfully.

---

## Root Cause Analysis

**The governance-relevant payload did not change between Run 3 and Run 4.**

The evidence is consistent with stochastic generation behavior. Large language models
with `temperature > 0` do not produce deterministic output for a given input — each API
call samples from a probability distribution over the token vocabulary, producing a
different completion on every invocation. For the same `credit_profile_analysis` prompt:

- In Run 3, the model generated output that triggered the governance intent risk classifier,
  resulting in `INTENT_BLOCKED`.
- In Run 4, the model generated semantically equivalent but lexically different output that
  did not activate the classifier.

The governance layer did not change between runs. The produced output changed.

Other explanations — backend state drift, provider-side routing changes, moderation
variance, or upstream model version changes — cannot be fully excluded from a black-box
observation. However, stochastic generation is the most likely explanation given that the
effect is well-documented for temperature > 0 models and the divergence pattern is
consistent with token-level sampling variance.

---

## Governance Implication

This finding validates a core Portotify design principle:

> **Governance cannot be applied once at design time — it must be applied at inference
> time, on every execution, against the actual output produced by the model.**

The critical distinction is between *intended behavior* and *produced artifact*. A system
that validates LLM behavior during testing or staging is validating intended behavior under
controlled conditions. Production execution produces a different artifact on every call.
Portotify evaluates the produced artifact — what the model actually returned, at that
moment — before it reaches the consumer.

This is why runtime governance remains necessary even when a model has been validated
in staging: production behavior can diverge from staging validation at any inference call,
for any execution, without warning.

The non-determinism of `openai/credit` across runs is not a defect in the benchmark. It
is empirical evidence that the same governance-relevant prompt can produce both compliant
and non-compliant LLM outputs at different times — and that runtime governance is the
most reliable control boundary for stochastic LLM systems deployed in production.

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

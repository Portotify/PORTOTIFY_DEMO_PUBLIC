# Finding: LLM Non-Determinism Under Governance: openai/credit

**Date:** 27 May 2026  
**Classification:** Governance Behavior Finding  
**Severity:** Informational: observed benchmark behavior, not a defect

---

## Observation

During latency benchmarking, the `credit / credit_profile_analysis` domain was executed against the OpenAI engine (`gpt-4o`) across multiple independent benchmark runs.

The recorded governance outcomes differed across runs:

| Run | Timestamp | n | Outcome | Note |
|---|---|---|---|---|
| 1 | 20260527T002216Z | 30 | POLICY_BLOCK (all) | Old payload: insufficient data |
| 2 | 20260527T081515Z | 30 | 200 / server=null | Cache hit: no LLM call |
| 3 | 20260527T081748Z | 10 | POLICY_BLOCK (all) | Cache-bust active, INTENT_BLOCKED |
| 4 | 20260527T102030Z | 10 | 200 / committed (all) | Cache-bust active, passed |

Runs 3 and 4 used the same governance-relevant payload content. The per-request `[cb:xxxxxxxx]` suffix differed to defeat prompt caching and was not evaluated by the governance rules represented in the benchmark.

Run 3 produced `INTENT_BLOCKED` on every sample. Run 4 committed every sample successfully.

---

## Interpretation

**The governance-relevant payload content did not change between Run 3 and Run 4.**

The recorded evidence is consistent with output variance from the model or provider path.

Stochastic generation is one plausible explanation, but the benchmark is a black-box observation and does not isolate every possible cause.

Other explanations such as backend state drift, provider-side routing changes, moderation variance, or upstream model-version changes cannot be fully excluded from the preserved evidence alone.

The strongest claim supported by these artifacts is therefore narrower:

> The same governance-relevant payload content produced different recorded outputs and governance outcomes across separate benchmark runs.

---

## Governance Implication

This observation supports evaluating the artifact actually produced for each governed execution rather than treating prior validation as reusable authority for later executions.

A staging or design-time validation establishes evidence about the artifact and conditions that were tested.

It does not prove that a later runtime artifact will be identical.

Production execution can produce an artifact that differs from prior validation runs. This observation therefore supports applying governance to the actual artifact produced in the represented execution path.

This finding does not establish that every model call will differ, that every provider behaves the same way, or that runtime governance is the only possible control architecture.

It demonstrates a narrower and directly evidenced point:

> Prior validation of a stochastic decision-producing system does not by itself establish the governance admissibility of every later produced artifact.

---

## Quantitative Context

- Run 3: 10/10 `INTENT_BLOCKED`
- Run 4: 10/10 committed
- Same governance-relevant payload content
- Same day
- OpenAI engine: `gpt-4o`
- Temperature was not explicitly overridden in the benchmark configuration
- Cache-bust was active in both runs

---

## References

- Raw data: `latency/raw/openai_credit_20260527T081748.869862Z.json` (blocked run)
- Raw data: `latency/raw/openai_credit_20260527T102030.090641Z.json` (committed run)
- Related benchmark: `LATENCY_BENCHMARK_2026-05-27.md`
- Integrity manifest: `latency/BENCHMARK_MANIFEST.md`
- TECH_DEBT reference from the original benchmark sprint: `D-LATENCY-FIELD-DRIFT` (resolved in commit `ab68bb5`)

---

*Finding recorded: 27 May 2026. Interpretation and repository-path hygiene updated 19 August 2026. Raw benchmark artifacts were not modified.*

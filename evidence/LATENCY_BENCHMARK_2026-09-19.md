# Portotify Latency Benchmark: 2026-09-19

**Status:** Current public benchmark summary
**Run:** `20260919T120620Z-d3f844`
**Design:** A-B-A
**Initial domain scope:** 11 domains
**Final admissible paired latency scope:** 5 domains

This document is a public-safe summary of the authoritative September 2026
benchmark closure. Raw production JSONL, production response bodies, secrets,
private manifests, and the private closure document are intentionally not
published in this repository.

## Provenance

- **System under test commit:** `50ae4dd8436cc01c8bb8acc2f88d9d0f0d916e5f`
  (operator-declared and harness-enforced-consistent). The harness did not
  independently probe the running service for this SHA, so it must not be read
  as an independently verified deployed commit.
- **Tooling commit:** `9b2836f038dcb10e9bec388fef3df7bdf3425e36`
- **Private evidence closure:** `0efaaed127275c021b31ad16f258c2334592b269`

The private closure is the authority for the values summarized here. This
public report does not expose its raw evidence or private manifest.

## Methodology

- A-B-A sequence: OpenAI A, Anthropic B, OpenAI A.
- OpenAI model: `gpt-4o-mini`.
- Anthropic model: `claude-haiku-4-5-20251001`.
- Production execute requests: 436.
- Valid records: 430.
- Governance-blocked records: 6.
- Transport/provider failures: 0.
- Engine/model integrity mismatches: 0.
- For every final paired domain, OpenAI `n=30` and Anthropic `n=30`.

The provider names above identify a provider + model + configuration
comparison. The result is not a generic or universal “OpenAI versus
Anthropic” provider-effect claim.

## Final paired latency results

The following medians are model/engine latency medians for the final paired
domain set only. No pooled cross-domain latency value is asserted.

| Domain | OpenAI (`gpt-4o-mini`) | Anthropic (`claude-haiku-4-5-20251001`) |
|---|---:|---:|
| decision | 3575 ms | 7766 ms |
| courier | 2026 ms | 5662.5 ms |
| health | 2114 ms | 5462 ms |
| insurance_claims | 1750 ms | 3294 ms |
| legal | 1872.5 ms | 6076.5 ms |

These conclusions apply only to the five domains for which both providers
passed governance and a paired comparison was admissible.

## Governance exclusions

The following six initial domains were excluded from the final paired latency
comparison because of governance outcomes:

- finance
- hrtech
- career
- credit
- education
- insurance

These exclusions are not transport failures or provider failures. They must
not be presented as benchmark request failures. The final paired set is a
survivor-selected subset, so its latency results must not be generalized to
all 11 initial domains.

## A-B-A drift limitations

OpenAI P1-to-P3 model-latency median drift was recorded as follows:

| Domain | P1 → P3 model-latency median drift |
|---|---:|
| decision | -2.5% |
| courier | -5.3% |
| health | -8.1% |
| insurance_claims | +0.6% |
| legal | +7.0% |

Model-latency drift remained within ±10% for the five paired domains.

Non-model and edge-path drift was separate:

- `server_non_model_ms` median drift: +15.3% to +33.5%
- `outside_handler_ms` median drift: +11.6% to +30.2%
- `total_latency_ms` median drift: +0.5% to +11.8%
- legal total-latency drift: +11.8%

The cause of this non-model drift is unresolved. These values must not be
attributed to Render, a provider, or a platform without separate evidence.
Pooled non-model or total-latency values must not be interpreted as provider
effects.

## Additional limitations

- The comparison is provider + model + configuration specific, not a general
  provider ranking.
- Anthropic valid records lacked token telemetry. No token-normalized
  cross-provider latency comparison is made.
- Governance survivor selection limits the conclusion to the final five-domain
  paired set.
- The zero transport/provider-failure result is distinct from the six
  governance exclusions.
- The operator-declared system-under-test SHA is not an independently verified
  deployed SHA.

## May 2026 comparison warning

The May 2026 benchmark remains historical evidence under the legacy
methodology. Its v1 `server_avg` was based on recorded `server_duration_ms`
while engine timing was unavailable. It must not be silently reinterpreted as
September `server_non_model_ms`, and the two metrics must not be compared as
if they had the same semantic layer.

See [the historical May benchmark](LATENCY_BENCHMARK_2026-05-27.md), its
[integrity manifest](latency/BENCHMARK_MANIFEST.md), and the preserved raw
historical evidence under `latency/raw/`.

---

*Report prepared from the authoritative private September closure. Raw
production evidence is intentionally excluded from this public repository.*

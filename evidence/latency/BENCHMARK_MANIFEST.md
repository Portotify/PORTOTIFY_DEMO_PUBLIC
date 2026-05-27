# Portotify Latency Benchmark — Integrity Manifest

**Generated:** 2026-05-27
**Algorithm:** SHA-256
**Purpose:** Tamper-evident record of all benchmark raw data files.
Each hash is computed over the exact bytes of the JSON file at time of recording.
Any modification to a file — including a single byte — will invalidate its hash.

Git commit at manifest generation: `ab68bb5` (fix: engine_ms + duration_ms + overhead_ms)

---

## How to Verify

```powershell
# Verify a single file (PowerShell)
(Get-FileHash "docs\evidence\latency\raw\<filename>" -Algorithm SHA256).Hash.ToLower()

# Compare against the hash listed below — they must match exactly.
```

```bash
# Verify a single file (bash/linux)
sha256sum docs/evidence/latency/raw/<filename>
```

---

## File Registry

### Anthropic Engine

| File | SHA-256 | Status |
|------|---------|--------|
| `anthropic_career_20260527T075646.542815Z.json` | `577cae9303dfd65c1a3a0a70e421016ca0068b9b0b1afb635a645531016c0d32` | v1 run — engine_ms NULL (pre-fix) |
| `anthropic_career_20260527T095126.442555Z.json` | `5bf8e33bd10625d96e120014eaa1bb78a9fdef55bb7ea3ed85066b21ac97eea5` | smoke test, n=1, 503 (Render cold) |
| `anthropic_career_20260527T102728.874072Z.json` | `aff54f767385b63070339a21a2510542e1f5d1d7e7e69c4ea71c19885becf094` | **v2 run — engine_ms dolu, n=10** |
| `anthropic_credit_20260527T075137.550656Z.json` | `02319725cbbf01aaf325fc9533f7fc1fd7ec9aa7878685692230b34d99824057` | v1 run — engine_ms NULL (pre-fix) |
| `anthropic_credit_20260527T103304.006801Z.json` | `97fe14fc87bc5014d7b703edb36be74068a427032f82e2127d29e45559df4a67` | **v2 run — engine_ms dolu, n=10** |
| `anthropic_decision_20260527T064503.566208Z.json` | `ef997150caf97391ad438f4d635985137001f142ab64997afcd011a4ff39eee8` | v1 run — engine_ms NULL (pre-fix) |
| `anthropic_decision_20260527T102903.529605Z.json` | `7f5aa6d870550a43535d2021e957a89a580b08f039c361e1abae6e9b007a3534` | **v2 run — engine_ms dolu, n=10** |
| `anthropic_finance_20260527T065638.161311Z.json` | `18a85e5320afd7618ddec1f6d861eb03b124ce7f28852426dbdbec76a34bef43` | v1 anomalous run (requests 25-33 server=null) |
| `anthropic_finance_20260527T073111.400674Z.json` | `9b13ef13ac25ad8b23639ab52a5e0758080c0e745448b3282c96457462caccd8` | v1 clean run — engine_ms NULL (pre-fix) |
| `anthropic_finance_20260527T103112.863665Z.json` | `ed35a662d15eba46cff0db5c7358e3ee8589b068f1abb3a177c6946e9b119c30` | **v2 run — engine_ms dolu, n=10** |

### Mock Engine

| File | SHA-256 | Status |
|------|---------|--------|
| `mock_career_20260526T235730.484638Z.json` | `107ec52dbdc63b8d9c68d6a7cfc24d733646f42161b87f4e3a43290d44539cd7` | v1 run — client inflated (cold start) |
| `mock_credit_20260526T235728.811005Z.json` | `fac3d9acdfa0a555ddcffa9ea7c40fbae0523b50080bb6092b4c43974186143d` | v1 run — server_n=6, insufficient |
| `mock_decision_20260526T235311.481010Z.json` | `79a8a9c8a53e2ba18fc9f82663feb61749e8aac80477dd31150d73e4b5948380` | v1 run |
| `mock_finance_20260526T235727.501282Z.json` | `0a100a80493e242f69f7093dd3aef9cb3b88ee78769410b001ff398b4e3db4d5` | v1 run |

### OpenAI Engine

| File | SHA-256 | Status |
|------|---------|--------|
| `openai_career_20260527T063617.159548Z.json` | `7ff47a49c700c54fdc03d79101739bd0114b4d50fe7bf22b1681c5ff837d5345` | v1 run — engine_ms NULL (pre-fix) |
| `openai_career_20260527T095602.146013Z.json` | `870162ff5085e829b17183cde3d58c088c1c5eb45f46b0e04681ee2b12abdd4a` | smoke test, n=1 |
| `openai_career_20260527T101513.323231Z.json` | `ec06cd4d0a9f938a6ef97772ab280875371904d7d24e942b45d3d0a82d6ae8d4` | **v2 run — engine_ms dolu, n=10** |
| `openai_credit_20260527T002216.788618Z.json` | `7303b59c5097e2ed7820785c21b61e49008e91599e4c0dbff7eba578cd2b3524` | invalid — old payload, all POLICY_BLOCK |
| `openai_credit_20260527T081432.542737Z.json` | `dc40dd7f33e873c1a5970a10bb0b0e357b415fb8c7d9fc82393bead9bcc03831` | smoke test, n=1 |
| `openai_credit_20260527T081515.183259Z.json` | `1eb17ffe486039d3679398f7070172649992b9a842d9ede83833776de5047a28` | invalid — cache hit, no LLM call |
| `openai_credit_20260527T081748.869862Z.json` | `f9fd0f9049ef548808e7e357979bb6650b94e2905fecaa416e1138dd4087850a` | INTENT_BLOCKED run (non-determinism finding) |
| `openai_credit_20260527T102030.090641Z.json` | `1e8e8980a440f93c79117fce480cb3b0c4c3d66a6438298d423ddb9979837b0d` | **v2 run — engine_ms dolu, n=10, committed** |
| `openai_decision_20260527T000959.084646Z.json` | `2bbd3f38d3f53b16f7a859c30bfdab01c19cdbcfef54df2374948853ab508c37` | v1 run — engine_ms NULL (pre-fix) |
| `openai_decision_20260527T101636.099950Z.json` | `56ef3d19e2b9ccd13a2cca3aa0a9939586497d6331efe251b9599e71aefe8bab` | **v2 run — engine_ms dolu, n=10** |
| `openai_finance_20260527T001600.049234Z.json` | `572e4d06a1b12efa9b91aeb8a0073310ed24bb0b558b73ecd1343330f96e1c87` | v1 run — engine_ms NULL (pre-fix) |
| `openai_finance_20260527T101830.626049Z.json` | `85676fa960e90ad8325705eab710ec491c4c4668a99d22cccc4c264629632e74` | **v2 run — engine_ms dolu, n=10** |

---

## v2 Benchmark Summary (engine_ms visible)

Files marked **v2 run** were recorded after commit `ab68bb5` which introduced
`engine_ms` (LLM-only latency) and `duration_ms` (total pipeline) to the API response.

| Engine | Domain | engine_ms avg | overhead_ms avg | n |
|--------|--------|--------------|----------------|---|
| Anthropic | career | 4952ms | 75ms | 10 |
| Anthropic | decision | 8301ms | 74ms | 10 |
| Anthropic | finance | 6687ms | 71ms | 10 |
| Anthropic | credit | 5507ms | 88ms | 10 |
| OpenAI | career | 6223ms | 115ms | 10 |
| OpenAI | decision | 8160ms | 96ms | 10 |
| OpenAI | finance | 8086ms | 65ms | 10 |
| OpenAI | credit | 9786ms | 63ms | 10 |

**Governance overhead range across all engines and domains: 57–115ms.**

---

*Manifest generated: 27 May 2026*
*This file is itself version-controlled — its git history is part of the audit trail.*

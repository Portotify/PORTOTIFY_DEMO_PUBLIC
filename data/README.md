# Data — Static Governance Artifacts

Static artifacts demonstrating Portotify's governance boundary behavior, risk tier outcomes, and invariant enforcement. No live backend required.

---

## Boundary Results

| File | Risk Tier | Verdict | Demonstrates |
|---|---|---|---|
| `boundary_high_result.json` | high | review_required | High-risk decision persisted as committed — separate human review workflow triggered |
| `boundary_critical_result.json` | critical | block | External write without required controls → fail-closed rejection, no commit |

## Governance Signals

| File | Demonstrates |
|---|---|
| `demo_governance_signals.json` | All three boundary outcomes (low/high/critical) side by side — governance model and immutability rules |
| `demo_trust_signals.json` | Product truths and static evidence bundle index — no live backend required for verification |

## Guard Invariant Tests

| File | Demonstrates |
|---|---|
| `guard_invalid_transition.json` | State transition guard: `committed → rejected` is invalid — system rejects the attempt |
| `guard_verdict_state_mismatch.json` | Verdict/state mismatch guard: `allow + pending_review` is an invalid pair — system rejects |

---

## Key Governance Rules Visible in These Files

- Decision states are only `committed` or `rejected` — `pending_review` is not a valid state
- `review_required` is a governance verdict, not a lifecycle state
- Critical external write conditions are blocked fail-closed — no commit, no review workflow
- High-risk decisions commit but route to a separate human review workflow
- State transitions between committed decisions are invalid — override requires a new decision version

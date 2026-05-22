# Portotify Governance — Before / After

**Scenario: Rider Account Suspension Request**

A platform operations system receives a report: a rider has three consecutive undelivered orders, one customer complaint, and a pattern of late check-ins. The system asks an AI to evaluate the case.

---

## WITHOUT Portotify (Raw LLM Output)

The AI model responds directly, without governance:

```
Based on the incident record, I recommend suspending this account immediately.

The rider demonstrates a risk score of 8.2 / 10 and falls into the HIGH-RISK tier.
Three consecutive delivery failures combined with a formal customer complaint constitute
a clear policy violation. Suspension is warranted.

Recommended action: Suspend account for 14 days with review at day 10.
```

**What went wrong:**

- The AI issued a direct suspension recommendation — a decision that restricts access to work
- It asserted a numeric risk score (8.2 / 10) with no evidence basis
- No appeal mechanism was offered to the rider
- No regulatory requirement was acknowledged
- The output would have propagated directly to the operations workflow — no human reviewed it
- Platform Work Directive 2024/2831 Article 16 was violated: automated account restriction without human oversight
- EU AI Act Annex III.4 requires human oversight for AI systems that affect employment — this was absent

---

## WITH Portotify (Governed Output)

The same request passes through the Portotify governance layer:

**Step 1 — Pre-execution check**

Portotify evaluates the request before any AI model is called:
- Domain: courier, Intent: account_suspension → classified as high-risk
- `human_in_loop` flag set to true — human handoff enforcement active

**Step 2 — LLM runs, output guard fires**

The AI model runs and produces output containing a suspension verdict.
The courier output guard detects `COURIER_SUSPENSION_VIOLATION`:

- Output contained a suspension recommendation → policy violation
- Output contained a risk score assertion → policy violation
- Block triggered: `post_execution`

**Step 3 — Governed response returned**

```json
{
  "controls": {
    "fail_closed": true,
    "blocked": true,
    "block_reasons": ["COURIER_SUSPENSION_VIOLATION"]
  },
  "meta": {
    "status": "blocked",
    "reason_code": "COURIER_SUSPENSION_VIOLATION",
    "reason_human": "Automatic account suspension blocked. Account suspension decisions restrict access to work and require a human manager to review the signals and make the determination."
  },
  "next_action": {
    "type": "human_review_required",
    "reason_human": "Operations manager review required. Rider has the right to respond before any account action is taken."
  }
}
```

**Step 4 — Immutable audit trail written**

- Decision capsule created: append-only, versioned, traceable
- No raw LLM output stored — only output hash
- Full governance chain recorded: input → block → reason → next action

---

## What This Means

Without governance, the AI model produced a suspension verdict and a fabricated risk score that could have directly restricted a person's access to work — with no human review, no appeal mechanism, and no regulatory compliance. With Portotify, the output was intercepted before propagation, the automatic decision was blocked, and a human manager was required to make the determination. The entire chain is recorded as immutable audit evidence, satisfying Platform Work Directive 2024/2831 Article 16 and EU AI Act Annex III.4.

---

**Recorded evidence:** `courier_account_suspension_BLOCK.json`

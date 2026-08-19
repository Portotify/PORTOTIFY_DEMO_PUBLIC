# Portotify Governance: Before / After

**Scenario:** Rider Account Suspension Request

A platform operations system receives a report: a rider has three consecutive undelivered orders, one customer complaint, and a pattern of late check-ins. The system asks an AI to evaluate the case.

---

## WITHOUT Portotify (Raw LLM Output)

The AI model responds directly, without governance:

```text
Based on the incident record, I recommend suspending this account immediately.

The rider demonstrates a risk score of 8.2 / 10 and falls into the HIGH-RISK tier.
Three consecutive delivery failures combined with a formal customer complaint constitute
a clear policy violation. Suspension is warranted.

Recommended action: Suspend account for 14 days with review at day 10.
```

**Observed governance concerns in this example:**

- The model issued a direct suspension recommendation affecting access to work.
- It asserted a numeric risk score without an evidenced basis in the example.
- The represented flow did not include a human decision before the proposed account restriction.
- The output attempted to turn analysis into an account-level consequence.

Directive (EU) 2024/2831 Article 10(5) is relevant to this scenario because it requires certain decisions restricting, suspending, or terminating a platform-work relationship or account, and decisions of equivalent detriment, to be taken by a human being.

This document is an explanatory governance example, not a legal conformity assessment.

---

## WITH Portotify (Recorded Governed Output)

The same scenario is represented by the recorded mock evidence in `courier_account_suspension_BLOCK.json`.

**Step 1: Recorded control context**

The artifact records:

- domain: courier
- account-suspension scenario
- `human_in_loop: true`
- mock engine execution

**Step 2: Mock output guard result**

The recorded mock output contained a suspension verdict.

The courier output guard recorded `COURIER_SUSPENSION_VIOLATION` and the execution was blocked at `post_execution`.

**Step 3: Governed response**

The preserved artifact includes:

```json
{
  "controls": {
    "fail_closed": true,
    "blocked": true,
    "block_reasons": ["COURIER_SUSPENSION_VIOLATION"]
  },
  "meta": {
    "status": "blocked",
    "reason_code": "COURIER_SUSPENSION_VIOLATION"
  },
  "next_action": {
    "type": "human_review_required"
  }
}
```

**Step 4: Evidence interpretation**

The artifact demonstrates a recorded mock governance path in which an account-suspension verdict produced by the mock provider output was rejected and a human-review next action was returned.

It does not prove that Portotify controls every possible downstream platform path or that this artifact alone establishes legal compliance.

---

## What This Means

In this recorded example, the decision-producing system attempted to escalate from analysis into an account-suspension conclusion.

The governed path rejected that output and returned a human-review requirement instead of treating the model conclusion as account-action authority.

That governance boundary is relevant to the human-decision requirement in Directive (EU) 2024/2831 Article 10(5).

The original recorded JSON contains a historical reference to Article 16. That reference is preserved in the artifact and corrected in `ERRATA.md` rather than silently rewritten.

---

**Recorded evidence:** `courier_account_suspension_BLOCK.json`  
**Errata:** `ERRATA.md`

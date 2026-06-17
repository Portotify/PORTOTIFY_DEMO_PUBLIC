# Example Request Payloads

Each file below is a valid `POST /v1/execute` request body. Use with `ENGINE_PROVIDER=mock` for deterministic demo execution.

---

## Domains

| File | Domain | Intent | Demonstrates |
|---|---|---|---|
| `credit_profile_analysis.json` | credit | credit_profile_analysis | Governed execution with gap codes |
| `credit_insufficient_data.json` | credit | credit_profile_analysis | Sufficiency check → BLOCK |
| `finance_summary.json` | finance | financial_summary_analysis | Finance domain execution |
| `health_summary.json` | health | health_summary_analysis | Health domain execution |
| `legal_contract.json` | legal | contract_analysis | Legal domain execution |
| `insurance_policy.json` | insurance | policy_summary_analysis | Insurance domain execution |
| `hrtech_candidate.json` | hrtech | candidate_profile_extraction | HR Tech execution (EU AI Act Annex III.4) |
| `insurance_claims.json` | insurance_claims | claim_profile_extraction | Insurance claims execution |
| `decision_situation.json` | decision | situation_analysis | Decision domain execution |
| `career_cv.json` | career | cv_analysis | Career domain execution |
| `courier_account_suspension.json` | courier | account_suspension | Rider policy violation, governance blocks automatic suspension, human review enforced (EU AI Act Annex III.4, Platform Work Directive 2024/2831) |
| `courier_rider_performance.json` | courier | rider_performance_evaluation | Rider performance signals, no score verdict, pattern observations only |
| `courier_platform_deactivation.json` | courier | platform_deactivation | Permanent deactivation request, human decision mandatory, immutable audit trail |
| `education_learning_gap.json` | education | learning_gap_analysis | Student learning gap analysis, EU AI Act Annex III.3 scope, no grade assertion |
| `external_write_block.json` | career | cv_analysis | External write invariant → BLOCK |
| `injection_test.json` | career | cv_analysis | Manipulation attempt → BLOCK |

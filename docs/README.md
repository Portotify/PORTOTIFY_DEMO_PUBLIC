# Portotify Public Evidence Replay

This directory contains the GitHub Pages public evidence window for Portotify.

The page replays six public-safe recorded execution projections from synthetic production-environment executions across three domains:

- Decision A: ALLOW / COMMITTED / COMPLETED
- Decision B: BLOCK / REJECTED / BLOCKED at post-execution governance
- HRTech C: BLOCKED at pre-execution because `rubric_criteria` was missing
- HRTech D: COMPLETED with `blocked: false` when rubric criteria were supplied
- Health E: COMPLETED with `blocked: false` for an internally consistent external interaction snapshot
- Health F: BLOCKED at post-execution for an internally inconsistent external interaction status/severity snapshot

The source executions used synthetic inputs in the production environment.

The Health records govern the internal consistency of the supplied external interaction snapshot. They do not establish whether the synthetic drug pair clinically interacts, and Portotify did not compute or replace the external interaction conclusion in these recorded executions.

The public page itself:

- is a frozen replay
- makes no production API call
- uses no real customer data
- does not expose full execution identifiers or raw API responses
- does not independently verify capsule signatures
- does not represent an independent audit
- does not infer an explicit HRTech or Health verdict or capsule where those fields were not exposed in the observed responses

The underlying public-safe projections are:

`data/recorded-production-executions.json`

`data/hrtech-recorded-production-executions.json`

`data/health-recorded-production-executions.json`

The Decision projection preserves signed capsule metadata for executions A and B. The observed HRTech responses C and D and Health responses E and F did not expose explicit verdict or capsule metadata, so none is inferred for those records.

This is a deliberately limited public evidence window, not a complete representation of Portotify's runtime decision-governance capabilities.

For repository-wide disclosure rules, see:

`../PUBLIC_DISCLOSURE_POLICY.md`

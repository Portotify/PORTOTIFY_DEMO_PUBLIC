# Portotify Public Evidence Replay

This directory contains the GitHub Pages public evidence window for Portotify.

The page replays two independent public-safe recorded execution projections:

- ALLOW / COMMITTED / COMPLETED
- BLOCK / REJECTED / BLOCKED

The source executions used synthetic inputs in the production environment.

The public page itself:

- is a frozen replay
- makes no production API call
- uses no real customer data
- does not expose full execution identifiers or raw API responses
- does not independently verify capsule signatures
- does not represent an independent audit
- does not establish lineage between the two recorded executions

The underlying public-safe projection is:

`data/recorded-production-executions.json`

This is a deliberately limited public evidence window, not a complete representation of Portotify's runtime decision-governance capabilities.

For repository-wide disclosure rules, see:

`../PUBLIC_DISCLOSURE_POLICY.md`

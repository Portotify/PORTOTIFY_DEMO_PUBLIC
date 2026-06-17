# Portotify Demo Materials (Public)

**Start here →** [WHY_PORTOTIFY.md](WHY_PORTOTIFY.md)

**Updated:** 18 June 2026

---

Portotify is a **Decision Governance** platform. It does not make decisions, it
governs them, whatever produced them: an AI model, a rule engine, or a human.

This repository contains public demo assets that demonstrate how Portotify
evaluates, governs, and audits decisions across 11 industry domains.

---

## What's Inside

- **demo/** → demo script and presentation narrative
- **examples/** → example API request payloads for all 11 domains
- **evidence/** → recorded governance responses showing allow, block, and review outcomes
- **data/** → static governance artifacts (boundary results, signals, guard outputs)

---

## Quick Start

1. Read [WHY_PORTOTIFY.md](WHY_PORTOTIFY.md) for the product overview
2. Review `demo/DEMO_SCRIPT.md` for the demo flow
3. Explore `examples/` for request payloads across all domains
4. Check `evidence/` for recorded governance decisions

---

## What Portotify Does

| Capability | Description |
|---|---|
| **11 Industry Domains** | Career, Legal, Finance, Health, Decision, Insurance, Credit, HR Tech, Insurance Claims, Education, Courier / Last-Mile Delivery |
| **Vendor and Source Independent** | The verdict does not depend on the engine vendor, and the governed decision can come from a model, a rule engine, or a human |
| **Deterministic Verdicts** | Every decision is allowed, blocked, or sent to human review by written rule, not by opinion |
| **Sufficiency Check** | Insufficient input is blocked with specific guidance, not answered with a degraded result |
| **Fail-Closed Architecture** | Unknown states produce blocks, not silent passes |
| **Immutable Audit Trail** | Every decision is append-only, versioned, and traceable |
| **Human Oversight Evidence** | Accept/reject recorded as a new linked record: proof that oversight happened (EU AI Act Article 14) |
| **EU AI Act Compliance** | Framework mapping for Annex III.3, III.4, III.5, III.5a, III.5c |
| **Output Safety** | Manipulation blocked, opinion language rejected, domain output boundaries enforced |
| **Journey Enforcement** | Multi-step decision chaining, not single-shot |

---

## What Portotify Is NOT

- Not a chatbot wrapper
- Not a prompt enhancer
- Not a monitoring dashboard

**Portotify is a governance protocol** that decides whether a decision is
allowed, blocked, or controlled before it propagates. We govern the decision,
not the decision-maker.

---

## Architecture Note

This repository intentionally does not include the Portotify source code.

The core system (engine, backend, governance layers) is maintained in a
separate private development repository. These materials demonstrate governance
outcomes, not mechanisms: detection internals and proprietary safeguards are
not published here.

---

## Contact

[portotify.com](https://portotify.com)
info@portotify.com

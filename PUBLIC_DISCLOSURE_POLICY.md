# Portotify Public Disclosure Policy

**Status:** Active  
**Version:** 1.0  
**Effective:** 19 August 2026

## Purpose

This repository is a public evidence window into Portotify.

It is not a complete specification of the platform, its internal architecture, or its current research surface.

The purpose of this policy is to define what Portotify may claim publicly, what evidence must support those claims, and what must remain undisclosed.

## 1. Evidence Before Claims

A public capability claim must have a known basis.

Every material claim must fall into one of these categories:

### Publicly evidenced

The claim is supported by an artifact published in this repository.

It may be described as demonstrated, recorded, or observed within the explicit scope of that evidence.

### Implemented but not publicly evidenced

The capability has been verified against the current implementation, but sufficient public-safe evidence has not been published.

It may be described narrowly as an implementation property only when its scope is explicit.

It must not be presented as independently verified public evidence.

### Research, design principle, or roadmap

The capability is being researched, designed, tested, or considered.

It must never be presented as an implemented guarantee.

Research direction is not product evidence.

## 2. Outcomes, Invariants, and Boundaries May Be Public

Portotify may publish:

- observable governance outcomes
- narrowly scoped governance invariants
- decision and authority boundaries
- public-safe request and response examples
- synthetic production evidence
- mock evidence when clearly identified as mock
- benchmark results with methodology and limitations
- immutable evidence structures that are safe to disclose
- regulatory framework mappings when clearly distinguished from certification
- known limitations and negative findings

The evidence classification must remain visible.

Recorded production evidence, mock evidence, curated artifacts, benchmarks, and research must not be presented as equivalent forms of proof.

## 3. Mechanisms Remain Private

This repository must not disclose proprietary implementation mechanisms merely to make a public claim appear stronger.

Do not publish:

- internal codenames
- proprietary detection logic
- rule or pattern libraries that expose detection strategy
- internal prompts intended to enforce governance behavior
- security-sensitive implementation details
- secret, credential, or key-management topology
- internal bypass or attack surfaces that would materially weaken controls
- non-public customer or operator information
- unredacted production identifiers
- raw production responses not explicitly approved for public release

Public disclosure should explain what boundary is enforced and what was observed, not unnecessarily expose how proprietary enforcement is implemented.

## 4. Authority Claims Require Authority Evidence

A value supplied by a model, client, operator, external system, or previous execution must not be represented publicly as Portotify authority unless the relevant authority provenance is actually established.

In public language:

- an AI answer is not authorization
- a client assertion is not authority
- an external conclusion is not a Portotify attestation
- a prior governance outcome is not automatically reusable permission
- evidence of an event is not evidence of authority for a different event

Where authority provenance has not been established, public language must fail closed and avoid implying it.

## 5. No Silent Expansion of Scope

A demonstrated property must not be generalized beyond the evidence that supports it.

Examples:

- one recorded production execution does not prove universal behavior
- one domain does not prove identical behavior across every domain
- one model or provider result does not establish provider-wide behavior
- a framework mapping is not regulatory certification
- a security control is not proof that the entire system is secure
- a current implementation property is not a permanent architectural guarantee

Words such as `always`, `all`, `guaranteed`, `compliant`, `secure`, and `impossible` require explicit and current evidence for the exact scope being claimed.

If that evidence does not exist, the claim must be narrowed or removed.

## 6. Known Limitations Are Part of the Evidence

A public artifact must preserve material limitations needed to interpret it correctly.

Portotify does not improve credibility by hiding limitations.

If evidence is frozen, synthetic, mock-generated, redacted, not independently audited, or lacks a public verifier, that limitation must remain visible.

Negative findings may be published when they are accurately scoped and reproducible or supported by preserved evidence.

## 7. Publication Is Fail-Closed

If any of the following is uncertain:

- whether a claim reflects the current implementation
- whether evidence supports the exact wording
- whether an artifact is safe to disclose
- whether production data has been sufficiently sanitized
- whether a capability is implemented or only planned
- whether a regulatory statement implies certification or legal assurance

the material must not be published until the uncertainty is resolved.

Uncertainty does not default to disclosure.

## 8. Source of Truth

For current capability claims, the current implementation and its verified behavior are authoritative.

For public evidence claims, the published artifact and its stated limitations are authoritative.

Marketing, landing pages, articles, presentations, demos, roadmap documents, and research notes must not expand either source of truth.

This repository proves only what its evidence can support.

## Core Disclosure Principle

> Make the governed outcome inspectable.  
> Make the boundary understandable.  
> Make the limitation explicit.  
> Do not expose proprietary mechanisms merely to prove that governance exists.

# Evidence Errata

**Updated:** 19 August 2026

This file records corrections to the interpretation, labeling, or references surrounding preserved evidence artifacts.

Historical evidence files are not silently rewritten merely because a later review identifies a metadata or explanatory error.

Where the original artifact is part of the recorded evidence, it remains unchanged and the correction is documented here.

---

## 1. Platform Work Directive article reference

**Affected artifact:** `courier_account_suspension_BLOCK.json`  
**Recorded:** 22 May 2026  
**Correction recorded:** 19 August 2026

The historical mock response contains a Platform Work Directive mapping to `Article 16` for the human-decision requirement associated with restricting access to platform work.

That article reference is incorrect for that specific requirement.

Directive (EU) 2024/2831, **Article 10(5)**, states that a decision to restrict, suspend, or terminate the contractual relationship or account of a person performing platform work, or another decision of equivalent detriment, must be taken by a human being.

Article 11 separately addresses explanation and human review rights for decisions taken or supported by automated decision-making systems.

### Evidence treatment

The recorded JSON is preserved unchanged as historical evidence.

This erratum corrects the legal-reference interpretation only. It does not modify the recorded governance outcome, reason code, engine classification, or other fields in the original artifact.

The explanatory narrative in `courier_before_after_contrast.md` should use Article 10(5) for this human-decision requirement.

---

## Evidence Preservation Principle

An erratum changes how an artifact should be interpreted.

It does not retroactively change what the recorded artifact contained at the time it was captured.

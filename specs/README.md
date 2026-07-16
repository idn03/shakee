# Shakee

## Overview

> Shakee is a personal project developed to strengthen my software development skills. It is a lightweight real-time chat application that includes user authentication, username search, and real-time messaging between users.

## Document Structure

- `meta/` — Glossary
- `prd/` — Service brief, scope lock, core decisions
- `ux/` — User flows, IA & screen list
- `product-core/` — Data & permissions, lifecycle, business rules, backoffice
- `tech/` — Tech core spec
- `design/` - Design Reference spec

## Conventions

- Each file opens with `Owner / Approver / Status / Last updated`. `Status: Draft` until approver signs off.
- Binding decisions numbered `CD-NNN` in `prd/core-decisions.md`. Reference by number from elsewhere.
- User flows numbered `UF-NNN` in `02_ux/01_user-flows.md` (`0xx` user, `1xx` admin).
- Screens numbered `SCR-NNN` in `02_ux/02_ia-screen-list.md` (`0xx` user-facing, `2xx` back office).
- Spec is intentionally minimum-necessary. AI fills self-evident detail; cross-session continuity via agent memory (`rules/notes.md`), not by expanding this document.
- Style: terse, declarative bullets. Inline-code backticks for identifiers.

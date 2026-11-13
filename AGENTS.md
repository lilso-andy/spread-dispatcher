# Spread dispatcher: shared project context

Read README.md, STATUS.md and TEAM.md before working. docs/RULES.md is authoritative over the handbook. The official API client and types are in typescript/; keep its starter intact for baseline comparisons.

- Run directly with Node >=22.18, preferably Node 24; no package installation is needed.
- Tests: `node --test test/*.test.ts`.
- Credentials: `.env` is local and ignored. Never print it, commit it, put it in fixtures or include it in screenshots.
- Practice work is authorized. Do not consume ranking runs or start the live final while developing unless explicitly requested.
- A quoted request reserves capacity until it loses or becomes an order. Refused actions must never become successful local state.
- De-duplicate events by seq. After an uncertain network mutation, rebuild from the server instead of resending blindly.
- Respect integer cents/minutes, 50 actions per batch, offer quotas, private slots, hours, premium/manual/plates/charging requirements and the multi-car 720-minute limit.
- Validate policy changes on multiple identical seeds for both versions. Report every failed 90% delivery threshold. Midweek scores are not final eligibility evidence.
- Use a personal branch and a pull request for shared changes after the initial setup. Avoid editing a teammate's active module without coordinating.
- Keep durable decisions and verification results in STATUS.md or docs/BENCHMARKS.md so another machine's Codex can resume.
- Exactly one operator controls the final world. Do not start a second dispatcher on the same world.

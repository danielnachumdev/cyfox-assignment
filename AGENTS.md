# Bug Tracker – Agent Context

Implementation guide for coding agents changing **cyfox-assignment**. Product pitch and user-facing run instructions: [`README.md`](README.md). Assignment brief: [`instructions.md`](instructions.md).

---

## Orientation

| Question | Answer |
| -------- | ------ |
| What is this? | Full-stack **bug tracker** (projects + bugs) — take-home demo |
| Frontend | `frontend/` — React 19 + Vite + TypeScript + MUI |
| Backend | `backend/` — Express + TypeScript + `pg` |
| Database | PostgreSQL 15 via Compose |
| Toolchain | npm at repo root (`concurrently`); per-package lockfiles |
| Node | **18+** (frontend README); CI via shared actions |
| Tests | `backend/tests/` (Jest), `frontend/src/test/` (Vitest) — **never delete** |
| Secrets | Never commit `.env`, real DB passwords, API keys, tokens |

```text
.
├── .github/                 # CODEOWNERS, dependabot, thin CI/semver orchestrators
├── .kiro/                   # Design specs + steering (historical assignment notes)
├── backend/
│   ├── src/
│   │   ├── controllers/     # project-controller, bug-controller
│   │   ├── routes/          # Express routers
│   │   ├── services/        # DB-backed business logic
│   │   ├── models/          # Types / shapes
│   │   ├── validators/      # express-validator rules
│   │   ├── middleware/      # errors, logging, validate()
│   │   ├── database/        # pool, migrate, seed, migrations/*.sql
│   │   ├── utils/           # swagger helpers
│   │   ├── app.ts           # Express app composition
│   │   └── index.ts         # listen + migrate on boot
│   ├── tests/               # Jest + Supertest
│   ├── .env.example
│   └── Dockerfile
├── frontend/
│   ├── src/
│   │   ├── pages/           # ProjectsPage, ProjectDetailsPage, NotFoundPage
│   │   ├── components/      # cards, dialogs, filters, chips
│   │   ├── services/api.ts  # Axios client
│   │   ├── types/
│   │   └── test/            # Vitest + RTL
│   ├── nginx.conf           # production static + /api proxy
│   └── Dockerfile
├── scripts/                 # wait-for-db / wait-for-test-db
├── docker-compose.yml       # postgres + backend + frontend
├── docker-compose.test.yml  # postgres-test on host :5433
├── package.json             # root orchestrator
├── instructions.md          # assignment brief
├── README.md                # marketing / quick start
└── AGENTS.md
```

Shared CI: [`danielnachumdev/actions`](https://github.com/danielnachumdev/actions) (`@latest` in this repo’s thin workflows). Adoption notes: [`HOW-TO-USE.md`](https://github.com/danielnachumdev/actions/blob/v1/HOW-TO-USE.md).

---

## Develop

Root scripts wire both packages and Postgres:

```bash
npm install              # backend + frontend packages only (no Postgres)
npm run db:setup         # compose postgres + migrate + seed
npm run dev              # concurrently API :3000 + Vite :3001
npm run build
npm test                 # backend (spins test DB) + frontend
npm run test:backend
npm run test:frontend
npm run db:reset         # down -v then setup
```

| Task | Command / note |
| ---- | -------------- |
| API only | `npm run dev:backend` or `cd backend && npm run dev` |
| UI only | `npm run dev:frontend` (proxies `/api` → `:3000`) |
| Full Compose | `docker compose up --build` → UI `:80`, API `:3000` |
| Swagger | `http://localhost:3000/api-docs` |
| Lint (frontend) | `cd frontend && npm run lint` |

### Env / DB credentials

- Template: `backend/.env.example` (dev defaults may say `postgres`/`password`).
- **Compose app DB** (`docker-compose.yml`): user/db/password `bugtracker`, host port `5432`.
- **Test DB** (`docker-compose.test.yml`): `bugtracker_test` on host port **5433**.
- Align `backend/.env` with whichever Postgres you actually run. Do not commit `.env`.

### Dependencies (high level)

- **Backend runtime:** express, pg, cors, helmet, morgan, dotenv, express-validator, swagger-ui-express / swagger-jsdoc
- **Frontend runtime:** react, react-dom, react-router-dom, @mui/material, axios
- Security floors / pins: package `overrides` in `backend/package.json` and `frontend/package.json` (Dependabot-driven). Prefer bumping via Dependabot or careful lockfile updates, not deleting overrides blindly.

---

## Domain & API shape

**Schema** (`backend/src/database/migrations/`):

- `projects`: `id`, `name`, `created_at`
- `bugs`: `id`, `project_id` (FK cascade), `title`, `description`, `severity` ∈ `low|medium|high|critical`, `status` ∈ `open|in_progress|resolved|closed`, `created_at`

**HTTP** (mounted under `/api`; see routes + Swagger):

- Projects: `GET/POST /api/projects`, `GET/PUT/DELETE /api/projects/:id`
- Bugs: `GET/POST /api/projects/:projectId/bugs`, `GET/PUT/DELETE .../bugs/:bugId`, `GET .../bugs/statistics`
- List bugs supports filter/sort query params (severity, status, created_at). Keep `ORDER BY` on allowlisted columns only (SQL injection hardening already applied).

Layering: **routes → validators/middleware → controllers → services → pg**. Prefer extending that chain over dumping SQL into controllers.

Frontend pages: list projects → project detail (bugs, filters, create/edit dialogs, stats). API client: `frontend/src/services/api.ts`.

---

## Code style notes

- TypeScript throughout; keep models/validators in sync with SQL CHECKs.
- Backend errors: use existing error middleware / custom error types; return consistent JSON shapes.
- Frontend: MUI components; keep presentational pieces in `components/`, pages thin.
- Do not rewrite moviepy-style “unrelated” stacks — stay on Express + React + pg.
- Historical Kiro specs in `.kiro/` are reference only; prefer code + this file as source of truth for agents.

---

## PRs, CI, and releases

1. Branch off `main`; open a PR into `main`.
2. Attach **exactly one** semver label: `noBump` | `bumpPatch` | `bumpMinor` | `bumpMajor`.
3. **CI** — `.github/workflows/ci.yml` → `danielnachumdev/actions` `ci.yml` + `semver-ci.yml` (`@latest`). Prefer required checks **`CI / CI`** and **`Semver / Semver`**.
4. Dependabot PRs stay on **`noBump`**.
5. Change shared CI/semver behavior in **`danielnachumdev/actions`**, not by re-vendoring here.
6. Code owner: `.github/CODEOWNERS` → `@danielnachumdev`.

This repo is a private/demo assignment app — there is no PyPI-style publish path; treat version bumps as GitHub/semver workflow only if CD is wired.

---

## Sensitive / ignored

Do not commit: `.env`, `.env.*` (except `.env.example`), credentials, tokens, live hostnames/PII in docs or PRs. Respect `.gitignore` (`node_modules/`, build output, coverage, local Postgres volumes). Track lockfiles (`package-lock.json` at root and under `backend/` / `frontend/`).

# Bug Tracker

**Full-stack bug tracking app** — projects, severity/status workflows, filters, and stats. React + TypeScript UI, Node/Express REST API, PostgreSQL. Built as a take-home assignment; kept as a working demo.

[![CI](https://github.com/danielnachumdev/cyfox-assignment/actions/workflows/ci.yml/badge.svg)](https://github.com/danielnachumdev/cyfox-assignment/actions/workflows/ci.yml)

Requires **Node.js 18+** and **Docker** (PostgreSQL for local/dev and Compose for the full stack).

## Why this exists

A minimal product surface for tracking bugs per project without a heavy issue tracker:

- **Projects** — create and browse projects
- **Bugs** — title, description, severity (`low` → `critical`), status (`open` → `closed`)
- **Filter & sort** — by severity, status, and creation time
- **Stats** — per-project summaries
- **Swagger** — interactive API docs at `/api-docs`
- **Docker** — one Compose file for frontend, API, and Postgres

## Quick start

### Docker (easiest)

```bash
docker compose up --build
```

| Surface | URL |
| ------- | --- |
| App | http://localhost:80 |
| API | http://localhost:3000 |
| Swagger | http://localhost:3000/api-docs |

### From source (development)

```bash
npm install          # installs backend + frontend packages
npm run db:setup     # start Postgres, migrate, seed
npm run dev          # API :3000, Vite :3001 (proxies /api)
```

Optional: copy `backend/.env.example` → `backend/.env` and align DB credentials with Compose (`bugtracker` / `bugtracker` on port `5432`).

## Stack

| Layer | Choice |
| ----- | ------ |
| Frontend | React 19, Vite, TypeScript, MUI, React Router, Axios |
| Backend | Node.js, Express, TypeScript, `pg`, express-validator, Swagger |
| Database | PostgreSQL 15 |
| Tests | Jest + Supertest (API), Vitest + Testing Library (UI) |

## Assignment notes

Spec: [`instructions.md`](./instructions.md). Checklist covered: REST projects/bugs CRUD + list, filter/sort, React project list + detail pages, MUI, bonus edit + validation.

**Trade-offs (short):** REST over GraphQL for scope; React for familiarity under deadline; Postgres for relational integrity; severity/status as `CHECK` enums; lean project rows (`id`, `name`, timestamps).

**Journey:** Kiro for design (`requirements` → `design` → `tasks`), backend-first with Swagger, then React/MUI, then Compose for unified run. Specs under [`.kiro/`](./.kiro/).

Agent/contributor workflow (layout, commands, CI labels, secrets): [`AGENTS.md`](./AGENTS.md).

## License

MIT (no separate license file in-repo yet).

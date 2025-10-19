<div align="center">
  <h1>resources-manager-app</h1>
  
  <p>Inventory management client application — final college project. Built as a client-side single-page app with a decentralized data store and no central backend.</p>

  <p>
    <a href="https://saas.feijo.dev/" target="_blank">Live demo</a>
  </p>
</div>

---

## Table of contents

- [About](#about)
- [Features](#features)
- [Tech stack](#tech-stack)
- [Getting started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Install](#install)
  - [Run (development)](#run-development)
  - [Build (production)](#build-production)
  - [Lint & Test](#lint--test)
- [Project structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## About

This project is an inventory/resources manager implemented as a client-side React application. It demonstrates a decentralised approach to data storage and a responsive UI for managing items, categories and users (no central backend required).

## Features

- Inventory and resource management UI
- Client-side routing and state management
- Decentralized/local-first data storage
- Production build and static deployment-ready (served from `docs/`)

## Tech stack

- React 19
- Rspack / Webpack tooling
- BaseUI + Styletron for styling
- Redux Toolkit for state management

## Getting started

### Prerequisites

- Node.js (for compatibility with some tools) — the project specifies `node: 24.9.0` in `package.json` engines but Bun is supported for install/build steps in CI.
- Yarn or Bun (both supported). Use whichever you prefer locally.

### Install

Using Yarn:

```bash
yarn
```

Using Bun:

```bash
bun install
```

### Run (development)

Start a dev server (Rspack):

Using Yarn:

```bash
yarn start
```

Using Bun (if your environment maps scripts correctly):

```bash
bun run start
```

### Build (production)

Produce an optimized production build (outputs to `build` or `docs` depending on configuration):

Using Yarn:

```bash
yarn build
```

Using Bun:

```bash
bun run build
```

### Lint & Test

Lint the codebase (ESLint):

```bash
yarn lint
# or
bun run lint
```

Run tests (the `test` script currently prints a success value):

```bash
yarn test
# or
bun run test
```

## Project structure

Top-level folders you'll commonly work with:

- `src/` — application source (components, scenes, functions, data)
- `.config/` — build/tooling configuration (Rspack)
- `docs/` — static site output (used for GitHub Pages deployment)

## Contributing

Contributions are welcome. A few guidelines:

- Keep changes small and focused.
- Run the linter and tests before opening a PR.
- Update the README or docs for any public-facing changes.

## License

This project is open source and licensed under the terms in the `LICENSE` file.

## Contact

Site / demo: https://resources-manager.feijo.dev/

If you want help updating CI, switching package manager scripts, or adding tests, tell me what you'd like and I can make the changes.

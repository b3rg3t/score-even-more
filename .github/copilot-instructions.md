# Copilot instructions for score-even-more

## Project overview

This repository is a Vite + React + TypeScript app for a score-tracking / game scoreboard UI. The app is centered around a single `Game` screen, with Redux Toolkit state driving rounds, players, scoring, and persistence.

Key entry points:

- `src/main.tsx` mounts the React app, creates the Redux store, and registers the PWA service worker in production.
- `src/App.tsx` is intentionally thin and renders the `Game` page.
- `src/pages/game/Game.tsx` composes the full game layout (`Topbar`, `Scoreboard`, `RoundList` / `SwipeRound`, `Podium`, `Footer`).
- `src/store/redux/store.ts` configures the combined Redux reducer and adds the app middleware.
- `src/store/reducers/game/gameSlice.ts` contains the main game logic (rounds, scoring, player removal, finished state, drawers, settings).
- `src/store/reducers/players/playersSlice.ts` stores player data as a Redux entity collection.
- `src/util/localStorage.ts` and `src/store/redux/preloadedState.ts` are part of the persistence model: the store is rehydrated from browser storage on startup.

## Build, lint, and validation commands

Use the project scripts from the repo root:

- `npm install` — install dependencies
- `npm run dev` — start the Vite dev server
- `npm run build` — run TypeScript compilation and then `vite build`
- `npm run lint` — run ESLint across the project
- `npm run serve` — preview the production build locally

There is no dedicated test script and no test files in this repo, so there is no standard "single test" command to run. For a single-file validation pass, use ESLint directly on a file, for example:

- `npx eslint src/components/game/scoreboard/Scoreboard.tsx`

If you need a quick repo-level validation step before finishing a change, prefer:

- `npm run build`
- `npm run lint`

## Architecture and state flow

The app uses a small Redux architecture rather than a multi-page router:

- `setupStore()` creates a root reducer with `game` and `players` slices.
- `gameMiddleware` writes each Redux slice to localStorage after every dispatch.
- `getPreloadedState()` restores saved `game` and `players` state from localStorage before app startup.
- `Game` reads selectors from the Redux store and swaps between demo mode and the active gameplay view.
- Game and player data are strongly typed under `src/models` (`interface`, `type`, `enum`), and helpers under `src/store/reducers/.../helpers` contain the score and round logic.

This means the safe pattern for changes is:

- extend or update the relevant slice / helper rather than introducing new global state ad hoc
- keep the UI component tree thin and push stateful logic into Redux selectors and reducers
- reuse the existing `gameSlice` / `playersSlice` conventions instead of creating a second state system

## Styling and UI conventions

Use the following conventions when changing styles:

- Prefer Bootstrap utility classes before custom SCSS.
- Only add custom SCSS when Bootstrap utilities cannot express the design.
- Keep feature styles scoped to the feature root with the established BEM-like naming (`__` for elements, `--` for modifiers).
- Avoid broad global selectors in feature stylesheets; keep intentional app-wide rules in `src/styles/App.scss`.
- Reuse the existing purple / neutral visual language, rounded cards, borders, subtle shadows, and `rem`-based sizing.
- Add responsive adjustments for narrower screens and preserve accessible focus states.
- Make interactive surfaces keyboard accessible, with clear labels, visible focus states, and reduced-motion support when animation is used.
- Preserve the mobile-first layout: many screens appear inside the bottom drawer, whose content area is height-constrained and scrollable.
- Reuse existing icons, localized strings, and shared UI components rather than adding remote image dependencies or duplicating shared behavior.

For player profile pages:

- Keep player identity, key statistics, edit controls, and game activity visually distinct and easy to scan.
- Keep avatar selection keyboard operable and expose the selected state to assistive technology.
- Let long player and game names truncate or wrap without pushing status badges outside the drawer.

## Code conventions specific to this repo

- The project uses TypeScript heavily; prefer existing model types and enums over loose inline objects.
- Keep the Redux store as the source of truth for game status and player data; avoid duplicated local component state for things already represented in a slice.
- Match the feature-oriented structure already present in `src/components`, `src/pages`, `src/store`, and `src/models` rather than creating a different layering pattern.
- When adding or changing persisted state, consider localStorage compatibility and the store rehydration path (`preloadedState.ts` + middleware).
- The repository is intentionally app-specific rather than framework-agnostic; follow the established naming and composition patterns already used in the game UI.

## Additional repo notes

- The root README is effectively the default Vite starter text and does not define product-specific workflow guidance.
- Keep these repository instructions aligned with the actual source tree and project scripts; avoid referring to customization files that do not exist.

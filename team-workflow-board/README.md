# Team Workflow Board (React, JavaScript)

## Run
1. `npm install`
2. `npm run dev`

## Overview
- Board with Backlog / In Progress / Done
- Create/edit tasks (modal), client-side validation
- Filters and sort are stored in URL query string
- Persistence in localStorage with simple versioned migrations
- Small component library in `src/components/ui`

## Tests
Run tests per your setup (e.g. `npm test` with jest/react-testing-library)

## Notes
- No TypeScript (per requirement)
- Drag-and-drop not implemented (status change via select)
- Storage migrations implement an example v1 -> v2 path
- I used small helper hooks: `useLocalStorage`, `useDirtyForm`, `useFilterSync`
- Toasts provide non-intrusive notifications

# QA Test Report

## Testing Approach

### Manual Testing Steps

1. Started backend using `node index.js`
2. Opened `http://localhost:5000/api/data` in the browser to confirm JSON data loads correctly.
3. Started frontend using `npm run dev`
4. Opened `http://localhost:3000` to verify that the CSV data is displayed in the table.
5. Modified sample values in the CSV file to confirm updates appear in the frontend after reload.
6. Checked responsiveness and layout accuracy based on the Figma design.

## Issues Encountered and Fixes

| Issue | Resolution |
|-------|------------|
| CORS error between frontend and backend | Used `cors()` middleware in Express backend |
| Redux `dispatch` type error in TypeScript | Used `useDispatch<AppDispatch>()` and exported types from `store.ts` |
| ReactNode type error from `Object.values(row)` | Wrapped values with `String(val)` to ensure valid rendering |

## Tools Used

- Browser Developer Tools (Chrome DevTools)
- Console and terminal logs for backend debugging
- TypeScript compiler and VS Code IntelliSense for catching type issues

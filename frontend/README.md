# Full Stack Developer Interview Assessment

## Project Overview

This project implements a single page from a provided Figma design using the required full stack tech stack. The page fetches and visualizes a dataset from a provided CSV file, integrating both frontend and backend components. The frontend is built with Next.js (App Router), Tailwind CSS, Redux Toolkit, and TypeScript. The backend uses Express.js to parse and serve the CSV file.

## Installation and Running Instructions

### Backend

1. Navigate to the backend directory:

2. Install dependencies:

3. Start the backend server:

The backend will run on `http://localhost:5000`.

### Frontend

1. Navigate to the frontend directory:

2. Install dependencies:

3. Start the development server:

The frontend will run on `http://localhost:3000`.

## Development Approach and Key Implementation Decisions

- Used `csv-parser` in the Express backend to read and parse the provided CSV file.
- Created a RESTful API endpoint (`/api/data`) to serve the parsed CSV data as JSON.
- Connected the frontend to this API using Axios within a Redux Toolkit async thunk.
- Implemented global state management with Redux Toolkit to handle the data lifecycle.
- Used Tailwind CSS to match the styling and layout closely to the Figma design.
- Maintained all application logic within a single page, as scoped by the assessment.

## Assumptions

- The CSV file provided has consistent formatting and valid headers.
- No authentication or external storage (e.g., MongoDB, Azure) was required, as the dataset was static.
- Only the main content section needed to be implemented (not the sidebar or header).

## Known Issues or Limitations

- No filtering, pagination, or sorting is implemented on the table.
- Data visualization is limited to a table view, as specified by the provided Figma design.
- All data is loaded at once; there is no server-side pagination or optimization for large files.

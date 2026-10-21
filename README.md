# Job Tracker

A React single page application for students to keep track of the jobs and internships they applied to: the company, the role, and the stage each application is at.

**Live demo:** _add link here_

## Features

- List of 120 seeded applications from tech companies in Kazakhstan
- Search by company or position
- Filter by status: applied, interview, offer, rejected
- Sort by newest, oldest, or company name (A–Z)
- Pagination with 10 applications per page
- Detail page for each application
- Form for adding a new application with required-field validation
- Edit an application from its detail page
- Loading, error, empty, and success states
- Responsive dark UI

## Tech

- React + Vite
- React Router
- Plain CSS

The data comes from a simulated API (`src/api.js`). It returns Promises with a short delay, is seeded from `src/data/applications.json`, and saves changes in `localStorage`.

## How to run

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
npm run preview
```

## Project structure

```
src/
  api.js            simulated API
  data/             seed data
  components/       reusable components
  pages/            list, detail, and add pages
```

## Deploy

The app is deployed on Vercel. `vercel.json` rewrites all routes to `index.html` so direct links to detail pages work.

# Help Desk App

<img width="1438" alt="Screenshot 2024-03-19 at 7 52 29 AM" src="https://github.com/gcn12/zealthy/assets/63011139/821bed65-7897-496d-8e8e-ca214266b75c">

## Demo the app 

Submit ticket: https://zealthy-five.vercel.app

View dashboard: https://zealthy-five.vercel.app/dashboard

## Notable features

- Full text search via Postgres
- Custom UI design
- Filter by ticket status
- Pagination
- Page, search query, and filter settings stored in URL params
- Optimistic updates upon status change

## Getting started

Install dependencies:

```sh
yarn install
```

Create a .env file in apps/server and add a Postgres connection string:

```sh
DATABASE_URL=<DATABASE_CONNECTION_STRING>
```

Migrate the database schema by navigating to the apps/server directory and runnning:

```sh
npx prisma migrate dev
```

To start the server and web app, navigate to the root directory and run:
```sh
yarn run dev
```

To run e2e tests, navigate to the apps/server directory and run:
```sh
yarn run test
```

## Technical details:

### Frontend:
The frontend was created with Next.js, TypeScript, HeadlessUI, Tailwind, React Hook Form, and TanStack Query

### Backend:
The backend utilized Express.js, Postgres, and Prisma 

### Testing:
End-to-end tests were created with Playwright. The test creates a ticket and modifies the status, ensuring everything is working properly along the way

### Infrastructure:
The frontend is hosted on Vercel and the backend is hosted Railway

### UI Design
The UI was created from scratch. To see the final mockups and early versions, take a look at the Figma link: https://www.figma.com/file/Ox8EL9QFFxbOwTdTGSuHdT/Zealthy?type=design&node-id=43%3A410&mode=design&t=VIFzZwbuw5nDnc9P-1

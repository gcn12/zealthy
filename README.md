# Help Desk App

<img width="1534" alt="Screenshot 2024-03-17 at 6 34 55 PM" src="https://github.com/gcn12/zealthy/assets/63011139/2d20bbc4-d644-4ab2-9a0c-04e082fffac4">

Live app: 
Submit ticket: https://zealthy-five.vercel.app
View dashboard: https://zealthy-five.vercel.app/dashboard


## Starting the app

Install dependencies:

```sh
yarn install
```

Create a .env file in apps/server and add a Postgres connection string:

```sh
DATABASE_URL=<DATABASE_CONNECTION_STRING>
```

Navigate to the apps/server directory and run:

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
The backend utilized Express.js, Postgres, Prisma 

### Testing:
End-to-end tests were created with Playwright. The test creates a ticket and modifies the status, ensuring everything is working properly along the way

### Infrastructure:
The app was hosted on Vercel and Railway

### UI Design
All designs were created from scratch. To see the final mockups and early versions, take a look at the Figma link: https://www.figma.com/file/Ox8EL9QFFxbOwTdTGSuHdT/Zealthy?type=design&node-id=43%3A410&mode=design&t=VIFzZwbuw5nDnc9P-1

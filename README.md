# EBUDDY Technical Test

## Table of Contents

- [Core Technologies](#core-technologies)
- [Getting Started](#getting-started)
- [Self Reflection](#self-reflection)
- [Technical Questions](#technical-questions)
- [Personality Questions](#personality-questions)

### Core Technologies

- Frontend :
  - [Next.js (React)](https://nextjs.org/)
  - [TypeScript](https://www.typescriptlang.org/)
  - [Material UI](https://mui.com/)
  - [Redux](https://redux.js.org/)
- Backend :
  - [ExpressJS](https://expressjs.com/)
  - [Firebase](https://firebase.google.com/)

### Getting Started

This application is built in Monorepo by Turbo. The application (Frontend + Backend) source code can be found inside `/apps` folder. To run both apps pararelly, you can follow this code:

```bash
# Install dependencies for the host
npm install

# Start the application
npm run dev
```

To use Firebase emulator, you can follow this:

```bash
# go to the backend repo directory
cd apps/backend-repo

# start firebase emulator
firebase emulators:start --only functions

OR

# go to the functions directory first
cd apps/backend-repo/functions

# then serve the emu
npm run serve
```

By running the above command, firebase will give the endpoint like this `http://localhost:5001/ebuddy-71246/us-central1/fetchUserData`.

Then, on the frontend we can change the base API URL (`/src/config/urls.ts`) in this variable `BE_API` to `http://localhost:5001/ebuddy-71246/us-central1` and the rest of the endpoints needs to be change to `camel case` such as `fetchUserData` instead of `kebab-case` so the frontend able to use the API from Firebase emulator

### Self Reflection

As per technical requirements, this app needs to built using Monorepo and integrate with Firebase auth and Firestore databases which things I haven't work before to be honest since I use MERN stack with Nextjs Typescript on the Frontend for daily basis. But after completing the app (which far from perfect), I realize that there are lot of new things that I can learn if I joined the company and that's why I really excited with the new opportunity since I love to keep up to date with technologies and keep growing. I'm totaally fine if the technical team think my app doesn't fit with the criteria since from this technical assignment I already learn how to connect with Firebase etc and also setuping Monorepo with Turbo which is new architecture for me and it will help me for sure for my professional career.

### Technical Question

Since I'm not familiar with Firestore, I think my answer is not that relevant, but I will do my best.

#### My answer for the Firestore query question is:

To determine the most potential users, I would create a separate function to calculate the potential score based on weighted factors. Since Firestore does not support multi-factor sorting directly, I would:

- Fetch users in bulk using a Firestore query with a reasonable limit.
- Calculate the potential score locally using a formula ( I'm not that good with Math so might need AI to help me with this :D ) that assigns different weights to each factor:
  - totalAverageWeightRatings (most important)
  - numberOfRents
  - recentlyActive (normalized)
- Sort users based on the computed potential score before displaying results.

This approach ensures that all three factors are considered together, rather than being sorted hierarchically.

### Personal Question

- What are the most difficult technical problems in your work experience you have encountered and how do you fix them?
  - I've develop an ERP project, and we have some issue with the performance since the Frontend handled a pretty big data from API and the API that we use apparently doesn't support a pagination feature. How I fix them?
    - I'm installing Redis to our app so Redis will cache the data from API since the data isn't changed frequently and refactoring some duplicated API calls to make the frontend performance smoother
- When you’re working on a project, how do you typically approach it from start to finish?
  - Usually I will have a chat or call with my project manager to really understand the project, then I will start to decide which technologies that will fit for the project because that's really important to be decided on the beginning. Then, I will continue with the Database planning and creation before start working on the source code development of the project
- How do you usually approach learning a new topic to absorb as much as possible?
  - I usually start to read the documentation first, then I will create some use case project using the new tech so I can familiarize with it quickly since working with it directly can tell us how's the tech is working
- “Consistency” vs “fast & efficient”. Choose one.
  - I would say “fast & efficient”, because technologies keep updating everytime and it's updating really fast, we can't really "Consistent" with our code since there might be some updates that makes our code deprecated. So, it's good to be fast as long as it efficient. Don't be only fast but not efficient because it's not good. Also, "Consistency" can be bad if we doing some bad practices on our code and we're not really learning from our mistake and "Consistently" doing same mistake again in the future.
- Do you own any Apple products? Like IMac, Macbook, Ipad, Iphone, etc…
  - I do have Apple products which is iPhone who I use for daily basis
- What is your immediate availability to start this job?
  - I have 1 month notice period, but if the position is really urgent then perhaps I can start earlier.

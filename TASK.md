# DPL Trial Exercise (TypeScript)

This exercise is divided into multiple parts, solve at least the first. If you take on all tasks: **it's okay if parts are sketchy, as long a you put your effort into the frontend**.

## Frontend Part

Create an app that worries only about one thing, selecting the date of your birthday.

- Create a **React+TypeScript+SCSS** application

- Create a **Birthday** component (only component in the app)

  - **it must use** typescipt all the way

  - **it must** have 3 input fields for: day, month, year

  - **it must** help users to enter data (suggestions, dropdown)

  - **it must** validate input to be a **real date**

  - **it must** validate input to be **more than 18 years ago**

  - **it must** look awesome

  - **do not** use a library component, date-picker

  - **you may** use **@mui and co.** to build your component

  - **you may** use **moment** or another date-handling lib

  - **bonus** keyboard navigation

  - **bonus** use redux

  - **bonus** PWA+LocalStorage Persistence

## Backend Part

### Either: Apollo Way

- Create an apollo-based graphQL backend exposing:

  - a **getBirthday** query

  - a **setBirthday** mutation

- integrate your frontend with the backend

  - - **bonus** use redux+saga

- **bonus** use typescript

- **bonus** persistent storage

### Either: Express Way

- Create an express-based REST backend exposing:

  - a **GET /birthday** route

  - a **PUT /birthday** route

- integrate your frontend with the backend

- **must** persistent storage

- **must** use typescript

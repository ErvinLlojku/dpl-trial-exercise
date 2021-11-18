# DPL Trial Exercise

This is a trial exercise to review frontend and backend skills

The task requested to built a app using react that includes a "birthday component". The user can select and update his/her birthday. Please view all details in [TASK.md](./TASK.md)

> The project is divided into `client` and `server` folders respectively for the frontend and the backend of the application.

To run the project you need the following tools:

- Node (lts/stable)

Let's check to see if you already have Node installed. Bring up a terminal and type `node --version`. If Node responds, and if it shows a version at or above v6.10.x, proceed to checking if you have Ruby installed too. If you require Node, go to [nodejs.org](http://nodejs.org/) and click on the big green Install button.

## Client

The client is built using `Reactjs:"^17.0.2"`

Steps to follow to setup the backend:

- Install the dependencies and run the project

Go to `/client` and run:

```shell
npm install && npm start
```

This is it!

## Backend

The backend is built with nodejs and uses Apollo Server and Graphql for data manipulation.
MySQL database is used for the storage.

Steps to follow to setup the backend:

- Install dependencies.

To setup the server go to `/server` and run:

```shell
npm install && npm start
```

- Create the database.

Go to your prefered MYSQL client and create a new database with a name of your preference. Import in the database the file provied "dpl_trial_exercise.sql".

For security reasons is suggested to create a database user that has access only to this database.

- Update `.env` configuration file

After you have setup the database. Rename `.env.example` to `.env` and add you database information.

This is it!

# Chat

## Introduction

A chat app that offers the possibility to signup as user and chat with other users

## Prerequisites

- Node.js and npm installed
- Docker installed

## Getting started

### Database

- Run the database image:

```bash
docker compose up
```

### Backend

- Copy the `.env.example` to create a new file `.env` and change the database url.
- Install the dependencies:

```bash
npm install
```

- Generate the prisma client

```bash
npx prisma generate
```

- Create the database migrations

```bash
npx prisma migrate dev
```

### Frontend

- Copy the `.env.example` to create a new file `.env`
- Install the dependencies:

```bash
npm install
```

## Running the app

Run the backend:

```bash
npm run start:dev
```

Run the frontend:

```bash
npm run start:start
```

The frontend will be available at: http://localhost:3000/ ( unless you change that).

And the backend will be available at: http://localhost:4000/ ( unless you change that).

You will have also Swagger documentation available at http://localhost:4000/docs/.

Both the app and api restart on code change.

## Improvements Roadmap

### Feature Improvements

- [x] Websocket
- [x] JWT management
- [x] Login
- [ ] Signup
- [ ] Chat with any member
- [ ] Create channels

### Tech Improvements

- [ ] XXX

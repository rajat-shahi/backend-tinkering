# REST API using Express + MongoDB (Mongoose)

A small learning project that builds a REST API with **Express** and persists user data in **MongoDB** using **Mongoose**.

## Prerequisites

- Node.js (LTS recommended)
- npm
- MongoDB running locally

## Setup & run

```bash
cd rest-api-using-express-and-mongo
npm install
npm start
```

The server listens on **port 3000**.

## MongoDB connection

This app connects to MongoDB using the hardcoded connection string:

- `mongodb://127.0.0.1:27017/rest-api-test`

So you’ll want a local MongoDB instance running that can accept connections on `127.0.0.1:27017`.

## Routes

### HTML

- **GET** `/users` → renders an HTML list of user first names (data fetched from MongoDB)

### JSON API

- **GET** `/api/users` → list all users
- **POST** `/api/users` → create a user (**expects JSON body**)
- **GET** `/api/users/:id` → get a user by Mongo ObjectId
- **PATCH** `/api/users/:id` → update a user by Mongo ObjectId
- **DELETE** `/api/users/:id` → delete a user by Mongo ObjectId

## Request/response examples

### Create a user

```bash
curl -X POST "http://localhost:3000/api/users" \
  -H "Content-Type: application/json" \
  -d '{
    "first_name": "Rajat",
    "last_name": "Shahi",
    "email": "rajat.mongo@example.com",
    "gender": "male",
    "job_title": "Developer"
  }'
```

### List users

```bash
curl "http://localhost:3000/api/users"
```

### Get/update/delete by id

Replace `<id>` with a MongoDB ObjectId returned by the API:

```bash
curl "http://localhost:3000/api/users/<id>"
```

```bash
curl -X PATCH "http://localhost:3000/api/users/<id>" \
  -H "Content-Type: application/json" \
  -d '{
    "first_name": "Updated",
    "last_name": "Name",
    "email": "updated@example.com",
    "gender": "other",
    "job_title": "Engineer"
  }'
```

```bash
curl -X DELETE "http://localhost:3000/api/users/<id>"
```

## Data model (Mongoose)

The stored fields are:

- `firstName` (required)
- `lastName`
- `email` (required, unique)
- `gender`
- `jobTitle`


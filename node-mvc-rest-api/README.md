# MVC REST API

A small **Node.js** REST API that follows an **MVC-style** layout: routes map HTTP to controller handlers, controllers talk to the **Mongoose** model, and database connection is isolated in its own module.

## Stack

- [Express](https://expressjs.com/) — HTTP server and routing
- [MongoDB](https://www.mongodb.com/) via [Mongoose](https://mongoosejs.com/) — persistence and schemas
- [nodemon](https://nodemon.io/) — dev server restarts (`npm start`)

## Prerequisites

- Node.js (LTS recommended)
- MongoDB running locally (default connection string targets `127.0.0.1:27017`)

## Setup

```bash
cd node-mvc-rest-api
npm install
```

Ensure MongoDB is reachable at the URL used in `index.js` (see **Configuration**).

## Run

```bash
npm start
```

The server listens on **port 3000** and mounts user routes under `/api/users`.

## Configuration

Database URL is set in `index.js`:

```text
mongodb://127.0.0.1:27017/rest-api-test
```

Change this if your MongoDB host, port, or database name differs.

## Project layout

| Path                  | Role                                             |
| --------------------- | ------------------------------------------------ |
| `index.js`            | Express app, middleware, DB connect, route mount |
| `connection.js`       | `mongoose.connect` helper                        |
| `models/user.js`      | User schema and model                            |
| `routes/user.js`      | HTTP verbs and paths → controller functions      |
| `controllers/user.js` | Request/response logic and Mongoose calls        |

## API

Base path: `/api/users`

| Method   | Path             | Description                      |
| -------- | ---------------- | -------------------------------- |
| `GET`    | `/api/users`     | List all users                   |
| `POST`   | `/api/users`     | Create a user                    |
| `GET`    | `/api/users/:id` | Get one user by MongoDB ObjectId |
| `PATCH`  | `/api/users/:id` | Update a user                    |
| `DELETE` | `/api/users/:id` | Delete a user                    |

### Create user (`POST /api/users`)

JSON body must include all of:

- `first_name` (string)
- `last_name` (string)
- `email` (string, unique in DB)
- `gender` (string)
- `job_title` (string)

These map to the model as `firstName`, `lastName`, `email`, `gender`, `jobTitle`.

**Example**

```bash
curl -s -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"first_name":"Ada","last_name":"Lovelace","email":"ada@example.com","gender":"F","job_title":"Engineer"}'
```

**Success:** `201` with `{ "msg": "User Creation Successfull" }`  
**Validation failure:** `400` with `{ "msg": "Invalid Payload, all fields are required" }`

### Update user (`PATCH /api/users/:id`)

Send the same snake_case fields in the body as for create (`first_name`, `last_name`, `email`, `gender`, `job_title`).

### Errors

- Invalid or missing user id / not found: typically `404` with `{ "msg": "User ID is invalid" }`

## User model (summary)

- `firstName` — required
- `lastName` — optional
- `email` — required, unique
- `gender`, `jobTitle` — optional
- `timestamps` — Mongoose `createdAt` / `updatedAt`

## License

ISC (see `package.json`).

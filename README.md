# BACKEND-TINKERING

Small backend experiments and learning projects (mostly **Node.js** + **Express**, with **MongoDB** / **Mongoose** where persistence is involved).

## Repository layout

| Directory                           | Description                                                                  |
| ----------------------------------- | ---------------------------------------------------------------------------- |
| `building-rest-api-using-express/`  | REST API with a **local JSON file** (`MOCK_DATA.json`) as the data store.    |
| `rest-api-using-express-and-mongo/` | REST API with **MongoDB**; routes live in a single `index.js` file.          |
| `node-mvc-rest-api/`                | Same MongoDB user API idea, structured as **routes / controllers / models**. |
| `url-shortener/`                    | **Short URLs** with redirects and click analytics (MongoDB + **nanoid**).    |

Each subdirectory is its own npm package (`package.json`); install and run from inside that folder.

## Prerequisites

- **Node.js** (LTS recommended) and **npm**
- **MongoDB** running locally for every project except `building-rest-api-using-express`

## Projects

### `building-rest-api-using-express`

**What it is**

- Express server exposing HTML and JSON endpoints for users stored in `MOCK_DATA.json`.
- Demonstrates middleware, request/response headers, and basic CRUD over HTTP.

**Run**

```bash
cd building-rest-api-using-express
npm install
npm start
```

Server listens on **port 8001**.

**Endpoints**

- **GET** `/` → homepage text
- **GET** `/users` → HTML list of first names
- **GET** `/api/users` → all users as JSON
- **GET** `/api/users/:id` → single user by numeric id
- **POST** `/api/users` → create user (expects `application/x-www-form-urlencoded`)
- **PATCH** `/api/users/:id` → replace/update user (form-urlencoded)
- **DELETE** `/api/users/:id` → delete user

**Example**

```bash
curl -X POST "http://localhost:8001/api/users" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  --data "first_name=Rajat&last_name=Shahi&email=rajat@example.com&gender=male&job_title=Developer"

curl "http://localhost:8001/api/users"
```

### `rest-api-using-express-and-mongo`

**What it is**

- Express app connected to MongoDB via Mongoose; user CRUD with MongoDB `ObjectId`s.
- Default DB: `mongodb://127.0.0.1:27017/rest-api-test`

**Run**

1. Start MongoDB (same host/port as the URI above).
2. Start the server:

```bash
cd rest-api-using-express-and-mongo
npm install
npm start
```

Server listens on **port 3000**.

**Endpoints**

- **GET** `/users` → HTML list of users
- **GET** `/api/users` → all users as JSON
- **POST** `/api/users` → create user (JSON body)
- **GET** `/api/users/:id` → get user by ObjectId
- **PATCH** `/api/users/:id` → update user
- **DELETE** `/api/users/:id` → delete user

**Example**

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

curl "http://localhost:3000/api/users"
```

### `node-mvc-rest-api`

**What it is**

- User REST API similar to `rest-api-using-express-and-mongo`, but organized as **MVC**: `routes/` → `controllers/` → `models/`.
- Uses the same default MongoDB database name as the flat Mongo example: `mongodb://127.0.0.1:27017/rest-api-test`.

**Run**

```bash
cd node-mvc-rest-api
npm install
npm start
```

Server listens on **port 3000**, routes mounted at **`/api/users`** (same verb/path shape as the Mongo example above). See `node-mvc-rest-api/README.md` for field validation and response shapes.

### `url-shortener`

**What it is**

- Creates short links with [nanoid](https://github.com/ai/nanoid), redirects `GET /:shortId` to the stored URL, and records visits for analytics.
- Default DB: `mongodb://127.0.0.1:27017/short-url`

**Run**

```bash
cd url-shortener
npm install
npm start
```

Server listens on **port 8001** (`nodemon` runs `index.js`). See `url-shortener/README.md` for request/response details.

**Endpoints (summary)**

- **POST** `/url` — JSON body `{ "url": "https://..." }` to create a short id
- **GET** `/url/analytics/:id` — click count and visit timestamps
- **GET** `/:shortId` — HTTP redirect to the original URL

## Port and database notes

- **Port 8001** is used by both `building-rest-api-using-express` and `url-shortener`. Run only one at a time unless you change `PORT` in the project’s `index.js`.
- **Port 3000** is used by both `rest-api-using-express-and-mongo` and `node-mvc-rest-api`, and both default to the **`rest-api-test`** database. Do not run those two servers at once against the same MongoDB instance without adjusting port/DB in code.
- `node_modules/` is ignored via `.gitignore`.

## Notes

- These are learning projects; the code favors clarity and experimentation over production hardening.
- Per-project READMEs (`*/README.md`) contain deeper API tables, layout, and examples.

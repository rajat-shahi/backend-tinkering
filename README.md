# BACKEND-TINKERING

Small backend experiments and learning projects (mostly Node.js + Express, plus MongoDB/Mongoose).

## Repository layout

- `building-rest-api-using-express/`: REST API using Express with a local JSON file as the data store.
- `rest-api-using-express-and-mongo/`: REST API using Express + MongoDB (Mongoose).

## Prerequisites

- Node.js (LTS recommended)
- npm
- (For Mongo example) MongoDB running locally

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

Server starts on **port 8001**.

**Endpoints**

- **GET** `/` → homepage text
- **GET** `/users` → HTML list of first names
- **GET** `/api/users` → all users as JSON
- **GET** `/api/users/:id` → single user by numeric id
- **POST** `/api/users` → create user (expects form-urlencoded payload)
- **PATCH** `/api/users/:id` → replace/update user (form-urlencoded)
- **DELETE** `/api/users/:id` → delete user

**Example requests**

```bash
# Create (form-urlencoded)
curl -X POST "http://localhost:8001/api/users" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  --data "first_name=Rajat&last_name=Shahi&email=rajat@example.com&gender=male&job_title=Developer"

# Fetch all
curl "http://localhost:8001/api/users"
```

### `rest-api-using-express-and-mongo`

**What it is**

- Express server connected to MongoDB via Mongoose.
- Demonstrates schema/model setup and CRUD routes using MongoDB ObjectIds.

**Run**

1. Start MongoDB locally (default connection used by the app):

- **Mongo URL**: `mongodb://127.0.0.1:27017/rest-api-test`

2. Start the server:

```bash
cd rest-api-using-express-and-mongo
npm install
npm start
```

Server starts on **port 3000**.

**Endpoints**

- **GET** `/users` → HTML list of users (from MongoDB)
- **GET** `/api/users` → all users as JSON
- **POST** `/api/users` → create user (expects JSON body)
- **GET** `/api/users/:id` → get user by Mongo ObjectId
- **PATCH** `/api/users/:id` → update user by ObjectId
- **DELETE** `/api/users/:id` → delete user by ObjectId

**Example requests**

```bash
# Create (JSON)
curl -X POST "http://localhost:3000/api/users" \
  -H "Content-Type: application/json" \
  -d '{
    "first_name": "Rajat",
    "last_name": "Shahi",
    "email": "rajat.mongo@example.com",
    "gender": "male",
    "job_title": "Developer"
  }'

# Fetch all
curl "http://localhost:3000/api/users"
```

## Notes

- `node_modules/` is ignored via `.gitignore`.
- These are learning projects; the code focuses on clarity and experimentation over production hardening.

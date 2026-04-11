# URL Shortener

A small Express + MongoDB service that creates short links with [nanoid](https://github.com/ai/nanoid), redirects visitors to the original URL, and exposes basic click analytics.

## Prerequisites

- [Node.js](https://nodejs.org/) (compatible with your `package.json` engines if you add them)
- [MongoDB](https://www.mongodb.com/) running locally (default connection below)

## Setup

```bash
cd url-shortener
npm install
```

Ensure MongoDB is listening on `127.0.0.1:27017`. The app connects to database `short-url` (see `index.js`).

## Run

```bash
npm start
```

This uses `nodemon` to run `index.js`. The server listens on **port 8001**.

## API

| Method | Path                 | Description                                   |
| ------ | -------------------- | --------------------------------------------- |
| `POST` | `/url`               | Create a short URL                            |
| `GET`  | `/url/analytics/:id` | Analytics for a given short id                |
| `GET`  | `/:shortId`          | Redirect to the stored URL and record a visit |

### Create a short URL

**Request**

```http
POST /url
Content-Type: application/json

{ "url": "https://example.com/long-path" }
```

**Response** (`201`)

```json
{ "msg": "short URL generated with id : <8-char-id>" }
```

**Errors** (`400`) — missing `url` in the body:

```json
{ "error": "URL is required" }
```

### Analytics

**Request**

```http
GET /url/analytics/<shortId>
```

**Response** (`200`)

```json
{
  "clickCount": 3,
  "analytics": [
    { "timestamp": 1710000000000 },
    ...
  ]
}
```

Each redirect appends a `{ timestamp }` entry (Unix ms) to `visitHistory`.

### Redirect

Open or request:

```http
GET /<shortId>
```

The server responds with an HTTP redirect to the stored `redirectUrl`.

## Project layout

| Path                 | Role                                                       |
| -------------------- | ---------------------------------------------------------- |
| `index.js`           | App entry: Express, JSON middleware, Mongo connect, routes |
| `connection.js`      | `connectMongoDb` helper                                    |
| `models/url.js`      | Mongoose schema: `shortId`, `redirectUrl`, `visitHistory`  |
| `controllers/url.js` | Create URL, analytics, redirect + visit tracking           |
| `routes/url.js`      | `/url` POST and `/url/analytics/:id`                       |
| `routes/redirect.js` | `/:shortId` redirect                                       |

## Stack

- **Express** — HTTP API and redirects
- **Mongoose** — persistence
- **nanoid** — 8-character short ids

## Configuration

The MongoDB URI and port are currently set in `index.js`. To use another host, database name, or port, change `DB_ENDPOINT` and/or `PORT` there (or move them to environment variables if you extend the project).

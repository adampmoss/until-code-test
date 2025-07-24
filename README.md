# Sample User Repo with Docker

This is a Node.js web application built with the following stack:

- Fastify - A fast web framework for building APIs
- PostgreSQL - Database for data storage
- Prisma - Database ORM (Object-Relational Mapping) tool
- Docker - For containerization and easy setup

### Requirements

- Node v20.x
- Docker

## Setup Instructions

1) Install dependencies

```
npm install
```

2) Setup PostgreSQL and Prisma (Docker)

```
cp .env.example .env
docker compose up -d
docker compose exec app npx prisma migrate dev --name init
```

### Run unit tests

```
npm run test
```

### Run linting & formatting

```
npm run lint
npm run format
```

## API

Base URL: `http://localhost:3000`

### Users

#### GET /users
Get all users

**Response:**
```json
[
  {
    "id": "string",
    "firstName": "string",
    "lastName": "string",
    "dateOfBirth": "2023-01-01T00:00:00.000Z"
  }
]
```

#### GET /users/:id
Get user by ID

**Response:**
```json
{
  "id": "string",
  "firstName": "string",
  "lastName": "string",
  "dateOfBirth": "2023-01-01T00:00:00.000Z"
}
```

#### POST /users
Create a new user

**Request Body:**
```json
{
  "firstName": "string",
  "lastName": "string",
  "dateOfBirth": "2023-01-01"
}
```

**Response:**
```json
{
  "id": "string",
  "firstName": "string",
  "lastName": "string",
  "dateOfBirth": "2023-01-01T00:00:00.000Z"
}
```

#### PUT /users/:id
Update user by ID

**Request Body:**
```json
{
  "firstName": "string",
  "lastName": "string",
  "dateOfBirth": "2023-01-01"
}
```

**Response:**
```json
{
  "id": "string",
  "firstName": "string",
  "lastName": "string",
  "dateOfBirth": "2023-01-01T00:00:00.000Z"
}
```

# Sample User Repo with Docker

- Node v20.x

### Install dependencies

```
npm install
```

### Setup PostgreSQL and Prisma

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

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
</p>

## Prerequisites

- Node.js >= 20.0.0
- Yarn package manager
- Docker

## Project setup for local use

1. Clone the repository:

```bash
$ git clone <repository-url>
```

2. Install depencies. The following stack was selected for the task: `Typescript`, `NestJS` framework, `PostgreSQL`+`TypeOrm` storage, `JWT` authorization (partially, only generation of refresh token without using).

```bash
$ yarn install
```

3. Create `.env` file. Example:

```bash
PORT=3001

POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=postgres
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_SSL=false

JWT_SECRET=secret123
JWT_ACCESS_EXPIRATION=15m
JWT_REFRESH_EXPIRATION=7d
```

Or run the command and set your own values:

```bash
$ cp .env.example .env
```

In the main module there is a validation of env parameters

4. Start the infrastructure using the command:

```bash
$ docker-compose up -d
```

## Compile and run the project

1. Dev mode

```bash
$ yarn start:dev
```

2. Prod mode

```bash
$ yarn start:prod
```

3. Ping endpoint

```
GET http://localhost:3001/api
```

Response:

```
✅ Server is up and running!!!
```

## API

1. The server runs on port `http://localhost:3001` by default.
2. Global prefix set to `/api`
3. Swagger documentation for endpoints is available at:

   - http://localhost:3001/swagger
   - http://localhost:3001/api/swagger

4. Creating migrations:

```bash
$ NAME=first-migration yarn migration:create
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).

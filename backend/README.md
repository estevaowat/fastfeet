<h1 align="center">Backend ⚙️</h1>

> Transporter application to control deliveries.

## Install

To install all yarn dependencies:

```sh
yarn install
```

## Usage

- Run command to create a postgres image:

```sh
docker run --name postgresfastfeet -e POSTGRES_PASSWORD=docker -p 5432:5432 -d -t postgres
```

- Create a file in root path called `.env` and complete environment variables settings.

- Run project in development mode:

```sh
yarn dev
```

## Test

Click in this button to get all application endpoints using insomnia.

<a href="https://insomnia.rest/run/?label=git%40github.com%3Aestevaowat%2Ffastfeet.git&uri=https%3A%2F%2Fraw.githubusercontent.com%2Festevaowat%2Ffastfeet%2Fmaster%2Fbackend%2Finsomnia_requests.json" target="_blank"><img src="https://insomnia.rest/images/run.svg" alt="Run in Insomnia"></a>

---

_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_

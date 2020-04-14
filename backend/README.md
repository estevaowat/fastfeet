<h1 align="center">Backend ⚙️</h1>

## Pré-requisitos

- NodeJS
- Docker

## Instalação

- Primeiro precisa rodar o comando para instalar as dependências do yarn:

```sh
yarn install
```

- Crie uma imagem do Postgres utilizando o docker com o comando:

```sh
docker run --name postgresfastfeet -e POSTGRES_PASSWORD=docker -p 5432:5432 -d -t postgres
```

- Crie um arquivo na raiz da pasta backend e renomeie para `.env` e complete com as variáveis de ambientes que faltam.

## Como usar

- Comando para rodar o projeto em modo de desenvolvimento:

```sh
yarn dev
```

## Tests

Clique nesse botão para pegar todos os endpoint usando o insomnia.

<a href="https://insomnia.rest/run/?label=git%40github.com%3Aestevaowat%2Ffastfeet.git&uri=https%3A%2F%2Fraw.githubusercontent.com%2Festevaowat%2Ffastfeet%2Fmaster%2Fbackend%2Finsomnia_requests.json" target="_blank"><img src="https://insomnia.rest/images/run.svg" alt="Run in Insomnia"></a>

---

_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_

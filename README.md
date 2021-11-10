<p align="center">
  <a href="https://github.com/greatSumini" target="blank"><img src="https://avatars.githubusercontent.com/u/48555121" width="200" height="auto" alt="greatSumini"/></a>
</p>

<h1 align="center">Local <a href="https://aws.amazon.com/sqs/" target="_blank">SQS</a></h1>

<p align="center">
  <a aria-label="version" href="https://github.com/greatSumini/localsqs">
    <img src="https://img.shields.io/github/package-json/v/greatSumini/localsqs?style=for-the-badge&labelColor=000000">
  </a>
  <a aria-label="license" href="https://github.com/greatSumini/localsqs/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/greatSumini/localsqs?style=for-the-badge&labelColor=000000">
  </a>
  <a aria-label="Docker Hub" href="https://hub.docker.com/repository/docker/greatsumini/localsqs">
    <img alt="" src="https://img.shields.io/badge/DOCKER%20HUB-skyblue.svg?style=for-the-badge&logoWidth=20&logo=Docker&logoColor=000000">
  </a>
</p>

<p align="center">
  <a aria-label="CI" href="https://github.com/greatSumini/localsqs/actions/workflows/ci.yml">
    <img src="https://img.shields.io/github/workflow/status/greatSumini/localsqs/CI?label=CI&labelColor=000000">
  </a>
  <a aria-label="codecov coverage" href="https://app.codecov.io/gh/greatSumini/localsqs/">
    <img src="https://img.shields.io/codecov/c/gh/greatSumini/localsqs">
  </a>
  <a aria-label="docker image size" href="https://hub.docker.com/repository/docker/greatsumini/localsqs">
    <img src="https://img.shields.io/docker/image-size/greatsumini/localsqs">
  </a>
  <a aria-label="docker pulls" href="https://hub.docker.com/repository/docker/greatsumini/localsqs">
    <img src="https://img.shields.io/docker/pulls/greatsumini/localsqs">
  </a>
  <a aria-label="github stars" href="https://github.com/greatSumini/localsqs">
    <img src="https://img.shields.io/github/stars/greatsumini/localsqs?style=social">
  </a>
</p>

Develop and test your server with Offline [AWS SQS](https://aws.amazon.com/sqs/)!

Built with ![fastify](https://img.shields.io/badge/fastify-%23000000.svg?logo=fastify&logoColor=white), ![typescript](https://img.shields.io/badge/typescript-%23007ACC.svg?logo=typescript&logoColor=white)

## 1. Getting Started

### 1.1. Using `docker`

You can use the following command to get started with localsqs docker image

```sh
docker run --rm -it -p 4413:4413 greatsumini/localsqs
```

### 1.2. Using `docker-compose`

You can also use the `docker-compose.yml` like this example

```yml
services:
  localsqs:
    container_name: localsqs
    image: greatsumini/localsqs:0.2.0
    ports:
      - '4413:4413'
```

run `docker compose up` and Compose will start

### 1.3. Run on your local device

```shell
# clone this repository
git clone https://github.com/DEV-MUGLES/localsqs.git
cd localsqs

# install dependencies
npm install

# run on localhost:4413
npm run dev
```

## 2. Features

- [x] SendMessage
- [x] SendMessageBatch
- [x] ReceiveMessage
- [x] DeleteMessage
- [x] DeleteMessageBatch
- [ ] PurgeQueue
- [ ] CreateQueue
- [ ] DeleteQueue
- [ ] ListQueues
- [ ] PurgeQueue

## 3. Author

- [Sumin Choi](https://sumini.dev)

## 4. Links

- [GitHub](https://github.com/greatSumini/localsqs)
- [Docker Hub](https://hub.docker.com/repository/docker/greatsumini/localsqs)
- [AWS SQS Docs](https://docs.aws.amazon.com/sqs/index.html)

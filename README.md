<p align="center">
  <a href="https://github.com/greatSumini" target="blank"><img src="https://avatars.githubusercontent.com/u/48555121" width="200" height="auto" alt="greatSumini"/></a>
</p>

<h1 align="center">Local <a href="https://aws.amazon.com/sqs/" target="_blank">SQS</a></h1>

<p align="center">
  <a aria-label="version" href="https://github.com/greatSumini/local-sqs">
    <img src="https://img.shields.io/github/package-json/v/greatSumini/local-sqs?style=for-the-badge&labelColor=000000">
  </a>
  <a aria-label="license" href="https://github.com/greatSumini/local-sqs/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/greatSumini/local-sqs?style=for-the-badge&labelColor=000000">
  </a>
  <a aria-label="CI" href="https://github.com/greatSumini/local-sqs/actions/workflows/ci.yml">
    <img src="https://img.shields.io/github/workflow/status/greatSumini/local-sqs/CI?label=CI&style=for-the-badge&labelColor=000000">
  </a>
  <a aria-label="Docker Hub" href="https://hub.docker.com/repository/docker/greatsumini/local-sqs">
    <img alt="" src="https://img.shields.io/badge/DOCKER%20HUB-skyblue.svg?style=for-the-badge&logoWidth=20&logo=Docker&logoColor=000000">
  </a>
</p>

Develop and test your server with Offline [AWS SQS](https://aws.amazon.com/sqs/)!

## 1. Getting Started

### 1.1. Run on your local device

```shell
# clone this repository
git clone https://github.com/DEV-MUGLES/local-sqs.git
cd local-sqs

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

- [GitHub](https://github.com/greatSumini/local-sqs)
- [AWS SQS Docs](https://docs.aws.amazon.com/sqs/index.html)

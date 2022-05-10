# Codegrade Setup

## 1- Fixtures

### Student-Facing Tests

- [codegrade_mvp.test.js](./codegrade_mvp.test.js)

## 2- Global Setup Script

It takes care of installing the latest LTS version of Node, as well as a version of Jest more modern than the one in Codegrade

```bash
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash - && sudo apt-get install -y nodejs; cg-jest install; npm i -g jest@28.0.3
```

## 3- Per-Student Setup Script

```bash
mv $FIXTURES/* . && npm install
```

## 4- Auto Tests

### Teacher Tests - Weight 99

```bash
NODE_ENV=testing cg-jest run -- codegrade_mvp.test.js --runInBand --forceExit
```

### Learner Tests - Weight 1

```bash
NODE_ENV=testing cg-jest run -- Spinner.test.js --runInBand --forceExit
```

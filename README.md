# Identifo admin panel

### CLI

All cli scripts are listed in the `scripts` section of `package.json`;

Install dependencies
```bash
$ npm i
```

Run build in production mode
```bash
$ npm run build
```

Run locally in development mode
```bash
$ npm run start
```

Run unit tests
```bash
$ npm run test
```

Run unit tests in watch mode
```bash
$ npm run test:w
```

Generate code coverage
```bash
$ npm run test:cov
```

### Mocking Api Calls

Api calls are described in services `src/services`. Each service has it's mocked version. In order to make use of mocked services instead of actual ones you should set a `MOCK_API=true` environment variable either throught cli or using `.env` file in the project's root.
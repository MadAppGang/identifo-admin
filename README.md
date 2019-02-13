# Identifo admin panel

### CLI

All cli scripts are listed in the `scripts` section of `package.json`;

Install dependencies
```bash
$ npm i
```
All dependencies are listed in the `dependencies` section of `package.json`

Run build in production mode
```bash
$ npm run build
```
This script is going to compile a bundle and put in into `build` folder in the project's root.
This folder contains all you need to deploy the application.

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
Generated coverage report is going to appear as a `coverage` folder in the project's root.

### Mocking Api Calls

Api calls are described in services `src/services`. Each service has it's mocked version. In order to make use of mocked services instead of actual ones you should set a `MOCK_API=true` environment variable either through cli or using `.env` file in the project's root.


### Deploying to subdirectory

To configure the SPA to work correctly on subdirectory you need to set `PUBLIC_PATH` environment variable.
E.g. if you are deploying to `localhost:8000/admin` set `PUBLIC_PATH=admin` in the `.env` file.

You might also need to change `publicPath` property in webpack config if the assets (such as css styles) are not served from the root.

### Deploying to Github Pages

Go to `deploy` branch

```bash
$ git checkout deploy
```
This branch is already configured for deployment.

Then run deploy script.
Make sure you've installed all dependencies.

```bash
$ npm run deploy
```
Note: usually it takes up to 5 minutes for the changes to get fully deployed even though it says `published` in the terminal.

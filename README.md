# Rockwell Black Box Data API
This application is meant to be a black-box data api to provide data at various time-delays. **It is not meant to show good practice!**

## Installation

This application was built to use minimal dependencies. The only dependencies should be installable through NPM. I wrote the application with **node version 8.9.4** and **npm 5.6.0** which should be fine despite them not being the latest versions. I didn't do anything crazy with the javascript. **I left out typescript to keep things simple**.

To install the application, just navigate to the directory with the package.json file and run:

```bash
npm install
```

This should install the application. You can then run the server using:

```bash
npm run start
```

I also included a testing framework in case you want to do anything with that. Run the tests with:

```bash
npm run test
```

## Database

The "database" for this application is really just a few JSON files which are **never modified**. This way, the server database is refreshed on every restart. Instead, the "database" service maintains live in-memory references to the JSON which is loaded and parsed on startup. All API actions work with these in-memory references to appear to function like a real database without us having to install one.
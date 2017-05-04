# Accredible :: Fullstack assessment

This starter repo uses node / npm and has the following features to help you get started:

 * An express server
   * Runs on localhost:3000
   * Serves the `/public` directory as static files
   * Simple route logic on `/get-url` to read URLs
 * Uses `phantomjs` (via the `horseman` wrapper) to read URLs
   * You can process the response however you see fit

It does not have any FE frameworks (Angular, jQuery) just a simple hello world `index.html` file.

## Server setup

### Getting started

Assuming you have node / npm available, install the dependencies, then run the server:
```
npm install
node server.js
```

### Feeling lazy?

Use `nodemon` to watch for changes in your files and automatically restart the express server (or use pm2)

```
npm install -g nodemon
nodemon server.js
```

### Need to debug horseman?

Use one of these to include console logging in your horseman threads

```
DEBUG=horseman node server.js
DEBUG=horseman nodemon server.js
```

## Frontend setup

This is an AngularJS app. All the frontend code is in the [a public/app](app folder)

###	Dependencies

We are using bower to manage dependencies. To install bower please run:

```
npm install -g bower
```

Then you should be able to install all the dependencies:

```
bower install
```

The list of all dependencies can be found in [a bower.json](bower.json)

## Tests

We are using Protractor for testing. To install it please run:
```
npm install -g protractor
webdriver-manager update
```

To start the tests you should also start webdriver server and then load test/spec.js

```
webdriver-manager start
protractor test/test.js

```

## Usage
Visit http://localhost:3000/ for instructions.

http://localhost:3000/get-url?url=http://accredible.com/ will return a JSON object with a key `html` which contains the response HTML from the URL supplied as a parameter.


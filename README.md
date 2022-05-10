# Sprint Challenge: Advanced Web Applications

In this challenge, you will write the logic for [THIS APP](https://advanced-apps-articles.herokuapp.com/).

## Tools

- Node 16.x
- NPM 8.x (update NPM executing `npm i -g npm`)
- Unix-like shell (Gitbash/bash/zsh)
- Chrome >= 100.x

❗ Other configurations might work but haven't been tested.

## Project Setup

- Fork, clone, and `npm install`. You won't need to add any extra libraries.
- Launch the project in a development server executing `npm run dev`.
- Visit your app by navigating Chrome to `http://localhost:3000`.
- Run tests locally executing `npm test`.
- Local test modules are `codegrade_mvp.test.js` and `Spinner.test.js`.

## Studying the prototype

❗ Open the live prototype linked above and study its functionality using the following **Chrome Dev Tools**:

- **Elements tab** shows the exact DOM rendered as we interact with the UI. Look at texts but also at ids and class names.
- **Network tab** shows the HTTP messages. "Payload" shows the request payload from the client (if any) and "Preview" shows the payload in the server response.
- **Components tab** shows application state and the props each component gets passed (although the names of the components are minified during deployment).

## Studying the API

The endpoints needed for this project are the following:

- `[POST] http://localhost:9000/api/login`
  - Expects a payload with the following properties: `username`, `password`
  - Example of payload: `{ "username": "foo", "password": "12345678" }`
  - The `username` length must be >= 3, and the `password` >= 8, after trimming
  - The response to a proper request includes `200 OK` and the auth token
- `[GET] http://localhost:9000/api/articles`
  - Expects an `Authorization` request header containing a valid auth token
  - The response to a proper request includes `200 OK` and a list of articles which could be empty
- `[POST] http://localhost:9000/api/articles`
  - Expects an `Authorization` request header containing a valid auth token
  - Expects a payload with the following properties: `title`, `text`, `topic`
  - The `title` and `text` length must be >= 1, after trimming
  - The `topic` needs to be one of three values: `React`, `JavaScript`, `Node`
  - Example of payload: `{ "title": "foo", "text": "bar", "topic": "React" }`
  - The response to a proper request includes `201 Created`, a success message and the new article
- `[PUT] http://localhost:9000/api/articles/:article_id`
  - Expects an `Authorization` request header containing a valid auth token
  - Expects a payload with the following properties: `title`, `text`, `topic`
  - The `title` and `text` length must be >= 1, after trimming
  - The `topic` needs to be one of three values: `React`, `JavaScript`, `Node`
  - Example of payload: `{ "title": "foo", "text": "bar", "topic": "React" }`
  - The response to a proper request includes `200 OK`, a success message and the updated article
- `[DELETE] http://localhost:9000/api/articles/:article_id`
  - Expects an `Authorization` request header containing a valid auth token
  - The response to a proper request includes `200 OK` and a success message

❗ Test drive all these endpoints with [Postman](https://www.postman.com/downloads/) before starting with the project.

## MVP

In order to complete this project, you must fix the following modules:

- [frontend/axios/index.js](frontend/axios/index.js)
- [frontend/components/App.js](frontend/components/App.js)
- [frontend/components/LoginForm.js](frontend/components/LoginForm.js)
- [frontend/components/Articles.js](frontend/components/Articles.js)
- [frontend/components/ArticleForm.js](frontend/components/ArticleForm.js)

You must also also test the Spinner component in this module:

- [frontend/components/Spinner.test.js](frontend/components/Spinner.test.js)

### Notes

- Find specific instructions and hints inside each of the modules linked above.
- The structure of the DOM must match that of the prototype: take care not to remove existing classnames, ids, etc.
- Most components include a prop-types declaration at the bottom, to explain what props -and of what data types- they expect.
- Unmet prop-types expectations will cause warnings in the console, to advise that props are missing, or of the wrong type of data.
- Try to get the functionality of the app as close as possible to that of the prototype. Not all of it is covered by auto tests.

## MVP Short Explanation

❗ ALL TESTS MUST PASS

# Rice-Eats
App for viewing servery menus and rating meals

## Development 

### Running the app locally in development mode

1. Run `$ npm install` to install the necessary dependencies for the app.

2. Run `$ mongod` from your terminal to setup the database.

3. Run `$ npm run start` to run the app using node to run the server. This means that the local version of the server you are running will not reflect any changes made to the backend until you stop and rerun the server.

4. Run `$ npm run dev` to run the app using nodemon to run the server. This means that the local version of the server will automatically update as you make changes to the backend, without having to stop and rerun the server.

#### Notes on development
The app defaults to using `http://localhost:3000` to locally serve the app. This can be changed by adding a `PORT` environment variable in the `.env` file.

The app defaults to using `mongodb://localhost/riceeats` as the database for the app. This can be changed by changing the value of the `MONGODB_URI` environment variable in the `.env` file.

## Deployment

1. Run `$ git add .`
2. Run `$ git commit -m <commit message>`
3. Run `$ git push` to push to changes to this repository
4. Run `$ git push heroku master` to push the changes to the deployed instance of the app

### Initial Deployment to Heroku

1. Install Heroku CLI with `npm install -g heroku` if it is not already installed.
2. Run `heroku create <project name>`.
3. Run `git remote -v` to confirm that this worked. You should see the following:
            
            $ git remote -v
            heroku https://git.heroku.com/<project name>.git (fetch)
            heroku https://git.heroku.com/<project name>.git (push)
            origin git@github.com:nsafai/<git repo name>.git (fetch)
            origin git@github.com:nsafai/<git repo name>.git (push)

4. Run `$ git add .`.
5. Run `$ git commit -m <commit message>`.
6. Run `$ git push heroku master` to push the app to heroku.
7. Run `$ heroku ps:scale web=1` to set up a free server to host the app.
8. Run `$ heroku addons:create mongolab` to create a free mongolab database for the app. Note that heroku will automatically populate the `MONGODB_URI` environment variable with the database address.
9. Repeat steps 4 - 6 to ensure that the deployment is ready.
10. Run `$ heroku open` to view the app in deployment.

## App Overview
Rice Eats is a web app designed for students at Rice University to view the meals currently availible at each
            of the serveries, and then leave reviews for those meals and view the rating of each meal as
            determined by the community of students.
            
## Contributors
- Nicholas Meisburger ([nmeisburger0](https://github.com/nmeisburger0))

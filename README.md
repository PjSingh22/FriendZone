# Friendzone

<img src="https://i.imgur.com/pJqEsIj.png">

Welcome to Friendzone!
Friendzone is a fullstack application clone, inspired by Facebook. Create a user, create a post, like some posts, add some comments,
and force someone to be your friend or ... friendzone someone!

Live site: https://friendzone-0ev3.onrender.com/

## Overview

App Academy January 2023 Cohort

This was our first group project together. We decided to clone Facebook as we were a group of ambitious individuals.

Throughout this process, we learned many new skills and developed as software developers:

- This is was our first opportunity to implement Python/Flask in a project.
- This is our first time creating a project from scratch including creating the Database Schema, API Documentations, and creating the React app.
- We learned to work as a group and communicate better using proper Git work flow.
- We gained more experience in using React/Redux Store.
- We learned that Facebook is very hard to clone.

## Wiki Links
- [API Documentation](https://github.com/KatiePee/FriendZone/wiki/API-Documentation)
- [Database Schema](https://github.com/KatiePee/FriendZone/wiki/Database-Schema)
- [Feature List](https://github.com/KatiePee/FriendZone/wiki/Feature-List)
- [User Stories](https://github.com/KatiePee/FriendZone/wiki/User-Stories)

## Technologies Used
- Python
- PostgresSQL
- Flask
- React/Redux
- AWS
- HTML/CSS


## Meet The Developers

- Adanna Liu
<img src="https://i.imgur.com/YxvVUbL.png" width=20> [LinkedIn](https://www.linkedin.com/in/adanna-liu-7505161a5/) <img src="https://i.imgur.com/e3EquH6.png" width=20> [GitHub](https://github.com/aliu7198)
- Albert Kim
<img src="https://i.imgur.com/YxvVUbL.png" width=20> [LinkedIn](https://www.linkedin.com/in/albertkim01/") <img src="https://i.imgur.com/e3EquH6.png" width=20> [GitHub](https://github.com/alberthskim)
- Katie Piele
<img src="https://i.imgur.com/YxvVUbL.png" width=20> [LinkedIn](https://www.linkedin.com/in/katie-piele/) <img src="https://i.imgur.com/e3EquH6.png" width=20> [GitHub](https://github.com/KatiePee)
- PJ Singh
<img src="https://i.imgur.com/YxvVUbL.png" width=20> [LinkedIn](https://www.linkedin.com/in/prabhjot-singh-software-developer/) <img src="https://i.imgur.com/e3EquH6.png" width=20> [GitHub](https://github.com/PjSingh22)

<!-- # Flask React Project

This is the starter for the Flask React project.

## Getting started
1. Clone this repository (only this branch)

2. Install dependencies

      ```bash
      pipenv install -r requirements.txt
      ```

3. Create a **.env** file based on the example with proper settings for your
   development environment

4. Make sure the SQLite3 database connection URL is in the **.env** file

5. This starter organizes all tables inside the `flask_schema` schema, defined
   by the `SCHEMA` environment variable.  Replace the value for
   `SCHEMA` with a unique name, **making sure you use the snake_case
   convention**.

6. Get into your pipenv, migrate your database, seed your database, and run your Flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

7. To run the React App in development, checkout the [README](./react-app/README.md) inside the `react-app` directory.


## Deployment through Render.com

First, refer to your Render.com deployment articles for more detailed
instructions about getting started with [Render.com], creating a production
database, and deployment debugging tips.

From the [Dashboard], click on the "New +" button in the navigation bar, and
click on "Web Service" to create the application that will be deployed.

Look for the name of the application you want to deploy, and click the "Connect"
button to the right of the name.

Now, fill out the form to configure the build and start commands, as well as add
the environment variables to properly deploy the application.

### Part A: Configure the Start and Build Commands

Start by giving your application a name.

Leave the root directory field blank. By default, Render will run commands from
the root directory.

Make sure the Environment field is set set to "Python 3", the Region is set to
the location closest to you, and the Branch is set to "main".

Next, add your Build command. This is a script that should include everything
that needs to happen _before_ starting the server.

For your Flask project, enter the following command into the Build field, all in
one line:

```shell
# build command - enter all in one line
npm install --prefix react-app &&
npm run build --prefix react-app &&
pip install -r requirements.txt &&
pip install psycopg2 &&
flask db upgrade &&
flask seed all
```

This script will install dependencies for the frontend, and run the build
command in the __package.json__ file for the frontend, which builds the React
application. Then, it will install the dependencies needed for the Python
backend, and run the migration and seed files.

Now, add your start command in the Start field:

```shell
# start script
gunicorn app:app
```

_If you are using websockets, use the following start command instead for increased performance:_

`gunicorn --worker-class eventlet -w 1 app:app`

### Part B: Add the Environment Variables

Click on the "Advanced" button at the bottom of the form to configure the
environment variables your application needs to access to run properly. In the
development environment, you have been securing these variables in the __.env__
file, which has been removed from source control. In this step, you will need to
input the keys and values for the environment variables you need for production
into the Render GUI.

Click on "Add Environment Variable" to start adding all of the variables you
need for the production environment.

Add the following keys and values in the Render GUI form:

- SECRET_KEY (click "Generate" to generate a secure secret for production)
- FLASK_ENV production
- FLASK_APP app
- SCHEMA (your unique schema name, in snake_case)
- REACT_APP_BASE_URL (use render.com url, located at top of page, similar to
  https://this-application-name.onrender.com)

In a new tab, navigate to your dashboard and click on your Postgres database
instance.

Add the following keys and values:

- DATABASE_URL (copy value from Internal Database URL field)

_Note: Add any other keys and values that may be present in your local __.env__
file. As you work to further develop your project, you may need to add more
environment variables to your local __.env__ file. Make sure you add these
environment variables to the Render GUI as well for the next deployment._

Next, choose "Yes" for the Auto-Deploy field. This will re-deploy your
application every time you push to main.

Now, you are finally ready to deploy! Click "Create Web Service" to deploy your
project. The deployment process will likely take about 10-15 minutes if
everything works as expected. You can monitor the logs to see your build and
start commands being executed, and see any errors in the build process.

When deployment is complete, open your deployed site and check to see if you
successfully deployed your Flask application to Render! You can find the URL for
your site just below the name of the Web Service at the top of the page.

[Render.com]: https://render.com/
[Dashboard]: https://dashboard.render.com/ -->

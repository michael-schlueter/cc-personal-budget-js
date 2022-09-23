# Personal Budget
> Simple Node/Express API to manage a portfolio budget using a budget envelope strategy. Users can create, read, update, and delete envelopes as well as create, read,  update and delete transactions for each individual envelope.



## General Information
- The project is part of the Back-end Engineer Curriculum from Codecademy
- I undertook this project in order to solidify my knowledge about creating APIs
- There are two versions of this project. This project is the basic version using plain JavaScript and node-postgres for interacting with the PostgreSQL database
- My intention is to compare this version of the project with another version of it using Prisma for interacting with the PostgreSQL database. I want to know the benefits / drawbacks of both in order to decide which one to use in future projects



## Technologies Used
- express 4.18.1
- node-postgres 0.6.2
- pg 8.8.0
- swagger-jsdoc 6.2.5
- swagger-ui-express 4.5.0



## Features
- Creating, Reading, Updating and Deleting envelopes
- Creating, Reading, Updating, and Deleting transactions
- For detailed API documentation take steps described in the setup



## Setup
The dependencies which are necessary to run this app can be found in the package.json file. Node needs to be installed on your system.

1. Clone the repo
2. Navigate to the project folder in the terminal and install the necessary NPM dependencies
```
npm install
```
3. Run the app typing
```
node index.js
```
in your terminal and visit localhost:3000 in your browser. To read the API documentation visit localhost:3000/api-docs in your browser.



## Learnings
- Designing an API from scratch
- Importance of data validation
- Connecting the App to the database using a Pool (setting up the necessary environment variables)
- Creating queries using node-postgres (db.query)
- Setting up and using Swagger to create an API documentation



## Project Status
This project is basically finished. I may build a corresponding front-end for it in the future.



## Acknowledgements
- This project is part of the [Codecademy](https://www.codecademy.com) Back-end engineer curriculum.




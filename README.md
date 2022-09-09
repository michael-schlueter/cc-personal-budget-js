# Personal Budget
> Simple Node/Express API to manage a portfolio budget using a budget envelope strategy. Users can create, read, update, and delete envelopes as well as create transactions for each individual envelope.



## General Information
- The project is part of the Back-end Engineer Curriculum from Codecademy
- I undertook this project in order to solidify my knowledge about creating APIs
- There are two versions of this project. This project is the basic version using plain JavaScript



## Technologies Used
- express 4.18.1



## Features
- Retrieving envelopes (all and single)
- Creating envelopes
- Updating envelopes
- Deleting envelopes
- Transfering budgets from envelope to envelope



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
in your terminal and visit localhost:3000 in your browser.



## Learnings
- Designing an API from scratch
- Importance of data validation



## Project Status
This project will be enhanced in a future Codecademy challenge project where the aim will be to integrate a database for the data to persist. In this version of the project I plan to use node-postgres in combination with a PostgreSQL database. I'd like to compare this version of the project with the Typescript / Prisma version to get a better understanding for the trade-offs. Additionally I may build a frontend to display the envelopes and budgets and to provide CRUD functionality.



## Acknowledgements
- This project is part of the [Codecademy](https://www.codecademy.com) Back-end engineer curriculum.




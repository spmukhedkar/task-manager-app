## Prerequisites:
1. Node
2. MySQL

## Installation:
1. Execute below command to install all packages

    `npm install`

2. Create Database in MySQL and update the keys in `.env`

## Start App
For running the app, please execute below command

`npm start`

## API Endpoints
Below are used APIs:

### CRUD

| Method | Route | Operation |
| ------------- |:------------- |:-----|
| GET | /tasks | Return all tasks |
| GET |	/tasks/:id | Return a particular task |
| POST | /tasks | Add new task |
| PUT | /tasks/:id | Update either status, description, or both of a particular task |
| DELETE |	/tasks/:id | Delete a particular task |

## Unit Testing
For running unit test cases, please execute below command

`npm test`

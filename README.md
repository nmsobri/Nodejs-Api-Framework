# Nodejs Express Framework with Ts

## How to test drive the project
Run `npm install`

Create database name `nodejs_api`

Run migration
- `knex migrate:latest`
- `knex seed:run`

Database will have default user:  
username: `slier`  
password: `123456`  

## Available endpoint to test

### /auth
`http://localhost:3000/v1/auth/logout`  
`http://localhost:3000/v1/auth/refresh`  
`http://localhost:3000/v1/auth/login`  
`http://localhost:3000/v1/auth/login`  
`http://localhost:3000/v1/auth/register`  

### /staff
`http://localhost:3000/v1/staff/1`  
`http://localhost:3000/v1/staff/2`  
`http://localhost:3000/v1/staff/3`  
`http://localhost:3000/v1/staff`  
`http://localhost:3000/v1/staff`  

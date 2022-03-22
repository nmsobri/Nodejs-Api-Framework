# Nodejs Express Framework with Ts

## How to test drive the project
Clone repo `git@github.com:slier81/Nodejs-Api-Framework.git NodeApi`

Cd to directory `cd NodeApi`

Open with VsCode `code .` ( Let VsCode build all the things its needed )

Run `npm install`

Create database name `nodejs_api` ( in mysql, since this project use mysql by default. Can be configured with other db )

Run migration
- `knex migrate:latest`
- `knex seed:run`

Database will have default user:  
username: `slier`  
password: `123456`  

## Available endpoint to test

### /auth
GET `http://localhost:3000/v1/auth/logout`    - logout the user  
GET `http://localhost:3000/v1/auth/refresh`   - refresh user token  
POST `http://localhost:3000/v1/auth/login`    - login the user   
POST `http://localhost:3000/v1/auth/register` - register the user  

### /staff
PUT `http://localhost:3000/v1/staff/1`  - update staff  
GET `http://localhost:3000/v1/staff/2`  - get staff  
DEL `http://localhost:3000/v1/staff/3`  - del staff  
POST `http://localhost:3000/v1/staff`   - create staff  
GET `http://localhost:3000/v1/staff`    - get all staff  

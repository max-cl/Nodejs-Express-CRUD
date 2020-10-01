# REACT-NODE-EXPRESS-POSTGRES (CRUD) #

## How to start the project? ##

- npm run clientinstall && npm install
- npm run dev

## Front-end Components ##
- React
- Redux
- Material UI

## Server Components ##
- CRUD
- Sign-up and Sign-in (JWT + Passport)
- Database:
	- Postgres (Sequelize ORM)
- Validation:
	- Joi
- Email:
	- Nodemailer



## Description of the API's ##
### SIGN-UP ###

HTTP Method: POST\
API: http://localhost:3001/api/auth/signup

```json
{
	"name": "admin",
	"username": "admin",
	"password": "password123",
	"repeat_password": "password123",
	"roles": "Admin",
	"email": "email@email.com"
}
```

NOTE: There are 3 Roles defined:

- Admin
- Roles 1
- Roles 2


### SIGN-IN ###

HTTP Method: POST\
API: http://localhost:3001/api/auth/signin

```json
{
	"username": "user_name",
	"password": "password"
}
```

### GET-ALL todo of a specific user ###

HTTP Method: GET\
API: http://localhost:3001/api/get_todo/:id_user

Also it needs to user add new header:

Key: Authorization\
Value: JWT 'Here_TOKEN'

NOTE: 'Here_TOKEN', you\'ll obtain the token after you are logged (replace it without quotes)


### INSERT/CREATE a new todo ###

HTTP Method: POST\
API: http://localhost:3001/api/create_todo/

```json
{
    "title": "todo 1",
    "id_user": 1
}
```

Also it needs to user add new header:

Key: Authorization\
Value: JWT 'Here_TOKEN'

NOTE: 'Here_TOKEN', you\'ll obtain the token after you are logged (replace it without quotes)


### UPDATE a todo ###

HTTP Method: PUT\
API: http://localhost:3001/api/update_todo/

```json
{
    "title": "Task 1",
    "id_user": 1,
    "id": 1,
    "done": true
}
```

Also it needs to user add new header:

Key: Authorization\
Value: JWT 'Here_TOKEN'

NOTE: 'Here_TOKEN', you\'ll obtain the token after you are logged (replace it without quotes)


### DELETE a todo ###

HTTP Method: DELETE\
API: http://localhost:3001/api/delete_todo/:id_user/:id

Also it needs to user add new header:

Key: Authorization\
Value: JWT 'Here_TOKEN'

NOTE: 'Here_TOKEN', you\'ll obtain the token after you are logged (replace it without quotes)

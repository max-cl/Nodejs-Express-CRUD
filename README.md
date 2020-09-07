# NODEJS-EXPRESS-SERVER (CRUD) #

## Components ##
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

### GET-ALL products of a specific user ###

HTTP Method: GET\
API: http://localhost:3001/api/get_product/:id_user

Also it needs to user add new header:

Key: Authorization\
Value: JWT 'Here_TOKEN'

NOTE: 'Here_TOKEN', you\'ll obtain the token after you are logged (replace it without quotes)


### INSERT/CREATE a new product ###

HTTP Method: POST\
API: http://localhost:3001/api/create_product/

```json
{
    "name_product": "product 1",
    "id_user": 1
}
```

Also it needs to user add new header:

Key: Authorization\
Value: JWT 'Here_TOKEN'

NOTE: 'Here_TOKEN', you\'ll obtain the token after you are logged (replace it without quotes)


### UPDATE a product ###

HTTP Method: PUT\
API: http://localhost:3001/api/update_product/

```json
{
    "name_product": "product 1",
    "id_user": 1,
    "id_product": 1
}
```

Also it needs to user add new header:

Key: Authorization\
Value: JWT 'Here_TOKEN'

NOTE: 'Here_TOKEN', you\'ll obtain the token after you are logged (replace it without quotes)


### DELETE a product ###

HTTP Method: DELETE\
API: http://localhost:3001/api/delete_product/:id_user/:id_product

Also it needs to user add new header:

Key: Authorization\
Value: JWT 'Here_TOKEN'

NOTE: 'Here_TOKEN', you\'ll obtain the token after you are logged (replace it without quotes)
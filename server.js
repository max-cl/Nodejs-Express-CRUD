const express =  require('express');
const dotenv = require('dotenv');
const helmet = require('helmet');
const Cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');
const passport = require('passport');

const app = express();
dotenv.config();

 const db = require('./config/db.config');
 const Role = db.role;

 // Only update the structure of the database without delete the data
// db.sequelize.sync({alter: true}).then(() => {
//  	console.log('Update the Databse structure { alter: true }');
// });

 function createRoles(){
 	Role.create({ id: 1, name: "ADMIN" });
 	Role.create({ id: 2, name: "ROLE_1" });
	Role.create({ id: 3, name: "ROLE_2" });
}

// CREATE THE TABLES AND INSERT THE ROLES
function syncDB () {
	  Role.count({ where: { id_role: 1 } })
		  .then(count => {
		    if(count === 0){
		    	db.sequelize.sync({force: false}).then(() => {
				   console.log('Drop and Resync with { force: true }');
				   createRoles();
				}).catch(error => console.log("ERROR"));
		    }
		}).catch(function(error){
			console.log("The table doesn't exists");
			db.sequelize.sync({force: true}).then(() => {
			   console.log('Drop and Resync with { force: true }');
			   createRoles();
			});
		}
	);
}

syncDB();

const PORT = process.env.PORT || 3001;

require('./config/passport');

app.use(helmet());
app.use(Cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(passport.initialize());

// Root route
app.get('/', (req, res, next) => {
	res.status(200).json({ message: 'OK' });
});

require('./routes/user.route')(app);
require('./routes/todo.route')(app);


app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

module.exports = app;

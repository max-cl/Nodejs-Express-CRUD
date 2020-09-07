const env = require('./env');
 
const Sequelize = require('sequelize');
const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  dialect: env.dialect,
  pool: {
    max: env.max,
    min: env.pool.min,
    acquire: env.pool.acquire,
    idle: env.pool.idle
  }
});
 
const db = {};
 
db.Sequelize = Sequelize;
db.sequelize = sequelize;
 
db.user = require('../model/user.model')(sequelize, Sequelize);
db.role = require('../model/role.model')(sequelize, Sequelize);
db.product = require('../model/product.model')(sequelize, Sequelize);


/** MANAGE USER AND ROLES */ 
db.role.belongsToMany(db.user, { through: 'user_roles', foreignKey: 'id_role', otherKey: 'id_user'});
db.user.belongsToMany(db.role, { through: 'user_roles', foreignKey: 'id_user', otherKey: 'id_role'});

/** PRODUCT TABLE */
db.product.belongsTo(db.user, { foreignKey: 'id_user' });

module.exports = db;
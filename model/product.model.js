module.exports = (sequelize, Sequelize) => {
	const Product = sequelize.define('product', {
        id_product: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name_product: {
            type: Sequelize.STRING,
            allowNull: false
        },
        createdAt: {
            allowNull: false,
            defaultValue: new Date(),
            type: Sequelize.DATE
        },
        updatedAt: {
            allowNull: false,
            defaultValue: new Date(),
            type: Sequelize.DATE
        }
	});
    
	return Product;
}
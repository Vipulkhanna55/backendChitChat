import Sequelize from 'sequelize';

const sequelize = new Sequelize('ChitChat', 'postgres', '16122000', {
    host: 'localhost',
    dialect: 'postgres',
    port: 5432
});

export default sequelize;
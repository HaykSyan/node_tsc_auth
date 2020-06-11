import { Sequelize }  from "sequelize";
import config from './config.json';

const db = (config).DB;
const username = (config).DB_USER;
const password = (config).DB_PASSWORD;

export const database = new Sequelize(db, username, password, {
    dialect: "mysql"
});

database.authenticate();

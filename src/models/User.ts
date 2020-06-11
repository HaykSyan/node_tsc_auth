import * as Sequelize from 'sequelize';
import { database } from "../lib/config/database";

export class User extends Sequelize.Model{
    public email: string;
    public id?: number;
    public login: string;
    public name: string;
    public password?: string;
    public token?: string;
    public forgot_token?: string;

}

User.init({
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    email: Sequelize.STRING,
    password: Sequelize.STRING,
    name: Sequelize.STRING,
    login: Sequelize.STRING,
    forgot_token: Sequelize.STRING,
}, {
    tableName: "users",
    sequelize: database
});

User.sync({force: true}).then(() => console.log("users created"));

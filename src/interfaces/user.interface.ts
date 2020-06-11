import { Model } from 'sequelize';
import {AddUserInterface} from "./AddUser.interface";


export interface UserInterface extends Model<UserInterface, AddUserInterface>{
    id?: number,
    email: string,
    name: string,
    login: string,
    token?: string,
    password?: string
}
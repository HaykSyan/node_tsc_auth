import * as bcrypt from 'bcrypt'
import { check } from 'express-validator';
import { User } from "../models/User";

export const UserRequest = {
    login: [
        check('email')
            .isEmpty()
            .withMessage("Email field is required")
            .isEmail().withMessage("Invalid email format")
            .custom(email =>
                User.findOne({where: {email}}).then(user => !!user)
            ).withMessage("Invalid credentials!"),
        check('password')
            .isEmpty()
            .withMessage("Password field is required")
            .custom((password, { req }) => {
                return User.findOne({ where: { email: req.body.email } })
                    .then(user => bcrypt.compare(password, user!.password))
            }).withMessage('Invalid credentials!')
    ],
    register: [
        check('email')
            .isEmpty()
            .withMessage("Email field is required")
            .isEmail()
            .withMessage("Invalid email format")
            .custom(email =>
                User.findOne({where: {email}}).then(user => !!!user)
            ).withMessage("Email is exists"),
        check('login')
            .isEmpty()
            .withMessage("Login field is required")
            .custom(login =>
                User.findOne({where: {login}}).then(user => !!!user)
            ).withMessage("Login is exists"),
        check('password')
            .isLength({min: 6})
            .withMessage("Password can't be less than 8 characters!"),
        check('name')
            .isEmpty()
            .withMessage("Name field is required")
    ]
};


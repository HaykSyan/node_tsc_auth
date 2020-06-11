import { Request, Response } from 'express';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { User } from "../models/User";
import { AuthInterface } from '../interfaces/auth.interface'
import { UserInterface } from "../interfaces/user.interface";
import config from '../lib/config/config.json';
import { validationResult } from 'express-validator/check'

export default class AuthController {

    /*
    * @params {req, res}
    * @return user
    * */
    login = (req: Request, res: Response) => {
        const errors = validationResult(req);

        if (!errors.isEmpty())
            return res.status(422).json(errors.array());

        const { email }: AuthInterface = req.body;
        User.findOne({where: {email: <string>email}})
            .then(user => {
                const {id, email} = user;
                user.token = jwt.sign({ id, email }, (config).JWT_SECRET);
                return res.status(200).json(user);
            })
            .catch(err => {
                return res.status(422).json({errors: [{email: "Invalid credentials!"}]});
            });
    };

    /*
    * @params {req, res}
    * @return user
    * */
    register = (req: Request, res: Response) => {
        const errors = validationResult(req);

        if (!errors.isEmpty())
            return res.status(422).json(errors.array());

        const { email, password, login, name}: UserInterface = req.body;
        bcrypt.hash(password, (config).HASH_SALT_ROUND)
            .then(hash => {
                User.create({email, login, name, password: hash})
                    .then(user => {
                        return res.status(200).json(user);
                    })
            });
    };

    /*
    * @params {req, res}
    * @return redirect url
    * */
    forgot = (req: Request, res: Response) => {
        const { email } = req.body;
        User.findOne({where: {email: <string>email}})
            .then(user => {
                user.forgot_token = jwt.sign({id: user.id}, (config.JWT_SECRET_FORGOT), {expiresIn: 30});
                user.save();
                return res.status(200).json({url: `${(config).HOST}/reset/${user.forgot_token}`});
            }).catch(err => {
            return res.status(422).json({errors: [{email: "invalid email"}]});
        })

    };

    /*
    * @params {req, res}
    * */
    reset = (req: Request, res: Response) => {
        const { token, password } = req.body;
        jwt.verify(token, (config).JWT_SECRET_FORGOT, (err: any, decoded: any) => {
            if (err) {
                return res.status(422).json({errors: [{message: "expired"}]});
            }
            bcrypt.hash(password, (config).HASH_SALT_ROUND)
                .then(hash => {
                    User.findOne({where: {forgot_token: token}})
                        .then(user => {
                            user.password = hash;
                            user.save();
                        }).catch(err => {
                        return res.status(422).json({errors: [{message: "User not exists"}]});
                    })
                })
        })
    };
}
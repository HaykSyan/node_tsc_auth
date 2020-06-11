import AuthController from "../controllers/AuthController";
import { Router } from "express";
import { UserRequest } from "../requests/user.request";

export default class AuthRoute {
    public path = "/auth";
    public router = Router();
    private authController: AuthController;

    constructor() {
        this.authController = new AuthController();
        this.initializeRoutes()
    }

    /*
    *
    * initialize auth routes
    * */
    public initializeRoutes() {
        this.router.post(`${this.path}/login`, UserRequest.login, this.authController.login);
        this.router.post(`${this.path}/register`, UserRequest.register, this.authController.register);
        this.router.post(`${this.path}/forgot-password`, this.authController.forgot);
        this.router.put(`${this.path}/reset-password`, this.authController.reset);
    }
}

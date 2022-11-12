import { RouteConfig } from "../../framework/route.config";
import express, { Application, Request, Response } from "express";
import UserController from "./user.controller";

export class UserRoutes extends RouteConfig {

  constructor(app: Application) {
    super(app, "UserRoutes", "user");
  }
  
  public configureRoutes() {
    this.app.route(`/${this.baseUrl}/:id`).get([UserController.getUserByID]);
    return this.app;
  }
}
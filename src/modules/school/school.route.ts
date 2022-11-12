import { RouteConfig } from "../../framework/route.config";
import express, { Application, Request, Response } from "express";
import SchoolController from "./school.controller";
import AuthMiddleware from "../../core/middleware/auth.middleware";
import { Role } from "../../enums";

export class SchoolRoutes extends RouteConfig {

  constructor(app: Application) {
    super(app, "SchoolRoutes", "general");
  }
  
  public configureRoutes() {
    this.app.route(`/${this.baseUrl}/board-types`).get([
      AuthMiddleware.verifyToken([Role.RegularUser]), 
      SchoolController.getBoardTypes]);

    this.app.route(`/${this.baseUrl}/board-type/:id`).get([
      AuthMiddleware.verifyToken([Role.RegularUser]), 
      SchoolController.getBoardTypebyId]);

    this.app.route(`/${this.baseUrl}/board-type-by-title/:title`).get([
      AuthMiddleware.verifyToken([Role.RegularUser]), 
    SchoolController.getBoardTypeByTitle]);

    this.app.route(`/${this.baseUrl}/board-type/:id`).put([
      AuthMiddleware.verifyToken([Role.RegularUser]), 
      SchoolController.updateBoardTypeById]);


    this.app.route(`/${this.baseUrl}/room/:id`).get([
      AuthMiddleware.verifyToken([Role.RegularUser]), 
      SchoolController.getRoomById]);

    this.app.route(`/${this.baseUrl}/room`).post([
      AuthMiddleware.verifyToken([Role.RegularUser]), 
      SchoolController.addRoom]);

    this.app.route(`/${this.baseUrl}/room/:id`).put([
      AuthMiddleware.verifyToken([Role.RegularUser]), 
      SchoolController.updateRoomById]);


    this.app.route(`/${this.baseUrl}/teacher/:id`).get([
      AuthMiddleware.verifyToken([Role.RegularUser]), 
      SchoolController.getTeacherById]);

    this.app.route(`/${this.baseUrl}/teacher/:id`).put([
      AuthMiddleware.verifyToken([Role.RegularUser]), 
      SchoolController.updateTeacherById]);

    
    this.app.route(`/${this.baseUrl}/status/:id`).get([
      AuthMiddleware.verifyToken([Role.RegularUser]), 
      SchoolController.getStatusById]);
    
    return this.app;
  }
}



import express, { Express, Application, Request, Response } from "express";
import * as http from "http";
import cors from "cors";
import { RouteConfig } from "./framework/route.config";
import { UserRoutes } from "./modules/user/user.route";
import { SchoolRoutes } from "./modules/school/school.route";
import { AuthenticationRoutes } from "./core/authentication/authentication.route";
import { StaticEnvironment } from "./core/environment.static";
import LoggerService from "./core/logger.service";

LoggerService.initialize();

const routes: Array<RouteConfig> = [];
const app: Express = express();

app.use(express.json());
app.use(cors());

// if (process.env.DEBUG) {
//   process.on("unhandledRejection", function(reason) {
//     process.exit(1)
//   })
// };

routes.push(new UserRoutes(app));
routes.push(new SchoolRoutes(app));
routes.push(new AuthenticationRoutes(app));

const server: http.Server = http.createServer(app);

server.listen(StaticEnvironment.serverPort, () => {
  console.log(`Server is running on ${StaticEnvironment.serverPort}`);
  routes.forEach((route: RouteConfig) => {
    console.log(`Routes configured for ${route.getName()}`)
  });
});
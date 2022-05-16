import { Router } from "express";
import controller from "./controller.js";
import { validateParams } from "./middleware.js";
const route = Router();

route
    .get("/", controller.list)
    .get("/disabled-days", controller.disabledDates)
    .get("/disabled-hours", controller.disabledHours)
    .get("/active", controller.active)
    .post("/", validateParams, controller.create);

export default route;


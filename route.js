import { Router } from "express";
import controller from "./controller.js";
import { validateParams } from "./middleware.js";
const route = Router();

route
    .get("/", controller.list)
    .get("/disabled-dates", controller.disabledDates)
    .post("/", validateParams, controller.create);

export default route;


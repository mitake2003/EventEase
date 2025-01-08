import { Router } from "express";
import { eventCreation, eventRegister, getEventById, getEvents } from "../controllers/event.controller.js";
import { jwtVerify } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/createEvent").post(eventCreation); //need to verify it is user
router.route("/EventList").get(getEvents);
router.route("/eventRegister").put(eventRegister);
router.route("/getEvent").get(getEventById);

export default router;
import { Router } from "express";
import { eventCreation, eventRegister, getEventById, getEvents, deleteEvent, updateEventStatus } from "../controllers/event.controller.js";
import { jwtVerify } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/createEvent").post(eventCreation); //need to verify it is user
router.route("/EventList").get(getEvents);
router.route("/eventRegister").put(eventRegister);
router.route("/getEvent").get(getEventById);
router.route("/deleteEvent").get(deleteEvent);
router.route("/UpdateEvent").get(updateEventStatus);

export default router;
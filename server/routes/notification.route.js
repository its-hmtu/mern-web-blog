import {
  markNotificationAsRead,
  deleteNotification,
  getNotifications,
  sendNotification,

} from "../controllers/notification.controller.js";

import express from "express";

const router = express.Router();

router.route("/").get(getNotifications);

router.route("/send").post(sendNotification);

router.route("/:id").put(markNotificationAsRead).delete(deleteNotification);

export default router;
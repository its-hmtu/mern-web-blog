import Notification from "../models/notification.model.js";
import asyncHandler from "express-async-handler";

export const sendNotification = asyncHandler(async (user_id, message, io) => {
  const notification = new Notification({
    user_id,
    message,
  })

  await notification.save();

  io.to(user_id.toString()).emit('new-notification', notification);
})
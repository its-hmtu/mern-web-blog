import {
  BadRequest,
  InternalServerError,
  NotFound,
  Unauthorized,
  Forbidden
} from "../errors/index.js"
import asyncHandler from 'express-async-handler';
import Notification from "../models/notification.model.js";
import User from "../models/user.model.js";


export const getNotifications = asyncHandler(async (req, res, next) => {
  try {
    const notifications = await Notification.find({ user_id: req.user._id });

    res.status(200).json({
      success: true,
      message: "Notifications fetched successfully",
      data: notifications,
    });
  } catch (e) {
    next(new InternalServerError(e.message));
  }
});

export const markNotificationAsRead = asyncHandler(async (req, res, next) => {
  try {
    const notification = await Notification.findById(req.params.id);

    if (!notification) {
      next(new NotFound("Notification not found"));
    } else {
      notification.read = true;
      await notification.save();

      res.status(200).json({
        success: true,
        message: "Notification marked as read successfully",
        data: notification,
      });
    }
  } catch (e) {
    next(new InternalServerError(e.message));
  }
});

export const sendNotification = asyncHandler(async (user_id, message) => {
  try {
    const notification = await Notification.create({ user_id, message });

    const user = await User.findById(user_id);

    user.notifications.push(notification._id);

    await user.save();

    return notification;
  } catch (e) {
    throw new Error(e.message);
  }
})

export const deleteNotification = asyncHandler(async (req, res, next) => {
  try {
    const notification = await Notification.findById(req.params.id);

    if (!notification) {
      next(new NotFound("Notification not found"));
    } else {
      await Notification.deleteOne({ _id: req.params.id });

      res.status(200).json({
        success: true,
        message: "Notification deleted successfully",
        data: notification,
      });
    }
  } catch (e) {
    next(new InternalServerError(e.message));
  }
});


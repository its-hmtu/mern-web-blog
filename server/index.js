import express from "express";
import path from "path";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDb from "./config/db.js";
import userRoutes from "./routes/user.route.js";
import postRoutes from "./routes/post.route.js";
import commentRoutes from "./routes/comment.route.js";
import authRoutes from "./routes/auth.route.js";
import uploadRoutes from "./routes/upload.route.js";
import categoryRoutes from "./routes/category.route.js";
import adminRoutes from "./routes/admin.route.js";
import { notFound, errorHandler } from "./middlewares/error.middleware.js";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";
import * as AdminJSMongoose from "@adminjs/mongoose";
import expressSession from "express-session";
import bcrypt from "bcryptjs";
import User from "./models/user.model.js";
import Post from "./models/post.model.js";
import Comment from "./models/comment.model.js";
import Category from "./models/category.model.js";
import Notification from "./models/notification.model.js";
import mongoose from "mongoose";
// import { adminJsConfig } from "./views/adminjs.js";
import { ComponentLoader } from "adminjs";
import { cacheMiddleware } from "./middlewares/cache.middleware.js";

const PORT = process.env.PORT || 5000;
const BASE_URL = "/v1";
const __dirname = path.resolve();

dotenv.config();

connectDb();

AdminJS.registerAdapter({
  Resource: AdminJSMongoose.Resource,
  Database: AdminJSMongoose.Database,
});

const canModifyUsers = ({ currentAdmin }) => currentAdmin && (currentAdmin.role === "admin" || currentAdmin.role === "moderator");
const canModifyPosts = ({ currentAdmin }) => currentAdmin && (currentAdmin.role === "admin" || currentAdmin.role === "editor");
const canModifyComments = ({ currentAdmin }) => currentAdmin && (currentAdmin.role === "admin" || currentAdmin.role === "moderator");
const canModifyCategories = ({ currentAdmin }) => currentAdmin && (currentAdmin.role === "admin" || currentAdmin.role === "moderator");
const canModifyNotifications = ({ currentAdmin }) => currentAdmin && (currentAdmin.role === "admin" || currentAdmin.role === "moderator");

export const adminJsConfig = {
  assets: {
    styles: ["/index.css"],
  },
  databases: [mongoose],
  rootPath: "/admin",
  resources: [
    {
      resource: User,
      options: {
        properties: {
          password: {
            type: "string",
            isVisible: {
              list: false,
              edit: true,
              filter: false,
              show: false,
            },
          },
          profile_image_url: {
            isVisible: { list: false, show: true, edit: true, filter: true },
          },
          bio: {
            isVisible: { list: false, show: true, edit: true, filter: true },
          },
          location: {
            isVisible: { list: false, show: true, edit: true, filter: true },
          },
          slug: {
            isVisible: { list: false, show: true, edit: true, filter: true },
          },
        },
        actions: {
          new: {
            isAccessible: canModifyUsers,
          },
          edit: {
            isAccessible: canModifyUsers,
          },
          delete: {
            isAccessible: canModifyUsers,
          },
        },
      },
    },
    {
      resource: Post,
      options: {
        properties: {
          profile_image_url: {
            isVisible: { list: false, show: true, edit: true, filter: true },
          },
          main_image: {
            isVisible: { list: false, show: true, edit: true, filter: true },
          },
          images: {
            isVisible: { list: false, show: true, edit: true, filter: true },
          },
          content: {
            isVisible: { list: false, show: true, edit: true, filter: true },
            type: "richtext",
          },
          slug: {
            isVisible: { list: false, show: true, edit: true, filter: true },
          },
          related_posts: {
            isVisible: { list: false, show: true, edit: true, filter: true },
          },
          comments: {
            isVisible: { list: false, show: true, edit: true, filter: true },
          },
          category_name: {
            isVisible: { list: false, show: true, edit: true, filter: true },
          },
        },
        actions: {
          new: {
            isAccessible: canModifyPosts,
          },
          edit: {
            isAccessible: canModifyPosts,
          },
          delete: {
            isAccessible: canModifyPosts,
          },
        },
      },
    },
    {
      resource: Comment,
      options: {
        properties: {
          content: {
            isVisible: { list: false, show: true, edit: true, filter: true },
            type: "richtext",
          },
          profile_image_url: {
            isVisible: { list: false, show: true, edit: true, filter: true },
          },
          replies: {
            isVisible: { list: false, show: true, edit: true, filter: true },
          },
        },
        actions: {
          new: {
            isAccessible: canModifyComments,
          },
          edit: {
            isAccessible: canModifyComments,
          },
          delete: {
            isAccessible: canModifyComments,
          },
        },
      },
    },
    {
      resource: Category,
      options: {
        actions: {
          new: {
            isAccessible: canModifyCategories,
          },
          edit: {
            isAccessible: canModifyCategories,
          },
          delete: {
            isAccessible: canModifyCategories,
          },
        },
      },
    },
    {
      resource: Notification,
      options: {
        actions: {
          new: {
            isAccessible: canModifyNotifications,
          },
          edit: {
            isAccessible: canModifyNotifications,
          },
          delete: {
            isAccessible: canModifyNotifications,
          },
        },
      },
    }
  ],
};

export const adminJs = new AdminJS(adminJsConfig);

const authenticate = async (email, password) => {
  const user = await User.findOne({ email });
  const matched = user && (await bcrypt.compare(password, user.password));
  if (matched && 
    // if role is admin or moderator or editor
    (user.role === "admin" || user.role === "moderator" || user.role === "editor")
  ) return user;
  return false;
};

// adminJs.resources.forEach((resource) => resourceActions(resource));

const router = AdminJSExpress.buildAuthenticatedRouter(
  adminJs,
  {
    authenticate,
    cookieName: "adminjs",
    cookiePassword: "somepassword",
    loginPath: "/admin/login",
    logoutPath: "/admin/logout",
  },
  null,
  {
    resave: false,
    saveUninitialized: true,
    secret: "secret",
  }
);

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  },
});

app.use(adminJs.options.rootPath, router);
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));



app.use((req, res, next) => {
  req.io = io;
  next();
});

io.on("connection", (socket) => {
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

app.use(cookieParser());
// app.use(cacheMiddleware);

app.use(`${BASE_URL}/auth`, authRoutes);
app.use(`${BASE_URL}/users`, userRoutes);
app.use(`${BASE_URL}/posts`, postRoutes);
app.use(`${BASE_URL}/comments`, commentRoutes);
app.use(`${BASE_URL}/categories`, categoryRoutes);
app.use(`${BASE_URL}/admin`, adminRoutes)
app.use(`${BASE_URL}/upload`, uploadRoutes);

if (process.env.NODE_ENV === "development" || !__dirname) {
  // change to 'production' later
  app.use(express.static(path.join(__dirname, "/server/public")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "public", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("API is running...");
  });
}

app.use(notFound);
app.use(errorHandler);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

adminJs.watch();

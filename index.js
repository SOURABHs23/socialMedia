//3rd party import
import express from "express";
import bodyParser from "body-parser";

//local import
import userRouter from "./src/features/user/user.route.js";
import postRouter from "./src/features/post/post.route.js";
import likeRouter from "./src/features/like/like.route.js";
import commentRouter from "./src/features/comment/comment.route.js";
import friendshipRouter from "./src/features/friendship/friendship.routes.js";

import { errorHandlerMiddleware } from "./src/middlewares/applicationError.js";
import { connectUsingMongoose } from "./src/config/mongoose.Config.js";
import jwtAuth from "./src/middlewares/jwt.middleware.js";

//
const server = express();
// server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

// Middleware to parse URL-encoded bodies (e.g., from HTML forms)

//using router
server.use("/api/users", userRouter);
server.use("/api/posts", jwtAuth, postRouter);
server.use("/api/comments", jwtAuth, commentRouter);
app.use("/api/likes", jwtAuth, likeRouter);
app.use("/api/friends", jwtAuth, friendshipRouter);
//error handling midleware
server.use(errorHandlerMiddleware);

server.listen(8000, () => {
  console.log("server is connected to 8000");
  connectUsingMongoose();
});

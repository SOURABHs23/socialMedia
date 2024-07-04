import express from "express";
import PostController from "./post.controller.js";

//
const postRouter = express.Router();
const postController = new PostController();
import { upload } from "../../middlewares/fileupload.middleware.js";

postRouter.post("/", (req, res, next) => {
  postController.createPost(req, res, next);
});
//get all posts by user path
postRouter.get("/", (req, res, next) => {
  postController.getAllPostsUser(req, res, next);
});
//get all posts path
postRouter.get("/all", (req, res, next) => {
  postController.getAllPosts(req, res, next);
});

postRouter.get("/:postId", (req, res, next) => {
  postController.getSinglePost(req, res, next);
});

postRouter.delete("/:postId", (req, res, next) => {
  postController.deletePost(req, res, next);
});

// postRouter.put("/:postId", upload.single("imageUrl"), updatePost);
//export
export default postRouter;

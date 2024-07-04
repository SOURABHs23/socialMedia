import { PostModel } from "./post.schema.js";
import ApplicationError from "../../middlewares/applicationError.js";

export default class PostRepository {
  async createPostRepo(postData) {
    try {
      console.log(postData);
      const newPost = new PostModel(postData);
      await newPost.save();
      return newPost;
    } catch (error) {
      throw new ApplicationError(error, 400);
    }
  }
  //get single post
  async getSinglePostRepo(id) {
    try {
      const post = await PostModel.findById(id)
        .populate({
          path: "userId",
          select: "_id name email",
        })
        .populate("postComments")
        .populate("postLikes");

      return post;
    } catch (error) {
      throw new ApplicationError(error, 400);
    }
  }
  //get all posts by user
  async getAllPostsUserRepo(userId) {
    try {
      const posts = await PostModel.find({ userId })
        .populate({
          path: "userId",
          select: "_id name email",
        })
        .populate("postComments")
        .populate("postLikes");
      return posts;
    } catch (error) {
      throw new ApplicationError(error, 400);
    }
  }
  //get all posts
  async getAllPostsRepo() {
    try {
      const posts = await PostModel.find({})
        .populate({
          path: "userId",
          select: "_id name email",
        })
        .populate("postComments");
      // .populate("postLikes");
      return posts;
    } catch (error) {
      throw new ApplicationError(error, 400);
    }
  }
  //delete post by user
  async deletePostRepo(userId, postId) {
    try {
      const deletedPost = await PostModel.findOneAndDelete({
        _id: postId,
        userId,
      });
      return deletedPost;
    } catch (error) {
      throw new ApplicationError(error, 400);
    }
  }
}

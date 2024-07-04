import PostRepository from "./post.repository.js";

//
export default class PostController {
  constructor() {
    this.postRepository = new PostRepository();
  }

  async createPost(req, res, next) {
    try {
      const userId = req.userId;
      console.log(req.body);
      const { caption } = req.body;
      // const imageUrl = req.file.filename;
      const postData = { userId, caption };

      const resp = await this.postRepository.createPostRepo(postData);
      if (resp) {
        return res.status(201).send(resp);
      }
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
  //get single post
  async getSinglePost(req, res, next) {
    try {
      const postId = req.params.postId;
      const resp = await this.postRepository.getSinglePostRepo(postId);
      if (resp) {
        return res.status(200).send(resp);
      } else {
        res.status(404).send("Post not found");
      }
    } catch (err) {
      next(err);
    }
  }
  // get all posts by user
  async getAllPostsUser(req, res, next) {
    try {
      const userId = req.userId;
      const resp = await this.postRepository.getAllPostsUserRepo(userId);
      if (resp) {
        return res.status(200).send(resp);
      } else {
        res.status(404).send("Post not found");
      }
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
  // get all posts
  async getAllPosts(req, res, next) {
    try {
      const resp = await this.postRepository.getAllPostsRepo();
      if (resp) {
        return res.status(200).send(resp);
      } else {
        res.status(404).send("Post not found");
      }
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
  //delete post by user
  async deletePost(req, res, next) {
    try {
      const userId = req.userId;

      const { postId } = req.params;
      const resp = await this.postRepository.deletePostRepo(userId, postId);
      if (resp) {
        return res.status(200).send("post deleted");
      } else {
        res.status(404).send("Post not found");
      }
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}

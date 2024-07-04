import mongoose from "mongoose";
import { CommentModel } from "../comment/comment.schema.js";
import { PostModel } from "../post/post.schema.js";
import { LikeModel } from "./like.schema.js";

// toggle like on post or comment
export const toggleLikeRepo = async (id, userId, type) => {
  // This id can be postId or commentId.
  // Anyone who is logged in can toggle like on a post or comment.
  try {
    // Check if a like document exists for the given entity, user, and type
    const likeDocument = await LikeModel.findOne({
      userWhoLiked: userId,
      likeable: id,
      on_model: type,
    });

    if (likeDocument) {
      // If a like document exists, remove it
      await LikeModel.findByIdAndDelete(likeDocument._id);

      if (type === "Post") {
        // Remove the like reference from the post
        const post = await PostModel.findByIdAndUpdate(
          id,
          { $pull: { postLikes: likeDocument._id } },
          { new: true }
        );
        if (!post) {
          return {
            success: false,
            error: { statusCode: 404, msg: "Post not found" },
          };
        }
      } else if (type === "Comment") {
        // Remove the like reference from the comment (if applicable)
        const comment = await CommentModel.findByIdAndUpdate(
          id,
          { $pull: { commentLikes: likeDocument._id } },
          { new: true }
        );
        if (!comment) {
          return {
            success: false,
            error: { statusCode: 404, msg: "Comment not found" },
          };
        }
      }
    } else {
      // Create a new like document
      const newLike = new LikeModel({
        userWhoLiked: userId,
        likeable: id,
        on_model: type,
      });

      // Check if the id for the type exists
      if (type === "Comment") {
        const comment = await CommentModel.findById(id);
        if (!comment) {
          return {
            success: false,
            error: { statusCode: 404, msg: "Comment not found" },
          };
        }

        // Add the like reference to the comment
        await CommentModel.findByIdAndUpdate(
          id,
          { $push: { commentLikes: newLike._id } },
          { new: true }
        );
      } else if (type === "Post") {
        const post = await PostModel.findByIdAndUpdate(
          id,
          { $push: { postLikes: newLike._id } },
          { new: true }
        );
        if (!post) {
          return {
            success: false,
            error: { statusCode: 404, msg: "Post not found" },
          };
        }
      }

      await newLike.save();
    }

    return { success: true, res: "Like toggled successfully" };
  } catch (error) {
    return { success: false, error: { statusCode: 400, msg: error.message } };
  }
};

//get likes for specific post or comment
export const getLikesRepo = async (id) => {
  try {
    const likes = await LikeModel.find({ likeable: id })
      .populate({ path: "userWhoLiked", select: "_id name email" })
      .populate("likeable");
    return { success: true, res: likes };
  } catch (error) {
    return { success: false, error: { statusCode: 400, msg: error } };
  }
};

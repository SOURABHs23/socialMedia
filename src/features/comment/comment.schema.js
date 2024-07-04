import mongoose, { Schema } from "mongoose";

export const CommentSchema = Schema({
  //which user commented
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "User id required"],
    ref: "User",
  },
  //user comment in which post
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "Post id required"],
    ref: "Post",
  },
  //comment data
  content: {
    type: String,
    required: [true, "need some text for comment"],
  },
  // Array of likes for the comment
  commentLikes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Like",
    },
  ],
});

export const CommentModel = mongoose.model("Comment", CommentSchema);

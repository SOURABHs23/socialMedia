import mongoose, { Schema } from "mongoose";

const PostSchema = Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "Every post needs a user"],
    ref: "User",
  },
  //   imageUrl: {
  //     type: String,
  //     required: [true, "Needs an image url"],
  //   },
  caption: {
    type: String,
    required: [true, "Need a caption"],
  },
  postComments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
      required: true,
    },
  ],
  postLikes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Like",
    },
  ],
});

export const PostModel = mongoose.model("Post", PostSchema);

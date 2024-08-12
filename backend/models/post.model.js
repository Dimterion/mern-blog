import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      unique: true,
    },
    link: {
      type: String,
    },
    image: {
      type: String,
      default:
        "https://raw.githubusercontent.com/Dimterion/Notes-app/master/frontend/src/assets/home_page_img.jpg",
    },
    category: {
      type: String,
      default: "uncategorized",
    },
    technology: {
      type: String,
      default: "general",
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true },
);

const Post = mongoose.model("Post", postSchema);

export default Post;

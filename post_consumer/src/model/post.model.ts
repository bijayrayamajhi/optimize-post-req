import mongoose from "mongoose";

interface Post {
  title: string;
  message: string;
}

const postSchema = new mongoose.Schema<Post>({
  title: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

//checking if model already exists
const Post = mongoose.models.Post || mongoose.model("Post", postSchema);
export default Post;

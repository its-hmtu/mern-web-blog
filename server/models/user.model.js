import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
import slugify from "slugify";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    is_admin: {
      type: Boolean,
      default: false,
      required: true,
    },
    profile_image_url: {
      type: String,
      default: "",
    },
    bio: {
      type: String,
      default: "",
    },
    location: {
      type: String,
      default: "",
    },
    pronouns: {
      type: String,
      default: "",
    },
    work: {
      type: String,
      default: "",
    },
    slug: {
      type: String,
      unique: true,
    },
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    reading_list: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcryptjs.genSalt(10);
  this.password = await bcryptjs.hash(this.password, salt);
  this.slug = slugify(this.username, { lower: true });
});

userSchema.methods.matchPassword = async function (plain) {
  return await bcryptjs.compare(plain, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;

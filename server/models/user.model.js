import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
import slugify from "slugify";

const userSchema = new mongoose.Schema(
  {
    full_name: {
      type: String,
      required: true,
    },
    user_name: {
      type: String,
      required: [true, "Please provide a username"],
    },
    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please provide a valid email address",
      ]
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      minlength: [8, "Password must be at least 8 characters long"],
    },
    profile_image_url: {
      type: String,
      default: "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?w=826&t=st=1721292071~exp=1721292671~hmac=cd9459df860e32f4b8c9352a1500c0ee2b1dbb1c5673017a3a4a0dcf3d488e1a"
    },
    role: {
      type: String,
      enum: ["user", "editor", "moderator", "admin"],
      default: "user",
    },
    is_email_verified: {
      type: Boolean,
      default: false,
    },
    bio: {
      type: String,
      default: "",
      // minlength: [10, "Bio must be at least 10 characters long"],
    },
    location: {
      type: String,
      default: "",
    },
    slug: {
      type: String,
      unique: true,
    },
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
    posts_count: {
      type: Number,
      default: 0,
    },
    comments_count: {
      type: Number,
      default: 0,
    },
    following_categories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
      },
    ],
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      }
    ],
    followers_count: {
      type: Number,
      default: 0,
    },
    liked_post: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    reading_list: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    blocked_users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    is_comment_blocked: {
      type: Boolean,
      default: false,
    },
    is_banned: {
      type: Boolean,
      default: false,
    },
    is_create_post_blocked: {
      type: Boolean,
      default: false,
    }
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
  this.slug = slugify(this.user_name, { lower: true, strict: true});
});

userSchema.methods.matchPassword = async function (plain) {
  if (plain === undefined || this.password === undefined) {
    if (plain === undefined) {
      console.log("plain is undefined");
    }
    else 
      console.log("password is undefined");
  }
  return await bcryptjs.compare(plain, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;

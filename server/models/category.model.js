import mongoose from "mongoose";
import slug from 'slugify'

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

categorySchema.pre('validate', function(next) {
  this.slug = slug(this.name, {lower: true})
  next()
})

const Category = mongoose.model("Category", categorySchema);

export default Category;

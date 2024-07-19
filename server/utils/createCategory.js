import Category from "../models/category.model.js";
import connectDb from "../config/db.js";
import dotenv from "dotenv";
dotenv.config();

connectDb();

const categories = [
  {
    name: "Technology",
    description: "Technology news, reviews, and analysis.",
  },
  {
    name: "Science",
    description: "Science news, reviews, and analysis.",
  },
  {
    name: "Health",
    description: "Health news, reviews, and analysis.",
  },
  {
    name: "Business",
    description: "Business news, reviews, and analysis.",
  },
  {
    name: "Entertainment",
    description: "Entertainment news, reviews, and analysis.",
  },
  {
    name: "Politics",
    description: "Politics news, reviews, and analysis.",
  },
  {
    name: "Sports",
    description: "Sports news, reviews, and analysis.",
  },
  {
    name: "Travel",
    description: "Travel news, reviews, and analysis.",
  },
  {
    name: "Lifestyle",
    description: "Lifestyle news, reviews, and analysis.",
  },
  {
    name: "Health & Beauty",
    description: "Nutrition, Fitness, Skincare, Beauty Tips.",
  },
  {
    name: "Lifestyle & Family",
    description: "Parenting, Home Life, Life Hacks, Marriage & Relationships.",
  },
  {
    name: "Food",
    description: "Recipes, Dining Out, Restaurant Reviews, Food & Drinks.",
  },
  {
    name: "Business & Entrepreneurship",
    description: "Online Business, Management & Leadership, Startups, Personal Finance.",
  },
  {
    name: "Education",
    description: "Scholarships & Studying Abroad, Soft Skills, Study Materials, Educational Technology",
  },
  {
    name: "Entertainment",
    description: "Movies, Music, Books and Literature, Events and Festivals.",
  },
];

const createCategory = async () => {
  try {
    for (let i = 0; i < categories.length; i++) {
      const category = new Category(categories[i]);
      await category.save();
    }
    console.log("Categories created successfully");
  } catch (error) {
    console.error("Error creating categories: ", error);
  }
};

createCategory();
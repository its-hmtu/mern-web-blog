import axios from "axios";
import cheerio from "cheerio";
import Post from "../models/post.model.js";
import User from "../models/user.model.js";
import Category from "../models/category.model.js";
import connectDb from "../config/db.js";
import dotenv from "dotenv";
import sizeOf from "image-size";
import fs from "fs";
import path from "path";

const __dirname = path.resolve();

dotenv.config();

connectDb();

async function getArticleLinks(blogUrl) {
  try {
    const response = await axios.get(blogUrl);
    const $ = cheerio.load(response.data);

    const articleLinks = [];
    $(".crayons-story__indention").each((index, element) => {
      const link = $(element).find("a").attr("href");
      if (link) {
        articleLinks.push(link);
      }
    });
    return articleLinks;
  } catch (error) {
    console.error("Error fetching article links:", error);
    return [];
  }
}

function calculateReadTime(content) {
  const text = content.replace(/(<([^>]+)>)/gi, "");
  const wordsPerMinute = 200;
  const wordCount = text.trim().split(/\s+/).length;

  return Math.ceil(wordCount / wordsPerMinute);
}

async function crawlArticle(url) {
  try {
    const BASE_URL = "https://dev.to";
    const response = await axios.get(`${BASE_URL}${url}`);
    const $ = cheerio.load(response.data);

    const article = $("article");

    // replace all new lines and tabs with a space
    // replace multiple spaces with a single space
    // replace double quotes with single quotes
    // trim the content
    let title = article
      .find("h1")
      .text()
      .replace(/[\n\t]+|\s\s+/g, " ")
      .trim();
    let main_image = article.find(".crayons-article__cover img").attr("src");
    let content = article
      .find("#article-body")
      .html()
      .replace(/[\n\t]/g, " ") // Replace new lines and tabs with a space
      .replace(/\s+/g, " ") // Replace multiple spaces with a single space
      .replace(/"/g, "'")
      .trim();
    let read_time = calculateReadTime(content);

    const images = [];

    article
      .find(".article-body-image-wrapper img")
      .each(async (index, element) => {
        const src = $(element).attr("src");
        if (src) {
          try {
            images.push({
              url: src,
              height: 0,
              width: 0,
            });
          } catch (error) {
            console.error(
              `Error fetching or processing image from ${src}:`,
              error
            );
          }
        }
        images.push({
          url: src,
          height: 0,
          width: 0,
        });
      });

    return {
      title,
      content,
      main_image,
      read_time,
      images,
    };

  } catch (error) {
    console.error("Error:", error);
  }
}

async function main() {
  const blogUrl = "https://dev.to/";
  const articleLinks = await getArticleLinks(blogUrl);
  console.log(articleLinks);

  console.log(articleLinks.length);

  const user = await User.findById("66938e879e2d267fa341de04");
  const user_id = user._id;
  const author = user.full_name;
  const profile_image_url = user.profile_image_url;

  const categories = [
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
    {
      name: "Lifestyle",
      description: "Fashion, Interior Design, Hobbies & Interests, Vehicles.",
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

  
  for (const article of articleLinks) {
    const data = await crawlArticle(article);
    const relatedPosts = await Post.find({ category_id: category._id }).limit(5);
    console.log(relatedPosts);
    const post = new Post({
      user_id,
      author,
      profile_image_url,
      title: data.title,
      content: data.content,
      category_id: category._id,
      category_name: category.name,
      main_image: data.main_image,
      read_time: data.read_time,
      images: data.images,
      related_posts: relatedPosts.map((post) => post._id),
    });

    const existingPost = await Post.findOne({ title: post.title });
    if (existingPost) {
      console.log("Post already exists, skipping...");
      continue;
    }

    await post.save();

    user.posts.push(post._id);
    user.posts_count += 1;

    await user.save();
  }

  process.exit(0);
}

main();

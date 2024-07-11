import axios from "axios";
import cheerio from "cheerio";
import Post from "../models/post.model.js";
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

    // find div with class name crayons-story__indention and get the href attribute of the a tag
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

    // find all image tag in content and get the src attribute, use image-size to get the dimensions
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

  const firstArticle = articleLinks[0];
  const data = await crawlArticle(firstArticle);
  console.log(data);

  // const filePath = path.join(__dirname, 'data.jsonl');
  // for (const url of articleLinks) {
  //   const data = await crawlArticle(url);
  //   console.log(data);

  //   const dataString = JSON.stringify(data) + ',\n'
  //   fs.appendFileSync(filePath, dataString);

  //   // if (data && data.title && data.content) {
  //   //   const newPost = new Post({
  //   //     title: data.title,
  //   //     content: data.content,
  //   //   });

  //   //   await newPost
  //   //     .save()
  //   //     .then(() => console.log(`Post saved successfully! URL: ${url}`))
  //   //     .catch((error) => console.error("Error saving post:", error));
  //   // } else {
  //   //   console.error(`Error: No data to save for URL: ${url}`);
  //   // }
  // }

  process.exit(0);
}

main();

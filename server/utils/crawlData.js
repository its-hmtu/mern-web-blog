import axios from "axios";
import cheerio from "cheerio";
import Post from "../models/post.model.js";
import connectDb from "../config/db.js";
import dotenv from "dotenv";

dotenv.config();

connectDb();

async function getArticleLinks(blogUrl) {
    try {
      const response = await axios.get(blogUrl);
      const $ = cheerio.load(response.data);
      
      const articleLinks = [];
      $("a.article-link").each((index, element) => {
        const url = $(element).attr("href");
        if (url) {
          articleLinks.push(url.startsWith("http") ? url : `${blogUrl}${url}`);
        }
      });
  
      return articleLinks;
    } catch (error) {
      console.error("Error fetching article links:", error);
      return [];
    }
  }

async function crawlArticle(url) {
  try {
    const response = await axios
      .get(url)
      .then((res) => cheerio.load(response.data))
      .catch((error) => {
        throw new Error(error);
      });
    const article = response("article");

    const title = article.find("h1").text().trim();
    let content = article.find("#article-body").html();

    if (content) {
      content = content
        .replace(/\n|\t/g, " ")
        .replace(/\s\s+/g, " ")
        .replace(/\\"/g, "'")
        .trim();
    } else {
      console.error("Error: .article-body element not found");
      content = "";
    }

    return {
      title,
      content: content.replace(/\\"/g, "'") || "", 
    };
  } catch (error) {
    console.error("Error:", error);
  }
}

async function main() {
    const blogUrl = "https://dev.to/";
    const articleLinks = await getArticleLinks(blogUrl);
  
    for (const url of articleLinks) {
      const data = await crawlArticle(url);
      if (data && data.title && data.content) {
        const newPost = new Post({
          title: data.title,
          content: data.content,
          slug: data.title,
        });
  
        await newPost
          .save()
          .then(() => console.log(`Post saved successfully! URL: ${url}`))
          .catch((error) => console.error("Error saving post:", error));
      } else {
        console.error(`Error: No data to save for URL: ${url}`);
      }
    }
}
  
main();
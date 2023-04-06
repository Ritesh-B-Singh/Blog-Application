import { getAllBlogs, addBlog } from "@/api-helpers/controllers/blog-controller";
import { connectDatabase } from "@/api-helpers/utils";

export default async function handler (req, res) {
  await connectDatabase();

  if(req.method === "GET") {
    return getAllBlogs(req, res);
  } else if (req.method === "POST") {
    return addBlog(req, res);
  }
}

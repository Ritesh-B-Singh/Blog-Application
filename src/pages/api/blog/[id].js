import { deleteBlogFromId, getBlogFromId, updateBlogFromId } from "@/api-helpers/controllers/blog-controller";
import { connectDatabase } from "@/api-helpers/utils";

export default async function handler(req, res) {
    await connectDatabase();

    if (req.method === "PUT") {
       return updateBlogFromId(req, res);  
    } else if (req.method === "DELETE") {
        return deleteBlogFromId(req, res);
    } else if (req.method === "GET") {
        getBlogFromId(req, res);
    }
}

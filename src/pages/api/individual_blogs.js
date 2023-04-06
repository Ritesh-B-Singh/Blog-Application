import { connectDatabase } from "@/api-helpers/utils";
import { getIndividualBlogs } from "@/api-helpers/controllers/blog-controller";

export default async function handler(req, res) {
    await connectDatabase();

    if (req.method === "POST") {
        return getIndividualBlogs(req, res);
    }
}

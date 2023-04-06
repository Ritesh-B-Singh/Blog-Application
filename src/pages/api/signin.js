import { signin } from "@/api-helpers/controllers/user-controller";
import { connectDatabase } from "@/api-helpers/utils";

export default async function handler(req, res) {
    await connectDatabase();
    if (req.method === "POST") {
        return signin(req, res);
    }
}
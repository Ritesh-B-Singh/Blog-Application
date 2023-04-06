import Blog from "../model/Blog";

export const getAllBlogs = async (req, res) => {
    let blogs;

    try {
        blogs = await Blog.find();
    } catch (err) {
        return new Error(err);
    }

    if (!blogs) {
        return res.status(500).json({ message: "Internal Server Error" })
    }

    if (blogs.length === 0) {
        return res.status(404).json({ message: "No Blog Found!" })
    }

    return res.status(200).json({ blogs });
}

export const addBlog = async (req, res) => {
    const { author, title, description, image, comments, date } = req.body;

    if (!author && author.trim() === "" && !title && title.trim() === "" && !description && description.trim() === "" && !date && date.trim() === "") {
        return res.status(422).json({ message: "Invalid Inputs" })
    }

    let blog;

    try {
        blog = new Blog({ author, title, description, image, comments, date });
        blog = await blog.save()
    } catch (err) {
        return new Error(err)
    }

    if (!blog) {
        return res.status(500).json({ message: "Internal Server Error" })
    }

    return res.status(201).json({ blog })
}

export const updateBlogFromId = async (req, res) => {

    const id = req.query.id;
    const { author, title, description, image, comments, date } = req.body;
    if (!author && author.trim() === "" && !title && title.trim() === "" && !description && description.trim() === "" && !date && date.trim() === "") {
        return res.status(422).json({ message: "Invalid Inputs" })
    }

    let blog;

    try {
        blog = await Blog.findByIdAndUpdate(id, { author, title, description, image, comments, date });
    } catch (err) {
        return new Error(err)
    }

    if (!blog) {
        return res.status(500).json({ message: "Internal Server Error" })
    }

    return res.status(200).json({ message: "Blog Successfully Updated" })
}

export const deleteBlogFromId = async (req, res) => {

    const id = req.query.id;

    let blog;

    try {
        blog = await Blog.findByIdAndRemove(id);
    } catch (err) {
        return new Error(err)
    }

    if (!blog) {
        return res.status(500).json({ message: "Unable to Remove" })
    }

    return res.status(200).json({ message: "Blog Successfully Removed" })
}

export const getBlogFromId = async (req, res) => {
    const id = req.query.id;

    let blog;

    try {
        blog = await Blog.findById(id);
    } catch (err) {
        return new Error(err)
    }

    if (!blog) {
        return res.status(404).json({ message: "No Blog found from the given id" });
    }

    return res.status(200).json({ blog });
}

export const getIndividualBlogs = async (req, res) => {
    
    const blogs = await Blog.find({ author: { $eq: req.body.email } })

    if (!blogs) {
        return res.status(500).json({ message: "Internal Server Error" })
    }
    return res.status(200).json({ blogs })
}

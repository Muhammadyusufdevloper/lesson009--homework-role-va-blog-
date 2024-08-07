import { Blogs, blogValidation } from "../models/blogSchema.js";

function requiredCatch() {
    return {
        msg: "Server error",
        variant: "error",
        payload: null
    };
}

function informationReturn(msg, variant, payload) {
    return {
        msg,
        variant,
        payload
    };
}

class BlogsController {
    async get(req, res) {
        try {
            const blogs = await Blogs.find();
            if (!blogs.length) {
                return res.status(404).json(informationReturn("No blogs found", "error", null));
            }
            res.status(200).json(informationReturn("All blogs", "success", blogs));
        } catch (err) {
            res.status(500).json(requiredCatch());
        }
    }

    async getById(req, res) {
        try {
            const blog = await Blogs.findById(req.params.id);
            if (!blog) {
                return res.status(404).json(informationReturn("Blog not found", "error", null));
            }
            res.status(200).json(informationReturn("Blog found", "success", blog));
        } catch (err) {
            res.status(500).json(requiredCatch());
        }
    }

    async post(req, res) {
        try {
            const { error } = blogValidation(req.body);
            if (error) {
                return res.status(400).json(informationReturn(error.details[0].message, "warning", null));
            }
            const blog = await Blogs.create(req.body);
            res.status(201).json(informationReturn("Blog created successfully", "success", blog));
        } catch (err) {
            res.status(500).json(requiredCatch());
        }
    }

    async put(req, res) {
        try {
            const { error } = blogValidation(req.body);
            if (error) {
                return res.status(400).json(informationReturn(error.details[0].message, "warning", null));
            }
            const updatedBlog = await Blogs.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!updatedBlog) {
                return res.status(404).json(informationReturn("Blog not found", "error", null));
            }
            res.status(200).json(informationReturn("Blog updated successfully", "success", updatedBlog));
        } catch (err) {
            res.status(500).json(requiredCatch());
        }
    }

    async delete(req, res) {
        try {
            const deletedBlog = await Blogs.findByIdAndDelete(req.params.id);
            if (!deletedBlog) {
                return res.status(404).json(informationReturn("Blog not found", "error", null));
            }
            res.status(200).json(informationReturn("Blog deleted successfully", "success", deletedBlog));
        } catch (err) {
            res.status(500).json(requiredCatch());
        }
    }
}

export default new BlogsController();

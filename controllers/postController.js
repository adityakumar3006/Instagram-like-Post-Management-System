const Post = require("../models/postModel");

exports.createPost = async (req, res) => {
    const { title, description } = req.body;
    const imageUrl = `/uploads/${req.file.filename}`;

    const post = await Post.create({ title, description, imageUrl, user: req.user.id });
    res.status(201).json(post);
};

exports.getPosts = async (req, res) => {
    const posts = await Post.find().populate("user", "username");
    res.json(posts);
};

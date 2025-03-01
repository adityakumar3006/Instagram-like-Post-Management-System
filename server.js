/*
===============================================
  Backend - Node.js + Express.js + MongoDB
===============================================
*/

// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

mongoose.connect("mongodb+srv://adityakr4005:gXlS5YcnJKcUZGpj@cluster0.66o37.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const postSchema = new mongoose.Schema({
    title: String,
    description: String,
    image: String,
});

const Post = mongoose.model("Post", postSchema);

const storage = multer.diskStorage({
    destination: "uploads/",
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    },
});

const upload = multer({ storage });

// Create Post
app.post("/posts", upload.single("image"), async (req, res) => {
    const { title, description } = req.body;
    const image = req.file ? req.file.path : "";
    try {
        const newPost = new Post({ title, description, image });
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json({ error: "Error creating post" });
    }
});

// Get All Posts
app.get("/posts", async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: "Error fetching posts" });
    }
});

// Get Single Post
app.get("/posts/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.json(post);
    } catch (error) {
        res.status(500).json({ error: "Error fetching post" });
    }
});

// Update Post
app.put("/posts/:id", upload.single("image"), async (req, res) => {
    try {
        const { title, description } = req.body;
        let updateData = { title, description };

        if (req.file) {
            updateData.image = req.file.path;
        }

        const updatedPost = await Post.findByIdAndUpdate(req.params.id, updateData, { new: true });
        res.json(updatedPost);
    } catch (error) {
        res.status(500).json({ error: "Error updating post" });
    }
});

// Delete Post
app.delete("/posts/:id", async (req, res) => {
    try {
        await Post.findByIdAndDelete(req.params.id);
        res.json({ message: "Post deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error deleting post" });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

/*
===============================================
  Frontend - React.js
===============================================
*/


//gXlS5YcnJKcUZGpj --pass
//adityakr4005- username
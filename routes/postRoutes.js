const express = require("express");
const { createPost, getPosts } = require("../controllers/postController");
const protect = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();
router.post("/", protect, upload.single("image"), createPost);
router.get("/", getPosts);

module.exports = router;

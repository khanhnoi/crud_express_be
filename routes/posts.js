const expess = require("express");
const router = expess.Router();

const { getPosts, createPost } = require("../controllers/posts");

router.get("/", getPosts);
router.post("/", createPost);

module.exports = router;

import express from "express";
import cors from "cors";
import { findAll, create } from "./models/posts.models.js";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}.`);
});

app.get("/posts", async (req, res) => {
  try {
    const posts = await findAll();
    return res.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/posts", async (req, res) => {
  const post = req.body;
  console.log(post.titulo);
  const newPost = {
    titulo: post.titulo,
    img: post.url,
    descripcion: post.descripcion,
    // likes: post.likes,
  };
  const createdPost = await create(newPost);
  res.json(createdPost);
});

app.delete("/posts/:id", async (req, res) => {
  const id = req.params.id;
  const post = await deletePost(id);
  res.json(post);
});

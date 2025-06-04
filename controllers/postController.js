const Post = require('../models/Posts');

// Obtenir tous les posts
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des posts", error });
  }
};

// Obtenir un post par ID
exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post non trouvé" });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération du post", error });
  }
};

// Créer un nouveau post
exports.createPost = async (req, res) => {
  try {
    const { title, image, text } = req.body;
    const newPost = new Post({ title, image, text });
    await newPost.save();
    res.status(201).json({ message: "Post créé avec succès", post: newPost });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la création du post", error });
  }
};

// Mettre à jour un post
exports.updatePost = async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedPost) {
      return res.status(404).json({ message: "Post non trouvé" });
    }
    res.json({ message: "Post mis à jour avec succès", post: updatedPost });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la mise à jour du post", error });
  }
};

// Supprimer un post
exports.deletePost = async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);
    if (!deletedPost) {
      return res.status(404).json({ message: "Post non trouvé" });
    }
    res.json({ message: "Post supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la suppression du post", error });
  }
};
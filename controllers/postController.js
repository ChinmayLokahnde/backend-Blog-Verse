import Post from '../models/post.js';
import { generateSlug } from '../utils/generateSlug.js';

export const createPost = async (req, res) => {
  const { title, content } = req.body;
  const thumbnail = req.file ? req.file.path.replace(/\\/g, "/") : '';
  try {
    const post = await Post.create({
      title,
      content,
      thumbnail,
      author:req.user.id,
      slug: generateSlug(title)
    });
    res.status(201).json(post);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getAllPosts = async (req, res) => {
  const posts = await Post.find().populate('author', 'username').sort({ createdAt: -1 });
  res.json(posts);
};

export const deletePost = async (req, res)=>{
  try{
    const post = await Post.findOne({slug: req.params.slug});
    if(!post) return res.status(404).json({msg:"Post not Found"});

    if (post.author.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this post' });
    }
    await Post.deleteOne({slug: req.params.slug});
    res.json({msg:"Post deleted Successfully"});
  }catch(err){
    res.status(500).json({error: err.message});
  }
};

export const updatePost = async (req, res)=>{
  const{title, content, thumbnail} = req.body;
  try{
    const post = await Post.findOne({slug: req.params.slug});

    if(!post) return res.status(404).json({msg:"Post NOt Found"});

    if (post.author.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to edit this post' });
    }
    post.title = title || post.title;
    post.content = content || post.content;
    post.thumbnail = thumbnail || post.thumbnail;
    post.slug = generateSlug(post.title);

    const updated = await post.save();
    res.json(updated);
    }catch(err){
      res.status(500).json({error: err.message})
    }
}

export const getPostBySlug = async (req, res) => {
   console.log("Requested Slug:", req.params.slug);
  const post = await Post.findOne({ slug: req.params.slug }).populate('author', 'username _id');
  if (!post) return res.status(404).json({ message: 'Post not found' });
  res.json(post);
};

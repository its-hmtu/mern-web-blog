import Post from '../models/post.model.js'
import asyncHandler from 'express-async-handler'

const getPosts = asyncHandler(async (req, res) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0
    const limit = parseInt(req.query.limit) || 3
    const sort_direction = req.query.order === 'asc' ? 1 : -1
    const posts = await Post.find({
      ...(req.query.userId && { userId: req.query.userId }),
      ...(req.query.category && { category: req.query.category }),
      ...(req.query.slug && { slug: req.query.slug }),
      ...(req.query.postId && { _id: req.query.postId }),
      ...(req.query.searchTerm && {
        $or: [
          { title: { $regex: req.query.searchTerm, $options: 'i' } },
          { content: { $regex: req.query.searchTerm, $options: 'i' } }
        ]
      })
    }).sort({
      updateAt: sort_direction
    }).skip(startIndex)
      .limit(limit)

    const totalPosts = await Post.countDocuments();

    const now = new Date();

    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    const lastMonthPosts = await Post.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    })

    res.status(200).json({
      posts,
      totalPosts,
      lastMonthPosts
    })
  } catch (e) {
    res.status(500)
    throw new Error(`Server Error: ${e.message}`)
  }
}) 

const getPost = asyncHandler(async (req, res) => {
  const postId = req.params.postId

  try {
    const post = await Post.findById(postId)

    if (!post) {
      res.status(404)
      throw new Error('Post not found')
    } else {
      res.status(200).json(post)
    }
  } catch(e) {
    res.status(500)
    throw new Error(`Server Error: ${e.message}`)
  }
})

// @access Private
const createPost = asyncHandler(async (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    res.status(400)
    throw new Error('Please fill all fields')
  } else {
    // const slug = title
    //   .split(' ')
    //   .join('-')
    //   .toLowerCase()
    //   .replace(/[^a-zA-Z0-9-]/g, '');

    try {
      const newPost = await Post.create({
        ...req.body,
        // slug,
        userId: req.user._id
      })

      res.status(201).json(newPost)
    } catch(e) {
      res.status(500)
      throw new Error(`Server Error: ${e.message}`)
    }
  }
})

// @access Private 
const deletePost = asyncHandler(async (req, res) => {
  const postId = req.params.postId
  const userId = req.params.userId

  if (req.user._id.toString() !== userId) {
    let error_str = (process.env.NODE_ENV === 'development') ? `Not Authorized - ${typeof(req.user._id)} !== ${typeof(userId)}` : 'Not Authorized'
    
    res.status(403)
    throw new Error(error_str)
  }

  try {
    const post = await Post.findByIdAndDelete(postId)
    res.status(200).json({ message: 'Post deleted' })

    if (!post) {
      res.status(404)
      throw new Error('Post not found')
    }
  } catch(e) {
    res.status(500)
    throw new Error(`Server Error: ${e.message}`)
  }
})

// @access Private
const updatePost = asyncHandler(async (req, res) => {
  const postId = req.params.postId
  const userId = req.params.userId
  const {title, content, category, image} = req.body

  if (req.user._id.toString() !== userId) {
    res.status(403)
    throw new Error(`Not Authorized - ${typeof(req.user._id)} !== ${typeof(req.params.userId)}`)
  }

  try {
    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { $set: {
        title,
        content,
        category,
        image
      }}, 
      { new: true }
    )

    res.status(200).json(updatedPost)

    if (!updatedPost) {
      res.status(404)
      throw new Error('Post not found')
    }
  } catch(e) {
    res.status(500)
    throw new Error(`Server Error: ${e.message}`)
  }
})

export {
  getPosts,
  getPost,
  createPost,
  deletePost,
  updatePost,
}
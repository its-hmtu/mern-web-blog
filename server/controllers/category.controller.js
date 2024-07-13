import asyncHandler from 'express-async-handler';
import Category from '../models/category.model.js';
import {
  NotFound,
  BadRequest,
  Unauthorized,
  Forbidden,
  InternalServerError,
} from '../errors/index.js';

const createCategory = asyncHandler(async(req, res, next) => {
  try {
    const { name, description } = req.body;
    const category = await Category.create({
      name,
      description,
    });
    res.status(201).json({
      success: true,
      message: 'Category created successfully',
      data: category,
    });
  } catch (e) {
    next(new InternalServerError(e.message));
  }
})

const updateCategory = asyncHandler(async(req, res, next) => {
  try {
    const { name, description } = req.body;
    const category = await Category.findById(req.params.id);
    if (!category) {
      return next(new NotFound(`Category with id ${req.params.id} not found`));
    }
    category.name = name || category.name;
    category.description = description || category.description;
    await category.save();
    res.status(200).json({
      success: true,
      message: 'Category updated successfully',
      data: category,
    });
  } catch (e) {
    next(new InternalServerError(e.message));
  }
})

const deleteCategory = asyncHandler(async(req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return next(new NotFound(`Category with id ${req.params.id} not found`));
    }
    await Category.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      message: 'Category deleted successfully',
    });
  } catch (e) {
    next(new InternalServerError(e.message));
  }
})

const getCategories = asyncHandler(async(req, res, next) => {
  try {
    // pagination and filtering
    const pageSize = 10;
    const page = Number(req.query.pageNumber) || 1;
    const keyword = req.query.keyword ? {
      name: {
        $regex: req.query.keyword,
        $options: 'i',
      },
    } : {};
    const count = await Category.countDocuments({ ...keyword });

    const categories = await Category.find({ ...keyword })
      .limit(pageSize)
      .skip(pageSize * (page - 1));
    res.status(200).json({
      success: true,
      message: 'Categories fetched successfully',
      data: categories,
      page,
      pages: Math.ceil(count / pageSize
      ),  
    });
  } catch (e) {
    next(new InternalServerError(e.message));
  }
})

export { 
  createCategory,
  updateCategory,
  deleteCategory,
  getCategories,
}
import express from 'express'
import { CategoryController } from './category.controller'


const router=express.Router()

router.post('/',CategoryController.createCategory)
router.get('/',CategoryController.getCategorys)
router.get('/:id',CategoryController.getCategoryById)
router.delete('/:id',CategoryController.deleteCategory)
router.put('/:id',CategoryController.updateCategory)



export const categoryRoute=router
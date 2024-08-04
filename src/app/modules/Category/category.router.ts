import express from 'express'
import { CategoryController } from './category.controller'
import auth from '../../middlewares/auth'
import { ADMIN_ROLE } from '../admin/admin.constant'



const router=express.Router()

router.post('/',CategoryController.createCategory)
router.get('/',auth(ADMIN_ROLE.admin),CategoryController.getCategorys)
router.get('/:id',CategoryController.getCategoryById)
router.delete('/:id',CategoryController.deleteCategory)
router.put('/:id',CategoryController.updateCategory)



export const categoryRoute=router
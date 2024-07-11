import express from 'express'
import { productController } from './product.controller'

const router=express.Router()

router.post('/',productController.createProduct)
router.get('/',productController.getProducts)
router.get('/:id',productController.getProductById)
router.delete('/:id',productController.deleteProductById)


export const productRoute=router
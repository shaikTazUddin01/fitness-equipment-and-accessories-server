import express from "express"
import {authController } from "./auth.controller"

const router= express.Router()

router.post('/admin-login',authController.AdminLogin)
router.post('/user-login',authController.UserLogin)
router.post('/refresh-token',authController.refreshToken) 


export const authRoute=router
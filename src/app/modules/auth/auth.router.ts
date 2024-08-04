import express from "express"
import {authController } from "./auth.controller"

const router= express.Router()

router.post('/admin-login',authController.login)
router.post('/refresh-token',authController.refreshToken) 


export const authRoute=router
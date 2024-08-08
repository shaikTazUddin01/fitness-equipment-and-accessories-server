import express from "express"
import { adminController } from "./admin.controller"
import auth from "../../middlewares/auth"
import { ADMIN_ROLE } from "./admin.constant"

const router= express.Router()

router.post('/',adminController.createAdmin)
router.get('/',auth(ADMIN_ROLE.Admin),adminController.getAdmin)
router.get('/:id',auth(ADMIN_ROLE.Admin),adminController.getSingleAdmin)
router.delete('/:id',auth(ADMIN_ROLE.Admin),adminController.deleteAdmin)
router.put('/:id',auth(ADMIN_ROLE.Admin),adminController.updateAdmin)

export const adminRoute=router
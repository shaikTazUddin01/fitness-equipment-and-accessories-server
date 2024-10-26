import express from "express";
import { adminController } from "./admin.controller";
import auth from "../../middlewares/auth";
import { ADMIN_ROLE } from "./admin.constant";

const router = express.Router();

router.post("/",auth(ADMIN_ROLE.Admin), adminController.createAdmin);
router.get("/", auth(ADMIN_ROLE.Admin,ADMIN_ROLE.SubAdmin), adminController.getAdmin);
// router.get('/:id',auth(ADMIN_ROLE.Admin),adminController.getSingleAdmin)
router.delete("/:id", auth(ADMIN_ROLE.Admin), adminController.deleteAdmin);
router.put(
  "/updatePassword",
  auth(ADMIN_ROLE.Admin,ADMIN_ROLE.SubAdmin),
  adminController.updatePassword
);
router.put("/:id", auth(ADMIN_ROLE.Admin,ADMIN_ROLE.SubAdmin), adminController.updateAdmin);

export const adminRoute = router;

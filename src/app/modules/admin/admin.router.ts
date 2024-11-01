import express from "express";
import { adminController } from "./admin.controller";
import auth from "../../middlewares/auth";
import { ROLE } from "./admin.constant";


const router = express.Router();

router.post("/",auth(ROLE.Admin), adminController.createAdmin);
router.get("/", auth(ROLE.Admin,ROLE.SubAdmin), adminController.getAdmin);
// router.get('/:id',auth(ROLE.Admin),adminController.getSingleAdmin)
router.delete("/:id", auth(ROLE.Admin), adminController.deleteAdmin);
router.put(
  "/updatePassword",
  auth(ROLE.Admin,ROLE.SubAdmin),
  adminController.updatePassword
);
router.put("/:id", auth(ROLE.Admin,ROLE.SubAdmin), adminController.updateAdmin);

export const adminRoute = router;

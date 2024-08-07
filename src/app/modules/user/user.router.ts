import { Router } from "express";
import { UserController } from "./user.controller";

const router = Router();

router.post("/create-user",UserController.createUser);
router.get("/",UserController.getUser);
router.get("/user-info",UserController.getSingleUser);
router.delete("/:id",UserController.deleteSingleUser);

export const userRoute = router;

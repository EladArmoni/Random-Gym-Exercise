import express from "express";
import {loginUser,logoutUser,signupUser} from "../controllers/user-controller.js"

const router=express.Router()

router.post("/signup",signupUser);
router.post("/login",loginUser);
router.post("/logout",logoutUser);
// router.get("/favorites",getUserFavoritesExercises);

export default router;
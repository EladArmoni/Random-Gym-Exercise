import express from "express";
import {loginUser,signupUser} from "../controllers/user-controller.js"

const router=express.Router()

router.post("/signup",signupUser);
router.post("/login",loginUser);
// router.get("/favorites",getUserFavoritesExercises);

export default router;
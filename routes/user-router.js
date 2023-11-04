import express from "express";
import {loginUser,signupUser,addExerciseToFavorites} from "../controllers/user-controller.js"

const router=express.Router()

router.post("/signup",signupUser);
router.post("/login",loginUser);
router.post("/addExerciseToFavorite",addExerciseToFavorites);
// router.get("/favorites",getUserFavoritesExercises);

export default router;
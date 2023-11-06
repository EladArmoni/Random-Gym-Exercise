import express from "express";
import {loginUser,signupUser,addExerciseToFavorites,removeExerciseFromFavorites} from "../controllers/user-controller.js"
import checkAuth from "../middleware/check-auth.js"

const router=express.Router()

//public routes
router.post("/signup",signupUser);
router.post("/login",loginUser);

//private routes
router.post("/addExerciseToFavorite",addExerciseToFavorites);
router.post("/removeExerciseFromFavorite",checkAuth,removeExerciseFromFavorites);

export default router;
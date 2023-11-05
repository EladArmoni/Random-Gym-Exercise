import express from "express";
import {loginUser,signupUser,addExerciseToFavorites,removeExerciseFromFavorites} from "../controllers/user-controller.js"

const router=express.Router()

router.post("/signup",signupUser);
router.post("/login",loginUser);
router.post("/addExerciseToFavorite",addExerciseToFavorites);
router.post("/removeExerciseFromFavorite",removeExerciseFromFavorites);

export default router;
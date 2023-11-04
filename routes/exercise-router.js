import express from "express";
import {getAllExercises,getRandomExercise,getExerciseByName} from "../controllers/exercise-controller.js"

const router=express.Router()

router.get("/",getAllExercises);
router.get("/muscle/:muscle",getRandomExercise);
router.get("/:exercise",getExerciseByName);

export default router;
import express from "express"
import { applyForJobController, getAllSavedJobs, getJobCategoryBasedController, saveJobController } from "../controllers/employeeControllers.js";
import { requireSignIn } from "../middlewares/authMiddleware.js";

const router = express.Router()

// Saving the job to users database
router.put("/save-job/:jobId", requireSignIn, saveJobController)

// Fetch all saved jobs from user
router.get("/get-saved-jobs", requireSignIn, getAllSavedJobs)

//Apply for the job
router.put("/apply-for-job/:jobId", requireSignIn, applyForJobController);

// job serach api
router.get("/get-category/:category", requireSignIn, getJobCategoryBasedController)



export default router;
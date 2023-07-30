import express from "express"
import { applyForJobController, getAllSavedJobs, getJobCategoryBasedController, jobSearchController, saveJobController, singleJobPageController } from "../controllers/employeeControllers.js";
import { requireSignIn } from "../middlewares/authMiddleware.js";

const router = express.Router()

// Saving the job to users database
router.put("/save-job/:jobId", requireSignIn, saveJobController)

// Fetch all saved jobs from user
router.get("/get-saved-jobs", requireSignIn, getAllSavedJobs)

//Apply for the job
router.put("/apply-for-job/:jobId", requireSignIn, applyForJobController);

// single job page
router.get("/single-page-job/:jobId", requireSignIn, singleJobPageController);

// jobs based on category (pass the category as slug from the client)
router.get("/get-category/:category", requireSignIn, getJobCategoryBasedController)

//job serach
router.get("/search-job", requireSignIn, jobSearchController)



export default router;
import express from "express"
import { getAllSavedJobs, registerEmployeeController, saveJobController } from "../controllers/employeeControllers.js";
import { requireSignIn } from "../middlewares/authMiddleware.js";

const router = express.Router()


// Register a account as employee
router.post("/register", registerEmployeeController)

// Saving the job to users database
router.put("/save-job/:jobId", requireSignIn, saveJobController)

// Fetch all saved jobs from user
router.get("/get-saved-jobs", requireSignIn, getAllSavedJobs)


export default router;
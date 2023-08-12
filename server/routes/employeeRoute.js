import express from "express"
import { getAllSavedJobs, getAllEmployees, registerEmployeeController, saveJobController, unsaveJobController } from "../controllers/employeeControllers.js";
import { requireSignIn } from "../middlewares/authMiddleware.js";

const router = express.Router()


// Register a account as employee
router.post("/register", registerEmployeeController)

// Saving the job to users database
router.put("/save-job/:jobId", requireSignIn, saveJobController)

// remove from saved jobs from  users database and job databse
router.put("/unsave-job/:jobId", requireSignIn, unsaveJobController)

// Fetch all saved jobs from user
router.get("/get-saved-jobs", requireSignIn, getAllSavedJobs)

// Fetch all employee accounts
router.get("/get-employees", requireSignIn, getAllEmployees)


export default router;
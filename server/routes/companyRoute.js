import express from "express"
import { registerCompanyController, saveJobSeekerProfileController, updateCompanyProfileController } from "../controllers/companyController.js";
import { requireSignIn } from "../middlewares/authMiddleware.js"

const router = express.Router()

// Company Auth
// Register a account as company
router.post("/register", registerCompanyController)

//update company profile
router.put("/update-profile", requireSignIn, updateCompanyProfileController)

//save a jobseeker profile to a company
router.put("/save-a-jobseeker-profile", requireSignIn, saveJobSeekerProfileController)


export default router;
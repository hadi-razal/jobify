import express from "express"
import { getCompanyController, getCompanyByIdController,unsaveProfileController, getSavedProfilesController, registerCompanyController, saveProfileController, updateCompanyProfileController } from "../controllers/companyController.js";
import { requireSignIn } from "../middlewares/authMiddleware.js"

const router = express.Router()

// Company Auth
// Register a account as company
router.post("/register", registerCompanyController)

//update company profile
router.put("/update-profile", requireSignIn, updateCompanyProfileController)

// get company deatails 
router.get("/get-my-company", requireSignIn, getCompanyController)

// get company by id 
router.get("/get-company/:companyId", requireSignIn, getCompanyByIdController)

//save a jobseeker profile to a company
router.put("/save-profile/:profileId", requireSignIn, saveProfileController)

//save a jobseeker profile to a company
router.put("/unsave-profile/:profileId", requireSignIn, unsaveProfileController)

//get saved profiles
router.get("/get-profiles", requireSignIn, getSavedProfilesController)


export default router;